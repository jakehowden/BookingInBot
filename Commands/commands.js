module.exports = { 
    Run(message, authed_users)
    {
        msg = 'Commands:';
        msg += '\n!play - Book in for a gaming session, i.e. !play 7:30';
        msg += '\n!busy - Unbook from a gaming session, i.e. !busy 7:30';
        msg += '\n!booked - Check who is booked in for the day';
        msg += '\n!reset - Clears all current bookings, only for use by ' + authed_users.join(', ');
        msg += '\nAvailable times are 10:00AM, 12:00PM, 5:00PM, 7:30PM and all (all books into all four times)';
        msg += '\n!patchnotes - Check the patch notes for the current bot version';

        message.channel.send(msg);
    }
};