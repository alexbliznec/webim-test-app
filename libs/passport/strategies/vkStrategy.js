const config = require('config');
const VKontakteStrategy = require('passport-vkontakte').Strategy;

const User = require('../../../models/User');

module.exports = new VKontakteStrategy({
    clientID:     config.get('vk.clientID'), // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
    clientSecret: config.get('vk.clientSecret'),
    callbackURL:  `http://${config.get('server.host')}:${config.get('server.port')}/auth/vkontakte/callback`,
    scope: ['email, friends']
  },
  async function(accessToken, refreshToken, params, profile, done) {
    try {
      //const user = await User.findOne({ email: params.email });
      const user = await User.findOneAndUpdate({email: params.email}, {accessToken: params.access_token}, {new: true});
      if (!user) {
        const user = await User.create({
          email: params.email,
          displayName: profile.displayName,
          accessToken: params.access_token
      });
          return done(null, user);
      }
      return done(null, user);
    } catch (err) { console.log(err) }

  }
);