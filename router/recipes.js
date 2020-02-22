var utility = require('./utility');

//处理食谱
var recipes = {};

recipes.getData = function (req, res) {
  var r_id = req.query.r_id;
  //只有传了r_id值后才往后面查询
  if (!r_id) {
    utility.sendErroData(req, res);
    return
  }
  var sql_temp = `
  SELECT *
  FROM recipes 
  WHERE r_id=${r_id}
  `
  utility.getDataFromMySql(req, res, sql_temp, function callBack(result) {
    //有查询数据才开始发送数据
    if (result.length != 0) {
      result[0].r_materials = JSON.parse(result[0].r_materials)
      result[0].r_step = JSON.parse(result[0].r_step)
      utility.sendData(req, res, result[0])
    }
  })
};
module.exports = recipes