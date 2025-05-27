const crypto = require("crypto");


class PasswordManager {

    static hash(password) {
        return crypto.createHash("sha256").update(password).digest("hex");
    }

    static verify(inputPassword, hashedPasswordFromDB) {
        const hashedInput = this.hash(inputPassword);
        return hashedInput === hashedPasswordFromDB;
    }
}

module.exports = PasswordManager;