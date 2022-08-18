import { CacheType, ChatInputCommandInteraction, CommandInteraction, Interaction, Message } from 'discord.js';
import { GetDateFromArgs, Get24HourTimeFromDate } from '../Helpers/DateManipulation';
import { CreateBooking } from '../Database/db';

// Handles the Play command
// Params:
//      message - the message being handled
//      args - the arguments the user provided in the message
export const Play = async (interaction: ChatInputCommandInteraction) => {

    // Resolve booking details
    let option: string = interaction.options.getString('time')!;
    let time: Date = GetDateFromArgs(option);
    let server:string = interaction.guild!.id!;
    let user = interaction.member!.user.username + '#' + interaction.member!.user.discriminator;
    
    // Create booking and confirm in channel chat
    try
    {
        await CreateBooking(server, user, time);
        await interaction.reply(user + ' booked in for ' + Get24HourTimeFromDate(time));
    }
    catch
    {
        await interaction.reply('Sorry, the booking could not be created at this time.');
    }
}