let Tour = require('../models/Tour');

exports.createTour = async(req,res) => {
    const { title, country, durationCount, duration, attractions, includes, amount, description, thumbnail, image } = req.body; 

    try {
        await Tour.create({
            title,
            country,
            durationCount,
            duration,
            attractions,
            includes,
            amount,
            rating: 5,
            description,
            thumbnail,
            image,
            date: new Date(),
        });

        res.status(200).json({success: true, message: "Tour added successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Failed to add tour", error: error.message})
    }
}

exports.updateTour = async(req,res) => {
    let tourId = req.params.id;

    const { title, durationCount, duration, attractions, includes, amount, description } = req.body;

    const updateTour = {
        title,
        durationCount,
        duration,
        attractions,
        includes,
        amount,
        description
    }

    try {
        await Tour.findByIdAndUpdate(tourId, updateTour);

        res.status(200).json({success: true, message: "Tour updated successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Updating failed", error: error.message});
    }
}

exports.deleteTour = async(req,res) => {
    let tourId = req.params.id;

    try {
        await Tour.findByIdAndDelete(tourId);

        res.status(200).json({success: true, message: "Tour deleted"})
    } catch (error) {
        res.status(500).json({message: "Failed to delete tour", error: error.message});
    }
}

exports.getAllTours = async(req,res) => {

    try {
        const tours = await Tour.find();

        res.status(200).json(tours)
    } catch (error) {
        res.status(500).json({success: false, message: "Failed to fetch tours", error: error.message});
    }
}

exports.getTourById = async(req,res) => {
    let tourId = req.params.id;

    try {
        const tour = await Tour.findById(tourId);

        res.status(200).json(tour)
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Failed to fetch tour", error: error.message});
    }
}