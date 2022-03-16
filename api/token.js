import { file } from "../lib/file.js";
import { IsValid } from "../lib/IsValid.js";
import { utils } from "../lib/utils.js";
import config from '../config.js';
import { database } from "../lib/database.js";

const handler = {};

handler.token = async (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return await handler._token[data.httpMethod](data, callback);
    }

    return callback(404, {
        status: 'error',
        msg: 'Tavo norimas HTTPmethod yra nepalaikomas'
    });
}

handler._token = {};

handler._token.post = async (data, callback) => { //Login
    const userObj = data.payload;

    if (!userObj) {
        return callback(400, {
            status: 'error',
            msg: 'Nevalidus JSON objektas'
        });
    }

    const [emailError, emailMsg] = IsValid.email(userObj.email);
    if (emailError) {
        return callback(400, {
            status: 'error',
            msg: emailMsg
        });
    }

    const [passwordError, passwordMsg] = IsValid.password(userObj.pass);
    if (passwordError) {
        return callback(400, {
            status: 'error',
            msg: passwordMsg
        });
    }
    
    let token;
    try{
        token = await database.users.login(userObj.email, userObj.pass);
    }
    catch (error) {
        switch(error){
            case 400: 
                return callback(400, {
                    status: 'error',
                    msg: 'Invalid email and password match'
                });
            default:
                return callback(500, {
                    status: 'error',
                    msg: 'Internal server error while trying to get user informatio'
                });
        }
    }

    const cookies = [
        'login-token=' + token,
        'path=/',
        'domain=localhost',
        'max-age=' + config.cookiesMaxAge,
        'expires=Sun, 16 Jul 3567 06:23:41 GMT',
        // 'Secure',
        'SameSite=Lax',
        'HttpOnly'
    ];

    return callback(200, {
        status: 'success',
        msg: 'Sesija sukurta',
        action: {
            name: 'redirect',
            param: '/'
        }
    }, {
        'Set-Cookie': cookies.join('; '),
    });
}

handler._token.get = (data, callback) => {
    // gaunam
    return callback(200, {
        status: 'success',
        msg: 'Sesijos info'
    });
}

handler._token.put = (data, callback) => {
    // atnaujinam
    return callback(200, {
        status: 'success',
        msg: 'Sesija atnaujinta'
    });
}

handler._token.delete = (data, callback) => {
    // istrinam
    return callback(200, {
        status: 'success',
        msg: 'Sesija istrinta'
    });
}

export default handler;