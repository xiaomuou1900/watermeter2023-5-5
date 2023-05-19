layui.use(['layer', 'table', 'dropdown', 'form'], function () {
  var table = layui.table
    , layer = layui.layer
    , dropdown = layui.dropdown
    , form = layui.form
  $('#deviceSerchBt').on('click', function () {           //...查询按钮
    var meterID = $('#meterIDserchInpt').val()
    var precision = ""
    if (meterID == null || meterID == '') {
      layer.alert('设备编号不能为空')
      return
    }
    $('#meterIDserchInpt').val('')

    table.render({                                                     //// 渲染第一个table ////
      elem: '#testDevice'
      , url: '../../api/transfer_devices.php'
      , where: {
        meterID: meterID
      }
      , parseData: function (res) { //res 即为原始返回的数据
        if (res.msg != '数据不存在！') {
          var htmloperateDIV = template('tpl-operateDIV', { meterID: meterID })      //// 渲染操作区DIV ////
          $('#operateDIV').html(htmloperateDIV)
        }
        else {
          layer.alert('没有查询到该设备！')
        }
        return {
          "code": res.status, //解析接口状态
          "data": res.data, //解析数据列表
        };
      }
      , cols: [[
        { field: 'meterID', title: '设备编号', minWidth: 120 } //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
        , { field: 'IMEI', title: 'IMEI', minWidth: 160 }
        , { field: 'ICCID', title: 'ICCID', minWidth: 200 }
        , { field: 'VDD', title: '电池电压', minWidth: 105 }
        , { field: 'SS', title: '信号强度', minWidth: 105 }
        , { field: 'totalFlow', title: '累计用量', minWidth: 105 } //单元格内容水平居中
        , { field: 'testFlow', title: '当前测试用量', minWidth: 130 } //单元格内容水平居右
        , { field: 'reportTime', title: '最近上报时间', minWidth: 160 }
        , { field: 'version', title: '版本号', minWidth: 100 }
        , { field: 'testResult', title: '测试结果', minWidth: 105 }
        , { field: 'testTime', title: '测试时间', minWidth: 160 }
      ]]
      , even: true
      , error: function (res) {
        console.log(res)
      }
      , done: function (res, curr, count) {
        //如果是异步请求数据方式，res即为你接口返回的信息。
        //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
        // console.log(res);
        //得到当前页码
        // console.log(curr); 

        //得到数据总量
        // console.log(count);

        var tpldata = {
          meterID: meterID
          , precision: res.data[0].version
        }
        var tplHTML = template('tpl-syncReadingLayer', tpldata)
        $('#syncReadingBt').on('click', function () {           //...表底数机电同步 按钮
          layer.open({
            type: 1
            , title: ['请输入底数', 'font-size:15px']
            , content: tplHTML
            // , area: ['500px', '250px']
            ,maxWidth:'500'
            ,maxHeight:'250'
            ,offset:'auto'
            , btn: ['确定', '取消']
            , yes: function (index, layero) {
              //按钮【确定】的回调
              if ($('#syncReadingLayerInpt').val() == null || $('#syncReadingLayerInpt').val() == '') {
                layer.alert('表底数不能为空')
                return
              }
              layer.close(index)
              $.ajax({
                type: 'post'
                , url: '../../api/transfer_devices.php'
                , data: {
                  "ids": "TEST-LIANLIFI-" + meterID
                  , "types": { "sync-reading": $('#syncReadingLayerInpt').val() }
                }
                , success: function (res) {

                }
              })
            }
            , btn2: function (index, layero) {
              //按钮【取消】的回调
              //return false 开启该代码可禁止点击该按钮关闭
            }
          })
        })

        $('#maintainBt').on('click', function () {           //...进入维修模式 按钮
          layer.open({
            type: 1
            , title: ['确认', 'font-size:15px']
            , content: '<div style="margin-top:20px; margin-left:20px;  margin-right:200px; margin-bottom:20px; font-size:15px">确认进入维修模式</div>'
            // , area: ['500px', '250px']
            , btn: ['确定', '取消']
            , yes: function (index, layero) {
              //按钮【确定】的回调
              layer.close(index)
              $.ajax({
                type: 'post'
                , url: '../../api/transfer_devices.php'
                , data: {
                  "ids": "TEST-LIANLIFI-" + meterID
                  , "types": { "maintain": true }
                }
                , success: function (res) {

                }
              })
            }
            , btn2: function (index, layero) {
              //按钮【取消】的回调
              //return false 开启该代码可禁止点击该按钮关闭
            }
          })
        })

        $('#retestBt').on('click', function () {           //...重测 按钮
          layer.open({
            type: 1
            , title: ['确认', 'font-size:15px']
            , content: '<div style="margin-top:20px; margin-left:20px;  margin-right:100px; margin-bottom:20px; font-size:15px">确认重新测试设备编号：' + meterID + '吗？</div>'
            // , area: ['500px', '250px']
            , btn: ['确定', '取消']
            , yes: function (index, layero) {
              //按钮【确定】的回调
              layer.close(index)
              $.ajax({
                type: 'post'
                , url: '../../api/transfer_devices.php'
                , data: {
                }
                , success: function (res) {
                  layer.alert('O了')
                }
              })
            }
            , btn2: function (index, layero) {
              //按钮【取消】的回调
              //return false 开启该代码可禁止点击该按钮关闭
            }
          })
        })

        $('#forcedFailureBt').on('click', function () {           //...强制失败 按钮
          layer.open({
            type: 1
            , title: ['确认', 'font-size:15px']
            , content: '<div style="margin-top:20px; margin-left:20px;  margin-right:100px; margin-bottom:20px; font-size:15px">确认强制失败设备编号：' + meterID + '吗？</div>'
            // , area: ['500px', '250px']
            , btn: ['确定', '取消']
            , yes: function (index, layero) {
              //按钮【确定】的回调
              layer.close(index)
              $.ajax({
                type: 'post'
                , url: '../../api/transfer_devices.php'
                , data: {
                }
                , success: function (res) {
                  layer.alert('O了')
                }
              })
            }
            , btn2: function (index, layero) {
              //按钮【取消】的回调
              //return false 开启该代码可禁止点击该按钮关闭
            }
          })
        })

        dropdown.render({           //...设备维护 下拉菜单
          elem: '#MOFEbt'
          , data: [{
            title: '重启'
            , id: 1
          }, {
            title: '恢复出厂设置'
            , id: 2
          }, {
            title: '清除设备异常'
            , id: 3
          }]
          , id: 'MOFEbt'
          , click: function (data, othis) {
            console.log(data.id)
            switch (data.id) {
              case 1:
                $.ajax({
                  type: 'post'
                  , url: '../../api/transfer_devices.php'
                  , data: {
                    "ids": "TEST-LIANLIFI-" + meterID
                    , "types": "restart"
                  }
                  , success: function (res) {
                    layer.alert('重启成功')
                  }
                });
                break;
              case 2:
                $.ajax({
                  type: 'post'
                  , url: '../../api/transfer_devices.php'
                  , data: {
                    "ids": "TEST-LIANLIFI-" + meterID
                    , "types": "restore_factory"
                  }
                  , success: function (res) {
                    layer.alert('恢复出厂成功')
                  }
                });
                break;
              case 3:
                $.ajax({
                  type: 'post'
                  , url: '../../api/transfer_devices.php'
                  , data: {
                    "ids": "TEST-LIANLIFI-" + meterID
                    , "types": "clean_exceptions"
                  }
                  , success: function (res) {
                    layer.alert('清除设备异常成功')
                  }
                });
                break;
            }
          }
        })

        var DNdata = ['DN15', 'DN20', 'DN25', 'DN32', 'DN40', 'DN50', 'DN65', 'DN80', 'DN100', 'DN125', 'DN150', 'DN200', 'DN250', 'DN300', 'DN400', 'DN500']
        $.each(DNdata, function (index, item) {
          var DNhtml = '<option value="' + item + '"> ' + item + '</option>'
          $('#selectDNinpt').append(DNhtml)
        })
        form.render('select');                              //...渲染所有选择框

        $('#inboundBt').on('click', function () {              //...入库 按钮
          var data = form.val("inboundInfo")
          if (data.selectDNinpt == "") {
            $('#selectDNdiv').addClass('warnBorder')
            $('#selectValveDiv').removeClass('warnBorder')
          }
          else if (data.selectValveInpt == "") {
            $('#selectValveDiv').addClass('warnBorder')
            $('#selectDNdiv').removeClass('warnBorder')
          }
          else {
            $('#selectDNdiv').removeClass('warnBorder')
            $('#selectValveDiv').removeClass('warnBorder')
            $.ajax({
              type: 'post'
              , url: '../../api/transfer_devices.php'
              , data: {
                "mid": meterID
                , "man": 'LIANLIFT'
                , "initial_surplus": 20
                , 'scale': 0
                , "extra": {
                  "dn": data.selectDNinpt
                  , "isValve": data.selectValveInpt
                  , "mark": data.memoInpt
                }
                , "import": true
                , success: function (res) {
                  layer.alert('入库成功！')
                }
              }
            })
          }
        })
      }
    })

    table.render({                                                     //// 渲染第二个table ////
      elem: '#specificsTable'
      , url: '../../api/transfer_devices.php'
      , where: {
        meterID: meterID
      }
      , parseData: function (res) { //res 即为原始返回的数据
        return {
          "code": res.status, //解析接口状态
          "data": res.data //解析数据列表
        };
      }
      , cols: [[
        { field: 'meterID', title: '上报项目', minWidth: 120 } //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
        , { field: 'VDD', title: '参数值', minWidth: 105 }
        , { field: 'testTime', title: '日期', minWidth: 160 }
      ]]
      , even: true
    })
  })


})
