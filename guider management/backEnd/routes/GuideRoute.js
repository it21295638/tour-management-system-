const express = require("express");
const router = express.Router();
const { 
    addGuide,
    getGuide,
    UpdateGuide,
    removerGuide,
    getSpecGuide,

} = require("../controller/GuideController");

//addFinance
router.post("/",addGuide);
//getFinance
router.get("/all",getGuide);
//UpdateFinance
router.put("/:id",UpdateGuide);
//DeleteFinance
router.delete("/:id",removerGuide);
//getSpecFinance
router.get("/:id",getSpecGuide);


module.exports = router;