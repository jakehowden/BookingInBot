module.exports = { 
    Run(message, cmd)
    {
        message.delete();
        cmd = cmd.replace('ask ', '');
        var user = message.member.displayName;
        message.channel.send('**' + user + '** asks: ' + cmd)
                .then(m =>{
                    m.react('👍');
                    m.react('👎');
                });
    }
};