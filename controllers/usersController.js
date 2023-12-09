const User = require("../models/user");

const ctrlWrapper = require("../helpers/ctrlWrapper");

// signup
const register = async (req, res) => {
    const newUser = await User.create(req.body);

    res.json({
        email: newUser.email,
        massage: "registered successfull"
    })
}

module.exports = {
    register: ctrlWrapper(register),
}