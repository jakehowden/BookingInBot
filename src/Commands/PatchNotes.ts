import { ChatInputCommandInteraction } from "discord.js";
import config from "../config";

// Handles the PatchNotes command
// Params:
//      message - the message being handled
//      version - the current bot version
export const PatchNotes = async (interaction: ChatInputCommandInteraction) => {
    let msg: string;
    msg = 'Patch notes (' + config.VERSION + ') August 2022:';
    msg += '\nA fresh face and a new interface!';
    msg += '\nALL COMMANDS HAVE MOVED TO SLASH COMMANDS, USE / TO SELECT A COMMAND.';
    msg += '\nAdded Same command, repeats the previous Play or Busy command.';
    msg += '\nSpecific times have now been removed, any time is available for booking.';
    msg += '\nBooking times are rounded up to the nearest half an hour, e.g.:';
    msg == '\n7:15 becomes 7:30, 12:35 becomes 1:00'
    msg += '\nMultiple servers are now supported, booking storage has been moved to a database.';

    await interaction.reply(msg);
}