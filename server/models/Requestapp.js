const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const requestAppSchema = new Schema({
  patientText: {
    type: String,
    required: "State your symptoms or request a visit!",
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  patientName: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Requestapp = model('Requestapp', requestAppSchema);

module.exports = Requestapp;