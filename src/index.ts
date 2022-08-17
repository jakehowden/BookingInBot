import { Client } from "discord.js";
import { Play } from "./Commands/Play";
import { Help } from "./Commands/Help";
import { Busy } from "./Commands/Busy";
import { PatchNotes } from "./Commands/PatchNotes";
import { Ask } from "./Commands/Ask";
import { Booked } from "./Commands/Booked";
import { Same } from "./Commands/Same";
import config from "./config";

// Init Discord Bot
const bot = new Client({
    intents: ["Guilds", "GuildMessages", "DirectMessages"]
});

// Login to Discord
bot.login(config.DISCORD_TOKEN);

bot.on('ready', () => {
    console.log('Connected - ready for commands');
});

bot.on('message', async message => {

    console.log(message.content);

    let args = message.content.replace('!', '');
    
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
            PatchNotes(message, config.VERSION);
            break;
        }
        case args.includes('version'): {
            message.channel.send(config.VERSION);
            break;
        }
    };

    message.delete();
});
