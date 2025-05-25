const jwt = require('jsonwebtoken');

exports.login = async (username, password) => {
    if (
        username === process.env.AUTH_USERNAME &&
        password === process.env.AUTH_PASSWORD
    ) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        return token;
    }

    throw new Error('Invalid credentials');
};
