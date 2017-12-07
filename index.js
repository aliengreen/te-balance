/* jslint node: true, sub: true */
'use strict';

var request = require('request');

// Init the module
module.exports = (function () {

  var defTimeout = 10000,
      url        = 'https://www.ktg-tbilisi.ge/balance';

  var getAttribute = function (body, name) {
    var searchString    = name + ": <STRONG>";
    var searchString2   = name + ": <input type=\"text\" name=\"o.amount\" value=\"";
    var start_attribute = body.indexOf(searchString);
    var end_attribute;
    if (start_attribute !== -1) {
      end_attribute = body.indexOf("</STRONG>", start_attribute);
      return body.substr(start_attribute + searchString.length, end_attribute - start_attribute - searchString.length);
    } else {
      start_attribute = body.indexOf(searchString2);
      if (start_attribute !== -1) {
        end_attribute = body.indexOf("\" autocomplete=\"off\">", start_attribute);
        return body.substr(start_attribute + searchString2.length, end_attribute - start_attribute - searchString2.length);
      }
    }

    return undefined;
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

      var name    = getAttribute(body, "აბონენტი"),
          address = getAttribute(body, "მისამართი"),
          balance = getAttribute(body, "თქვენი ბალანსი შეადგენს"),
          amount  = getAttribute(body, "გადასახდელი თანხა");

      if (name === undefined || address === undefined) {
        return callback(null, {
          "balance": {}
        });
      }

      // Parse body
      var result = {
        "balance": {
          "id":             accountID,
          "name":           name,
          "address":        address,
          "balance":        balance,
          "payable_amount": amount,
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