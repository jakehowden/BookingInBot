function Run(message, version)
{
    msg = 'Patch notes (' + version + '):';
    msg += '\n  - Added !ask command. Prints a poll, respond to the poll via the reaction emojis';
    msg += '\n  - !play, !busy, !booked, !reset and !ask messages are deleted on response.';
    
    message.channel.send(msg);
}


