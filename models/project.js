var mongoose=require('mongoose')

var projectSchema=mongoose.Schema({
    name:String,
    description:String,
    time:Number,
    messages:[
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Message'
      }
   ],
})
module.exports=mongoose.model('Project',projectSchema)