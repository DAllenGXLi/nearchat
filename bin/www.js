var app = require('../chat.socket.js');
var config = require('../config.js');
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(config.CHAT_PORT);

//在线数组
var onlineUsers = [];

//connect
io.on('connection', function (socket) {


  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(socket.id);
  });
  socket.on('disconnect',function(){
    console.log('disconnect');
  });

////////////////////////////////////////////////////////////// login
 socket.on('login', function (data) {
    console.log(data.username);
    var User = require('../models/users.js');
    User.find({username:data.username}, function(err, _data){
    	if(!err) {
    		if(_data.length <= 0) {
    			socket.emit('no username',{});
    		}
    		else if(data.password == _data[0].password) {
    				socket.emit('login suceess',{});
    		}
    		else {
    			socket.emit('login fail',{});
    		}
    	}
    });
  });

 //////////////////////////////////////////////////////////// register
 socket.on('register', function (data) {
    console.log(data.username);
    var User = require('../models/users.js');
    User.find({username:data.username}, function(err, _data) {
    	if(!err) {
    		if(_data.length > 0) {
    			socket.emit('username exist',{});
    		}
    		else {
    			var user = new User({
			   		username: data.username,
			   		password: data.password
			   	});
			   	user.save(); 
			   	socket.emit('register suceess',{});
    		}
    	}
    });
   
  });

  //////////////////////////////////////////////////////////// send message
  socket.on('sendMsg', function(data) {
      console.log(data.message);
      io.emit('resend message', data);
  });




});

  

  

