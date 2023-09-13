 var meterID = location.search.split('=')[1] = location.search.split('=')[1]

var VDD = []
    ,CSQ = []
	,UploadTime = []
$.ajax({
	type:'get'
	,url:'../../api/deviceStatusShow.php'
	,data:{
		meterID:meterID
	}
	,success:function(res) {
		VDD=res.data.VDD
		CSQ=res.data.CSQ
		UploadTime=res.data.UploadTime
		
	}
})



layui.use(['echarts'], function() {

	let echarts = layui.echarts;

	var line_VDD = echarts.init(document.getElementById('line_VDD'),null, {
		// width: 'auto',
		// height: 'auto'
	});

	var line_CSQ = echarts.init(document.getElementById('line_CSQ'),null, {
		// width: 600,
		// height: 300
	});

	const colorList = ["#9E87FF", '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF']
	option_VDD = {
		title: {
			text: '近十次上报电压曲线'
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
			boundaryGap: false,//坐标轴两边留白
			data:  UploadTime,                                    //...上传时间...//
			axisLabel: { //坐标轴刻度标签的相关设置。
				interval: 1,//设置为 1，表示『隔一个标签显示一个标签』
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
				name: '电压',
				type: 'line',
				itemStyle: {			       
					color:'rgb(255, 81, 0)',
					lineStyle: {
						color: "green",
						width:1
					},
					areaStyle: { 
						color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
							offset: 0,
							color: 'rgba(58,132,255,0)'
						}, {
							offset: 1,
							color: 'rgba(58,132,255,0.35)'
						}]),
					}			        
				},
				data: VDD                     //...电压...//
			}
		]
	};

	option_CSQ = {
		title: {
			text: '近10次上报信号曲线'
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
			boundaryGap: false,//坐标轴两边留白
			data: UploadTime,                                   //...上传时间...//
			axisLabel: { //坐标轴刻度标签的相关设置。
				interval: 1,//设置为 1，表示『隔一个标签显示一个标签』
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
				name: '2018',
				type: 'line',
				itemStyle: {			       
					color:'#3A84FF',
					lineStyle: {
						color: "#3A84FF",
						width:1
					},
					areaStyle: { 
						color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
							offset: 0,
							color: 'rgba(58,132,255,0)'
						}, {
							offset: 1,
							color: 'rgba(58,132,255,0.35)'
						}]),
					}			        
				},
				data: CSQ                     //...信号强度...//
			}
		]
	};

	line_VDD.setOption(option_VDD);
	line_CSQ.setOption(option_CSQ);

	window.addEventListener('resize', function() {
		line_VDD.resize();
		line_CSQ.resize();
	})

})

