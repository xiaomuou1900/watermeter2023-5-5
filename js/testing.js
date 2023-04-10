layui.use(['laypage', 'layer','table'], function(){
  var table = layui.table; 
  var laypage = layui.laypage
  ,layer = layui.layer;
  table.render({
    elem: '#testDevice'
    ,url:'api/testing.php'
    ,limit:25
    // ,request: {
    //   pageName: 'curr' //页码的参数名称，默认：page
    //   ,limitName: 'nums' //每页数据量的参数名，默认：limit
    // }
    // ,where: {page:0}
    ,parseData: function(res){ //res 即为原始返回的数据
      return {
        "code": res.status, //解析接口状态
        "msg": res.message, //解析提示文本
        "count": res.total, //解析数据长度
        "data": res.data //解析数据列表
      };
    }
    ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
    ,cols: [[
      {type: 'checkbox', fixed: 'left'}
      ,{field:'id', title: '序号',width:'4%'}
      ,{field:'meterID', title: '设备编号',width:120} //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
      ,{field:'ICCID', title: 'ICCID'}
      ,{field:'VDD', title: '电池电压'}
      ,{field:'SS', title: '信号强度'}
      ,{field:'totalFlow', title: '累计用量'} //单元格内容水平居中
      ,{field:'testFlow', title: '当前测试用量'} //单元格内容水平居右
      ,{field:'reportTime', title: '最近上报时间'}
      ,{field:'V', title: '版本号'}
      ,{field:'testResult', title: '测试结果'}
      ,{field:'testTime', title: '测试时间'}
      ,{field:'operate', title: '操作', width: 125, minWidth: 125, toolbar: 'default'}
    ]]

    
    // ,method: get
    // ,where:{
    //   page:0,
    //   pageNum:25
    // }  //请求时带的参数
    // ,parseData: function(res){ //res 即为原始返回的数据
    //   return {
    //     "code": res.status, //解析接口状态
    //     "msg": res.msg, //解析提示文本
    //     "count": res.count, //解析数据长度
    //     "data": res.data.item //解析数据列表
    //   };  
    // }

    // ,data: [
    //   {
    //     "id":1, 
    //     "meterID": 21031001,
    //     "ICCID": 89861119264006003353,
    //     "IMEI":861001051498679,
    //     "VDD": 3.66,
    //     "SS": 20,
    //     "totalFlow": 1.224,
    //     "testFlow": 0.001,
    //     "reportTime": "2023-04-10 03:41:20",
    //     "version": "11.35",
    //     "testResult":"正在测试" ,
    //     "testTime": "",
    //     // "operate":
    //   }
  //  ]
   ,even: true
  });
  laypage.render({
      elem: 'paging'
      ,count: 1000
      ,layout: ['count', 'prev', 'page', 'next', 'refresh', 'skip']
      ,jump: function(obj){
        console.log(obj)
      }
  });
})

var testSumData = {
  testingNum: 10,
  testPaseNum:9,
  testFailNum:1,
  totalTestNum:20,
  startTime: 2023
};
var htmlTestSum = template('tpl-testSum',testSumData);
$('#testSum').html(htmlTestSum);
