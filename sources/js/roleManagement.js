var table_data = []
layui.use(['laypage', 'layer', 'table', 'form'], function () {
  var table = layui.table
    , laypage = layui.laypage
    , layer = layui.layer
    , form = layui.form;

  table.render({       //渲染正在测试界面表格
    elem: '#testDevice'
    , url: '../../api/companyManagement.php'
    , where: {
      requestData: "allCompany"
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
      { field: 'id', title: '序号', type: 'numbers', minWidth: 50 }
      , { field: 'companyName', title: '公司名称', minWidth: 120 } //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
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
      table_data = res.data
    }
  });

  $('#SerchBt').on('click', function () {         //...查询 按钮...//
    var serch_data = form.val('deviceSerchFilter')
    if (serch_data.serchInpt === "") {
      table.reloadData('testDevice', {
        where: {
          requestData: "allCompany"
        }
      })
    }
    else {
      table.reloadData('testDevice', {
        where: {
          requestData: serch_data.serchInpt
        }
      })
    }
  })

  $('#newlyAddedBt').on('click', function () {    //...新增 按钮...//
    layer.open({
      type: 1
      , id: "newlyAddeLayerId"
      , title: ['添加公司', 'font-size:15px']
      , content: template('tpl-newlyAdded', {})
      // , area: ['500px', '250px']
      // ,area:'auto'
      // ,maxWidth:'500'
      // ,maxHeight:'250'
      , offset: 'auto'
      , btn: ['确定', '取消']
      , yes: function (index, layero) {
        //按钮【确定】的回调
        if ($('#newCompanyNameInptId').val() == null || $('#newCompanyNameInptId').val() == '') {
          layer.alert('公司名称不能为空')
          return
        }
        layer.close(index)
        $.ajax({
          type: 'post'
          , url: '../../api/transfer_devices.php'
          , data: {
            addCompanyNanme: $('#newCompanyNameInptId').val()
            , addMeno: $('#newMenoInptId').val()
          }
          , success: function (res) {
              // if(res.status=="0") {     //如果post成功要重新加载表格
              // table.reloadData('testDevice', {
              //   where: {
              //     requestData: "allCompany"
              //   }
              // })
              // }
              // else {
              //   layer.alert('新增公司失败！')
              // }
          }
        })
      }
      , btn2: function (index, layero) {
        //按钮【取消】的回调
        //return false 开启该代码可禁止点击该按钮关闭
      }
    })
  })

  var companyName = ""
  var meno = ""
  // 行单击事件
  table.on('row(test)', function (obj) {
    var data = obj.data; // 得到当前行数据
    var dataCache = obj.dataCache; // 得到当前行缓存数据，包含特定字段 --- 2.8.8+
    var index = obj.index; // 得到当前行索引
    var tr = obj.tr; // 得到当前行 <tr> 元素的 jQuery 对象
    var options = obj.config; // 获取当前表格基础属性配置项
    // console.log(data.companyName); // 查看对象所有成员
    companyName = data.companyName
    meno = data.meno
    $(".layui-table-body .layui-table tr").attr({ "style": "background:#FFF" });    //其它tr恢复原样（必须在前）
    $(obj.tr.selector).attr({ "style": "background:#b8e1dd" });    //改变当前tr颜色（必须在后）
  });

  $('#editBt').on('click', function () {     //...编辑 按钮...//
    if (companyName == "") {
      layer.alert('您没有选中任何公司，请选中后再操作！')
    }
    else {
      layer.open({
        type: 1
        , id: "editLayerId"
        , title: ['编辑公司', 'font-size:15px']
        , content: template('tpl-edit', { companyName: companyName, meno: meno })
        // , area: ['500px', '250px']
        // ,area:'auto'
        // ,maxWidth:'500'
        // ,maxHeight:'250'
        , offset: 'auto'
        , btn: ['确定', '取消']
        , yes: function (index, layero) {
          //按钮【确定】的回调
          if ($('#editCompanyNameInptId').val() == null || $('#editCompanyNameInptId').val() == '') {
            layer.alert('公司名称不能为空')
            return
          }
          layer.close(index)
          $.ajax({
            type: 'post'
            , url: '../../api/companyManagement.php'
            , data: {
              originalCompanyName: companyName
              , originalMeno: meno
              , newCompanyName: $('#editCompanyNameInptId').val()
              , newMeno: $('#editMenoInptId').val()
            }
            , success: function (res) {
              // if(res.status=="0") {     //如果post成功要重新加载表格
              // table.reloadData('testDevice', {
              //   where: {
              //     requestData: "allCompany"
              //   }
              // })
              // }
              // else {
              //   layer.alert('编辑公司失败！')
              // }
            }
          })
        }
        , btn2: function (index, layero) {
          //按钮【取消】的回调
          //return false 开启该代码可禁止点击该按钮关闭
        }
      })
    }
  })

  $('#deleteBt').on('click', function () {     //...删除 按钮...//
    if (companyName == "") {
      layer.alert('您没有选中任何公司，请选中后再操作！')
    }
    else {
      layer.open({
        type: 1
        , title: ['提示', 'font-size:15px']
        , content: template('tpl-delete', {})
        , area: ['300px', '170px']
        // ,area:'auto'
        // ,maxWidth:'500'
        // ,maxHeight:'250'
        , offset: 'auto'
        , btn: ['确定', '取消']
        , yes: function (index, layero) {
          //按钮【确定】的回调
          layer.close(index)
          $.ajax({
            type: 'post'
            , url: '../../api/companyManagement.php'
            , data: {
              deleteCompanyName: companyName
            }
            , success: function (res) {
              if (res.status == "0") {
                table.reloadData('testDevice', {
                  where: {
                    // requestData: "allCompany"
                    deleteCompanyName: companyName
                  }
                })
              }
            }
          })
        }
        , btn2: function (index, layero) {
          //按钮【取消】的回调
          //return false 开启该代码可禁止点击该按钮关闭
        }
      })
    }
  })
})