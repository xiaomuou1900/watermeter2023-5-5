<?php 
 if($_GET['requestData'] ==="allrole")
{
    $data = '{
        "status": 0, 
        "msg": "成功", 
        "data": [
            {
                "roleNumber":"001",
                "roleName":"超级管理员",
                "time":"2023-9-18 16:10:00",
                "creator":"超级管理员",
                "meno":"系统管理"
            }
            ,{
                "roleNumber":"002",
                "roleName":"上线测试员",
                "time":"2023-9-18 16:15:00",
                "creator":"超级管理员",
                "meno":""
            }
            ,{
                "roleNumber":"003",
                "roleName":"抄表员",
                "time":"2023-9-18 16:20:00",
                "creator":"超级管理员",
                "meno":""
            }
            ,{
                "roleNumber":"004",
                "roleName":"收费员",
                "time":"2023-9-18 16:25:00",
                "creator":"超级管理员",
                "meno":""
            }
            ,{
                "roleNumber":"005",
                "roleName":"测试",
                "time":"2023-9-18 16:25:00",
                "creator":"超级管理员",
                "meno":""
            }
        ]
    }';
}
else if($_GET['requestData'] ==="超级管理员")
{
    $data = '{
        "status": 0, 
        "msg": "成功", 
        "data": [
            {
            
                "roleNumber":"100001",
                "roleName":"超级管理员",
                "time":"2023-9-18 16:10:00",
                "creator":"超级管理员",
                "meno":"系统管理"
            
            }
        ]
    }';
}
else if(($_POST['deleteroleName'] ==="超级管理员") || ($_GET['deleteroleName'] ==="超级管理员"))
{
    $data = '{
        "status": 0, 
        "msg": "成功", 
        "data": [
            {
                "roleNumber":"100002",
                "roleName":"上线测试员",
                "time":"2023-9-18 16:15:00",
                "creator":"超级管理员",
                "meno":""
            }
            ,{
                "roleNumber":"100003",
                "roleName":"抄表员",
                "time":"2023-9-18 16:20:00",
                "creator":"超级管理员",
                "meno":""
            }
            ,{
                "roleNumber":"100004",
                "roleName":"收费员",
                "time":"2023-9-18 16:25:00",
                "creator":"超级管理员",
                "meno":""
            }
        ]
    }';
}
else if($_GET['getEmpower'] ==="超级管理员")
{
    $data = '{
        "status": 0, 
        "msg": "成功",         
        "data" : [{
            "title": "业主管理",
            "id": 1,
            "checked": true,
            "children": [{
                "title": "片区管理",
                "id": 101
            }, {
                "title": "业主档案管理",
                "id": 102
            }, {
                "title": "业主换表",
                "id": 103
            }, {
                "title": "业主销表",
                "id": 104
            }, {
                "title": "过户业务",
                "id": 105
            }, {
                "title": "销户业务",
                "id": 106
            }, {
                "title": "串户调整",
                "id": 107
            }, {
                "title": "档案导入/导出",
                "id": 108
            }]
        }, {
            "title": "设备管理",
            "id": 2,
            "checked": true,
            "children": [{
                "title": "设备信息",
                "id": 201
            }, {
                "title": "设备控制",
                "id": 202
            }, {
                "title": "设备参数设置",
                "id": 203
            }, {
                "title": "预置命令查询",
                "id": 204
            }, {
                "title": "设备通信日志",
                "id": 205
            }]
        }, {
            "title": "数据报表",
            "id": 3,
            "checked": true,
            "children": [{
                "title": "抄表数据查询",
                "id": 301
            }, {
                "title": "设备用量查询",
                "id": 302
            }, {
                "title": "设备状态查询",
                "id": 303
            }, {
                "title": "异常报警查询",
                "id": 304
            }, {
                "title": "剩余水量查询",
                "id": 305
            }]
        }, {
            "title": "营收业务",
            "id": 4,
            "checked": true,
            "children": [{
                "title": "充值缴费",
                "id": 401
            }, {
                "title": "费用退还",
                "id": 402
            }, {
                "title": "账户查询",
                "id": 403
            }, {
                "title": "扣费查询",
                "id": 404
            }, {
                "title": "交退费统计",
                "id": 405
            }, {
                "title": "欠费用户查询",
                "id": 406
            }]
        }, {
            "title": "系统配置",
            "id": 5,
            "checked": true,
            "children": [{
                "title": "计费配置",
                "id": 501
            }, {
                "title": "公司管理",
                "id": 502
            }, {
                "title": "部门管理",
                "id": 503
            }, {
                "title": "岗位管理",
                "id": 504
            }, {
                "title": "角色管理",
                "id": 505
            }, {
                "title": "用户管理",
                "id": 506
            }]
        }]
    }';
}
else if($_GET['getEmpower'] ==="上线测试员")
{
    $data = '{
        "status": 0, 
        "msg": "成功",         
        "data" : [{
            "title": "业主管理",
            "id": 1,
            "checked": true,
            "children": [{
                "title": "片区管理",
                "id": 101
            }, {
                "title": "业主档案管理",
                "id": 102
            }, {
                "title": "业主换表",
                "id": 103
            }, {
                "title": "业主销表",
                "id": 104
            }, {
                "title": "过户业务",
                "id": 105
            }, {
                "title": "销户业务",
                "id": 106
            }, {
                "title": "串户调整",
                "id": 107
            }, {
                "title": "档案导入/导出",
                "id": 108
            }]
        }, {
            "title": "设备管理",
            "id": 2,
            "checked": true,
            "children": [{
                "title": "设备信息",
                "id": 201
            }, {
                "title": "设备控制",
                "id": 202
            }, {
                "title": "设备参数设置",
                "id": 203
            }, {
                "title": "预置命令查询",
                "id": 204
            }, {
                "title": "设备通信日志",
                "id": 205
            }]
        }, {
            "title": "数据报表",
            "id": 3,
            "checked": true,
            "children": [{
                "title": "抄表数据查询",
                "id": 301,
                "fixed": true
            }, {
                "title": "设备用量查询",
                "id": 302
            }, {
                "title": "设备状态查询",
                "id": 303
            }, {
                "title": "异常报警查询",
                "id": 304
            }, {
                "title": "剩余水量查询",
                "id": 305
            }]
        }, {
            "title": "营收业务",
            "id": 4,
            "children": [{
                "title": "充值缴费",
                "id": 401
            }, {
                "title": "费用退还",
                "id": 402
            }, {
                "title": "账户查询",
                "id": 403
            }, {
                "title": "扣费查询",
                "id": 404
            }, {
                "title": "交退费统计",
                "id": 405
            }, {
                "title": "欠费用户查询",
                "id": 406
            }]
        }, {
            "title": "系统配置",
            "id": 5,
            "children": [{
                "title": "计费配置",
                "id": 501
            }, {
                "title": "公司管理",
                "id": 502
            }, {
                "title": "部门管理",
                "id": 503
            }, {
                "title": "岗位管理",
                "id": 504
            }, {
                "title": "角色管理",
                "id": 505
            }, {
                "title": "用户管理",
                "id": 506
            }]
        }]
    }';
}
else if($_GET['getEmpower'] ==="抄表员")
{
    $data = '{
        "status": 0, 
        "msg": "成功",         
        "data" : [{
            "title": "业主管理",
            "id": 1,
            "children": [{
                "title": "片区管理",
                "id": 101,
                "checked": true            
            }, {
                "title": "业主档案管理",
                "id": 102,
                "checked": true
            }, {
                "title": "业主换表",
                "id": 103
            }, {
                "title": "业主销表",
                "id": 104
            }, {
                "title": "过户业务",
                "id": 105
            }, {
                "title": "销户业务",
                "id": 106
            }, {
                "title": "串户调整",
                "id": 107
            }, {
                "title": "档案导入/导出",
                "id": 108
            }]
        }, {
            "title": "设备管理",
            "id": 2,
            "children": [{
                "title": "设备信息",
                "id": 201
            }, {
                "title": "设备控制",
                "id": 202
            }, {
                "title": "设备参数设置",
                "id": 203
            }, {
                "title": "预置命令查询",
                "id": 204
            }, {
                "title": "设备通信日志",
                "id": 205
            }]
        }, {
            "title": "数据报表",
            "id": 3,
            "checked": true,
            "children": [{
                "title": "抄表数据查询",
                "id": 301
            }, {
                "title": "设备用量查询",
                "id": 302
            }, {
                "title": "设备状态查询",
                "id": 303
            }, {
                "title": "异常报警查询",
                "id": 304
            }, {
                "title": "剩余水量查询",
                "id": 305
            }]
        }, {
            "title": "营收业务",
            "id": 4,
            "children": [{
                "title": "充值缴费",
                "id": 401
            }, {
                "title": "费用退还",
                "id": 402
            }, {
                "title": "账户查询",
                "id": 403
            }, {
                "title": "扣费查询",
                "id": 404
            }, {
                "title": "交退费统计",
                "id": 405
            }, {
                "title": "欠费用户查询",
                "id": 406
            }]
        }, {
            "title": "系统配置",
            "id": 5,
            "children": [{
                "title": "计费配置",
                "id": 501
            }, {
                "title": "公司管理",
                "id": 502
            }, {
                "title": "部门管理",
                "id": 503
            }, {
                "title": "岗位管理",
                "id": 504
            }, {
                "title": "角色管理",
                "id": 505
            }, {
                "title": "用户管理",
                "id": 506
            }]
        }]
    }';
}
else if($_GET['getEmpower'] ==="收费员")
{
    $data = '{
        "status": 0, 
        "msg": "成功",         
        "data" : [{
            "title": "业主管理",
            "id": 1,
            "children": [{
                "title": "片区管理",
                "id": 101
            }, {
                "title": "业主档案管理",
                "id": 102
            }, {
                "title": "业主换表",
                "id": 103
            }, {
                "title": "业主销表",
                "id": 104
            }, {
                "title": "过户业务",
                "id": 105
            }, {
                "title": "销户业务",
                "id": 106
            }, {
                "title": "串户调整",
                "id": 107
            }, {
                "title": "档案导入/导出",
                "id": 108
            }]
        }, {
            "title": "设备管理",
            "id": 2,
            "children": [{
                "title": "设备信息",
                "id": 201
            }, {
                "title": "设备控制",
                "id": 202
            }, {
                "title": "设备参数设置",
                "id": 203
            }, {
                "title": "预置命令查询",
                "id": 204
            }, {
                "title": "设备通信日志",
                "id": 205
            }]
        }, {
            "title": "数据报表",
            "id": 3,
            "checked": true,
            "children": [{
                "title": "抄表数据查询",
                "id": 301
            }, {
                "title": "设备用量查询",
                "id": 302
            }, {
                "title": "设备状态查询",
                "id": 303
            }, {
                "title": "异常报警查询",
                "id": 304
            }, {
                "title": "剩余水量查询",
                "id": 305
            }]
        }, {
            "title": "营收业务",
            "id": 4,
            "checked": true,
            "children": [{
                "title": "充值缴费",
                "id": 401
            }, {
                "title": "费用退还",
                "id": 402
            }, {
                "title": "账户查询",
                "id": 403
            }, {
                "title": "扣费查询",
                "id": 404
            }, {
                "title": "交退费统计",
                "id": 405
            }, {
                "title": "欠费用户查询",
                "id": 406
            }]
        }, {
            "title": "系统配置",
            "id": 5,
            "children": [{
                "title": "计费配置",
                "id": 501
            }, {
                "title": "公司管理",
                "id": 502
            }, {
                "title": "部门管理",
                "id": 503
            }, {
                "title": "岗位管理",
                "id": 504
            }, {
                "title": "角色管理",
                "id": 505
            }, {
                "title": "用户管理",
                "id": 506
            }]
        }]
    }';
}
else if($_GET['getEmpower'])
{
    $data = '{
        "status": 0, 
        "msg": "成功",         
        "data" : [{
            "title": "业主管理",
            "id": 1,
            "children": [{
                "title": "片区管理",
                "id": 101
            }, {
                "title": "业主档案管理",
                "id": 102
            }, {
                "title": "业主换表",
                "id": 103
            }, {
                "title": "业主销表",
                "id": 104
            }, {
                "title": "过户业务",
                "id": 105
            }, {
                "title": "销户业务",
                "id": 106
            }, {
                "title": "串户调整",
                "id": 107
            }, {
                "title": "档案导入/导出",
                "id": 108
            }]
        }, {
            "title": "设备管理",
            "id": 2,
            "children": [{
                "title": "设备信息",
                "id": 201
            }, {
                "title": "设备控制",
                "id": 202
            }, {
                "title": "设备参数设置",
                "id": 203
            }, {
                "title": "预置命令查询",
                "id": 204
            }, {
                "title": "设备通信日志",
                "id": 205
            }]
        }, {
            "title": "数据报表",
            "id": 3,
            "children": [{
                "title": "抄表数据查询",
                "id": 301,
                "fixed": true
            }, {
                "title": "设备用量查询",
                "id": 302
            }, {
                "title": "设备状态查询",
                "id": 303
            }, {
                "title": "异常报警查询",
                "id": 304
            }, {
                "title": "剩余水量查询",
                "id": 305
            }]
        }, {
            "title": "营收业务",
            "id": 4,
            "children": [{
                "title": "充值缴费",
                "id": 401
            }, {
                "title": "费用退还",
                "id": 402
            }, {
                "title": "账户查询",
                "id": 403
            }, {
                "title": "扣费查询",
                "id": 404
            }, {
                "title": "交退费统计",
                "id": 405
            }, {
                "title": "欠费用户查询",
                "id": 406
            }]
        }, {
            "title": "系统配置",
            "id": 5,
            "children": [{
                "title": "计费配置",
                "id": 501
            }, {
                "title": "公司管理",
                "id": 502
            }, {
                "title": "部门管理",
                "id": 503
            }, {
                "title": "岗位管理",
                "id": 504
            }, {
                "title": "角色管理",
                "id": 505
            }, {
                "title": "用户管理",
                "id": 506
            }]
        }]
    }';
}
else
{
    $data = '{"status":400,"msg":"查询参数错误！","data":null}';
   
}
header('Content-Type:application/json;charset=utf-8');
$arr = json_decode($data,true);
exit(json_encode($arr));
?>