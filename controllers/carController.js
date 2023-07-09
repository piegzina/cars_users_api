const asyncHandler = require('express-async-handler');
const Car = require('../models/carModel');
//@desc Get all cars
//@route GET /api/cars
//@access private
const getCars = asyncHandler(async (req, res) => {
    const car = await Car.find({user_id: req.user.id});
    res.status(200).json({car});
});

//@desc Create New car
//@route POST /api/cars
//@access private
const createCar = asyncHandler(async (req, res) => {
    console.log('The request body is:', req.body);
    const {brand, model, generation, yearOfProduction, engineCapacity} = req.body;
    if (!brand || !model || !generation || !yearOfProduction || engineCapacity) {
        res.status(400);
        throw new Error('All fields are mandatory !');
    }

    const car = await Car.create({
        brand,
        model,
        generation,
        yearOfProduction,
        engineCapacity,
        user_id: req.user.id
    });

    res.status(201).json({car})
});

//@desc Get contact
//@route GET /api/cars/:id
//@access private
const getCar = asyncHandler(async (req, res) => {
    const car = await Car.findById(req.params.id);
    if (!car) {
        res.status(404);
        throw new Error('Car not found');
    }
    res.status(200).json({car})
});

//@desc Update contact
//@route PUT /api/cars/:id
//@access private
const updateCar = asyncHandler(async (req, res) => {
    const car = await Car.findById(req.params.id);
    if (!car) {
        res.status(404);
        throw new Error('Car not found');
    }

    if (car.user_id.toSigned() !== req.user.id) {
        res.status(403);
        throw new Error(`User don't have permission to update other user cars`);
    }

    const updatedCar = await Car.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
    );

    res.status(200).json({updatedCar})
});

//@desc Delete contact
//@route DELETE /api/cars/:id
//@access private
const deleteCar = asyncHandler(async (req, res) => {
    const car = await Car.findById(req.params.id);
    if (!car) {
        res.staus(404);
        throw new Error('Car not found');
    }
    if (car.user_id.toString() !== req.user.id) {
        res.staus(403);
        throw new Error(`User don't have permission to update other user car`);
    }
    await Car.deleteOne({_id: req.params.id});
    res.status(200).json({car})
});

module.exports = {
    getCars,
    createCar,
    getCar,
    updateCar,
    deleteCar,
}