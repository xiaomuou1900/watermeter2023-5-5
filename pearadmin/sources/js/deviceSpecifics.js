var meterID = location.search.split('=')[1]

layui.use(['layer', 'table', 'dropdown', 'form', 'jquery', 'element','laydate'], function () {
  var table = layui.table
    , layer = layui.layer
    , dropdown = layui.dropdown
    , form = layui.form
    , element = layui.element
    , laydate = layui.laydate

    laydate.render({
      elem: '#ID-laydate-demo'
    });

  table.render({                                                     //// 渲染第一个table ////
    elem: '#testDevice'
    , url: '../../api/transfer_devices.php'
    , where: {
      page: 1
      , meterID: meterID
    }
    , parseData: function (res) { //res 即为原始返回的数据
      if (res.msg != '数据不存在！') {
      }
      else {
        layer.alert('没有查询到该设备！')
      }
      return {
        "code": 0, //解析接口状态
        "data": res.data, //解析数据列表
      };
    }
    , cols: [[
      { field: 'meterID', title: '设备编号', minWidth: 120, sort: true } //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
      , { field: 'IMEI', title: 'IMEI', minWidth: 160, sort: true }
      , { field: 'ICCID', title: 'ICCID', minWidth: 200, sort: true }
      , { field: 'deviceStatus', title: '设备状态', minWidth: 60 }
      , { field: 'DN', title: '基表口径', minWidth: 60, sort: true }
      , { field: 'accuracy', title: '设备精度', minWidth: 60 }
      , { field: 'totalFlow', title: '累计用量', minWidth: 80, sort: true } //单元格内容水平居中
      , { field: 'reportTime', title: '上报日期', minWidth: 80, sort: true }
      , { field: 'meno', title: '备注', minWidth: 80 }
      , { title: '运行状态', minWidth: 105, templet: '#tpl-workStatus' }
      , { field: 'enterTimer', title: '入库时间', minWidth: 105, sort: true }
    ]]
    , even: true
    , error: function (res) {
      // console.log(res)
    }
    , done: function (res, curr, count) {
      //如果是异步请求数据方式，res即为你接口返回的信息。
      //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
      // console.log(res);
      //得到当前页码
      // console.log(curr); 

      //得到数据总量
      // console.log(count); 
    }
  })

  $('#specificsBt').on('click',function() {                      //...详情...按钮...//
    var specificsDIVData = {
      meterID: meterID
    };
    var htmlSpecificsDIV = template('tpl-specificsDIV', specificsDIVData);   //...获得详情界面template的HTML
    layer.open({                                                          //打开弹出层
      title: '状态展示',
      type: 1,
      area: ['40%', '60%'],
      content: htmlSpecificsDIV                                           //...将模板赋给内容
    })
    table.render({                                                        //...渲染测试详情表格
      elem: '#specificsTable'
      ,url:'../../api/entered_workStatus_specifics.json'
      ,where:{
        
      }
      ,parseData: function(res){ //res 即为原始返回的数据
        return {
          "code": res.code, //解析接口状态
          "msg": res.msg, //解析提示文本
          "count": res.count, //解析数据长度
          "data": res.data //解析数据列表
        };
      }
      , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
      , cols: [[
        { field: 'recordTime', title: '记录日期' }
        , { field: 'workStatus', title: '运行状态', minWidth: 80, templet: '#tpl-workStatus' } //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
        , { field: 'recordType', title: '记录类型'}
      ]]
      , even: true
    });
  })

  table.render({                         //...读数上报信息 表格...//
    elem: '#log-readDataReportInfo-table',
    url: '../../api/readDataReportInfo.json',
    page: {
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
          table.reloadData('log-readDataReportInfo-table', {                                   //只重载表格数据
            where: {
              page: obj.curr
              , limit: obj.limit
            }
          });
        }
      }
    },
    where: {
      page: 1
      , meterID: meterID
    },
    parseData: function (res) { //res 即为原始返回的数据
      if (res.msg != '数据不存在！') {
      }
      else {
        layer.alert('没有查询到该设备！')
      }
      return {
        "code": 0, //解析接口状态
        "count": res.count,
        "data": res.data, //解析数据列表
      };
    },
    cols: [
      [
        { title: '记录日期', field: 'recordTime', align: 'left' },
        { title: '读数', field: 'readData', align: 'left' },
        { title: '本次用量', field: 'waterConsumptionThisTime', align: 'left' },
        { title: '上报日期', field: 'reportTime', align: 'left' }
      ]
    ],
    skin: 'line',
    toolbar: false
  });

  table.render({                         //...操作指令 表格...//
    elem: '#log-operateOrder-table',
    url: '../../api/operateOrder.json',
    page: {
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
          table.reloadData('log-operateOrder-table', {                                   //只重载表格数据
            where: {
              page: obj.curr
              , limit: obj.limit
            }
          });
        }
      }
    },
    where: {
      page: 1
      , meterID: meterID
    },
    parseData: function (res) { //res 即为原始返回的数据
      if (res.msg != '数据不存在！') {
      }
      else {
        layer.alert('没有查询到该设备！')
      }
      return {
        "code": 0, //解析接口状态
        "count": res.count,
        "data": res.data, //解析数据列表
      };
    },
    cols: [
      [
        { title: '操作日期', field: 'operateTime', align: 'left' },
        { title: '操作类型', field: 'operateType', align: 'left' },
        { title: '操作人员', field: 'oprater', align: 'left' },
        { title: '当前状态', field: 'statusNow', align: 'left' }
      ]
    ],
    skin: 'line',
    toolbar: false
  });

  table.render({                         //...阀门记录 表格...//
    elem: '#log-valveRecord-table',
    url: '../../api/valveRecord.json',
    page: {
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
          table.reloadData('log-valveRecord-table', {                                   //只重载表格数据
            where: {
              page: obj.curr
              , limit: obj.limit
            }
          });
        }
      }
    },
    where: {
      page: 1
      , meterID: meterID
    },
    parseData: function (res) { //res 即为原始返回的数据
      if (res.msg != '数据不存在！') {
      }
      else {
        layer.alert('没有查询到该设备！')
      }
      return {
        "code": 0, //解析接口状态
        "count": res.count,
        "data": res.data, //解析数据列表
      };
    },
    cols: [
      [
        { title: '记录日期', field: 'recordTime', align: 'left' },
        { title: '阀门状态', field: 'valuveStatus', align: 'left' }
      ]
    ],
    skin: 'line',
    toolbar: false
  });

  table.render({                         //...读数异常记录 表格...//
    elem: '#log-readDataAbnormal-table',
    url: '../../api/readDataAbnormal.json',
    page: {
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
          table.reloadData('log-readDataAbnormal-table', {                                   //只重载表格数据
            where: {
              page: obj.curr
              , limit: obj.limit
            }
          });
        }
      }
    },
    where: {
      page: 1
      , meterID: meterID
    },
    parseData: function (res) { //res 即为原始返回的数据
      if (res.msg != '数据不存在！') {
      }
      else {
        layer.alert('没有查询到该设备！')
      }
      return {
        "code": 0, //解析接口状态
        "count": res.count,
        "data": res.data, //解析数据列表
      };
    },
    cols: [
      [
        { title: '记录日期', field: 'recordTime', align: 'left' },
        { title: '上报日期', field: 'reportTime', align: 'left' },
        { title: '本次读数', field: 'readDataThisTime', align: 'left' },
        { title: '上次读数', field: 'readDataLastTime', align: 'left' }
      ]
    ],
    skin: 'line',
    toolbar: false
  });

  table.render({                         //...异常记录 表格...//
    elem: '#log-abnormalRecord-table',
    url: '../../api/abnormalRecord.json',
    page: {
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
          table.reloadData('log-abnormalRecord-table', {                                   //只重载表格数据
            where: {
              page: obj.curr
              , limit: obj.limit
            }
          });
        }
      }
    },
    where: {
      page: 1
      , meterID: meterID
    },
    parseData: function (res) { //res 即为原始返回的数据
      if (res.msg != '数据不存在！') {
      }
      else {
        layer.alert('没有查询到该设备！')
      }
      return {
        "code": 0, //解析接口状态
        "count": res.count,
        "data": res.data, //解析数据列表
      };
    },
    cols: [
      [
        { title: '记录日期', field: 'recordTime', align: 'left' },
        { title: '异常信息', field: 'abnormalInfo', align: 'left' }
      ]
    ],
    skin: 'line',
    toolbar: false
  });

  table.render({                         //...冻结量 表格...//
    elem: '#log-freeze-table',
    url: '../../api/freeze.json',
    page: {
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
          table.reloadData('log-freeze-table', {                                   //只重载表格数据
            where: {
              page: obj.curr
              , limit: obj.limit
            }
          });
        }
      }
    },
    where: {
      page: 1
      , meterID: meterID
    },
    parseData: function (res) { //res 即为原始返回的数据
      if (res.msg != '数据不存在！') {
      }
      else {
        layer.alert('没有查询到该设备！')
      }
      return {
        "code": 0, //解析接口状态
        "count": res.count,
        "data": res.data, //解析数据列表
      };
    },
    cols: [
      [
        { title: '冻结日期', field: 'freezeTime', align: 'left' },
        { title: '冻结类型', field: 'freezeType', align: 'left' },
        { title: '读数', field: 'readData', align: 'left' },
        { title: '提取日期', field: 'pickUpTime', align: 'left' }
      ]
    ],
    skin: 'line',
    toolbar: false
  });

  $('.layui-tab-title').on('click','li',function(){
    document.getElementById("clearAbnormalBt2").focus();
  })

  form.on('submit(dict-type-query)', function (data) {
    table.reload('dict-type-table', { where: data.field })
    return false;
  });

  window.error = function (obj) {
    layer.open({
      type: 1,
      title: '异常信息',
      shade: 0,
      area: ['450px', '350px'],
      content: '<div class="pear-container"><div class="layui-card"><div class="layui-card-body">' + obj.data['error'] + '</div></div></div>'
    });
  }

  $("#clearAbnormalBt").on('click', function () {          //...清除异常 按钮...//
    $.ajax({
      type: 'post'
      , url: '../../api/transfer_devices.php'
      , data: {
        "man": 'LIANLIFT'
        , "initial_surplus": 20
        , 'scale': 0
        , "import": true
        , "clearAbnormal": "清除异常"
        , "meterID": meterID
        , success: function (res) {
          layer.alert('清除异常成功！')
          table.reloadData('testDevice', {                                   //只重载表格数据
            where: {
              page: 1
              , meterID: meterID
            }
          });
        }
      }
    })
  })

  var temp_startTime1 = 0
     , temp_data1 = {}
  $('#readDataReportInfoBt').on('click', function () {                                           //...读数上报信息...查询按钮...//
    var data = form.val('readDataReportInfoFilter')
    if (data.startTime === "") {
      layer.alert('请填写查询起始日期！')
      return
    }
    else {
      form.val('readDataReportInfoFilter', {
        "startTime": ""
      })
      if (data.startTime != "") {                                //...添加查找提示
        temp_data1.startTime = data.startTime
        if (temp_startTime1 == 0) {
          temp_startTime1 = 1
          var html = '<label id="startTimelabel_readDataReportInfo" class="label label-success" style="display: inline-block; background-color: var(--green-color); color:white; height: 22px; padding-top: 5px; margin-left:20px">开始时间：' + data.startTime + '<i class="layui-icon layui-icon-close" id="startTimeid_readDataReportInfo" style="font-size: 12px; padding-left:10px"></i></label>'
          $('#selectTips_readDataReportInfo').append(html)
        }
        else {
          var html = '开始日期：' + data.startTime + '<i class="layui-icon layui-icon-close" id="startTimeid_readDataReportInfo" style="font-size: 12px; padding-left:10px"></i>'
          $('#startTimelabel_readDataReportInfo').empty()
          $('#startTimelabel_readDataReportInfo').append(html)
        }
      }
    }
    table.reloadData('log-readDataReportInfo-table', {                                   //只重载表格数据
      where: {
        getContent: 'readDataReportInfo'
        , startTime: temp_data1.startTime
      }
    });
    $("#startTimeid_readDataReportInfo").off('click')     //绑定之前先解除之前绑定的事件，否则每次进来都会绑定一次事件
    $("#startTimeid_readDataReportInfo").on('click', function (e) {                  //...关闭查找提示
      temp_startTime1 = 0
      $("#startTimelabel_readDataReportInfo").remove()
      temp_data1.startTime = ""
      table.reloadData('log-readDataReportInfo-table', {
        where: {
          getContent: 'readDataReportInfo'
        }
      });
    })
  })

  var temp_startTime2 = 0
     , temp_data2 = {}
  $('#operateOrderBt').on('click', function () {                                           //...操作指令...查询按钮...//
    var data = form.val('operateOrderFilter')
    if (data.startTime === "") {
      layer.alert('请填写查询起始日期！')
      return
    }
    else {
      form.val('operateOrderFilter', {
        "startTime": ""
      })
      if (data.startTime != "") {                                //...添加查找提示
        temp_data2.startTime = data.startTime
        if (temp_startTime2 == 0) {
          temp_startTime2 = 1
          var html = '<label id="startTimelabel_operateOrder" class="label label-success" style="display: inline-block; background-color: var(--green-color); color:white; height: 22px; padding-top: 5px; margin-left:20px">开始时间：' + data.startTime + '<i class="layui-icon layui-icon-close" id="startTimeid_operateOrder" style="font-size: 12px; padding-left:10px"></i></label>'
          $('#selectTips_operateOrder').append(html)
        }
        else {
          var html = '开始日期：' + data.startTime + '<i class="layui-icon layui-icon-close" id="startTimeid_operateOrder" style="font-size: 12px; padding-left:10px"></i>'
          $('#startTimelabel_operateOrder').empty()
          $('#startTimelabel_operateOrder').append(html)
        }
      }
    }
    table.reloadData('log-operateOrder-table', {                                   //只重载表格数据
      where: {
        getContent: 'operateOrder'
        , startTime: temp_data2.startTime
      }
    });
    $("#startTimeid_operateOrder").off('click')     //绑定之前先解除之前绑定的事件，否则每次进来都会绑定一次事件
    $("#startTimeid_operateOrder").on('click', function (e) {                  //...关闭查找提示
      temp_startTime2 = 0
      $("#startTimelabel_operateOrder").remove()
      temp_data2.startTime = ""
      table.reloadData('log-operateOrder-table', {
        where: {
          getContent: 'operateOrder'
        }
      });
    })
  })

  var temp_startTime3 = 0
     , temp_data3 = {}
  $('#valveRecordBt').on('click', function () {                                           //...阀门记录...查询按钮...//
    var data = form.val('valveRecordFilter')
    if (data.startTime === "") {
      layer.alert('请填写查询起始日期！')
      return
    }
    else {
      form.val('valveRecordFilter', {
        "startTime": ""
      })
      if (data.startTime != "") {                                //...添加查找提示
        temp_data3.startTime = data.startTime
        if (temp_startTime3 == 0) {
          temp_startTime3 = 1
          var html = '<label id="startTimelabel_valveRecord" class="label label-success" style="display: inline-block; background-color: var(--green-color); color:white; height: 22px; padding-top: 5px; margin-left:20px">开始时间：' + data.startTime + '<i class="layui-icon layui-icon-close" id="startTimeid_valveRecord" style="font-size: 12px; padding-left:10px"></i></label>'
          $('#selectTips_valveRecord').append(html)
        }
        else {
          var html = '开始日期：' + data.startTime + '<i class="layui-icon layui-icon-close" id="startTimeid_valveRecord" style="font-size: 12px; padding-left:10px"></i>'
          $('#startTimelabel_valveRecord').empty()
          $('#startTimelabel_valveRecord').append(html)
        }
      }
    }
    table.reloadData('log-valveRecord-table', {                                   //只重载表格数据
      where: {
        getContent: 'valveRecord'
        , startTime: temp_data3.startTime
      }
    });
    $("#startTimeid_valveRecord").off('click')     //绑定之前先解除之前绑定的事件，否则每次进来都会绑定一次事件
    $("#startTimeid_valveRecord").on('click', function (e) {                  //...关闭查找提示
      temp_startTime3 = 0
      $("#startTimelabel_valveRecord").remove()
      temp_data3.startTime = ""
      table.reloadData('log-valveRecord-table', {
        where: {
          getContent: 'valveRecord'
        }
      });
    })
  })

  var temp_startTime4 = 0
     , temp_data4 = {}
  $('#readDataAbnormalBt').on('click', function () {                                           //...读数异常记录...查询按钮...//
    var data = form.val('readDataAbnormalFilter')
    if (data.startTime === "") {
      layer.alert('请填写查询起始日期！')
      return
    }
    else {
      form.val('readDataAbnormalFilter', {
        "startTime": ""
      })
      if (data.startTime != "") {                                //...添加查找提示
        temp_data4.startTime = data.startTime
        if (temp_startTime4 == 0) {
          temp_startTime4 = 1
          var html = '<label id="startTimelabel_readDataAbnormal" class="label label-success" style="display: inline-block; background-color: var(--green-color); color:white; height: 22px; padding-top: 5px; margin-left:20px">开始时间：' + data.startTime + '<i class="layui-icon layui-icon-close" id="startTimeid_readDataAbnormal" style="font-size: 12px; padding-left:10px"></i></label>'
          $('#selectTips_readDataAbnormal').append(html)
        }
        else {
          var html = '开始日期：' + data.startTime + '<i class="layui-icon layui-icon-close" id="startTimeid_readDataAbnormal" style="font-size: 12px; padding-left:10px"></i>'
          $('#startTimelabel_readDataAbnormal').empty()
          $('#startTimelabel_readDataAbnormal').append(html)
        }
      }
    }
    table.reloadData('log-readDataAbnormal-table', {                                   //只重载表格数据
      where: {
        getContent: 'readDataAbnormal'
        , startTime: temp_data4.startTime
      }
    });
    $("#startTimeid_readDataAbnormal").off('click')     //绑定之前先解除之前绑定的事件，否则每次进来都会绑定一次事件
    $("#startTimeid_readDataAbnormal").on('click', function (e) {                  //...关闭查找提示
      temp_startTime4 = 0
      $("#startTimelabel_readDataAbnormal").remove()
      temp_data5.startTime = ""
      table.reloadData('log-readDataAbnormal-table', {
        where: {
          getContent: 'readDataAbnormal'
        }
      });
    })
  })

  var temp_startTime5 = 0
     , temp_data5 = {}
  $('#abnormalRecordBt').on('click', function () {                                           //...异常记录...查询按钮...//
    var data = form.val('abnormalRecordFilter')
    if (data.startTime === "") {
      layer.alert('请填写查询起始日期！')
      return
    }
    else {
      form.val('abnormalRecordFilter', {
        "startTime": ""
      })
      if (data.startTime != "") {                                //...添加查找提示
        temp_data5.startTime = data.startTime
        if (temp_startTime5 == 0) {
          temp_startTime5 = 1
          var html = '<label id="startTimelabel_abnormalRecord" class="label label-success" style="display: inline-block; background-color: var(--green-color); color:white; height: 22px; padding-top: 5px; margin-left:20px">开始时间：' + data.startTime + '<i class="layui-icon layui-icon-close" id="startTimeid_abnormalRecord" style="font-size: 12px; padding-left:10px"></i></label>'
          $('#selectTips_abnormalRecord').append(html)
        }
        else {
          var html = '开始日期：' + data.startTime + '<i class="layui-icon layui-icon-close" id="startTimeid_abnormalRecord" style="font-size: 12px; padding-left:10px"></i>'
          $('#startTimelabel_abnormalRecord').empty()
          $('#startTimelabel_abnormalRecord').append(html)
        }
      }
    }
    table.reloadData('log-abnormalRecord-table', {                                   //只重载表格数据
      where: {
        getContent: 'abnormalRecord'
        , startTime: temp_data5.startTime
      }
    });
    $("#startTimeid_abnormalRecord").off('click')     //绑定之前先解除之前绑定的事件，否则每次进来都会绑定一次事件
    $("#startTimeid_abnormalRecord").on('click', function (e) {                  //...关闭查找提示
      temp_startTime5 = 0
      $("#startTimelabel_abnormalRecord").remove()
      temp_data6.startTime = ""
      table.reloadData('log-abnormalRecord-table', {
        where: {
          getContent: 'abnormalRecord'
        }
      });
    })
  })

  var temp_startTime6 = 0
      temp_freezeTypeInpt = 0
     , temp_data6 = {}
  $('#freezeBt').on('click', function () {                                           //...冻结量...查询按钮...//
    var data = form.val('freezeFilter')
    if ((data.startTime === "") && (data.freezeTypeInpt === "")) {
      layer.alert('请填写查询条件！')
      return
    }
    else {
      form.val('freezeFilter', {
        "startTime": ""
        ,"freezeTypeInpt":""
      })
      if (data.startTime != "") {                                //...添加查找提示
        temp_data6.startTime = data.startTime
        if (temp_startTime6 == 0) {
          temp_startTime6 = 1
          var html = '<label id="startTimelabel_freeze" class="label label-success" style="display: inline-block; background-color: var(--green-color); color:white; height: 22px; padding-top: 5px; margin-left:20px">开始时间：' + data.startTime + '<i class="layui-icon layui-icon-close" id="startTimeid_freeze" style="font-size: 12px; padding-left:10px"></i></label>'
          $('#selectTips_freeze').append(html)
        }
        else {
          var html = '开始日期：' + data.startTime + '<i class="layui-icon layui-icon-close" id="startTimeid_freeze" style="font-size: 12px; padding-left:10px"></i>'
          $('#startTimelabel_freeze').empty()
          $('#startTimelabel_freeze').append(html)
        }
      }
      if (data.freezeTypeInpt != "") {                                //...添加查找提示
        temp_data6.freezeType = data.freezeTypeInpt
        if (temp_freezeTypeInpt == 0) {
          temp_freezeTypeInpt = 1
          var html = '<label id="freezeTypeInptlabel" class="label label-success" style="display: inline-block; background-color: var(--green-color); color:white; height: 22px; padding-top: 5px; margin-left:20px">冻结类型：' + data.freezeTypeInpt + '<i class="layui-icon layui-icon-close" id="freezeTypeInptId" style="font-size: 12px; padding-left:10px"></i></label>'
          $('#selectTips_freeze').append(html)
        }
        else {
          var html = '冻结类型：' + data.freezeTypeInpt + '<i class="layui-icon layui-icon-close" id="freezeTypeInptId" style="font-size: 12px; padding-left:10px"></i>'
          $('#freezeTypeInptlabel').empty()
          $('#freezeTypeInptlabel').append(html)
        }
      }
    }
    table.reloadData('log-freeze-table', {                                   //只重载表格数据
      where: {
        getContent: 'freeze'
        , startTime: temp_data6.startTime
        , freezeType: temp_data6.freezeType
      }
    });
    $("#startTimeid_freeze").off('click')     //绑定之前先解除之前绑定的事件，否则每次进来都会绑定一次事件
    $("#startTimeid_freeze").on('click', function (e) {                  //...关闭查找提示
      temp_startTime6 = 0
      $("#startTimelabel_freeze").remove()
      temp_data6.startTime = ""
      table.reloadData('log-freeze-table', {
        where: {
          getContent: 'freeze'
          , startTime: temp_data6.startTime
          , freezeType: temp_data6.freezeType
        }
      });
    })
    $("#freezeTypeInptId").off('click')     //绑定之前先解除之前绑定的事件，否则每次进来都会绑定一次事件
    $("#freezeTypeInptId").on('click', function (e) {                  //...关闭查找提示
      temp_freezeTypeInpt = 0
      $("#freezeTypeInptlabel").remove()
      temp_data6.freezeType = ""
      table.reloadData('log-freeze-table', {
        where: {
          getContent: 'freeze'
          , startTime: temp_data6.startTime
          , freezeType: temp_data6.freezeType
        }
      });
    })
  })
})

