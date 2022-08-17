"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchNotes = void 0;
// Handles the PatchNotes command
// Params:
//      message - the message being handled
//      version - the current bot version
const PatchNotes = (message, version) => {
    let msg;
    msg = 'Patch notes (' + version + ') July 2022:';
    msg += '\nAdded Same command, books the user in at the same time as the previous booking.';
    msg += '\nSpecific times have now been removed, any time is available for booking.';
    msg += '\nBooking times are rounded up to the nearest half an hour, e.g.:';
    msg == '\n7:15 becomes 7:30, 12:35 becomes 1:00';
    msg += '\nMultiple servers are now supported, booking storage has been moved to a database.';
    message.channel.send(msg);
};
exports.PatchNotes = PatchNotes;
