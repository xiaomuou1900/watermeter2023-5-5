layui.use(['laypage', 'layer', 'table', 'form', 'laydate'], function () {
    var table = layui.table
        , laypage = layui.laypage
        , layer = layui.layer
        , form = layui.form
        , laydate = layui.laydate;
    form.on('select(serchCondition_select_filter)', function (data) {                 //.....选择查询条件复选框发生改变...//
        // var elem = data.elem; // 获得 select 原始 DOM 对象
        // var value = data.value; // 获得被选中的值
        // var othis = data.othis; // 获得 select 元素被替换后的 jQuery 对象 
        // layer.msg(this.innerHTML + ' 的 value: '+ value); // this 为当前选中 <option> 元素对象
        form.val('deviceSerchFilter', {
            "meterIDserchInpt": "",
            "transferorSerchInpt": "",
            "menoSerchInpt": ""
        })
        $('#meterIDserchDiv_id').addClass('hide')
        $('#transferorDiv_id').addClass('hide')
        $('#menoDiv_id').addClass('hide')
        if (data.value == "设备编号") {
            $('#meterIDserchDiv_id').removeClass('hide')
        } else if (data.value == "所属厂商") {
            $('#transferorDiv_id').removeClass('hide')
        } else if (data.value == "备注") {
            $('#menoDiv_id').removeClass('hide')
        }
    });
    $.ajax({                                                //
        type: 'get'
        , url: '../../api/tablePrint.php'
        , data: {
            getData: '获取所有模板名称'
        }
        , success: function (res) {
            $.each(res.templateName, function (index, elem) {
                var html = '<option value="' + elem + '">' + elem + '</option>'
                $("#Template_selcet_id").append(html)
            })
            form.render($('#Template_selcet_id'));                              //....渲染所有选择框
        }
    })
    $('#selectTemplate_id').click(function () {                // 设置打印模板
        $('#Template_selcet_div').removeClass('hide')
        layer.open({
            type: 1,
            title: '设置打印模板',
            area: ['300px', '200px'],
            content: $('#Template_selcet_div'),
            cancel: function (index, layero, that) {
                $('#Template_selcet_div').addClass('hide')
            },
            btn: ['确定'],
            btn1: function (index, layero, that) {
                $.ajax({                                                //
                    type: 'post'
                    , url: '../../api/tablePrint.php'
                    , data: {
                        post: '设置打印模板',
                        templateName: form.val('deviceSerchFilter').Template_selcet
                    }
                    , success: function (res) {
                        layer.alert('设置打印模板成功')
                    }
                })
            }
        })
    })
    $.ajax({                                                //....请求 受让厂商 和 转让厂商 并渲染选择框
        type: 'get'
        , url: '../../api/transfer_devices.php'
        , data: {
            page: 1
        }
        , success: function (res) {
            $.each(res.transferor, function (index, elem) {
                var html = '<option value="' + elem + '">' + elem + '</option>'
                $("#transferor").append(html)
            })
            form.render($('#transferor'));                              //....渲染所有选择框
        }
    })
    $('#deviceSerchBt').click(function () {     //查询那妞
        var data = form.val('deviceSerchFilter')
        if (data.meterIDserchInpt === "" && data.transferorSerchInpt === "" && data.menoSerchInpt === "") {
            layer.alert('请选择查询条件并填写查询信息！')
            return
        }
        else {
            form.val('deviceSerchForm', {
                "meterIDserchInpt": "",
                "transferorSerchInpt": "",
                "menoSerchInpt": "",
            })
        }
        if (data.meterIDserchInpt != '') {
            value = data.meterIDserchInpt
        } else if (data.transferorSerchInpt != '') {
            value = data.transferorSerchInpt
        } else if (data.menoSerchInpt != '') {
            value = data.menoSerchInpt
        }
        table.render({       //渲染表格
            elem: '#testDevice'
            , url: '../../api/print.php'
            , where: {
                getData: form.val('deviceSerchFilter').serchCondition_selcet
                , value: value
            }
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
                        table.reloadData('deviceLayData', {                                   //只重载表格数据
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
                    "msg": res.message, //解析提示文本
                    "count": res.count, //解析数据长度
                    "data": res.data //解析数据列表
                };
            }
            , cols: [[
                { type: 'checkbox', minWidth: 50 }
                , { field: 'id', title: '序号', type: 'numbers', minWidth: 50 }
                , { field: 'meterID', title: '设备编号', minWidth: 120, sort: true } //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
                , { field: 'IMEI', title: 'IMEI', minWidth: 160, sort: true }
                , { field: 'ICCID', title: 'ICCID', minWidth: 200, sort: true }
                , { field: 'lastReading', title: '上次读数', minWidth: 200, sort: true }
                , { field: 'thisReading', title: '本次读数', minWidth: 200, sort: true }
                , { field: 'transferor', title: '所属厂商', minWidth: 105 }
                , { field: 'valveStatus', title: '阀门状态', minWidth: 105 } //单元格内容水平居中
                , { field: 'dn', title: '口径', minWidth: 130 } //单元格内容水平居右
                , { field: 'meno', title: '备注', minWidth: 160 }
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
            }
        });
        table.on('tool(test)', function (obj) {                                   //...test单元格工具事件（单击‘打印’触发）...//
            var data = obj.data;
            meterID = data.meterID;
            if (obj.event == 'print') {
                //   layer.open({
                //     type: 2,
                //     area: ['100%', '100%'],
                //     title: ['设备详情', 'font-size:25px; background-color: var(--grey-color); padding-left: 10px'],
                //     content: '../../sources/lib/hiprint.io/view/tablePrint.html?meterID=' + data.meterID // URL
                //   });
                var printData = {}
                $.ajax({                                                //
                    type: 'get'
                    , url: '../../api/print.php'
                    , data: {
                        getData: meterID
                    }
                    , success: function (res) {
                        console.log(res)
                        printData = res.data
                    }
                })
                var hiprintTemplate;
                $.ajax({                                                //
                    type: 'get'
                    , url: '../../api/tablePrint.php'
                    , data: {
                        getData: '默认模板'
                    }
                    , success: function (res) {
                        //初始化打印插件
                        hiprint.init({
                            providers: [new customElementTypeProvider()]
                        });
                        customPrintJson = res   //读取模板JSON
                        hiprintTemplate = new hiprint.PrintTemplate({
                            template: customPrintJson,
                            settingContainer: '#PrintElementOptionSetting',
                            paginationContainer: '.hiprint-printPagination'
                        });
                        // $('#hiprint-printTemplate').html('');
                        // hiprintTemplate.design('#hiprint-printTemplate');
                        hiprintTemplate.print(printData);
                    }
                })
            }
        });
    })
})