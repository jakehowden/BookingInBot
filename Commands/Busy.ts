import { Message } from "discord.js";
import { RemoveAllBookingsForDay, RemoveBooking } from "../Database/db";
import { GetDateFromArgs } from "../Helpers/DateManipulation";
import { ArgsHaveTime } from "../Helpers/StringManipulation";

// Handles the Book command
// Params:
//      message - the message being handled
//      args - the arguments the user provided in the message
export const Busy = async (message: Message, args: string) => {
    // Resolve booking details
    let server:string = message.guild!.id!;
    let user = message.member!.user.username + '#' + message.member!.user.discriminator;
    
    if(ArgsHaveTime(args)) {
        args = args.replace('book ', '')
        let time: Date = GetDateFromArgs(args);
        await RemoveBooking(server, user, time);
        message.channel.send(user + ' was removed from their ' + args + ' booking');
    }
    else {
        await RemoveAllBookingsForDay(server, user, new Date());
        message.channel.send(user + ' was removed from all bookings');
    }
}