const jwt = require('jsonwebtoken');
const User = require('../db/models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')[1];

        const decoded = jwt.verify(token, 'this is my new course');

        // finds the user with the associated token, proving that the user has not logged out.
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;

        next();
    } catch (error) {
        return res.status(401).send({ error: 'Not authenticated' })
    }
}

module.exports = auth;