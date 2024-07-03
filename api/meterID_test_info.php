<?php 
if(($_POST['operate']==="restart") || ($_POST['operate']==="restore_factory") || ($_POST['operate']==="clean_exceptions") || ($_POST['operate']==="syncReading") || ($_POST['operate']==="enterServiceMode") || ($_POST['operate']==="retest") || ($_POST['operate']==="forcedFailure") || ($_POST['operate']==="deleteDevice") || ($_POST['operate']==="inbound") || ($_POST['operate']==="tranfer"))
{
    $data = '{
        "status":0,
        "msg":"成功"
    }';
}
else if ($_GET['getData']==="grantee") {
    $data = '{
        "status":0,
        "msg":"成功",
        "grantee":["厂商1","厂商2","厂商3","厂商4","厂商5"]
    }';
}
else if(($_GET['meterID']==="00000001") && ($_GET['getData']==="设备状态") && ($_GET['user']==="lianlifst") )
{
    $data = '{
        "status":0,
        "msg":"成功",
        "deviceStatus": "正在测试"
    }';
}
else if(($_GET['meterID']==="00000002") && ($_GET['getData']==="设备状态") && ($_GET['user']==="lianlifst") )
{
    $data = '{
        "status":0,
        "msg":"成功",
        "deviceStatus": "测试通过"
    }';
}
else if(($_GET['meterID']==="00000003") && ($_GET['getData']==="设备状态") && ($_GET['user']==="lianlifst") )
{
    $data = '{
        "status":0,
        "msg":"成功",
        "deviceStatus": "已入库"
    }';
}
else if(($_GET['meterID']==="00000004") && ($_GET['getData']==="设备状态") && ($_GET['user']==="lianlifst") )
{
    $data = '{
        "status":0,
        "msg":"成功",
        "deviceStatus": "未绑定"
    }';
}
else if(($_GET['meterID']==="00000005") && ($_GET['getData']==="设备状态") && ($_GET['user']==="lianlifst") )
{
    $data = '{
        "status":0,
        "msg":"成功",
        "deviceStatus": "已绑定"
    }';
}
else if (($_GET['meterID']==="00000001") && ($_GET['getContent']==="基础信息") && ($_GET['user']==="lianlifst"))
{
    $data = '{
        "status":0,
        "msg":"成功",
        "data":[
            {
                "meterID":"00000001",
                "IMEI":"8645078915875689",
                "ICCID":"89861121230425878547",
                "deviceStatus":"正在测试",
                "VDD":"3.2",
                "CSQ":"12",
                "totalFlow":"20.001m³",
                "testFlow":"0.2m³",
                "lastReportTime":"2023-9-28 11:10:05",
                "version":"v1.0",
                "testResult":"读数故障",
                "testTime":"2023-9-28 11:10:05"
            }
        ]
    }';
}
else if(($_GET['meterID']==="00000001") && ($_GET['getContent']==="详情列表") && ($_GET['user']==="lianlifst"))
{
    $data = '{
        "status":0,
        "msg":"成功",
        "data":[
            {
                "reportProject":"状态",
                "parameter":"信号强度 30;电池电压 3.7V",
                "time":"2023-09-28 03:41:20"
            }
        ]
    }';
}
else if (($_GET['meterID']==="00000002") && ($_GET['getContent']==="基础信息") && ($_GET['user']==="lianlifst"))
{
    $data = '{
        "status":0,
        "msg":"成功",
        "data":[
            {
                "meterID":"00000002",
                "IMEI":"8645078915875689",
                "ICCID":"89861121230425878547",
                "deviceStatus":"测试通过",
                "VDD":"3.2",
                "CSQ":"12",
                "totalFlow":"20.001m³",
                "testFlow":"0.2m³",
                "lastReportTime":"2023-9-28 11:10:05",
                "version":"v1.0",
                "testResult":"测试通过",
                "testTime":"2023-9-28 11:10:05"
            }
        ]
    }';
}
else if(($_GET['meterID']==="00000002") && ($_GET['getContent']==="详情列表") && ($_GET['user']==="lianlifst"))
{
    $data = '{
        "status":0,
        "msg":"成功",
        "data":[
            {
                "reportProject":"状态",
                "parameter":"信号强度 30;电池电压 3.7V",
                "time":"2023-09-28 03:41:20"
            }
        ]
    }';
}
else if (($_GET['meterID']==="00000003") && ($_GET['getContent']==="基础信息") && ($_GET['user']==="lianlifst"))
{
    $data = '{
        "status":0,
        "msg":"成功",
        "data":[
            {
                "meterID":"00000003",
                "IMEI":"8645078915875689",
                "ICCID":"89861121230425878547",
                "deviceStatus":"已入库",
                "VDD":"3.2",
                "CSQ":"12",
                "totalFlow":"20.001m³",
                "testFlow":"0.2m³",
                "lastReportTime":"2023-9-28 11:10:05",
                "version":"v1.0",
                "testTime":"2023-9-28 11:10:05"
            }
        ]
    }';
}
else if(($_GET['meterID']==="00000003") && ($_GET['getContent']==="详情列表") && ($_GET['user']==="lianlifst"))
{
    $data = '{
        "status":0,
        "msg":"成功",
        "data":[
            {
                "reportProject":"状态",
                "parameter":"信号强度 30;电池电压 3.7V",
                "time":"2023-09-28 03:41:20"
            }
        ]
    }';
}
else if (($_GET['meterID']==="00000004") && ($_GET['getContent']==="基础信息") && ($_GET['user']==="lianlifst"))
{
    $data = '{
        "status":0,
        "msg":"成功",
        "data":[
            {
                "meterID":"00000004",
                "IMEI":"8645078915875689",
                "ICCID":"89861121230425878547",
                "deviceStatus":"未绑定",
                "VDD":"3.2",
                "CSQ":"12",
                "totalFlow":"20.001m³",
                "testFlow":"0.2m³",
                "lastReportTime":"2023-9-28 11:10:05",
                "version":"v1.0",
                "testTime":"2023-9-28 11:10:05"
            }
        ]
    }';
}
else if(($_GET['meterID']==="00000004") && ($_GET['getContent']==="详情列表") && ($_GET['user']==="lianlifst"))
{
    $data = '{
        "status":0,
        "msg":"成功",
        "data":[
            {
                "reportProject":"状态",
                "parameter":"信号强度 30;电池电压 3.7V",
                "time":"2023-09-28 03:41:20"
            }
        ]
    }';
}
else if (($_GET['meterID']==="00000005") && ($_GET['getContent']==="基础信息") && ($_GET['user']==="lianlifst"))
{
    $data = '{
        "status":0,
        "msg":"成功",
        "data":[
            {
                "meterID":"00000005",
                "IMEI":"8645078915875689",
                "ICCID":"89861121230425878547",
                "deviceStatus":"已绑定",
                "VDD":"3.2",
                "CSQ":"12",
                "totalFlow":"20.001m³",
                "testFlow":"0.2m³",
                "lastReportTime":"2023-9-28 11:10:05",
                "version":"v1.0",
                "testTime":"2023-9-28 11:10:05"
            }
        ]
    }';
}
else
{
    $data = '{"status":400,"msg":"查询错误！","data":null}';
   
}
header('Content-Type:application/json;charset=utf-8');
$arr = json_decode($data,true);
exit(json_encode($arr));
?>