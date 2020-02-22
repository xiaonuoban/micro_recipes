var utility = require('./utility');
//处理首页相关信息
var index = {}

//轮播图
index.getSlidersData = function (req, res) {
  //获取首页有关轮播图的信息
  var sql_temp = 'SELECT r_pd_id,r_pd_type,r_pd_img FROM recipes_pages_data WHERE r_pd_type LIKE "slider_%"';
  utility.getDataFromMySql(req, res, sql_temp, function callBack(result) {
    if (result.length != 0) {
      utility.sendData(req, res, result);
    }
  })
}

//菜单数据
index.getMenusData = function (req, res) {
  //放弃u_id,很难
  var sql_temp = 'SELECT r_pd_id,r_pd_type,r_pd_title,r_pd_content,r_pd_user_name FROM recipes_pages_data WHERE r_pd_type LIKE "menu_%"';
  utility.getDataFromMySql(req, res, sql_temp, function callBack(result) {
    if (result.length != 0) {
      utility.sendData(req, res, result)
    }
  })
}

//新秀菜谱数据
index.getXxcpData = function (req, res) {
  //测试，先把所有数据取出来
  var page = req.query.page;
  //只有传了page才往后面查询
  if (!page) {
    utility.sendErroData(req, res);
    return
  }
  //分页大小
  var limit = 20;
  var offset = limit * (Number(page) - 1)
  var sql_temp = `
  SELECT r_i_id,r_i_type, r_i_show_title, r_i_u_id, r_i_show_user_name, r_i_avatar, r_i_show_img
  FROM recipes_index_type 
  WHERE r_i_type="xxcp"
  ORDER BY r_i_id
  LIMIT ${limit} OFFSET ${offset};
  `
  utility.getDataFromMySql(req, res, sql_temp, function callBack(result) {
    //有查询数据才开始发送数据
    if (result.length != 0) {
      var data = {};
      //这里是一个闭包，引用着上面page变量
      data.page = page;
      data.type = 'xxcp';
      data.recipes = result;
      utility.sendData(req, res, data)
    }
  })
}

//一周热门数据
index.getYzrmData = function (req, res) {
  //测试，先把所有数据取出来
  var page = req.query.page;
  //只有传了page才往后面查询
  if (!page) {
    utility.sendErroData(req, res);
    return
  }
  //分页大小
  var limit = 20;
  var offset = limit * (Number(page) - 1)
  var sql_temp = `
 SELECT r_i_id,r_i_type, r_i_show_title, r_i_u_id, r_i_show_user_name, r_i_avatar, r_i_show_img
 FROM recipes_index_type 
 WHERE r_i_type="yzrm"
 ORDER BY r_i_id
 LIMIT ${limit} OFFSET ${offset};
 `
  utility.getDataFromMySql(req, res, sql_temp, function callBack(result) {
    //有查询数据才开始发送数据
    if (result.length != 0) {
      var data = {};
      //这里是一个闭包，引用着上面page变量
      data.page = page;
      data.type = 'yzrm';
      data.recipes = result;
      utility.sendData(req, res, data)
    }
  })
}

module.exports = index