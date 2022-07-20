import { Client, ClientOptions } from "discord.js";
import auth from './Env/discord.json';

// Init Discord Bot
const options: ClientOptions = {
    intents: []
}
const bot = new Client(options);

// Login to Discord
bot.login(auth.token);

bot.on('ready', () => {
    console.log('Connected - ready for commands');
});

bot.on('message', message => {

    let cmd : string = message.content.replace('!', '');
    let server = message.guild.id;
    let user = message.member.user.username + '#' + message.member.user.discriminator;
    
    switch(true)
    {
        case cmd.includes('play'): {
            break;
        }
        
        case cmd.includes('same'): {
            break;
        }
        
        case cmd.includes('busy'): {
            break;
        }
        
        case cmd.includes('booked'): {
            break;
        }
        
        case cmd.includes('ask'): {
            break;
        }
        
        case cmd.includes('help'): {
            break;
        }
        
        case cmd.includes('patchnotes'): {
            break;
        }
        
        case cmd.includes('version'): {
            break;
        }
    };
});