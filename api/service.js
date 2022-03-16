const handler = {};

handler.service = (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return handler._service[data.httpMethod](data, callback);
    }

    return callback(404, {
        status: 'error',
        msg: 'Tavo norimas HTTPmethod yra nepalaikomas'
    });
}

handler._service = {};

handler._service.post = (data, callback) => {
    // sukuriam
    return callback(200, {
        status: 'success',
        msg: 'Paslauga sukurta'
    });
}

handler._service.get = (data, callback) => {
    // gaunam
    return callback(200, {
        status: 'success',
        msg: 'Paslaugos info'
    });
}

handler._service.put = (data, callback) => {
    // atnaujinam
    return callback(200, {
        status: 'success',
        msg: 'Paslauga atnaujinta'
    });
}

handler._service.delete = (data, callback) => {
    // istrinam
    return callback(200, {
        status: 'success',
        msg: 'Paslauga istrinta'
    });
}

export default handler;