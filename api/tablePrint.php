<?php 
if(isset($_GET['getData'])){
    if(($_GET['getData'] == null)||($_GET['getData'] == ""))
    {
        $data = '{"status":201,"msg":"查询参数错误！","data":null}';
        header('Content-Type:application/json;charset=utf-8');
        $arr = json_decode($data,true);
        exit(json_encode($arr));
    }
    else if($_GET['getData'] ==="获取所有模板名称")
    {
        $data = '{"templateName":["默认模板","模板1","模板2","模板3"]}';
        header('Content-Type:application/json;charset=utf-8');
        $arr = json_decode($data,true);
        exit(json_encode($arr));
    }
    else if($_GET['getData'] ==="默认模板")
    {
        $data = '{
            "templateName":"默认模板",
            "panels": [
                {
                    "index": 0,
                    "paperType": "A5",
                    "height": 148,
                    "width": 210,
                    "paperHeader": 28.5,
                    "paperFooter": 419.52755905511816,
                    "printElements": [
                        {
                            "options": {
                                "left": 154.5,
                                "top": 51,
                                "height": 19.5,
                                "width": 210,
                                "fontFamily": "SimSun",
                                "fontSize": 18,
                                "textAlign": "center",
                                "fixed": true,
                                "axis": "v",
                                "borderBottom": "solid",
                                "borderWidth": "1.5",
                                "contentPaddingBottom": 3,
                                "title": "水费（专用）收据"
                            },
                            "printElementType": {
                                "type": "text"
                            }
                        },
                        {
                            "options": {
                                "left": 438,
                                "top": 57,
                                "height": 15,
                                "width": 55.5,
                                "fontFamily": "SimSun",
                                "fontSize": 18,
                                "fontWeight": "bold",
                                "title": "NO:"
                            },
                            "printElementType": {
                                "type": "text"
                            }
                        },
                        {
                            "options": {
                                "left": 472.5,
                                "top": 58.5,
                                "height": 13.5,
                                "width": 84,
                                "field": "receiptNo",
                                "testData": "0304443",
                                "fontFamily": "Microsoft YaHei",
                                "fontSize": 15,
                                "letterSpacing": 1.5
                            },
                            "printElementType": {
                                "type": "text"
                            }
                        },
                        {
                            "options": {
                                "left": 418.5,
                                "top": 90,
                                "height": 9.75,
                                "width": 58.5,
                                "fontFamily": "SimSun",
                                "fontSize": 10.5,
                                "fontWeight": "bold",
                                "title": "收费日期："
                            },
                            "printElementType": {
                                "type": "text"
                            }
                        },
                        {
                            "options": {
                                "left": 339,
                                "top": 90,
                                "height": 9.75,
                                "width": 66,
                                "field": "userID",
                                "testData": "9610119",
                                "fontSize": 10.5
                            },
                            "printElementType": {
                                "type": "text"
                            }
                        },
                        {
                            "options": {
                                "left": 277.5,
                                "top": 90,
                                "height": 9.75,
                                "width": 61.5,
                                "fontFamily": "SimSun",
                                "fontSize": 10.5,
                                "fontWeight": "bold",
                                "title": "用户编号："
                            },
                            "printElementType": {
                                "type": "text"
                            }
                        },
                        {
                            "options": {
                                "left": 480,
                                "top": 90,
                                "height": 9.75,
                                "width": 82.5,
                                "field": "chargeDate",
                                "testData": "2022-01-07"
                            },
                            "printElementType": {
                                "type": "text"
                            }
                        },
                        {
                            "options": {
                                "left": 21,
                                "top": 90,
                                "height": 12,
                                "width": 61.5,
                                "fontSize": 10.5,
                                "fontWeight": "bold",
                                "title": "用户地址："
                            },
                            "printElementType": {
                                "type": "text"
                            }
                        },
                        {
                            "options": {
                                "left": 82.5,
                                "top": 90,
                                "height": 9.75,
                                "width": 168,
                                "field": "userAddress",
                                "testData": "花园小区26-6-602",
                                "fontSize": 10.5
                            },
                            "printElementType": {
                                "type": "text"
                            }
                        },
                        {
                            "options": {
                                "left": 6,
                                "top": 105,
                                "height": 129,
                                "width": 556.5
                            },
                            "printElementType": {
                                "type": "rect"
                            }
                        },
                        {
                            "options": {
                                "left": 570,
                                "top": 111,
                                "height": 9,
                                "width": 10.5,
                                "transform": 0,
                                "title": "第"
                            },
                            "printElementType": {
                                "type": "text"
                            }
                        },
                        {
                            "options": {
                                "left": 570,
                                "top": 127.5,
                                "height": 9.75,
                                "width": 13.5,
                                "title": "一"
                            },
                            "printElementType": {
                                "type": "text"
                            }
                        },
                        {
                            "options": {
                                "left": 16.5,
                                "top": 136.5,
                                "height": 45,
                                "width": 540,
                                "field": "table",
                                "textAlign": "center",
                                "columns": [
                                    [
                                        {
                                            "title": "上次抄表日期",
                                            "field": "lastReadTime",
                                            "width": 62.67890750516013,
                                            "colspan": 1,
                                            "rowspan": 1,
                                            "checked": true,
                                            "columnId": "lastReadTime"
                                        },
                                        {
                                            "title": "上次抄见（吨）",
                                            "field": "lastRead",
                                            "width": 85.91174044656677,
                                            "colspan": 1,
                                            "rowspan": 1,
                                            "checked": true,
                                            "columnId": "lastRead"
                                        },
                                        {
                                            "title": "本次抄表日期",
                                            "field": "thisReadTime",
                                            "width": 64.22506753958584,
                                            "colspan": 1,
                                            "rowspan": 1,
                                            "checked": true,
                                            "columnId": "thisReadTime"
                                        },
                                        {
                                            "title": "本次抄见（吨）",
                                            "field": "thisRead",
                                            "width": 79.84363766103728,
                                            "colspan": 1,
                                            "rowspan": 1,
                                            "checked": true,
                                            "columnId": "thisRead"
                                        },
                                        {
                                            "title": "用量（吨）",
                                            "field": "waterUsage",
                                            "width": 90.86104490366971,
                                            "colspan": 1,
                                            "rowspan": 1,
                                            "checked": true,
                                            "columnId": "waterUsage"
                                        },
                                        {
                                            "title": "单价（元）",
                                            "field": "unitPrice",
                                            "width": 49.050564410926334,
                                            "colspan": 1,
                                            "rowspan": 1,
                                            "checked": true,
                                            "columnId": "unitPrice"
                                        },
                                        {
                                            "title": "金额（元）",
                                            "field": "money",
                                            "width": 107.42903753305397,
                                            "colspan": 1,
                                            "rowspan": 1,
                                            "checked": true,
                                            "columnId": "money"
                                        }
                                    ]
                                ]
                            },
                            "printElementType": {
                                "title": "表格",
                                "type": "tableCustom"
                            }
                        },
                        {
                            "options": {
                                "left": 570,
                                "top": 148.5,
                                "height": 9.75,
                                "width": 13.5,
                                "title": "联"
                            },
                            "printElementType": {
                                "type": "text"
                            }
                        },
                        {
                            "options": {
                                "left": 570,
                                "top": 169.5,
                                "height": 9.75,
                                "width": 13.5,
                                "title": "存"
                            },
                            "printElementType": {
                                "type": "text"
                            }
                        },
                        {
                            "options": {
                                "left": 570,
                                "top": 189,
                                "height": 9.75,
                                "width": 16.5,
                                "title": "根"
                            },
                            "printElementType": {
                                "type": "text"
                            }
                        },
                        {
                            "options": {
                                "left": 16.5,
                                "top": 213,
                                "height": 9.75,
                                "width": 117,
                                "fontSize": 10.5,
                                "fontWeight": "bold",
                                "title": "合计人民币（大写）："
                            },
                            "printElementType": {
                                "type": "text"
                            }
                        },
                        {
                            "options": {
                                "left": 139.5,
                                "top": 214.5,
                                "height": 9.75,
                                "width": 177,
                                "field": "moneyCapital",
                                "testData": "玖仟壹佰元"
                            },
                            "printElementType": {
                                "type": "text"
                            }
                        },
                        {
                            "options": {
                                "left": 445.5,
                                "top": 259.5,
                                "height": 9.75,
                                "width": 51,
                                "fontFamily": "SimSun",
                                "fontSize": 10.5,
                                "fontWeight": "bold",
                                "title": "开票人："
                            },
                            "printElementType": {
                                "type": "text"
                            }
                        },
                        {
                            "options": {
                                "left": 496.5,
                                "top": 259.5,
                                "height": 9.75,
                                "width": 51,
                                "field": "drawer",
                                "testData": "韩梅梅",
                                "fontSize": 10.5
                            },
                            "printElementType": {
                                "type": "text"
                            }
                        }
                    ],
                    "paperNumberLeft": 565,
                    "paperNumberTop": 397
                }
            ]
        }';
            header('Content-Type:application/json;charset=utf-8');
            $arr = json_decode($data,true);
            exit(json_encode($arr));
    }
    else if($_GET['getData'] ==="模板1")
    {
        $data = '{"panels":[{"index":0,"paperType":"A5","height":148,"width":210,"paperHeader":28.5,"paperFooter":419.52755905511816,"printElements":[{"options":{"left":154.5,"top":51,"height":19.5,"width":243,"fontFamily":"SimSun","fontSize":18,"textAlign":"center","fixed":true,"axis":"v","borderBottom":"solid","borderWidth":"1.5","contentPaddingBottom":3,"title":"水费（专用）收据（ 模板1）\n"},"printElementType":{"type":"text"}},{"options":{"left":438,"top":57,"height":15,"width":55.5,"fontFamily":"SimSun","fontSize":18,"fontWeight":"bold","title":"NO:"},"printElementType":{"type":"text"}},{"options":{"left":472.5,"top":58.5,"height":13.5,"width":84,"field":"receiptNo","testData":"000001","fontFamily":"Microsoft YaHei","fontSize":15,"letterSpacing":1.5,"title":""},"printElementType":{"type":"text"}},{"options":{"left":418.5,"top":90,"height":9.75,"width":58.5,"fontFamily":"SimSun","fontSize":10.5,"fontWeight":"bold","title":"收费日期："},"printElementType":{"type":"text"}},{"options":{"left":339,"top":90,"height":9.75,"width":66,"field":"userID","testData":"9610119","fontSize":10.5},"printElementType":{"type":"text"}},{"options":{"left":277.5,"top":90,"height":9.75,"width":61.5,"fontFamily":"SimSun","fontSize":10.5,"fontWeight":"bold","title":"用户编号："},"printElementType":{"type":"text"}},{"options":{"left":480,"top":90,"height":9.75,"width":82.5,"field":"chargeDate","testData":"2022-01-07"},"printElementType":{"type":"text"}},{"options":{"left":21,"top":90,"height":12,"width":61.5,"fontSize":10.5,"fontWeight":"bold","title":"用户地址："},"printElementType":{"type":"text"}},{"options":{"left":82.5,"top":90,"height":9.75,"width":168,"field":"userAddress","testData":"花园小区26-6-602","fontSize":10.5},"printElementType":{"type":"text"}},{"options":{"left":6,"top":105,"height":129,"width":556.5},"printElementType":{"type":"rect"}},{"options":{"left":570,"top":111,"height":9,"width":10.5,"transform":0,"title":"第"},"printElementType":{"type":"text"}},{"options":{"left":570,"top":127.5,"height":9.75,"width":13.5,"title":"一"},"printElementType":{"type":"text"}},{"options":{"left":16.5,"top":136.5,"height":45,"width":540,"field":"table","textAlign":"center","columns":[[{"title":"上次抄表日期","field":"lastReadTime","width":62.67890750516013,"colspan":1,"rowspan":1,"checked":true,"columnId":"lastReadTime"},{"title":"上次抄见（吨）","field":"lastRead","width":85.91174044656677,"colspan":1,"rowspan":1,"checked":true,"columnId":"lastRead"},{"title":"本次抄表日期","field":"thisReadTime","width":64.22506753958584,"colspan":1,"rowspan":1,"checked":true,"columnId":"thisReadTime"},{"title":"本次抄见（吨）","field":"thisRead","width":79.84363766103728,"colspan":1,"rowspan":1,"checked":true,"columnId":"thisRead"},{"title":"用量（吨）","field":"waterUsage","width":90.86104490366971,"colspan":1,"rowspan":1,"checked":true,"columnId":"waterUsage"},{"title":"单价（元）","field":"unitPrice","width":49.050564410926334,"colspan":1,"rowspan":1,"checked":true,"columnId":"unitPrice"},{"title":"金额（元）","field":"money","width":107.42903753305397,"colspan":1,"rowspan":1,"checked":true,"columnId":"money"}]]},"printElementType":{"title":"表格","type":"tableCustom"}},{"options":{"left":570,"top":148.5,"height":9.75,"width":13.5,"title":"联"},"printElementType":{"type":"text"}},{"options":{"left":570,"top":169.5,"height":9.75,"width":13.5,"title":"存"},"printElementType":{"type":"text"}},{"options":{"left":570,"top":189,"height":9.75,"width":16.5,"title":"根"},"printElementType":{"type":"text"}},{"options":{"left":16.5,"top":213,"height":9.75,"width":117,"fontSize":10.5,"fontWeight":"bold","title":"合计人民币（大写）："},"printElementType":{"type":"text"}},{"options":{"left":139.5,"top":214.5,"height":9.75,"width":177,"field":"moneyCapital","testData":"玖仟壹佰元"},"printElementType":{"type":"text"}},{"options":{"left":445.5,"top":259.5,"height":9.75,"width":51,"fontFamily":"SimSun","fontSize":10.5,"fontWeight":"bold","title":"开票人："},"printElementType":{"type":"text"}},{"options":{"left":496.5,"top":259.5,"height":9.75,"width":51,"field":"drawer","testData":"韩梅梅","fontSize":10.5},"printElementType":{"type":"text"}}],"paperNumberLeft":565,"paperNumberTop":397}]}';        header('Content-Type:application/json;charset=utf-8');
        $arr = json_decode($data,true);
        exit(json_encode($arr));
    }
    else if($_GET['getData'] ==="模板2")
    {
        $data = '{"panels":[{"index":0,"paperType":"A5","height":148,"width":210,"paperHeader":28.5,"paperFooter":419.52755905511816,"printElements":[{"options":{"left":154.5,"top":51,"height":19.5,"width":243,"fontFamily":"SimSun","fontSize":18,"textAlign":"center","fixed":true,"axis":"v","borderBottom":"solid","borderWidth":"1.5","contentPaddingBottom":3,"title":"水费（专用）收据（ 模板2\n）\n"},"printElementType":{"type":"text"}},{"options":{"left":438,"top":57,"height":15,"width":55.5,"fontFamily":"SimSun","fontSize":18,"fontWeight":"bold","title":"NO:"},"printElementType":{"type":"text"}},{"options":{"left":472.5,"top":58.5,"height":13.5,"width":84,"field":"receiptNo","testData":"000001","fontFamily":"Microsoft YaHei","fontSize":15,"letterSpacing":1.5,"title":""},"printElementType":{"type":"text"}},{"options":{"left":418.5,"top":90,"height":9.75,"width":58.5,"fontFamily":"SimSun","fontSize":10.5,"fontWeight":"bold","title":"收费日期："},"printElementType":{"type":"text"}},{"options":{"left":339,"top":90,"height":9.75,"width":66,"field":"userID","testData":"9610119","fontSize":10.5},"printElementType":{"type":"text"}},{"options":{"left":277.5,"top":90,"height":9.75,"width":61.5,"fontFamily":"SimSun","fontSize":10.5,"fontWeight":"bold","title":"用户编号："},"printElementType":{"type":"text"}},{"options":{"left":480,"top":90,"height":9.75,"width":82.5,"field":"chargeDate","testData":"2022-01-07"},"printElementType":{"type":"text"}},{"options":{"left":21,"top":90,"height":12,"width":61.5,"fontSize":10.5,"fontWeight":"bold","title":"用户地址："},"printElementType":{"type":"text"}},{"options":{"left":82.5,"top":90,"height":9.75,"width":168,"field":"userAddress","testData":"花园小区26-6-602","fontSize":10.5},"printElementType":{"type":"text"}},{"options":{"left":6,"top":105,"height":129,"width":556.5},"printElementType":{"type":"rect"}},{"options":{"left":570,"top":111,"height":9,"width":10.5,"transform":0,"title":"第"},"printElementType":{"type":"text"}},{"options":{"left":570,"top":127.5,"height":9.75,"width":13.5,"title":"一"},"printElementType":{"type":"text"}},{"options":{"left":16.5,"top":136.5,"height":45,"width":540,"field":"table","textAlign":"center","columns":[[{"title":"上次抄表日期","field":"lastReadTime","width":62.67890750516013,"colspan":1,"rowspan":1,"checked":true,"columnId":"lastReadTime"},{"title":"上次抄见（吨）","field":"lastRead","width":85.91174044656677,"colspan":1,"rowspan":1,"checked":true,"columnId":"lastRead"},{"title":"本次抄表日期","field":"thisReadTime","width":64.22506753958584,"colspan":1,"rowspan":1,"checked":true,"columnId":"thisReadTime"},{"title":"本次抄见（吨）","field":"thisRead","width":79.84363766103728,"colspan":1,"rowspan":1,"checked":true,"columnId":"thisRead"},{"title":"用量（吨）","field":"waterUsage","width":90.86104490366971,"colspan":1,"rowspan":1,"checked":true,"columnId":"waterUsage"},{"title":"单价（元）","field":"unitPrice","width":49.050564410926334,"colspan":1,"rowspan":1,"checked":true,"columnId":"unitPrice"},{"title":"金额（元）","field":"money","width":107.42903753305397,"colspan":1,"rowspan":1,"checked":true,"columnId":"money"}]]},"printElementType":{"title":"表格","type":"tableCustom"}},{"options":{"left":570,"top":148.5,"height":9.75,"width":13.5,"title":"联"},"printElementType":{"type":"text"}},{"options":{"left":570,"top":169.5,"height":9.75,"width":13.5,"title":"存"},"printElementType":{"type":"text"}},{"options":{"left":570,"top":189,"height":9.75,"width":16.5,"title":"根"},"printElementType":{"type":"text"}},{"options":{"left":16.5,"top":213,"height":9.75,"width":117,"fontSize":10.5,"fontWeight":"bold","title":"合计人民币（大写）："},"printElementType":{"type":"text"}},{"options":{"left":139.5,"top":214.5,"height":9.75,"width":177,"field":"moneyCapital","testData":"玖仟壹佰元"},"printElementType":{"type":"text"}},{"options":{"left":445.5,"top":259.5,"height":9.75,"width":51,"fontFamily":"SimSun","fontSize":10.5,"fontWeight":"bold","title":"开票人："},"printElementType":{"type":"text"}},{"options":{"left":496.5,"top":259.5,"height":9.75,"width":51,"field":"drawer","testData":"韩梅梅","fontSize":10.5},"printElementType":{"type":"text"}}],"paperNumberLeft":565,"paperNumberTop":397}]}';
        header('Content-Type:application/json;charset=utf-8');
        $arr = json_decode($data,true);
        exit(json_encode($arr));
    }
    else if($_GET['getData'] ==="模板3")
    {
        $data = '{"panels":[{"index":0,"paperType":"A5","height":148,"width":210,"paperHeader":28.5,"paperFooter":419.52755905511816,"printElements":[{"options":{"left":154.5,"top":51,"height":19.5,"width":243,"fontFamily":"SimSun","fontSize":18,"textAlign":"center","fixed":true,"axis":"v","borderBottom":"solid","borderWidth":"1.5","contentPaddingBottom":3,"title":"水费（专用）收据（ 模板3\n\n）\n"},"printElementType":{"type":"text"}},{"options":{"left":438,"top":57,"height":15,"width":55.5,"fontFamily":"SimSun","fontSize":18,"fontWeight":"bold","title":"NO:"},"printElementType":{"type":"text"}},{"options":{"left":472.5,"top":58.5,"height":13.5,"width":84,"field":"receiptNo","testData":"000001","fontFamily":"Microsoft YaHei","fontSize":15,"letterSpacing":1.5,"title":""},"printElementType":{"type":"text"}},{"options":{"left":418.5,"top":90,"height":9.75,"width":58.5,"fontFamily":"SimSun","fontSize":10.5,"fontWeight":"bold","title":"收费日期："},"printElementType":{"type":"text"}},{"options":{"left":339,"top":90,"height":9.75,"width":66,"field":"userID","testData":"9610119","fontSize":10.5},"printElementType":{"type":"text"}},{"options":{"left":277.5,"top":90,"height":9.75,"width":61.5,"fontFamily":"SimSun","fontSize":10.5,"fontWeight":"bold","title":"用户编号："},"printElementType":{"type":"text"}},{"options":{"left":480,"top":90,"height":9.75,"width":82.5,"field":"chargeDate","testData":"2022-01-07"},"printElementType":{"type":"text"}},{"options":{"left":21,"top":90,"height":12,"width":61.5,"fontSize":10.5,"fontWeight":"bold","title":"用户地址："},"printElementType":{"type":"text"}},{"options":{"left":82.5,"top":90,"height":9.75,"width":168,"field":"userAddress","testData":"花园小区26-6-602","fontSize":10.5},"printElementType":{"type":"text"}},{"options":{"left":6,"top":105,"height":129,"width":556.5},"printElementType":{"type":"rect"}},{"options":{"left":570,"top":111,"height":9,"width":10.5,"transform":0,"title":"第"},"printElementType":{"type":"text"}},{"options":{"left":570,"top":127.5,"height":9.75,"width":13.5,"title":"一"},"printElementType":{"type":"text"}},{"options":{"left":16.5,"top":136.5,"height":45,"width":540,"field":"table","textAlign":"center","columns":[[{"title":"上次抄表日期","field":"lastReadTime","width":62.67890750516013,"colspan":1,"rowspan":1,"checked":true,"columnId":"lastReadTime"},{"title":"上次抄见（吨）","field":"lastRead","width":85.91174044656677,"colspan":1,"rowspan":1,"checked":true,"columnId":"lastRead"},{"title":"本次抄表日期","field":"thisReadTime","width":64.22506753958584,"colspan":1,"rowspan":1,"checked":true,"columnId":"thisReadTime"},{"title":"本次抄见（吨）","field":"thisRead","width":79.84363766103728,"colspan":1,"rowspan":1,"checked":true,"columnId":"thisRead"},{"title":"用量（吨）","field":"waterUsage","width":90.86104490366971,"colspan":1,"rowspan":1,"checked":true,"columnId":"waterUsage"},{"title":"单价（元）","field":"unitPrice","width":49.050564410926334,"colspan":1,"rowspan":1,"checked":true,"columnId":"unitPrice"},{"title":"金额（元）","field":"money","width":107.42903753305397,"colspan":1,"rowspan":1,"checked":true,"columnId":"money"}]]},"printElementType":{"title":"表格","type":"tableCustom"}},{"options":{"left":570,"top":148.5,"height":9.75,"width":13.5,"title":"联"},"printElementType":{"type":"text"}},{"options":{"left":570,"top":169.5,"height":9.75,"width":13.5,"title":"存"},"printElementType":{"type":"text"}},{"options":{"left":570,"top":189,"height":9.75,"width":16.5,"title":"根"},"printElementType":{"type":"text"}},{"options":{"left":16.5,"top":213,"height":9.75,"width":117,"fontSize":10.5,"fontWeight":"bold","title":"合计人民币（大写）："},"printElementType":{"type":"text"}},{"options":{"left":139.5,"top":214.5,"height":9.75,"width":177,"field":"moneyCapital","testData":"玖仟壹佰元"},"printElementType":{"type":"text"}},{"options":{"left":445.5,"top":259.5,"height":9.75,"width":51,"fontFamily":"SimSun","fontSize":10.5,"fontWeight":"bold","title":"开票人："},"printElementType":{"type":"text"}},{"options":{"left":496.5,"top":259.5,"height":9.75,"width":51,"field":"drawer","testData":"韩梅梅","fontSize":10.5},"printElementType":{"type":"text"}}],"paperNumberLeft":565,"paperNumberTop":397}]}';
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

