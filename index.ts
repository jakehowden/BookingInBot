import { Client, ClientOptions } from "discord.js";
import env from './Env/env.json';
import { Play } from "./Commands/Play";
import { Patchnotes } from "./Commands/Patchnotes";
import { Help } from "./Commands/Help";
import { Busy } from "./Commands/Busy";

// Init Discord Bot
const options: ClientOptions = {
    intents: []
}
const bot = new Client(options);

// Login to Discord
bot.login(env.discord_token);

bot.on('ready', () => {
    console.log('Connected - ready for commands');
});

bot.on('message', async message => {

    let cmd: string = message.content.replace('!', '');
    
    switch(true)
    {
        case cmd.includes('play'): {
            await Play(message, cmd);
            break;
        }
        case cmd.includes('same'): {
            break;
        }
        case cmd.includes('busy'): {
            Busy(message, cmd);
            break;
        }
        case cmd.includes('booked'): {
            break;
        }
        case cmd.includes('ask'): {
            break;
        }
        case cmd.includes('help'): {
            Help(message);
            break;
        }
        case cmd.includes('patchnotes'): {
            Patchnotes(message, env.version);
            break;
        }
        case cmd.includes('version'): {
            message.channel.send(env.version);
            break;
        }
    };

    message.delete();
});
