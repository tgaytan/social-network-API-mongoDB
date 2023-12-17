const { Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.status(200).json(thoughts);
        } catch(err) {
            res.status(400).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            res.status(200).json(thought)
        } catch(err) {
            res.status(400).json(err)
        }
    },
    async createThought(req,res) {
        try {
            res.status(200).json({ success: 'true' })
        } catch(err) {
            res.status(500).json(err)
        }
    },
    async updateThought(req,res) {
        try {
            res.status(200).json({ success: 'true' })
        } catch(err) {
            res.status(500).json(err)
        }
    },
    async deleteThought(req,res) {
        try {
            res.status(200).json({ success: 'true' })
        } catch(err) {
            res.status(500).json(err)
        }
    }
}