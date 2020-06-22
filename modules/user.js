const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost:27017/pms', {useCreateIndex:true, useNewUrlParser: true ,  useUnifiedTopology: true});
var conn= mongoose.connection;
var userSchema = new mongoose.Schema({
    username: {
        type:String,
    required:true,
    index:{
        unique:true
    }},
    email: {
        type:String,
        required:true,
        index: {
            unique:true

        }
    },
    password: {
        type:String,
        required:true
       
    },
     date:{
         type: Date,
         default: Date.now 
     }
});
 
var userModel = mongoose.model('users',userSchema);
module.exports = userModel;
