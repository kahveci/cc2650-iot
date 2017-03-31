var SensorTag = require('./index');

SensorTag.discover(function(sensorTag) {
  console.log('Discovered: ' + sensorTag);

  sensorTag.on('disconnect', function() {
    console.log('Disconnected!');
    process.exit(0);
  });

});