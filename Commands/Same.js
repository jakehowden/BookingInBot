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
exports.Same = void 0;
const db_1 = require("../Database/db");
// Handles the Play command
// Params:
//      message - the message being handled
const Same = (message) => __awaiter(void 0, void 0, void 0, function* () {
    // Resolve booking details
    let server = message.guild.id;
    let user = message.member.user.username + '#' + message.member.user.discriminator;
    // Get most recent booking
    let latestBooking;
    try {
        latestBooking = yield (0, db_1.GetMostRecentBooking)(server);
    }
    catch (_a) {
        message.channel.send('Sorry, the booking could not be created at this time.');
        return;
    }
    // Create booking and confirm in channel chat
    let date = latestBooking[0].date_booked;
    let time = latestBooking[0].time_booked;
    try {
        yield (0, db_1.CreateSpecificBooking)(server, user, date, time);
        message.channel.send(user + ' booked in for ' + time);
    }
    catch (_b) {
        message.channel.send('Sorry, the booking could not be created at this time.');
    }
});
exports.Same = Same;
