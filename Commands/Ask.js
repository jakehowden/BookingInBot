"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ask = void 0;
const Ask = (message, args) => {
    message.delete();
    args = args.replace('ask ', '');
    let user = message.member.displayName;
    message.channel.send('**' + user + '** asks: ' + args)
        .then(m => {
        m.react('👍');
        m.react('👎');
    });
};
exports.Ask = Ask;
