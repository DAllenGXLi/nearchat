//mongodb
// mongoose 链接
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nearchat',function(err){
	if(!err) {
		console.log('db connect successfully');
	}
	else {
		console.log(err);
	}
});

var Schema = mongoose.Schema;
    var _User = new Schema({ 
    username : String, 
    password : String 
});

module.exports = mongoose.model('User', _User);