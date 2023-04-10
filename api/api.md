### 请求的根路径

> http://192.168.1.96







### 生产测试/当前测试批次

+ 接口URL：  meter/api/testing.php
+ 调用方式： GET
+ 参数格式：

| 参数名称    | 参数类型   | 是否必选 | 参数说明    |
| ---------  | --------  | -------- | ---------- |
| page       | integer   | 是       | 请求页码    |
| pageNum    | integer   | 是       | 分页条数    |
| meterID    | integer   | 否       | 设备编号    |
| ICCID      | integer   | 否       | ICCID      |

+ 响应格式：

| 数据名称       | 数据类型   |                说明                   |
| --------------| -------- | ------------------------------------------|
| status        | Number   | 0 获取数据成功；500 获取数据失败；        |
| msg           | String   | 对 status 字段的详细说明                   |
| data          | Array    | 当前测试批次数组                           |
|  +meterID     |     | 设备编号                                 |
|  +ICCID       |     | ICCID                                 |
|  +IMEI        |     | IMEI                                 |
|  +VDD         |     | 电池电压                                 |
|  +SS          |     | 信号强度                                 |
|  +totalFlow   |     | 累计用量                                 |
|  +testFlow    |     | 当前测试用量                                 |
|  +reportTime  |     | 最近上报时间                                 |
|  +version     |     | 版本号                                 |
|  +testResult  |     | 测试结果                                 |
|  +testTime    |     | 测试时间                                 |

+ 返回示例：

```json
{
    "status": 200,
    "msg": "获取数据成功成功",
    "data": [
        {
            "meterID": 21031001,
            "ICCID": 89861119264006003353,
            "IMEI":861001051498679,
            "VDD": 3.66,
            "SS": 20,
            "totalFlow": 1.224,
            "testFlow": 0.001,
            "reportTime": "2023-04-10 03:41:20",
            "version": "11.35",
            "testResult":"正在测试" ,
            "testTime": "",
        }
    ]
}
```

