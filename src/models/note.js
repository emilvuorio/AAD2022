// Require the mongoose library
const mongoose = require('mongoose');
const { notes } = require('../resolvers/query');

// Define the note's database schema

const noteSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        favoriteCount: {
            type: Number,
            default: 0
        },
        favoritedBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },{
        timestamps: true
    }
    // Assigns created at and updated at field with a date type
    
);

// Define the *Note* model with the scheema

const Note = mongoose.model('Note', noteSchema);

// Export the module

module.exports = Note;