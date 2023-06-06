$.ajax({
  type: 'get'
  , url: '../../api/readData_exception.json'
  , data: {
    page: 1
  }
  , success: function (res) {
    var testSumData = {
      readData_exceptionNum: res.readData_exceptionNum,
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

  $.ajax({                                                //...请求 受让厂商 和 转让厂商 并渲染选择框
    type: 'get'
    , url: '../../api/readData_exception.json'
    , data: {
      page: 1
    }
    , success: function (res) {
      if(res.transferor !== undefined && res.transferor.length>0) {
        $.each(res.transferor, function (index, elem) {
          var html = '<option value="' + elem + '">' + elem + '</option>'
          $("#transferor").append(html)       
      })
      }
      form.render('select');                              //...渲染所有选择框
    }
  })

  table.render({                         //...渲染正在测试界面表格...//
    elem: '#testDevice'
    , url: '../../api/readData_exception.json'
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
        "code": res.code, //解析接口状态
        "msg": res.message, //解析提示文本
        "count": res.count, //解析数据长度
        "data": res.data //解析数据列表
      };
    }
    , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
    , cols: [[
      { field: 'id', title: '序号', type: 'numbers', minWidth: 50 }
      , { field: 'meterID', title: '设备编号', minWidth: 120, sort: true } //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
      , { field: 'readData_lastTime', title: '上次读数', minWidth: 105 }
      , { field: 'readData_thisTime', title: '本次读数', minWidth: 105 }
      , { field: 'readData_exception_reportTime', title: '上报日期', minWidth: 105, sort: true }
      , { field: 'transferor', title: '所属厂商', Width: 100 }
      , { field: 'meno', title: '备注', minWidth: 105 }
      , { field: 'operate', title: '操作', maxWidth: 100, templet: '#tpl-specificsBt' }
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

  form.on('select(serchCondition_select_filter)', function(data){                 //.....选择查询条件复选框发生改变...//
    // var elem = data.elem; // 获得 select 原始 DOM 对象
    // var value = data.value; // 获得被选中的值
    // var othis = data.othis; // 获得 select 元素被替换后的 jQuery 对象 
    // layer.msg(this.innerHTML + ' 的 value: '+ value); // this 为当前选中 <option> 元素对象
    form.val('deviceSerchFilter', {
      "meterIDserchInpt": "",
      "startDate": "",
      "endDate": "",
      "transferorSerchInpt": "",
      "menoSerchInpt": ""
    })
    $('#meterIDserchDiv_id').addClass('hide')
    $('#dateDiv_id').addClass('hide')
    $('#transferorDiv_id').addClass('hide')  
    $('#menoDiv_id').addClass('hide')
    if(data.value == "设备编号") {
      $('#meterIDserchDiv_id').removeClass('hide')
    } else if(data.value == "日期范围") {
      $('#dateDiv_id').removeClass('hide')
    } else if(data.value == "所属厂商") {
      $('#transferorDiv_id').removeClass('hide')
    } else if(data.value == "备注") {
      $('#menoDiv_id').removeClass('hide')
    } 
  });

  $("#exportBt").click(function () {                                       //...导出按钮...//
    var ins1 = table.render({
      elem: '#data_export'
      , url: '../../api/readData_exception.json'
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
        { field: 'id', title: '序号', type: 'numbers', minWidth: 50 }
        , { field: 'meterID', title: '设备编号', minWidth: 120, sort: true } //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
        , { field: 'readData_lastTime', title: '上次读数', minWidth: 105 }
        , { field: 'readData_thisTime', title: '本次读数', minWidth: 105 }
        , { field: 'readData_exception_reportTime', title: '上报日期', minWidth: 105, sort: true }
        , { field: 'transferor', title: '所属厂商', Width: 100 }
        , { field: 'meno', title: '备注', minWidth: 105 }
        , { field: 'operate', title: '操作', maxWidth: 100, templet: '#tpl-specificsBt' }
      ]]
      , even: true
      , done: function (res, curr, count) {
        exportData = res.data;
        table.exportFile(ins1.config.id, exportData, 'xls');
      }
    })
  })

  table.on('tool(test)', function (obj) {                                   //...单元格工具事件（单击测试详情触发）...//
    var data = obj.data;
    if (obj.event == 'specifics') {
      layer.open({
        type: 2,
        area: ['100%', '100%'],
        title: ['设备详情', 'font-size:25px; background-color: var(--grey-color); padding-left: 10px'],
        content: '../../view/testing/deviceSpecifics.html?meterID=' + data.meterID // URL
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
    , temp_transferor = 0
    , temp_meno = 0
    , temp_startDate = 0
    , temp_data = {}
  $('#deviceSerchBt').on('click', function () {                                           //...查询按钮...//
    var data = form.val('deviceSerchFilter')
    if (data.meterIDserchInpt === "" && (data.startDate === "" || data.endDate === "") && data.transferorSerchInpt === "" && data.menoSerchInpt === "") {
      layer.alert('请填写查询信息！')
      return
    }
    else {
      form.val('deviceSerchFilter', {
        "meterIDserchInpt": "",
        "startDate": "",
        "endDate": "",
        "transferorSerchInpt": "",
        "menoSerchInpt": ""
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
    table.reloadData('testDevice', {                                   //只重载表格数据
      where: {
        meterID: temp_data.meterID
        , startDate: temp_data.startDate
        , endDate: temp_data.endDate
        , transferor: temp_data.transferor
        , meno: temp_data.meno
      }
    });
    $.ajax({
      type: 'get'
      , url: '../../api/readData_exception.json'
      , data: {
        page: 1
      }
      , success: function (res) {
        var testSumData = {
          readData_exceptionNum: res.readData_exceptionNum,
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
          , startDate: temp_data.startDate
          , endDate: temp_data.endDate
          , transferor: temp_data.transferor
          , meno: temp_data.meno
        }
      });
      $.ajax({
        type: 'get'
        , url: '../../api/readData_exception.json'
        , data: {
          page: 1
        }
        , success: function (res) {
          var testSumData = {
            readData_exceptionNum: res.readData_exceptionNum,
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
          , startDate: temp_data.startDate
          , endDate: temp_data.endDate
          , transferor: temp_data.transferor
          , meno: temp_data.meno
        }
      });
      $.ajax({
        type: 'get'
        , url: '../../api/readData_exception.json'
        , data: {
          page: 1
        }
        , success: function (res) {
          var testSumData = {
            readData_exceptionNum: res.readData_exceptionNum,
            serchNum: res.serchNum,
          };
          var htmlTestSum = template('tpl-testSum', testSumData);
          $('#testSum').html(htmlTestSum);                                   //...渲染测试总数...//
        }
      })
    })
    $("#transferorLabel i").off('click')
    $("#transferorLabel i").on('click', function () {                     //...关闭查找提示
      temp_transferor = 0
      $("#transferorLabel").remove()
      temp_data.transferor = ""
      table.reloadData('testDevice', {                                //...只重载表格数据      
        where: {
          meterID: temp_data.meterID
          , startDate: temp_data.startDate
          , endDate: temp_data.endDate
          , transferor: temp_data.transferor
          , meno: temp_data.meno
        }
      });
      $.ajax({
        type: "get"
        , url: '../../api/readData_exception.json'
        , data: {
          page: 1
        }
        , success: function (res) {
          var deviceSumData = {
            readData_exceptionNum: res.readData_exceptionNum,
            serchNum: res.serchNum,
          }
          var htmlTestSum = template('tpl-testSum', deviceSumData);
          $('#deviceSum').html(htmlTestSum);                                                //...渲染设备总数 一栏...//
        }
      })
    })
    $("#menoLabel i").off('click')
    $("#menoLabel i").on('click', function () {                     //...关闭查找提示
      temp_meno = 0
      $("#menoLabel").remove()
      temp_data.meno = ""
      table.reloadData('testDevice', {                                //...只重载表格数据      
        where: {
          meterID: temp_data.meterID
          , startDate: temp_data.startDate
          , endDate: temp_data.endDate
          , transferor: temp_data.transferor
          , meno: temp_data.meno
        }
      });
      $.ajax({
        type: "get"
        , url: '../../api/readData_exception.json'
        , data: {
          page: 1
        }
        , success: function (res) {
          var deviceSumData = {
            readData_exceptionNum: res.readData_exceptionNum,
            serchNum: res.serchNum,
          }
          var htmlTestSum = template('tpl-testSum', deviceSumData);
          $('#deviceSum').html(htmlTestSum);                                                //...渲染设备总数 一栏...//
        }
      })
    })
  })
})

