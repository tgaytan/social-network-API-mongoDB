const { User } = require('../models');

module.exports = {
    async getUsers(req,res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    async getSingleUser(req,res) {
        try {
            const userData = await User.findOne({ _id: req.params.userId })
            res.status(200).json(userData)

        }   catch(err) {
                res.status(400).json(err);
        }
    },
    async createUser(req,res) {
        try {
            res.status(200).json({ success: 'true' })
        } catch(err) {
            res.status(500).json(err)
        }
    },
    async updateUser(req,res) {
        try {
            res.status(200).json({ success: 'true' })
        } catch(err) {
            res.status(500).json(err)
        }
    },
    async deleteUser(req,res) {
        try {
            res.status(200).json({ success: 'true' })
        } catch(err) {
            res.status(500).json(err)
        }
    }
}