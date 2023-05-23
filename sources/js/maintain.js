$.ajax({
  type: "get"
  , url: '../../api/transfer_devices.php'
  , data: {
    page: 1
    ,get: "deviceSumData"
    ,maintainStatus: "已进入维修"
  }
  , success: function (res) {
    var deviceSumData = {
      deviceSum: res.deviceSum
      , in_maintainSum: res.in_maintainSum
      , serchNum: res.serchNum
    }
    var htmlTestSum = template('tpl-deviceSum', deviceSumData);
    $('#deviceSum').html(htmlTestSum);                                                //...渲染设备总数 一栏...//
  }
})



layui.use(['laypage', 'layer', 'table', 'form'], function () {
  var table = layui.table
    , laypage = layui.laypage
    , layer = layui.layer
    , form = layui.form
  $.ajax({                                                //...请求 转让厂商 并渲染选择框
    type: 'get'
    , url: '../../api/transfer_devices.php'
    , data: {
      page: 1
      ,get : 'transferor'
    }
    , success: function (res) {
      $.each(res.transferor, function (index, elem) {
        var html = '<option value="' + elem + '">' + elem + '</option>'
        $("#transferor").append(html)
      })
      form.render('select');                              //...渲染所有选择框
    }
  })

  table.render({       //渲染表格
    elem: '#deviceTable'
    , url: '../../api/transfer_devices.php'
    ,where: {
      maintainStatus:  "已进入维修"
    }
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
          table.reloadData('deviceLayData', {                                   //只重载表格数据
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
      , { field: 'maintainStatus', title: '维修状态', minWidth: 105 }
      , { field: 'transferor', title: '所属厂商', minWidth: 105 }
      , { field: 'meno', title: '备注', minWidth: 160 }
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
    }
  });

  $("#exportBt").click(function () {                                       //...导出按钮...//
    var ins1 = table.render({
      elem: '#data_export'
      , url: '../../api/all_exception.json'
      , where: {
        export: 'all'
      }
      , title: "导出数据"
      , parseData: function (res) { //res 即为原始返回的数据
        return {
          "code": res.code, //解析接口状态
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
        , { field: 'maintainStatus', title: '维修状态', minWidth: 105 }
        , { field: 'transferor', title: '所属厂商', minWidth: 105 }
        , { field: 'meno', title: '备注', minWidth: 160 }
      ]]
      , even: true
      , done: function (res, curr, count) {
        exportData = res.data;
        table.exportFile(ins1.config.id, exportData, 'xls');
      }
    })
  })

  var temp_meterID = 0
    , temp_IMEI = 0
    , temp_ICCID = 0
    , temp_maintainStatus = 0
    , temp_transferor = 0
    , temp_meno = 0
    , temp_data = {}
  if (temp_maintainStatus == 0) {
    temp_maintainStatus = 1
    var html = '<label id="maintainStatusLabel" class="label label-success" style="display: inline-block; background-color: var(--green-color); color:white; height: 22px; padding-top: 5px; margin-right:10px">维修状态：已进入维修<i class="layui-icon layui-icon-close" style="font-size: 12px; padding-left:10px"></i></label>'
    $('#selectTips').append(html)
  }
  $("#maintainStatusLabel i").off('click')
    $("#maintainStatusLabel i").on('click', function () {                     //...关闭查找提示
      temp_maintainStatus = 0
      $("#maintainStatusLabel").remove()
      temp_data.maintainStatus = ""
      table.reloadData('deviceTable', {                                //...只重载表格数据      
        where: {
          meterID: temp_data.meterID
          , IMEI: temp_data.IMEI
          , ICCID: temp_data.ICCID
          , maintainStatus: temp_data.maintainStatus
          , transferor: temp_data.transferor
          , meno: temp_data.meno
        }
      });
      $.ajax({
        type: "get"
        , url: '../../api/transfer_devices.php'
        , data: {
          page: 1
        }
        , success: function (res) {
          var deviceSumData = {
            deviceSum: res.deviceSum
            , in_maintainSum: res.in_maintainSum
            , serchNum: res.serchNum
          }
          var htmlTestSum = template('tpl-deviceSum', deviceSumData);
          $('#deviceSum').html(htmlTestSum);                                                //...渲染设备总数 一栏...//
        }
      })
    })
  $('#deviceSerchBt').on('click', function () {                                                        //..查询按钮
    var data = form.val('deviceSerchForm')
    if (data.meterIDserchInpt === "" && data.IMEIserchInpt === "" && data.ICCIDserchInpt === "" && data.maintainStatusSerchInpt === "" && data.transferorSerchInpt === "" && data.menoSerchInpt === "") {
      layer.alert('请填写查询信息！')
      return
    }
    else {
      form.val('deviceSerchForm', {
        "meterIDserchInpt": "",
        "IMEIserchInpt": "",
        "ICCIDserchInpt": "",
        "maintainStatusSerchInpt": "",
        "transferorSerchInpt": "",
        "menoSerchInpt": "",
      })
      if (data.meterIDserchInpt != "") {                                //...添加查找提示
        temp_data.meterID = data.meterIDserchInpt
        if (temp_meterID == 0) {
          temp_meterID = 1
          var html = '<label id="meterIDlabel" class="label label-success" style="display: inline-block; background-color: var(--green-color); color:white; height: 22px; padding-top: 5px; margin-right:10px">设备编号：' + data.meterIDserchInpt + '<i class="layui-icon layui-icon-close" style="font-size: 12px; padding-left:10px"></i></label>'
          $('#selectTips').append(html)
        }
        else {
          var html = '设备编号：' + data.meterIDserchInpt + '<i class="layui-icon layui-icon-close" style="font-size: 12px; padding-left:10px"></i>'
          $('#meterIDlabel').empty()
          $('#meterIDlabel').append(html)
        }
      }
      if (data.IMEIserchInpt != "") {
        temp_data.IMEI = data.IMEIserchInpt
        if (temp_IMEI == 0) {
          temp_IMEI = 1
          var html = '<label id="IMEIlabel" class="label label-success" style="display: inline-block; background-color: var(--green-color); color:white; height: 22px; padding-top: 5px; margin-right:10px">IMEI：' + data.IMEIserchInpt + '<i class="layui-icon layui-icon-close" style="font-size: 12px; padding-left:10px"></i></label>'
          $('#selectTips').append(html)
        }
        else {
          var html = 'IMEI: ' + data.IMEIserchInpt + '<i class="layui-icon layui-icon-close" style="font-size: 12px; padding-left:10px"></i>'
          $('#IMEIlabel').empty()
          $('#IMEIlabel').append(html)
        }
      }
      if (data.ICCIDserchInpt != "") {
        temp_data.ICCID = data.ICCIDserchInpt
        if (temp_ICCID == 0) {
          temp_ICCID = 1
          var html = '<label id="ICCIDlabel" class="label label-success" style="display: inline-block; background-color: var(--green-color); color:white; height: 22px; padding-top: 5px; margin-right:10px">ICCID：' + data.ICCIDserchInpt + '<i class="layui-icon layui-icon-close" style="font-size: 12px; padding-left:10px"></i></label>'
          $('#selectTips').append(html)
        }
        else {
          var html = 'ICCID: ' + data.ICCIDserchInpt + '<i class="layui-icon layui-icon-close" style="font-size: 12px; padding-left:10px"></i>'
          $('#ICCIDlabel').empty()
          $('#ICCIDlabel').append(html)
        }
      }
      if (data.maintainStatusSerchInpt != "") {
        temp_data.maintainStatus = data.maintainStatusSerchInpt
        if (temp_maintainStatus == 0) {
          temp_maintainStatus = 1
          var html = '<label id="maintainStatusLabel" class="label label-success" style="display: inline-block; background-color: var(--green-color); color:white; height: 22px; padding-top: 5px; margin-right:10px">转让状态：' + data.maintainStatusSerchInpt + '<i class="layui-icon layui-icon-close" style="font-size: 12px; padding-left:10px"></i></label>'
          $('#selectTips').append(html)
        }
        else {
          var html = '维修状态: ' + data.maintainStatusSerchInpt + '<i class="layui-icon layui-icon-close" style="font-size: 12px; padding-left:10px"></i>'
          $('#maintainStatusLabel').empty()
          $('#maintainStatusLabel').append(html)
        }
      }
      if (data.transferorSerchInpt != "") {
        temp_data.transferor = data.transferorSerchInpt
        if (temp_transferor == 0) {
          temp_transferor = 1
          var html = '<label id="transferorLabel" class="label label-success" style="display: inline-block; background-color: var(--green-color); color:white; height: 22px; padding-top: 5px; margin-right:10px">所属厂商：' + data.transferorSerchInpt + '<i class="layui-icon layui-icon-close" style="font-size: 12px; padding-left:10px"></i></label>'
          $('#selectTips').append(html)
        }
        else {
          var html = '所属厂商: ' + data.transferorSerchInpt + '<i class="layui-icon layui-icon-close" style="font-size: 12px; padding-left:10px"></i>'
          $('#transferorLabel').empty()
          $('#transferorLabel').append(html)
        }
      }
      if (data.menoSerchInpt != "") {
        temp_data.meno = data.menoSerchInpt
        if (temp_meno == 0) {
          temp_meno = 1
          var html = '<label id="menoLabel" class="label label-success" style="display: inline-block; background-color: var(--green-color); color:white; height: 22px; padding-top: 5px; margin-right:10px">备注：' + data.menoSerchInpt + '<i class="layui-icon layui-icon-close" style="font-size: 12px; padding-left:10px"></i></label>'
          $('#selectTips').append(html)
        }
        else {
          var html = '备注: ' + data.menoSerchInpt + '<i class="layui-icon layui-icon-close" style="font-size: 12px; padding-left:10px"></i>'
          $('#menoLabel').empty()
          $('#menoLabel').append(html)
        }
      }
    }
    $("#meterIDlabel i").off('click') //绑定之前先解除之前绑定的事件，否则每次进来都会绑定一次事件
    $("#meterIDlabel i").on('click', function () {                     //...关闭查找提示
      temp_meterID = 0
      $("#meterIDlabel").remove()
      temp_data.meterID = ""
      table.reloadData('deviceTable', {                                //...只重载表格数据      
        where: {
          meterID: temp_data.meterID
          , IMEI: temp_data.IMEI
          , ICCID: temp_data.ICCID
          , maintainStatus: temp_data.maintainStatus
          , transferor: temp_data.transferor
          , meno: temp_data.meno
        }
      });
      $.ajax({
        type: "get"
        , url: '../../api/transfer_devices.php'
        , data: {
          page: 1
        }
        , success: function (res) {
          var deviceSumData = {
            deviceSum: res.deviceSum
            , in_maintainSum: res.in_maintainSum
            , serchNum: res.serchNum
          }
          var htmlTestSum = template('tpl-deviceSum', deviceSumData);
          $('#deviceSum').html(htmlTestSum);                                                //...渲染设备总数 一栏...//
        }
      })
    })
    $("#IMEIlabel i").off('click')
    $("#IMEIlabel i").on('click', function () {                     //...关闭查找提示
      temp_IMEI = 0
      $("#IMEIlabel").remove()
      temp_data.IMEI = ""
      table.reloadData('deviceTable', {                                //...只重载表格数据      
        where: {
          meterID: temp_data.meterID
          , IMEI: temp_data.IMEI
          , ICCID: temp_data.ICCID
          , maintainStatus: temp_data.maintainStatus
          , transferor: temp_data.transferor
          , meno: temp_data.meno
        }
      });
      $.ajax({
        type: "get"
        , url: '../../api/transfer_devices.php'
        , data: {
          page: 1
        }
        , success: function (res) {
          var deviceSumData = {
            deviceSum: res.deviceSum
            , in_maintainSum: res.in_maintainSum
            , serchNum: res.serchNum
          }
          var htmlTestSum = template('tpl-deviceSum', deviceSumData);
          $('#deviceSum').html(htmlTestSum);                                                //...渲染设备总数 一栏...//
        }
      })
    })
    $("#ICCIDlabel i").off('click')
    $("#ICCIDlabel i").on('click', function () {                     //...关闭查找提示
      temp_ICCID = 0
      $("#ICCIDlabel").remove()
      temp_data.ICCID = ""
      table.reloadData('deviceTable', {                                //...只重载表格数据      
        where: {
          meterID: temp_data.meterID
          , IMEI: temp_data.IMEI
          , ICCID: temp_data.ICCID
          , maintainStatus: temp_data.maintainStatus
          , transferor: temp_data.transferor
          , meno: temp_data.meno
        }
      });
      $.ajax({
        type: "get"
        , url: '../../api/transfer_devices.php'
        , data: {
          page: 1
        }
        , success: function (res) {
          var deviceSumData = {
            deviceSum: res.deviceSum
            , in_maintainSum: res.in_maintainSum
            , serchNum: res.serchNum
          }
          var htmlTestSum = template('tpl-deviceSum', deviceSumData);
          $('#deviceSum').html(htmlTestSum);                                                //...渲染设备总数 一栏...//
        }
      })
    })
    $("#maintainStatusLabel i").off('click')
    $("#maintainStatusLabel i").on('click', function () {                     //...关闭查找提示
      temp_maintainStatus = 0
      $("#maintainStatusLabel").remove()
      temp_data.maintainStatus = ""
      table.reloadData('deviceTable', {                                //...只重载表格数据      
        where: {
          meterID: temp_data.meterID
          , IMEI: temp_data.IMEI
          , ICCID: temp_data.ICCID
          , maintainStatus: temp_data.maintainStatus
          , transferor: temp_data.transferor
          , meno: temp_data.meno
        }
      });
      $.ajax({
        type: "get"
        , url: '../../api/transfer_devices.php'
        , data: {
          page: 1
        }
        , success: function (res) {
          var deviceSumData = {
            deviceSum: res.deviceSum
            , in_maintainSum: res.in_maintainSum
            , serchNum: res.serchNum
          }
          var htmlTestSum = template('tpl-deviceSum', deviceSumData);
          $('#deviceSum').html(htmlTestSum);                                                //...渲染设备总数 一栏...//
        }
      })
    })
    $("#transferorLabel i").off('click')
    $("#transferorLabel i").on('click', function () {                     //...关闭查找提示
      temp_transferor = 0
      $("#transferorLabel").remove()
      temp_data.transferor = ""
      table.reloadData('deviceTable', {                                //...只重载表格数据      
        where: {
          meterID: temp_data.meterID
          , IMEI: temp_data.IMEI
          , ICCID: temp_data.ICCID
          , maintainStatus: temp_data.maintainStatus
          , transferor: temp_data.transferor
          , meno: temp_data.meno
        }
      });
      $.ajax({
        type: "get"
        , url: '../../api/transfer_devices.php'
        , data: {
          page: 1
        }
        , success: function (res) {
          var deviceSumData = {
            deviceSum: res.deviceSum
            , in_maintainSum: res.in_maintainSum
            , serchNum: res.serchNum
          }
          var htmlTestSum = template('tpl-deviceSum', deviceSumData);
          $('#deviceSum').html(htmlTestSum);                                                //...渲染设备总数 一栏...//
        }
      })
    })
    $("#menoLabel i").off('click')
    $("#menoLabel i").on('click', function () {                     //...关闭查找提示
      temp_meno = 0
      $("#menoLabel").remove()
      temp_data.meno = ""
      table.reloadData('deviceTable', {                                //...只重载表格数据      
        where: {
          meterID: temp_data.meterID
          , IMEI: temp_data.IMEI
          , ICCID: temp_data.ICCID
          , maintainStatus: temp_data.maintainStatus
          , transferor: temp_data.transferor
          , meno: temp_data.meno
        }
      });
      $.ajax({
        type: "get"
        , url: '../../api/transfer_devices.php'
        , data: {
          page: 1
        }
        , success: function (res) {
          var deviceSumData = {
            deviceSum: res.deviceSum
            , in_maintainSum: res.in_maintainSum
            , serchNum: res.serchNum
          }
          var htmlTestSum = template('tpl-deviceSum', deviceSumData);
          $('#deviceSum').html(htmlTestSum);                                                //...渲染设备总数 一栏...//
        }
      })
    })

    table.reloadData('deviceTable', {                                //...只重载表格数据      
      where: {
        meterID: temp_data.meterID
        , IMEI: temp_data.IMEI
        , ICCID: temp_data.ICCID
        , maintainStatus: temp_data.maintainStatus
        , transferor: temp_data.transferor
        , meno: temp_data.meno
      }
    });
    $.ajax({
      type: "get"
      , url: '../../api/transfer_devices.php'
      , data: {
        page: 1
      }
      , success: function (res) {
        var deviceSumData = {
          deviceSum: res.deviceSum
          , in_maintainSum: res.in_maintainSum
          , serchNum: res.serchNum
        }
        var htmlTestSum = template('tpl-deviceSum', deviceSumData);
        $('#deviceSum').html(htmlTestSum);                                                //...渲染设备总数 一栏...//
      }
    })
  })

  var select_data = []
  table.on('checkbox(deviceFilter)', function (obj) {                        //...复选框发生改变...//
    if (obj.type === "one") {
      if (obj.checked == true) {
        select_data.push(obj.data.meterID)
      }
      else {
        index_temp = select_data.indexOf(obj.data.meterID)
        if (index_temp != -1) {
          select_data.splice(index_temp, 1)
        }
      }
    }
    if (obj.type === "all") {
      if (obj.checked == true) {
        var all_data = layui.table.cache["deviceTable"]    //获得表格所有数据
        select_data = []
        for (var i = 0; i < all_data.length; i++) {
          select_data[i] = all_data[i].meterID
        }
      }
      else {
        select_data = []
      }
    }
    form.val('myForm', {
      "desc": select_data.join(',')   // 将获取的数组转成字符串 添加给文本框
    })
    html = "当前录入" + select_data.length + "个设备"
    $("#select_num").empty()
    $("#select_num").append(html)
  })

  $("#out_maintainBt").on('click', function () {                                    //...退出维修模式 按钮...//
    if (form.val('myForm').desc === "") {
      layer.alert('请录入设备！')
      return
    }
    arr_desc = form.val("myForm").desc.split(',')   //获取文本框中的内容并转成数组
    var error_temp = 0
    $.each(arr_desc, function (index, elem) {
      if (isNaN(Number(elem))) {
        layer.alert("录入的设备编号格式错误或可能存在非英文逗号:" + elem)
        error_temp = 1
      }
    })
    if (error_temp == 1) {
      error_temp = 0
      return;
    }
    $.ajax({
      type: 'post'
      , url: '../../api/transfer_devices.php'
      , data: {
        "status": "out_maintain"
        , arr_desc
      }
      , success: function (res) {
        layer.alert('退出维修模式成功')
        table.reloadData('deviceTable', {                                //...只重载表格数据      
        });
        $.ajax({
          type: "get"
          , url: '../../api/transfer_devices.php'
          , data: {
            page: 1
          }
          , success: function (res) {
            var deviceSumData = {
              deviceSum: res.deviceSum
              , in_maintainSum: res.in_maintainSum
              , serchNum: res.serchNum
            }
            var htmlTestSum = template('tpl-deviceSum', deviceSumData);
            $('#deviceSum').html(htmlTestSum);                                                //...渲染设备总数 一栏...//
          }
        })
      }
    })
  })

  $("#in_maintainBt").on('click', function () {                              //...进入维修模式 按钮...//
    if (form.val('myForm').desc === "") {
      layer.alert('请录入设备！')
      return
    }
    arr_desc = form.val("myForm").desc.split(',')   //获取文本框中的内容并转成数组
    var error_temp = 0
    $.each(arr_desc, function (index, elem) {
      if (isNaN(Number(elem))) {
        layer.alert("录入的设备编号格式错误或可能存在非英文逗号:" + elem)
        error_temp = 1
      }
    })
    if (error_temp == 1) {
      error_temp = 0
      return;
    }
    $.ajax({
      type: 'post'
      , url: '../../api/transfer_devices.php'
      , data: {
        "status": "in_maintain"
        , arr_desc
      }
      , success: function (res) {
        layer.alert('进入维修模式成功！')
        table.reloadData('deviceTable', {                                //...只重载表格数据      
        });
        $.ajax({
          type: "get"
          , url: '../../api/transfer_devices.php'
          , data: {
            page: 1
          }
          , success: function (res) {
            var deviceSumData = {
              deviceSum: res.deviceSum
              , in_maintainSum: res.in_maintainSum
              , serchNum: res.serchNum
            }
            var htmlTestSum = template('tpl-deviceSum', deviceSumData);
            $('#deviceSum').html(htmlTestSum);                                                //...渲染设备总数 一栏...//
          }
        })
      }
    })
  })
})
