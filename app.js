var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


// ----- Bluetooth Connect Function ------

var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();

btSerial.connect('MAC_ADDRESS_OF_DEVICE_YOU_WANT_TO_CONNECT', 2, function() {
              console.log('connected', btSerial.isOpen()); //  shows connected or not

        // send the buffer to the connected devices
        btSerial.write(Buffer.from('SHubham', 'utf-8'), function(err, bytesWritten) { 
            if (err) console.log(err);
            console.log('wrote', Buffer.from('SHubham', 'utf-8'));
            console.log('bytesWritten :', bytesWritten);
        });

        // Listen to buffer
        btSerial.on('data', function(buffer) {
            console.log(buffer.toString('utf-8'));
        });

    }, function () {
        console.log('cannot connect');
    });
    
btSerial.inquire();

// ----- Bluetooth Connect Function ------

app.get('/', function (req, res) {
    res.send('Bluetooth Function #1')
})
  
app.listen(3000, '127.0.0.1', () => {
      console.log("Listening on PORT: 3000");
})