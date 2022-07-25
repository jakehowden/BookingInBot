import { Message } from "discord.js";

// Handles the Patchnotes command
// Params:
//      message - the message being handled
//      version - the current bot version
export const Patchnotes = (message: Message, version: string) => {
    let msg: string;
    msg = 'Patch notes (' + version + '):';

    message.channel.send(msg);
}