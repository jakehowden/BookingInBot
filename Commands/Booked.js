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
exports.Booked = void 0;
const db_1 = require("../Database/db");
const StringManipulation_1 = require("../Helpers/StringManipulation");
// Handles the Booked command
// Params:
//      message - the message being handled
//      args - the arguments the user provided in the message
const Booked = (message, args) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, StringManipulation_1.ArgsHaveTime)(args)) // no time
        return;
    // Resolve server id
    let server = message.guild.id;
    // Create booking and confirm in channel chat
    let msg = '';
    let currentTime = '';
    try {
        let bookings = yield (0, db_1.GetAllBookingsForDay)(server, new Date());
        for (let i = 0; i < bookings.length; i++) {
            if (currentTime != bookings[i].time_booked) {
                currentTime = bookings[i].time_booked;
                msg += '\n' + currentTime + ' Bookings: ';
            }
            msg += bookings[i].user_id + ' ';
        }
        message.channel.send(msg);
    }
    catch (_a) {
        message.channel.send('Sorry, bookings can not be retrieved at this time.');
    }
});
exports.Booked = Booked;
