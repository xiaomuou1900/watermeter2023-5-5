<?php 
if(isset($_GET['getData'])){
    if(($_GET['getData'] == null)||($_GET['getData'] == ""))
    {
        $data = '{"status":201,"msg":"查询参数错误！","data":null}';
        header('Content-Type:application/json;charset=utf-8');
        $arr = json_decode($data,true);
        exit(json_encode($arr));
    }
    else if($_GET['getData'] ==="设备编号")
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
                    "lastReading":"100m³",
                    "thisReading":"150m³",
                    "transferStatus":"未转让",
                    "transferor":"哈哈水表",
                    "valveStatus":"",
                    "dn":"DN15",
                    "meno":"测试",
                    "VDD": 3.67,
                    "CSQ": 20
                }                
            ]
        }';
        header('Content-Type:application/json;charset=utf-8');
        $arr = json_decode($data,true);
        exit(json_encode($arr));
    }
    else if($_GET['getData'] ==="所属厂商")
    {
        $data = '{
            "status":0,
            "msg":"成功",
            "count":3,
            "data":[
                { 
                    "meterID":"12345677",
                    "IMEI":"8645078915875621",
                    "ICCID":"89861121230425878533",
                    "lastReading":"100m³",
                    "thisReading":"150m³",
                    "transferor":"连利水表",
                    "valveStatus":"阀门已开",
                    "dn":"DN15",
                    "meno":"测试",
                    "VDD":3.2,
                    "CSQ":13
                },
                {
                    "meterID":"12345678",
                    "IMEI":"8645078915875689",
                    "ICCID":"89861121230425878547",
                    "lastReading":"100m³",
                    "thisReading":"150m³",
                    "transferor":"连利水表",
                    "valveStatus":"",
                    "dn":"DN15",
                    "meno":"测试",
                    "VDD": 3.67,
                    "CSQ": 20
                },
                {
                    "meterID":"12345679",
                    "IMEI":"8645078915875689",
                    "ICCID":"89861121230425878547",
                    "lastReading":"100m³",
                    "thisReading":"150m³",
                    "transferor":"连利水表",
                    "valveStatus":"",
                    "dn":"DN15",
                    "meno":"测试",
                    "VDD": 3.67,
                    "CSQ": 8
                }
            ]
        }';
        header('Content-Type:application/json;charset=utf-8');
        $arr = json_decode($data,true);
        exit(json_encode($arr));
    }
    else if($_GET['getData'] ==="备注")
    {
        $data = '{
            "status":0,
            "msg":"成功",
            "count":2,
            "data":[
                { 
                    "meterID":"12345679",
                    "IMEI":"8645078915875621",
                    "ICCID":"89861121230425878533",
                    "transferStatus":"已转让",
                    "transferor":"连利水表",
                    "valveStatus":"阀门已开",
                    "dn":"DN15",
                    "meno":"测试",
                    "VDD":3.2,
                    "CSQ":13
                },
                {
                    "meterID":"12345678",
                    "IMEI":"8645078915875689",
                    "ICCID":"89861121230425878547",
                    "transferStatus":"未转让",
                    "transferor":"连利水表",
                    "valveStatus":"",
                    "dn":"DN15",
                    "meno":"测试",
                    "VDD": 3.67,
                    "CSQ": 20
                }
            ]
        }';
        header('Content-Type:application/json;charset=utf-8');
        $arr = json_decode($data,true);
        exit(json_encode($arr));
    }
    else if($_GET['getData'] ==="12345677")
    {
        $data = '{
            "status":0,
            "msg":"成功",
            "count":2,
            "data":
            {
                    "userAddress": "明星花园8-6-101",
                    "userID": "12345677",
                    "receiptNo":"888888",
                    "chargeDate":"2023-6-20",
                    "table": [
                        { "lastReadTime": "2023-5-1", "lastRead": "1000", "thisReadTime": "2023-6-1", "thisRead": "1100", "waterUsage": "100", "unitPrice": "3.3", "money":"330"}
                    ],
                    "moneyCapital":"叁佰叁拾元",
                    "drawer":"韩梅梅",
                    "date":"2023 05 06",
                    "costName":"居民用水",
                    "unit":"吨",
                    "waterUsage":"20",
                    "unit_price":"3.3",
                    "price":"66",
                    "tax_rate":"3%",
                    "tax":"1.98",
                    "total_price_cap":"陆拾柒元玖角捌分",
                    "total_price_small":"￥67.98",
                    "seller":"乐呵呵自来水公司",
                    "payee":"小红"
                    
                }
            
        }';
        header('Content-Type:application/json;charset=utf-8');
        $arr = json_decode($data,true);
        exit(json_encode($arr));
    }
    else if($_GET['getData'] ==="12345678")
    {
        $data = '{
            "status":0,
            "msg":"成功",
            "count":2,
            "data":
            {
                    "userAddress": "明星花园8-6-101",
                    "userID": "12345678",
                    "receiptNo":"888888",
                    "chargeDate":"2023-6-20",
                    "table": [
                        { "lastReadTime": "2023-5-1", "lastRead": "1000", "thisReadTime": "2023-6-1", "thisRead": "1100", "waterUsage": "100", "unitPrice": "3.3", "money":"330"}
                    ],
                    "moneyCapital":"叁佰叁拾元",
                    "drawer":"韩梅梅",
                    "date":"2023 05 06",
                    "costName":"居民用水",
                    "unit":"吨",
                    "waterUsage":"20",
                    "unit_price":"3.3",
                    "price":"66",
                    "tax_rate":"3%",
                    "tax":"1.98",
                    "total_price_cap":"陆拾柒元玖角捌分",
                    "total_price_small":"67.98",
                    "seller":"乐呵呵自来水公司",
                    "payee":"小红" 
                }
            
        }';
        header('Content-Type:application/json;charset=utf-8');
        $arr = json_decode($data,true);
        exit(json_encode($arr));
    }
    else if($_GET['getData'] ==="12345679")
    {
        $data = '{
            "status":0,
            "msg":"成功",
            "count":2,
            "data":
            {
                    "userAddress": "明星花园8-6-101",
                    "userID": "12345679",
                    "receiptNo":"888888",
                    "chargeDate":"2023-6-20",
                    "table": [
                        { "lastReadTime": "2023-5-1", "lastRead": "1000", "thisReadTime": "2023-6-1", "thisRead": "1100", "waterUsage": "100", "unitPrice": "3.3", "money":"330"}
                    ],
                    "moneyCapital":"叁佰叁拾元",
                    "drawer":"韩梅梅",
                    "date":"2023 05 06",
                    "costName":"居民用水",
                    "unit":"吨",
                    "waterUsage":"20",
                    "unit_price":"3.3",
                    "price":"66",
                    "tax_rate":"3%",
                    "tax":"1.98",
                    "total_price_cap":"陆拾柒元玖角捌分",
                    "total_price_small":"67.98",
                    "seller":"乐呵呵自来水公司",
                    "payee":"小红"
                }
            
        }';
        header('Content-Type:application/json;charset=utf-8');
        $arr = json_decode($data,true);
        exit(json_encode($arr));
    }
    else
    {
        $data = '{"status":201,"msg":"读取模板失败！","data":null}';
        header('Content-Type:application/json;charset=utf-8');
        $arr = json_decode($data,true);
        exit(json_encode($arr));
    }
}
else
{
    $data = '{"status":400,"msg":"查询参数错误！","data":null}';
    header('Content-Type:application/json;charset=utf-8');
    $arr = json_decode($data,true);
    exit(json_encode($arr));
}

?>

