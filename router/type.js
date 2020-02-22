var utility = require('./utility');
var fs = require('fs');

var type = {}

//获取分类的标题
type.getType = function (req, res) {
  //取数据
  var temp_data = {};
  // var temp = JSON.stringify([{ "name": "最新推荐", "code": 1 }, { "name": "最新发布", "code": 2 }, { "name": "热菜", "code": 3 }, { "name": "凉菜", "code": 4 }, { "name": "汤羹", "code": 5 }, { "name": "主食", "code": 6 }, { "name": "小吃", "code": 7 }, { "name": "家常菜", "code": 8 }, { "name": "泡酱腌菜", "code": 9 }, { "name": "西餐", "code": 10 }, { "name": "烘焙", "code": 11 }, { "name": "烤箱菜", "code": 12 }, { "name": "饮品", "code": 13 }, { "name": "零食", "code": 14 }, { "name": "火锅", "code": 15 }, { "name": "自制食材", "code": 16 }, { "name": "海鲜", "code": 17 }, { "name": "宴客菜", "code": 18 }])
  //注意路径是执行文件的相对路径
  fs.readFile('code.txt', function (err, data) {
    if (err) {
      utility.sendErroData(req, res);
    }
    temp_data.type = JSON.parse(data)
    utility.sendData(req, res, temp_data)
  })

}

//分类标题的第n页数据
type.getData = function (req, res) {
  var page = req.query.page;
  var code = req.query.code;
  //只有传了page和code才往后面查询
  if (!page || !code) {
    utility.sendErroData(req, res);
    return
  }
  //分页大小
  var limit = 20;
  var offset = limit * (Number(page) - 1)
  var sql_temp = `
 SELECT *
 FROM recipes_all_type 
 WHERE r_a_type=${code}
 ORDER BY r_a_id
 LIMIT ${limit} OFFSET ${offset};
 `
  utility.getDataFromMySql(req, res, sql_temp, function callBack(result) {
    //有查询数据才开始发送数据
    if (result.length != 0) {
      var data = {};
      //这里是一个闭包，引用着上面page变量
      data.type = code;
      data.page = page;
      data.recipes = result;
      utility.sendData(req, res, data)
    }
  })
}

module.exports = type