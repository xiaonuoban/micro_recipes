var utility = require('./utility');

//处理轮播图相关的操作
var sliders = {}

//获取某个轮播图页面的数据
sliders.getPageData = function (req, res) {
  var r_pd_id = req.query.r_pd_id;
  //只有传了page才往后面查询
  if (!r_pd_id) {
    utility.sendErroData(req, res);
    return
  }

  //取数据
  var data = {}
  //注意要判断r_pd_data是否为空
  var sql_temp = `
  SELECT r_pd_id, r_pd_type, r_pd_img, r_pd_desc, r_pd_data
  FROM recipes_pages_data 
  WHERE r_pd_id=${r_pd_id} AND r_pd_data IS NOT null
  `
  utility.getDataFromMySql(req, res, sql_temp, function callBack(result) {
    //全部数据取出后再处理
    if (result.length != 0) {
      //这里是一个闭包，引用着上面变量
      //data第一层数据
      data.r_pd_id = result[0].r_pd_id;
      data.r_pd_type = result[0].r_pd_type;
      data.r_pd_img = result[0].r_pd_img;
      data.r_pd_desc = result[0].r_pd_desc;
      //处理list数据,注意r_pd_data可能为空
      var r_pd_data = JSON.parse(result[0].r_pd_data);
      // 查询list下数据
      var type = result[0].r_pd_type;
      var sql_temp_2 = `
      SELECT r_i_id, r_i_type, r_i_r_id, r_i_show_title, r_i_u_id, r_i_show_user_name, r_i_avatar, r_i_show_img
      FROM recipes_index_type 
      WHERE r_i_type LIKE "${type}_%"
      `
      utility.getDataFromMySql(req, res, sql_temp_2, function callBack(result) {
        if (result.length != 0) {          
          for(var i=0; i<r_pd_data.length; i++){
            r_pd_data[i].recipes = []
            for(var j=0; j<result.length; j++){
              if (result[j].r_i_type == type+'_'+String(i+1)) {
                r_pd_data[i].recipes.push(result[j])
              }
            }
          }
          //发送数据
          data.list = r_pd_data;
          utility.sendData(req, res, data)
        }
      })

    }
  })

}
module.exports = sliders