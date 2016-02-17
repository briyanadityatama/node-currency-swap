/*
 * This file is part of Swap.
 *
 * (C) 2016 Tajawal
 * MIT LICENCE
 *
 */

/**
 *
 * Common utility functions
 */

var GoogleFinanceProvider = require('../provider/googlefinance');
var EuropeanCentralBankProvider = require('../provider/europeancentralbank');
var async = require('async');

module.exports = {
    /**
     * verify if provider is in available provider list
     * @param provider
     * @returns {boolean}
     */
    verifyProvider: function (provider) {
        var isAvailableProvider = false;

        if (provider instanceof GoogleFinanceProvider) {
            isAvailableProvider = true;
        }
        else if(provider instanceof EuropeanCentralBankProvider){
            isAvailableProvider = true;
        }

        return isAvailableProvider;
    },

    /**
     * fetch exchange rates from providers synchronously
     * breaks on successful fetch
     * @param providers List of providers to fetch rate from
     * @param currencyPair
     * @param fetchMultipleRate Specify either return single rate or multiple rate
     * @returns {*}
     */
    getExchangeRateSync: function (providers, currencyPair, fetchMultipleRate) {
        var exceptions = [];
        var rate = [];

        providers.some(function (provider) {
            try {
                rate.push(provider.fetchRateSync(currencyPair));
                if (fetchMultipleRate) {
                    return false;
                }

                return rate.length > 0;
            }
            catch (e) {
                exceptions.push(e)
            }
        });

        if (rate.length == 0) {
            throw new Error(exceptions.join(','));
        }

        return rate;
    },

    /**
     * fetch exchange rates from providers asynchronously
     * breaks on successful fetch
     * @param providers List of providers to fetch rate from
     * @param currencyPair
     * @param fetchMultipleRate Specify either return single rate or multiple rate
     * @param callback
     * @returns {*}
     */
    getExchangeRate: function (providers, currencyPair, fetchMultipleRate, callback) {
        var exceptions = [];
        var rate = [];

        async.each(providers, function (provider, cb) {
            provider.fetchRate(currencyPair, function (err, exchangeRate) {
                if (err) {
                    exceptions.push(err);
                    cb();
                }
                else {
                    rate.push(exchangeRate);
                    if (!fetchMultipleRate) {
                        cb(new Error('Exchange rate found.'));
                    }
                    else{
                        cb();
                    }
                }
            })

        }, function (err, result) {
            if (rate.length == 0) {
                callback(new Error(exceptions.join(',')), null);
            }

            callback(null, rate);
        });
    }
};