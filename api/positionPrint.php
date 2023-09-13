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
        $data = '{"templateName":["默认模板","浙江增值税发票","江苏增值税普通发票"]}';
        header('Content-Type:application/json;charset=utf-8');
        $arr = json_decode($data,true);
        exit(json_encode($arr));
    }
    else if($_GET['getData'] ==="默认模板")
    {
         $data = '{"panels":[{"index":0,"height":145,"width":210,"paperHeader":-1.5,"paperFooter":380,"printElements":[{"options":{"left":13.5,"top":10.5,"height":61,"width":65,"title":"031001800204","textType":"qrcode"},"printElementType":{"title":"文本","type":"text"}},{"options":{"left":462,"top":55.5,"height":13,"width":55.5,"color":"#2935e3","dataType":"datetime","textAlign":"justify","field":"date"},"printElementType":{"title":"文本","type":"text"}},{"options":{"left":100.5,"top":88.5,"height":10,"width":234,"color":"#2935e3","field":"userID","testData":"北京地铁税务局有限公司"},"printElementType":{"title":"文本","type":"text"}},{"options":{"left":99,"top":103.5,"height":10,"width":235.5,"title":"999999999999999999","color":"#2935e3"},"printElementType":{"title":"文本","type":"text"}},{"options":{"left":103.5,"top":118.5,"height":9.75,"width":229.5,"color":"#4d60eb","field":"userAddress","testData":"1382345678"},"printElementType":{"type":"text"}},{"options":{"left":103.5,"top":130.5,"height":9.75,"width":229.5,"title":"3330012345","color":"#475bf5"},"printElementType":{"type":"text"}},{"options":{"left":498,"top":172.5,"height":9.75,"width":79.5,"field":"tax"},"printElementType":{"type":"text"}},{"options":{"left":238.5,"top":174,"height":9.75,"width":25.5,"field":"unit"},"printElementType":{"type":"text"}},{"options":{"left":340.5,"top":174,"height":9.75,"width":22.5,"field":"unit_price"},"printElementType":{"type":"text"}},{"options":{"left":267,"top":174,"height":9.75,"width":52.5,"field":"waterUsage"},"printElementType":{"type":"text"}},{"options":{"left":381,"top":174,"height":9.75,"width":81,"field":"price"},"printElementType":{"type":"text"}},{"options":{"left":469.5,"top":174,"height":9.75,"width":22.5,"field":"tax_rate"},"printElementType":{"type":"text"}},{"options":{"left":40.5,"top":175.5,"height":12,"width":120,"color":"#2935e3","field":"costName","testData":"居民用水"},"printElementType":{"title":"文本","type":"text"}},{"options":{"left":175.5,"top":276,"height":14,"width":265.5,"color":"#2935e3","field":"total_price_cap","testData":"壹佰贰拾元整"},"printElementType":{"title":"文本","type":"text"}},{"options":{"left":472.5,"top":277.5,"height":13,"width":103.5,"color":"#2935e3","field":"total_price_small","testData":"￥100.00"},"printElementType":{"title":"文本","type":"text"}},{"options":{"left":63,"top":355.5,"height":10,"width":78,"title":"轩天天","color":"#2935e3","field":"payee"},"printElementType":{"title":"文本","type":"text"}}],"paperNumberLeft":565.5,"paperNumberTop":394.5,"paperNumberDisabled":true}]}';        header('Content-Type:application/json;charset=utf-8');
        $arr = json_decode($data,true);
        exit(json_encode($arr));
    }
    else if($_GET['getData'] ==="浙江增值税发票")
    {
        $data = '{"panels":[{"index":0,"height":145,"width":210,"paperHeader":-1.5,"paperFooter":380,"printElements":[{"options":{"left":13.5,"top":10.5,"height":61,"width":65,"title":"031001800204","textType":"qrcode"},"printElementType":{"title":"文本","type":"text"}},{"options":{"left":462,"top":55.5,"height":13,"width":55.5,"title":"2019 05 09","color":"#2935e3","dataType":"datetime","textAlign":"justify"},"printElementType":{"title":"文本","type":"text"}},{"options":{"left":100.5,"top":88.5,"height":10,"width":234,"title":"北京地铁税务局有限公司","color":"#2935e3"},"printElementType":{"title":"文本","type":"text"}},{"options":{"left":99,"top":103.5,"height":10,"width":235.5,"title":"999999999999999999","color":"#2935e3"},"printElementType":{"title":"文本","type":"text"}},{"options":{"left":103.5,"top":118.5,"height":9.75,"width":229.5,"title":"1381234567","color":"#4d60eb"},"printElementType":{"type":"text"}},{"options":{"left":103.5,"top":130.5,"height":9.75,"width":229.5,"title":"3330012345","color":"#475bf5"},"printElementType":{"type":"text"}},{"options":{"left":40.5,"top":175.5,"height":12,"width":120,"title":"*餐饮服务*餐费","color":"#2935e3"},"printElementType":{"title":"文本","type":"text"}},{"options":{"left":175.5,"top":276,"height":14,"width":265.5,"title":"壹佰贰拾元整","color":"#2935e3"},"printElementType":{"title":"文本","type":"text"}},{"options":{"left":472.5,"top":277.5,"height":13,"width":103.5,"title":"￥100.00","color":"#2935e3"},"printElementType":{"title":"文本","type":"text"}},{"options":{"left":210,"top":355.5,"height":10,"width":87,"title":"轩大可","color":"#2935e3"},"printElementType":{"title":"文本","type":"text"}},{"options":{"left":339,"top":355.5,"height":10,"width":86,"title":"张天天","color":"#2935e3"},"printElementType":{"title":"文本","type":"text"}},{"options":{"left":63,"top":355.5,"height":10,"width":78,"title":"轩天天","color":"#2935e3"},"printElementType":{"title":"文本","type":"text"}}],"paperNumberLeft":565.5,"paperNumberTop":394.5,"paperNumberDisabled":true}]}';        header('Content-Type:application/json;charset=utf-8');
        $arr = json_decode($data,true);
        exit(json_encode($arr));
    }
    else if($_GET['getData'] ==="江苏增值税普通发票")
    {
        $data = '{"panels":[{"index":0,"height":145,"width":210,"paperHeader":-1.5,"paperFooter":380,"printElements":[{"options":{"left":13.5,"top":10.5,"height":61,"width":65,"title":"031001800204","textType":"qrcode"},"printElementType":{"title":"文本","type":"text"}},{"options":{"left":462,"top":55.5,"height":13,"width":55.5,"title":"2019 05 09","color":"#2935e3","dataType":"datetime","textAlign":"justify"},"printElementType":{"title":"文本","type":"text"}},{"options":{"left":100.5,"top":88.5,"height":10,"width":234,"title":"北京地铁税务局有限公司","color":"#2935e3"},"printElementType":{"title":"文本","type":"text"}},{"options":{"left":99,"top":103.5,"height":10,"width":235.5,"title":"999999999999999999","color":"#2935e3"},"printElementType":{"title":"文本","type":"text"}},{"options":{"left":103.5,"top":118.5,"height":9.75,"width":229.5,"title":"1381234567","color":"#4d60eb"},"printElementType":{"type":"text"}},{"options":{"left":103.5,"top":130.5,"height":9.75,"width":229.5,"title":"3330012345","color":"#475bf5"},"printElementType":{"type":"text"}},{"options":{"left":40.5,"top":175.5,"height":12,"width":120,"title":"*餐饮服务*餐费","color":"#2935e3"},"printElementType":{"title":"文本","type":"text"}},{"options":{"left":175.5,"top":276,"height":14,"width":265.5,"title":"壹佰贰拾元整","color":"#2935e3"},"printElementType":{"title":"文本","type":"text"}},{"options":{"left":472.5,"top":277.5,"height":13,"width":103.5,"title":"￥100.00","color":"#2935e3"},"printElementType":{"title":"文本","type":"text"}},{"options":{"left":210,"top":355.5,"height":10,"width":87,"title":"轩大可","color":"#2935e3"},"printElementType":{"title":"文本","type":"text"}},{"options":{"left":339,"top":355.5,"height":10,"width":86,"title":"张天天","color":"#2935e3"},"printElementType":{"title":"文本","type":"text"}},{"options":{"left":63,"top":355.5,"height":10,"width":78,"title":"轩天天","color":"#2935e3"},"printElementType":{"title":"文本","type":"text"}}],"paperNumberLeft":565.5,"paperNumberTop":394.5,"paperNumberDisabled":true}]}';        header('Content-Type:application/json;charset=utf-8');
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

