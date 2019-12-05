const express = require('express');
const router = express.Router();
const logger = require('../helpers/logger');
const httpCodes = require('../config/http-codes.json');
const fileHelper = require('../helpers/fileHelper')

router.post('/api/rating/:id', async (req, res) => {
    try {
        let data = JSON.parse(fileHelper.loadData("rating.json"));
        if (data == false) {
            data = [];
            req.body.content.date = Date.now();
            req.body.content.id = 0;
            let topic = new Object();
            topic.id = req.params.id;
            topic.name = "test";
            let content = [];
            content.push(req.body.content);
            topic.content = content;
            data.push(topic);

            fileHelper.storeData(data, "rating.json");
        }
        else {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == req.params.id) {
                    let highestId = 0;
                    data[i].content.forEach(content => {
                        if (content.id > highestId)
                            highestId = content.id;
                    });

                    req.body.content.id = highestId + 1;
                    req.body.content.date = Date.now();
                    data[i].content.push(req.body.content);

                    fileHelper.storeData(data, "rating.json");
                    break;
                }
                else if (i == data.length - 1) {
                    req.body.content.date = Date.now();
                    req.body.content.id = 0;

                    let topic = new Object();
                    topic.id = req.params.id;
                    topic.name = "test";
                    let content = [];
                    content.push(req.body.content);
                    topic.content = content;
                    data.push(topic);

                    fileHelper.storeData(data, "rating.json");
                    break;

                }
            };
        }
        data = JSON.parse(fileHelper.loadData("rating.json"));
        res.status(httpCodes.ok).send(data);

    } catch (err) {
        logger.error(err);
        res.status(httpCodes.internalError).send(err);
    }
});

router.get('/api/feedback', async (req, res) => {
    console.log("------------");
    try {
        let data = JSON.parse(fileHelper.loadData("feedback.json"));
        if (data != false) {
            data.forEach(element => {
                if (element.isActive)
                    data = element;
            });
            res.status(httpCodes.ok).send(data.categories);
        }
        else {
            res.status(httpCodes.notFound).send("no data found");
        }
    } catch (err) {
        logger.error(err);
        res.status(httpCodes.internalError).send(err);
    }
});

router.post('/api/topic', async (req, res) => {
    try {
        let data = JSON.parse(fileHelper.loadData("topic.json"));
        if (data) {
            let highestId = 0;
            data.forEach(element => {
                if (element.id > highestId)
                    highestId = element.id;
            });
            let tempData = new Object();
            tempData.id = highestId + 1;
            tempData.name = req.params.name;
            tempData.isActive = false;
            data.push(tempData);
            fileHelper.storeData(data, "topic.json");

            data = JSON.parse(fileHelper.loadData("topic.json"));
            res.status(httpCodes.notFound).send("No topic found");
        }
        else {
            res.status(httpCodes.ok).send(data);
        }


    } catch (err) {
        logger.error(err);
        res.status(httpCodes.internalError).send(err);
    }
});

router.post('/api/topic/:name', async (req, res) => {
    try {
        let data = JSON.parse(fileHelper.loadData("topic.json"));
        if (data == false) {
            data = [];
            let tempData = new Object();
            tempData.id = 0;
            tempData.name = req.params.name;
            tempData.isActive = false;
            data.push(tempData);

            fileHelper.storeData(data, "topic.json");
        }
        else {
            let highestId = 0;
            data.forEach(element => {
                if (element.id > highestId)
                    highestId = element.id;
            });
            let tempData = new Object();
            tempData.id = highestId + 1;
            tempData.name = req.params.name;
            tempData.isActive = false;
            data.push(tempData);
            fileHelper.storeData(data, "topic.json");
        }
        data = JSON.parse(fileHelper.loadData("topic.json"));
        res.status(httpCodes.ok).send(data);

    } catch (err) {
        logger.error(err);
        res.status(httpCodes.internalError).send(err);
    }
});

router.put('/api/topic/:id', async (req, res) => {
    try {

        let data = JSON.parse(fileHelper.loadData("topic.json"));
        console.log(data);
        if (data == false) {
            res.status(httpCodes.notFound).send("no data found");
        }
        else {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == req.params.id)
                    data[i].isActive = true;
                else
                    data[i].isActive = false;
            }
            fileHelper.storeData(data, "topic.json");
        }
        data = JSON.parse(fileHelper.loadData("topic.json"));
        res.status(httpCodes.ok).send(data);

    } catch (err) {
        logger.error(err);
        res.status(httpCodes.internalError).send(err);
    }
});

module.exports = router;