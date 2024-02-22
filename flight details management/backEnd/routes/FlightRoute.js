const express = require("express");
const router = express.Router();
const { 
    addFlight,
    getFlight,
    UpdateFlight,
    removerFlight,
    getSpecFlight,

} = require("../controller/FlightController");

//addFinance
router.post("/",addFlight);
//getFinance
router.get("/all",getFlight);
//UpdateFinance
router.put("/:id",UpdateFlight);
//DeleteFinance
router.delete("/:id",removerFlight);
//getSpecFinance
router.get("/:id",getSpecFlight);


module.exports = router;