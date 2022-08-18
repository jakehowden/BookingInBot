import { ChatInputCommandInteraction } from "discord.js";

export const Ask = async (interaction: ChatInputCommandInteraction) => {
    // Resolve server and user details
    let question: string  = interaction.options.getString("question")!;
    let username: string = interaction.member!.user.username;
    
    let message = await interaction.editReply('**' + username + '** asks: ' + question);
    await message.react('👍');
    await message.react('👎');
}