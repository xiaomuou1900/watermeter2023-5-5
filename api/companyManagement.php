<?php 
 if($_GET['requestData'] ==="allCompany")
{
    $data = '{
        "status": 0, 
        "msg": "成功", 
        "data": [
            {
                "companyName":"连云港连利福思特表业有限公司",
                "meno":"测试"
            }
            ,{
                "companyName":"连云港福瑞希表业有限公司",
                "meno":"测试"
            }
            ,{
                "companyName":"点点滴滴表业有限公司",
                "meno":"测试"
            }
            ,{
                "companyName":"爱护环境表业有限公司",
                "meno":"测试"
            }
        ]
    }';
}
else if($_GET['requestData'] ==="连云港连利福思特表业有限公司")
{
    $data = '{
        "status": 0, 
        "msg": "成功", 
        "data": [
            {
                "companyName":"连云港连利福思特表业有限公司",
                "meno":"测试"
            }
        ]
    }';
}
else if($_GET['requestData'] ==="连云港")
{
    $data = '{
        "status": 0, 
        "msg": "成功", 
        "data": [
            {
                "companyName":"连云港连利福思特表业有限公司",
                "meno":"测试"
            }
            ,{
                "companyName":"连云港福瑞希表业有限公司",
                "meno":"测试"
            }
        ]
    }';
}
else if($_GET['requestData'] ==="连云港")
{
    $data = '{
        "status": 0, 
        "msg": "成功", 
        "data": [
           
        ]
    }';
}
else if(($_POST['deleteCompanyName'] ==="连云港连利福思特表业有限公司") || ($_GET['deleteCompanyName'] ==="连云港连利福思特表业有限公司"))
{
    $data = '{
        "status": 0, 
        "msg": "成功", 
        "data": [
            {
                "companyName":"连云港福瑞希表业有限公司",
                "meno":"测试"
            }
            ,{
                "companyName":"点点滴滴表业有限公司",
                "meno":"测试"
            }
            ,{
                "companyName":"爱护环境表业有限公司",
                "meno":"测试"
            }
        ]
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