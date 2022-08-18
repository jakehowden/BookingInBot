import { ChatInputCommandInteraction } from 'discord.js';
import { Busy } from './Busy';
import { Play } from './Play';
import InteractionCache from '../Models/InteractionCache';

// Handles the Play command
// Params:
//      message - the message being handled
export const Same = async (interaction: ChatInputCommandInteraction) => {
    // Resolve command details
    let server:string = interaction.guild!.id!;
    let lastInteraction: ChatInputCommandInteraction | undefined = InteractionCache.Get(server);

    if(lastInteraction === undefined)
    {
        await interaction.editReply("There are no previous play or busy commands.");
        return;
    }

    // Setup the current interaction to behave like the last interaction
    interaction.commandName = lastInteraction.commandName;
    interaction.options = lastInteraction.options;

    switch(interaction.commandName)
    {
        case 'play': {
            await Play(interaction);
            return;
        }
        case 'busy': {
            await Busy(interaction);
            return;
        }
        default: {
            console.log("The last interaction did not have a valid command name, " + lastInteraction.commandName);
            await interaction.editReply("Sorry, I can't do that right now 😞");
            return;
        }
    }
}