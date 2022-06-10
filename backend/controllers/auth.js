const User = require('../models/users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const authController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const sanitizedEmail = email.toLowerCase();
            const existingUser = await User.findOne({ email: sanitizedEmail })
            let correctPassword = false;
            if (existingUser) {
                correctPassword = (await bcrypt.compare(password, existingUser.hashed_password));
            }
            if (correctPassword) {
                const token = jwt.sign({ user: existingUser, email: sanitizedEmail }, 'mykey', { expiresIn: 60 * 24 })
                res.status(201).json({ token, userId: existingUser.user_id })
                return;
            }
            res.status(400).send('Invalid Credentials');

        } catch (e) {
            console.log(e);
        }
    },
    signup: async (req, res) => {
        const { email, password } = req.body;
        const generatedUserId = uuidv4();
        const hashed_password = await bcrypt.hash(password, 10);
        try {
            const sanitizedEmail = email.toLowerCase()
            const existingUser = await User.find({ email: sanitizedEmail });
            ;
            if (existingUser.length > 0) {

                return res.status(409).send('User already exists, Please Login')
            }
            const newUser = new User({
                user_id: generatedUserId,
                email: sanitizedEmail,
                hashed_password,
            })

            const insertedUser = await newUser.save();



            const token = jwt.sign({ insertedUser, sanitizedEmail }, 'mykey', {
                expiresIn: 60 * 24,
            })
            res.status(201).json({ token, userId: generatedUserId });




        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = authController;