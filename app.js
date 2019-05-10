const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const session = require('koa-session');

const passport = require('./libs/passport/index');
const controller = require('./controllers/index');
const mongoStore = require('./libs/mongoose').store;

const app = new Koa();
const router = new Router();

app.use(session({signed: false, store: mongoStore}, app));
app.use(passport.initialize());
app.use(passport.session());
app.use(router.routes());
app.use(static('public'));

router.get('/', controller.isAuthorized, controller.home);
router.get('/loginVK', controller.loginVK);

router.get('/auth/vkontakte', passport.authenticate('vkontakte'));

router.get(`/auth/vkontakte/callback`, passport.authenticate('vkontakte', { failureRedirect: '/login', successRedirect: '/' }));


module.exports = app;
