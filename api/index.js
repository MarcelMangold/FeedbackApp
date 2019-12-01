const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const rating = require('./routes/rating');
const logger = require('./helpers/logger');
const port = 3000;
const app = express();
var cors = require('cors')

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors(corsOptions));

var whitelist = [
  'http://localhost:8100'
];
var corsOptions = {
  origin: function(origin, callback){
      var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
      callback(null, originIsWhitelisted);
  },
  credentials: true
};

app.use(rating);


const server = http.createServer(app);
server.listen(port);
logger.info(`Server is listening on port ${port}`);




