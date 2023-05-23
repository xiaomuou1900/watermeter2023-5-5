$.ajax({
  type: 'get'
  , url: '../../api/transfer_devices.php'
  , data: {
    page: 1
  }
  , success: function (res) {
    var testSumData = {
      enteredWarehouseNum: res.enteredWarehouseNum,
      serchNum: res.serchNum,
    };
    var htmlTestSum = template('tpl-testSum', testSumData);
    $('#testSum').html(htmlTestSum);                                   //...渲染测试总数...//
  }
})

var table_data = []
layui.use(['laypage', 'layer', 'table', 'form', 'laydate'], function () {
  var table = layui.table
    , laypage = layui.laypage
    , layer = layui.layer
    , form = layui.form
    , laydate = layui.laydate;
  var table_data = []
  table.render({                         //...渲染正在测试界面表格...//
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
      , { field: 'deviceStatus', title: '设备状态', minWidth: 105 }
      , { field: 'DN', title: '基表口径', minWidth: 105, sort: true }
      , { field: 'totalFlow', title: '累计用量', minWidth: 105, sort: true } //单元格内容水平居中
      , { field: 'reportTime', title: '上报日期', minWidth: 105, sort: true }
      , { field: 'transferor', title: '所属厂商', Width: 100}
      , { field: 'meno', title: '备注', minWidth: 105}
      , { field: 'V', title: '版本号', minWidth: 105, sort: true }
      , { field: 'pcbModel', title: '型号', minWidth: 105, sort: true }
      , { title: '运行状态', minWidth: 105, templet:function(d) {
          var myHtml = ''
          if(d.VDD < 3.3){
            myHtml = '<span>电池电压<label style="background-color: rgb(206, 49, 49); border-radius: 10px; color: #fff; line-height: 20px; width: 60px; text-align: center;">'+ d.VDD +'V</label></span>'
          }
          else {
            myHtml = '<span>电池电压<label style="background-color: rgb(31, 138, 31); border-radius: 10px; color: #fff; line-height: 20px; width: 60px; text-align: center;">'+ d.VDD +'V</label></span>'
          }
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
      , { field: 'enterTimer', title: '入库时间', minWidth: 105, sort: true }
      , { field: 'initRecharge', title: '预存量', minWidth: 105, sort: true }
      , { field: 'operate', title: '操作',minWidth: 100, templet: '#tpl-specificsBt' }
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
  table.on('tool(test)', function (obj) {                                   //...单元格工具事件（单击测试详情触发）...//
    var data = obj.data;
    if (obj.event == 'specifics') {
      layer.open({
        type: 2, 
        area:['100%','100%'],
        title:['设备详情', 'font-size:25px; background-color: var(--grey-color); padding-left: 10px'],
        content: '../../view/testing/deviceSpecifics.html?meterID='+data.meterID // URL
      }); 
    }
  });


  laydate.render({                                        //...渲染查找日期范围...//
    elem: '#ID-laydate-range',
    range: ['#ID-laydate-start-date', '#ID-laydate-end-date'],
    id: 'ID-laydate-range',
    done: function (value, date, endDate) {
    }
  })

  var temp_meterID = 0
    , temp_IMEI = 0
    , temp_ICCID = 0
    , temp_data = {}
    , temp_startDate = 0
  $('#deviceSerchBt').on('click', function () {                                           //...查询按钮...//
    var data = form.val('deviceSerchFilter')
    if (data.meterIDserchInpt === "" && data.IMEIserchInpt === "" && data.ICCIDserchInpt === "" && (data.startDate === "" || data.endDate === "")) {
      layer.alert('请填写查询信息！')
      return
    }
    else {
      form.val('deviceSerchFilter', {
        "meterIDserchInpt": "",
        "IMEIserchInpt": "",
        "ICCIDserchInpt": "",
        "startDate": "",
        "endDate": ""
      })
      if (data.meterIDserchInpt != "") {                                //...添加查找提示
        temp_data.meterID = data.meterIDserchInpt
        if (temp_meterID == 0) {
          temp_meterID = 1
          var html = '<label id="meterIDlabel" class="label label-success" style="display: inline-block; background-color: var(--green-color); color:white; height: 22px; padding-top: 5px; margin-right:10px">设备编号：' + data.meterIDserchInpt + '<i class="layui-icon layui-icon-close" id="meterIDid" style="font-size: 12px; padding-left:10px"></i></label>'
          $('#selectTips').append(html)
        }
        else {
          var html = '设备编号：' + data.meterIDserchInpt + '<i class="layui-icon layui-icon-close" id="meterIDid" style="font-size: 12px; padding-left:10px"></i>'
          $('#meterIDlabel').empty()
          $('#meterIDlabel').append(html)
        }
      }
      if (data.IMEIserchInpt != "") {
        temp_data.IMEI = data.IMEIserchInpt
        if (temp_IMEI == 0) {
          temp_IMEI = 1
          var html = '<label id="IMEIlabel" class="label label-success" style="display: inline-block; background-color: var(--green-color); color:white; height: 22px; padding-top: 5px; margin-right:10px">IMEI：' + data.IMEIserchInpt + '<i class="layui-icon layui-icon-close" id="IMEIid" style="font-size: 12px; padding-left:10px"></i></label>'
          $('#selectTips').append(html)
        }
        else {
          var html = 'IMEI: ' + data.IMEIserchInpt + '<i class="layui-icon layui-icon-close" id="IMEIid" style="font-size: 12px; padding-left:10px"></i>'
          $('#IMEIlabel').empty()
          $('#IMEIlabel').append(html)
        }
      }
      if (data.ICCIDserchInpt != "") {
        temp_data.ICCID = data.ICCIDserchInpt
        if (temp_ICCID == 0) {
          temp_ICCID = 1
          var html = '<label id="ICCIDlabel" class="label label-success" style="display: inline-block; background-color: var(--green-color); color:white; height: 22px; padding-top: 5px; margin-right:10px">ICCID：' + data.ICCIDserchInpt + '<i class="layui-icon layui-icon-close" id="ICCIDid" style="font-size: 12px; padding-left:10px"></i></label>'
          $('#selectTips').append(html)
        }
        else {
          var html = 'ICCID: ' + data.ICCIDserchInpt + '<i class="layui-icon layui-icon-close" id="ICCIDid" style="font-size: 12px; padding-left:10px"></i>'
          $('#ICCIDlabel').empty()
          $('#ICCIDlabel').append(html)
        }
      }
      if (data.startDate != "") {
        temp_data.startDate = data.startDate
        temp_data.endDate = data.endDate
        if (temp_startDate == 0) {
          temp_startDate = 1
          var html = '<label id="startDateLabel" class="label label-success" style="display: inline-block; background-color: var(--green-color); color:white; height: 22px; padding-top: 5px; margin-right:10px">日期范围：' + data.startDate + '—' + data.endDate + '<i class="layui-icon layui-icon-close" id="startDateId" style="font-size: 12px; padding-left:10px"></i></label>'
          $('#selectTips').append(html)
        }
        else {
          var html = '日期范围: ' + data.startDate + '—' + data.endDate + '<i class="layui-icon layui-icon-close" id="startDateId" style="font-size: 12px; padding-left:10px"></i>'
          $('#startDateLabel').empty()
          $('#startDateLabel').append(html)
        }
      }
    }
    table.reloadData('testDevice', {                                   //只重载表格数据
      where: {
        meterID: temp_data.meterID
        , IMEI: temp_data.IMEI
        , ICCID: temp_data.ICCID
        , startDate: temp_data.startDate
        , endDate: temp_data.endDate
      }
    });
    $.ajax({
      type: 'get'
      , url: '../../api/transfer_devices.php'
      , data: {
        page: 1
      }
      , success: function (res) {
        var testSumData = {
          enteredWarehouseNum: res.enteredWarehouseNum,
          serchNum: res.serchNum,
        };
        var htmlTestSum = template('tpl-testSum', testSumData);
        $('#testSum').html(htmlTestSum);                                   //...渲染测试总数...//
      }
    })

    $("#meterIDid").off('click')     //绑定之前先解除之前绑定的事件，否则每次进来都会绑定一次事件
    $("#meterIDid").on('click', function (e) {                  //...关闭查找提示
      temp_meterID = 0
      $("#meterIDlabel").remove()
      temp_data.meterID = ""
      table.reloadData('testDevice', {
        where: {
          meterID: temp_data.meterID
          , IMEI: temp_data.IMEI
          , ICCID: temp_data.ICCID
          , startDate: temp_data.startDate
          , endDate: temp_data.endDate
        }
      });
      $.ajax({
        type: 'get'
        , url: '../../api/transfer_devices.php'
        , data: {
          page: 1
        }
        , success: function (res) {
          var testSumData = {
            enteredWarehouseNum: res.enteredWarehouseNum,
            serchNum: res.serchNum,
          };
          var htmlTestSum = template('tpl-testSum', testSumData);
          $('#testSum').html(htmlTestSum);                                   //...渲染测试总数...//
        }
      })
    })
    $("#IMEIid").off('click')
    $("#IMEIid").on('click', function (e) {                     //...关闭查找提示
      temp_IMEI = 0
      $("#IMEIlabel").remove()
      temp_data.IMEI = ""
      table.reloadData('testDevice', {
        where: {
          meterID: temp_data.meterID
          , IMEI: temp_data.IMEI
          , ICCID: temp_data.ICCID
          , startDate: temp_data.startDate
          , endDate: temp_data.endDate
        }
      });
      $.ajax({
        type: 'get'
        , url: '../../api/transfer_devices.php'
        , data: {
          page: 1
        }
        , success: function (res) {
          var testSumData = {
            enteredWarehouseNum: res.enteredWarehouseNum,
            serchNum: res.serchNum,
          };
          var htmlTestSum = template('tpl-testSum', testSumData);
          $('#testSum').html(htmlTestSum);                                   //...渲染测试总数...//
        }
      })
    })
    $("#ICCIDid").off('click')
    $("#ICCIDid").on('click', function (e) {                    //...关闭查找提示
      temp_ICCID = 0
      $("#ICCIDlabel").remove()
      temp_data.ICCID = ""
      table.reloadData('testDevice', {
        where: {
          meterID: temp_data.meterID
          , IMEI: temp_data.IMEI
          , ICCID: temp_data.ICCID
          , startDate: temp_data.startDate
          , endDate: temp_data.endDate
        }
      });
      $.ajax({
        type: 'get'
        , url: '../../api/transfer_devices.php'
        , data: {
          page: 1
        }
        , success: function (res) {
          var testSumData = {
            enteredWarehouseNum: res.enteredWarehouseNum,
            serchNum: res.serchNum,
          };
          var htmlTestSum = template('tpl-testSum', testSumData);
          $('#testSum').html(htmlTestSum);                                   //...渲染测试总数...//
        }
      })
    })
    $("#startDateId").off('click')
    $("#startDateId").on('click', function (e) {                    //...关闭查找提示
      temp_startDate = 0
      $("#startDateLabel").remove()
      temp_data.startDate = ""
      temp_data.endDate = ""
      table.reloadData('testDevice', {
        where: {
          meterID: temp_data.meterID
          , IMEI: temp_data.IMEI
          , ICCID: temp_data.ICCID
          , startDate: temp_data.startDate
          , endDate: temp_data.endDate
        }
      });
      $.ajax({
        type: 'get'
        , url: '../../api/transfer_devices.php'
        , data: {
          page: 1
        }
        , success: function (res) {
          var testSumData = {
            enteredWarehouseNum: res.enteredWarehouseNum,
            serchNum: res.serchNum,
          };
          var htmlTestSum = template('tpl-testSum', testSumData);
          $('#testSum').html(htmlTestSum);                                   //...渲染测试总数...//
        }
      })
    })
  })

  $("#exportBt").click(function () {                                       //...导出按钮...//
    var ins1 = table.render({
      elem: '#data_export'
      , url: '../../api/transfer_devices.php'
      , where: {
        export: 'all'
      }
      , title: "导出数据"
      , parseData: function (res) { //res 即为原始返回的数据
        return {
          "code": res.status, //解析接口状态
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
        , { field: 'VDD', title: '电池电压', minWidth: 105, sort: true }
        , { field: 'SS', title: '信号强度', minWidth: 105, sort: true }
        , { field: 'totalFlow', title: '累计用量', minWidth: 105, sort: true } //单元格内容水平居中
        , { field: 'testFlow', title: '当前测试用量', minWidth: 130, sort: true } //单元格内容水平居右
        , { field: 'reportTime', title: '最近上报时间', minWidth: 160, sort: true }
        , { field: 'V', title: '版本号', minWidth: 100, sort: true }
        , { field: 'testResult', title: '测试结果', minWidth: 105, sort: true }
        , { field: 'testTime', title: '测试时间', minWidth: 160, sort: true }
        , { field: 'operate', title: '操作', width: 125, minWidth: 125, minWidth: 100, templet: '#tpl-specificsBt' }
      ]]
      , even: true
      , done: function (res, curr, count) {
        exportData = res.data;
        table.exportFile(ins1.config.id, exportData, 'xls');
      }
    })
  })

  var inbound_meterID = []
  table.on('checkbox(test)', function (obj) {                          //...复选框发生改变...//
    if (obj.type === "one") {
      if (obj.checked == true) {
        inbound_meterID.push(obj.data.meterID)
      }
      else {
        index_temp = inbound_meterID.indexOf(obj.data.meterID)
        if (index_temp != -1) {
          inbound_meterID.splice(index_temp, 1)
        }
      }
    }
    if (obj.type === "all") {
      if (obj.checked == true) {
        var all_data = table_data    //获得表格所有数据
        inbound_meterID = []
        for (var i = 0; i < all_data.length; i++) {
          inbound_meterID[i] = all_data[i].meterID
        }
      }
      else {
        inbound_meterID = []
      }
    }
    if (inbound_meterID.length > 0) {
      $('#selectingNumSpan').html(inbound_meterID.length)
      deviceControlDIV.style = "background-color: #fff;  border-top: 3px solid orange;"

      $('#deletDeviceBt').off('click')
      $('#deletDeviceBt').on('click', function () {                  //...删除设备 按钮...//
        $.ajax({
          type: 'post'
          , url: '../../api/transfer_devices.php'
          , data: {
            "man": 'LIANLIFT'
            , "initial_surplus": 20
            , 'scale': 0
            , "import": true
            , "deletDevice": "删除设备"
            , inbound_meterID
            , success: function (res) {
              layer.alert('删除设备成功！')
              $.ajax({
                type: 'get'
                , url: '../../api/transfer_devices.php'
                , data: {
                  page: 1
                }
                , success: function (res) {
                  var testSumData = {
                    enteredWarehouseNum: res.enteredWarehouseNum,
                    serchNum: res.serchNum,
                  };
                  var htmlTestSum = template('tpl-testSum', testSumData);
                  $('#testSum').html(htmlTestSum);                                   //...渲染测试总数...//
                }
              })
            }
          }
        })
      })
    }
    else {
      deviceControlDIV.style = "display: none; background-color: #fff;  border-top: 3px solid orange;"
    }
    // html = "当前录入"+ inbound_meterID.length +"个设备"
    // $("#select_num").empty()
    // $("#select_num").append(html)
  })

})

