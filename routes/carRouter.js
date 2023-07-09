const {Router} = require('express');

const carRouter = Router();

const {
    getCars,
    createCar,
    getCar,
    updateCar,
    deleteCar,
} = require('../controllers/carController');

carRouter
    .get('/', getCars)

    .post('/', createCar)

    .get('/:id', getCar)

    .put('/:id', updateCar)

    .delete('/:id', deleteCar)

module.exports = {
    carRouter,
};