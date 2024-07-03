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
    , url: '../../api/userManagement.php'
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
      , { field: 'account', title: '账户', minWidth: 120} //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
      , { field: 'name', title: '姓名', minWidth: 160}
      , { field: 'department', title: '部门', minWidth: 200}
      , { field: 'role', title: '角色', minWidth: 200}
      , { field: 'phoneNumber', title: '手机', minWidth: 200}
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
    account = ""
    departmentName = ""
    departmentNumber = ""
    companyName = e.target.innerText
    data_id = e.target.getAttribute('data-id');
    document.getElementById("companySpanId").innerHTML = companyName;
    table.reloadData('testDevice', {                                   //只重载表格数据
      where: {
        data_id: data_id
        ,requestData: "all"
      }
    })  
    
    $.ajax({                                                //....请求 部门名称 并渲染选择框
      type: 'get'
      , url: '../../api/departmentManagement.php'
      , data: {
        data_id: data_id,
        requestData: "allDepartment"
      }
      , success: function (res) {
        $("#department_selcet_id").empty()
        var html = '<option value="">请选择部门</option>'
        $("#department_selcet_id").append(html)
        $.each(res.data, function (index, elem) {
          html = '<option value="' + elem.departmentName + '">' + elem.departmentName + '</option>'
          $("#department_selcet_id").append(html)
        })
        form.render('select');                              //....渲染所有选择框
      }
    })
  })


  $('#SerchBt').on('click', function () {         //...查询 按钮...//
    if(data_id === "0") {
      layer.alert('未选择公司！')
      return
    }
    var serch_data = form.val('deviceSerchFilter')
    if (serch_data.department_selcet === "" && serch_data.serchInpt === "") {
      table.reloadData('testDevice', {
        where: {
          data_id: data_id
          ,requestData: "all"
        }
      })
    }
    else {
      table.reloadData('testDevice', {
        where: {
          operate:"查询"
          ,data_id: data_id
          ,department: serch_data.department_selcet
          ,accountOrName: serch_data.serchInpt
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
      , title: ['添加账号', 'font-size:15px']
      , content: template('tpl-newlyAdded', {})
      // , area: ['500px', '250px']
      // ,area:'auto'
      // ,maxWidth:'500'
      // ,maxHeight:'250'
      , offset: 'auto'
      , btn: ['确定', '取消']
      , yes: function (index, layero) {
        //按钮【确定】的回调
        var form_data = form.val('add_layer_filter')
        if (form_data.account == "" || form_data.password == "" || form_data.userName == "" || form_data.role == "") {
          layer.alert('账户、密码、姓名、角色 不能为空！')
          return
        }
        layer.close(index)
        $.ajax({
          type: 'post'
          , url: '../../api/userManagement.php'
          , data: {
            operate:"添加账号"
            ,data_id: data_id
            ,account: form_data.account
            ,password: form_data.password
            ,userName: form_data.userName
            ,role: form_data.role
            ,department: form_data.department
            ,phoneNumber: form_data.phoneNumber
            ,meno: form_data.meno
          }
          , success: function (res) {
              if(res.status=="0") {     //如果post成功要重新加载表格
              table.reloadData('testDevice', {
                where: {
                  data_id: data_id
                  ,requestData: "all"
                }
              })
              }
              else {
                layer.alert('添加账户失败！')
              }
          }
        })
      }
      , btn2: function (index, layero) {
        //按钮【取消】的回调
        //return false 开启该代码可禁止点击该按钮关闭
      }
    })
    form.render();  //如果不加这句话 可能会加载不出弹框中的select
    $.ajax({                                                //....请求 角色 并渲染select
      type: 'get'
      , url: '../../api/roleManagement.php'
      , data: {
        requestData: "allrole"
      }
      , success: function (res) {
        $("#newlyAdded_roleSelect_id").empty()
        var html = '<option value="">请选择角色</option>'
        $("#newlyAdded_roleSelect_id").append(html)
        $.each(res.data, function (index, elem) {
          html = '<option value="' + elem.roleName + '">' + elem.roleName + '</option>'
          $("#newlyAdded_roleSelect_id").append(html)
        })
        form.render('select');                              //....渲染所有选择框
      }
    })
    $.ajax({  
      type: 'get'                                              //....请求 部门 并渲染select
      , url: '../../api/departmentManagement.php'
      , data: {
        data_id: data_id,
        requestData: "allDepartment"
      }
      , success: function (res) {
        $("#newlyAdded_departmentSelcet_id").empty()
        var html = '<option value="">请选择部门</option>'
        $("#newlyAdded_departmentSelcet_id").append(html)
        $.each(res.data, function (index, elem) {
          html = '<option value="' + elem.departmentName + '">' + elem.departmentName + '</option>'
          $("#newlyAdded_departmentSelcet_id").append(html)
        })
        form.render('select');                              //....渲染所有选择框
      }
    })
  })

  account = ""
  userName = ""
  department = ""
  role = ""
  phoneNumber = ""
  meno = ""
  // 表格行单击事件
  table.on('row(test)', function (obj) {
    var data = obj.data; // 得到当前行数据
    var dataCache = obj.dataCache; // 得到当前行缓存数据，包含特定字段 --- 2.8.8+
    var index = obj.index; // 得到当前行索引
    var tr = obj.tr; // 得到当前行 <tr> 元素的 jQuery 对象
    var options = obj.config; // 获取当前表格基础属性配置项
    account = data.account
    password = data.password
    userName = data.name
    department = data.department
    role = data.role
    phoneNumber = data.phoneNumber
    meno = data.meno
    $(".layui-table-body .layui-table tr").attr({ "style": "background:#FFF" });    //其它tr恢复原样（必须在前）
    $(obj.tr.selector).attr({ "style": "background:#b8e1dd" });    //改变当前tr颜色（必须在后）
  });

  $('#editBt').on('click', function () {     //...编辑 按钮...//
    if (account == "") {
      layer.alert('您没有选中任何账户，请选中后再操作！')
    }
    else {
      layer.open({
        type: 1
        , id: "editLayerId"
        , title: ['编辑账户', 'font-size:15px']
        , content: template('tpl-edit', { account: account, password:password, userName:userName, userName:userName, phoneNumber: phoneNumber, meno: meno })
        // , area: ['500px', '250px']
        // ,area:'auto'
        // ,maxWidth:'500'
        // ,maxHeight:'250'
        , offset: 'auto'
        , btn: ['确定', '取消']
        , yes: function (index, layero) {
          //按钮【确定】的回调
          var form_data = form.val('edit_layer_filter')
          if (form_data.account == "" || form_data.password == "" || form_data.userName == "" || form_data.role == "") {
            layer.alert('账户、密码、姓名、角色 不能为空！')
            return
          }
          layer.close(index)
          $.ajax({
            type: 'post'
            , url: '../../api/userManagement.php'
            , data: {
              operate:"编辑账号"
              ,oldAccount: account
              ,account: form_data.account
              ,password: form_data.password
              ,userName: form_data.userName
              ,role: form_data.role
              ,department: form_data.department
              ,phoneNumber: form_data.phoneNumber
              ,meno: form_data.meno
            }
            , success: function (res) {
                if(res.status=="0") {     //如果post成功要重新加载表格
                table.reloadData('testDevice', {
                  where: {
                    data_id: data_id
                    ,requestData: "all"
                  }
                })
                }
                else {
                  layer.alert('编辑账户失败！')
                }
            }
          })
        }
        , btn2: function (index, layero) {
          //按钮【取消】的回调
          //return false 开启该代码可禁止点击该按钮关闭
        }
      })
      form.render();  //如果不加这句话 可能会加载不出弹框中的select
      $.ajax({                                                //....请求 角色 并渲染select
        type: 'get'
        , url: '../../api/roleManagement.php'
        , data: {
          requestData: "allrole"
        }
        , success: function (res) {
          $("#edit_roleSelect_id").empty()
          var html = '<option value="">请选择角色</option>'
          $("#edit_roleSelect_id").append(html)
          $.each(res.data, function (index, elem) {
            if(elem.roleName == role) {    // 当select中的角色 和 当前表格中选中的角色 相同时 将它 设置未默认选项
              html = '<option value="' + elem.roleName + ' " ' + 'selected' + '>' + elem.roleName + '</option>'
            }
            else{
              html = '<option value="' + elem.roleName + '">' + elem.roleName + '</option>'
            }
            $("#edit_roleSelect_id").append(html)
          })
          form.render($('#edit_roleSelect_id'));                              //....渲染选择框
        }
      })
      $.ajax({  
        type: 'get'                                              //....请求 部门 并渲染select
        , url: '../../api/departmentManagement.php'
        , data: {
          data_id: data_id,
          requestData: "allDepartment"
        }
        , success: function (res) {
          $("#edit_departmentSelcet_id").empty()
          var html = '<option value="">请选择部门</option>'
          $("#edit_departmentSelcet_id").append(html)
          $.each(res.data, function (index, elem) {
            if(elem.departmentName == department) {    // 当select中的部门 和 当前表格中选中的部门 相同时 将它 设置未默认选项
              html = '<option value="' + elem.departmentName + ' " ' + 'selected' + '>' + elem.departmentName + '</option>'
            }
            else {
              html = '<option value="' + elem.departmentName + '">' + elem.departmentName + '</option>'
            }
            $("#edit_departmentSelcet_id").append(html)
          })
          form.render($('#edit_departmentSelcet_id'));                              //....渲染选择框
        }
      })
    }
  })

  $('#deleteBt').on('click', function () {     //...删除 按钮...//
    if (account == "") {
      layer.alert('您没有选中任何账户，请选中后再操作！')
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
            , url: '../../api/userManagement.php'
            , data: {
               operate:"删除"
               ,deleteAccount: account
            }
            , success: function (res) {
              if (res.status == "0") {
                table.reloadData('testDevice', {
                  where: {
                    data_id: data_id
                    ,requestData: "all"
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