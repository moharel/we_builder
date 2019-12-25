var express          = require('express'),
    app              = express(),
    bodyParser       = require('body-parser'),
    mongoose         = require('mongoose'),
    expressSanitizer = require('express-sanitizer'),
    /*Message          = require('./models/message'),
    Project          = require('./models/project'),
    User             = require('./models/user'),*/
    Schema           = mongoose.Schema,
    port             = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended :true}))
app.use(express.static('public'))
app.set('view engine','ejs')
app.use(expressSanitizer())

mongoose.connect('mongodb://localhost/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

var messageSchema=new Schema({
    sender:String,
    message:String,
})
var message=mongoose.model('Message',messageSchema)

var projectSchema=new Schema({
    name:String,
    description:String,
    time:Number,
    messages:[messageSchema],
})
var Project=mongoose.model('Project',projectSchema)

var userSchema=new Schema({
    username:String,
    email:String,
    password:String,
    admin:Boolean,
    projects:[projectSchema]
})
var User=mongoose.model('User',userSchema)

app.get('/',function(req,res){
    res.redirect('/Home')
})

app.get('/newproject',function(req,res){
    res.render('newproject')
})

app.get('/:id',function(req,res){
    var page=req.params.id
    User.find({},function(err,user){
        if(err){
            console.log(err)
        }else{
            res.render(page,{page,user:page,user}) 
        }
    })   
})

app.post('/new',function(req,res){
    var newUser=new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        admin:true
    })
    newUser.save(function(err,user){
        if(err){
            console.log(err)
        }else{
            console.log(user)
            res.redirect('/Home')
        }
    })
})

app.post('/sign_in',function(req,res){
    res.send('you reached the post route')
})

app.post('/newproject',function(req,res){
    var newProject=new Project({
        name:req.body.name,
        description:req.body.description,
    })
    newProject.save(function(err,project){
        if(err){
            console.log(err)
        }else{
            console.log(project)
            User.findOne({name:'imawesome'},function(err,user){
                if(err){
                    console.log(err)
                }else{
                    console.log(user)
                    user.projects.push(project)
                    user.save(function(err,data){
                        if(err){
                            console.log(err)
                        }else{
                            console.log(data)
                            res.redirect('/my projects')
                        }
                    })
                }
            })
        }
    })
})
app.listen(port, function () {
  console.log("Server Has Started!")
})