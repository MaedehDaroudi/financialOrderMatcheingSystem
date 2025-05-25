const UserRepository = require('../repositories/user.repository')
const userRepository = new UserRepository()

class UsersService {
    constructor() {

    }

    async receiveUser(userId) {
        const result = await userRepository.receive(userId);
        return result
    }
}

module.exports = UsersService