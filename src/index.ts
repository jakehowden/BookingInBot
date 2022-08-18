import { Client, GatewayIntentBits } from "discord.js";
import { Play } from "./Commands/Play";
import { Busy } from "./Commands/Busy";
import { PatchNotes } from "./Commands/PatchNotes";
import { Ask } from "./Commands/Ask";
import { Booked } from "./Commands/Booked";
import { Same } from "./Commands/Same";
import config from "./config";

// Init Discord Bot
const bot = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// Login to Discord
bot.login(config.DISCORD_TOKEN);

bot.on('ready', () => {
    console.log('Connected - ready for commands');
});

bot.on('interactionCreate', async interaction => {
    if(!interaction.isChatInputCommand()) {
        return;
    }

    switch(interaction.commandName)
    {
        case 'play': {
            await Play(interaction);
            break;
        }
        case 'same': {
            await Same(interaction)
            break;
        }
        case 'busy': {
            Busy(interaction);
            break;
        }
        case 'booked': {
            Booked(interaction);
            break;
        }
        case 'ask': {
            Ask(interaction);
            break;
        }
        case 'patchnotes': {
            await PatchNotes(interaction);
            break;
        }
        case 'version': {
            await interaction.reply(config.VERSION);
            break;
        }
    };
});
