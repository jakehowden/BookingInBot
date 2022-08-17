import { Message } from 'discord.js';
import { GetDateFromArgs, Get24HourTimeFromDate } from '../Helpers/DateManipulation';
import { CreateBooking } from '../Database/db';
import { ArgsHaveTime } from '../Helpers/StringManipulation';

// Handles the Play command
// Params:
//      message - the message being handled
//      args - the arguments the user provided in the message
export const Play = async (message: Message, args: string) => {
    if (!ArgsHaveTime(args)) // no time
            return;
    
    // Resolve booking details
    let time: Date = GetDateFromArgs(args.replace('play ', ''));
    let server:string = message.guild!.id!;
    let user = message.member!.user.username + '#' + message.member!.user.discriminator;
    
    // Create booking and confirm in channel chat
    try
    {
        await CreateBooking(server, user, time);
        message.channel.send(user + ' booked in for ' + Get24HourTimeFromDate(time));
    }
    catch
    {
        message.channel.send('Sorry, the booking could not be created at this time.');
    }
}