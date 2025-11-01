const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/UserController");
const { validateJWTToken } = require("../middlewares/authorizationMiddleware");
const router = express.Router();

//post - logIn , register
router.post("/register", registerUser);
router.post("/login", loginUser);

//protected API
// Validate wheather - user is logged in ?
router.get("/getCurrentUser", validateJWTToken, currentUser);

module.exports = router;

//bms/v1/`users/register
//bms/v1/users/login