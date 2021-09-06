<?php
 require_once("../include/header.php");

require_once("../include/connection.php");
require_once("../include/timezone.php");
require_once("../global/methods.php");

$conn = new connection();
$conn = $conn->connectionString();
$methods = new globalMethods();
$postjson = json_decode(file_get_contents('php://input'), true);
$myobj = array();

$fname = $postjson['fname'];
$lname = $postjson['lname'];
$address = $postjson['address'];
$gender = $postjson['gender'];

$contact = $postjson['contact'];

$q = "INSERT INTO owner(fname,lname,address,contact,gender) VALUES(?,?,?,?,?)";
$stmt = $conn->prepare($q);

$stmt->bind_param("sssss",$fname,$lname,$address,$contact,$gender);
$exe = $stmt->execute();

if ($exe) {
	$q = "SELECT * FROM owner WHERE contact = ?";
	$stmt = $conn->prepare($q);
	$stmt->bind_param("s", $contact);
	$stmt->execute();

	$result = $stmt->get_result();
	$id = 0;
	while ($row = $result->fetch_assoc()) {
     $id = intval($row['id']);
      
	}


	$q = "INSERT INTO credentials(owner_id,username,password) VALUES(?,?,?)";
	$stmt = $conn->prepare($q);
	$stmt->bind_param("iss", $id,$contact,$lname);
	$stmt->execute();
	$myobj = $arrayName = array('message' => "success",
								'tmp' => $q
	 );
}else{
	$myobj = $arrayName = array('message' => "failed" );
}
echo json_encode($myobj);
?>