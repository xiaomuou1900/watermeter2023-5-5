var table_data = []
layui.use(['laypage', 'layer', 'table', 'form', 'laydate'], function () {
  var table = layui.table
    , laypage = layui.laypage
    , layer = layui.layer
    , form = layui.form
    , laydate = layui.laydate;
  var table_data = []

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
      , { field: 'platform', title: '所属厂商', Width: 100 }
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

  $('#importBt').click(function () {                                  //...导入按钮...//
    layer.open({
      type: 1
      , title: "导入"
      , area: ["50%", "30%"]
      , content: '<div style="margin-left:20px; margin-top:5px"><input id="fileAddressInpt"  type="file" accept=".xls,.xlsx" class="hide"><button id="fileAddressBt" class="layui-btn layui-btn-sm" style="margin-bottom:3px; margin-left:2px;">选择文件</button><span id="fileName" style="margin-left:20px;border-bottom: 1px solid #f0f0f0; width:80%"></span></div>'
      , btn: ["导入", "取消"]
      , btn1: function (index, layero, that) {  
          console.log(htmlList);
          $.ajax({
            type: 'post'
            ,url:  '../../api/deviceInfo_import.json'
            ,where:{
              post: 'deviceInfo_import'
              ,htmlList
            }
            ,success:function(e) {
              if(e.code == 0) {
                layer.alert('导入完成，成功'+ e.sucessCount +'条，失败'+ e.failedCount +'条')
                
              }
            }
          })
      }
      , btn2: function (index, layero, that) {
        return
      }
      , success: function (layero, index, that) {
        // // 弹层的最外层元素的 jQuery 对象
        // console.log(layero);
        // // 弹层的索引值
        // console.log(index);
        // // 弹层内部原型链中的 this --- 2.8+
        // console.log(that);
        let filePath  //选择文件路径
        $('#fileAddressBt').off('click')
        $('#fileAddressBt').on('click', function (e) {
          filePath = ''
          $('#fileAddressInpt').val("")
          $('#fileAddressInpt').click()
        })
        $('#fileAddressInpt').on('change', function (e) {  //获取文件信息
          let file = document.getElementById('fileAddressInpt').files[0]
          $('#fileName').text("文件名： " + file.name);
          let reader = new FileReader();
          // let file = e.files[0];
          reader.readAsBinaryString(file);
          reader.onload = function (e) {
            let wb
            try {
              let data = e.target.result;
               wb = XLSX.read(data, { type: 'binary' });
            } catch(e) {
              layer.alert('文件类型不正确')
              return
            }            
            sheetName = wb.SheetNames[0] // 获取文档中第一个sheet页签的名字
            sheets = wb.Sheets[sheetName] // 获sheet名页签下的数据
            // console.log(sheets);
            htmlList = XLSX.utils.sheet_to_json(sheets) // sheet页签的内容转化为json数据
            // console.log(htmlList);     
          };
        })
      }
    })
  })

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
        , { field: 'platform', title: '所属厂商', Width: 100 }
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
})

