import { ChatInputCommandInteraction } from 'discord.js';
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
    let username = interaction.member!.user.username;
    let user = username + '#' + interaction.member!.user.discriminator;
    
    // Create booking and confirm in channel chat
    try
    {
        let result = await CreateBooking(server, user, time);

        if(result === "duplicate")
        {
            await interaction.editReply('You\'re already booked in for that time.');
            return;
        }

        await interaction.editReply(username + ' booked in for ' + Get24HourTimeFromDate(time));
    }
    catch (error)
    {
        await interaction.editReply('Sorry, the booking could not be created at this time.');
    }
}