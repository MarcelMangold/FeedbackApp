function getHighestSurveyId(data) {
    let highestId = data[0].surveyId;
    data.forEach(element => {
        if (highestId < element.surveyId)
            highestId = element.surveyId;
    });
    return highestId;
}

exports.getHighestSurveyId = getHighestSurveyId;