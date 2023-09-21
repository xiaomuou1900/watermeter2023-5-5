<?php 
 if(($_GET['data_id'] ==="0001") && ($_GET['requestData'] === "all"))
{
    $data = '{
        "status": 0, 
        "msg": "成功", 
        "companyName":"连云港连利福思特表业有限公司 连云港连利福思特表业有限公司",
        "data": [
            {
                "account":"abcd",
                "name":"秦川",
                "department":"生产部",
                "role":"超级管理员",
                "phoneNumber":"1381234567",
                "meno":"玉树临风",
                "password":"123456"
            }
            , {
                "account":"lueluelue",
                "name":"宛如",
                "department":"电子部",
                "role":"收费员",
                "phoneNumber":"1381234567",
                "meno":"美若天仙",
                "password":"123456"
            }
            , {
                "account":"efgh",
                "name":"张三",
                "department":"质检部",
                "role":"超级管理员",
                "phoneNumber":"1381234567",
                "meno":"幽默",
                "password":"123456"
            }
        ]
    }';
}
else if(($_GET['data_id'] ==="0002") && ($_GET['requestData'] === "all"))
{
    $data = '{
        "status": 0, 
        "msg": "成功", 
        "companyName":"连云港福瑞希表业有限公司",
        "data": [
            {
                "account":"abcd22",
                "name":"秦川22",
                "department":"生产部",
                "role":"超级管理员",
                "phoneNumber":"138123456722",
                "meno":"玉树临风22",
                "password":"123456"
            }
            , {
                "account":"lueluelue",
                "name":"宛如",
                "department":"质检部",
                "role":"收费员",
                "phoneNumber":"1381234567",
                "meno":"美若天仙",
                "password":"123456"
            }
            , {
                "account":"efgh",
                "name":"张三",
                "department":"生产部",
                "role":"超级管理员",
                "phoneNumber":"1381234567",
                "meno":"幽默",
                "password":"123456"
            }
        ]
    }';
}
else if(($_GET['data_id'] ==="0003") && ($_GET['requestData'] === "all"))
{
    $data = '{
        "status": 0, 
        "msg": "成功", 
        "companyName":"点点滴滴表业有限公司",
        "data": [
            {
                "account":"abcd33",
                "name":"秦川33",
                "department":"嘻嘻部",
                "role":"超级管理员",
                "phoneNumber":"1381234567",
                "meno":"玉树临风",
                "password":"123456"
            }
            , {
                "account":"lueluelue",
                "name":"宛如",
                "department":"哈哈部",
                "role":"收费员",
                "phoneNumber":"1381234567",
                "meno":"美若天仙",
                "password":"123456"
            }
            , {
                "account":"efgh",
                "name":"张三",
                "department":"哈哈部",
                "role":"超级管理员",
                "phoneNumber":"1381234567",
                "meno":"幽默",
                "password":"123456"
            }
        ]
    }';
}
else if(($_GET['data_id'] ==="0004") && ($_GET['requestData'] === "all"))
{
    $data = '{
        "status": 0, 
        "msg": "成功", 
        "companyName":"爱护环境表业有限公司",
        "data": [
            {
                "account":"abcd44",
                "name":"秦川44",
                "department":"月亮部",
                "role":"超级管理员44",
                "phoneNumber":"1381234567",
                "meno":"玉树临风",
                "password":"123456"
            }
            , {
                "account":"lueluelue",
                "name":"宛如",
                "department":"月亮部",
                "role":"收费员",
                "phoneNumber":"1381234567",
                "meno":"美若天仙",
                "password":"123456"
            }
            , {
                "account":"efgh",
                "name":"张三",
                "department":"星星部",
                "role":"超级管理员",
                "phoneNumber":"1381234567",
                "meno":"幽默",
                "password":"123456"
            }
        ]
    }';
}
else if(($_GET['data_id'] ==="0001") && ($_GET['requestData'] ==="电子技术研发部"))
{
    $data = '{
        "status": 0, 
        "msg": "成功", 
        "data": [
            {
                "departmentName":"电子技术研发部",
                "departmentNumber":"001",
                "meno":"测试"
            }
        ]
    }';
}
else if(($_POST['data_id'] ==="0001") && ($_POST['deletedepartmentName'] ==="电子技术研发部"))
{
    $data = '{
        "status": 0, 
        "msg": "成功"
    }';
}
else if(($_GET['data_id'] ==="0001") && ($_GET['deletedepartmentName'] ==="电子技术研发部"))
{
    $data = '{
        "status": 0, 
        "msg": "成功", 
        "data": [
            {
                "departmentName":"生产部",
                "departmentNumber":"002",
                "meno":"测试"
            }
            ,{
                "departmentName":"质检部",
                "departmentNumber":"003",
                "meno":"测试"
            }
        ]
    }';
}
else if($_POST['operate'] )
{
    $data = '{
        "status": 0, 
        "msg": "成功", 
        "data": [
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