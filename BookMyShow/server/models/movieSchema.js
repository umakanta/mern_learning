const { default: mongoose } = require("mongoose");

const movieSchema = new mongoose.Schema(
    {
        movieName:{
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        genre:{
            type: String,
            required: true
        },
        language: {
            // TODO: convert this into array
            type: String,
            required: true
        },
        releaseDate: {  // MM/DD/YYYY
            type: Date,
            required : true
        },
        poster: {
            type: String,
            required: true
        }
    }
);

const Movies = mongoose.model("movies", movieSchema);

module.exports = Movies;