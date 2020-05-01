var Discord = require('discord.js');
var auth = require('../env/discord.json');
var version = "v1.2.0";
var seven = []; // 7:30PM slot
var five = []; // 5:00PM slot
var twelve = []; // 12:00PM slot
var authed_users = ["Snak 3#7036"];
var booking_date = '';

// Initialize Discord Bot
var bot = new Discord.Client();

bot.on('ready', () => {
  console.log('Connected');
});

bot.on('message', message => {
  if (message.content.substring(0, 1) === '!') {
      
        var cmd = message.content.replace('!', '');
        
        var date = new Date();
        var today = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
        
        if (booking_date === '' || booking_date < today)
        {
            Reset();
            booking_date = today;
        }
        
        // Cannot include this in the switch as 
        // they have more information than just the command
        if(cmd.includes('play'))
        {
            Play(cmd, message);
        }
        else if(cmd.includes('busy'))
        {
           Busy(cmd, message);
        }
        
        // user is not booking in or backing out of a booking
        switch(cmd)
        {
            case 'version':
                Version(message);
                break;
            case 'commands':
                Commands(message);
                break;
            case 'booked':
                Booked(message);
                break;
            case 'reset':
                var usr = message.member.user;
                if(!authed_users.includes(usr.username + '#' + usr.discriminator))
                    message.channel.send(message.member.displayName + ', you are not authorised to use that command, fuck off.'); 
                    break;
                Reset();
                break;
        }
  }
});

bot.login(auth.token);

function Version(message)
{
    message.channel.send(version);
}

function Commands(message)
{
    msg = 'Commands:';
    msg += '\n!play - Book in for a gaming session, i.e. !play 7:30';
    msg += '\n!busy - Unbook from a gaming session, i.e. !busy 7:30';
    msg += '\n!booked - Check who is booked in for the day';
    msg += '\n!reset - Clears all current bookings, only for use by ' + authed_users.join(', ');
    msg += '\n Available times are 12:00, 5:00, 7:30 and all (all books into all three times)';
    
    message.channel.send(msg);
}

function Reset()
{
    twelve = [];
    five = [];
    seven = [];
}

function Play(cmd, message) 
{
    if (cmd === 'play' || cmd === 'play ') // no time
        return;
    
    cmd = cmd.replace('play ', '');
    var user = message.member.displayName;
            
    if (cmd === '12' || cmd === '12:00')
    {
        if (twelve.includes(user)) // if user has already booked in do nothing
            return;
        twelve.push(user);
                
        cmd = '12:00PM';
        message.channel.send(user + ' booked in for ' + cmd); 
    }
    else if (cmd === '5' || cmd === '5:00')
    {
        if (five.includes(user)) // if user has already booked in do nothing
            return;
        five.push(user);
                
        cmd = '5:00PM';
        message.channel.send(user + ' booked in for ' + cmd); 
    }
    else if (cmd === '7:30')
    {
        if (seven.includes(user)) // if user has already booked in do nothing
            return;
        seven.push(user);
                
        cmd = '7:30PM';
        message.channel.send(user + ' booked in for ' + cmd); 
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
        message.channel.send(user + ' booked in for ' + cmd); 
    }     
}

function Booked(message)
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
        msg += seven.join(', ');
    }
    
    if(msg !== '')
        message.channel.send(msg);
}

function Busy(cmd, message)
{
    if (cmd === 'busy' || cmd === 'busy ') // no time
        return;
    
    cmd = cmd.replace('busy ', '');
    var user = message.member.displayName;
            
    if (cmd === '12' || cmd === '12:00')
    {
        if (!twelve.includes(user))
            return;
        
        twelve.splice(twelve.indexOf(user), 1);
        cmd = '12:00PM';
        message.channel.send(user + ' was removed from their ' + cmd + ' booking');
    }
    else if (cmd === '5' || cmd === '5:00')
    {
        if (!five.includes(user))
            return;
        
        five.splice(five.indexOf(user), 1);
        cmd = '5:00PM';
        message.channel.send(user + ' was removed from their ' + cmd + ' booking');
    }
    else if (cmd === '7:30')
    {
        if (!seven.includes(user))
            return;
        
        seven.splice(seven.indexOf(user), 1);
        cmd = '7:30PM';
        message.channel.send(user + ' was removed from their ' + cmd + ' booking');
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
        message.channel.send(user + ' was removed from their ' + cmd + ' booking');
    }
}