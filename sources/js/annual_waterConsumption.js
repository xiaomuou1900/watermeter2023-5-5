var data_id = "001"     // 地区编号
    ,meterID = ""
    ,date = ""
    ,temp_meterID = 0
    , temp_data = {}
    , temp_date = 0
var waterConsumption = []
	,UploadTime = []
$.ajax({
	type:'get'
	,url:'../../api/daily_waterConsumption.php'
	,data:{
		data_id:"001"
    ,meterID: temp_data.meterID
    ,date: temp_data.date
	}
	,success:function(res) {
		waterConsumption=res.data.waterConsumption
		UploadTime=res.data.UploadTime
	}
})

var table_data = []
layui.use(['laypage', 'layer', 'table', 'form', 'laydate','dtree','echarts'], function () {
  var table = layui.table
    , laypage = layui.laypage
    , layer = layui.layer
    , form = layui.form
    , laydate = layui.laydate
    , dtree = layui.dtree
    , echarts = layui.echarts;
  var table_data = []

  var bar_waterConsumption = echarts.init(document.getElementById('bar_waterConsumption'),null, {    //...柱状图...//
		// width: 600,   
		// height: 300
	});
	const colorList = ["#9E87FF", '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF']
	option_waterConsumption = {
		title: {
			text: ''
		},
		tooltip: {
			trigger: 'axis'
		},
		// legend: {
		// 	data: ['2018', '2019']
		// },
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		toolbox: {
			feature: {
				saveAsImage: {}
			}
		},
		xAxis: {
			type: 'category',
			boundaryGap: true,//坐标轴两边留白
			data: UploadTime,                                     //...上传时间...//
			axisLabel: { //坐标轴刻度标签的相关设置。
				// interval: 1,//设置为 1，表示『隔一个标签显示一个标签』
			//	margin:15,
				
				color: '#1B253A',
				fontStyle: 'normal',
				fontFamily: '微软雅黑',
				fontSize: 12,	
				formatter:function(params) {
					var newParamsName = "";
					var paramsNameNumber = params.length;
					var provideNumber = 10;  //一行显示几个字
					var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
					if (paramsNameNumber > provideNumber) {
						for (var p = 0; p < rowNumber; p++) {
							var tempStr = "";
							var start = p * provideNumber;
							var end = start + provideNumber;
							if (p == rowNumber - 1) {
								tempStr = params.substring(start, paramsNameNumber);
							} else {
								tempStr = params.substring(start, end) + "\n";
							}
							newParamsName += tempStr;
						}
	
					} else {
						newParamsName = params;
					}
					return newParamsName
				},
				//rotate:50,
			},
			axisTick:{//坐标轴刻度相关设置。
				show: false,
			},
			axisLine:{//坐标轴轴线相关设置
				lineStyle:{
					color:'#E5E9ED',
					// opacity:0.2
				}
			},
			splitLine: { //坐标轴在 grid 区域中的分隔线。
				show: true,
				lineStyle: {
					color: '#E5E9ED',
				// 	opacity:0.1
				}
			}
		},
		yAxis: [
			{
				type: 'value',
				splitNumber: 5,
				axisLabel: {
					
					color: '#a8aab0',
					fontStyle: 'normal',
					fontFamily: '微软雅黑',
					fontSize: 12
					
				},
				axisLine:{
					show: false
				},
				axisTick:{
					show: false
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: '#E5E9ED',
					// 	opacity:0.1
					}
				}
	
			}
		],
		series: [
			{
				name: '用量',
				type: 'bar',
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					  { offset: 0, color: '#83bff6' },
					  { offset: 0.5, color: '#188df0' },
					  { offset: 1, color: '#188df0' }
					])
				  },
				  emphasis: {
					itemStyle: {
					  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#2378f7' },
						{ offset: 0.7, color: '#2378f7' },
						{ offset: 1, color: '#83bff6' }
					  ])
					}
				  },
				data: waterConsumption    //...用水量数据...//
			}
		]
	};
	bar_waterConsumption.setOption(option_waterConsumption);
	window.addEventListener('resize', function() {
		bar_waterConsumption.resize();
	})


  dtree.render({                 //...渲染片区列表...//
      elem: "#demoTree",
      initLevel: "1",
      method: 'get',
      url: "../../api/dtree.json"
  });
  
  $("#demoTree").on("click",".dtree-nav-div",function(e) {                //...单击片区列表。。。//
    // console.log(1) 
    // console.log(e.target)  //e.target点击谁 返回谁
    // // console.log(this)
    // console.log(e.target.getAttribute('data-id'))
    data_id = e.target.getAttribute('data-id');
    $.ajax({                                        //...重新请求数据 并重新加载柱状图...//           
      type:'get'
      ,url:'../../api/daily_waterConsumption.php'
      ,data:{
        data_id: data_id
        ,meterID: temp_data.meterID
        ,date: temp_data.date
      }
      ,success:function(res) {
        waterConsumption=res.data.waterConsumption
        UploadTime=res.data.UploadTime

        var bar_waterConsumption = echarts.init(document.getElementById('bar_waterConsumption'),null, {    //...重新加载柱状图...//
          // width: 600,   
          // height: 300
        });
        var option_waterConsumption =  bar_waterConsumption.getOption();
        option_waterConsumption.xAxis[0].data = UploadTime;
        option_waterConsumption.series[0].data = waterConsumption
        bar_waterConsumption.setOption(option_waterConsumption);
      }
    })
    table.reloadData('testDevice', {                                   //只重载表格数据
      where: {
        data_id: data_id
        , meterID: temp_data.meterID
        , date: temp_data.date
      }
    })

  })

  table.render({                         //...渲染表格...//
    elem: '#testDevice'
    , url: '../../api/daily_waterConsumption.php'
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
        "code": res.status, //解析接口状态
        "msg": res.msg, //解析提示文本
        "count": res.count, //解析数据长度
        "data": res.data //解析数据列表
      };
    }
    , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
    , cols: [[
      { field: 'id', title: '序号', type: 'numbers', minWidth: 50 }
      , { field: 'earaName', title: '片区名称', minWidth: 120, sort: true } //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
      , { field: 'userNumber', title: '用户编号', minWidth: 160, sort: true }
      , { field: 'userName', title: '用户名称', minWidth: 200, sort: true }
      , { field: 'meterType', title: '表类型', minWidth: 105 }
      , { field: 'meterID', title: '设备编号', minWidth: 105, sort: true }
      , { field: 'Time', title: '日期', minWidth: 105, sort: true } //单元格内容水平居中
      , { field: 'startRead', title: '起始数', minWidth: 105, sort: true }
      , { field: 'stopRead', title: '终止数', Width: 100}
      , { field: 'usage', title: '用量', minWidth: 105}
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
      "date": "",
    })
    $('#meterIDserchDiv_id').addClass('hide')
    $('#dateDiv_id').addClass('hide')
    if(data.value == "设备编号") {
      $('#meterIDserchDiv_id').removeClass('hide')
    } else if(data.value == "日期范围") {
      $('#dateDiv_id').removeClass('hide')
    } 
  });


  //...渲染查找日期范围... 
  // 年范围
  laydate.render({
    elem: '#ID-laydate-range-year',
    type: 'year',
    range: true
  });

  $('#deviceSerchBt').on('click', function () {                                           //...查询按钮...//
    var data = form.val('deviceSerchFilter')
    if (data.meterIDserchInpt === "" && data.date === "") {
      layer.alert('请填写查询信息！')
      return
    }
    else {
      form.val('deviceSerchFilter', {
        "meterIDserchInpt": "",
        "date": ""
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
      if (data.date != "") {
        temp_data.date = data.date
        if (temp_date == 0) {
          temp_date = 1
          var html = '<label id="dateLabel" class="label label-success" style="display: inline-block; background-color: var(--green-color); color:white; height: 22px; padding-top: 5px; margin-right:10px">日期范围：' + data.date + '<i class="layui-icon layui-icon-close" id="dateId" style="font-size: 12px; padding-left:10px"></i></label>'
          $('#selectTips').append(html)
        }
        else {
          var html = '日期范围: ' + data.date  + '<i class="layui-icon layui-icon-close" id="dateId" style="font-size: 12px; padding-left:10px"></i>'
          $('#dateLabel').empty()
          $('#dateLabel').append(html)
        }
      }
    }
    table.reloadData('testDevice', {                                   //只重载表格数据
      where: {
        meterID: temp_data.meterID
        , date: temp_data.date
      }
    });

    $.ajax({                //...重新请求数据 并重新加载柱状图...//            
      type:'get'
      ,url:'../../api/daily_waterConsumption.php'
      ,data:{
        data_id: data_id
        ,meterID: temp_data.meterID
        ,date: temp_data.date
      }
      ,success:function(res) {
        waterConsumption=res.data.waterConsumption
        UploadTime=res.data.UploadTime

        var bar_waterConsumption = echarts.init(document.getElementById('bar_waterConsumption'),null, {    //...重新加载柱状图...//
          // width: 600,   
          // height: 300
        });
        var option_waterConsumption =  bar_waterConsumption.getOption();
        option_waterConsumption.xAxis[0].data = UploadTime;
        option_waterConsumption.series[0].data = waterConsumption
        bar_waterConsumption.setOption(option_waterConsumption);
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
          , date: temp_data.date
        }
      });
      $.ajax({                //...重新请求数据 并重新加载柱状图...//            
        type:'get'
        ,url:'../../api/daily_waterConsumption.php'
        ,data:{
          data_id: data_id
          ,meterID: temp_data.meterID
          ,date: temp_data.date
        }
        ,success:function(res) {
          waterConsumption=res.data.waterConsumption
          UploadTime=res.data.UploadTime
  
          var bar_waterConsumption = echarts.init(document.getElementById('bar_waterConsumption'),null, {    //...重新加载柱状图...//
            // width: 600,   
            // height: 300
          });
          var option_waterConsumption =  bar_waterConsumption.getOption();
          option_waterConsumption.xAxis[0].data = UploadTime;
          option_waterConsumption.series[0].data = waterConsumption
          bar_waterConsumption.setOption(option_waterConsumption);
        }
      })
    })
    //
    $("#dateId").off('click')
    $("#dateId").on('click', function (e) {                    //...关闭查找提示
      temp_date = 0
      $("#dateLabel").remove()
      temp_data.date = ""
      table.reloadData('testDevice', {
        where: {
          meterID: temp_data.meterID
          , date: temp_data.date
        }
      });
      $.ajax({                //...重新请求数据 并重新加载柱状图...//            
        type:'get'
        ,url:'../../api/daily_waterConsumption.php'
        ,data:{
          data_id: data_id
          ,meterID: temp_data.meterID
          ,date: temp_data.date
        }
        ,success:function(res) {
          waterConsumption=res.data.waterConsumption
          UploadTime=res.data.UploadTime
  
          var bar_waterConsumption = echarts.init(document.getElementById('bar_waterConsumption'),null, {    //...重新加载柱状图...//
            // width: 600,   
            // height: 300
          });
          var option_waterConsumption =  bar_waterConsumption.getOption();
          option_waterConsumption.xAxis[0].data = UploadTime;
          option_waterConsumption.series[0].data = waterConsumption
          bar_waterConsumption.setOption(option_waterConsumption);
        }
      })
    })
  })

  $("#exportBt").click(function () {                                       //...导出按钮...//
    var ins1 = table.render({
      elem: '#data_export'
      , url: '../../api/daily_waterConsumption.php'
      , where: {
        export: 'all'
      }
      , title: "导出数据"
      , parseData: function (res) { //res 即为原始返回的数据
        return {
          "code": res.status, //解析接口状态
          "data": res.data //解析数据列表
        };
      }
      , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
      , cols: [[
        { field: 'id', title: '序号', type: 'numbers', minWidth: 50 }
        , { field: 'earaName', title: '片区名称', minWidth: 120, sort: true } //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
        , { field: 'userNumber', title: '用户编号', minWidth: 160, sort: true }
        , { field: 'userName', title: '用户名称', minWidth: 200, sort: true }
        , { field: 'meterType', title: '表类型', minWidth: 105 }
        , { field: 'meterNumber', title: '表编号', minWidth: 105, sort: true }
        , { field: 'Time', title: '日期', minWidth: 105, sort: true } //单元格内容水平居中
        , { field: 'startRead', title: '起始数', minWidth: 105, sort: true }
        , { field: 'stopRead', title: '终止数', Width: 100}
        , { field: 'usage', title: '用量', minWidth: 105}
      ]]
      , even: true
      , done: function (res, curr, count) {
        exportData = res.data;
        table.exportFile(ins1.config.id, exportData, 'xls');
      }
    })
  })

  

})