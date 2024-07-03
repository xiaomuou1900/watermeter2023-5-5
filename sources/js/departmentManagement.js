var data_id = "0"     // 地区编号
var table_data = []
layui.use(['layer', 'table', 'form', 'dtree'], function () {
  var table = layui.table
    , layer = layui.layer
    , form = layui.form
    , dtree = layui.dtree
  var table_data = []


  dtree.render({                 //...渲染片区列表...//
      elem: "#demoTree",
      initLevel: "1",
      method: 'get',
      url: "../../api/dtree_companyName.json"
  });
  
  table.render({                         //...渲染表格...//
    elem: '#testDevice'
    , url: '../../api/departmentManagement.php'
    , where: {
      data_id:"0"
    }
    , parseData: function (res) { //res 即为原始返回的数据
      return {
        "code": res.status, //解析接口状态
        "msg": res.msg, //解析提示文本
        "count": res.count, //解析数据长度
        "data": res.data //解析数据列表
      };
    }
    , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
    , cols: [[
      { field: 'id', title: '序号', type: 'numbers', minWidth: 50 }
      , { field: 'departmentName', title: '部门名称', minWidth: 120} //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
      , { field: 'departmentNumber', title: '部门编号', minWidth: 160}
      , { field: 'meno', title: '备注', minWidth: 200}
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

  $("#demoTree").on("click",".dtree-nav-div",function(e) {                //...单击片区列表。。。//
    // console.log(1) 
    // console.log(e.target)  //e.target点击谁 返回谁
    // console.log(this)
    departmentName = ""
    departmentNumber = ""
    meno = ""
    companyName = e.target.innerText
    data_id = e.target.getAttribute('data-id');
    document.getElementById("companySpanId").innerHTML = companyName;
    table.reloadData('testDevice', {                                   //只重载表格数据
      where: {
        data_id: data_id
        ,requestData: "allDepartment"
      }
    })    
  })

  $('#SerchBt').on('click', function () {         //...查询 按钮...//
    if(data_id === "0") {
      layer.alert('未选择公司！')
      return
    }
    var serch_data = form.val('deviceSerchFilter')
    if (serch_data.serchInpt === "") {
      table.reloadData('testDevice', {
        where: {
          data_id: data_id
          ,requestData: "allDepartment"
        }
      })
    }
    else {
      table.reloadData('testDevice', {
        where: {
          data_id: data_id
          ,requestData: serch_data.serchInpt
        }
      })
    }
  })

  $('#newlyAddedBt').on('click', function () {    //...新增 按钮...//
    if(data_id === "0") {
      layer.alert('未选择公司！')
      return
    }
    layer.open({
      type: 1
      , id: "newlyAddeLayerId"
      , title: ['添加部门', 'font-size:15px']
      , content: template('tpl-newlyAdded', {})
      // , area: ['500px', '250px']
      // ,area:'auto'
      // ,maxWidth:'500'
      // ,maxHeight:'250'
      , offset: 'auto'
      , btn: ['确定', '取消']
      , yes: function (index, layero) {
        //按钮【确定】的回调
        if ($('#newNameInptId').val() == null || $('#newNameInptId').val() == '') {
          layer.alert('部门名称、部门编号 不能为空！')
          return
        }
        if ($('#newNumberInptId').val() == null || $('#newNumberInptId').val() == '') {
          layer.alert('部门名称、部门编号 不能为空！')
          return
        }
        layer.close(index)
        $.ajax({
          type: 'post'
          , url: '../../api/transfer_devices.php'
          , data: {
            data_id: data_id
            ,addDepartmentNanme: $('#newNameInptId').val()
            ,addDepartmentNumber: $('#newNumberInptId').val()
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

  departmentName = ""
  departmentNumber = ""
  meno = ""
  // 表格行单击事件
  table.on('row(test)', function (obj) {
    var data = obj.data; // 得到当前行数据
    var dataCache = obj.dataCache; // 得到当前行缓存数据，包含特定字段 --- 2.8.8+
    var index = obj.index; // 得到当前行索引
    var tr = obj.tr; // 得到当前行 <tr> 元素的 jQuery 对象
    var options = obj.config; // 获取当前表格基础属性配置项
    departmentName = data.departmentName
    departmentNumber = data.departmentNumber
    meno = data.meno
    $(".layui-table-body .layui-table tr").attr({ "style": "background:#FFF" });    //其它tr恢复原样（必须在前）
    $(obj.tr.selector).attr({ "style": "background:#b8e1dd" });    //改变当前tr颜色（必须在后）
  });

  $('#editBt').on('click', function () {     //...编辑 按钮...//
    if (departmentName == "") {
      layer.alert('您没有选中任何部门，请选中后再操作！')
    }
    else {
      layer.open({
        type: 1
        , id: "editLayerId"
        , title: ['编辑部门', 'font-size:15px']
        , content: template('tpl-edit', { departmentName: departmentName, departmentNumber:departmentNumber, meno: meno })
        // , area: ['500px', '250px']
        // ,area:'auto'
        // ,maxWidth:'500'
        // ,maxHeight:'250'
        , offset: 'auto'
        , btn: ['确定', '取消']
        , yes: function (index, layero) {
          //按钮【确定】的回调
          if ($('#editNameInptId').val() == null || $('#editNameInptId').val() == '' || $('#editNumberInptId').val() == null || $('#editNumberInptId').val() == '') {
            layer.alert('部门名称、部门编号 不能为空！')
            return
          }
          layer.close(index)
          $.ajax({
            type: 'post'
            , url: '../../api/companyManagement.php'
            , data: {
              data_id:data_id
              ,originalDepartmentName: departmentName
              , originalDepartmentNumber: departmentNumber
              , originalMeno: meno
              , newdepartmentName: $('#editNameInptId').val()
              , newdepartmentNumber: $('#editNumberInptId').val()
              , newMeno: $('#editMenoInptId').val()
            }
            , success: function (res) {
              // if(res.status=="0") {     //如果post成功要重新加载表格
              // table.reloadData('testDevice', {
              //   where: {
              //      data_id:data_id
              //     ,requestData: "all"
              //   }
              // })
              // }
              // else {
              //   layer.alert('编辑部门失败！')
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
    if (departmentName == "") {
      layer.alert('您没有选中任何部门，请选中后再操作！')
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
            , url: '../../api/departmentManagement.php'
            , data: {
              data_id:data_id
              ,deletedepartmentName: departmentName
            }
            , success: function (res) {
              if (res.status == "0") {
                table.reloadData('testDevice', {
                  where: {
                    // requestData: "allCompany"
                    data_id: data_id
                    ,deletedepartmentName: departmentName
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