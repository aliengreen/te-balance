# Kaztransgaz Balance 


Kaztransgaz Balance is a module for obtaining Kaztransgaz account balance. Current version works for Tbilisi city only.


## Installation

```bash
npm install aliengreen/kaztransgaz-balance
```

## Usage

```javascript
var kbalance = require('kaztransgaz-balance-js');


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

- It uses `https://www.ktg-tbilisi.ge/balance` "service"

## License

Licensed under The MIT License (MIT)  
For the full copyright and license information, please view the LICENSE.txt file.

