var table_data = []
var table_count = ''
layui.use(['laypage', 'layer', 'table', 'form', 'laydate'], function () {
  var table = layui.table
    , laypage = layui.laypage
    , layer = layui.layer
    , form = layui.form
    , laydate = layui.laydate;
  var table_data = []
    , file = {}

  var excelNameSpan = ""    //任务编号
  var getDataMeterID = []   //分页获取数据 表号存放数组
  var htmlList = []
  $('#importBt').click(function () {                                  //...批量表号导入按钮...//
    var platform = form.val('deviceSerchFilter')
    // if(platform.platformSerchInpt == "") {
    //   layer.alert('请选择平台')
    //   return
    // }
    layer.open({
      type: 1
      , title: "批量表号导入"
      , area: ["70%", "30%"]
      , content: '<div style="margin-left:20px; margin-top:5px"><input id="fileAddressInpt"  type="file" accept=".xls,.xlsx" class="hide"><button id="fileAddressBt" class="layui-btn layui-btn-sm" style="margin-bottom:3px; margin-left:2px;">选择文件</button><span id="fileName" style="margin-left:20px;border-bottom: 1px solid #f0f0f0; width:80%"></span></div>'
      , btn: ["查询", "取消"]
      , success: function (layero, index, that) {
        // // 弹层的最外层元素的 jQuery 对象
        // console.log(layero);
        // // 弹层的索引值
        // console.log(index);
        // // 弹层内部原型链中的 this --- 2.8+
        // console.log(that);
        let filePath  //选择文件路径
        $('#fileAddressBt').off('click')
        $('#fileAddressBt').on('click', function (e) {
          filePath = ''
          $('#fileAddressInpt').val("")
          $('#fileAddressInpt').click()
        })
        $('#fileAddressInpt').on('change', function (e) {  //获取文件信息
          file = document.getElementById('fileAddressInpt').files[0]
          $('#fileName').text("文件名： " + file.name);
          excelNameSpan = "任务编号：" + file.name.substr(0, file.name.indexOf('.'));     // 重置excelNameSpan
          let reader = new FileReader();
          // let file = e.files[0];
          reader.readAsBinaryString(file);
          reader.onload = function (e) {
            let wb
            try {
              let data = e.target.result;
              wb = XLSX.read(data, { type: 'binary' });
            } catch (e) {
              layer.alert('文件类型不正确')
              return
            }
            sheetName = wb.SheetNames[0] // 获取文档中第一个sheet页签的名字
            sheets = wb.Sheets[sheetName] // 获sheet名页签下的数据
            // console.log(sheets);
            htmlList = XLSX.utils.sheet_to_json(sheets) // sheet页签的内容转化为json数据
            // console.log(htmlList);     
          };
        })
      }
      , btn1: function (index, layero, that) {                                //...弹出页中的 查询 按钮       
        laypage.render({                                   //加载分页
          elem: 'demo-laypage-all', // 元素 id
          count: htmlList.length, // EXCEL批量查询数据总数
          limit: 25,
          limits:[10,20,25,50],
          layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'], // 功能布局
          jump: function (obj) {
            // console.log(obj.curr); // 得到当前页，以便向服务端请求对应页的数据。
            // console.log(obj.limit); // 得到每页显示的条数
            getDataMeterID = []
            for (var i = (obj.curr - 1) * obj.limit; i < obj.limit * obj.curr; i++) {
              if (i >= htmlList.length) {
                i = obj.limit * obj.curr
              } else {
                getDataMeterID.push(htmlList[i])
              }
            }
            // console.log(getDataMeterID)
            // 首次不执行
            if (obj.curr != 1) {
              table.reloadData('testDevice', {                                   //只重载表格数据
                where: {
                  get: 'devicesInfo_import' 
                  , page: obj.curr
                  , limit: obj.limit
                  ,getDataMeterID
                }
              });
              return
            }
            table.render({                          //...渲染表格...//
              elem: '#testDevice'
              , url: '../../api/transfer_devices.php'
              , where: {
                page:obj.curr
                ,limit: obj.limit
                ,getDataMeterID
              }
              , parseData: function (res) { //res 即为原始返回的数据
                return {
                  "code": res.status, //解析接口状态
                  "msg": res.message, //解析提示文本
                  // "count": res.count, //解析数据长度
                  "data": res.data //解析数据列表
                };
              }
              , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
              , cols: [[
                { field: 'id', title: '序号', type: 'numbers', minWidth: 50 }
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
                , { field: 'valveStatus', title: '阀门状态', minWidth: 130, sort: true } //单元格内容水平居右
                , { field: 'RSRP', title: 'RSRP', minWidth: 105, sort: true }
                , { field: 'SNR', title: 'SNR', minWidth: 160, sort: true }
                , { field: 'reporime', title: '最近上报时间', minWidth: 160, sort: true }
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
                $('#excelNameSpan').html(excelNameSpan)
              }
            });
          }          
        });
        return
      }
      , btn2: function (index, layero, that) {
        return
      }
    })
  })

  $("#exportBt").click(function () {                                      //...导出按钮...//
    if(excelNameSpan == '') {
      layer.alert('没有可导出数据')
      return
    }
    var date = new Date()
    var month = date.getMonth() +1
    if (month < 10 ) {
      month = '0' + month
    }
    var dates = '' + date.getFullYear() + month + date.getDate("00")
    var ins1 = table.render({
      elem: '#data_export'
      , url: '../../api/transfer_devices.php'
      , where: {
        export: 'devicesInfo_import'
        ,page:1
        , htmlList
      }
      , title: excelNameSpan +'-'+ dates
      , parseData: function (res) { //res 即为原始返回的数据
        return {
          "code": res.code, //解析接口状态
          "data": res.data //解析数据列表
        };
      }
      , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
      , cols: [[
        { field: 'id', title: '序号', type: 'numbers', minWidth: 50 }
        , { field: 'meterID', title: '设备编号', minWidth: 120, sort: true } //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
        , { field: 'IMEI', title: 'IMEI', minWidth: 160, sort: true }
        , { field: 'ICCID', title: 'ICCID', minWidth: 200, sort: true }
        , { field: 'VDD', title: '电池电压', minWidth: 105, sort: true }
        , { field: 'CSQ', title: '信号强度', minWidth: 105, sort: true }
        , { field: 'totalFlow', title: '累计用量', minWidth: 105, sort: true } //单元格内容水平居中
        , { field: 'valveStatus', title: '阀门状态', minWidth: 130, sort: true } //单元格内容水平居右
        , { field: 'RSRP', title: 'RSRP', minWidth: 105, sort: true }
        , { field: 'SNR', title: 'SNR', minWidth: 160, sort: true }
        , { field: 'reporime', title: '最近上报时间', minWidth: 160, sort: true }
      ]]
      , even: true
      , done: function (res, curr, count) {
        exportData = res.data;
        table.exportFile(ins1.config.id, exportData, 'xls');
      }
    })
  })
})

