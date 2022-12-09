const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {
            console.log('err', err);
            if (err) return res.sendStatus(403); //invalid token
            // console.log('decoded', decoded);

            req.user = decoded.user;
            req.role = decoded.role;
            console.log('decoded', req.user, req.role);
            console.log('calling next(')
            next();
        }
    );
}

module.exports = verifyJWT