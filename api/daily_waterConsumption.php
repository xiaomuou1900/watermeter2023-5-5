<?php 
    if(isset($_GET['page']))
    {
        if ((($_GET['data_id']==="001") || ($_GET['data_id']===null)) &&(($_GET['meterID']==="") ||($_GET['meterID']=== null) ) &&(($_GET['startDate']==="") ||($_GET['startDate']=== null) )&&(($_GET['endDate']==="") ||($_GET['endDate']=== null) ))
        {
            $data = '{
                "status":0,
                "msg":"成功",
                "count":500,
                "data":[
                    {
                        "earaName":"汶川县",
                        "userNumber":"001",
                        "userName":"张三",
                        "meterType":"冷水水表",
                        "meterID":"20230010",
                        "Time":"2023-8-28",
                        "startRead":"0.22",
                        "stopRead":"0.23",
                        "usage":"0.01"
                    },
                    {
                        "earaName":"阿布县",
                        "userNumber":"001",
                        "userName":"张三",
                        "meterType":"冷水水表",
                        "meterID":"20230011",
                        "Time":"2023-8-28",
                        "startRead":"0.22",
                        "stopRead":"0.23",
                        "usage":"0.01"
                    },
                    {
                        "earaName":"茶陵县",
                        "userNumber":"001",
                        "userName":"张三",
                        "meterType":"冷水水表",
                        "meterID":"20230012",
                        "Time":"2023-8-28",
                        "startRead":"0.22",
                        "stopRead":"0.23",
                        "usage":"0.01"
                    },
                    {
                        "earaName":"炎陵县",
                        "userNumber":"001",
                        "userName":"张三",
                        "meterType":"冷水水表",
                        "meterID":"20230013",
                        "Time":"2023-8-28",
                        "startRead":"0.22",
                        "stopRead":"0.23",
                        "usage":"0.01"
                    }
                ]
            }';
        }
        else if ((($_GET['data_id']==="001") || ($_GET['data_id']===null)) &&(($_GET['meterID']==="20230010") ) &&(($_GET['startDate']==="") ||($_GET['startDate']=== null) )&&(($_GET['endDate']==="") ||($_GET['endDate']=== null) ))
        {
            $data = '{
                "status":0,
                "msg":"成功",
                "count":500,
                "data":[
                    {
                        "earaName":"汶川县",
                        "userNumber":"001",
                        "userName":"张三",
                        "meterType":"冷水水表",
                        "meterID":"20230010",
                        "Time":"2023-8-28",
                        "startRead":"0.22",
                        "stopRead":"0.23",
                        "usage":"0.01"
                    }
                ]
            }';
        }
        else if ((($_GET['data_id']==="001") || ($_GET['data_id']===null)) &&(($_GET['meterID']==="20230011")) &&(($_GET['startDate']==="") ||($_GET['startDate']=== null) )&&(($_GET['endDate']==="") ||($_GET['endDate']=== null) ))
        {
            $data = '{
                "status":0,
                "msg":"成功",
                "count":500,
                "data":[
                    {
                        "earaName":"阿布县",
                        "userNumber":"001",
                        "userName":"张三",
                        "meterType":"冷水水表",
                        "meterID":"20230011",
                        "Time":"2023-8-28",
                        "startRead":"0.22",
                        "stopRead":"0.23",
                        "usage":"0.01"
                    }
                ]
            }';
        }
        else if ((($_GET['data_id']==="001") || ($_GET['data_id']===null)) &&(($_GET['meterID']==="20230012")) &&(($_GET['startDate']==="") ||($_GET['startDate']=== null) )&&(($_GET['endDate']==="") ||($_GET['endDate']=== null) ))
        {
            $data = '{
                "status":0,
                "msg":"成功",
                "count":500,
                "data":[                  
                    {
                        "earaName":"茶陵县",
                        "userNumber":"001",
                        "userName":"张三",
                        "meterType":"冷水水表",
                        "meterID":"20230012",
                        "Time":"2023-8-28",
                        "startRead":"0.22",
                        "stopRead":"0.23",
                        "usage":"0.01"
                    }
                ]
            }';
        }
        else if ((($_GET['data_id']==="001") || ($_GET['data_id']===null)) &&(($_GET['meterID']==="20230013")) &&(($_GET['startDate']==="") ||($_GET['startDate']=== null) )&&(($_GET['endDate']==="") ||($_GET['endDate']=== null) ))
        {
            $data = '{
                "status":0,
                "msg":"成功",
                "count":500,
                "data":[                   
                    {
                        "earaName":"炎陵县",
                        "userNumber":"001",
                        "userName":"张三",
                        "meterType":"冷水水表",
                        "meterID":"20230013",
                        "Time":"2023-8-28",
                        "startRead":"0.22",
                        "stopRead":"0.23",
                        "usage":"0.01"
                    }
                ]
            }';
        }
        else if ((($_GET['data_id']==="001001") || ($_GET['data_id']===null)) &&(($_GET['meterID']==="") ||($_GET['meterID']=== null) ) &&(($_GET['startDate']==="") ||($_GET['startDate']=== null) )&&(($_GET['endDate']==="") ||($_GET['endDate']=== null) ))
        {
            $data = '{
                "status":0,
                "msg":"成功",
                "count":500,
                "data":[
                    {
                        "earaName":"汶川县",
                        "userNumber":"001",
                        "userName":"张三",
                        "meterType":"冷水水表",
                        "meterID":"20230010",
                        "Time":"2023-8-28",
                        "startRead":"0.22",
                        "stopRead":"0.23",
                        "usage":"0.01"
                    },
                    {
                        "earaName":"阿布县",
                        "userNumber":"001",
                        "userName":"张三",
                        "meterType":"冷水水表",
                        "meterID":"20230011",
                        "Time":"2023-8-28",
                        "startRead":"0.22",
                        "stopRead":"0.23",
                        "usage":"0.01"
                    },
                    {
                        "earaName":"茶陵县",
                        "userNumber":"001",
                        "userName":"张三",
                        "meterType":"冷水水表",
                        "meterID":"20230012",
                        "Time":"2023-8-28",
                        "startRead":"0.22",
                        "stopRead":"0.23",
                        "usage":"0.01"
                    },
                    {
                        "earaName":"炎陵县",
                        "userNumber":"001",
                        "userName":"张三",
                        "meterType":"冷水水表",
                        "meterID":"20230013",
                        "Time":"2023-8-28",
                        "startRead":"0.22",
                        "stopRead":"0.23",
                        "usage":"0.01"
                    }
                ]
            }';
        }
        else if ((($_GET['data_id']==="001001001") || ($_GET['data_id']===null)) &&(($_GET['meterID']==="") ||($_GET['meterID']=== null) ) &&(($_GET['startDate']==="") ||($_GET['startDate']=== null) )&&(($_GET['endDate']==="") ||($_GET['endDate']=== null) ))
        {
            $data = '{
                "status":0,
                "msg":"成功",
                "count":500,
                "data":[
                    {
                        "earaName":"汶川县",
                        "userNumber":"001",
                        "userName":"张三",
                        "meterType":"冷水水表",
                        "meterID":"20230010",
                        "Time":"2023-8-28",
                        "startRead":"0.22",
                        "stopRead":"0.23",
                        "usage":"0.01"
                    },
                    {
                        "earaName":"阿布县",
                        "userNumber":"001",
                        "userName":"张三",
                        "meterType":"冷水水表",
                        "meterID":"20230011",
                        "Time":"2023-8-28",
                        "startRead":"0.22",
                        "stopRead":"0.23",
                        "usage":"0.01"
                    }
                ]
            }';
        }
        else if ((($_GET['data_id']==="001001002") || ($_GET['data_id']===null)) &&(($_GET['meterID']==="") ||($_GET['meterID']=== null) ) &&(($_GET['startDate']==="") ||($_GET['startDate']=== null) )&&(($_GET['endDate']==="") ||($_GET['endDate']=== null) ))
        {
            $data = '{
                "status":0,
                "msg":"成功",
                "count":500,
                "data":[
                    {
                        "earaName":"茶陵县",
                        "userNumber":"001",
                        "userName":"张三",
                        "meterType":"冷水水表",
                        "meterID":"20230012",
                        "Time":"2023-8-28",
                        "startRead":"0.22",
                        "stopRead":"0.23",
                        "usage":"0.01"
                    },
                    {
                        "earaName":"炎陵县",
                        "userNumber":"001",
                        "userName":"张三",
                        "meterType":"冷水水表",
                        "meterID":"20230013",
                        "Time":"2023-8-28",
                        "startRead":"0.22",
                        "stopRead":"0.23",
                        "usage":"0.01"
                    }
                ]
            }';
        }
        else if ((($_GET['data_id']==="001001001001") || ($_GET['data_id']===null)) &&(($_GET['meterID']==="") ||($_GET['meterID']=== null) ) &&(($_GET['startDate']==="") ||($_GET['startDate']=== null) )&&(($_GET['endDate']==="") ||($_GET['endDate']=== null) ))
        {
            $data = '{
                "status":0,
                "msg":"成功",
                "count":500,
                "data":[
                    {
                        "earaName":"汶川县",
                        "userNumber":"001",
                        "userName":"张三",
                        "meterType":"冷水水表",
                        "meterID":"20230010",
                        "Time":"2023-8-28",
                        "startRead":"0.22",
                        "stopRead":"0.23",
                        "usage":"0.01"
                    }
                ]
            }';
        }
        else if ((($_GET['data_id']==="001001001002") || ($_GET['data_id']===null)) &&(($_GET['meterID']==="") ||($_GET['meterID']=== null) ) &&(($_GET['startDate']==="") ||($_GET['startDate']=== null) )&&(($_GET['endDate']==="") ||($_GET['endDate']=== null) ))
        {
            $data = '{
                "status":0,
                "msg":"成功",
                "count":500,
                "data":[
                    {
                        "earaName":"阿布县",
                        "userNumber":"001",
                        "userName":"张三",
                        "meterType":"冷水水表",
                        "meterID":"20230011",
                        "Time":"2023-8-28",
                        "startRead":"0.22",
                        "stopRead":"0.23",
                        "usage":"0.01"
                    }
                ]
            }';
        }
        else if ((($_GET['data_id']==="001001002001") || ($_GET['data_id']===null)) &&(($_GET['meterID']==="") ||($_GET['meterID']=== null) ) &&(($_GET['startDate']==="") ||($_GET['startDate']=== null) )&&(($_GET['endDate']==="") ||($_GET['endDate']=== null) ))
        {
            $data = '{
                "status":0,
                "msg":"成功",
                "count":500,
                "data":[
                    {
                        "earaName":"茶陵县",
                        "userNumber":"001",
                        "userName":"张三",
                        "meterType":"冷水水表",
                        "meterID":"20230012",
                        "Time":"2023-8-28",
                        "startRead":"0.22",
                        "stopRead":"0.23",
                        "usage":"0.01"
                    }
                ]
            }';
        }
        else if ((($_GET['data_id']==="001001002002") || ($_GET['data_id']===null)) &&(($_GET['meterID']==="") ||($_GET['meterID']=== null) ) &&(($_GET['startDate']==="") ||($_GET['startDate']=== null) )&&(($_GET['endDate']==="") ||($_GET['endDate']=== null) ))
        {
            $data = '{
                "status":0,
                "msg":"成功",
                "count":500,
                "data":[
                    {
                        "earaName":"炎陵县",
                        "userNumber":"001",
                        "userName":"张三",
                        "meterType":"冷水水表",
                        "meterID":"20230013",
                        "Time":"2023-8-28",
                        "startRead":"0.22",
                        "stopRead":"0.23",
                        "usage":"0.01"
                    }
                ]
            }';
        }
        else
        {
            $data = '{"status":0,"msg":"数据不存在！","count":0,"data":null}';  
        }
    }
    else if (($_GET['data_id']==="001") &&(($_GET['meterID']==="") ||($_GET['meterID']=== null) ) &&(($_GET['startDate']==="") ||($_GET['startDate']=== null) )&&(($_GET['endDate']==="") ||($_GET['endDate']=== null) ))
    {
        $data = '{
            "status": 200, 
            "msg": "成功", 
            "data": {
                "waterConsumption": [
                    1.68, 
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
                "UploadTime": [
                    "2023-05-01", 
                    "2023-05-02", 
                    "2023-05-03", 
                    "2023-05-04", 
                    "2023-05-05", 
                    "2023-05-06", 
                    "2023-05-07", 
                    "2023-05-08", 
                    "2023-05-09", 
                    "2023-05-10"
                ]
            }
        }';             
    }
    else if ((($_GET['data_id']==="001001") || ($_GET['data_id']===null)) &&(($_GET['meterID']==="") ||($_GET['meterID']=== null) ) &&(($_GET['startDate']==="") ||($_GET['startDate']=== null) )&&(($_GET['endDate']==="") ||($_GET['endDate']=== null) ))
    {
        $data =  '{
            "status": 200, 
            "msg": "成功", 
            "data": {
                "waterConsumption": [
                    1.68, 
                    1.65, 
                    3.62, 
                    3.68, 
                    3.64, 
                    3.63, 
                    3.61, 
                    3.68, 
                    3.72, 
                    3.7
                ], 
                "UploadTime": [
                    "2023-05-01", 
                    "2023-05-02", 
                    "2023-05-03", 
                    "2023-05-04", 
                    "2023-05-05", 
                    "2023-05-06", 
                    "2023-05-07", 
                    "2023-05-08", 
                    "2023-05-09", 
                    "2023-05-10"
                ]
            }
        }';  
    }
    else if ((($_GET['data_id']==="001001001") || ($_GET['data_id']===null)) &&(($_GET['meterID']==="") ||($_GET['meterID']=== null) ) &&(($_GET['startDate']==="") ||($_GET['startDate']=== null) )&&(($_GET['endDate']==="") ||($_GET['endDate']=== null) ))
    {
        $data =  '{
            "status": 200, 
            "msg": "成功", 
            "data": {
                "waterConsumption": [
                    1.68, 
                    1.65, 
                    5.62, 
                    3.68, 
                    3.64, 
                    3.63, 
                    3.61, 
                    3.68, 
                    3.72, 
                    3.7
                ], 
                "UploadTime": [
                    "2023-05-01", 
                    "2023-05-02", 
                    "2023-05-03", 
                    "2023-05-04", 
                    "2023-05-05", 
                    "2023-05-06", 
                    "2023-05-07", 
                    "2023-05-08", 
                    "2023-05-09", 
                    "2023-05-10"
                ]
            }
        }';  
    }
    else if ((($_GET['data_id']==="001001002") || ($_GET['data_id']===null)) &&(($_GET['meterID']==="") ||($_GET['meterID']=== null) ) &&(($_GET['startDate']==="") ||($_GET['startDate']=== null) )&&(($_GET['endDate']==="") ||($_GET['endDate']=== null) ))
    {
        $data ='{
            "status": 200, 
            "msg": "成功", 
            "data": {
                "waterConsumption": [
                    1.68, 
                    1.65, 
                    5.62, 
                    1.68, 
                    1.64, 
                    3.63, 
                    3.61, 
                    3.68, 
                    3.72, 
                    3.7
                ], 
                "UploadTime": [
                    "2023-05-01", 
                    "2023-05-02", 
                    "2023-05-03", 
                    "2023-05-04", 
                    "2023-05-05", 
                    "2023-05-06", 
                    "2023-05-07", 
                    "2023-05-08", 
                    "2023-05-09", 
                    "2023-05-10"
                ]
            }
        }';  
    }
    else if ((($_GET['data_id']==="001001001001") || ($_GET['data_id']===null)) &&(($_GET['meterID']==="") ||($_GET['meterID']=== null) ) &&(($_GET['startDate']==="") ||($_GET['startDate']=== null) )&&(($_GET['endDate']==="") ||($_GET['endDate']=== null) ))
    {
        $data = '{
            "status": 200, 
            "msg": "成功", 
            "data": {
                "waterConsumption": [
                    1.68, 
                    1.65, 
                    5.62, 
                    1.68, 
                    1.64, 
                    7.63, 
                    3.61, 
                    3.68, 
                    3.72, 
                    3.7
                ], 
                "UploadTime": [
                    "2023-05-01", 
                    "2023-05-02", 
                    "2023-05-03", 
                    "2023-05-04", 
                    "2023-05-05", 
                    "2023-05-06", 
                    "2023-05-07", 
                    "2023-05-08", 
                    "2023-05-09", 
                    "2023-05-10"
                ]
            }
        }';  
    }
    else if ((($_GET['data_id']==="001001001002") || ($_GET['data_id']===null)) &&(($_GET['meterID']==="") ||($_GET['meterID']=== null) ) &&(($_GET['startDate']==="") ||($_GET['startDate']=== null) )&&(($_GET['endDate']==="") ||($_GET['endDate']=== null) ))
    {
        $data = '{
            "status": 200, 
            "msg": "成功", 
            "data": {
                "waterConsumption": [
                    1.68, 
                    1.65, 
                    5.62, 
                    1.68, 
                    1.64, 
                    7.63, 
                    0.61, 
                    3.68, 
                    3.72, 
                    3.7
                ], 
                "UploadTime": [
                    "2023-05-01", 
                    "2023-05-02", 
                    "2023-05-03", 
                    "2023-05-04", 
                    "2023-05-05", 
                    "2023-05-06", 
                    "2023-05-07", 
                    "2023-05-08", 
                    "2023-05-09", 
                    "2023-05-10"
                ]
            }
        }';  
    }
    else if ((($_GET['data_id']==="001001002001") || ($_GET['data_id']===null)) &&(($_GET['meterID']==="") ||($_GET['meterID']=== null) ) &&(($_GET['startDate']==="") ||($_GET['startDate']=== null) )&&(($_GET['endDate']==="") ||($_GET['endDate']=== null) ))
    {
        $data =  '{
            "status": 200, 
            "msg": "成功", 
            "data": {
                "waterConsumption": [
                    1.68, 
                    1.65, 
                    5.62, 
                    1.68, 
                    1.64, 
                    7.63, 
                    3.61, 
                    0.68, 
                    3.72, 
                    3.7
                ], 
                "UploadTime": [
                    "2023-05-01", 
                    "2023-05-02", 
                    "2023-05-03", 
                    "2023-05-04", 
                    "2023-05-05", 
                    "2023-05-06", 
                    "2023-05-07", 
                    "2023-05-08", 
                    "2023-05-09", 
                    "2023-05-10"
                ]
            }
        }';  
    }
    else if ((($_GET['data_id']==="001001002002") || ($_GET['data_id']===null)) &&(($_GET['meterID']==="") ||($_GET['meterID']=== null) ) &&(($_GET['startDate']==="") ||($_GET['startDate']=== null) )&&(($_GET['endDate']==="") ||($_GET['endDate']=== null) ))
    {
        $data = '{
            "status": 200, 
            "msg": "成功", 
            "data": {
                "waterConsumption": [
                    1.68, 
                    1.65, 
                    5.62, 
                    1.68, 
                    1.64, 
                    7.63, 
                    3.61, 
                    7.68, 
                    3.72, 
                    3.7
                ], 
                "UploadTime": [
                    "2023-05-01", 
                    "2023-05-02", 
                    "2023-05-03", 
                    "2023-05-04", 
                    "2023-05-05", 
                    "2023-05-06", 
                    "2023-05-07", 
                    "2023-05-08", 
                    "2023-05-09", 
                    "2023-05-10"
                ]
            }
        }';  
    }
    else if ((($_GET['data_id']==="001") || ($_GET['data_id']===null)) &&(($_GET['meterID']==="20230010")) &&(($_GET['startDate']==="") ||($_GET['startDate']=== null) )&&(($_GET['endDate']==="") ||($_GET['endDate']=== null) ))
    {
        $data = '{
            "status": 200, 
            "msg": "成功", 
            "data": {
                "waterConsumption": [
                    1.68, 
                    1.65, 
                    5.62, 
                    1.68, 
                    1.64, 
                    7.63, 
                    3.61, 
                    3.68, 
                    3.72, 
                    3.7
                ], 
                "UploadTime": [
                    "2023-05-01", 
                    "2023-05-02", 
                    "2023-05-03", 
                    "2023-05-04", 
                    "2023-05-05", 
                    "2023-05-06", 
                    "2023-05-07", 
                    "2023-05-08", 
                    "2023-05-09", 
                    "2023-05-10"
                ]
            }
        }';  
    }
    else if ((($_GET['data_id']==="001") || ($_GET['data_id']===null)) &&(($_GET['meterID']==="20230011")  ) &&(($_GET['startDate']==="") ||($_GET['startDate']=== null) )&&(($_GET['endDate']==="") ||($_GET['endDate']=== null) ))
    {
        $data = '{
            "status": 200, 
            "msg": "成功", 
            "data": {
                "waterConsumption": [
                    1.68, 
                    1.65, 
                    5.62, 
                    1.68, 
                    1.64, 
                    7.63, 
                    0.61, 
                    3.68, 
                    3.72, 
                    3.7
                ], 
                "UploadTime": [
                    "2023-05-01", 
                    "2023-05-02", 
                    "2023-05-03", 
                    "2023-05-04", 
                    "2023-05-05", 
                    "2023-05-06", 
                    "2023-05-07", 
                    "2023-05-08", 
                    "2023-05-09", 
                    "2023-05-10"
                ]
            }
        }';  
    }
    else if ((($_GET['data_id']==="001") || ($_GET['data_id']===null)) &&(($_GET['meterID']==="20230012") ) &&(($_GET['startDate']==="") ||($_GET['startDate']=== null) )&&(($_GET['endDate']==="") ||($_GET['endDate']=== null) ))
    {
        $data =  '{
            "status": 200, 
            "msg": "成功", 
            "data": {
                "waterConsumption": [
                    1.68, 
                    1.65, 
                    5.62, 
                    1.68, 
                    1.64, 
                    7.63, 
                    3.61, 
                    0.68, 
                    3.72, 
                    3.7
                ], 
                "UploadTime": [
                    "2023-05-01", 
                    "2023-05-02", 
                    "2023-05-03", 
                    "2023-05-04", 
                    "2023-05-05", 
                    "2023-05-06", 
                    "2023-05-07", 
                    "2023-05-08", 
                    "2023-05-09", 
                    "2023-05-10"
                ]
            }
        }';  
    }
    else if ((($_GET['data_id']==="001") || ($_GET['data_id']===null)) &&(($_GET['meterID']==="20230013")) &&(($_GET['startDate']==="") ||($_GET['startDate']=== null) )&&(($_GET['endDate']==="") ||($_GET['endDate']=== null) ))
    {
        $data = '{
            "status": 200, 
            "msg": "成功", 
            "data": {
                "waterConsumption": [
                    1.68, 
                    1.65, 
                    5.62, 
                    1.68, 
                    1.64, 
                    7.63, 
                    3.61, 
                    7.68, 
                    3.72, 
                    3.7
                ], 
                "UploadTime": [
                    "2023-05-01", 
                    "2023-05-02", 
                    "2023-05-03", 
                    "2023-05-04", 
                    "2023-05-05", 
                    "2023-05-06", 
                    "2023-05-07", 
                    "2023-05-08", 
                    "2023-05-09", 
                    "2023-05-10"
                ]
            }
        }';  
    }
    else if ((($_GET['data_id']==="001")) &&(($_GET['startDate']==="2023-09-01") )&&(($_GET['endDate']==="2023-10-01")))
    {
        $data = '{
            "status": 200, 
            "msg": "成功", 
            "data": {
                "waterConsumption": [
                    1.68, 
                    1.65, 
                    5.62, 
                    1.68, 
                    1.64, 
                    7.63, 
                    3.61, 
                    7.68, 
                    3.72, 
                    3.7,
                    1.68, 
                    1.65, 
                    5.62, 
                    1.68, 
                    1.64, 
                    7.63, 
                    23.61, 
                    7.68, 
                    3.72, 
                    3.7,
                    1.68, 
                    1.65, 
                    5.62, 
                    1.68, 
                    1.64, 
                    7.63, 
                    3.61, 
                    7.68, 
                    3.72, 
                    3.7,
                    4.5
                ], 
                "UploadTime": [
                    "2023-09-01", 
                    "2023-09-02", 
                    "2023-09-03", 
                    "2023-09-04", 
                    "2023-09-05", 
                    "2023-09-06", 
                    "2023-09-07", 
                    "2023-09-08", 
                    "2023-09-09", 
                    "2023-09-10",
                    "2023-09-11", 
                    "2023-09-12", 
                    "2023-09-13", 
                    "2023-09-14", 
                    "2023-09-15", 
                    "2023-09-16", 
                    "2023-09-17", 
                    "2023-09-18", 
                    "2023-09-19", 
                    "2023-09-20",
                    "2023-09-21", 
                    "2023-09-22", 
                    "2023-09-23", 
                    "2023-09-24", 
                    "2023-09-25", 
                    "2023-09-26", 
                    "2023-09-27", 
                    "2023-09-28", 
                    "2023-09-29", 
                    "2023-09-30",
                    "2023-10-01"
                ]
            }
        }';  
    }
    else
    {
        $data = '{
            "status": 200, 
            "msg": "成功", 
            "data": {
                "waterConsumption": [
                   
                ], 
                "UploadTime": [
                   
                ]
            }
        }';    
    }
    header('Content-Type:application/json;charset=utf-8');
    $arr = json_decode($data,true);
    exit(json_encode($arr)); 
   
?>