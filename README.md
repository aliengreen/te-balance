# Kaztransgaz Balance 

[![NPM][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage][coverage-image]][coverage-url]

Kaztransgaz Balance is a module for obtaining Kaztransgaz account balance. Current version works for Tbilisi city only.


## Installation

```bash
npm install kaztransgaz-balance-js
```

## Usage

```javascript
var kbalance = require('kaztrans-balance-js');


kbalance.get({id: '153131-158'}, function(err, result) {
  if(err) console.log(err);

  console.log(JSON.stringify(result, null, 2));
});
```
```bash
  {
    "balance": {
      "id": "153131-158",
      "name": "მგელაძე კუკური",
      "address": "ნუცუბიძე, ჯ. ბუასილის N9, შენ. 12, ბინა 43",
      "balance": "0",
      "payable_amount": "1",
      "currency": "GEL"
    }
  }
```

## Notes

- It uses `https://www.ktg-tbilisi.ge/balance` service

## License

Licensed under The MIT License (MIT)  
For the full copyright and license information, please view the LICENSE.txt file.

[npm-url]: http://npmjs.org/package/kaztransgaz-balance-js
[npm-image]: https://badge.fury.io/js/kaztransgaz-balance-js.svg

[travis-url]: https://travis-ci.org/devfacet/kaztransgaz-balance
[travis-image]: https://travis-ci.org/devfacet/kaztransgaz-balance.svg?branch=master

[coverage-url]: https://coveralls.io/github/devfacet/kaztransgaz-balance?branch=master
[coverage-image]: https://coveralls.io/repos/devfacet/kaztransgaz-balance/badge.svg?branch=master&service=github
