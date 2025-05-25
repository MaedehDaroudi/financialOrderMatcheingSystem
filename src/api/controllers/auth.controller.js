const authService = require('../../services/auth.service');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await authService.login(username, password);
        return res.json({ token });
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
};
