'use strict';

module.exports = app => {
  const controller = require('../controllers/robotController');

  // Robot Routes
  app.route('/tasks').get(controller.getTasks);
};
