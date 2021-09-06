<?php
 require_once("include/header.php");

require_once("include/connection.php");
require_once("include/timezone.php");
require_once("global/methods.php");

$conn = new connection();
$conn = $conn->connectionString();
$methods = new globalMethods();
$postjson = json_decode(file_get_contents('php://input'), true);
$owners_id = $postjson['owners_id'];
$business = $postjson['business'];
$businesstype = $postjson['businesstype'];

// let data = {
//         business: this.business,
//         businesstype: this.businesstype
//       }
$myobj = array();
$q = "INSERT INTO business(business_name,owners_id,category) VALUES(?,?,?)";
$stmt = $conn->prepare($q);

$stmt->bind_param("sii",$business,$owners_id,$businesstype);

$exe = $stmt->execute();
if ($exe) {
	$myobj = $arrayName = array('message' => "success" );
}else{
	$myobj = $arrayName = array('message' => "error Occured" );
}


echo json_encode($myobj);





?>