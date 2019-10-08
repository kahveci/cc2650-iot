# cc2650-iot
An IoT application aiming at implementing cc2650 sensor tags to industrial use cases at low cost and easier.

## Prerequisites
* [node-gyp installation guide](https://github.com/nodejs/node-gyp#installation)
* [noble prerequisites](https://github.com/sandeepmistry/noble#prerequisites)
* [Elastic Stack](https://www.elastic.co/) and/or [TICK Stack](https://www.influxdata.com/time-series-platform/) for using analytics features

### How to Install Prerequisites for BLE
Browse the application folder and run the following commands respectively.
1) Install node-gyp:
```sh
sudo npm install -g node-gyp
```

2) Install noble prerequisites:
```sh
sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev
```

3) Install application dependencies:
```sh
npm install
```

4) Because of [this issue](https://github.com/noble/node-bluetooth-hci-socket/issues/84), install:
```sh
npm install @abandonware/bluetooth-hci-socket
```

5) Finally, copy ```node_modules\@abandonware\bluetooth-hci-socket``` to ```node_modules```.

## Dependencies
* async
* moment
* [node-opcua](https://github.com/node-opcua/node-opcua)
* [sensortag](https://github.com/sandeepmistry/node-sensortag)
* util

## How to Run
```sh
node app
```

## Support
If you're having any problem, please [raise an issue][newissue] on GitHub and
the I will be happy to help.

## License
Please take a look at the terms specified in the [license].

[newissue]: https://github.com/kahveci/cc2650-iot/issues/new
[license]: https://github.com/kahveci/cc2650-iot/blob/master/LICENSE
