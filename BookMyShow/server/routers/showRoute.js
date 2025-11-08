const router = require("express").Router();
const { addShow, 
    updateShow, 
    deleteShow, 
    getAllShowsByTheater, 
    getAllShowsByMovie
} = require("../controllers/ShowController");

router.post("/addShow", addShow);
router.patch("/updateShow", updateShow);
router.delete("/deleteShow/:showId", deleteShow);
router.get("/getAllShowsByTheater/:theaterId", getAllShowsByTheater);
router.post("/getAllTheatersByMovie", getAllShowsByMovie);

module.exports = router;