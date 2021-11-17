var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_singhga',
  password        : '1189',
  database        : 'cs340_singhga'
});
module.exports.pool = pool;