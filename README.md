# Tbilisi Energy Balance 


Tbilisi Energy Balance is a module for obtaining Tbilisi Energy account balance. Current version works for Tbilisi city only.


## Installation

```bash
npm install https://github.com/aliengreen/te-balance
```

## Usage

```javascript
var tebalance = require('te-balance-js');


tebalance.get({id: '153131-158'}, function(err, result) {
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

- It uses `https://te.ge/webpay/` "service"

## License

Licensed under The MIT License (MIT)  
For the full copyright and license information, please view the LICENSE.txt file.

