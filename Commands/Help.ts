import { Message } from "discord.js";

// Handles the Help command
// Params:
//      message - the message being handled
export const Help = (message: Message) => {
    let msg: string;
    msg = 'Commands:';
    msg += '\n!play - Book in for a gaming session. usage: !play 7:30';
    msg += '\n!busy - Unbook from a gaming session. If used without time then all bookings are removed. usage: !busy | !busy 7:30';
    msg += '\n!booked - Check who is booked in for the day';
    msg += '\n!same - Book in at the same time as the previous booking';
    msg == '\n!ask - Check who is booked in for the day. usage: !ask play later?';
    msg += '\n!patchnotes - Check the patch notes for the current bot version';
    msg += '\n!version - Check the current bot version';

    message.channel.send(msg);
}