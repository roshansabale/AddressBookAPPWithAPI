const jwt = require('jsonwebtoken');

exports.checkToken = (request, response, next) => {
    try {
        let tokens = request.headers['token'];
        if (tokens == undefined || tokens == null) {
            throw 'No token available'
        } else {
            jwt.verify(tokens, 'secret', (error, data) => {
                if (error) {
                    return response.status(401).send(error);
                } else {
                    next();
                }
            })
        }
    } catch (error) {
        next(error);
    }
}