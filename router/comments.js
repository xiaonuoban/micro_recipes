var utility = require('./utility')

//评论相关
var comments = {}
comments.getCommentsData = function (req, res) {
  var r_id = req.query.r_id;
  //只有传了r_id值后才往后面查询
  if (!r_id) {
    utility.sendErroData(req, res);
    return
  }
  var data = {};
  var sql_temp = `
  SELECT c_id, c_r_id, c_u_id, c_u_user_name, c_content
  FROM comments 
  WHERE c_r_id=${r_id}
  `;
  utility.getDataFromMySql(req, res, sql_temp, function callBack(result) {
    //有查询数据才开始发送数据
    if (result.length != 0) {
      // 使用promise来处理
      var promises = []
      for (var i = 0; i < result.length; i++) {
        var c_id = result[i].c_id
        var sql_temp2 = `
        SELECT *
        FROM replies 
        WHERE rp_c_id=${c_id}
        `;
        var temp = new Promise(function (resolve, reject) {
          utility.getDataFromMySqlNoFilter(req, res, sql_temp2, function callBack(result) {
            resolve(result)
          })
        })
        promises.push(temp)
      }
      Promise.all(promises).then(function (results) {
        data.comments = result.map(function (value_1, index) {
          var temp = value_1;
          temp.comments = results[index];
          return temp
        });
        utility.sendData(req, res, data)
      })
    }
  })
}

module.exports = comments