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
        if((isset($_GET['meterID'])||isset($_GET['ICCID'])||isset($_GET['IMEI'])||isset($_GET['transferStatus'])||isset($_GET['transferor'])||isset($_GET['meno'])) && (($_GET['meterID'] <> "")||($_GET['IMEI'] <> "")||($_GET['ICCID'] <> "")||($_GET['transferStatus'] <> "")||($_GET['transferor'] <> "")||($_GET['meno'] <> "")))
        {
            if(($_GET['meterID']==="12345678")||($_GET['ICCID']==="89861121230425878547")||($_GET['IMEI']==="8645078915875689"))
            {
                $data = '{
                    "status":0,
                    "msg":"成功",
                    "count":1,
                    "deviceSum":10,
                    "transferSum":5,
                    "filterNum":4,
                    "data":[
                        {
                            "meterID":"12345678",
                            "IMEI":"8645078915875689",
                            "ICCID":"89861121230425878547",
                            "transferStatus":"未转让",
                            "transferor":"连云港连利福思特表业",
                            "valveStatus":"",
                            "dn":"DN15",
                            "meno":"测试"
                        }
                    ]
                }';
            }
            else if(($_GET['meterID']==="12345679")||($_GET['ICCID']==="89861121230425878533")||($_GET['IMEI']==="8645078915875621"))
            {
                $data = '{
                    "status":0,
                    "msg":"成功",
                    "count":1,
                    "deviceSum":10,
                    "transferSum":5,
                    "filterNum":4,
                    "data":[
                        {
                            "meterID":"12345679",
                            "IMEI":"8645078915875621",
                            "ICCID":"89861121230425878533",
                            "transferStatus":"未转让",
                            "transferor":"连云港连利福思特表业",
                            "valveStatus":"阀门已开",
                            "dn":"DN15",
                            "meno":"测试"
                        }
                    ]
                }';
            }
            else if(($_GET['transferStatus']==="未转让"))
            {
                $data = '{
                    "status":0,
                    "msg":"成功",
                    "count":1,
                    "deviceSum":10,
                    "transferSum":5,
                    "filterNum":4,
                    "data":[
                        {
                            "meterID":"12345679",
                            "IMEI":"8645078915875621",
                            "ICCID":"89861121230425878533",
                            "transferStatus":"未转让",
                            "transferor":"连云港连利福思特表业",
                            "valveStatus":"阀门已开",
                            "dn":"DN15",
                            "meno":"测试"
                        }
                    ]
                }';
            }
            else if(($_GET['transferStatus']==="已转让"))
            {
                $data = '{
                    "status":0,
                    "msg":"成功",
                    "count":1,
                    "deviceSum":10,
                    "transferSum":5,
                    "filterNum":4,
                    "data":[
                        {
                            "meterID":"12345679",
                            "IMEI":"8645078915875621",
                            "ICCID":"89861121230425878533",
                            "transferStatus":"已转让",
                            "transferor":"连云港连利福思特表业",
                            "valveStatus":"阀门已开",
                            "dn":"DN15",
                            "meno":"测试"
                        }
                    ]
                }';
            }
            else if(($_GET['transferor']==="连云港连利福思特表业"))
            {
                $data = '{
                    "status":0,
                    "msg":"成功",
                    "count":1,
                    "deviceSum":10,
                    "transferSum":5,
                    "filterNum":4,
                    "data":[
                        {
                            "meterID":"12345679",
                            "IMEI":"8645078915875621",
                            "ICCID":"89861121230425878533",
                            "transferStatus":"已转让",
                            "transferor":"连云港连利福思特表业",
                            "valveStatus":"阀门已开",
                            "dn":"DN15",
                            "meno":"测试"
                        }
                    ]
                }';
            }
            else if(($_GET['transferor']==="连云港连利"))
            {
                $data = '{
                    "status":0,
                    "msg":"成功",
                    "count":1,
                    "deviceSum":10,
                    "transferSum":5,
                    "filterNum":4,
                    "data":[
                        {
                            "meterID":"12345679",
                            "IMEI":"8645078915875621",
                            "ICCID":"89861121230425878533",
                            "transferStatus":"已转让",
                            "transferor":"连云港连利",
                            "valveStatus":"阀门已开",
                            "dn":"DN15",
                            "meno":"测试"
                        }
                    ]
                }';
            }
            else if(($_GET['meno']==="测试"))
            {
                $data = '{
                    "status":0,
                    "msg":"成功",
                    "count":1,
                    "deviceSum":10,
                    "transferSum":5,
                    "filterNum":4,
                    "data":[
                        {
                            "meterID":"12345679",
                            "IMEI":"8645078915875621",
                            "ICCID":"89861121230425878533",
                            "transferStatus":"已转让",
                            "transferor":"连云港连利",
                            "valveStatus":"阀门已开",
                            "dn":"DN15",
                            "meno":"测试"
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
                "count":1000,
                "grantee":["厂商1","厂商2","厂商3","厂商4","厂商5"],
                "transferor":["连云港连利福思特表业","连云港连利"],
                "deviceSum":10,
                "transferSum":5,
                "filterNum":4,
                "data":[
                    { 
                        "meterID":"12345679",
                        "IMEI":"8645078915875621",
                        "ICCID":"89861121230425878533",
                        "transferStatus":"已转让",
                        "transferor":"连云港连利",
                        "valveStatus":"阀门已开",
                        "dn":"DN15",
                        "meno":"测试"
                    },
                    {
                        "meterID":"12345678",
                        "IMEI":"8645078915875689",
                        "ICCID":"89861121230425878547",
                        "transferStatus":"未转让",
                        "transferor":"连云港连利福思特表业",
                        "valveStatus":"",
                        "dn":"DN15",
                        "meno":"测试"
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
                "count":1000,
                "grantee":["厂商1","厂商2","厂商3","厂商4","厂商5"],
                "transferor":["连云港连利福思特表业","连云港连利"],
                "deviceSum":10,
                "transferSum":5,
                "filterNum":4,
                "data":[
                    { 
                        "meterID":"12345679",
                        "IMEI":"8645078915875621",
                        "ICCID":"89861121230425878533",
                        "transferStatus":"已转让",
                        "transferor":"连云港连利",
                        "valveStatus":"阀门已开",
                        "dn":"DN15",
                        "meno":"测试"
                    },
                    {
                        "meterID":"12345678",
                        "IMEI":"8645078915875689",
                        "ICCID":"89861121230425878547",
                        "transferStatus":"未转让",
                        "transferor":"连云港连利福思特表业",
                        "valveStatus":"",
                        "dn":"DN15",
                        "meno":"测试"
                    },
                    {
                        "meterID":"88888888",
                        "IMEI":"8645078915875689",
                        "ICCID":"89861121230425878547",
                        "transferStatus":"未转让",
                        "transferor":"连云港连利福思特表业",
                        "valveStatus":"",
                        "dn":"DN15",
                        "meno":"测试"
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