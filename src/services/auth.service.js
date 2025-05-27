const jwt = require('jsonwebtoken');
const PasswordManager = require('../helper/passwordManager');
const AuthRepository = require('../repositories/auth.repository');
const errorConstant = require('../exceptionHandler/error.constants')
const authRepository = new AuthRepository()

exports.login = async (username, password) => {
    const userData = await authRepository.findByUsername(username);
    if (!userData.length)
        throw errorConstant.userNotFound

    if (PasswordManager.verify(password, userData?.[0]?.password)) {
        const token = jwt.sign({
            username,
            id: userData?.[0]?.id,
            role: userData?.[0]?.role,
            phone: userData?.[0]?.phone,
            email: userData?.[0]?.email
        },
            process.env.JWT_SECRET, { expiresIn: '1h', });
        return token;
    }

    throw errorConstant.InvalidCredentials;
};

exports.register = async (userData) => {
    const existingUser = await authRepository.findByUsername(userData.username);
    if (existingUser?.length)
        throw errorConstant.userAlreadyExist

    userData.password = PasswordManager.hash(userData.password);
    const user = await authRepository.createUser(userData);
    return user;
};
