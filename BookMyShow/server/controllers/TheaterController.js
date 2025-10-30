const theaterModel = require("../models/theaterSchema");

const addTheater = async (req, res, next) => {
    try {
         console.log("addTheater payload:", req.body);
        const newTheater = new theaterModel(req?.body);
        await newTheater.save();
        res.send({
            success: true,
            message: "New theater has been added.",
            data: newTheater
        });
    } catch (error) {
        console.error("addTheater error:", error);   
        res.status(400);
        next(error);
    }
};

const updateTheater = async (req, res, next) => {
    try {
        const theater = await theaterModel.findByIdAndUpdate(
            req?.body?._id,
            req.body,
            { new: true } // adding this flag will ensure theater object being returned is updated
        );
        res.send({
            success: true,
            message: "Theater has been updated.",
            data: theater
        })
    } catch (error) {
        res.status(400);
        next(error);
    }
};

const deleteTeater = async (req, res, next) => {
    try {
        const theaterId = req?.params?.theaterId;
        const theater = await theaterModel.findByIdAndDelete(theaterId);
        if (!theater) {
            res.status(404).json({ message: "Theater not found" });
        }
        // res.status(200).json({ success: true, message: "Theater has been deleted." })
        res.send({
            success: true,
            message: "Theater has been deleted."
        });
    } catch (error) {
        res.status(400);
        next(error);
    }
};
const getAllTheaters = async (req, res, next) => {
    try { 
        //Getting data from other schema based ref provided in model
        // populate function to get owner details along with theaters.
        const allTheaters = await theaterModel.find().populate("owner");
        res.send({
            success: true,
            message: "All theaters has been fetched.",
            data: allTheaters
        });
    } catch (error) { 
        res.status(400);
        next(error);
    }
};

const getAllTheatersByOwner = async (req, res, next) => {
    try { 
        //Getting data from other schema based ref provided in model
        // populate function to get owner details along with theaters.
        const allTheaters = await theaterModel.find({owner:req?.body?.userId}).populate("owner");
        res.send({
            success: true,
            message: "All theaters for the Owner has been fetched.",
            data: allTheaters
        });
    } catch (error) { 
        res.status(400);
        next(error);
    }
};

module.exports = {
    addTheater,
    updateTheater,
    deleteTeater,
    getAllTheaters,
    getAllTheatersByOwner
};