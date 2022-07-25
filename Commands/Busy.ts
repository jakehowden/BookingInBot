import { Message } from "discord.js";
import { Execute } from "../Database/db";
import { Get24HourTimeFromDate, GetDateFromArgs, GetFullDateFromDate } from "../Helpers/DateManipulation";
import { ArgsHaveTime } from "../Helpers/StringManipulation";

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
        await RemoveAllBookings(server, user);
        message.channel.send(user + ' was removed from all bookings');
    }
}

// Removes a specific booking for a user for the current day from the database
// Params:
//      server - server the booking request came from
//      user - user the booking is for
//      time - the time of the booking to remove
const RemoveBooking = async (server: string, user: string, time: Date) => {
    let query = `DELETE FROM bookings WHERE server_id=\'${server}\' AND user_id=\'${user}\' AND date_booked=\'${GetFullDateFromDate(time)}\' AND time_booked=\'${Get24HourTimeFromDate(time)}\')`;
    await Execute(query);
}

// Removes all bookings for a user for the current day from the database
// Params:
//      server - server the booking request came from
//      user - user the booking is for
const RemoveAllBookings = async (server: string, user: string) => {
    let query = `DELETE FROM bookings WHERE server_id=\'${server}\' AND user_id=\'${user}\' AND date_booked=\'${GetFullDateFromDate(new Date())}\'`;
    await Execute(query);
}