const express = require("express");
const app = express();
const connectDB = require("./config/db")

const userRoute = require("./routers/userRoute");
const movieRoute = require("./routers/movieRoute");
const theaterRoute = require("./routers/theaterRoute");
const errorHandler = require("./middlewares/errorHandler");
const { validateJWTToken } = require("./middlewares/authorizationMiddleware");

require("dotenv").config();

connectDB();

app.use(express.json());
app.use("/bms/v1/users", userRoute);
// app.use("/bms/v1/login", userRoute);

app.use("/bms/v1/movies", validateJWTToken,movieRoute);

app.use("/bms/v1/theaters", validateJWTToken, theaterRoute);

app.use(errorHandler);
app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`)
});