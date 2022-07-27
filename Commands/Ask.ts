import { Message } from "discord.js";

export const Ask = (message: Message, args: string) => {
    message.delete();

    args = args.replace('ask ', '');
    let user = message.member!.displayName;
    
    message.channel.send('**' + user + '** asks: ' + args)
                   .then(m =>{
                        m.react('👍');
                        m.react('👎');
                    });
}