var fs = require('fs');
var os = require('os')
var express = require('express');
var router = require('./router/router');


var app = express();
//开放静态资源
app.use('/public/', express.static('./public/'));
app.use('/views/', express.static('./views/'));
app.get('/', function (req, res) {
    res.redirect('/public/index.html')
});

// 把路由容器挂载到 app 服务中
app.use('/api', router);

//错误处理程序
app.use(function (req, res, next) {
  res.status(404).json({ status: 0, data: {} });
});
app.use(function (err, req, res, next) {
  //服务器出问题时候的处理
  console.error(err.stack);
  res.status(500).send('sorry! something wrong.');
});

//启动程序
app.listen(3000, function () {
  var networkInterfaces=os.networkInterfaces();
  // console.log(networkInterfaces.WLAN[0].address);
  console.log('running...(可以在'+networkInterfaces.WLAN[0].address+':3000中访问)');
})
