<?php 
if(isset($_GET['meterID'])){
    if(($_GET['meterID'] == null)||($_GET['meterID'] == ""))
    {
        $data = '{"status":201,"msg":"查询参数错误！","data":null}';
        header('Content-Type:application/json;charset=utf-8');
        $arr = json_decode($data,true);
        exit(json_encode($arr));
    }
    else if($_GET['meterID'] ==="12345678")
    {
        $data = '{
            "status": 200, 
            "msg": "成功", 
            "data": {
                "VDD": [
                    3.68, 
                    3.65, 
                    3.62, 
                    3.68, 
                    3.64, 
                    3.63, 
                    3.61, 
                    3.68, 
                    3.72, 
                    3.7
                ], 
                "CSQ": [
                    12, 
                    15, 
                    30, 
                    25, 
                    24, 
                    26, 
                    12, 
                    24, 
                    26, 
                    21
                ], 
                "UploadTime": [
                    "2023-05-01 01:30:47", 
                    "2023-05-02 01:30:47", 
                    "2023-05-03 01:30:47", 
                    "2023-05-04 01:30:47", 
                    "2023-05-05 01:30:47", 
                    "2023-05-06 01:30:47", 
                    "2023-05-07 01:30:47", 
                    "2023-05-08 01:30:47", 
                    "2023-05-09 01:30:47", 
                    "2023-05-10 01:30:47"
                ]
            }
        }';
            header('Content-Type:application/json;charset=utf-8');
            $arr = json_decode($data,true);
            exit(json_encode($arr));
    }
    else if($_GET['meterID'] ==="12345679")
    {
        $data = '{
            "status": 200, 
            "msg": "成功", 
            "data": {
                "VDD": [
                    3.63, 
                    3.61, 
                    3.67, 
                    3.62, 
                    3.61, 
                    3.63, 
                    3.61, 
                    3.68, 
                    3.71, 
                    3.7
                ], 
                "CSQ": [
                    16, 
                    12, 
                    21, 
                    23, 
                    24, 
                    26, 
                    15, 
                    17, 
                    26, 
                    29
                ], 
                "UploadTime": [
                    "2023-05-01 02:30:47", 
                    "2023-05-02 02:30:47", 
                    "2023-05-03 02:30:47", 
                    "2023-05-04 02:30:47", 
                    "2023-05-05 02:30:47", 
                    "2023-05-06 02:30:47", 
                    "2023-05-07 02:30:47", 
                    "2023-05-08 02:30:47", 
                    "2023-05-09 02:30:47", 
                    "2023-05-10 02:30:47"
                ]
            }
        }';
            header('Content-Type:application/json;charset=utf-8');
            $arr = json_decode($data,true);
            exit(json_encode($arr));
    }
    else
    {
        $data = '{"status":201,"msg":"未查到该表！","data":null}';
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