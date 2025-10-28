const { addTheater, updateTheater, deleteTeater, getAllTheaters } = require("../controllers/TheaterController");

const  router = require("express").Router();

router.post("/addTheater", addTheater);
router.patch("/updateTheater", updateTheater);
router.delete("/deleteTheater/:theaterId", deleteTeater);
router.get("/getAllTheaters", getAllTheaters);  
module.exports = router;