const express = require('express');
const server = require('../server');

const UserController = require('../controllers/userController');
const BusinessController = require('../controllers/businessController');
const PassportController = require('../controllers/passportController');
const router = express.Router();

router.get('/', (request, response) => {
  response.status(200).json({ api: 'Server running OK.' });
});

// passport.serializeUser(function(user, cb) {
//   cb(null, user);
// });

// passport.deserializeUser(function(obj, cb) {
//   cb(null, obj);
// });

router.post('/register', (request, response) => {
  UserController.register(request, response);
});

router.post('/login', (request, response) => {
  UserController.login(request, response);
});

router.get('/api/user/:id', function(req, res) {
  UserController.getUserById(req, res);
});

router.delete('/api/user/:id', function(req, res) {
  UserController.deleteUserById(req, res);
});

router.get('/api/user/', function(req, res) {
  UserController.getAllUsers(req, res);
});

router.post('/api/Business', (request, response) => {
  BusinessController.createBusiness(request, response);
});

router.get('/api/business/ByName/:name', function(request, response) {
  BusinessController.getBusinessByName(request, response);
});

router.get('/api/business/:id', function(req, res) {
  BusinessController.getBusinessById(req, res);
});

router.get(
  '/auth/google',
  PassportController.passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get(
  '/auth/google/callback',
  PassportController.passport.authenticate('google')
);
router.delete('/api/business/:id', function(req, res) {
  BusinessController.deleteBusinessById(req, res);
});

router.get('/api/business/', function(req, res) {
  BusinessController.getAllBusiness(req, res);
});

module.exports = router;
