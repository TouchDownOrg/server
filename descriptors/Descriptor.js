var restful = require('node-restful'),
    mongoose = restful.mongoose;

var Descriptor = restful.model('descriptor', mongoose.Schema({
    c_id: {
        type: String,
        required: true
    },
    creation_date: {
        type: Date,
        required: true
    },
    content: {
        type: Object,
        required: true
    }
})).methods(['get', 'post', 'put', 'delete']);


module.exports = Descriptor;