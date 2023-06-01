var table_data = []
layui.use(['laypage', 'layer', 'table', 'form', 'laydate'], function () {
  var table = layui.table
    , laypage = layui.laypage
    , layer = layui.layer
    , form = layui.form
    , laydate = layui.laydate;
  var table_data = []
    , file = {}

  var platform = form.val('deviceSerchFilter').platformInpt
  $.ajax({                                                //...请求并渲染选择框
    type: 'get'
    , url: '../../api/platformDevicesManage.json'
    , data: {
      get: 'appName'
      ,platform: platform
    }
    , success: function (res) {
      $.each(res.appName, function (index, elem) {
        html = '<option value="' + elem + '">' + elem + '</option>'
        $("#appInptId").append(html)
      })
      form.render('select');                              //...渲染所有选择框
    }
  })

  table.render({                          //...渲染表格...//
    elem: '#testDevice'
    , url: '../../api/platformDevicesManage.json'
    , where: {
      get: 'platformDevicesManage_info'
      ,platform: '电信OC'
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
          table.reloadData('testDevice', {                                   //只重载表格数据
            where: {
              get: 'platformDevicesManage_info'
              ,platform: '电信OC'
              , page: obj.curr
              , limit: obj.limit
            }
          });
        }
      }
    }
    , parseData: function (res) { //res 即为原始返回的数据
      return {
        "code": res.code, //解析接口状态
        "msg": res.message, //解析提示文本
        "count": res.count, //解析数据长度
        "data": res.data //解析数据列表
      };
    }
    , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
    , cols: [[
      { type: 'checkbox', minWidth: 50 }
      , { field: 'id', title: '序号', type: 'numbers', minWidth: 50 }
      , { field: 'meterID', title: '设备编号', minWidth: 130, sort: true }
      , { field: 'IMEI', title: 'IMEI', minWidth: 130, sort: true }
      , { field: 'platform', title: '平台', minWidth: 150 }
      , { field: 'appName', title: '应用名称', minWidth: 130, sort: true } //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
      , {
        field: 'status', title: '状态', minWidth: 105, sort: true, templet: function (d) {
          var myHtml = ''
          if (d.status == "已删除") {
            myHtml = '<label style="background-color: rgb(206, 49, 49); border-radius: 10px; color: #fff; line-height: 20px; width: 60px; text-align: center;">' + d.status + '</label>'
          }
          else if(d.status == "已注册") {
            myHtml = '<label style="background-color: rgb(31, 138, 31); border-radius: 10px; color: #fff; line-height: 20px; width: 60px; text-align: center;">' + d.status + '</label>'
          }
          else if(d.status == "未注册") {
            myHtml = '<label style="background-color: orange; border-radius: 10px; color: #fff; line-height: 20px; width: 60px; text-align: center;">' + d.status + '</label>'
          }
          return myHtml
        }
      }
      , { field: 'meno', title: '备注', minWidth: 105, sort: true }
      , { field: 'excuteTime', title: '执行时间', minWidth: 150 }
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

  form.on('select(platform-select-filter)', function(data){
    // var elem = data.elem; // 获得 select 原始 DOM 对象
    platform = data.value; // 获得被选中的值
    // var othis = data.othis; // 获得 select 元素被替换后的 jQuery 对象
    table.reloadData('testDevice', {                                //...只重载表格数据      
      where: {
        get: 'platformDevicesManage_info'
        ,platform: platform
      }
    });

    $.ajax({                                                //...请求并渲染选择框
    type: 'get'
    , url: '../../api/platformDevicesManage.json'
    , data: {
      get: 'appName'
      ,platform: platform
    }
    , success: function (res) {
      $.each(res.appName, function (index, elem) {
        html = '<option value="' + elem + '">' + elem + '</option>'
        $("#appInptId").append(html)
      })
      form.render('select');                              //...渲染所有选择框
    }
  })
  });

  $("#exportBt").click(function () {                                       //...导出按钮...//
    var date = new Date()
    var ins1 = table.render({
      elem: '#data_export'
      , url: '../../api/platformDevicesManage.json'
      , where: {
        export: 'platformDevicesManage_info'
        ,platform: platform
      }
      , title: platform + "平台设备信息" + date.getFullYear() + date.getMonth("00") + date.getDate("00")
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
        , { field: 'meterID', title: '设备编号', minWidth: 130, sort: true }
        , { field: 'IMEI', title: 'IMEI', minWidth: 130, sort: true }
        , { field: 'platform', title: '平台', minWidth: 150 }
        , { field: 'appName', title: '应用名称', minWidth: 130, sort: true } //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
        , { field: 'status', title: '状态', minWidth: 105, sort: true }
        , { field: 'meno', title: '备注', minWidth: 105, sort: true }
        , { field: 'excuteTime', title: '执行时间', minWidth: 150 }
      ]]
      , even: true
      , done: function (res, curr, count) {
        exportData = res.data;
        table.exportFile(ins1.config.id, exportData, 'xls');
      }
    })
  })

  $('#searchBt').on('click', function () {                                    //...查询按钮...//
    var searchTemp = form.val('deviceSerchFilter')
    if (searchTemp.appInpt == "" && searchTemp.statusInpt == "") {
      layer.alert('请选择查询条件')
      return
    }
    table.reloadData('testDevice', {                                //...只重载表格数据      
      where: {
        get: 'platformDevicesManage_info'
        ,platform: platform
        , app: searchTemp.appInpt
        , status: searchTemp.statusInpt
      }
    });
  })

  var selectedIMEI = []
  table.on('checkbox(test)', function (obj) {                          //...复选框发生改变...//
    if (obj.type === "one") {
      if (obj.checked == true) {
        selectedIMEI.push(obj.data.IMEI)
      }
      else {
        index_temp = selectedIMEI.indexOf(obj.data.IMEI)
        if (index_temp != -1) {
          selectedIMEI.splice(index_temp, 1)
        }
      }
    }
    if (obj.type === "all") {
      if (obj.checked == true) {
        var all_data = table_data    //获得表格所有数据
        selectedIMEI = []
        for (var i = 0; i < all_data.length; i++) {
          selectedIMEI[i] = all_data[i].IMEI
        }
      }
      else {
        selectedIMEI = []
      }
    }
    if (selectedIMEI.length > 0) {
      $('#selectingNumSpan').html(selectedIMEI.length)

    }
  })

  $('#excuteBt').off('click')
  $('#excuteBt').on('click', function () {                  //...执行 按钮...//
    var formVal = form.val('deviceSerchFilter')
    var operationType = formVal.operationTypeInpt
    if (operationType == "") {
      layer.alert('请选择操作类型')
      return
    }
    if (selectedIMEI.length == 0) {
      layer.alert('请勾选设备')
      return
    }
    $.ajax({
      type: 'post'
      , url: '../../api/transfer_devices.php'
      , data: {
        post: 'excute_Info'
        ,platform: platform
        , operationType: operationType
        , selectedIMEI
      }
      , success: function (res) {
        layer.alert( platform + '平台' + selectedIMEI.length + '个设备'+ operationType +'成功')
      }
    })
  })
})

