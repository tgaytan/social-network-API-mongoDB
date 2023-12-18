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
            const thought = await Thought.create(req.body)
            res.status(200).json(thought)
        } catch(err) {
            res.status(500).json(err)
        }
    },
    async updateThought(req,res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { thoughtText: req.body.thoughtText},
                { new: true }
            )

            if (!thought) {
                return res.status(404).json({ message: 'thought does not exist' })
            }

            res.status(200).json(thought)
        } catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    async deleteThought(req,res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId })
            if (!thought) {
                return res.status(404).json({ message: 'Thought does not exist' })
            }

            res.status(200).json({ success: 'Thought deleted' })
        } catch(err) {
            res.status(500).json(err)
        }
    },
    async addReaction(req,res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { new: true }
            )
            res.status(200).json(thought)
        } catch(err) {
            res.status(500).json(err)
        }
    },
    async deleteReaction(req,res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: {reactionId: req.body.reactionId} } },
                { new: true }
            )
            res.status(200).json(thought)
        } catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}