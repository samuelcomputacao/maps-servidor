const express = require("express");
const routes = express.Router();

const controller = require('../controller/controller');

routes.get('/cities', (request, response) => {
    return  controller.getCities(request, response);
});

module.exports = routes;