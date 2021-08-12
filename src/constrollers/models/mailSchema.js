const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete')

const Mail = new Schema({
    from: String,
    to: String,
    title: String,
    content: String,
    seen:Boolean,
    type:String

},
    { timestamps: true })
    //add plugin
    Mail.plugin(mongooseDelete,{deletedAt : true})

module.exports = mongoose.model('Mail', Mail)