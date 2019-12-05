const fs = require('fs');
const Winston = require(__dirname + '/logger.js');

module.exports.storeData = function(data, path) {
    try {
        fs.writeFileSync(path, JSON.stringify(data))
        Winston.info(path + " saved successfully")
    } catch (err) {
        Winston.error("Error while saving" + path + " - " + err);
    }
}

module.exports.loadData = function(path) {
    try {
        let data = fs.readFileSync(path, 'utf8');
        Winston.info(path + " loaded successfully")
        return data;
    } catch (err) {
        Winston.error("Error while loading " + path + " - " + err);
        return false
    }
}