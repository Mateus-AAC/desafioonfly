const jwt = require('jsonwebtoken');

module.exports = {
    verifyJWT: (req, res, next) => {
        const token = req.headers['x-access-token'];
        
        if (!token)  {
            return res.status(401).send({ auth: false, message: 'No tokens provided.' });
        }

        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate the token.' });
            req.userId = decoded.id;
            next();
        });
        
    }
}