const validate = (Schema) => async (req, res, next) => {
    try {
        const parsedBody = await Schema.parseAsync(req.body);
        req.body = parsedBody;
        next();
    } catch (err) {
        console.error("Validation error:", err);
        const status = 400;
        const message = "Fill the input properly";
        const extraDetails = err.errors[0].message;
        const error = {
            status,
            message,
            extraDetails,
        };
        //res.status(400).json({ msg: message });
        next(error);
    }
};

module.exports = validate;
