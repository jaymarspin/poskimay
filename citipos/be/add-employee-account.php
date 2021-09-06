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
$username = $postjson['username'];
$password = $postjson['password'];
$roles = $postjson['roles'];
$myobj = array();
$q = "INSERT INTO employee_acounts(employee_id,username,password) VALUES(?,?,?)";
$stmt = $conn->prepare($q);

$stmt->bind_param("iss",$id,$username,$password);

$exe = $stmt->execute();
if ($exe) {

	foreach ($roles as $key => $value) {
		if (boolval($value['isChecked']) == true) {
			$role = $value['val'];

			$q = "INSERT INTO accounts_roles(employee_id,role) VALUES(?,?)";
			$stmt = $conn->prepare($q);
			$stmt->bind_param("is",$id,$role);
			$exe = $stmt->execute();

		}
	}
	$myobj = $arrayName = array('message' => "success",
	 );
}else{
	$myobj = $arrayName = array('message' => "error Occured" );
}


echo json_encode($myobj);





?>