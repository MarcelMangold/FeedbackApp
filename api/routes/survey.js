const express = require('express');
const router = express.Router();
const logger = require('../helpers/logger');
const httpCodes = require('../config/http-codes.json');
const fileHelper = require('../helpers/fileHelper')


router.get('/api/surveys', async (req, res) => {
    try {
        let data = JSON.parse(fileHelper.loadData("survey.json"));
        if (data != false) {
            let surveys = [];
            data.forEach(element => {
                surveys.push({ surveyId: element.surveyId, name: element.name, isActive: element.isActive })
            });
            res.status(httpCodes.ok).send(surveys);
        }
        else {
            res.status(httpCodes.notFound).send("no data found");
        }
    } catch (err) {
        logger.error(err);
        res.status(httpCodes.internalError).send(err);
    }
});

router.put('/api/stateSurvey', async (req, res) => {
    try {
        let data = JSON.parse(fileHelper.loadData("survey.json"));
        let survey = req.body.survey;
        if (data != false) {
            data.forEach(element => {
                if (element.surveyId == survey.surveyId)
                    element.isActive = true;
                else
                    element.isActive = false;
            });
            fileHelper.storeData(data, "survey.json");
            res.status(httpCodes.ok).send({ success: true, message: "status successfully changed" });
        }
        else {
            res.status(httpCodes.notFound).send("no data found");
        }
    } catch (err) {
        logger.error(err);
        res.status(httpCodes.internalError).send(err);
    }
});

router.get('/api/survey/:id', async (req, res) => {
    let surveyId = req.params.id;
    /*  try { */
    let data = JSON.parse(fileHelper.loadData("rating.json"));
    if (data != false) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].surveyId == surveyId) {
                data = calcuteRating(data[i])
                res.status(httpCodes.ok).send(data);
                return;
            }
            else if (i == data.length - 1)
                res.status(httpCodes.badRequest).send(`no data found for id ${surveyId}`);
        }
    }
    else {
        res.status(httpCodes.notFound).send("no data found");
    }
    /*     } catch (err) {
            logger.error(err);
            res.status(httpCodes.internalError).send(err);
        } */
});

function calcuteRating(data) {
    let rating = [];
    data.content[0].forEach(categorie => {
        categorie.subCategories.forEach(subcategorie => {
            subcategorie.averageRating = subcategorie.rating;
            subcategorie.highestRating = subcategorie.rating;
            subcategorie.lowestRating = subcategorie.rating;
            subcategorie.numberParticipants = 1;
        });
        rating.push(categorie);
    });

    for (let j = 1; j < data.content.length; j++) {
        data.content[j].forEach(categorie => {
            rating.forEach(ratingData => {
                if (ratingData.categorieId == categorie.categorieId) {
                    categorie.subCategories.forEach(subCategorie => {
                        for (let i = 0; i < ratingData.subCategories.length; i++) {
                            if (ratingData.subCategories[i].subCategorieId == subCategorie.subCategorieId) {
                                let ratingSubCategorie = ratingData.subCategories[i];
                                subCategorie.rating =  parseInt(subCategorie.rating);
                                //(average value old * N + new value) / (N+1)
                                ratingSubCategorie.averageRating = ((ratingSubCategorie.averageRating * ratingSubCategorie.numberParticipants) + subCategorie.rating) / (ratingSubCategorie.numberParticipants + 1);
                                ratingSubCategorie.highestRating = ratingSubCategorie.highestRating > subCategorie.rating ? ratingSubCategorie.highestRating : subCategorie.rating;
                                ratingSubCategorie.lowestRating = ratingSubCategorie.lowestRating < subCategorie.rating ? ratingSubCategorie.highestRating : subCategorie.rating;
                                ratingSubCategorie.numberParticipants = ratingSubCategorie.numberParticipants + 1;
                            }
                        }

                    })
                }
            });
            /*    rating.push(element); 
               console.log(categorie);
               console.log("-------------"); */
        });
    };
    return rating;
}

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





module.exports = router;