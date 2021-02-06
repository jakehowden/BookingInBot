var Discord = require('discord.js');
var auth = require('./env/discord.json');
var version = "v1.2.1";
var seven = []; // 7:30PM slot
var five = []; // 5:00PM slot
var twelve = []; // 12:00PM slot
var ten = []; // 10:00AM slot
var authed_users = ["Snak 3#7036", "Adam_Giambrone#6710", "Finndiesel#6508", "PeteTheBoyes#1211", "tomlbarden#7984"];
var booking_date = '';

// Initialize Discord Bot
var bot = new Discord.Client();

bot.on('ready', () => {
  console.log('Connected');
});

bot.on('message', message => {
  if (message.content.substring(0, 1) === '!') {
      
        var cmd = message.content.replace('!', '');
        
        var today = new Date();
        today.setHours(0,0,0,0);
        
        if (booking_date === '' || booking_date < today)
        {
            Reset();
            booking_date = today;
        }
        
        if(cmd.includes('play'))
        {
            Play(cmd, message);
        }
        else if(cmd.includes('booked'))
        {
           Booked(message);
        }
        else if(cmd.includes('busy'))
        {
           Busy(cmd, message);
        }
        else if(cmd.includes('reset'))
        {
           var usr = message.member.user;
            if(!authed_users.includes(usr.username + '#' + usr.discriminator))
                message.channel.send(message.member.displayName + ', you are not authorised to use that command.'); 
            else
            {
                Reset();
                message.delete();
            }
        }
        else if(cmd.includes('ask'))
        {
           Ask(message, cmd);
        }
        else if(cmd.includes('version'))
        {
           Version(message);
        }
        else if(cmd.includes('help'))
        {
           Commands(message);
        }
        else if(cmd.includes('patchnotes'))
        {
           PatchNotes(message);
        }
  }
});

bot.login(auth.token);

function Version(message)
{
    message.channel.send(version);
}

function PatchNotes(message)
{
    msg = 'Patch notes (' + version + '):';
    msg += '\n  - Added !patchnotes command, prints patch notes for current bot version';
    msg += '\n  - Added 10:00AM booking slot';
    msg += '\n  - Renamed !commands to !help';
    msg += '\n  - Bug fixes, rework of resetting bookings in a new day';
    
    message.channel.send(msg);
}

function Commands(message)
{
    msg = 'Commands:';
    msg += '\n!play - Book in for a gaming session, i.e. !play 7:30';
    msg += '\n!busy - Unbook from a gaming session, i.e. !busy 7:30';
    msg += '\n!booked - Check who is booked in for the day';
    msg += '\n!reset - Clears all current bookings, only for use by ' + authed_users.join(', ');
    msg += '\n Available times are 10:00AM, 12:00PM, 5:00PM, 7:30PM and all (all books into all four times)';
    msg += '\n!patchnotes - Check the patch notes for the current bot version';
    
    message.channel.send(msg);
}

function Ask(message, cmd)
{
    message.delete();
    var user = message.member.displayName;
    message.channel.send(user + ' asks: ' + cmd)
            .then(m => m.react(':thumbsup:'))
            .then(m => m.react(':thumbsdown:'));
}

function Reset()
{
    ten = [];
    twelve = [];
    five = [];
    seven = [];
}

function Play(cmd, message) 
{
    message.delete();
    if (cmd === 'play' || cmd === 'play ') // no time
        return;
    
    cmd = cmd.replace('play ', '');
    var user = message.member.displayName;
            
    if (cmd === '10' || cmd === '10:00')
    {
        if (ten.includes(user)) // if user has already booked in do nothing
            return;
        ten.push(user);
                
        cmd = '10:00AM';
        message.channel.send(user + ' booked in for ' + cmd); 
    }
    else if (cmd === '12' || cmd === '12:00')
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
        if (!ten.includes(user))
            ten.push(user);
        
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
    message.delete();
    var msg = ''; // Will hold all the user currently booked in
    
    // check which times have been booked into
    if (ten.length !== 0)
    {
        msg += '\n10:00AM Bookings: ';
        msg += ten.join(', ');
    }
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
    
    if(msg === '')
        msg = 'Currently, there are no bookings for today';
        
    message.channel.send(msg);
}

function Busy(cmd, message)
{
    message.delete();
    if (cmd === 'busy' || cmd === 'busy ') // no time
        return;
    
    cmd = cmd.replace('busy ', '');
    var user = message.member.displayName;
    
    if (cmd === '10' || cmd === '10:00')
    {
        if (!ten.includes(user))
            return;
        
        ten.splice(ten.indexOf(user), 1);
        cmd = '10:00AM';
        message.channel.send(user + ' was removed from their ' + cmd + ' booking');
    }
    else if (cmd === '12' || cmd === '12:00')
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
        if (!ten.includes(user))
            ten.splice(ten.indexOf(user), 1);
        
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