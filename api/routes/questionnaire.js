const express = require('express');
const router = express.Router();
const logger = require('../helpers/logger');
const httpCodes = require('../config/http-codes.json');
const fileHelper = require('../helpers/fileHelper')

router.post('/api/questionnaire', async (req, res) => {
    try {
        let userRating = req.body.categories;
        let data = JSON.parse(fileHelper.loadData("rating.json"));
        if (data != false) {
            data.forEach(element => {
                if (element.id == userRating.id)
                {
                    element.content.push(userRating.categories);
                }
            });
    
        }
        else {
            data = [];
            let tempData = new Object();
            tempData.id = 0;
            tempData.name = req.params.name;
            tempData.isActive = false;
            data.push(tempData);
        }
        fileHelper.storeData(data, "rating.json");
        res.status(200).send({ success: true, message: "erfolgreich" })
    } catch (err) {
        logger.error(err);
        res.status(httpCodes.internalError).send(err);
    }
});

router.get('/api/questionnaire', async (req, res) => {
    try {
        let data = JSON.parse(fileHelper.loadData("survey.json"));
        if (data != false) {
            data.forEach(element => {
                if (element.isActive)
                    data = element;
            });
            res.status(httpCodes.ok).send(data);
        }
        else {
            res.status(httpCodes.notFound).send("no data found");
        }
    } catch (err) {
        logger.error(err);
        res.status(httpCodes.internalError).send(err);
    }
});

module.exports = router;
