const http = require('http');
// const querystring = require('querystring');
// var moment = require('moment');
const config = require('./config.json');

// var timestampPattern = "YYYY-MM-DD HH:mm:ss.SSS";

exports.insertTemperature = (objectTemperature, ambientTemperature) => {
  if (config.influxdb.enabled === false) {
    return;
  }

  const data = `temperature,location=IMC,station=1 objTemperature=${objectTemperature},ambTemperature=${ambientTemperature} ${Math.floor(new Date().getTime() * 1000000)}`;
  const apiPath = `/write?db=${config.influxdb.database}`;
  console.log(data);

  const options = {
    host: config.influxdb.host,
    port: config.influxdb.port,
    path: apiPath,
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml',
    },
  };

  const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers: ${JSON.stringify(res.headers)}`);

    res.on('data', (body) => {
      console.log(`Body: ${body}`);
    });
  });

  req.on('error', (e) => {
    console.log(`Problem with request: ${e}`);
  });

  // write data to request body
  req.write(data);
  req.end();
};
