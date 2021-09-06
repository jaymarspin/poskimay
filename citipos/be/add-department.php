<?php
 require_once("include/header.php");

require_once("include/connection.php");
require_once("include/timezone.php");
require_once("global/methods.php");

$conn = new connection();
$conn = $conn->connectionString();
$methods = new globalMethods();
$postjson = json_decode(file_get_contents('php://input'), true);
$id = intval($postjson['id']);
$department = $postjson['department'];
$myobj = array();
$q = "INSERT INTO departments(shop_id,department) VALUES(?,?)";
$stmt = $conn->prepare($q);

$stmt->bind_param("is",$id,$department);

$exe = $stmt->execute();
if ($exe) {
	$myobj = $arrayName = array('message' => "success" );
}else{
	$myobj = $arrayName = array('message' => "error Occured" );
}


echo json_encode($myobj);





?>