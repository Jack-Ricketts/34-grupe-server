import sqlite3 from 'sqlite3';
import {createClient} from 'redis';
import { utils } from './utils.js';

const database = {};

database.init = async () => {
    database.sqlite = new sqlite3.Database('database');
    database.redis = createClient();
    await database.redis.connect();

    database.run = (sql, values) => { 
        return new Promise((resolve, reject) => {
        database.sqlite.run(sql, values, function (err) {
            if(err) reject(err);
            resolve();
        });
    })};
    
    database.select = (sql, values) => { 
        return new Promise((resolve, reject) => {
        database.sqlite.all(sql, values, function (err, rows) {
            if(err) reject(err);
            resolve(rows);
        });
    })};

    database.users = {};

    database.users.register = async (username, email, password) => {
        await database.select(
            'INSERT INTO users(username, email, password) values (?, ?, ?);',
            [username, email, utils.hash(password)]
        )
    }

    database.users.login = async (email, password) => {
        try {
            const res = await database.select(
                    'select id, username, email from users WHERE email = ? AND password = ?;',
                    [email, utils.hash(password)]);
            if(res.length != 1) {
                throw 400;
            }
            const userData = res[0];
            if(!userData.id) throw 500;

            const token = utils.randomString(20);
            const tokenData = {
                token: token,
                userId: userData.id
            }
            await database.redis.set(`tokens:${token}`, JSON.stringify(tokenData), {EX: 120});
            return token;

        } catch(err) {
            if(err == 400) throw err;
            else {
                console.error(err);
                throw 500;
            }
        }
    };

    database.users.getToken = async (token) => {
        const tokenJson = await database.redis.get(`tokens:${token}`);
        return tokenJson ? JSON.parse(tokenJson) : null;
    }
}

export { database };