const mongoose = require('mongoose');
const MongooseStore = require('koa-session-mongoose');
const config = require('config');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

mongoose.plugin(beautifyUnique);
mongoose.set('debug', true);

mongoose.connect(config.get('mongoDB'), {useNewUrlParser: true})
    .then(() => {console.log(`mongo DB connected`)})
    .catch((err) => {console.log(`MongDB error ${err}`)});

module.exports = mongoose;

module.exports.store = new MongooseStore({
    name: 'session',
    expires: 360000 * 4,
    maxAge: new Date(Date.now() + this.expires),
    connection: mongoose
});