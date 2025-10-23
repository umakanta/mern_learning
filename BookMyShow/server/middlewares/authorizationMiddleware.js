const jwt = require("jsonwebtoken");

const validateJWTToken = (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(" ")[1];
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if (decode) {
            req.body = {
                email: decode?.email,
                userId: decode?.userId,
                ...req?.body
            };

            next();
        } else {
            throw new Error("LogIn Back");
        }
    }
    catch (error) {
        console.log("Error while validateJWTToken");
        res.status(401);
        next(error);
    }
};

module.exports = {
    validateJWTToken
}