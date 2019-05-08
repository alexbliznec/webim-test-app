const config = require('config');
const app = require('./app');

const server = app.listen(config.get('server.port'), () => {
    console.log(`Server is listening port ${config.get('server.port')}`);
})