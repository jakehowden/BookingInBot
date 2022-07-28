import { Message } from "discord.js";
import { RemoveAllBookingsForDay, RemoveBooking } from "../Database/db";
import { GetDateFromArgs } from "../Helpers/DateManipulation";
import { ArgsHaveTime } from "../Helpers/StringManipulation";

// Handles the Book command
// Params:
//      message - the message being handled
//      args - the arguments the user provided in the message
export const Busy = async (message: Message, args: string) => {
    // Resolve server and user details
    let server:string = message.guild!.id!;
    let user = message.member!.user.username + '#' + message.member!.user.discriminator;
    
    if(ArgsHaveTime(args)) {
        args = args.replace('book ', '')
        let time: Date = GetDateFromArgs(args);
        try
        {
            await RemoveBooking(server, user, time);
            message.channel.send(user + ' was removed from their ' + args + ' booking');
        }
        catch
        {
            message.channel.send('Sorry, the booking can not be removed at this time.');
        }
    }
    else {
        try
        {
            await RemoveAllBookingsForDay(server, user, new Date());
            message.channel.send(user + ' was removed from all bookings');
        }
        catch
        {
            message.channel.send('Sorry, the bookings can not be removed at this time.');
        }
    }
}