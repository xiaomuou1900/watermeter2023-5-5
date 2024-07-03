layui.use(["layer", "table", "dropdown"], function () {
  var table = layui.table,
    layer = layui.layer,
    dropdown = layui.dropdown;

  if (
    !localStorage.hasOwnProperty("user") ||
    !window.sessionStorage.hasOwnProperty("user")
  ) {
    window.location.replace("../error/404");
    return;
  }

  $("#deviceSerchBt").on("click", function () {
    //...查询按钮
    var meterID = $("#meterIDserchInpt").val();
    var precision = "";
    if (meterID == null || meterID == "") {
      layer.alert("设备编号不能为空");
      return;
    }
    $("#meterIDserchInpt").val("");

    var htmloperateDIV = template("tpl-operateDIV", { meterID: meterID }); //// 渲染操作区DIV ////
    $("#operateDIV").html(htmloperateDIV);

    table.render({
      //// 渲染第一个table ////
      elem: "#testDevice",
      url: "../../api/testing.php",
      where: {
        meterID: meterID,
      },
      parseData: function (res) {
        //res 即为原始返回的数据
        return {
          code: res.status, //解析接口状态
          data: res.data, //解析数据列表
        };
      },
      cols: [
        [
          { field: "meterID", title: "设备编号", minWidth: 120 }, //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
          { field: "IMEI", title: "IMEI", minWidth: 160 },
          { field: "ICCID", title: "ICCID", minWidth: 200 },
          { field: "VDD", title: "电池电压", minWidth: 105 },
          { field: "SS", title: "信号强度", minWidth: 105 },
          { field: "totalFlow", title: "累计用量", minWidth: 105 }, //单元格内容水平居中
          { field: "testFlow", title: "当前测试用量", minWidth: 130 }, //单元格内容水平居右
          { field: "reportTime", title: "最近上报时间", minWidth: 160 },
          { field: "version", title: "版本号", minWidth: 100 },
          { field: "testResult", title: "测试结果", minWidth: 105 },
          { field: "testTime", title: "测试时间", minWidth: 160 },
        ],
      ],
      even: true,
      done: function (res, curr, count) {
        //如果是异步请求数据方式，res即为你接口返回的信息。
        //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
        // console.log(res);
        //得到当前页码
        // console.log(curr);

        //得到数据总量
        // console.log(count);
        var tpldata = {
          meterID: meterID,
          precision: res.data[0].version,
        };
        var tplHTML = template("tpl-syncReadingLayer", tpldata);
        $("#syncReadingBt").on("click", function () {
          //...表底数机电同步 按钮
          layer.open({
            type: 1,
            title: ["请输入底数", "font-size:20px"],
            content: tplHTML,
            area: ["500px", "250px"],
            offset: ["50px", "300px"],
            btn: ["确定", "取消"],
            yes: function (index, layero) {
              //按钮【确定】的回调
              if (
                $("#syncReadingLayerInpt").val() == null ||
                $("#syncReadingLayerInpt").val() == ""
              ) {
                layer.alert("表底数不能为空");
                return;
              }
              layer.close(index);
              $.ajax({
                type: "post",
                url: "../../api/testing.php",
                data: {
                  ids: "TEST-LIANLIFI-" + meterID,
                  types: { "sync-reading": $("#syncReadingLayerInpt").val() },
                },
                success: function (res) {},
              });
            },
            btn2: function (index, layero) {
              //按钮【取消】的回调
              //return false 开启该代码可禁止点击该按钮关闭
            },
          });
        });
      },
    });

    table.render({
      //// 渲染第二个table ////
      elem: "#specificsTable",
      url: "../../api/testing.php",
      where: {
        meterID: meterID,
      },
      parseData: function (res) {
        //res 即为原始返回的数据
        return {
          code: res.status, //解析接口状态
          data: res.data, //解析数据列表
        };
      },
      cols: [
        [
          { field: "meterID", title: "上报项目", minWidth: 120 }, //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
          { field: "VDD", title: "参数值", minWidth: 105 },
          { field: "testTime", title: "日期", minWidth: 160 },
        ],
      ],
      even: true,
    });

    $("#maintainBt").on("click", function () {
      //...进入维修模式 按钮
      layer.open({
        type: 1,
        title: ["确认", "font-size:20px"],
        content:
          '<div style="margin-top:45px; margin-left:20px; font-size:17px">确认进入维修模式</div>',
        area: ["500px", "250px"],
        offset: ["50px", "300px"],
        btn: ["确定", "取消"],
        yes: function (index, layero) {
          //按钮【确定】的回调
          layer.close(index);
          $.ajax({
            type: "post",
            url: "../../api/testing.php",
            data: {
              ids: "TEST-LIANLIFI-" + meterID,
              types: { maintain: true },
            },
            success: function (res) {},
          });
        },
        btn2: function (index, layero) {
          //按钮【取消】的回调
          //return false 开启该代码可禁止点击该按钮关闭
        },
      });
    });

    $("#retestBt").on("click", function () {
      //...重测 按钮
      layer.open({
        type: 1,
        title: ["确认", "font-size:20px"],
        content:
          '<div style="margin-top:45px; margin-left:20px; font-size:17px">确认重新测试设备编号：' +
          meterID +
          "吗？</div>",
        area: ["500px", "250px"],
        offset: ["50px", "300px"],
        btn: ["确定", "取消"],
        yes: function (index, layero) {
          //按钮【确定】的回调
          layer.close(index);
          $.ajax({
            type: "post",
            url: "../../api/testing.php",
            data: {},
            success: function (res) {
              layer.alert("O了");
            },
          });
        },
        btn2: function (index, layero) {
          //按钮【取消】的回调
          //return false 开启该代码可禁止点击该按钮关闭
        },
      });
    });

    $("#forcedFailureBt").on("click", function () {
      //...强制失败 按钮
      layer.open({
        type: 1,
        title: ["确认", "font-size:20px"],
        content:
          '<div style="margin-top:45px; margin-left:20px; font-size:17px">确认强制失败设备编号：' +
          meterID +
          "吗？</div>",
        area: ["500px", "250px"],
        offset: ["50px", "300px"],
        btn: ["确定", "取消"],
        yes: function (index, layero) {
          //按钮【确定】的回调
          layer.close(index);
          $.ajax({
            type: "post",
            url: "../../api/testing.php",
            data: {},
            success: function (res) {
              layer.alert("O了");
            },
          });
        },
        btn2: function (index, layero) {
          //按钮【取消】的回调
          //return false 开启该代码可禁止点击该按钮关闭
        },
      });
    });

    dropdown.render({
      //...设备维护 下拉菜单
      elem: "#MOFEbt",
      data: [
        {
          title: "重启",
          id: 1,
        },
        {
          title: "恢复出厂设置",
          id: 2,
        },
        {
          title: "清除设备异常",
          id: 3,
        },
      ],
      id: "MOFEbt",
      click: function (data, othis) {
        console.log(data.id);
        switch (data.id) {
          case 1:
            $.ajax({
              type: "post",
              url: "../../api/testing.php",
              data: {
                ids: "TEST-LIANLIFI-" + meterID,
                types: "restart",
              },
              success: function (res) {
                layer.alert("重启成功");
              },
            });
            break;
          case 2:
            $.ajax({
              type: "post",
              url: "../../api/testing.php",
              data: {
                ids: "TEST-LIANLIFI-" + meterID,
                types: "restore_factory",
              },
              success: function (res) {
                layer.alert("恢复出厂成功");
              },
            });
            break;
          case 3:
            $.ajax({
              type: "post",
              url: "../../api/testing.php",
              data: {
                ids: "TEST-LIANLIFI-" + meterID,
                types: "clean_exceptions",
              },
              success: function (res) {
                layer.alert("清除设备异常成功");
              },
            });
            break;
        }
      },
    });

    dropdown.render({
      //...请选择基表口径 下拉菜单
      elem: "#selectDNinpt",
      data: [
        {
          title: "请选择基表口径",
          id: 1,
        },
        {
          title: "DN15",
          id: 2,
        },
        {
          title: "DN20",
          id: 3,
        },
        {
          title: "DN25",
          id: 4,
        },
        {
          title: "DN32",
          id: 5,
        },
        {
          title: "DN40",
          id: 6,
        },
        {
          title: "DN50",
          id: 7,
        },
        {
          title: "DN65",
          id: 8,
        },
        {
          title: "DN80",
          id: 9,
        },
        {
          title: "DN100",
          id: 10,
        },
        {
          title: "DN125",
          id: 11,
        },
        {
          title: "DN150",
          id: 12,
        },
        {
          title: "DN200",
          id: 13,
        },
        {
          title: "DN250",
          id: 14,
        },
        {
          title: "DN300",
          id: 15,
        },
        {
          title: "DN400",
          id: 16,
        },
        {
          title: "DN500",
          id: 17,
        },
      ],
      id: "selectDNinpt",
      click: function (data, othis) {
        if (data.id != 1) {
          $("#selectDNinpt input").val(data.title);
        }
      },
    });
    $("#selectDNinpt li").style.padding = "0";
  });
});
