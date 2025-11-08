const ShowModel = require('../models/showSchema');

// Add Show
const addShow = async (req, res, next) => {
    try {
        console.log("addShow payload:", req.body);
        const newShow = new ShowModel(req?.body);
        await newShow.save();
        res.send({
            success: true,
            message: "New show has been added.",
            data: newShow
        });
    } catch (error) {
        console.error("addShow error:", error);   
        res.status(400);
        next(error);
    }
};

const updateShow = async (req, res, next) => {
    try {
        const show = await ShowModel.findByIdAndUpdate(
            req?.body?.showId,
            req.body,
            // { new: true } // adding this flag will ensure show object being returned is updated
        );
        res.send({
            success: true,
            message: "Show has been updated.",
            data: show
        })
    } catch (error) {
        res.status(400);
        next(error);
    }
};

const deleteShow = async (req, res, next) => {
    try {
        const showId = req?.params?.showId;
        const show = await ShowModel.findByIdAndDelete(showId);
        if (!show) {
            res.status(404).json({ message: "Show not found" });
        }
        res.send({
            success: true,
            message: "Show has been deleted."
        });
    } catch (error) {
        res.status(400);
        next(error);
    }
};

const getAllShowsByMovie = async (req, res, next) => {
    try { 
        const {movie, date } = req.body;
        const shows = await ShowModel.find({movie, date }).populate("theater");
        const theaterMap = new Map();
        shows.forEach((show) => {
            const theatherId = show.theater._id.toString();
            if(!theaterMap.has(theatherId)){
                theaterMap.set(theatherId, { ...show.theater._doc, shows:[] });
            }
            theaterMap.get(theatherId).shows.push(show);
        });
        const uniqueTheater = Array.from(theaterMap.values());

        res.send({
            success: true,
            message: "All theater with the show fetched successfully.",
            data: uniqueTheater
        });
    } catch (error) {
        res.status(400);
        next(error);
    }
};

const getAllShowsByTheater = async (req, res, next) => {
    try { 
        const theaterId = req.params.theaterId
        const allShows = await ShowModel.find({ theater: theaterId })
        .populate("movie")
        .populate("theater");

        res.send({
            success: true,
            message: "All shows fetched successfully.",
            data: allShows
        });
    } catch (error) {
        res.status(400);
        next(error);
    }
};

const getAllShowsById = async (req, res, next) => {
    try { 
        const allShows = await show.find();
        res.send({
            success: true,
            message: "All shows fetched successfully.",
            data: allShows
        });
    } catch (error) {
        res.status(400);
        next(error);
    }
};

module.exports = {
    addShow,
    updateShow,
    deleteShow,
    getAllShowsById,
    getAllShowsByMovie,
    getAllShowsByTheater,
};