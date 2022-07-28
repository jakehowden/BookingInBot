import { db_host, db_port, db_user, db_password, db_name } from '../Env/db.json';
import { createConnection, Connection } from 'mysql2/promise';
import { Booking } from '../Models/Booking';
import { Get24HourTimeFromDate, GetFullDateFromDate } from '../Helpers/DateManipulation';

let conn: Connection;

const getConnection = async (): Promise<Connection> => {
    if (conn) return conn;

    conn = await createConnection({
        host: db_host,
        port: parseInt(db_port),
        user: db_user,
        password: db_password,
        database: db_name
    });

    return conn;
};

// Gets todays bookings for the given server
// Params:
//      server - server the bookings are for
//      date - date of the bookings to get
export const GetAllBookingsForDay = async (server: string, date: Date): Promise<Booking[]> => {
    if(!conn) await getConnection();

	let query = `SELECT user_id, time_booked FROM bookings WHERE server_id=\'${server}\' AND date_booked=\'${GetFullDateFromDate(date)}\' ORDER BY created ASC`;
    let bookings: Booking[];
    try
    {
        [bookings] = await conn.query<Booking[]>(query);
    }
    catch(error)
    {
        console.log(`An exception occurred while getting bookings. Server: \'${server}\', Error: \'${error}\'`)
        throw error;
    }
    finally
    {
        await closeConnection();
    }

    return bookings;
}

// Gets todays bookings for the given server
// Params:
//      server - server the bookings are for
export const GetMostRecentBooking = async (server: string): Promise<Booking[]> => {
    if(!conn) await getConnection();

	let query = `SELECT user_id, date_booked, time_booked FROM bookings WHERE server_id=\'${server}\' AND created=(SELECT MAX(created) FROM bookings WHERE server_id=\'${server}\')`;
    let bookings: Booking[];
    try
    {
        [bookings] = await conn.query<Booking[]>(query);
    }
    catch(error)
    {
        console.log(`An exception occurred while getting bookings. Server: \'${server}\', Error: \'${error}\'`)
        throw error;
    }
    finally
    {
        await closeConnection();
    }

    return bookings;
}


// Creates a booking for the given server and user at the given time
// Params:
//      server - server the booking request came from
//      user - user the booking is for
//      time - date object for the date/time the user is booking into
export const CreateBooking = async (server: string, user: string, time: Date) => {
    if(!conn) await getConnection();

	let query = `INSERT INTO bookings (server_id, user_id, date_booked, time_booked) VALUES (\'${server}\', \'${user}\', \'${GetFullDateFromDate(time)}\', \'${Get24HourTimeFromDate(time)}\')`;
    try
    {
        await conn.query(query);
    }
    catch(error)
    {
        console.log(`An exception occurred while deleting a booking. Server: \'${server}\', User: \'${user}\', Error: \'${error}\'`)
        throw error;
    }
    finally
    {
        await closeConnection();
    }
}

// Creates a booking for the given server and user at the given time
// Params:
//      server - server the booking request came from
//      user - user the booking is for
//      time - time for the booking
//      date - date for the booking
export const CreateSpecificBooking = async (server: string, user: string, date: string, time: string) => {
    if(!conn) await getConnection();

	let query = `INSERT INTO bookings (server_id, user_id, date_booked, time_booked) VALUES (\'${server}\', \'${user}\', \'${date}\', \'${time}\')`;
    try
    {
        await conn.query(query);
    }
    catch(error)
    {
        console.log(`An exception occurred while deleting a booking. Server: \'${server}\', User: \'${user}\', Error: \'${error}\'`)
        throw error;
    }
    finally
    {
        await closeConnection();
    }
}

// Removes a specific booking for a user for the current day from the database
// Params:
//      server - server the request came from
//      user - user the booking is for
//      time - the date and time of the booking to remove
export const RemoveBooking = async (server: string, user: string, date: Date) => {
    if(!conn) await getConnection();
    
    let query: string = `DELETE FROM bookings WHERE server_id=\'${server}\' AND user_id=\'${user}\' AND date_booked=\'${GetFullDateFromDate(date)}\' AND time_booked=\'${Get24HourTimeFromDate(date)}\')`;
    try
    {
        await conn.query(query);
    }
    catch(error)
    {
        console.log(`An exception occurred while deleting a booking. Server: \'${server}\', User: \'${user}\', Error: \'${error}\'`)
        throw error;
    }
    finally
    {
        await closeConnection();
    }
}

// Removes all bookings for a user for the current day from the database
// Params:
//      server - server the request came from
//      user - user the booking is for
//      date - date to remove the bookings from
export const RemoveAllBookingsForDay = async (server: string, user: string, date: Date) => {
    if(!conn) await getConnection();

    let query = `DELETE FROM bookings WHERE server_id=\'${server}\' AND user_id=\'${user}\' AND date_booked=\'${GetFullDateFromDate(date)}\'`;
    try
    {
        await conn.query(query);
    }
    catch(error)
    {
        console.log(`An exception occurred while deleting all bookings. Server: \'${server}\', User: \'${user}\', Error: \'${error}\'`)
        throw error;
    }
    finally
    {
        await closeConnection();
    }
}

const closeConnection = async () => {
    await conn.end();
};