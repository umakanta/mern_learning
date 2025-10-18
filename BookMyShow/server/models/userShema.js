const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // admin - bookmyshow onboarding of theatre and movies
    // partner - they will decide when to run how many to run and cost of tickets
    // user - who will book tickets
    role: {
        type: String,
        enum: ["admin", "partner", "user"],
        required: true,
        default: "user"
    }
});

userSchema.pre("save", function(next){
    const now = new Date();
    this.updatedAt = now;
    if(!this.createdAt){
        this.createdAt = now;
    }
    console.log("from Pre hook", now, this); // [why this doesnot contain the updatedAt and CreatedAt]
    next();
});

userSchema.post("save", function(doc, next){
    console.log(`User ${doc.name} has been saved.`);
    next();
});
module.exports = mongoose.model("users", userSchema);