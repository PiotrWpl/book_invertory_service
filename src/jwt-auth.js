var jwt = require('jwt-simple');

module.exports = function(secretKey) {
    return function(req, res, next) {
        var token = req.headers['x-auth'];
        try {
            var auth = jwt.decode(token, secretKey);
            next();
        } catch (e) {
            res.setHeader('WWW-Authenticate', 'Basic realm=book inventory access');
            res.status(401).send('Access denied jwt');
        }
    };
};