"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Play = void 0;
const DateManipulation_1 = require("../Helpers/DateManipulation");
const db_1 = require("../Database/db");
const StringManipulation_1 = require("../Helpers/StringManipulation");
// Handles the Play command
// Params:
//      message - the message being handled
//      args - the arguments the user provided in the message
const Play = (message, args) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, StringManipulation_1.ArgsHaveTime)(args)) // no time
        return;
    // Resolve booking details
    let time = (0, DateManipulation_1.GetDateFromArgs)(args.replace('play ', ''));
    let server = message.guild.id;
    let user = message.member.user.username + '#' + message.member.user.discriminator;
    // Create booking and confirm in channel chat
    try {
        yield (0, db_1.CreateBooking)(server, user, time);
        message.channel.send(user + ' booked in for ' + (0, DateManipulation_1.Get24HourTimeFromDate)(time));
    }
    catch (_a) {
        message.channel.send('Sorry, the booking could not be created at this time.');
    }
});
exports.Play = Play;
