/* jslint node: true, sub: true */
'use strict';

var HTMLParser = require('node-html-parser');
var request = require('request');

// Init the module
module.exports = (function () {

  var defTimeout = 10000,
      url        = 'https://te.ge/webpay/';

  var getFields = function (body) {

    var ret = {
        "name":'',
        "address":'',
        "balance":'',
        "payable_amount":'',
        "last_payment_date":''
    };

    const root = HTMLParser.parse(body);
    var h3 = root.querySelectorAll('h3');
    for (var i = 0; i < h3.length; ++i) {
      if(h3[i].textContent == "აბონენტი:") {
        ret.name = h3[++i].textContent;
      } else if(h3[i].textContent == "მისამართი:") {
        ret.address = h3[++i].textContent;
      } else if(h3[i].textContent == "დავალიანება:") {
        ret.balance = h3[++i].textContent;
      } else if(h3[i].textContent == "ბოლო ვადა:") {
        ret.last_payment_date = h3[++i].textContent;
      } else if(h3[i].textContent == "გადასახდელი თანხა:") {
        ret.payable_amount = ""; //h3[++i].textContent;
      }
    }

    var payable_amount = root.querySelector('#amount');
    if (payable_amount !== undefined) {
      ret.payable_amount = payable_amount.getAttribute('value');
    }

    return ret;
  };

  var normallizeID = function (id) {
    if (id.length === 10) {
      if (id.indexOf("-") !== -1) {
        return id;
      }
    } else if (id.length === 9) {
      var firstDigits  = id.substr(0, 6);
      var secondDigits = id.substr(6, 3);
      return firstDigits + '-' + secondDigits;
    }
    return undefined;
  };

  var get = function get(options, callback) {

    if (typeof callback !== 'function')
      callback = function callback(err, result) {
        return err || result;
      };

    if (!options || typeof options !== 'object')
      return callback('Invalid options');

    if (!options.id)
      return callback('Missing ID input');

    var accountID = normallizeID(options.id);
    if (accountID === undefined) {
      return callback('Invalid account ID');
    }

    var timeout = options.timeout || defTimeout;

    request.post({url: url, timeout: timeout, form: {abonentID: accountID}}, function (err, res, body) {

      if (err) return callback(err);
      if (res.statusCode !== 200) return callback(new Error('request failed (' + res.statusCode + ')'));
      if (!body) return callback(new Error('failed to get body content'));

      // Check body content
      if (body.indexOf('<') !== 0) {
        if (body.search(/not found/i) !== -1) {
          return callback(null, result);
        }
        return callback(new Error('Invalid body content'));
      }
      console.log(body);


      var ret = getFields(body);

      if (ret.name === undefined || ret.address === undefined) {
        return callback(null, {
          "balance": {}
        });
      }

      // Parse body
      var result = {
        "balance": {
          "id":             accountID,
          "name":           ret.name,
          "address":        ret.address,
          "balance":        ret.balance,
          "payable_amount": ret.payable_amount,
          "currency":       'GEL'
        }
      };

      return callback(null, result);
    });
  };

  return {
    get: get
  };
})();
