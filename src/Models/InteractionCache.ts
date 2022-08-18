import { ChatInputCommandInteraction } from "discord.js";

class InteractionCache {
    public static Cache: Record<string, ChatInputCommandInteraction> = { }

    public static Update = (interaction: ChatInputCommandInteraction) => {
        InteractionCache.Cache[interaction.guild!.id] = interaction;
    }
    
    public static Get = (GuildId: string) : ChatInputCommandInteraction | undefined => {
        return InteractionCache.Cache[GuildId];
    }
}

export default InteractionCache;