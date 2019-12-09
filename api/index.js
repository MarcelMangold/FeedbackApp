const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const survey = require('./routes/survey');
const questionnaire = require('./routes/questionnaire');
const logger = require('./helpers/logger');
const port = 3000;
const ipAdress ='192.168.178.95'
const app = express();
var cors = require('cors')

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors(corsOptions));

var whitelist = [
  'http:// 192.168.153.17:8100'
];
var corsOptions = {
  origin: function(origin, callback){
      var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
      callback(null, originIsWhitelisted);
  },
  credentials: true
};

app.use(survey);
app.use(questionnaire);

const server = http.createServer(app);
server.listen(port, ipAdress);
logger.info(`Server is listening on adress ${ipAdress}:${port}`);




