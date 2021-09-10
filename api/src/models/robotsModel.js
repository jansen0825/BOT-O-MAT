'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  description: {
    type: String,
    required: 'Please enter the name of the task',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  eta: {
    type: Number,
    required: 'Please enter estimated tome of completion',
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model('Task', TaskSchema);
