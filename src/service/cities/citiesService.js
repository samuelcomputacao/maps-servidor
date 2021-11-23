const database = require("../../datatabase/database");

const getCities = async (name, exclude) => {
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
  )} LIMIT 15`;
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
  return rows;
};

module.exports = { getCities };