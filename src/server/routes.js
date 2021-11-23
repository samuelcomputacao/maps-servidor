const express = require("express");
const routes = express.Router();

const controller = require('../controller/controller');

routes.get('/cities', (request, response) => {
    return  controller.getCities(request, response);
});

routes.get('/routes', (request, response) => {
    return  controller.getRoutes(request, response);
});

module.exports = routes;