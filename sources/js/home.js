// var testSumData = {}
//   , startTime = 0
// $.ajax({
//   type: 'get'
//   , url: '../../api/transfer_devices.php'
//   , data: {
//     page: 1
//   }
//   , success: function (res) {
//     testSumData = {
//       testingNum: res.testingNum,
//       testPaseNum: res.testPaseNum,
//       testFailNum: res.testFailNum,
//       totalTestNum: res.totalTestNum,
//       startTime: res.startTime
//     };
//     var htmlTestSum = template('tpl-testSum', testSumData);
//     $('#testSum').html(htmlTestSum);                                   //....渲染测试总数....//
//   }
// })

$.ajax({
  type: 'get'
  , url: '../../api/transfer_devices.php'
  , data: {
    page: 1
  }
  , success: function (res) {
    testSumData = {
      testingNum: res.testingNum,
      testPaseNum: res.testPaseNum,
      testFailNum: res.testFailNum,
      totalTestNum: res.totalTestNum,
      startTime: res.startTime
    };
    var htmlTestSum = template('tpl-testSum', testSumData);
    $('#testSum').html(htmlTestSum);                                   //....渲染测试总数....//
  }
})

var table_data = []
layui.use(['laypage', 'layer', 'table', 'form'], function () {
  var table = layui.table
    , laypage = layui.laypage
    , layer = layui.layer
    , form = layui.form;

  table.render({       //渲染正在测试界面表格
    elem: '#testDevice'
    , url: '../../api/transfer_devices.php'
    , page: {
      limit: 25
      , limits: [10, 15, 20, 25, 30, 35, 40, 45, 50]
      , layout: ['prev', 'page', 'next', 'skip', 'count', 'limit']
      , jump: function (obj, first) {                                        //分页被操作时触发该函数
        //obj包含了当前分页的所有参数，比如：
        console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        console.log(obj.limit); //得到每页显示的条数
        //首次不执行
        if (!first) {
          //do something
          table.reloadData('testDevice', {                                   //只重载表格数据
            where: {
              page: obj.curr
              , limit: obj.limit
            }
          });
        }
      }
    }
    , parseData: function (res) { //res 即为原始返回的数据
      return {
        "code": res.status, //解析接口状态
        "msg": res.message, //解析提示文本
        "count": res.count, //解析数据长度
        "data": res.data //解析数据列表
      };
    }
    , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
    , cols: [[
      { type: 'checkbox', minWidth: 50 }
      , { field: 'id', title: '序号', type: 'numbers', minWidth: 50 }
      , { field: 'meterID', title: '设备编号', minWidth: 120, sort: true } //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
      , { field: 'IMEI', title: 'IMEI', minWidth: 160, sort: true }
      , { field: 'ICCID', title: 'ICCID', minWidth: 200, sort: true }
      , { field: 'VDD', title: '电池电压', minWidth: 105, sort: true ,templet:function(d) {
        var myHtml = ''
        if(d.VDD < 3.3){
          myHtml = '<span>电池电压<label style="background-color: rgb(206, 49, 49); border-radius: 10px; color: #fff; line-height: 20px; width: 60px; text-align: center;">'+ d.VDD +'V</label></span>'
        }
        else {
          myHtml = '<span>电池电压<label style="background-color: rgb(31, 138, 31); border-radius: 10px; color: #fff; line-height: 20px; width: 60px; text-align: center;">'+ d.VDD +'V</label></span>'
        }
        return myHtml
    }}
      , { field: 'CSQ', title: '信号强度', minWidth: 105, sort: true ,templet:function(d) {
        var myHtml = ''
        if(d.CSQ < 10) {
          myHtml = myHtml + '<span>信号强度<label style="background-color: rgb(206, 49, 49); border-radius: 10px; color: #fff; line-height: 20px; ; width: 20px;text-align: center;">'+ d.CSQ +'</label></span>'
        }
        else if(d.CSQ < 15) {
          myHtml = myHtml + '<span>信号强度<label style="background-color: orange; border-radius: 10px; color: #fff; line-height: 20px; ; width: 20px;text-align: center;">'+ d.CSQ +'</label></span>'
        }
        else {
          myHtml = myHtml + '<span>信号强度<label style="background-color:  rgb(31, 138, 31); border-radius: 10px; color: #fff; line-height: 20px; ; width: 20px;text-align: center;">'+ d.CSQ +'</label></span>'
        }
        return myHtml
    }}
      , { field: 'totalFlow', title: '累计用量', minWidth: 105, sort: true } //单元格内容水平居中
      , { field: 'testFlow', title: '当前测试用量', minWidth: 130, sort: true } //单元格内容水平居右
      , { field: 'reportTime', title: '最近上报时间', minWidth: 160, sort: true }
      , { field: 'V', title: '版本号', minWidth: 100, sort: true }
      , { field: 'testResult', title: '测试结果', minWidth: 105, sort: true }
      , { field: 'testTime', title: '测试时间', minWidth: 160, sort: true }
      , { field: 'operate', title: '操作', width: 125, minWidth: 125, minWidth: 100, templet: '#tpl-specificsBt' }
    ]]
    , even: true
    , done: function (res, curr, count) {                                 //表格渲染完后触发该函数
      //如果是异步请求数据方式，res即为你接口返回的信息。
      //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
      // console.log(res);

      //得到当前页码
      // console.log(curr); 

      //得到数据总量
      // console.log(count);
      table_data = res.data
    }
  });

})