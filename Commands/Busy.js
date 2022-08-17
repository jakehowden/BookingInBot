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
exports.Busy = void 0;
const db_1 = require("../Database/db");
const DateManipulation_1 = require("../Helpers/DateManipulation");
const StringManipulation_1 = require("../Helpers/StringManipulation");
// Handles the Book command
// Params:
//      message - the message being handled
//      args - the arguments the user provided in the message
const Busy = (message, args) => __awaiter(void 0, void 0, void 0, function* () {
    // Resolve server and user details
    let server = message.guild.id;
    let user = message.member.user.username + '#' + message.member.user.discriminator;
    if ((0, StringManipulation_1.ArgsHaveTime)(args)) {
        args = args.replace('book ', '');
        let time = (0, DateManipulation_1.GetDateFromArgs)(args);
        try {
            yield (0, db_1.RemoveBooking)(server, user, time);
            message.channel.send(user + ' was removed from their ' + args + ' booking');
        }
        catch (_a) {
            message.channel.send('Sorry, the booking can not be removed at this time.');
        }
    }
    else {
        try {
            yield (0, db_1.RemoveAllBookingsForDay)(server, user, new Date());
            message.channel.send(user + ' was removed from all bookings');
        }
        catch (_b) {
            message.channel.send('Sorry, the bookings can not be removed at this time.');
        }
    }
});
exports.Busy = Busy;
