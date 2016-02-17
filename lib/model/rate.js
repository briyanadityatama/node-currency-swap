/*
 * This file is part of Swap.
 *
 * (C) 2016 Tajawal
 * MIT LICENCE
 *
 */

/**
 *
 * Represents a rate.
 */
var Rate = module.exports = function(value, date, provider){
    this.value = value;
    this.date = date ? date : new Date();
    this.provider = provider;
};

/**
 * Gets the rate value.
 * @returns string
 */
Rate.prototype.getValue = function () {
    return this.value;
};

/**
 * Gets the date at which this rate was calculated.
 * @returns datetime
 */
Rate.prototype.getDate = function () {
    return this.date;
};

/**
 * Gets the provider name.
 * @returns string
 */
Rate.prototype.getProvider = function () {
    return this.provider;
};