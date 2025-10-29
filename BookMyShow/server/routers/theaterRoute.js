const { addTheater, updateTheater, deleteTeater, getAllTheaters, getAllTheatersByOwner } = require("../controllers/TheaterController");

const  router = require("express").Router();

router.post("/addTheater", addTheater);
router.patch("/updateTheater", updateTheater);
router.delete("/deleteTheater/:theaterId", deleteTeater);
router.get("/getAllTheaters", getAllTheaters);
router.get("/getAllTheatersByOwner", getAllTheatersByOwner);  

module.exports = router;