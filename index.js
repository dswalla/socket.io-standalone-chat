const db = require('./db');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const conn = async () => {
  try {
    await db.createConnection()
    return true
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    var trip_id = 0;
    var user = 'test';
    var date;
    date = new Date();
    date = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + ' ' +
        ('00' + date.getUTCHours()).slice(-2) + ':' +
        ('00' + date.getUTCMinutes()).slice(-2) + ':' +
        ('00' + date.getUTCSeconds()).slice(-2);

    db.query('INSERT INTO Messages (trip_id, user, content, time) VALUES (?, ?, ?, ?)', [trip_id, user, msg, date]);
    console.log('message: ' + msg);
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(4020, function(){
  console.log('listening on *:4020');
});
