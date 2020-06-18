const redis = require('redis')
const {REDIS_CONFIG} = require('../config/db')

const client = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host)

client.on('error', function (error) {
    console.log(error);
})


module.exports = client