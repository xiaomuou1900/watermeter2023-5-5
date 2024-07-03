<?php 
if($_GET['userName'] === "a") {
    $data = '{
        "status": 0, 
        "msg": "成功", 
        "data": [
            {
                "title": "业主管理",
                "id": 1,
                "icon": "iconfont icon-yezhu-mian",
                "type": 0,
                "href": "",
                "children": [
                    {
                        "title": "片区管理",
                        "id": 101,
                        "icon": "iconfont icon-quyuguanli",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "业主档案管理",
                        "id": 102,
                        "icon": "iconfont icon-renyuandanganguanli",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "业主换表",
                        "id": 103,
                        "icon": "iconfont icon-huanbiao",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "业主销表",
                        "id": 104,
                        "icon": "iconfont icon-zhuxiaologout7",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "过户业务",
                        "id": 105,
                        "icon": "iconfont icon-iconfontzhizuobiaozhun02969696",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "销户业务",
                        "id": 106,
                        "icon": "iconfont icon-zhuxiao",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "串户调整",
                        "id": 107,
                        "icon": "iconfont icon-tiaozheng",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "档案导入/导出",
                        "id": 108,
                        "icon": "iconfont icon-dangan",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    }
                ]
            },
            {
                "title": "设备管理",
                "id": 2,
                "icon": "iconfont icon-shebeiguanli",
                "type": 0,
                "href": "",
                "children": [
                    {
                        "title": "设备信息",
                        "id": 201,
                        "icon": "iconfont icon-a-19-shebeixinxiguanli",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "设备控制",
                        "id": 202,
                        "icon": "iconfont icon-shezhi",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "设备参数设置",
                        "id": 203,
                        "icon": "iconfont icon-canshushezhi",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "预置命令查询",
                        "id": 204,
                        "icon": "iconfont icon-shujuchaxun1",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "设备通信日志",
                        "id": 205,
                        "icon": "iconfont icon-rizhi",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    }
                ]
            },
            {
                "title": "数据报表",
                "id": 3,
                "icon": "iconfont icon-zhexiantu",
                "type": 0,
                "href": "",
                "children": [
                    {
                        "title": "抄表数据查询",
                        "id": 301,
                        "icon": "iconfont icon-shujuchaxun",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "设备用量查询",
                        "id": 302,
                        "icon": "iconfont icon-yongliangtongji",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "设备状态查询",
                        "id": 303,
                        "icon": "iconfont icon-zhuangtai",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "异常报警查询",
                        "id": 304,
                        "icon": "iconfont icon-yuexianyichangchaxun",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "剩余水量查询",
                        "id": 305,
                        "icon": "iconfont icon-shengyuliang",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    }
                ]
            },
            {
                "title": "营收业务",
                "id": 4,
                "icon": "iconfont icon-jiaoyi",
                "type": 0,
                "href": "",
                "children": [
                    {
                        "title": "充值缴费",
                        "id": 401,
                        "icon": "iconfont icon-chongzhijiaofei",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "费用退还",
                        "id": 402,
                        "icon": "iconfont icon-tuibaozhengjin",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "账户查询",
                        "id": 403,
                        "icon": "iconfont icon-zhanghuchaxun",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "扣费查询",
                        "id": 404,
                        "icon": "iconfont icon-kouchuyajin",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "交退费统计",
                        "id": 405,
                        "icon": "iconfont icon-caiwuguanli",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "欠费用户查询",
                        "id": 406,
                        "icon": "iconfont icon-Arrears",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    }
                ]
            },
            {
                "title": "系统配置",
                "id": 5,
                "icon": "iconfont icon-xitongpeizhi",
                "type": 0,
                "href": "",
                "children": [
                    {
                        "title": "计费配置",
                        "id": 501,
                        "icon": "iconfont icon-jifeiguanli",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "公司管理",
                        "id": 502,
                        "icon": "iconfont icon-gongsiguanli",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "部门管理",
                        "id": 503,
                        "icon": "iconfont icon-bumenguanli",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "角色管理",
                        "id": 505,
                        "icon": "iconfont icon-jiaoseguanli",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "用户管理",
                        "id": 506,
                        "icon": "iconfont icon-yonghuguanli",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    }
                ]
            }
        ]
    }';
}
else if($_GET['userName'] === "b")
{
    $data = '{
        "status": 0, 
        "msg": "成功", 
        "companyName":"连云港连利福思特表业有限公司 连云港连利福思特表业有限公司",
        "data": [
            {
                "title": "业主管理",
                "id": 1,
                "icon": "iconfont icon-yezhu-mian",
                "type": 0,
                "href": "",
                "children": [
                    {
                        "title": "片区管理",
                        "id": 101,
                        "icon": "iconfont icon-quyuguanli",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "业主档案管理",
                        "id": 102,
                        "icon": "iconfont icon-renyuandanganguanli",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "业主换表",
                        "id": 103,
                        "icon": "iconfont icon-huanbiao",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "业主销表",
                        "id": 104,
                        "icon": "iconfont icon-zhuxiaologout7",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "过户业务",
                        "id": 105,
                        "icon": "iconfont icon-iconfontzhizuobiaozhun02969696",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "销户业务",
                        "id": 106,
                        "icon": "iconfont icon-zhuxiao",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "串户调整",
                        "id": 107,
                        "icon": "iconfont icon-tiaozheng",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "档案导入/导出",
                        "id": 108,
                        "icon": "iconfont icon-dangan",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    }
                ]
            },
            {
                "title": "设备管理",
                "id": 2,
                "icon": "iconfont icon-shebeiguanli",
                "type": 0,
                "href": "",
                "children": [
                    {
                        "title": "设备信息",
                        "id": 201,
                        "icon": "iconfont icon-a-19-shebeixinxiguanli",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "设备控制",
                        "id": 202,
                        "icon": "iconfont icon-shezhi",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "设备参数设置",
                        "id": 203,
                        "icon": "iconfont icon-canshushezhi",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "预置命令查询",
                        "id": 204,
                        "icon": "iconfont icon-shujuchaxun1",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "设备通信日志",
                        "id": 205,
                        "icon": "iconfont icon-rizhi",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    }
                ]
            },
            {
                "title": "数据报表",
                "id": 3,
                "icon": "iconfont icon-zhexiantu",
                "type": 0,
                "href": "",
                "children": [
                    {
                        "title": "抄表数据查询",
                        "id": 301,
                        "icon": "iconfont icon-shujuchaxun",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "设备用量查询",
                        "id": 302,
                        "icon": "iconfont icon-yongliangtongji",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "设备状态查询",
                        "id": 303,
                        "icon": "iconfont icon-zhuangtai",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "异常报警查询",
                        "id": 304,
                        "icon": "iconfont icon-yuexianyichangchaxun",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "剩余水量查询",
                        "id": 305,
                        "icon": "iconfont icon-shengyuliang",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    }
                ]
            }
        ]
    }';
}
else if($_GET['userName'] === "c")
{
    $data = '{
        "status": 0, 
        "msg": "成功", 
        "companyName":"连云港连利福思特表业有限公司 连云港连利福思特表业有限公司",
        "data": [
            {
                "title": "业主管理",
                "id": 1,
                "icon": "iconfont icon-yezhu-mian",
                "type": 0,
                "href": "",
                "children": [
                    {
                        "title": "片区管理",
                        "id": 101,
                        "icon": "iconfont icon-quyuguanli",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "业主档案管理",
                        "id": 102,
                        "icon": "iconfont icon-renyuandanganguanli",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    }
                ]
            },
            {
                "title": "数据报表",
                "id": 3,
                "icon": "iconfont icon-zhexiantu",
                "type": 0,
                "href": "",
                "children": [
                    {
                        "title": "抄表数据查询",
                        "id": 301,
                        "icon": "iconfont icon-shujuchaxun",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "设备用量查询",
                        "id": 302,
                        "icon": "iconfont icon-yongliangtongji",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "设备状态查询",
                        "id": 303,
                        "icon": "iconfont icon-zhuangtai",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "异常报警查询",
                        "id": 304,
                        "icon": "iconfont icon-yuexianyichangchaxun",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "剩余水量查询",
                        "id": 305,
                        "icon": "iconfont icon-shengyuliang",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    }
                ]
            }
        ]
    }';
}
else if($_GET['userName'] === "d")
{
    $data = '{
        "status": 0, 
        "msg": "成功", 
        "companyName":"连云港连利福思特表业有限公司 连云港连利福思特表业有限公司",
        "data": [
            {
                "title": "数据报表",
                "id": 3,
                "icon": "iconfont icon-zhexiantu",
                "type": 0,
                "href": "",
                "children": [
                    {
                        "title": "抄表数据查询",
                        "id": 301,
                        "icon": "iconfont icon-shujuchaxun",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "设备用量查询",
                        "id": 302,
                        "icon": "iconfont icon-yongliangtongji",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "设备状态查询",
                        "id": 303,
                        "icon": "iconfont icon-zhuangtai",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "异常报警查询",
                        "id": 304,
                        "icon": "iconfont icon-yuexianyichangchaxun",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "剩余水量查询",
                        "id": 305,
                        "icon": "iconfont icon-shengyuliang",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    }
                ]
            },
            {
                "title": "营收业务",
                "id": 4,
                "icon": "iconfont icon-jiaoyi",
                "type": 0,
                "href": "",
                "children": [
                    {
                        "title": "充值缴费",
                        "id": 401,
                        "icon": "iconfont icon-chongzhijiaofei",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "费用退还",
                        "id": 402,
                        "icon": "iconfont icon-tuibaozhengjin",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "账户查询",
                        "id": 403,
                        "icon": "iconfont icon-zhanghuchaxun",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "扣费查询",
                        "id": 404,
                        "icon": "iconfont icon-kouchuyajin",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "交退费统计",
                        "id": 405,
                        "icon": "iconfont icon-caiwuguanli",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    },
                    {
                        "title": "欠费用户查询",
                        "id": 406,
                        "icon": "iconfont icon-Arrears",
                        "type": 1,
                        "openType": "_iframe",
                        "href": "view/testing/meterID_test_info.html"
                    }
                ]
            }
        ]
    }';
}
else
{
    $data = '{"status":400,"msg":"未查到相关数据！","data":null}';
   
}
header('Content-Type:application/json;charset=utf-8');
$arr = json_decode($data,true);
exit(json_encode($arr));
?>