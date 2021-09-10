'use strict';
const mongoose = require('mongoose');

const Task = mongoose.model('Task');

exports.getTasks = function (req, res) {
  Task.find({}, function (err, tasks) {
    if (err) {
      console.error('Error finding tasks!', err);
      res.send(err);
    }
    res.json(tasks);
  });
};
