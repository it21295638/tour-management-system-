const router = require("express").Router();
const { createTour, updateTour, deleteTour, getAllTours, getTourById} = require('../controllers/TourController.js')

router.post('/', createTour);

router.put('/:id', updateTour);

router.delete('/:id', deleteTour);

router.get('/', getAllTours);

router.get('/:id', getTourById);

module.exports = router;