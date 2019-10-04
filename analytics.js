var http = require('http');
var querystring = require('querystring');
var moment = require('moment');
var config = require('./config.json');

var timestampPattern = "YYYY-MM-DD HH:mm:ss.SSS";

exports.insertLuxometer = function (sensorVal) {
    if (config.analytics.enabled === false)
        return;

    //console.log("Successfull call!"); return;

    var apiPath = "sensor-luxometer/OPT3001";

    var options = {
        host: config.analytics.host,
        port: config.analytics.port,
        path: apiPath, //config.analytics.path + type,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' //,
            //'Content-Length': Buffer.byteLength(data)
        }
    };

    var data = JSON.stringify({
        'tagID': config.sensortag.id,
        'sensorValue': sensorVal,
        '@timestamp': moment().format(timestampPattern)
    });

    var req = http.request(options, function (res) {
        console.log("Status: " + res.statusCode);
        console.log("Headers: " + JSON.stringify(res.headers));

        res.setEncoding("utf8");
        res.on("data", function (body) {
            console.log("Body: " + body);
        });
    });
    req.on("error", function (e) {
        console.log("Problem with request: " + e.message);
    });

    // write data to request body
    req.write(data);
    req.end();

    console.log(data);
    console.log("Http POST successful! Host: " + config.analytics.host + ":" + config.analytics.port + config.analytics.path);
}


exports.insertTemperature = function (objectTemperature, ambientTemperature) {
    if (config.analytics.enabled === false)
        return;

    var apiPath = "sensor-temperature/TMP007";

    var options = {
        host: config.analytics.host,
        port: config.analytics.port,
        path: apiPath, //config.analytics.path + type,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' //,
            //'Content-Length': Buffer.byteLength(data)
        }
    };

    var data = JSON.stringify({
        'tagID': config.sensortag.id,
        'objTemp': objectTemperature,
        'ambTemp': ambientTemperature,
        '@timestamp': moment().format(timestampPattern)
    });

    var req = http.request(options, function (res) {
        console.log("Status: " + res.statusCode);
        console.log("Headers: " + JSON.stringify(res.headers));

        res.setEncoding("utf8");
        res.on("data", function (body) {
            console.log("Body: " + body);
        });
    });
    req.on("error", function (e) {
        console.log("Problem with request: " + e.message);
    });

    // write data to request body
    req.write(data);
    req.end();

    console.log(data);
    console.log("Http POST successful! Host: " + config.analytics.host + ":" + config.analytics.port + config.analytics.path);
}

exports.insertAccelerometer = function (xVal, yVal, zVal) {
    if (config.analytics.enabled === false)
        return;

    var apiPath = "sensor-accelerometer/MPU9450";

    var options = {
        host: config.analytics.host,
        port: config.analytics.port,
        path: apiPath, //config.analytics.path + type,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' //,
            //'Content-Length': Buffer.byteLength(data)
        }
    };

    var data = JSON.stringify({
        'tagID': config.sensortag.id,
        'x': xVal,
        'y': yVal,
        'z': zVal,
        '@timestamp': moment().format(timestampPattern)
    });

    var req = http.request(options, function (res) {
        console.log("Status: " + res.statusCode);
        console.log("Headers: " + JSON.stringify(res.headers));

        res.setEncoding("utf8");
        res.on("data", function (body) {
            console.log("Body: " + body);
        });
    });
    req.on("error", function (e) {
        console.log("Problem with request: " + e.message);
    });

    // write data to request body
    req.write(data);
    req.end();

    console.log(data);
    console.log("Http POST successful! Host: " + config.analytics.host + ":" + config.analytics.port + config.analytics.path);
}