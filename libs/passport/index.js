const passport = require('koa-passport');

const User = require('../../models/User');
const vkStrategy = require('./strategies/vkStrategy');

passport.serializeUser(function(user, done) {
    //console.log(`serialized user ${user.id}`);
    done(null, user.id);
    
});

passport.deserializeUser(function(id, done) {
    
    User.findById(id, done);
    //console.log(`deserialized user ${id}`);
});

passport.use(vkStrategy);

module.exports = passport;