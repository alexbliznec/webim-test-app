const config = require('config');
const pug = require('pug');
const request = require('request-promise');
const User = require('../models/User');

module.exports = {
    home: async (ctx) => {
        try {
            const user = await User.findById(ctx.session.passport.user);
            const options = {
                uri: 'https://api.vk.com/method/friends.get?order=random&count=5&fields=displayName&v=5.52',
                qs: { access_token: user.accessToken },
                headers: { 'User-Agent': 'Request-Promise' },
                json: true
            };
            const fr = await request(options);
            const friends = fr.response.items
            ctx.body = pug.renderFile(config.get('templates.authorized'), {userName: user.displayName, friends: friends});
        } catch (err) {console.log(err)};

    },
    loginVK: async (ctx) => {
        try {
            ctx.body = pug.renderFile(config.get('templates.home'));
        } catch (err) {console.log(err)};
        
    },
    isAuthorized: async (ctx, next) => {

        if (ctx.session.passport) {          
            return next();
        } else {
            ctx.redirect('/loginVK');
        }
    }
}