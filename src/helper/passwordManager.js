const crypto = require("crypto");


class PasswordManager {

    static hash(password) {
        return crypto.createHash("sha256").update(password).digest("hex");
    }
}

module.exports = PasswordManager;