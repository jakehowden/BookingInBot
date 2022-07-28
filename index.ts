import { Client, ClientOptions } from "discord.js";
import env from './Env/env.json';
import { Play } from "./Commands/Play";
import { Help } from "./Commands/Help";
import { Busy } from "./Commands/Busy";
import { PatchNotes } from "./Commands/PatchNotes";
import { Ask } from "./Commands/Ask";
import { Booked } from "./Commands/Booked";
import { Same } from "./Commands/Same";

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

    let args: string = message.content.replace('!', '');
    
    switch(true)
    {
        case args.includes('play'): {
            await Play(message, args);
            break;
        }
        case args.includes('same'): {
            await Same(message)
            break;
        }
        case args.includes('busy'): {
            Busy(message, args);
            break;
        }
        case args.includes('booked'): {
            Booked(message, args);
            break;
        }
        case args.includes('ask'): {
            Ask(message, args);
            break;
        }
        case args.includes('help'): {
            Help(message);
            break;
        }
        case args.includes('patchnotes'): {
            PatchNotes(message, env.version);
            break;
        }
        case args.includes('version'): {
            message.channel.send(env.version);
            break;
        }
    };

    message.delete();
});
