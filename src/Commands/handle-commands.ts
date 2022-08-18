import { ChatInputCommandInteraction } from "discord.js";
import { Play } from "./Play";
import { Busy } from "./Busy";
import { PatchNotes } from "./PatchNotes";
import { Ask } from "./Ask";
import { Booked } from "./Booked";
import { Same } from "./Same";
import config from "../config";
import InteractionCache from "../Models/InteractionCache";

export const HandleCommand = async (interaction: ChatInputCommandInteraction) => {
    switch(interaction.commandName)
    {
        case 'play': {
            await Play(interaction);
            InteractionCache.Update(interaction);
            return;
        }
        case 'same': {
            await Same(interaction)
            return;
        }
        case 'busy': {
            Busy(interaction);
            InteractionCache.Update(interaction);
            return;
        }
        case 'booked': {
            Booked(interaction);
            return;
        }
        case 'ask': {
            Ask(interaction);
            return;
        }
        case 'patchnotes': {
            await PatchNotes(interaction);
            return;
        }
        case 'version': {
            await interaction.reply(config.VERSION);
            return;
        }
    };
}