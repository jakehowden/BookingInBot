"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get24HourTimeFromDate = exports.GetFullDateFromDate = exports.GetDateFromArgs = void 0;
// Returns a valid Date() object from the time given in the args
// Params:
//      args - the arguments the user provided in the message
const GetDateFromArgs = (args) => {
    let today = new Date();
    let argsSplit = args.split(':');
    if (argsSplit.length === 2) {
        today.setHours(parseInt(argsSplit[0]), parseInt(argsSplit[1]), 0, 0);
    }
    else {
        today.setHours(parseInt(argsSplit[0]), 0, 0, 0);
    }
    // Round minutes to the nearest half an hour, i.e. 7:15 becomes 7:30, 12:35 becomes 1:00
    today.setMinutes(Math.ceil(today.getMinutes() / 30) * 30);
    return today;
};
exports.GetDateFromArgs = GetDateFromArgs;
// Generates a string in the format yyyy/mm/dd from the Date provided.
// Params:
//      args - the arguments the user provided in the message
const GetFullDateFromDate = (date) => {
    let month = date.getUTCMonth() + 1; //months from 1-12
    let day = date.getUTCDate();
    let year = date.getUTCFullYear();
    return year + "/" + month + "/" + day;
};
exports.GetFullDateFromDate = GetFullDateFromDate;
// Generates a string in the format hh/mm from the Date provided.
// Params:
//      args - the arguments the user provided in the message
const Get24HourTimeFromDate = (date) => {
    return date.getHours() + ':' + date.getMinutes();
};
exports.Get24HourTimeFromDate = Get24HourTimeFromDate;
