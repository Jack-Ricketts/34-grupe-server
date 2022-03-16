const handler = {};

handler.contact = (data, callback) => {
    const acceptableMethods = ['get', 'post', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return handler._contact[data.httpMethod](data, callback);
    }

    return callback(404, {
        status: 'error',
        msg: 'Tavo norimas HTTPmethod yra nepalaikomas'
    });
}

handler._contact = {};

handler._contact.post = (data, callback) => {
    // sukuriam
    return callback(200, {
        status: 'success',
        msg: 'Zinute sukurta'
    });
}

handler._contact.get = (data, callback) => {
    // gaunam
    return callback(200, {
        status: 'success',
        msg: 'Zinutes info'
    });
}

handler._contact.delete = (data, callback) => {
    // istrinam
    return callback(200, {
        status: 'success',
        msg: 'Zinute istrinta'
    });
}

export default handler;