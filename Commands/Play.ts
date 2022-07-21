import { Message } from 'discord.js';
import { GetDateFromArgs, GetFullDateFromDate, Get24HourTimeFromDate } from '../Helpers/dateTime';
import { Execute } from '../Database/db';

export const BookUser = (message: Message, args: string) => {
    if (args === 'play' || args === 'play ') // no time
            return;
    
    // Resolve booking details
    let time: Date = GetDateFromArgs(args.replace('play ', ''));
    let server:string = message.guild!.id!;
    let user = message.member!.user.username + '#' + message.member!.user.discriminator;
    
    // Create booking and confirm in channel chat
    CreateBooking(server, user, time);
    message.channel.send(user + ' booked in for ' + Get24HourTimeFromDate(time));
}

// A function to add a new booking to the database
// Params:
//      database - database the booking is added to
//      server - server the booking request came from
//      user - user the booking is for
//      time - date object for the date/time the user is booking into
export const CreateBooking = (server: string, user: string, time: Date) => {
	let query = `INSERT INTO bookings (server, user, date, time) VALUES (\'${server}\', \'${user}\', \'${GetFullDateFromDate(time)}\', \'${Get24HourTimeFromDate(time)}\')`;

}