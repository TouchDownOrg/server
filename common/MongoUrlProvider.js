var config = require('../common/config');

function stripTrailingSlash(string) {
    // Match a forward slash / at the end of the string ($)
    return string.replace(/\/$/, '');
}

var devConnectionString = 'mongodb://' + config.mongo.host + ":" + config.mongo.port;
var connectionString = process.env.MONGO_CON_STRING || devConnectionString;
connectionString = stripTrailingSlash(connectionString);

module.exports = {
    connectionString: connectionString
};
