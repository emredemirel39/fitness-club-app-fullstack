const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.authLogin = async (req, res) => {

    const allUsers = await User.find();
    const user = allUsers.find(user => user.phoneNumber === req.body.phoneNumber);
    if (user === null) {
        res.status(400).json({status: false, message: 'User is cannot found!'});
    };

    try {

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        
        if (isPasswordCorrect === true) {

            // Generate token
            const token = jwt.sign({ id: user.id, role: user.role }, 'secretkey');

            res
            .json({
                status: true, 
                data: user, 
                message: 'Welcome',
                token
            })
        } else {
            return res.status(401).json({status: false, message: 'Not Allowed'})
        }

    } catch (error) {
        return res.status(500).json({status: false, message: error.message});
    };
};