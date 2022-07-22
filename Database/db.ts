import { db_host, db_port, db_user, db_password, db_name } from '../Env/db.json';
import { createConnection, Connection } from 'mysql';

let conn: Connection;

const getConnection = (): Connection => {
    if (conn) return conn;

    conn = createConnection({
        host: db_host,
        port: parseInt(db_port),
        user: db_user,
        password: db_password,
        database: db_name
    });

    return conn;
};

export const Execute = async (query: string) => {
    if(!conn) getConnection();

    conn.query(query, function (error, results) {
        if (error) {
            console.log(error);
            throw error;
        }

        return results;
    });

    await closeConnection();
}

const closeConnection = async () => {
    conn.end();
};