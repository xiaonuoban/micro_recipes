var utility = require('./utility');

var users = {};
users.getUserInfo = function (req, res) {
  var u_id = req.query.u_id;
  //只有传了r_id值后才往后面查询
  if (!u_id) {
    utility.sendErroData(req, res);
    return
  }
  var user_info = null;
  var sql_temp = `
  SELECT u_id, u_user_name, u_avatar, u_gender, u_individual_desc, u_area
  FROM user 
  WHERE u_id=${u_id}
  `;
  var sql_temp2 = `
  SELECT r_id, r_title, r_user_name, r_show_photo
  FROM recipes 
  WHERE r_u_id=${u_id}
  `;
  utility.getDataFromMySql(req, res, sql_temp, function callBack(result) {
    //有查询数据才开始发送数据
    if (result.length != 0) {
      user_info = result[0];
      // 使用不过滤空结果的查询
      utility.getDataFromMySqlNoFilter(req, res, sql_temp2, function callBack(result) {
        if (result.length != 0) {
          user_info.recipes = result;
          utility.sendData(req, res, user_info);
        }else{
          //存在用户本来就没有发表一篇食谱的人
          user_info.recipes = [];
          utility.sendData(req, res, user_info);
        }
      })
    }
  })
}
module.exports = users