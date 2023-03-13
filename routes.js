const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const contactController = require('./src/controllers/contactController');

// Rotas da Home
route.get('/', homeController.homePage);
route.post('/', homeController.treatPost);

// Rotas de contato
route.get('/contato', contactController.homePage)

module.exports = route;
