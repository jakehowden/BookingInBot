import { Message } from 'discord.js';
import { GetAllBookingsForDay } from '../Database/db';
import { GetDateFromArgs } from '../Helpers/DateManipulation';
import { ArgsHaveTime } from '../Helpers/StringManipulation';
import { Booking } from '../Models/Booking';

// Handles the Booked command
// Params:
//      message - the message being handled
//      args - the arguments the user provided in the message
export const Booked = async (message: Message, args: string) => {
    if (!ArgsHaveTime(args)) // no time
            return;
    
    // Resolve booking details
    let time: Date = GetDateFromArgs(args.replace('play ', ''));
    let server:string = message.guild!.id!;
    let user = message.member!.user.username + '#' + message.member!.user.discriminator;
    
    // Create booking and confirm in channel chat
    let msg: string = '';
    let currentTime: string = '';
    let bookings: Booking[] = await GetAllBookingsForDay(server, new Date());

    for (let i = 0; i < bookings.length; i++) {
        if(currentTime != bookings[i].time_booked)
        {
            currentTime = bookings[i].time_booked;
            msg += '\n' + currentTime + ' Bookings: '
        }
        
        msg += bookings[i].user_id + ' ';
    }

    message.channel.send(msg);
}