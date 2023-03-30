<?php 
if(isset($_GET['user_name'])){
    echo "GET:your name is".$_GET['user_name'];
}

if(isset($_POST['username'])){


// $input = file_get_contents("php://input");

// $input = json_decode($input,true);

// $data = '{"name":"'.$input["username"].'","role":{"description": "生产测试","name": "生产测试","permission": "product;system,vendor"},"belongs":"LIANLIFT"}';

$data = '{"status":"200","name":"'.$_POST['username'].'","role":{"description": "生产测试","name": "生产测试","permission": "product;system,vendor"},"belongs":"LIANLIFT"}';

//$data = '{"name":"llmd001","role":{"description": "生产测试","name": "生产测试","permission": "product;system,vendor"},"belongs":"LIANLIFT"}';

header('Content-Type:application/json;charset=utf-8');

$arr = json_decode($data,true);

exit(json_encode($arr));

//echo $data;
//exit($data);

//exit($input['username']);
//{description: '生产测试',name: '生产测试',permission: 'product;system,vendor'}
}
?>
