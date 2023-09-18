<?php 
 if(($_GET['data_id'] ==="0001") && ($_GET['requestData'] === "allDepartment"))
{
    $data = '{
        "status": 0, 
        "msg": "成功", 
        "companyName":"连云港连利福思特表业有限公司 连云港连利福思特表业有限公司",
        "data": [
            {
                "departmentName":"电子技术研发部",
                "departmentNumber":"001",
                "meno":"测试"
            }
            ,{
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
else if(($_GET['data_id'] ==="0002") && ($_GET['requestData'] === "allDepartment"))
{
    $data = '{
        "status": 0, 
        "msg": "成功", 
        "companyName":"连云港福瑞希表业有限公司",
        "data": [
            {
                "departmentName":"生产部",
                "departmentNumber":"001",
                "meno":"测试"
            }
            ,{
                "departmentName":"质检部",
                "departmentNumber":"002",
                "meno":"测试"
            }
        ]
    }';
}
else if(($_GET['data_id'] ==="0003") && ($_GET['requestData'] === "allDepartment"))
{
    $data = '{
        "status": 0, 
        "msg": "成功", 
        "companyName":"点点滴滴表业有限公司",
        "data": [
            {
                "departmentName":"嘻嘻部",
                "departmentNumber":"001",
                "meno":"测试"
            }
            ,{
                "departmentName":"哈哈部",
                "departmentNumber":"002",
                "meno":"测试"
            }
        ]
    }';
}
else if(($_GET['data_id'] ==="0004") && ($_GET['requestData'] === "allDepartment"))
{
    $data = '{
        "status": 0, 
        "msg": "成功", 
        "companyName":"爱护环境表业有限公司",
        "data": [
            {
                "departmentName":"月亮部",
                "departmentNumber":"001",
                "meno":"测试"
            }
            ,{
                "departmentName":"星星部",
                "departmentNumber":"002",
                "meno":"测试"
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
else
{
    $data = '{"status":400,"msg":"未查到相关数据！","data":null}';
   
}
header('Content-Type:application/json;charset=utf-8');
$arr = json_decode($data,true);
exit(json_encode($arr));
?>