const userModel = require("../models/userShema");

const registerUser = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req?.body?.email });
        if (user) {
            return res.send({
                success: false,
                message: "User already exists"
            });
        }
        // how we can encrypt a password - update security
        const newUser = new userModel(req?.body);
        await newUser.save();
        res.send({
            success: true,
            message: "registration is success. Please login."
        })
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

const loginUser = async (req, res) => {
    const user = await userModel.findOne({ email: req?.body?.email });
    if (!user) {
        return res.send({
            success: false,
            message: "User doesn't exists, Please Register"
        });
    }
    if (req?.body.password != user.password) {
        return res.send({
            success: false,
            message: "Please enter valid Password"
        });
    }

    res.send({
        success: true,
        message: "You are successfully Logged in"
    });
};

module.exports = {
    registerUser,
    loginUser
}
