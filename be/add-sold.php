<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
 require_once("include/header.php");

require_once("include/connection.php");
require_once("include/timezone.php");
require_once("global/methods.php");

$conn = new connection();
$conn = $conn->connectionString();
$methods = new globalMethods();
$postjson = json_decode(file_get_contents('php://input'), true);
$sold = $postjson['sold'];
$employeeid = $postjson['employeeid'];
$cash = doubleval($postjson['cash']);
$myobj = array();
$pass = array();

$q = "INSERT INTO whole_sold(employee_id,cash) VALUES(?,?)";
if(!empty($postjson['notes'])){
    $notes = strval($postjson['notes']);
    $q = "INSERT INTO whole_sold(employee_id,cash,notes) VALUES(?,?,?)";
    $stmt = $conn->prepare($q);
    $stmt->bind_param("ids",$employeeid,$cash,$notes);
}else{
    $stmt = $conn->prepare($q);
    $stmt->bind_param("id",$employeeid,$cash);
}

$exe = $stmt->execute();
if($exe){
    $insert_id = $conn->insert_id;
    foreach($sold as $key => $value){
        // $myobj[] = $arrayName = array('value' => $value['data']['barcode']);
        $myobj[] = $arrayName = array('value' => $value['data']);
        $quantity = $value['data']['quantity'];
        $price_id = $value['data']['price']['id'];
        $id = $value['data']['id'];
        
        $q = "INSERT INTO sold(whole_sold_id,product_id,quantity,price_id) VALUES($insert_id,$id,$quantity,$price_id)";
        $exe = $conn->query($q);
        if($exe){
            array_push($pass,true);
        }else{
            $conn->rollback();
            array_push($pass,false);
        }
    }
}else{
    $myobj = $arrayName = array('message' => 'error occured');
}
if(in_array(false,$pass)){
    $myobj = $arrayName = array('message' => 'error occured');
}else{
    $myobj = $arrayName = array('message' => 'success');
}


echo json_encode($myobj);



?>