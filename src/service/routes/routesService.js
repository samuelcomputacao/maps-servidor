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

  const route = [
    {
      latitude: -7.10961,
      longitude: -34.87533,
    },
    {
      latitude: -7.10953,
      longitude: -34.8756,
    },
    {
      latitude: -7.10887,
      longitude: -34.87546,
    },
    {
      latitude: -7.10756,
      longitude: -34.87505,
    },
    {
      latitude: -7.10727,
      longitude: -34.87498,
    },
    {
      latitude: -7.10709,
      longitude: -34.87537,
    },
    {
      latitude: -7.10644,
      longitude: -34.87614,
    },
    {
      latitude: -7.10576,
      longitude: -34.8769,
    },
    {
      latitude: -7.10566,
      longitude: -34.87785,
    },
    {
      latitude: -7.10699,
      longitude: -34.87919,
    },
    {
      latitude: -7.10783,
      longitude: -34.88008,
    },
    {
      latitude: -7.10842,
      longitude: -34.88146,
    },
    {
      latitude: -7.10852,
      longitude: -34.88336,
    },
    {
      latitude: -7.10904,
      longitude: -34.88404,
    },
    {
      latitude: -7.11042,
      longitude: -34.88428,
    },
    {
      latitude: -7.11064,
      longitude: -34.8846,
    },
    {
      latitude: -7.11066,
      longitude: -34.88472,
    },
    {
      latitude: -7.11063,
      longitude: -34.88502,
    },
    {
      latitude: -7.11122,
      longitude: -34.88572,
    },
    {
      latitude: -7.11254,
      longitude: -34.88675,
    },
    {
      latitude: -7.11273,
      longitude: -34.88685,
    },
    {
      latitude: -7.11341,
      longitude: -34.88689,
    },
    {
      latitude: -7.11448,
      longitude: -34.88766,
    },
    {
      latitude: -7.11484,
      longitude: -34.88808,
    },
    {
      latitude: -7.11464,
      longitude: -34.88818,
    },
    {
      latitude: -7.1141,
      longitude: -34.88848,
    },
    {
      latitude: -7.11304,
      longitude: -34.88934,
    },
    {
      latitude: -7.1131,
      longitude: -34.88962,
    },
    {
      latitude: -7.11406,
      longitude: -34.88999,
    },
    {
      latitude: -7.11554,
      longitude: -34.89055,
    },
    {
      latitude: -7.11721,
      longitude: -34.89148,
    },
    {
      latitude: -7.12025,
      longitude: -34.89304,
    },
    {
      latitude: -7.12119,
      longitude: -34.89331,
    },
    {
      latitude: -7.12203,
      longitude: -34.89331,
    },
    {
      latitude: -7.12257,
      longitude: -34.89326,
    },
    {
      latitude: -7.12302,
      longitude: -34.89348,
    },
    {
      latitude: -7.12386,
      longitude: -34.89439,
    },
    {
      latitude: -7.12438,
      longitude: -34.89486,
    },
    {
      latitude: -7.12521,
      longitude: -34.89641,
    },
    {
      latitude: -7.12631,
      longitude: -34.89853,
    },
    {
      latitude: -7.12737,
      longitude: -34.90004,
    },
    {
      latitude: -7.13069,
      longitude: -34.90326,
    },
    {
      latitude: -7.13213,
      longitude: -34.90461,
    },
    {
      latitude: -7.13303,
      longitude: -34.90506,
    },
    {
      latitude: -7.13556,
      longitude: -34.90529,
    },
    {
      latitude: -7.13828,
      longitude: -34.90548,
    },
    {
      latitude: -7.14307,
      longitude: -34.90601,
    },
    {
      latitude: -7.14402,
      longitude: -34.90663,
    },
    {
      latitude: -7.14594,
      longitude: -34.9082,
    },
    {
      latitude: -7.14845,
      longitude: -34.90982,
    },
    {
      latitude: -7.14918,
      longitude: -34.91059,
    },
    {
      latitude: -7.14935,
      longitude: -34.91111,
    },
    {
      latitude: -7.14923,
      longitude: -34.91165,
    },
    {
      latitude: -7.14837,
      longitude: -34.91299,
    },
    {
      latitude: -7.14565,
      longitude: -34.91619,
    },
    {
      latitude: -7.13934,
      longitude: -34.92326,
    },
    {
      latitude: -7.13187,
      longitude: -34.93171,
    },
    {
      latitude: -7.12879,
      longitude: -34.93754,
    },
    {
      latitude: -7.12595,
      longitude: -34.94282,
    },
    {
      latitude: -7.12535,
      longitude: -34.9434,
    },
    {
      latitude: -7.1246,
      longitude: -34.94374,
    },
    {
      latitude: -7.12363,
      longitude: -34.94453,
    },
    {
      latitude: -7.12302,
      longitude: -34.94667,
    },
    {
      latitude: -7.1226,
      longitude: -34.94731,
    },
    {
      latitude: -7.12173,
      longitude: -34.94783,
    },
    {
      latitude: -7.12006,
      longitude: -34.94847,
    },
    {
      latitude: -7.11829,
      longitude: -34.94911,
    },
    {
      latitude: -7.11695,
      longitude: -34.94986,
    },
    {
      latitude: -7.11645,
      longitude: -34.95087,
    },
    {
      latitude: -7.1153,
      longitude: -34.9558,
    },
    {
      latitude: -7.11435,
      longitude: -34.95968,
    },
    {
      latitude: -7.11376,
      longitude: -34.96071,
    },
    {
      latitude: -7.11253,
      longitude: -34.96152,
    },
    {
      latitude: -7.11014,
      longitude: -34.9623,
    },
    {
      latitude: -7.09865,
      longitude: -34.96609,
    },
    {
      latitude: -7.08985,
      longitude: -34.96891,
    },
    {
      latitude: -7.08857,
      longitude: -34.96916,
    },
    {
      latitude: -7.08685,
      longitude: -34.9691,
    },
    {
      latitude: -7.08562,
      longitude: -34.96929,
    },
    {
      latitude: -7.08473,
      longitude: -34.96976,
    },
    {
      latitude: -7.08397,
      longitude: -34.97054,
    },
    {
      latitude: -7.08348,
      longitude: -34.97181,
    },
    {
      latitude: -7.08359,
      longitude: -34.97325,
    },
    {
      latitude: -7.08429,
      longitude: -34.9757,
    },
    {
      latitude: -7.0845,
      longitude: -34.97684,
    },
    {
      latitude: -7.08417,
      longitude: -34.97917,
    },
    {
      latitude: -7.08364,
      longitude: -34.98026,
    },
    {
      latitude: -7.08192,
      longitude: -34.9824,
    },
    {
      latitude: -7.07993,
      longitude: -34.98527,
    },
    {
      latitude: -7.07809,
      longitude: -34.9883,
    },
    {
      latitude: -7.07098,
      longitude: -34.99881,
    },
    {
      latitude: -7.06922,
      longitude: -35.0014,
    },
    {
      latitude: -7.06798,
      longitude: -35.00391,
    },
    {
      latitude: -7.06391,
      longitude: -35.01259,
    },
    {
      latitude: -7.05898,
      longitude: -35.0231,
    },
    {
      latitude: -7.05718,
      longitude: -35.02639,
    },
    {
      latitude: -7.05592,
      longitude: -35.02947,
    },
    {
      latitude: -7.05403,
      longitude: -35.03346,
    },
    {
      latitude: -7.05194,
      longitude: -35.03743,
    },
    {
      latitude: -7.05099,
      longitude: -35.03884,
    },
    {
      latitude: -7.04685,
      longitude: -35.04498,
    },
    {
      latitude: -7.04357,
      longitude: -35.04961,
    },
    {
      latitude: -7.0426,
      longitude: -35.05044,
    },
    {
      latitude: -7.0366,
      longitude: -35.05409,
    },
    {
      latitude: -7.03225,
      longitude: -35.05648,
    },
    {
      latitude: -7.02973,
      longitude: -35.05798,
    },
    {
      latitude: -7.02713,
      longitude: -35.05977,
    },
    {
      latitude: -7.0246,
      longitude: -35.06088,
    },
    {
      latitude: -7.02243,
      longitude: -35.06144,
    },
    {
      latitude: -7.02042,
      longitude: -35.06167,
    },
    {
      latitude: -7.01636,
      longitude: -35.0614,
    },
    {
      latitude: -7.01002,
      longitude: -35.06062,
    },
    {
      latitude: -7.00858,
      longitude: -35.06083,
    },
    {
      latitude: -7.00633,
      longitude: -35.06191,
    },
    {
      latitude: -6.99978,
      longitude: -35.06553,
    },
    {
      latitude: -6.99204,
      longitude: -35.06984,
    },
    {
      latitude: -6.9706,
      longitude: -35.08165,
    },
    {
      latitude: -6.94587,
      longitude: -35.09503,
    },
    {
      latitude: -6.93447,
      longitude: -35.10136,
    },
    {
      latitude: -6.89684,
      longitude: -35.12269,
    },
    {
      latitude: -6.88248,
      longitude: -35.13074,
    },
    {
      latitude: -6.88004,
      longitude: -35.13155,
    },
    {
      latitude: -6.87522,
      longitude: -35.13211,
    },
    {
      latitude: -6.86454,
      longitude: -35.13334,
    },
    {
      latitude: -6.86261,
      longitude: -35.13341,
    },
    {
      latitude: -6.8581,
      longitude: -35.13394,
    },
    {
      latitude: -6.85629,
      longitude: -35.13434,
    },
    {
      latitude: -6.85284,
      longitude: -35.13476,
    },
    {
      latitude: -6.83967,
      longitude: -35.13633,
    },
    {
      latitude: -6.81817,
      longitude: -35.13876,
    },
    {
      latitude: -6.81563,
      longitude: -35.13877,
    },
    {
      latitude: -6.81398,
      longitude: -35.139,
    },
    {
      latitude: -6.81182,
      longitude: -35.13955,
    },
    {
      latitude: -6.80552,
      longitude: -35.14026,
    },
    {
      latitude: -6.80327,
      longitude: -35.13995,
    },
    {
      latitude: -6.80016,
      longitude: -35.13895,
    },
    {
      latitude: -6.79488,
      longitude: -35.13725,
    },
    {
      latitude: -6.79074,
      longitude: -35.13572,
    },
    {
      latitude: -6.78696,
      longitude: -35.13435,
    },
    {
      latitude: -6.78465,
      longitude: -35.13387,
    },
    {
      latitude: -6.78037,
      longitude: -35.13361,
    },
    {
      latitude: -6.77187,
      longitude: -35.13315,
    },
    {
      latitude: -6.76721,
      longitude: -35.13336,
    },
    {
      latitude: -6.76069,
      longitude: -35.13377,
    },
    {
      latitude: -6.75582,
      longitude: -35.13401,
    },
    {
      latitude: -6.7498,
      longitude: -35.13371,
    },
    {
      latitude: -6.7475,
      longitude: -35.13357,
    },
    {
      latitude: -6.74389,
      longitude: -35.13311,
    },
    {
      latitude: -6.74147,
      longitude: -35.13206,
    },
    {
      latitude: -6.73924,
      longitude: -35.13041,
    },
    {
      latitude: -6.72947,
      longitude: -35.1229,
    },
    {
      latitude: -6.72701,
      longitude: -35.121,
    },
    {
      latitude: -6.72534,
      longitude: -35.12013,
    },
    {
      latitude: -6.72369,
      longitude: -35.11971,
    },
    {
      latitude: -6.7137,
      longitude: -35.11841,
    },
    {
      latitude: -6.70887,
      longitude: -35.11773,
    },
    {
      latitude: -6.7057,
      longitude: -35.11697,
    },
    {
      latitude: -6.7005,
      longitude: -35.11658,
    },
    {
      latitude: -6.6968,
      longitude: -35.11575,
    },
    {
      latitude: -6.69314,
      longitude: -35.11551,
    },
    {
      latitude: -6.68081,
      longitude: -35.11391,
    },
    {
      latitude: -6.67559,
      longitude: -35.11282,
    },
    {
      latitude: -6.67395,
      longitude: -35.11274,
    },
    {
      latitude: -6.67003,
      longitude: -35.11353,
    },
    {
      latitude: -6.66841,
      longitude: -35.11366,
    },
    {
      latitude: -6.66395,
      longitude: -35.11398,
    },
    {
      latitude: -6.6625,
      longitude: -35.11438,
    },
    {
      latitude: -6.66176,
      longitude: -35.11495,
    },
    {
      latitude: -6.66056,
      longitude: -35.11643,
    },
    {
      latitude: -6.66013,
      longitude: -35.11695,
    },
    {
      latitude: -6.6589,
      longitude: -35.11789,
    },
    {
      latitude: -6.65424,
      longitude: -35.11953,
    },
    {
      latitude: -6.65161,
      longitude: -35.12028,
    },
    {
      latitude: -6.63993,
      longitude: -35.12299,
    },
    {
      latitude: -6.63492,
      longitude: -35.12418,
    },
    {
      latitude: -6.63237,
      longitude: -35.12505,
    },
    {
      latitude: -6.62769,
      longitude: -35.12678,
    },
    {
      latitude: -6.62482,
      longitude: -35.12817,
    },
    {
      latitude: -6.62328,
      longitude: -35.12919,
    },
    {
      latitude: -6.62245,
      longitude: -35.13002,
    },
    {
      latitude: -6.6213,
      longitude: -35.13166,
    },
    {
      latitude: -6.61776,
      longitude: -35.13735,
    },
    {
      latitude: -6.61624,
      longitude: -35.13868,
    },
    {
      latitude: -6.61449,
      longitude: -35.13947,
    },
    {
      latitude: -6.61275,
      longitude: -35.13971,
    },
    {
      latitude: -6.60767,
      longitude: -35.13952,
    },
    {
      latitude: -6.60592,
      longitude: -35.13948,
    },
    {
      latitude: -6.60466,
      longitude: -35.13976,
    },
    {
      latitude: -6.6036,
      longitude: -35.14027,
    },
    {
      latitude: -6.60257,
      longitude: -35.14109,
    },
    {
      latitude: -6.60163,
      longitude: -35.14227,
    },
    {
      latitude: -6.6005,
      longitude: -35.14357,
    },
    {
      latitude: -6.59974,
      longitude: -35.14407,
    },
    {
      latitude: -6.59779,
      longitude: -35.14458,
    },
    {
      latitude: -6.59637,
      longitude: -35.14467,
    },
    {
      latitude: -6.59363,
      longitude: -35.14464,
    },
    {
      latitude: -6.58946,
      longitude: -35.14465,
    },
    {
      latitude: -6.58606,
      longitude: -35.14425,
    },
    {
      latitude: -6.58325,
      longitude: -35.14395,
    },
    {
      latitude: -6.57816,
      longitude: -35.14412,
    },
    {
      latitude: -6.5703,
      longitude: -35.14438,
    },
    {
      latitude: -6.56911,
      longitude: -35.14424,
    },
    {
      latitude: -6.56744,
      longitude: -35.14362,
    },
    {
      latitude: -6.56584,
      longitude: -35.14242,
    },
    {
      latitude: -6.55606,
      longitude: -35.1314,
    },
    {
      latitude: -6.55181,
      longitude: -35.12662,
    },
    {
      latitude: -6.54478,
      longitude: -35.11891,
    },
    {
      latitude: -6.54297,
      longitude: -35.1178,
    },
    {
      latitude: -6.54129,
      longitude: -35.11725,
    },
    {
      latitude: -6.52834,
      longitude: -35.11456,
    },
    {
      latitude: -6.51722,
      longitude: -35.11156,
    },
    {
      latitude: -6.51207,
      longitude: -35.11056,
    },
    {
      latitude: -6.50968,
      longitude: -35.11045,
    },
    {
      latitude: -6.50549,
      longitude: -35.11119,
    },
    {
      latitude: -6.50258,
      longitude: -35.11174,
    },
    {
      latitude: -6.5015,
      longitude: -35.11213,
    },
    {
      latitude: -6.50003,
      longitude: -35.11305,
    },
    {
      latitude: -6.4988,
      longitude: -35.1134,
    },
    {
      latitude: -6.48295,
      longitude: -35.11229,
    },
    {
      latitude: -6.45542,
      longitude: -35.11035,
    },
    {
      latitude: -6.44664,
      longitude: -35.1098,
    },
    {
      latitude: -6.4452,
      longitude: -35.11021,
    },
    {
      latitude: -6.43845,
      longitude: -35.11407,
    },
    {
      latitude: -6.43406,
      longitude: -35.11655,
    },
    {
      latitude: -6.42311,
      longitude: -35.12282,
    },
    {
      latitude: -6.4026,
      longitude: -35.13457,
    },
    {
      latitude: -6.375,
      longitude: -35.15034,
    },
    {
      latitude: -6.31725,
      longitude: -35.18331,
    },
    {
      latitude: -6.28734,
      longitude: -35.20041,
    },
    {
      latitude: -6.27679,
      longitude: -35.20643,
    },
    {
      latitude: -6.27144,
      longitude: -35.20825,
    },
    {
      latitude: -6.26877,
      longitude: -35.2097,
    },
    {
      latitude: -6.26512,
      longitude: -35.21047,
    },
    {
      latitude: -6.25572,
      longitude: -35.21382,
    },
    {
      latitude: -6.25093,
      longitude: -35.21551,
    },
    {
      latitude: -6.24513,
      longitude: -35.2174,
    },
    {
      latitude: -6.23525,
      longitude: -35.21673,
    },
    {
      latitude: -6.23332,
      longitude: -35.21583,
    },
    {
      latitude: -6.23187,
      longitude: -35.21528,
    },
    {
      latitude: -6.22307,
      longitude: -35.216,
    },
    {
      latitude: -6.22115,
      longitude: -35.21606,
    },
    {
      latitude: -6.21904,
      longitude: -35.21583,
    },
    {
      latitude: -6.21334,
      longitude: -35.21527,
    },
    {
      latitude: -6.19154,
      longitude: -35.21308,
    },
    {
      latitude: -6.19011,
      longitude: -35.21293,
    },
    {
      latitude: -6.18885,
      longitude: -35.21301,
    },
    {
      latitude: -6.18738,
      longitude: -35.21353,
    },
    {
      latitude: -6.18502,
      longitude: -35.21472,
    },
    {
      latitude: -6.18232,
      longitude: -35.21612,
    },
    {
      latitude: -6.18111,
      longitude: -35.21671,
    },
    {
      latitude: -6.17566,
      longitude: -35.21731,
    },
    {
      latitude: -6.17344,
      longitude: -35.21858,
    },
    {
      latitude: -6.16964,
      longitude: -35.22118,
    },
    {
      latitude: -6.16612,
      longitude: -35.2233,
    },
    {
      latitude: -6.16381,
      longitude: -35.22512,
    },
    {
      latitude: -6.16245,
      longitude: -35.22568,
    },
    {
      latitude: -6.1604,
      longitude: -35.22589,
    },
    {
      latitude: -6.14741,
      longitude: -35.22704,
    },
    {
      latitude: -6.12827,
      longitude: -35.22874,
    },
    {
      latitude: -6.12379,
      longitude: -35.22901,
    },
    {
      latitude: -6.12118,
      longitude: -35.22893,
    },
    {
      latitude: -6.11944,
      longitude: -35.22922,
    },
    {
      latitude: -6.1183,
      longitude: -35.22977,
    },
    {
      latitude: -6.11675,
      longitude: -35.23094,
    },
    {
      latitude: -6.11532,
      longitude: -35.23247,
    },
    {
      latitude: -6.11429,
      longitude: -35.23302,
    },
    {
      latitude: -6.11321,
      longitude: -35.23326,
    },
    {
      latitude: -6.10773,
      longitude: -35.23389,
    },
    {
      latitude: -6.0991,
      longitude: -35.23419,
    },
    {
      latitude: -6.088,
      longitude: -35.23427,
    },
    {
      latitude: -6.08185,
      longitude: -35.2343,
    },
    {
      latitude: -6.08043,
      longitude: -35.23407,
    },
    {
      latitude: -6.07535,
      longitude: -35.23351,
    },
    {
      latitude: -6.07408,
      longitude: -35.23373,
    },
    {
      latitude: -6.0727,
      longitude: -35.23462,
    },
    {
      latitude: -6.07032,
      longitude: -35.23792,
    },
    {
      latitude: -6.06902,
      longitude: -35.23877,
    },
    {
      latitude: -6.06001,
      longitude: -35.24134,
    },
    {
      latitude: -6.05707,
      longitude: -35.24225,
    },
    {
      latitude: -6.05203,
      longitude: -35.24363,
    },
    {
      latitude: -6.04961,
      longitude: -35.24402,
    },
    {
      latitude: -6.04772,
      longitude: -35.24472,
    },
    {
      latitude: -6.04184,
      longitude: -35.24653,
    },
    {
      latitude: -6.03121,
      longitude: -35.24928,
    },
    {
      latitude: -6.0226,
      longitude: -35.25139,
    },
    {
      latitude: -6.02024,
      longitude: -35.25185,
    },
    {
      latitude: -6.01703,
      longitude: -35.25264,
    },
    {
      latitude: -6.01344,
      longitude: -35.25435,
    },
    {
      latitude: -6.00465,
      longitude: -35.25802,
    },
    {
      latitude: -6.00175,
      longitude: -35.25902,
    },
    {
      latitude: -5.99886,
      longitude: -35.26019,
    },
    {
      latitude: -5.99597,
      longitude: -35.26162,
    },
    {
      latitude: -5.98843,
      longitude: -35.26468,
    },
    {
      latitude: -5.98419,
      longitude: -35.26478,
    },
    {
      latitude: -5.97546,
      longitude: -35.26478,
    },
    {
      latitude: -5.97547,
      longitude: -35.26278,
    },
    {
      latitude: -5.9774,
      longitude: -35.26279,
    },
    {
      latitude: -5.9774,
      longitude: -35.26149,
    },
    {
      latitude: -5.97737,
      longitude: -35.25911,
    },
    {
      latitude: -5.97737,
      longitude: -35.25725,
    },
    {
      latitude: -5.97737,
      longitude: -35.25634,
    },
    {
      latitude: -5.97737,
      longitude: -35.25466,
    },
    {
      latitude: -5.97827,
      longitude: -35.25466,
    },
    {
      latitude: -5.97899,
      longitude: -35.25466,
    },
    {
      latitude: -5.97919,
      longitude: -35.25404,
    },
    {
      latitude: -5.97971,
      longitude: -35.25256,
    },
    {
      latitude: -5.97991,
      longitude: -35.25151,
    },
  ];

  const pois = await getPois(route);

  return { route: traject };
  } else {
    return { route: null, poi: null };
  }
};

module.exports = { getRoutes, getPois };
