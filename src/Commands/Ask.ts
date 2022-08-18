import { ChatInputCommandInteraction } from "discord.js";

export const Ask = async (interaction: ChatInputCommandInteraction) => {
    // Resolve server and user details
    let question: string  = interaction.options.getString("question")!;
    let user: string = interaction.member!.user.username;
    
    let message = await interaction.reply({ content: '**' + user + '** asks: ' + question, fetchReply: true });
    message.react('👍');
    message.react('👎');
}