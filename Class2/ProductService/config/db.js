const mongoose = require("mongoose")
const connectDB = async () => {
    try {
        const url = "mongodb+srv://umakantasahoo:NsMaUrF6iuzrFJ9S@cluster0.84e7hqb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        const response = await mongoose.connect(url)
        console.log(response);
        console.log("MongoDb connection successful...")
    } catch (error) {
        console.log("MongoDb connection error", error)
        process.exit(1);
    }
}

module.exports = connectDB;