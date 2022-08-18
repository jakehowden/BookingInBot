import { ChatInputCommandInteraction } from "discord.js";
import { RemoveAllBookingsForDay, RemoveBooking } from "../Database/db";
import { GetDateFromArgs } from "../Helpers/DateManipulation";

// Handles the Book command
// Params:
//      message - the message being handled
//      args - the arguments the user provided in the message
export const Busy = async (interaction: ChatInputCommandInteraction) => {
    // Resolve server and user details
    let server:string = interaction.guild!.id!;
    let user = interaction.member!.user.username + '#' + interaction.member!.user.discriminator;
    let option: string | null = interaction.options.getString('time');

    if(option == null) {
        try
        {
            await RemoveAllBookingsForDay(server, user, new Date());
            interaction.reply(user + ' was removed from all bookings');
        }
        catch
        {
            interaction.reply('Sorry, the bookings can not be removed at this time.');
        }
    }
    else {
        let time: Date = GetDateFromArgs(option);
        try
        {
            await RemoveBooking(server, user, time);
            interaction.reply(user + ' was removed from their ' + option + ' booking');
        }
        catch
        {
            interaction.reply('Sorry, the booking can not be removed at this time.');
        }
    }
}