var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_lambry',
  password        : '0785',
  database        : 'cs340_lambry'
});
module.exports.pool = pool;
