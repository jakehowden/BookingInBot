const { db_host, db_port, db_name, db_user, db_password } = require('./env/db.json');

var mysql = require('mysql');
var pool;

const getPool = () => {
    if (pool) return pool;
    pool = mysql.createPool({
        host     : db_host,
        port     : db_port,
        user     : db_user,
        password : db_password,
        database : db_name
    });
    return pool;
};

exports.getPool = getPool;