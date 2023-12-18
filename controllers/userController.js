const { User, Thought } = require('../models')


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
            const newUser = await User.create(req.body)
            res.status(200).json(newUser)
        } catch(err) {
            res.status(500).json(err)
        }
    },
    async updateUser(req,res) {
        try {
            const oldUser = await User.findOne({ _id: req.params.userId })
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { username: req.body.username },
                { new: true }
            )

            if (!user) {
                return res.status(404).json({ message: 'User does not exist' })
            }

            const thoughts = await Thought.updateMany(
                { username: oldUser.username },
                { username: user.username }
            )

            res.status(200).json(user)
        } catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    async deleteUser(req,res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId })
            if (!user) {
                return res.status(404).json({ message: 'User does not exist' })
            }

            const thoughts = await Thought.deleteMany({ username: user.username  })
            console.log(thoughts)
            if (thoughts.deletedCount === 0) {
                return res.status(200).json({ message: 'User deleted. User did not have any Thoughts to delete' })
            }

            res.status(200).json({ message: 'User and Thoughts deleted' })
        } catch(err) {
            console.log(err)
            res.status(400).json(err)
        }
    },
    async addFriend(req,res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId},
                { $push: { friends: req.params.friendId } },
                { new: true }
            )
            const addBack = await User.findOneAndUpdate(
                { _id: req.params.friendId},
                { $push: { friends: req.params.userId } },
                { new: true }
            )
            res.status(200).json({ user })
        } catch(err) {
            res.status(500).json(err)
        }
    },
    async deleteFriend(req,res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            )
            const friend = await User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $pull: { friends: req.params.userId } },
                { new: true }
            )

            res.status(200).json({ message: 'Friend deleted successfully' })
        } catch(err) {
            res.status(500).json(err)
        }
    }
}