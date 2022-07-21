import env from '../Env/environment.json';
import local from '../Env/db-local-test.json';
import prod from '../Env/db.json';
import { createPool, Pool } from 'mysql';

let pool: Pool;
let db_host: string;
let db_port: number;
let db_user: string;
let db_password: string;
let db_name: string;

const getPool = (): Pool => {
    if (pool) return pool;

    if (env.environment === 'development')
    {
        db_host = local.db_host;
        db_port = parseInt(local.db_port);
        db_user = local.db_user;
        db_password = local.db_password;
        db_name = local.db_name;
    }
    else
    {
        db_host = prod.db_host;
        db_port = parseInt(prod.db_port);
        db_user = prod.db_user;
        db_password = prod.db_password;
        db_name = prod.db_name;
    }

    pool = createPool({
        host     : db_host,
        port     : db_port,
        user     : db_user,
        password : db_password,
        database : db_name
    });
    return pool;
};

export const Execute = (query: string) => {
    if(!pool)
    {
        getPool();
    }

    return new Promise(function(resolve, reject) {
		pool.query(query, function (error, results, fields) {
			if (error) {
				return reject(error);
			}
			resolve(results);
		});
	});
}

export const closeConnection = async () => {
    pool.end();
};