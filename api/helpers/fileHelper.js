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
        Winston.info(path + " loaded successfully")
        return fs.readFileSync(path, 'utf8')
    } catch (err) {
        Winston.error("Error while loading " + path + " - " + err);
        return false
    }
}