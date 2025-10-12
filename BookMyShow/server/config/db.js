const mongoose = require("mongoose")
const connectDB = async () => {
    try {
        const url = process.env.MONGODB_CONNECTION_URL;

        const response = await mongoose.connect(url)
        if (response) {
            // console.log(response);
            console.log("MongoDb connection successful...")
        }
    } catch (error) {
        console.log("MongoDb connection error", error)
        process.exit(1);
    }
}

module.exports = connectDB;