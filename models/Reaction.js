const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

reactionSchema
    .virtual('dateFormat')
    .get(function () {
        return `${this.createdAt}`;
    });

module.exports = reactionSchema;