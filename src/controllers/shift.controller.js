const Shift = require('../models/shift.model');

exports.createShift = async (req, res) => {
    try {
        const newShift = new Shift(req.body);
        await newShift.save();
        res.status(201).json(newShift);
    } catch (error) {
        res.status(400).json({ message: 'Error creating shift', error });
    }
}