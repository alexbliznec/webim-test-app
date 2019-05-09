const path = require('path');
const config  = require('config');
module.exports = {
    server: {
        port: process.env.PORT || 8888,
        host: process.env.HOST || 'localhost',
        domain: process.env.DOMAIN || 'localhost:8888'
    },
    templates: {
        home: path.join(process.cwd(), 'templates/home.pug'),
        authorized: path.join(process.cwd(), 'templates/authorized.pug')
    },
    mongoDB: process.env.MONGODB_URI || 'mongodb://admin:admin1@ds151596.mlab.com:51596/webim_test',
    vk: {
        clientID: '6973584',
        clientSecret: 'LvcDbFGpGZDSnZzjlCms',
    }
}

