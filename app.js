const sensorTag = require('sensortag');
const config = require('./config.json');
const analytics = require('./analytics');
const influxdb = require('./influxdb');

console.log('Listening for sensortags...');

sensorTag.discoverById(config.sensortag.id, (tag) => {
  console.log(`Sensortag discovered: ${tag}`);

  tag.on('disconnect', () => {
    console.log('Disconnected!');
    process.exit(0);
  });

  // when you get a button change, print it out:
  function listenForButton() {
    tag.on('simpleKeyChange', (left, right) => {
      if (left) {
        console.log(`left button: ${left}`);
      }
      if (right) {
        console.log(`right button: ${right}`);
      }
      // if both buttons are pressed, disconnect:
      if (left && right) {
        tag.disconnect();
      }
    });
  }

  // When you get an accelermeter change, print it out:
  function listenIrTemperature() {
    tag.on('irTemperatureChange', (objectTemp, ambientTemp) => {
      console.log('* * TMP007 IR (infrared) thermopile temperature sensor * *');
      console.log('\tObject Temp  = %d °C', objectTemp.toFixed(1));
      console.log('\tAmbient Temp = %d °C', ambientTemp.toFixed(1));
      analytics.insertTemperature(objectTemp.toFixed(1), ambientTemp.toFixed(1));
      influxdb.insertTemperature(objectTemp.toFixed(1), ambientTemp.toFixed(1));
    });
  }

  // When you get an accelermeter change, print it out:
  function listenAccelerometer() {
    tag.on('accelerometerChange', (x, y, z) => {
      if (x !== 0 && y !== 0 && z !== 0) {
        console.log('* * MPU-9450 9-axis motion sensor (3-AXIS Accelerometer) * *');
        console.log('\tx = %d G', x.toFixed(2));
        console.log('\ty = %d G', y.toFixed(2));
        console.log('\tz = %d G', z.toFixed(2));
        analytics.insertAccelerometer(x.toFixed(2), y.toFixed(2), z.toFixed(2));
      }
    });
  }

  function listenGyroscope() {
    tag.on('gyroscopeChange', (x, y, z) => {
      if (x !== 0 && y !== 0 && z !== 0) {
        console.log('* * MPU-9450 9-axis motion sensor (3-AXIS Gyroscope) * *');
        console.log('\tx = %d °/s', x.toFixed(2));
        console.log('\ty = %d °/s', y.toFixed(2));
        console.log('\tz = %d °/s', z.toFixed(2));
      }
    });
  }

  function listenMagnetometer() {
    tag.on('magnetometerChange', (x, y, z) => {
      if (x !== 0 && y !== 0 && z !== 0) {
        console.log('* * MK24 magnetic sensor * *');
        console.log('\tx = %d μT', x.toFixed(1));
        console.log('\ty = %d μT', y.toFixed(1));
        console.log('\tz = %d μT', z.toFixed(1));
      }
    });
  }

  function listenHumidity() {
    tag.on('humidityChange', (temperature, humidity) => {
      console.log('* * HDC1000 digital humidity and temperature sensor * *');
      console.log('\tTemperature = %d °C', temperature.toFixed(1));
      console.log('\tHumidity    = %d %', humidity.toFixed(1));
    });
  }

  function listenBarometricPressure() {
    tag.on('barometricPressureChange', (pressure) => {
      // TODO: Check the temperature value of this sensor!
      console.log('* * BMP280 Barometric pressure & temperature sensor * *');
      console.log('\tPressure = %d mBar', pressure.toFixed(1));
    });
  }

  function listenLuxometer() {
    tag.on('luxometerChange', (lux) => {
      if (lux !== 134184.96) {
        console.log('* * OPT3001 Ambient light sensor * *');
        console.log('\tLux = %d', lux.toFixed(1));
        analytics.insertLuxometer(lux.toFixed(1));
      }
    });
  }

  function notifyIrTemperature() {
    // start the accelerometer listener
    tag.notifyIrTemperature(listenIrTemperature);
  }

  function notifyAccelerometer() {
    // start the accelerometer listener
    tag.notifyAccelerometer(listenAccelerometer);
  }

  function notifyGyroscope() {
    tag.notifyGyroscope(listenGyroscope);
  }

  function notifyMagnetometer() {
    // start the humidity listener
    tag.notifyMagnetometer(listenMagnetometer);
  }

  function notifyHumidity() {
    // start the humidity listener
    tag.notifyHumidity(listenHumidity);
  }

  function notifyBarometricPressure() {
    tag.notifyBarometricPressure(listenBarometricPressure);
  }

  function notifyLuxometer() {
    tag.notifyLuxometer(listenLuxometer);
  }

  function enableSensors() { // attempt to enable sensors
    tag.notifySimpleKey(listenForButton); // start the button listener
    console.log('Enabling sensors...');

    // when you enable the sensors, start notifications:
    if (config.sensortag.sensor.IrTemperature === 'enabled') tag.enableIrTemperature(notifyIrTemperature);
    if (config.sensortag.sensor.Accelerometer === 'enabled') tag.enableAccelerometer(notifyAccelerometer);
    if (config.sensortag.sensor.Gyroscope === 'enabled') tag.enableGyroscope(notifyGyroscope);
    if (config.sensortag.sensor.Magnetometer === 'enabled') tag.enableMagnetometer(notifyMagnetometer);
    if (config.sensortag.sensor.Humidity === 'enabled') tag.enableHumidity(notifyHumidity);
    if (config.sensortag.sensor.BarometricPressure === 'enabled') tag.enableBarometricPressure(notifyBarometricPressure);
    if (config.sensortag.sensor.Luxometer === 'enabled') tag.enableLuxometer(notifyLuxometer);
    // SP40641LU Digital microphone
    // Buzzer
  }

  (function connectAndSetUp() { // attempt to connect to the tag
    console.log('Connect and set up...');
    tag.connectAndSetUp(enableSensors); // when you connect, enable sensors
  }());

  // Now that you've defined all the functions, start the process:
  // connectAndSetUp();
  // setTimeout(connectAndSetUp, 2000);
});
