var mongoose=require('mongoose')
var userSchema=mongoose.Schema({
    username:String,
    email:String,
    password:String,
    admin:Boolean,
    projects:[
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Project'
      }
   ]
})
module.exports=mongoose.model('User',userSchema)