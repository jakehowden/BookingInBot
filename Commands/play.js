import { GetDateFromArgs, GetFullDateFromDate, Get24HourTimeFromDate } from '../Helpers/dateTime.js';

module.exports = {
    name: 'play',
    description: 'Log when a player books in for a specific time',
    aliases: ['book'],
    usage: '!play 7:30',
    cooldown: 3,
    execute(message, args, server, user) {
        // Verify time given
        if (args === 'play' || args === 'play ' || args === 'book' || args === 'book ') // no time
            return;

        var time = new Date();
        var toRemove = args.contains('play ') ? 'play ' : 'book ';
        try {
           time = GetDateFromArgs(args.replace(toRemove, ''));
        }
        catch(err) {
          return; // no valid time from given time
        }
        
        // Set up DB connection
        var pool = require('../db.js');
        var database = pool.getPool();
        const { commands } = message.client;
        
        // Create booking and confirm in channel chat
        CreateBooking(database, server, user, time);
        message.channel.send(user + ' booked in for ' + Get24HourTimeFromDate(time));     
    }
};

// A function to add a new booking to the database
// Params:
//      database - database the booking is added to
//      server - server the booking request came from
//      user - user the booking is for
//      time - date object for the date/time the user is booking into
function CreateBooking(database, server, user, time) {
	return new Promise(function(resolve, reject) {
		var sql = `INSERT INTO bookings (server, user, date, time) VALUES (\'${server}\', \'${user}\', \'${GetFullDateFromDate(time)}\', \'${Get24HourTimeFromDate(time)}\')`;

		database.query(sql, function (error, results, fields) {
			if (error) {
				return reject(error);
			}
			resolve(results);
		});
	});
}