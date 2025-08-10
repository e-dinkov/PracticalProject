const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    team: {
        type: String,
        
    },
    height: {
        type: String
    },
    weight: {
        type: String
    },
    description: {
        type: String
    },  
    photo: {
        type: String
    },
    userId: {
        type: ObjectId,
        ref: "User"
    },
    likes: [{
        type: ObjectId,
        ref: "User"
    }]
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Player', playerSchema);