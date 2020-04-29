var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var seven = []; // 7:30PM slot
var five = []; // 5:00PM slot
var twelve = []; // 12:00PM slot

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // The bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    
    if (message.substring(0, 1) === '!') {
        var cmd = message.replace('!', '');
        
        if (cmd.includes('version'))
        {
            Version(channelID);
        }
        else if (cmd.includes('commands'))
        {
            Commands(channelID);
        }
        else if(cmd.includes('play')) // user is booking in
        {
            Play(cmd, user, channelID);
        }
        else if(cmd.includes('booked')) // user is checking the current bookings
        {
           Booked(channelID); 
        }
        else if(cmd.includes('busy'))
        {
           Busy(cmd, user, channelID) ;
        }
        else if (cmd.includes('reset'))
        {
           Reset();
        }
     }
});

function Version(channelID)
{
    bot.sendMessage({
        to: channelID,
        message: 'Version 1.0.0'
    });
}

function Commands(channelID)
{
    msg = 'Commands:';
    msg += '\n!play - Book in for a gaming session, i.e. !play 7:30';
    msg += '\n!busy - Unbook from a gaming session, i.e. !busy 7:30';
    msg += '\n!booked - Check who is booked in for the day';
    msg += '\n!reset - Clears all current bookings';
    msg += '\n Available times are 12:00, 5:00, 7:30 and all (all books into all three times)';
    
    bot.sendMessage({
        to: channelID,
        message: msg
    });
}

function Reset()
{
    twelve = [];
    five = [];
    seven = [];
}

function Play(cmd, user, channelID) 
{
    if (cmd === 'play' || cmd === 'play ') // no time
        return;
    
    cmd = cmd.replace('play ', '');
            
    if (cmd === '12' || cmd === '12:00')
    {
        if (twelve.includes(user)) // if user has already booked in do nothing
            return;
        twelve.push(user);
                
        cmd = '12:00PM';
    }
    else if (cmd === '5' || cmd === '5:00')
    {
        if (five.includes(user)) // if user has already booked in do nothing
            return;
        five.push(user);
                
        cmd = '5:00PM';
    }
    else if (cmd === '7:30')
    {
        if (seven.includes(user)) // if user has already booked in do nothing
            return;
        seven.push(user);
                
        cmd = '7:30PM';
    }
    else if (cmd === 'all') // books user in for all 3 timeslots
    {
        if (!twelve.includes(user))
            twelve.push(user);
                
        if (!five.includes(user))
            five.push(user);
                
        if (!seven.includes(user))
            seven.push(user);
                
                cmd = 'the whole day'; // change so bot message looks complete
    }
            
    bot.sendMessage({
        to: channelID,
        message: user + ' booked in for ' + cmd
    });
}

function Booked(channelID)
{
    var msg = ''; // Will hold all the user currently booked in
            
    // check which times have been booked into
    if (twelve.length !== 0)
    {
        msg += '\n12:00PM Bookings: ';
        msg += twelve.join(', ');
    }
    if (five.length !== 0)
    {    
        msg += '\n5:00PM Bookings: ';
        msg += five.join(', ');
    }
    if (seven.length !== 0)
    {    
        msg += '\n7:30PM Bookings: ';
        msg += five.join(', ');
    }
    bot.sendMessage({
        to: channelID,
        message: msg
    });
}

function Busy(cmd, user, channelID)
{
    if (cmd === 'busy' || cmd === 'busy ') // no time
        return;
    cmd = cmd.replace('busy ', '');
            
    if (cmd === '12' || cmd === '12:00')
    {
        if (!twelve.includes(user))
            return;
        
        twelve.splice(twelve.indexOf(user), 1);
        cmd = '12:00PM';
    }
    else if (cmd === '5' || cmd === '5:00')
    {
        if (!five.includes(user))
            return;
        
        five.splice(five.indexOf(user), 1);
        cmd = '5:00PM';
    }
    else if (cmd === '7:30')
    {
        if (!seven.includes(user))
            return;
        
        seven.splice(seven.indexOf(user), 1);
        cmd = '7:30PM';
    }
    else if (cmd === 'all') // removes user from all 3 timeslots
    {
        if (!twelve.includes(user))
            twelve.splice(twelve.indexOf(user), 1);
                
        if (!five.includes(user))
            five.splice(five.indexOf(user), 1);
                
        if (!seven.includes(user))
            seven.splice(seven.indexOf(user), 1);
                
        cmd = 'all day'; // change so bot message looks complete
    }
    bot.sendMessage({
        to: channelID,
        message: user + ' was removed from their ' + cmd + ' booking'
    });
}