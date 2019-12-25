var mongoose=require('mongoose')
var messageSchema=mongoose.Schema({
    sender:String,
    message:String,
})
module.exports=mongoose.model('Message',messageSchema)