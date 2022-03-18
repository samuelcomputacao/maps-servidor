require("dotenv/config");

const axios = require("axios");
const polylineDecorder = require("polyline");

const database = require("../../datatabase/database");

const makeSTPoint = (point) => {
  const sql = `ST_SETSRID(ST_MAKEPOINT(${point.longitude}, ${point.latitude}), ${process.env.SRID_DEFAULT})`;
  return sql;
};

const makePolyline = (polyline) => {
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

const getPois = async (route) => {
  const st_poins = route.map((p) => {
    return makeSTPoint(p);
  });

  const sql = `SELECT id, texto, latitude, longitude FROM notificacoes WHERE ST_CONTAINS(ST_BUFFER(ST_SETSRID (ST_MAKELINE( ARRAY[${st_poins.join(
    ","
  )}]),${process.env.SRID_DEFAULT})::geography,${
    process.env.LENGTH_BUFFER
  })::geometry,ST_SETSRID(ST_MAKEPOINT(longitude, latitude), ${
    process.env.SRID_DEFAULT
  }));`;

  const connection = await database.connectDB();

  const result = await connection.query(sql);
  const rows = result.rows.map((row) => {
    return {
      id: row.id,
      texto: row.texto,
      point: {
        latitude: parseFloat(row.latitude),
        longitude: parseFloat(row.longitude),
      },
    };
  });
  return rows
};

const getRoutes = async (origin, destination) => {
  const url = `${process.env.GOOGLE_API_DIRECTIONS}?origin=${origin}&destination=${destination}&key=${process.env.GOOGLE_API_KEY}&mode=${process.env.GOOGLE_API_MODE}`;
  const { data } = await axios.get(url);
  if (data.status === "OK") {
  const traject = makePolyline(data.routes.shift().overview_polyline.points);

  console.log(traject);
  return { route: traject };
  } else {
    return { route: null, poi: null };
  }
};

module.exports = { getRoutes, getPois };
