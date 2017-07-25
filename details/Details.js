var restful = require('node-restful'),
    mongoose = restful.mongoose;

var Details = restful.model('details', mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ssn: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creation_date: {
        type: Date,
        required: true
    }

})).methods(['get', 'post', 'put', 'delete']);


module.exports = Details;