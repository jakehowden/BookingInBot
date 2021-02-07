function Run(message, cmd)
{
    message.delete();
    var user = message.member.displayName;
    message.channel.send(user + ' asks: ' + cmd)
            .then(m => m.react(':thumbsup:'))
            .then(m => m.react(':thumbsdown:'));
}

