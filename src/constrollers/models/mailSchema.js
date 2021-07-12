const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Mail = new Schema({
    from: String,
    to: String,
    title: String,
    content: String,
    seen:Boolean,
    type:String

},
    { timestamps: true })

module.exports = mongoose.model('Mail', Mail)