import { Message } from "discord.js";

// Handles the Help command
// Params:
//      message - the message being handled
export const Help = (message: Message) => {
    let msg: string;
    msg = 'Commands:';
    msg += '\nPlay - Book in for a gaming session. usage: !play 7:30';
    msg += '\nBusy - Unbook from a gaming session. If used without time then all bookings are removed. usage: !busy | !busy 7:30';
    msg += '\nBooked - Check who is booked in for the day. usage: !booked';
    msg += '\nSame - Book in at the same time as the previous booking. usage: !same';
    msg == '\nAsk - Check who is booked in for the day. usage: !ask play later?';
    msg += '\nPatchnotes - Check the patch notes for the current bot version. usage: !patchnotes';
    msg += '\nVersion - Check the current bot version. usage: !version';

    message.channel.send(msg);
}