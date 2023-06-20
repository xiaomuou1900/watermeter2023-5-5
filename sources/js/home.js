
layui.use(['laypage', 'layer', 'table', 'form','element'], function () {
  var table = layui.table
    , laypage = layui.laypage
    , layer = layui.layer
    , form = layui.form
    , element = layui.element;

  $.ajax({
    type: 'get'
    , url: '../../api/home.json'
    , data: {
      get:'homePageFourCount'
    }
    , success: function (res) {
      if(res.code == 0) {
        $('#meterCount_id #value1').html(res.meterTotalCount)
        $('#meterCount_id #value2').html(res.meterUsedCount)
        $('#meterCount_id #value3').html(res.zeroFlowUserCount)
        $('#meterCount_id #value4').html(res.arrearsUserCount)
      } else {
        $('#meterCount_id #value1').html('<div style="font-size:14px; color:yellow">加载失败</div>')
        $('#meterCount_id #value2').html('<div style="font-size:14px; color:yellow">加载失败</div>')
        $('#meterCount_id #value3').html('<div style="font-size:14px; color:yellow">加载失败</div>')
        $('#meterCount_id #value4').html('<div style="font-size:14px; color:yellow">加载失败</div>')
      }
    }
  })

  $.ajax({
    type: 'get'
    , url: '../../api/home.json'
    , data: {
      get:'deviceStatusAlarmCount'
    }
    , success: function (res) {
      if(res.code == 0) {
        $('#deviceStatusAlarm .label-danger').html(res.deviceStatusAlarmCount)
      } else {
        layer.alert('获取设备状态报警数量失败')
      }
    }
  })
  $('#deviceStatusAlarm button').on('click', function() {        //...设备状态报警 按钮...//
    $('#deviceStatusAlarm #tableDiv').toggleClass('hide')
    $.ajax({
      type: 'get'
      , url: '../../api/home.json'
      , data: {
        get:'deviceStatusAlarmCount'
      }
      , success: function (res) {
        if(res.code == 0) {
          $('#deviceStatusAlarm .label-danger').html(res.deviceStatusAlarmCount)
        } else {
          layer.alert('获取设备状态报警数量失败')
        }
      }
    })
    if($('#deviceStatusAlarm button').html() == '+') {
      $('#deviceStatusAlarm button').html("<span style='font-size:35px'>-</span>")
      table.render({             //...渲染设备状态报警表格...//
        elem: '#deviceStatusAlarm_table'
        , url: '../../api/home.json'
        , page: {
          limit: 25
          , limits: [10, 15, 20, 25, 30, 35, 40, 45, 50]
          , layout: ['prev', 'page', 'next', 'count', 'limit', 'skip']
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
                  ,get: "data_deviceStatusAlarm"
                }
              });
            }
          }
        }
        , where:{
          get: "data_deviceStatusAlarm"
        }
        , parseData: function (res) { //res 即为原始返回的数据
          return {
            "code": res.code, //解析接口状态
            "msg": res.message, //解析提示文本
            "count": res.count, //解析数据长度
            "data": res.data_deviceStatusAlarm //解析数据列表
          };
        }
        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        , cols: [[
           { field: 'meterID', title: '设备编号', minWidth: 120 } //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
          , { field: 'abnormalStatus', title: '异常状态', minWidth: 160}
        ]]
        , even: true
        , done: function (res, curr, count) {                                 //表格渲染完后触发该函数
          //如果是异步请求数据方式，res即为你接口返回的信息。
          //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
          // console.log(res);
    
          //得到当前页码
          // console.log(curr); 
        }
      });
    } else {
      $('#deviceStatusAlarm button').html("+")
    }
  })

  $.ajax({
    type: 'get'
    , url: '../../api/home.json'
    , data: {
      get:'userStatusAlarmCount'
    }
    , success: function (res) {
      if(res.code == 0) {
        $('#userStatusAlarm .label-danger').html(res.userStatusAlarmCount)
      } else {
        layer.alert('获取设备状态报警数量失败')
      }
    }
  })
  $('#userStatusAlarm button').on('click', function() {        //...用户状态报警 按钮...//
    $('#userStatusAlarm #tableDiv').toggleClass('hide')
    $.ajax({
      type: 'get'
      , url: '../../api/home.json'
      , data: {
        get:'userStatusAlarmCount'
      }
      , success: function (res) {
        if(res.code == 0) {
          $('#userStatusAlarm .label-danger').html(res.userStatusAlarmCount)
          $('#afterPayUser_span').html(res.aferPayUserAlarmCount)
          $('#beforePayUser_span').html(res.beforPayUserAlarmCount)
        } else {
          layer.alert('获取用户状态报警数量失败')
        }
      }
    })
    if($('#userStatusAlarm button').html() == '+') {
      $('#userStatusAlarm button').html("<span style='font-size:35px'>-</span>")
      table.render({             //...渲染后付费用户表格...//
        elem: '#afterPayUserStatusAlarm_table'
        , url: '../../api/home.json'
        , page: {
          limit: 25
          , limits: [10, 15, 20, 25, 30, 35, 40, 45, 50]
          , layout: ['prev', 'page', 'next', 'count', 'limit', 'skip']
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
                  ,get: "data_afterPayUserStatusAlarm"
                }
              });
            }
          }
        }
        , where:{
          get: "data_afterPayUserStatusAlarm"
        }
        , parseData: function (res) { //res 即为原始返回的数据
          return {
            "code": res.code, //解析接口状态
            "msg": res.message, //解析提示文本
            "count": res.count, //解析数据长度
            "data": res.data_afterPayUserStatusAlarm //解析数据列表
          };
        }
        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        , cols: [[
           { field: 'userID', title: '用户编号', minWidth: 120 } //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
          , { field: 'userName', title: '用户名', minWidth: 160}
          , { field: 'arrearage', title: '欠费金额（元）', minWidth: 160}
        ]]
        , even: true
        , done: function (res, curr, count) {                                 //表格渲染完后触发该函数
          //如果是异步请求数据方式，res即为你接口返回的信息。
          //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
          // console.log(res);
    
          //得到当前页码
          // console.log(curr); 
        }
      });
      table.render({             //...渲染预付费用户表格...//
        elem: '#beforePayUserStatusAlarm_table'
        , url: '../../api/home.json'
        , page: {
          limit: 25
          , limits: [10, 15, 20, 25, 30, 35, 40, 45, 50]
          , layout: ['prev', 'page', 'next', 'count', 'limit', 'skip']
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
                  ,get: "data_beforePayUserStatusAlarm"
                }
              });
            }
          }
        }
        , where:{
          get: "data_beforePayUserStatusAlarm"
        }
        , parseData: function (res) { //res 即为原始返回的数据
          return {
            "code": res.code, //解析接口状态
            "msg": res.message, //解析提示文本
            "count": res.count, //解析数据长度
            "data": res.data_beforePayUserStatusAlarm //解析数据列表
          };
        }
        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        , cols: [[
           { field: 'userID', title: '用户编号', minWidth: 120 } //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
          , { field: 'userName', title: '用户名', minWidth: 160}
          , { field: 'arrearage', title: '欠费金额（元）', minWidth: 160}
        ]]
        , even: true
        , done: function (res, curr, count) {                                 //表格渲染完后触发该函数
          //如果是异步请求数据方式，res即为你接口返回的信息。
          //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
          // console.log(res);
    
          //得到当前页码
          // console.log(curr); 
        }
      });
      element.on('tab(test-handle)', function(data){           //...单击tab选项...//
        // console.log(this); // 当前 tab 标题所在的原始 DOM 元素
        // console.log(data.index); // 得到当前 tab 项的所在下标
        // console.log(data.elem); // 得到当前的 tab 容器
        $.ajax({
          type: 'get'
          , url: '../../api/home.json'
          , data: {
            get:'userStatusAlarmCount'
          }
          , success: function (res) {
            if(res.code == 0) {
              $('#userStatusAlarm .label-danger').html(res.userStatusAlarmCount)
              $('#afterPayUser_span').html(res.aferPayUserAlarmCount)
              $('#beforePayUser_span').html(res.beforPayUserAlarmCount)
            } else {
              layer.alert('获取用户状态报警数量失败')
            }
          }
        })
        if(data.index == 0) {
          table.reloadData('afterPayUserStatusAlarm_table',{
          where: {
            get:'data_afterPayUserStatusAlarm'
          }
          })
        } else if(data.index == 1) {
          table.reloadData('beforePayUserStatusAlarm_table',{
            where: {
              get:'data_beforePayUserStatusAlarm'
            }
          })
        }
      });
    } else {
      $('#userStatusAlarm button').html("+")
    }
  })

  $('#beforePayUserSearch #button_show').on('click', function() {        //...预付费用户余额筛选 显示隐藏按钮...//
    $('#beforePayUserSearch #tableDiv').toggleClass('hide')
    if($('#beforePayUserSearch #button_show').html() == '+') {
      $('#beforePayUserSearch #button_show').html("<span style='font-size:35px'>-</span>")
      $('#balance_input').val("")
      table.render({             //...预付费用户余额筛选表格...//
        elem: '#beforePayUserSearch_table'
        , url: '../../api/home.json'
        , page: {
          limit: 25
          , limits: [10, 15, 20, 25, 30, 35, 40, 45, 50]
          , layout: ['prev', 'page', 'next', 'count', 'limit', 'skip']
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
                  ,get: "data_beforePayUserSearch"
                }
              });
            }
          }
        }
        , where:{
          get: "data_beforePayUserSearch"
        }
        , parseData: function (res) { //res 即为原始返回的数据
          return {
            "code": res.code, //解析接口状态
            "msg": res.message, //解析提示文本
            "count": res.count, //解析数据长度
            "data": res.data_beforePayUserSearch //解析数据列表
          };
        }
        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        , cols: [[
          {field:'id', title:'序号', type:'numbers', minWidth:50}
          , { field: 'userID', title: '用户编号', minWidth: 120 } //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
          , { field: 'userName', title: '用户姓名', minWidth: 120}
          , { field: 'meterID', title: '设备编号', minWidth: 160}
          , { field: 'balance', title: '余额', minWidth: 120}
          , { field: 'userAddress', title: '用户地址', minWidth: 160}
        ]]
        , even: true
        , done: function (res, curr, count) {                                 //表格渲染完后触发该函数
          //如果是异步请求数据方式，res即为你接口返回的信息。
          //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
          // console.log(res);
    
          //得到当前页码
          // console.log(curr); 
        }
      });
    } else {
      $('#beforePayUserSearch #button_show').html("+")
    }
  })

  $('#button_search').on('click', function() {    //...预付费用户余额筛选 筛选按钮...//
    if($('#balance_input').val() == "") {
      table.reloadData('beforePayUserSearch_table',{ 
        where: {
           get:'data_beforePayUserSearch'
         }
      })  
    } else {
      table.reloadData('beforePayUserSearch_table',{ 
       where: {
          get:'data_beforePayUserSearch'
          ,balance_NotMoreThan: $('#balance_input').val()
        }
      })
    }
  })


  table.render({             //...渲染抄表状态表格
    elem: '#readMeterStatus_table'
    , url: '../../api/home.json'
    ,where:{
      get:"data_readMeterStatus"
    }
    , parseData: function (res) { //res 即为原始返回的数据
      return {
        "code": res.code, //解析接口状态
        "msg": res.message, //解析提示文本
        "count": res.count, //解析数据长度
        "data": res.data_readMeterStatus //解析数据列表
      };
    }
    , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
    , cols: [[
       { field: 'thisReadMeterTime', title: '本次抄表日期', minWidth: 120 } //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
      , { field: 'readSuccessMeterNum', title: '本次抄表进度（抄回表数/已在线表总数）', minWidth: 160}
      , { field: 'nextReadMeterTime', title: '下次抄表日期', minWidth: 200 }
    ]]
    , even: true
    , done: function (res, curr, count) {                                 //表格渲染完后触发该函数
      //如果是异步请求数据方式，res即为你接口返回的信息。
      //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
      // console.log(res);

      //得到当前页码
      // console.log(curr); 
    }
  });

})