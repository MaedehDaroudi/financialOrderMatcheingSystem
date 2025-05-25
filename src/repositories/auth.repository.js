const Queries = require('./queries')

exports.findByUsername = async (username) => {
    const query = Queries.receive('users', '*')
    const result = await postgres.query(query, value)
};
