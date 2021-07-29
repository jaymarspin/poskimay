<?php
 require_once("include/header.php");

require_once("include/connection.php");
require_once("include/timezone.php");
require_once("global/methods.php");

$conn = new connection();
$conn = $conn->connectionString();
$methods = new globalMethods();
$postjson = json_decode(file_get_contents('php://input'), true);
$myobj = array();
$shop_id = intval($postjson['shop_id']);
$fname = $postjson['fname'];
$lname = $postjson['lname'];
$address = $postjson['address'];
$contact = $postjson['contact'];
$gender = $postjson['gender'];

$q = "INSERT INTO employees(shop_id,fname,lname,address,contact,gender) VALUES(?,?,?,?,?,?)";
$stmt = $conn->prepare($q);

$stmt->bind_param("isssss",$shop_id,$fname,$lname,$address,$contact,$gender);
$exe = $stmt->execute();

if ($exe) {
	$myobj = $arrayName = array('message' => "success" );
}else{
	$myobj = $arrayName = array('message' => "failed" );
}
echo json_encode($myobj);

 // let data = {
 //      fname: this.fname,
 //      lname: this.lname,
 //      address: this.lname,
 //      contact: this.contact,
 //      gender: this.gender
 //    }

?>