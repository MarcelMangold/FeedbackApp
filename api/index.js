const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const survey = require('./routes/survey');
const questionnaire = require('./routes/questionnaire');
const userManagement = require('./routes/userManagement');
const { whitelistIp, ipAdress, port } = require('./config/config');
const logger = require('./helpers/logger');
const app = express();
var cors = require('cors')

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors(corsOptions));

var whitelist = [
    whitelistIp
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
app.use(userManagement);

const server = http.createServer(app);
server.listen(port, ipAdress);
logger.info(`Server is listening on adress ${ipAdress}:${port}`);




