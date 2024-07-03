layui.use(["laypage", "layer", "table"], function () {
  var table = layui.table;
  var laypage = layui.laypage,
    layer = layui.layer;
  if (!localStorage.hasOwnProperty("user") ||!window.sessionStorage.hasOwnProperty("user")) {
    window.location.replace("../error/404");
    return;
  }

  table.render({
    //渲染正在测试界面表格
    elem: "#testDevice",
    url: "../../api/testing.php",
    page: {
      limit: 25,
      limits: [10, 15, 20, 25, 30, 35, 40, 45, 50],
      layout: ["prev", "page", "next", "skip", "count", "limit"],
      jump: function (obj, first) {
        //分页被操作时触发该函数
        //obj包含了当前分页的所有参数，比如：
        console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        console.log(obj.limit); //得到每页显示的条数
        //首次不执行
        if (!first) {
          //do something
          table.reloadData("testDevice", {
            //只重载表格数据
            where: {
              page: obj.curr,
              limit: obj.limit,
            },
          });
        }
      },
    },
    parseData: function (res) {
      //res 即为原始返回的数据
      return {
        code: res.status, //解析接口状态
        msg: res.message, //解析提示文本
        count: res.count, //解析数据长度
        data: res.data, //解析数据列表
      };
    },
    cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
    cols: [
      [
        { type: "checkbox", minWidth: 50 },
        { field: "id", title: "序号", type: "numbers", minWidth: 50 },
        { field: "meterID", title: "设备编号", minWidth: 120, sort: true }, //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
        { field: "IMEI", title: "IMEI", minWidth: 160, sort: true },
        { field: "ICCID", title: "ICCID", minWidth: 200, sort: true },
        { field: "VDD", title: "电池电压", minWidth: 105, sort: true },
        { field: "SS", title: "信号强度", minWidth: 105, sort: true },
        { field: "totalFlow", title: "累计用量", minWidth: 105, sort: true }, //单元格内容水平居中
        { field: "testFlow", title: "当前测试用量", minWidth: 130, sort: true }, //单元格内容水平居右
        {
          field: "reportTime",
          title: "最近上报时间",
          minWidth: 160,
          sort: true,
        },
        { field: "V", title: "版本号", minWidth: 100, sort: true },
        { field: "testResult", title: "测试结果", minWidth: 105, sort: true },
        { field: "testTime", title: "测试时间", minWidth: 160, sort: true },
        {
          field: "operate",
          title: "操作",
          width: 125,
          minWidth: 125,
          minWidth: 100,
          templet: "#tpl-specificsBt",
        },
      ],
    ],
    even: true,
    done: function (res, curr, count) {
      //表格渲染完后触发该函数
      //如果是异步请求数据方式，res即为你接口返回的信息。
      //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
      // console.log(res);
      //得到当前页码
      // console.log(curr);
      //得到数据总量
      // console.log(count);
    },
  });
  table.on("tool(test)", function (obj) {
    //...单元格工具事件（单击测试详情触发）
    var data = obj.data;

    var specificsDIVData = {
      meterID: "00000404",
    };
    var htmlSpecificsDIV = template("tpl-specificsDIV", specificsDIVData); //...获得测试详情界面template的HTML

    if (obj.event == "specifics") {
      layer.open({
        //打开弹出层
        title: "测试详情",
        type: 1,
        area: ["60%", "60%"],
        content: htmlSpecificsDIV, //...将模板赋给内容
      });
      table.render({
        //...渲染测试详情表格
        elem: "#specificsTable",
        // ,url:'api/...'
        // ,parseData: function(res){ //res 即为原始返回的数据
        //   return {
        //     "code": res.status, //解析接口状态
        //     "msg": res.message, //解析提示文本
        //     "count": res.total, //解析数据长度
        //     "data": res.data //解析数据列表
        //   };
        // }

        cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        cols: [
          [
            { field: "reportedItiems", title: "上报项目", minWidth: 100 },
            { field: "parameterValue", title: "参数值", minWidth: 120 }, //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
            { field: "specificsTime", title: "日期", minWidth: 80 },
          ],
        ],
        data: [
          {
            reportedItiems: "阀门状态",
            parameterValue: "阀门开启",
            specificsTime: "2023-10-14",
          },
          {
            reportedItiems: "10001",
            parameterValue: "杜甫。。。。。。。。。。。。。",
            specificsTime: "2023-10-14",
          },
        ],
        even: true,
      });
    }
  });
  $("#deviceSerchBt").on("click", function () {
    //..查询按钮
    var meterIDval = $("#meterIDserchInpt").val();
    var IMEIval = $("#IMEIserchInpt").val();
    var ICCIDval = $("#ICCIDserchInpt").val();
    table.reloadData("testDevice", {
      //只重载表格数据
      where: {
        page: 1,
        meterID: meterIDval,
        IMEI: IMEIval,
        ICCID: ICCIDval,
      },
    });
  });

  $("#exportBt").click(function () {
    //...导出按钮
    var ins1 = table.render({
      elem: "#data_export",
      url: "../../api/testing.php",
      where: {
        export: "all",
      },
      title: "正在测试批次",
      parseData: function (res) {
        //res 即为原始返回的数据
        return {
          code: res.status, //解析接口状态
          data: res.data, //解析数据列表
        };
      },
      cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
      cols: [
        [
          { type: "checkbox", minWidth: 50 },
          { field: "id", title: "序号", type: "numbers", minWidth: 50 },
          { field: "meterID", title: "设备编号", minWidth: 120, sort: true }, //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
          { field: "IMEI", title: "IMEI", minWidth: 160, sort: true },
          { field: "ICCID", title: "ICCID", minWidth: 200, sort: true },
          { field: "VDD", title: "电池电压", minWidth: 105, sort: true },
          { field: "SS", title: "信号强度", minWidth: 105, sort: true },
          { field: "totalFlow", title: "累计用量", minWidth: 105, sort: true }, //单元格内容水平居中
          {
            field: "testFlow",
            title: "当前测试用量",
            minWidth: 130,
            sort: true,
          }, //单元格内容水平居右
          {
            field: "reportTime",
            title: "最近上报时间",
            minWidth: 160,
            sort: true,
          },
          { field: "V", title: "版本号", minWidth: 100, sort: true },
          { field: "testResult", title: "测试结果", minWidth: 105, sort: true },
          { field: "testTime", title: "测试时间", minWidth: 160, sort: true },
          {
            field: "operate",
            title: "操作",
            width: 125,
            minWidth: 125,
            minWidth: 100,
            templet: "#tpl-specificsBt",
          },
        ],
      ],
      even: true,
      done: function (res, curr, count) {
        exportData = res.data;
        table.exportFile(ins1.config.id, exportData, "xls");
      },
    });
  });
});
var testSumData = {
  testingNum: 10,
  testPaseNum: 9,
  testFailNum: 1,
  totalTestNum: 20,
  startTime: 2023,
};
var htmlTestSum = template("tpl-testSum", testSumData);
$("#testSum").html(htmlTestSum); //...渲染测试总数
