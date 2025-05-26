const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

function validateSchema(schema) {
    const validate = ajv.compile(schema);

    return (req, res, next) => {
        const valid = validate(req.method === 'GET' ? req.query : req.body);
        if (!valid) {
            const errorMessages = validate.errors.map((err) => {
                return {
                    message: err.message,
                    schemaPath: err.schemaPath
                }
            });
            return res.status(400).json({ errors: errorMessages });
        }
        next();
    };
}

module.exports = validateSchema;
