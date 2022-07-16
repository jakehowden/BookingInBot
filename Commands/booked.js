import {Get24HourTimeFromDate, GetFullDateFromDate } from '../Helpers/dateTime.js';

module.exports = {
    name: 'booked',
    description: 'Gets all current bookings',
    aliases: ['playing'],
    usage: '!booked',
    cooldown: 3,
    execute(message, server) {

        // Set up DB connection
        var pool = require('../db.js');
        var database = pool.getPool();
        const { commands } = message.client;
        
        // Create booking and confirm in channel chat
        var bookings = GetBookings(database, server, user);
		// TODO - handle returned bookings and send a message
    }
};

// A function to add a new booking to the database
// Params:
//      database - database the booking is added to
//      server - server the booking request came from
//      user - user the booking is for
function GetBookings(database, server, user) {
	return new Promise(function(resolve, reject) {
		var sql = `SELECT slot FROM bookings WHERE server == ` + server + ' AND user == ' + user + ' AND date == ' + GetFullDateFromDate(new Date());

		database.query(sql, function (error, results, fields) {
			if (error) {
				return reject(error);
			}
			resolve(results);
		});
	});
}