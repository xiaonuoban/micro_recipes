//引入express
var express = require('express');
//创建路由对象
var router = express.Router();

// 路由处理模块
var index = require('./index');
var recipes = require('./recipes');
var menus = require('./menus');
var sliders = require('./sliders');
var users = require('./users');
var type = require('./type');
var comments = require('./comments');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', new Date().toLocaleString());
  next();
});

//路由相关,所有路由写在这边，操作由相应文件进行

//首页的api
router.get('/index/sliders', function (req, res) {
  index.getSlidersData(req, res);
});
router.get('/index/menus', function (req, res) {
  index.getMenusData(req, res);
});
router.get('/index/xxcp', function (req, res) {
  index.getXxcpData(req, res);
});
router.get('/index/yzrm', function (req, res) {
  index.getYzrmData(req, res);
});

//轮播图的api
router.get('/sliders', function (req, res) {
  sliders.getPageData(req, res);
});

//菜单的api
router.get('/menus', function (req, res) {
  menus.getPageData(req, res);
});

//全部分类的api
//获取标题分类
router.get('/type/getType', function (req, res) {
  type.getType(req, res);
});
router.get('/type/getData', function (req, res) {
  type.getData(req, res);
});

//详细食谱api
router.get('/recipes', function (req, res) {
  recipes.getData(req, res);
});

//个人信息api
router.get('/user/getUserInfo', function (req, res) {
  users.getUserInfo(req, res);
});

//评论api
router.get('/comments/getCommentsData', function (req, res) {
  comments.getCommentsData(req, res);
});

// 导出路由对象
module.exports = router;