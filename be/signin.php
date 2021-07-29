<?php
 require_once("include/header.php");

require_once("include/connection.php");
require_once("include/timezone.php");
require_once("global/methods.php");

$conn = new connection();
$conn = $conn->connectionString();
$methods = new globalMethods();
$postjson = json_decode(file_get_contents('php://input'), true);
$username = $postjson['username'];
$password = $postjson['password'];
$role = $postjson['accountType'];
$table = 'credentials';
if($role == 'employee'){
	$table = 'employee_acounts';

}

$q = "SELECT * FROM $table WHERE username = ? && password = ?";
$stmt = $conn->prepare($q);
$stmt->bind_param("ss", $username,$password);
	$stmt->execute();

	$result = $stmt->get_result();
	$id = 0;
	while ($row = $result->fetch_assoc()) {
     $id = intval($row['id']);
      
	}
	if($result->num_rows > 0){
		$myobj = $arrayName = array('message' => 'success',
									'id' => $id
									
		 );
	}else{
		$myobj = $arrayName = array('message' => "Account Not Found" );
	}
	
	echo json_encode($myobj);
?>