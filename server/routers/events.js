const router = require('express').Router();
const Event = require('../models/Event');

// Get All

router.get('/', async (req, res) => {
    
    try {
        const events = await Event.find();

        if (events === null) {
            res.status(200).json({status: true, message: 'There is not exists events yet!'});
        }

        res.status(200).json({status: true, data: events});

    } catch (error) {
        
        res.status(500).json({status: false, message: error.message});
    };
}) ;

// Create One

router.post('/', async (req, res) => {

    try {

        const newEvent = await new Event(req.body).save();

        if (!newEvent) {
            res.status(400).json({status: false, message: 'You are not entered any data to add'}).end()
        }

        res.status(201).json({status: true, data: newEvent, message: `Added new event`})
        
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({status: false, message: 'Event already exists'});
            
        };

        res.status(500).json({status: false, message: error.message});
    }
})

// Delete One

router.delete('/:id', async (req, res) => {

    try {

        const event = await Event.findByIdAndDelete(req.params.id);

        if (!event) {
            res.status(401).json({status: false, message: 'Resource not found. Invalid ID'});
        };

        return res.status(202).json({status: true, data: event});
        
    } catch (error) {
        res.status(500).json({status: false, message: error.message});
    };
});

// Get One

router.get('/:id', async (req, res) => {

    try {

        const event = await Event.findById(req.params.id)

        if (!event) {
            
            return res.status(400).json({status: false, message: 'Resource not found. Invalid ID'})
        }

        return res.status(200).json({status: true, data: event});
        
    } catch (error) {

        if (error.name === 'CastError') {
            const message = 'Resource not found. Invalid ID'
            return res.status(400).json({status: false, message});
        }
        
        return res.status(500).json({status: false, message: error.message});
    };

});

// Update One

router.patch('/:id', async (req, res) => {

    if (!req.body) {
        return res.status(400).json({status:false, message: 'Cannot find event'})
    };


    try {
        //const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body);
        //await updatedEvent.save()

        // OR
        const event = await Event.findById(req.params.id)
        Object.assign(event, req.body)
        event.save();

        res.status(200).json({status: true, data: event})

    } catch (error) {
        return res.status(500).json({status: false, message: error.message});
    };
});

module.exports = router;