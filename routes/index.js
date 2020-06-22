var express = require('express');
var router = express.Router();
var userModule=require('../modules/user');
var bcrypt = require('bcryptjs');
function checkEmail(req,res,next){
  var email=req.body.email;
  var checkexitemail = userModule.findOne({email:email});
  checkexitemail.exec((err,data)=>{
   if(data){
   return  res.render('signup', { title: 'Password Management System', msg:'Email already exists'});
   }
    next();
  });
}
function checkUsername(req,res,next){
  var uname=req.body.uname;
  var checkexitusername = userModule.findOne({username:uname});
  checkexitusername.exec((err,data)=>{
   if(data){
   return  res.render('signup', { title: 'Password Management System', msg:'Username already exists'});
   }
    next();
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Password Management System', msg:'' });
});
router.post('/', function(req, res, next) {
  var username=req.body.uname;
  var password=req.body.password;
  var checkUser = userModule.findOne(req.body.uname);
  checkUser.exec((err,data)=> {
    
  var getPassword=data.password;
  if(bcrypt.compareSync(password,getPassword)){
    res.render('index', { title: 'Password Management System' ,msg:'User Loggedin Successfully' });
  } else{
    res.render('index', { title: 'Password Management System',msg:'Invalid Username and Pasword' });
  }
});
});
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Password Management System', msg:''});
});
router.post('/signup', checkEmail,checkUsername, function(req, res, next) {
   var username=req.body.uname;
   var email=req.body.email;
    var password=req.body.password;
  var confirmpassword =req.body.confpassword;
   if(password!= confirmpassword){
    res.render('signup', { title: 'Password Management System',msg:'Password Not Matched'});
   }
   else{
     password = bcrypt.hashSync(req.body.password,12);

   var userDetails= new userModule({
    username:username,
    email:email,
    password:password
   });
   
   userDetails.save((err,doc)=>{
   
     res.render('signup', { title: 'Password Management System',msg:'User Registered successfully' });
   
    
   });
   }
});


router.get('/passwordcategory', function(req, res, next) {
  res.render('password_category', { title: 'Password Management System' });
});
router.get('/addnewcategory', function(req, res, next) {
  res.render('addNewCategory', { title: 'Password Management System' });
});
router.get('/add-new-password', function(req, res, next) {
  res.render('add-new-password', { title: 'Password Management System' });
});
router.get('/view-new-password', function(req, res, next) {
  res.render('view-new-password', { title: 'Password Management System' });
});
router.get('/view-all-password', function(req, res, next) {
  res.render('view-all-password', { title: 'Password Management System' });
});

module.exports = router;
