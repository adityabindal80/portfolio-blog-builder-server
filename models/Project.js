const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User' ,
        required : true
    },
    title : {
        type : String ,
        required : true
    },
    description: String,
    link: String,
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);