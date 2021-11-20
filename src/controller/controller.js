const database = require("../datatabase/database");

const getCities = async (request, response) => {
  const { name, exclude } = request.query;

  const where = ["1=1"];

  if (name && name.length > 0) {
    where.push(`UPPER(name) LIKE UPPER('${name}%')`);
  }

  if (exclude) {
    where.push(`cod != '${exclude}'`);
  }

  const connection = await database.connectDB();
  const sql = `SELECT cod, name, uf, latitude, longitude FROM cities WHERE ${where.join(
    " AND "
  )} LIMIT 5`;
  const result = await connection.query(sql);
  const rows = result.rows.map((row) => {
    return {
      cod: row.cod,
      name: row.name,
      uf: row.uf,
      point: {
        latitude: row.latitude,
        longitude: row.longitude,
      },
    };
  });
  return response.status(200).send(rows);
};

module.exports = { getCities };
