import { Message } from "discord.js";

// Handles the PatchNotes command
// Params:
//      message - the message being handled
//      version - the current bot version
export const PatchNotes = (message: Message, version: string) => {
    let msg: string;
    msg = 'Patch notes (' + version + '):';

    message.channel.send(msg);
}