const mongoose = require('mongoose');

const carSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        brand: {
            type: String,
            required: [true, "Please add the car brand."],
        },
        model: {
            type: String,
            required: [true, "Please add the car model."],
        },
        generation: {
            type: String,
            required: [true, "Please add the model generation."],
        },
        yearOfProduction: {
            type: String,
            required: [true, "Please add year of the car production."],
        },
        engineCapacity: {
            type: String,
            required: [true, "Please add the engine capacity."]
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Car', carSchema);