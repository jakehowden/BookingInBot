import { Message } from 'discord.js';
import { CreateSpecificBooking, GetMostRecentBooking } from '../Database/db';
import { Booking } from '../Models/Booking';

// Handles the Play command
// Params:
//      message - the message being handled
export const Same = async (message: Message) => {
    // Resolve booking details
    let server:string = message.guild!.id!;
    let user = message.member!.user.username + '#' + message.member!.user.discriminator;
    
    // Get most recent booking
    let latestBooking: Booking[];
    try
    {
        latestBooking = await GetMostRecentBooking(server);
    }
    catch
    {
        message.channel.send('Sorry, the booking could not be created at this time.');
        return;
    }

    // Create booking and confirm in channel chat
    let date: string = latestBooking[0].date_booked;
    let time: string = latestBooking[0].time_booked;
    try
    {
        await CreateSpecificBooking(server, user, date, time);
        message.channel.send(user + ' booked in for ' + time);
    }
    catch
    {
        message.channel.send('Sorry, the booking could not be created at this time.');
    }
}