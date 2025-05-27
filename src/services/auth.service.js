const jwt = require('jsonwebtoken');
const PasswordManager = require('../helper/passwordManager');
const AuthRepository = require('../repositories/auth.repository');
const errorConstant = require('../exceptionHandler/error.constants')
const authRepository = new AuthRepository()

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

exports.register = async (userData) => {
    const existingUser = await authRepository.findByUsername(userData.username);
    if (existingUser?.length) 
        throw errorConstant.userAlreadyExist

    userData.password = PasswordManager.hash(userData.password);
    const user = await authRepository.createUser(userData);
    return user;
};
