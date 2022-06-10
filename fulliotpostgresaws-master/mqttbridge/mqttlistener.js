require('dotenv').config({ path: "./.env" });
const mqtt = require('mqtt');
const axios = require('axios');

const client = mqtt.connect(`mqtt://mosquitto:${process.env.MQTT_PORT}`, {
    'username': process.env.MQTT_USER,
    'password': process.env.MQTT_PASSWORD
});

client.on('connect', function() {
    client.subscribe(process.env.MQTT_TOPIC, function(err) {
        if (err) {
            throw new Error(err.message);
        }
    })
});

client.on('message', function(topic, message) {
    var messageJSON = JSON.parse(message.toString());

    axios.post(`http://restapi:${process.env.RESTAPI_PORT}/data`, messageJSON, { headers: { 'Authorization': process.env.TOKEN } }).then(res => {
        console.log(`statusCode: ${res.status}`);
        console.log(res.data);
    }).catch(error => {
        console.error(error)
    });
});

client.on('error', function(error) {
    throw new Error(error.message);
});