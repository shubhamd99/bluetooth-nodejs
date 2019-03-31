var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


// ----- Bluetooth Connect Function ------

const bluetooth = require('node-bluetooth');

// create bluetooth device instance
const device = new bluetooth.DeviceINQ();

// Find devices
device
.on('finished',  console.log.bind(console, 'finished'))
.on('found', function found(address, name){
  console.log('Found: ' + address + ' with name ' + name);
}).scan();


//Connect to devices
bluetooth.connect('D0:F8:8C:F8:93:C6', 6, function(err, connection){
    if(err) return console.error(err);
   
    connection.on('data', (buffer) => {    // listen to recieved messages
      console.log('received message:', buffer.toString());
    });
   
    connection.write(new Buffer('Hello!', 'utf-8'), () => {     // send messages
      console.log("wrote");
    });
  });

// ----- Bluetooth Connect Function ------

app.get('/', function (req, res) {
    res.send('Bluetooth Function #2')
})
  
app.listen(3000, '127.0.0.1', () => {
      console.log("Listening on PORT: 3000");
})