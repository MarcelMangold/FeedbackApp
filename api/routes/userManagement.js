const express = require('express');
const router = express.Router();
const logger = require('../helpers/logger');
const httpCodes = require('../config/http-codes.json');
const fileHelper = require('../helpers/fileHelper')
const { username, userPassword } = require('../config/config');

router.post('/api/login', async (req, res) => {
    try {
        let user = req.body.user;
        if(user.username == username && user.password == userPassword)
        {
            res.status(httpCodes.ok).send({ success: true, message: "erfolgreich" })
        }
        else{
            res.status(httpCodes.notAuthorized).send({ success: false, message: "Username or password invalid" })
        }       
    } catch (err) {
        logger.error(err);
        res.status(httpCodes.internalError).send(err);
    }
});

module.exports = router;
