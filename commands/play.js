module.exports = {
    name: 'play',
    description: 'Log when a player books in for a specific time',
    aliases: ['book'],
    usage: '!play [{10:00|12:00|5:00|7:30}]',
    cooldown: 3,
    execute(message, args, server, user) {
        // Verify time given
        if (args === 'play' || args === 'play ') // no time
            return;
        
        try {
           time = GetDateFromArgs(args);
        }
        catch(err) {
          return; // no valid time from given time
        }
        
        // Set up DB connection
        var time = new Date();
        var pool = require('../db.js');
        var database = pool.getPool();
        const { commands } = message.client;
        
        // Create booking and confirm in channel chat
        CreateBooking(database, server, user, time);
        message.channel.send(user + ' booked in for ' + time.getHours() + ':' + time.getMinutes());     
    }
};

// A function to add a new booking to the database
// Params:
//      database - database the booking is added to
//      server - server the booking request came from
//      user - user the booking is for
//      time - time the user is booking into
function CreateBooking(database, server, user, time) {
	return new Promise(function(resolve, reject) {
		var sql = `INSERT INTO bookings (server, user, time) VALUES (\'${server}\', \'${user}\', \'${time}\')`;

		database.query(sql, function (error, results, fields) {
			if (error) {
				return reject(error);
			}
			resolve(results);
		});
	});
}

// Function which returns a valid Date() object from the time given in the args
function GetDateFromArgs(args) {
    args.replace('play ', '');
    var fullTimes = ['10:00', '12:00', '5:00', '7:30'];
    var shortTimes = ['10', '12', '5'];
    
    if(!fullTimes.includes(args) && !shortTimes.includes(args))
    {
        throw 'Given time was not valid';
    }
    
    var today = new Date();
    args = args.split(':');
    if(args.length === 2)
    {
        today.setHours(args[0], args[1], 0, 0);
    }
    else
    {
        today.setHours(args[0], 0, 0, 0);
    }
    
    return today;
}