import { Message } from 'discord.js';
import { GetDateFromArgs, GetFullDateFromDate, Get24HourTimeFromDate } from '../Helpers/dateTime';

export const BookUser = (message: Message, args: string) => {
    if (args === 'play' || args === 'play ') // no time
            return;
    
    let time = new Date();
    time = GetDateFromArgs(args.replace('play ', ''));
    
}