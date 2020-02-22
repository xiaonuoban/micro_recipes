var utility = require('./utility');
//获取菜单页的数据
var menus = {}

menus.getPageData = function (req, res) {
  var r_pd_id = req.query.r_pd_id;
  //只有传了page才往后面查询
  if (!r_pd_id) {
    utility.sendErroData(req, res);
    return
  }

  //取数据
  var data = {}
  //注意要判断r_pd_menu_data是否为空
  var sql_temp = `
  SELECT r_pd_id, r_pd_type, r_pd_menu_data
  FROM recipes_pages_data
  WHERE r_pd_id=${r_pd_id} AND r_pd_menu_data IS NOT null;
  `
  utility.getDataFromMySql(req, res, sql_temp, function callBack(result) {
    //全部数据取出后再处理
    if (result.length != 0) {
      //这里是一个闭包，引用着上面变量
      //data第一层数据
      data.r_pd_id = result[0].r_pd_id;
      data.r_pd_type = result[0].r_pd_type;
      data.r_pd_menu_data = JSON.parse(result[0].r_pd_menu_data);
      var type = result[0].r_pd_type;
      var sql_temp_2 = `
      SELECT r_i_id, r_i_type, r_i_r_id, r_i_show_title, r_i_u_id, r_i_show_user_name, r_i_avatar, r_i_show_img, r_i_materials
      FROM recipes_index_type 
      WHERE r_i_type LIKE "${type}" AND r_i_materials IS NOT null
      `;      
      utility.getDataFromMySql(req, res, sql_temp_2, function callBack(result) {
        if (result.length != 0) {          
          //发送数据
          data.recipes = result;
          utility.sendData(req, res, data)
        }
      })

    }
  })

}
module.exports = menus