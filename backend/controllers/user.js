const User = require('../models/users.js');
const userController = {
    getAllUsers: async (req, res) => {
        try {
            const Users = await User.find();
            res.status(200).json(Users);
        } catch (e) {
            res.status(404).json({ message: e.message });
        }
    },
    getMatchedUsers: async (req, res) => {
        const userIds = JSON.parse(req.query.userIds);
        try {
            const pipeline =
                [
                    {
                        '$match': {
                            'user_id': {
                                '$in': userIds
                            }
                        }
                    }
                ]
            const foundUsers = await User.aggregate(pipeline)
            res.send(foundUsers);
        } catch (e) {
            console.log(e);
        }
    },
    getCurrentUser: async (req, res) => {
        const userId = req.query.userId;
        try {
            const user = await User.findOne({ user_id: userId });
            res.status(200).json(user);
        } catch (e) {
            res.status(404).json({ message: e.message });
        }
    },
    updateCurrentUser: async (req, res) => {
        const formData = req.body.formData;
        try {
            const query = { user_id: formData.user_id };
            const updateDocument = {
                $set: {
                    first_name: formData.first_name,
                    dob_day: formData.dob_day,
                    dob_month: formData.dob_month,
                    dob_year: formData.dob_year,
                    show_gender: formData.show_gender,
                    gender_identity: formData.gender_identity,
                    gender_interest: formData.gender_interest,
                    url: formData.url,
                    about: formData.about,
                    matches: formData.matches
                }
            }

            const insertedUser = await User.updateOne(query, updateDocument);
            res.status(200).send(insertedUser);

        } catch (e) {
            console.log(e);
        }
    },
    getGenderedUser: async (req, res) => {
        try {
            const gender = req.query.gender;
            const query = { gender_identity: { $eq: gender } };
            const foundUsers = await User.find(query);
            res.json(foundUsers);

        } catch (e) {
            console.log(e);
        }
    },
    addMatch: async (req, res) => {
        const { userId, matchedUserId } = req.body
        try {
            const query = { user_id: userId };
            const updateDocument = {
                $push: { matches: { user_id: matchedUserId } },
            }
            const updatedUser = await User.updateOne(query, updateDocument);
            res.send(updatedUser);
        } catch (e) {
            console.log(e);
        }
    }
}
module.exports = userController;