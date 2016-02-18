# swap
Exchange rates library for nodejs

## Motivation
Swap is designed to be a simple and universal exchange rate library with support fo multiple providers. This library is heavily inspired from [PHP Swap](https://github.com/florianv/swap)

## Installation

```bashp
npm install swap
```
## Usage

First, you need to add a provider to swap by using addProvider() method

```js
var swap = require('swap');

// Add the google finance provider 
swap.addProvider(new swap.providers.GoogleFinance());
```

You can also add multiple providers

```js
var swap = require('swap');

// Add the google finance provider 
swap.addProvider(new swap.providers.GoogleFinance());

// Add the yahoo finance provider 
swap.addProvider(new swap.providers.YahooFinance());
```

### swap.providers

To get the list of all providers

```js
// Returns the list of providers
swap.providers;
```

### quote(options, callback)

To retrieve the latest exchange rate for a currency pair asynchronously.

__Arguments__

* `options` - An object to specify options for quote. For complete list refer [Options Section](#Options).
* `callback(err, rate)` - A callback which returns error on any failure or rate array on success.

### quoteSync(options)

To retrieve the latest exchange rate for a currency pair synchronously.

__Arguments__

* `options` - An object to specify options for quote. For complete list refer [Options Section](#Options).

### Examples

```js
// if there is single provider in the list it fetch the rate from that provider but if there are multiple provider in the list it fetch the rate from first available one.
swap.quote({currency: 'USD/SAR'}, function (err, rate) {
    // print the exchange rate
    console.log(rate[0].value);
    
    // print the date from the provider
    console.log(rate[0].date);
    
    // print the provider name
    console.log(rate[0].provider);
});
```

Synchronously in case of any error it throws an error which you should handle through try/catch

```js
// if there is single provider in the list it fetch the rate from that provider but if there are multiple provider in the list it fetch the rate from first available one.
var rate = swap.quoteSync({currency: 'USD/SAR'});

// print the exchange rate
console.log(rate[0].value);
    
// print the date from the provider
console.log(rate[0].date);
    
// print the provider name
console.log(rate[0].provider);
```

To fetch rate from all the added providers

```js
var rates = swap.quoteSync({currency: 'USD/SAR', fetchMultipleRate: true});

rates.forEach(function(rate){
// print the exchange rate
console.log(rate.value);
    
// print the date from the provider
console.log(rate.date);
    
// print the provider name
console.log(rate.provider);

});
```

To fetch rate from cache if available if not it fetch the rate from provider and store in cache

```js
var rates = swap.quoteSync({currency: 'USD/SAR', cache: true});

rates.forEach(function(rate){
// print the exchange rate
console.log(rate.value);
    
// print the date from the provider
console.log(rate.date);
    
// print the provider name
console.log(rate.provider);

});
```

> Currencies are expressed as their [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217) code.

### swap.currencyCodes

Swap provides an object of currency codes so you can use it to avoid typos.

```js
var rates = swap.quoteSync({
    currency: {
            baseCurrency: swap.currencyCodes.ISO_USD, 
            quoteCurrency: swap.currencyCodes.ISO_AED
        }
    });
```

## Options

- `currency` - currency info to get exchange rate either as string `USD/AED` or as object `{baseCurrency:'USD', quoteCurrency:'AED'}`.
- `fetchMultipleRate` - if true, fetch rate from all the added providers. (default: `false`)
- `cache` - if true, it tries to fetch rate from cache if available otherwise fetch rate from added provider and store it in cache. (default: `false`)
- `ttl` - time in `ms` to retain rate in cache. (default: `360000`) 1 hour

## Providers

- [European Central Bank](http://www.ecb.europa.eu/home/html/index.en.html)
Supports only EUR as base currency.
```js
swap.addProvider(new swap.providers.EuropeanCentralBank());
```
- [Google Finance](http://www.google.com/finance)
Supports multiple currencies as base and quote currencies.
```js
swap.addProvider(new swap.providers.GoogleFinance());
```
- [Open Exchange Rates](https://openexchangerates.org)
Supports only USD as base currency for the free version and multiple ones for the enterprise version.
```js
// appId from open exchange rate. true in case you have enterprise account (default `false`)

swap.addProvider(new swap.providers.OpenExchangeRates(appId, enterprise));
```
- [Xignite](https://www.xignite.com)
You must have access to the `XigniteGlobalCurrencies` API.
Supports multiple currencies as base and quote currencies.
- [Yahoo Finance](https://finance.yahoo.com/)
Supports multiple currencies as base and quote currencies.
```js
swap.addProvider(new swap.providers.YahooFinance());
```
- [WebserviceX](http://www.webservicex.net/ws/default.aspx)
Supports multiple currencies as base and quote currencies.
- [National Bank of Romania](http://www.bnr.ro)
Supports only RON as base currency.
```js
swap.addProvider(new swap.providers.NationalBankOfRomania());
```

## Copyright and license

Code released under the [MIT license](https://github.com/tajawal/swap/blob/master/LICENSE)
