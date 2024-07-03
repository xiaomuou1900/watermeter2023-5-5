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
    $.ajax({
      type: 'GET'
      , url: '../../api/meterID_test_info.php'
      , data: {
        user: "lianlifst",
        getData: "设备状态"
        , meterID: meterID
      }
      , success: function (res) {
        if (res.status == 0) {
          var htmloperateDIV = template('tpl-operateDIV', { meterID: meterID })   /// 初始化操作区的templet ///   
          deviceStatus = res.deviceStatus
          if ((deviceStatus == "正在测试") || (deviceStatus == "测试通过")) {
            table.render({                                                     //// 渲染第一个基础信息table ////
              elem: '#testDevice'
              , url: '../../api/meterID_test_info.php'
              , where: {
                user: "lianlifst",
                meterID: meterID,
                deviceStatus: deviceStatus,
                getContent: "基础信息"
              }
              , parseData: function (res) { //res 即为原始返回的数据
                if (res.status == 0) {
                  $('#operateDIV').html(htmloperateDIV)  //// 渲染操作区DIV ////
                  $('#granteeDiv').addClass('hide')
                  $('#tranferBt').addClass('hide')
                  $('#deletDeviceBt').addClass('hide')
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
                , { field: 'deviceStatus', title: '设备状态', minWidth: 100 }
                , {
                  field: 'VDD', title: '电池电压', minWidth: 105, sort: true, templet: function (d) {
                    var myHtml = ''
                    if (d.VDD < 3.3) {
                      myHtml = '<span><label style="background-color: rgb(206, 49, 49); border-radius: 10px; color: #fff; line-height: 20px; width: 60px; text-align: center;">' + d.VDD + 'V</label></span>'
                    }
                    else {
                      myHtml = '<span><label style="background-color: rgb(31, 138, 31); border-radius: 10px; color: #fff; line-height: 20px; width: 60px; text-align: center;">' + d.VDD + 'V</label></span>'
                    }
                    return myHtml
                  }
                }
                , {
                  field: 'CSQ', title: '信号强度', minWidth: 105, sort: true, templet: function (d) {
                    var myHtml = ''
                    if (d.CSQ < 10) {
                      myHtml = myHtml + '<span><label style="background-color: rgb(206, 49, 49); border-radius: 10px; color: #fff; line-height: 20px; ; width: 20px;text-align: center;">' + d.CSQ + '</label></span>'
                    }
                    else if (d.CSQ < 15) {
                      myHtml = myHtml + '<span><label style="background-color: orange; border-radius: 10px; color: #fff; line-height: 20px; ; width: 20px;text-align: center;">' + d.CSQ + '</label></span>'
                    }
                    else {
                      myHtml = myHtml + '<span><label style="background-color:  rgb(31, 138, 31); border-radius: 10px; color: #fff; line-height: 20px; ; width: 20px;text-align: center;">' + d.CSQ + '</label></span>'
                    }
                    return myHtml
                  }
                }
                , { field: 'totalFlow', title: '累计用量', minWidth: 105 } //单元格内容水平居中
                , { field: 'testFlow', title: '当前测试用量', minWidth: 130 } //单元格内容水平居右
                , { field: 'lastReportTime', title: '最近上报时间', minWidth: 160 }
                , { field: 'version', title: '版本号', minWidth: 100 }
                , {
                  field: 'testResult', title: '测试结果', minWidth: 105, templet: function (d) {
                    var myHtml = ''
                    if (d.testResult == "测试通过") {
                      myHtml = '<label style="background-color: green; border-radius: 10px; color: #fff; line-height: 20px; width: 70px; text-align: center;">' + d.testResult + '</label>'
                    }
                    else if (d.testResult == "正在测试") {
                      myHtml = '<label style="background-color: gray; border-radius: 10px; color: #fff; line-height: 20px; width: 70px; text-align: center;">' + d.testResult + '</label>'
                    }
                    else {
                      myHtml = '<label style="background-color: orange; border-radius: 10px; color: #fff; line-height: 20px; width: 70px; text-align: center;">' + d.testResult + '</label>'
                    }
                    return myHtml
                  }
                }
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
                tplHTML = template('tpl-syncReadingLayer', tpldata)

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
                          , url: '../../api/meterID_test_info.php'
                          , data: {
                            user: "lianlifst",
                            meterID: meterID
                            , operate: "restart"
                          }
                          , success: function (res) {
                            layer.alert(res.msg)
                          }
                        });
                        break;
                      case 2:
                        $.ajax({
                          type: 'post'
                          , url: '../../api/meterID_test_info.php'
                          , data: {
                            user: "lianlifst",
                            meterID: meterID
                            , operate: "restore_factory"
                          }
                          , success: function (res) {
                            layer.alert(res.msg)
                          }
                        });
                        break;
                      case 3:
                        $.ajax({
                          type: 'post'
                          , url: '../../api/meterID_test_info.php'
                          , data: {
                            user: "lianlifst",
                            meterID: meterID
                            , operate: "clean_exceptions"
                          }
                          , success: function (res) {
                            layer.alert(res.msg)
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
                form.render($('#selectDNinpt'));                              //...渲染口径选择框
                form.render($('#selectValveInpt'));                              //...渲染口径选择框
              }
            })

            table.render({                                                     //// 渲染第二个详情table ////
              elem: '#specificsTable'
              , url: '../../api/meterID_test_info.php'
              , where: {
                user: "lianlifst",
                meterID: meterID,
                getContent: "详情列表"
              }
              , parseData: function (res) { //res 即为原始返回的数据
                return {
                  "code": res.status, //解析接口状态
                  "data": res.data //解析数据列表
                };
              }
              , cols: [[
                { field: 'reportProject', title: '上报项目', minWidth: 120 } //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
                , { field: 'parameter', title: '参数值', minWidth: 105 }
                , { field: 'time', title: '日期', minWidth: 160 }
              ]]
              , even: true
            })
          }
          else if ((deviceStatus == "已入库") || (deviceStatus == "未绑定")) {
            table.render({                                                     //// 渲染第一个基础信息table ////
              elem: '#testDevice'
              , url: '../../api/meterID_test_info.php'
              , where: {
                user: "lianlifst",
                moduleName: "表号查询",
                getContent: "基础信息",
                meterID: meterID
              }
              , parseData: function (res) { //res 即为原始返回的数据
                if (res.status == 0) {
                  $('#operateDIV').html(htmloperateDIV)  /// 渲染操作区 ///
                  $.ajax({                                                //....请求 受让厂商 和 转让厂商 并渲染选择框
                    type: 'get'
                    , url: '../../api/meterID_test_info.php'
                    , data: {
                      user: "lianlifst",
                      getData: "grantee"
                    }
                    , success: function (res) {
                      $.each(res.grantee, function (index, elem) {
                        var html = '<option value="' + elem + '">' + elem + '</option>'
                        $("#granteeSelect").append(html)
                      })
                      form.render($('#granteeSelect'));                              //....渲染grante选择框
                    }
                  })
                  $('#retestBt').addClass('hide')
                  $('#forcedFailureBt').addClass('hide')
                  $('#selectDNdiv').addClass('hide')
                  $('#selectValveDiv').addClass('hide')
                  $('#memoDiv').addClass('hide')
                  $('#inboundBt').addClass('hide')
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
                , { field: 'deviceStatus', title: '设备状态', minWidth: 100 }
                , {
                  field: 'VDD', title: '电池电压', minWidth: 105, sort: true, templet: function (d) {
                    var myHtml = ''
                    if (d.VDD < 3.3) {
                      myHtml = '<span><label style="background-color: rgb(206, 49, 49); border-radius: 10px; color: #fff; line-height: 20px; width: 60px; text-align: center;">' + d.VDD + 'V</label></span>'
                    }
                    else {
                      myHtml = '<span><label style="background-color: rgb(31, 138, 31); border-radius: 10px; color: #fff; line-height: 20px; width: 60px; text-align: center;">' + d.VDD + 'V</label></span>'
                    }
                    return myHtml
                  }
                }
                , {
                  field: 'CSQ', title: '信号强度', minWidth: 105, sort: true, templet: function (d) {
                    var myHtml = ''
                    if (d.CSQ < 10) {
                      myHtml = myHtml + '<span><label style="background-color: rgb(206, 49, 49); border-radius: 10px; color: #fff; line-height: 20px; ; width: 20px;text-align: center;">' + d.CSQ + '</label></span>'
                    }
                    else if (d.CSQ < 15) {
                      myHtml = myHtml + '<span><label style="background-color: orange; border-radius: 10px; color: #fff; line-height: 20px; ; width: 20px;text-align: center;">' + d.CSQ + '</label></span>'
                    }
                    else {
                      myHtml = myHtml + '<span><label style="background-color:  rgb(31, 138, 31); border-radius: 10px; color: #fff; line-height: 20px; ; width: 20px;text-align: center;">' + d.CSQ + '</label></span>'
                    }
                    return myHtml
                  }
                }
                , { field: 'totalFlow', title: '累计用量', minWidth: 105 } //单元格内容水平居中
                , { field: 'testFlow', title: '当前测试用量', minWidth: 130 } //单元格内容水平居右
                , { field: 'lastReportTime', title: '最近上报时间', minWidth: 160 }
                , { field: 'version', title: '版本号', minWidth: 100 }
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
                tplHTML = template('tpl-syncReadingLayer', tpldata)

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
                          , url: '../../api/meterID_test_info.php'
                          , data: {
                            user: "lianlifst",
                            meterID: meterID
                            , operate: "restart"
                          }
                          , success: function (res) {
                            layer.alert(res.msg)
                          }
                        });
                        break;
                      case 2:
                        $.ajax({
                          type: 'post'
                          , url: '../../api/meterID_test_info.php'
                          , data: {
                            user: "lianlifst",
                            meterID: meterID
                            , operate: "restore_factory"
                          }
                          , success: function (res) {
                            layer.alert(res.msg)
                          }
                        });
                        break;
                      case 3:
                        $.ajax({
                          type: 'post'
                          , url: '../../api/meterID_test_info.php'
                          , data: {
                            user: "lianlifst",
                            meterID: meterID
                            , operate: "clean_exceptions"
                          }
                          , success: function (res) {
                            layer.alert(res.msg)
                          }
                        });
                        break;
                    }
                  }
                })
              }
            })
          }
          else if (deviceStatus == "已绑定") {
            table.render({                                                     //// 渲染第一个基础信息table ////
              elem: '#testDevice'
              , url: '../../api/meterID_test_info.php'
              , where: {
                user: "lianlifst",
                moduleName: "表号查询",
                getContent: "基础信息",
                meterID: meterID
              }
              , parseData: function (res) { //res 即为原始返回的数据
                if (res.status == 0) {

                  $('#operateDIV').html(htmloperateDIV)   /// 渲染操作区 ///
                  $('#retestBt').addClass('hide')
                  $('#forcedFailureBt').addClass('hide')
                  $('#inboundSpan').addClass('hide')
                  $('#deletDeviceBt').addClass('hide')
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
                , { field: 'deviceStatus', title: '设备状态', minWidth: 100 }
                , {
                  field: 'VDD', title: '电池电压', minWidth: 105, sort: true, templet: function (d) {
                    var myHtml = ''
                    if (d.VDD < 3.3) {
                      myHtml = '<span><label style="background-color: rgb(206, 49, 49); border-radius: 10px; color: #fff; line-height: 20px; width: 60px; text-align: center;">' + d.VDD + 'V</label></span>'
                    }
                    else {
                      myHtml = '<span><label style="background-color: rgb(31, 138, 31); border-radius: 10px; color: #fff; line-height: 20px; width: 60px; text-align: center;">' + d.VDD + 'V</label></span>'
                    }
                    return myHtml
                  }
                }
                , {
                  field: 'CSQ', title: '信号强度', minWidth: 105, sort: true, templet: function (d) {
                    var myHtml = ''
                    if (d.CSQ < 10) {
                      myHtml = myHtml + '<span><label style="background-color: rgb(206, 49, 49); border-radius: 10px; color: #fff; line-height: 20px; ; width: 20px;text-align: center;">' + d.CSQ + '</label></span>'
                    }
                    else if (d.CSQ < 15) {
                      myHtml = myHtml + '<span><label style="background-color: orange; border-radius: 10px; color: #fff; line-height: 20px; ; width: 20px;text-align: center;">' + d.CSQ + '</label></span>'
                    }
                    else {
                      myHtml = myHtml + '<span><label style="background-color:  rgb(31, 138, 31); border-radius: 10px; color: #fff; line-height: 20px; ; width: 20px;text-align: center;">' + d.CSQ + '</label></span>'
                    }
                    return myHtml
                  }
                }
                , { field: 'totalFlow', title: '累计用量', minWidth: 105 } //单元格内容水平居中
                , { field: 'testFlow', title: '当前测试用量', minWidth: 130 } //单元格内容水平居右
                , { field: 'lastReportTime', title: '最近上报时间', minWidth: 160 }
                , { field: 'version', title: '版本号', minWidth: 100 }
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
                tplHTML = template('tpl-syncReadingLayer', tpldata)

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
                          , url: '../../api/meterID_test_info.php'
                          , data: {
                            user: "lianlifst",
                            meterID: meterID
                            , operate: "restart"
                          }
                          , success: function (res) {
                            if (res.status == 0) {
                              layer.alert('重启成功')
                            }
                          }
                        });
                        break;
                      case 2:
                        $.ajax({
                          type: 'post'
                          , url: '../../api/meterID_test_info.php'
                          , data: {
                            user: "lianlifst",
                            meterID: meterID
                            , operate: "restore_factory"
                          }
                          , success: function (res) {
                            if (res.status == 0) {
                              layer.alert('恢复出厂成功')
                            }
                          }
                        });
                        break;
                      case 3:
                        $.ajax({
                          type: 'post'
                          , url: '../../api/meterID_test_info.php'
                          , data: {
                            user: "lianlifst",
                            meterID: meterID
                            , operate: "clean_exceptions"
                          }
                          , success: function (res) {
                            if (res.status == 0) {
                              layer.alert('清除设备异常成功')
                            }
                          }
                        });
                        break;
                    }
                  }
                })
              }
            })
          }
          else {
            layer.alert('请求设备状态失败！')
            return
          }

          $(document).off('click', '#syncReadingBt')
          $(document).on('click', '#syncReadingBt', function () {     //...表底数机电同步 按钮  （给动态添加的元素绑定事件要用原始js）
            layer.open({
              type: 1
              , title: ['请输入底数', 'font-size:15px']
              , content: tplHTML
              // , area: ['500px', '250px']
              , maxWidth: '500'
              , maxHeight: '250'
              , offset: 'auto'
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
                  , url: '../../api/meterID_test_info.php'
                  , data: {
                    user: "lianlifst"
                    ,meterID: meterID
                    ,operate: "syncReading"
                    , sync_reading: $('#syncReadingLayerInpt').val()
                  }
                  , success: function (res) {
                    layer.alert(res.msg)
                  }
                })
              }
              , btn2: function (index, layero) {
                //按钮【取消】的回调
                //return false 开启该代码可禁止点击该按钮关闭
              }
            })
          })

          $(document).off('click', '#maintainBt')
          $(document).on('click', '#maintainBt', function () {    //...进入维修模式 按钮
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
                  , url: '../../api/meterID_test_info.php'
                  , data: {
                    user: "lianlifst"
                    ,meterID: meterID
                    ,operate: "enterServiceMode"
                  }
                  , success: function (res) {
                    layer.alert(res.msg)
                  }
                })
              }
              , btn2: function (index, layero) {
                //按钮【取消】的回调
                //return false 开启该代码可禁止点击该按钮关闭
              }
            })
          })

          $(document).off('click', '#retestBt')
          $(document).on('click', '#retestBt', function () {    //...重测 按钮
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
                  , url: '../../api/meterID_test_info.php'
                  , data: {
                    user: "lianlifst"
                    ,meterID: meterID
                    ,operate: "retest" 
                  }
                  , success: function (res) {
                    layer.alert(res.msg)
                  }
                })
              }
              , btn2: function (index, layero) {
                //按钮【取消】的回调
                //return false 开启该代码可禁止点击该按钮关闭
              }
            })
          })

          $(document).off('click', '#forcedFailureBt')
          $(document).on('click', '#forcedFailureBt', function () {   //...强制失败 按钮
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
                  , url: '../../api/meterID_test_info.php'
                  , data: {
                    user: "lianlifst"
                    ,meterID: meterID
                    ,operate: "forcedFailure"
                  }
                  , success: function (res) {
                    layer.alert(res.msg)
                  }
                })
              }
              , btn2: function (index, layero) {
                //按钮【取消】的回调
                //return false 开启该代码可禁止点击该按钮关闭
              }
            })
          })

          $(document).off('click', '#deletDeviceBt')
          $(document).on('click', '#deletDeviceBt', function () {   //...删除设备 按钮
            layer.open({
              type: 1
              , title: ['确认', 'font-size:15px']
              , content: '<div style="margin-top:20px; margin-left:20px;  margin-right:100px; margin-bottom:20px; font-size:15px">确认删除设备：' + meterID + '吗？</div>'
              // , area: ['500px', '250px']
              , btn: ['确定', '取消']
              , yes: function (index, layero) {
                //按钮【确定】的回调
                layer.close(index)
                $.ajax({
                  type: 'post'
                  , url: '../../api/meterID_test_info.php'
                  , data: {
                    user: "lianlifst"
                    ,meterID: meterID
                    ,operate: "deleteDevice"
                  }
                  , success: function (res) {
                    layer.alert(res.msg)
                  }
                })
              }
              , btn2: function (index, layero) {
                //按钮【取消】的回调
                //return false 开启该代码可禁止点击该按钮关闭
              }
            })
          })

          $(document).off('click', '#inboundBt')
          $(document).on('click', '#inboundBt', function () {   //...入库 按钮
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
                , url: '../../api/meterID_test_info.php'
                , data: {
                  user: "lianlifst"
                  ,meterID: meterID
                  ,operate: "inbound"
                  ,dn: data.selectDNinpt
                  ,isValve: data.selectValveInpt
                  ,mark: data.memoInpt
                }
                , success: function (res) {
                  layer.alert(res.msg)
                }
              })
            }
          })

          $(document).off('click', '#tranferBt')
          $(document).on('click', '#tranferBt', function () {   //...转让 按钮
            var data = form.val("inboundInfo")
            if (data.granteeSelect == "") {
              $('#granteeDiv').addClass('warnBorder')
            }
            else {
              $('#granteeDiv').removeClass('warnBorder')
              $.ajax({
                type: 'post'
                , url: '../../api/meterID_test_info.php'
                , data: {
                  user: "lianlifst"
                  ,meterID:meterID
                  ,operate: "tranfer"
                  ,grantee: data.granteeSelect
                }
                , success: function (res) {
                  layer.alert(res.msg)
                }
              })
            }
          })
        }
        else {
          layer.alert('失败！')
        }
      }
    })
  })
})
