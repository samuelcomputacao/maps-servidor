require("dotenv/config");
const citiesService = require("../service/cities/citiesService");
const routesService = require("../service/routes/routesService");

const getCities = async (request, response) => {
  try {
    const { name, exclude } = request.query;
    const rows = await citiesService.getCities(name, exclude);
    return response.status(200).send(rows);
  } catch (err) {
    return response.status(500);
  }
};

const getRoutes = async (request, response) => {
  const { origin, destination } = request.query;
  if (!origin) {
    return response.status(400).send("Origin is required!");
  }
  if (!destination) {
    return response.status(400).send("Destination is required!");
  }
  try {
    const polyline = await routesService.getRoutes(origin, destination);
    return response.status(200).send(polyline);
  } catch (err) {
    console.error(err);
    return response.status(500).send("Internal server error!");
  }
};


module.exports = { getCities, getRoutes};
