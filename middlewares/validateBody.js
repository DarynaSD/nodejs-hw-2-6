// валідація через мідлвер тільки для юзерів; домашку з контактами
// робила з валідацією в роуті, не хочу переробляти

const HttpError = require("../helpers/error");

const validateBody = schema => {
    const func = (req, res, next)=> {
        const { error } = schema.validate(req.body);
        if (error) {
            // next(HttpError(400, error.message));
            res.status(400).json(HttpError(400, error.message))
        }
        next()
    }

    return func;
}

module.exports = validateBody