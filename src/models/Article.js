const mongoose = require('mongoose');

const revisionSchema = new mongoose.Schema({
    content: String,
    updatedAt: { 
        type: Date, 
        default: Date.now 
    },
});


const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    revisions: [revisionSchema],
}, {
    timestamps: true
});

module.exports = mongoose.model('Article', articleSchema);