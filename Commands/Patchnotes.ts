import { Message } from "discord.js";

export const Patchnotes = (message: Message, version: string) => {
    let msg: string;
    msg = 'Patch notes (' + version + '):';

    message.channel.send(msg);
}