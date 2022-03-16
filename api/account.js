import { file } from "../lib/file.js";
import { IsValid } from "../lib/IsValid.js";
import { utils } from "../lib/utils.js";
import { database } from "../lib/database.js";
import { promisify } from "util";

const handler = {};

handler.account = async (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return await handler._account[data.httpMethod](data, callback);
    }

    return callback(404, {
        status: 'error',
        msg: 'Tavo norimas HTTPmethod yra nepalaikomas'
    });
}

handler._account = {};

handler._account.post = async (data, callback) => { // Registracija
    const userObj = data.payload;

    if (!userObj) {
        return callback(400, {
            status: 'error',
            msg: 'Nevalidus JSON objektas'
        });
    }

    const [usernameError, usernameMsg] = IsValid.username(userObj.username);
    if (usernameError) {
        return callback(400, {
            status: 'error',
            msg: usernameMsg
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

    const alreadyRegistered = false;//TODO

    if (alreadyRegistered) {
        return callback(400, {
            status: 'error',
            msg: 'Paskyra su tokiu el. pastu jau uzregistruota'
        });
    }

    try{
        await database.users.register(userObj.username, userObj.email, userObj.pass);
    } catch(err) {
        console.log(err);
        return callback(500, {
            status: 'error',
            msg: err
        });
    }

    return callback(200, {
        status: 'success',
        msg: 'Paskyra sukurta',
        action: {
            name: 'redirect',
            param: '/login'
        }
    });
}

handler._account.get = (data, callback) => {
    // gaunam
    return callback(200, {
        status: 'success',
        msg: 'Paskyros info'
    });
}

handler._account.put = (data, callback) => {
    // atnaujinam
    return callback(200, {
        status: 'success',
        msg: 'Paskyra atnaujinta'
    });
}

handler._account.delete = (data, callback) => {
    // istrinam
    return callback(200, {
        status: 'success',
        msg: 'Paskyra istrinta'
    });
}

export default handler;