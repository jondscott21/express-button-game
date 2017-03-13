const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/static")));
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.render("index");
});
const server = app.listen(8000, function () {
    console.log('listening on port 8000');
});
const io = require('socket.io').listen(server);
let counter = 0;
io.sockets.on('connection', function (socket) {
    socket.on("button_click", function (data){
        counter += 1;
        socket.emit('button_push', {response: counter});
    });
    socket.on("reset_click", function (data) {
        counter = 0;
        socket.emit('reset_push', {response: counter});
    });
});