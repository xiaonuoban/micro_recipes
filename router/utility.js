var mysql = require('mysql');


//工具类,放着共用方法
var utility = {};
//连接数据库，并且按照传来的sql语句从数据库取回数据,通过回调函数返回，
//如果出错自动发送一个错误信息
utility.getDataFromMySql = function (req, res, sql_temp, callBack) {
  var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '654742',
    port: '3306',
    database: 'micro_recipes',
    charset: 'UTF8MB4'
  });
  conn.connect();
  conn.query(sql_temp, function (err, result) {
    if (err || result.length == 0) {
      console.log(err + '或者查询结果为空');
      res.status(404).json({ status: 0, data: {} });
    }
    callBack(result);
  });
  conn.end()
}

utility.getDataFromMySqlNoFilter = function (req, res, sql_temp, callBack) {
  //不过滤空结果
  var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '654742',
    port: '3306',
    database: 'micro_recipes',
    charset: 'UTF8MB4'
  });
  conn.connect();
  conn.query(sql_temp, function (err, result) {
    if (err) {
      console.log(err);
      res.status(404).json({ status: 0, data: {} });
    }
    callBack(result);
  });
  conn.end()
}

utility.sendData = function (req, res, data) {
  json_str = {};
  json_str.status = 1;
  json_str.data = data;
  res.send(JSON.stringify(json_str))
}
utility.sendErroData = function(req, res){
  res.status(404).json({ status: 0, data: {} })
}

module.exports = utility;
