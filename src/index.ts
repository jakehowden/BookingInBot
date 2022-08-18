import { Client, GatewayIntentBits } from "discord.js";
import { HandleCommand } from "./Commands/handle-commands";
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

    await interaction.deferReply();

    let counter: number = 0;
    while(counter != 3) {
        console.log(counter);
        
        try {
            await HandleCommand(interaction);
            return;
        } catch {
            counter++;
        }
    }

    await interaction.editReply("Sorry, I couldn't process that command right now.");
});
