"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveAllBookingsForDay = exports.RemoveBooking = exports.CreateSpecificBooking = exports.CreateBooking = exports.GetMostRecentBooking = exports.GetAllBookingsForDay = void 0;
const db_json_1 = require("../Env/db.json");
const promise_1 = require("mysql2/promise");
const DateManipulation_1 = require("../Helpers/DateManipulation");
let conn;
const getConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    if (conn)
        return conn;
    conn = yield (0, promise_1.createConnection)({
        host: db_json_1.db_host,
        port: parseInt(db_json_1.db_port),
        user: db_json_1.db_user,
        password: db_json_1.db_password,
        database: db_json_1.db_name
    });
    return conn;
});
// Gets todays bookings for the given server
// Params:
//      server - server the bookings are for
//      date - date of the bookings to get
const GetAllBookingsForDay = (server, date) => __awaiter(void 0, void 0, void 0, function* () {
    if (!conn)
        yield getConnection();
    let query = `SELECT user_id, time_booked FROM bookings WHERE server_id=\'${server}\' AND date_booked=\'${(0, DateManipulation_1.GetFullDateFromDate)(date)}\' ORDER BY created ASC`;
    let bookings;
    try {
        [bookings] = yield conn.query(query);
    }
    catch (error) {
        console.log(`An exception occurred while getting bookings. Server: \'${server}\', Error: \'${error}\'`);
        throw error;
    }
    finally {
        yield closeConnection();
    }
    return bookings;
});
exports.GetAllBookingsForDay = GetAllBookingsForDay;
// Gets todays bookings for the given server
// Params:
//      server - server the bookings are for
const GetMostRecentBooking = (server) => __awaiter(void 0, void 0, void 0, function* () {
    if (!conn)
        yield getConnection();
    let query = `SELECT user_id, date_booked, time_booked FROM bookings WHERE server_id=\'${server}\' AND created=(SELECT MAX(created) FROM bookings WHERE server_id=\'${server}\')`;
    let bookings;
    try {
        [bookings] = yield conn.query(query);
    }
    catch (error) {
        console.log(`An exception occurred while getting bookings. Server: \'${server}\', Error: \'${error}\'`);
        throw error;
    }
    finally {
        yield closeConnection();
    }
    return bookings;
});
exports.GetMostRecentBooking = GetMostRecentBooking;
// Creates a booking for the given server and user at the given time
// Params:
//      server - server the booking request came from
//      user - user the booking is for
//      time - date object for the date/time the user is booking into
const CreateBooking = (server, user, time) => __awaiter(void 0, void 0, void 0, function* () {
    if (!conn)
        yield getConnection();
    let query = `INSERT INTO bookings (server_id, user_id, date_booked, time_booked) VALUES (\'${server}\', \'${user}\', \'${(0, DateManipulation_1.GetFullDateFromDate)(time)}\', \'${(0, DateManipulation_1.Get24HourTimeFromDate)(time)}\')`;
    try {
        yield conn.query(query);
    }
    catch (error) {
        console.log(`An exception occurred while deleting a booking. Server: \'${server}\', User: \'${user}\', Error: \'${error}\'`);
        throw error;
    }
    finally {
        yield closeConnection();
    }
});
exports.CreateBooking = CreateBooking;
// Creates a booking for the given server and user at the given time
// Params:
//      server - server the booking request came from
//      user - user the booking is for
//      time - time for the booking
//      date - date for the booking
const CreateSpecificBooking = (server, user, date, time) => __awaiter(void 0, void 0, void 0, function* () {
    if (!conn)
        yield getConnection();
    let query = `INSERT INTO bookings (server_id, user_id, date_booked, time_booked) VALUES (\'${server}\', \'${user}\', \'${date}\', \'${time}\')`;
    try {
        yield conn.query(query);
    }
    catch (error) {
        console.log(`An exception occurred while deleting a booking. Server: \'${server}\', User: \'${user}\', Error: \'${error}\'`);
        throw error;
    }
    finally {
        yield closeConnection();
    }
});
exports.CreateSpecificBooking = CreateSpecificBooking;
// Removes a specific booking for a user for the current day from the database
// Params:
//      server - server the request came from
//      user - user the booking is for
//      time - the date and time of the booking to remove
const RemoveBooking = (server, user, date) => __awaiter(void 0, void 0, void 0, function* () {
    if (!conn)
        yield getConnection();
    let query = `DELETE FROM bookings WHERE server_id=\'${server}\' AND user_id=\'${user}\' AND date_booked=\'${(0, DateManipulation_1.GetFullDateFromDate)(date)}\' AND time_booked=\'${(0, DateManipulation_1.Get24HourTimeFromDate)(date)}\')`;
    try {
        yield conn.query(query);
    }
    catch (error) {
        console.log(`An exception occurred while deleting a booking. Server: \'${server}\', User: \'${user}\', Error: \'${error}\'`);
        throw error;
    }
    finally {
        yield closeConnection();
    }
});
exports.RemoveBooking = RemoveBooking;
// Removes all bookings for a user for the current day from the database
// Params:
//      server - server the request came from
//      user - user the booking is for
//      date - date to remove the bookings from
const RemoveAllBookingsForDay = (server, user, date) => __awaiter(void 0, void 0, void 0, function* () {
    if (!conn)
        yield getConnection();
    let query = `DELETE FROM bookings WHERE server_id=\'${server}\' AND user_id=\'${user}\' AND date_booked=\'${(0, DateManipulation_1.GetFullDateFromDate)(date)}\'`;
    try {
        yield conn.query(query);
    }
    catch (error) {
        console.log(`An exception occurred while deleting all bookings. Server: \'${server}\', User: \'${user}\', Error: \'${error}\'`);
        throw error;
    }
    finally {
        yield closeConnection();
    }
});
exports.RemoveAllBookingsForDay = RemoveAllBookingsForDay;
const closeConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    yield conn.end();
});
