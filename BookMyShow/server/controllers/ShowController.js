const showModel = require('../models/showSchema');

// Add Show
const addShow = async (req, res, next) => {
    try {
        console.log("addShow payload:", req.body);
        const newShow = new showModel(req?.body);
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
        const show = await showModel.findByIdAndUpdate(
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
        const show = await showModel.findByIdAndDelete(showId);
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

const getAllShowsByTheater = async (req, res, next) => {
    try { 
        const theaterId = req.params.theaterId
        const allShows = await showModel.find({ theater: theaterId })
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