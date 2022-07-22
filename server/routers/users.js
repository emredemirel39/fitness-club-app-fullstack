const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const verifyToken = require('../middlewares/verifyToken');
const { changePassword } = require('../controllers/changePassword');
const {authLogin} = require('../controllers/authController');

// CREATE ONE

router.post('/', async (req, res) => {

    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            ...req.body, password: hashedPassword
        });

        const newUser = await user.save();

        res.status(201).json({status: true, data: newUser, message: `New ${newUser.role} is added.`})
    } catch (err) {

        if (err.code === 11000) {
            return res.status(400).json({status: false, message: 'User already exists'});
            
        };

        res.status(500).json({status: false, message: err.message});
    }
})

// GET ALL

router.get('/', async (req, res) => {
    
    try {

        const users = await User.find();

        switch (users) {
            case users === null:
                res.status(200).json({status: true, message: 'There is not exists users yet.', data: null});
                break;
        
            default:
                res.status(200).json({
                    status: true, 
                    message: 'All users', 
                    data: users
                })
                break;
        }
    } catch (error) {
        res.status(500).json({status: false, message: error.message});
    };
});

// GET ONE

router.get('/:id', async (req, res) => {
    
    try {

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({status: false, message: `Resource not found. Invalid ID`});
        }

        res.status(200).json({status: true, data: user});
        
    } catch (error) {

        if (error.name === "CastError") {
            const message = `Resource not found. Invalid ID`;
            return res.status(400).json({status: false, message: message});
        };
          
        res.status(500).json({status: false, message: error.message});
    };
});

// DELETE ONE

router.delete('/:id', verifyToken, async (req, res) => {

    console.log(req.user);

    try {

        if (req.user.role === 'admin') {
            
            const user = await User.findByIdAndRemove(req.params.id);

            if (!user) {
                return res.status(400).json({status: false, message: `Resource not found. Invalid ID`})
            }
            res.status(204).end();
        } else {
            res.status(403).json({status: false, message: 'You are not allowed to delete any user'})
        }   
        
    } catch (error) {

        if (error.name === "CastError") {
            const message = `Resource not found. Invalid ID`;
            return res.status(400).json({status: false, message: message});
          };
          
        res.status(500).json({status: false, message: error.message});
    };

});

// LOGIN

router.post('/login', authLogin);

// LOGOUT

router.post('/logout', verifyToken, async (req, res) => {
    res.status(204).end();
});

// UPDATE ONE

router.patch('/:id', async (req, res) => {

    if(!req.body) {
        return res.status(400).json({status: false, message: 'User data to update cannot be empty'});
    }

    try {
        const user = await User.findById(req.params.id)
        Object.assign(user, req.body)
        user.save();
        res.status(200).json({status: true, data: user})
    } catch (error) {
        if (error.name === "CastError") {
            const message = `Resource not found. Invalid ID`;
            return res.status(400).json({status: false, message: message});
          };
          
        res.status(500).json({status: false, message: error.message});
    };
})

// CHANGE PASSWORD

router.patch('/:id/changePassword', changePassword);

module.exports = router;