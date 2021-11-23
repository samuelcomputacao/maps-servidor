const axios = require("axios");
const polylineDecorder = require("polyline");


require("dotenv/config");

const makePolyline = (polyline) => {
  debugger;
  const coordenadas = polylineDecorder.decode(polyline);
  let i = 0;
  const pontos = Array();
  while (i < coordenadas.length) {
    pontos.push({
      latitude: coordenadas[i][0],
      longitude: coordenadas[i][1],
    });
    i += 1;
  }
  return pontos;
};

const getRoutes = async (origin, destination) => {
  const url = `${process.env.GOOGLE_API_DIRECTIONS}?origin=${origin}&destination=${destination}&key=${process.env.GOOGLE_API_KEY}&mode=${process.env.GOOGLE_API_MODE}`;
  const { data } = await axios.get(url);
  return  makePolyline(data.routes.shift().overview_polyline.points);
};

module.exports = {getRoutes};