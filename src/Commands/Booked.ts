import { ChatInputCommandInteraction } from 'discord.js';
import { GetAllBookingsForDay } from '../Database/db';
import { Booking } from '../Models/Booking';

// Handles the Booked command
// Params:
//      message - the message being handled
//      args - the arguments the user provided in the message
export const Booked = async (interaction: ChatInputCommandInteraction) => {
    // Resolve server id
    let server:string = interaction.guild!.id!;
    
    // Create booking and confirm in channel chat
    let msg: string = '';
    let currentTime: string = '';

    try
    {
        let bookings: Booking[] = await GetAllBookingsForDay(server, new Date());

        if(bookings.length == 0)
        {
            await interaction.editReply('There are no bookings for today.');
            return;
        }

        for (let i = 0; i < bookings.length; i++) {
            if(currentTime != bookings[i].time_booked)
            {
                currentTime = bookings[i].time_booked;
                msg += '\n' + currentTime + ' Bookings: '
            }
            
            let username = bookings[i].user_id.split('#')[0]
            msg += username + ' ';
        }

        await interaction.editReply(msg);
    }
    catch
    {
        await interaction.editReply('Sorry, bookings can not be retrieved at this time.');
    }
}