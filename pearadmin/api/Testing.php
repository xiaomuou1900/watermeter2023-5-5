<?php 
if(isset($_GET['page'])){
    if($_GET['page'] == 0)
    {
        $data = '{"status":0,"msg":"该页无数据！","count":0,"data":null}';
        header('Content-Type:application/json;charset=utf-8');
        $arr = json_decode($data,true);
        exit(json_encode($arr));
    }
    else if($_GET['page'] > 0)
    {
        if(isset($_GET['meterID'])||isset($_GET['ICCID']))
        {
            if(($_GET['meterID']==="12345678")||($_GET['ICCID']==="8645078915875689"))
            {
                $data = '{
                    "status":0,
                    "msg":"成功",
                    "count":1,
                    "data":[
                        {
                            "meterID":"12345678",
                            "IMEI":"8645078915875689",
                            "ICCID":"89861121230425878547",
                            "VDD":3.68,
                            "SS":28,
                            "totalFlow":0.02,
                            "testFlow":0.002,
                            "reportTime":"2023-04-10 13:20:35",
                            "version":"1.02",
                            "testResult":"正在测试",
                            "testTime":"2023-04-10 08:30:00"
                        }
                    ]
                }';
            }
            else if(($_GET['meterID']==="12345679")||($_GET['ICCID']==="8645078915875621"))
            {
                $data = '{
                    "status":0,
                    "msg":"成功",
                    "count":1,
                    "data":[
                        {
                            "meterID":"12345679",
                            "IMEI":"8645078915875621",
                            "ICCID":"89861121230425878533",
                            "VDD":3.65,
                            "SS":21,
                            "totalFlow":0.04,
                            "testFlow":0.001,
                            "reportTime":"2023-04-10 13:21:35",
                            "version":"1.02",
                            "testResult":"正在测试",
                            "testTime":"2023-04-10 08:30:00"
                        }
                    ]
                }';
            }
            else
            {
                $data = '{"status":0,"msg":"数据不存在！","count":0,"data":null}';
            }
            header('Content-Type:application/json;charset=utf-8');
            $arr = json_decode($data,true);
            exit(json_encode($arr));
        }
        else if($_GET['page'] == 1)
        {
            $data = '{
                "status":0,
                "msg":"成功",
                "count":2000,
                "data":[
                    {
                        "meterID":"12345678",
                        "IMEI":"8645078915875689",
                        "ICCID":"89861121230425878547",
                        "VDD":3.68,
                        "SS":28,
                        "totalFlow":0.02,
                        "testFlow":0.002,
                        "reportTime":"2023-04-10 13:20:35",
                        "version":"1.02",
                        "testResult":"正在测试",
                        "testTime":"2023-04-10 08:30:00"
                    },
                    {
                        "meterID":"12345679",
                        "IMEI":"8645078915875621",
                        "ICCID":"89861121230425878533",
                        "VDD":3.65,
                        "SS":21,
                        "totalFlow":0.04,
                        "testFlow":0.001,
                        "reportTime":"2023-04-10 13:21:35",
                        "version":"1.02",
                        "testResult":"正在测试",
                        "testTime":"2023-04-10 08:30:00"
                    }
                ]
            }';
            header('Content-Type:application/json;charset=utf-8');
            $arr = json_decode($data,true);
            exit(json_encode($arr));
        }
        else if($_GET['page'] == 2)
        {
            $data = '{
                "status":0,
                "msg":"成功",
                "count":2000,
                "data":[
                    {
                        "meterID":"12345678",
                        "IMEI":"8645078915875689",
                        "ICCID":"89861121230425878547",
                        "VDD":3.68,
                        "SS":28,
                        "totalFlow":0.02,
                        "testFlow":0.002,
                        "reportTime":"2023-04-10 13:20:35",
                        "version":"1.02",
                        "testResult":"正在测试",
                        "testTime":"2023-04-10 08:30:00"
                    },
                    {
                        "meterID":"12345679",
                        "IMEI":"8645078915875621",
                        "ICCID":"89861121230425878533",
                        "VDD":3.65,
                        "SS":21,
                        "totalFlow":0.04,
                        "testFlow":0.001,
                        "reportTime":"2023-04-10 13:21:35",
                        "version":"1.02",
                        "testResult":"正在测试",
                        "testTime":"2023-04-10 08:30:00"
                    },
                    {
                        "meterID":"12345679",
                        "IMEI":"8645078915875621",
                        "ICCID":"89861121230425878533",
                        "VDD":3.65,
                        "SS":21,
                        "totalFlow":0.04,
                        "testFlow":0.001,
                        "reportTime":"2023-04-10 13:21:35",
                        "version":"1.02",
                        "testResult":"正在测试",
                        "testTime":"2023-04-10 08:30:00"
                    }

                ]
            }';
            header('Content-Type:application/json;charset=utf-8');
            $arr = json_decode($data,true);
            exit(json_encode($arr));
        }
    }
}
else
{
    $data = '{"status":400,"msg":"页码参数错误！","count":0,"data":null}';
    header('Content-Type:application/json;charset=utf-8');
    $arr = json_decode($data,true);
    exit(json_encode($arr));
}

// if(isset($_POST['username'])){


// $input = file_get_contents("php://input");

// $input = json_decode($input,true);

// $data = '{"name":"'.$input["username"].'","role":{"description": "生产测试","name": "生产测试","permission": "product;system,vendor"},"belongs":"LIANLIFT"}';

// $data = '{"name":"'.$_POST['username'].'","role":{"description": "生产测试","name": "生产测试","permission": "product;system,vendor"},"belongs":"LIANLIFT"}';

// //$data = '{"name":"llmd001","role":{"description": "生产测试","name": "生产测试","permission": "product;system,vendor"},"belongs":"LIANLIFT"}';

// header('Content-Type:application/json;charset=utf-8');

// $arr = json_decode($data,true);

// exit(json_encode($arr));

//echo $data;
//exit($data);

//exit($input['username']);
//{description: '生产测试',name: '生产测试',permission: 'product;system,vendor'}
// }
?>