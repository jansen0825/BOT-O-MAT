const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

require('./src/models/robotsModel'); //created model loading

const app = express();
app.use(cors());

// mongoose instance connection
mongoose.Promise = global.Promise;

// Uncomment this line when not using docker.
// mongoose.connect('mongodb://localhost:27017/RobotDB', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose
  .connect('mongodb://mongodb:27017/RobotDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongo Connection Established successfully.'))
  .catch(e => console.error('Error connecting to Mongo!', e));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./src/routes/robotRoutes'); //importing route
routes(app); //register the route

app.use((req, res) => {
  res.status(404).send({ url: req.originalUrl + ' not found' });
});

const port = process.env.PORT || 4000;

app.listen(port);

console.log('API server started on: ' + port);
