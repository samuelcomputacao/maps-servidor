const database = require("../datatabase/database");

const getCities = async (request, response) => {
    const {name, exclude} = request.query;

    const where = ['1=1'];

    if(name){
        where.push(`UPPER(name) LIKE UPPER('${name}%')`)
    }

    if(exclude){
        where.push(`cod != '${exclude}'`)
    }

    const connection = await database.connectDB();
    const sql = `SELECT cod, name, uf, centroid FROM cities WHERE ${where.join(' AND ')} LIMIT 5`;
    const result = await connection.query(sql);
    const rows = result.rows.map((row) => {
        const centroid = JSON.parse(row.centroid);
        return {
        cod: row.cod,
        name: row.name,
        uf: row.uf,
        point: {
            latitude: centroid.coordinates[1],
            longitude: centroid.coordinates[0],
        },
        };
    });
    response.status(200).send(rows);
};

module.exports = { getCities };
