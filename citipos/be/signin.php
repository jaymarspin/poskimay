<?php
 include "include/header.php";

 include "include/connection.php";
 include "include/timezone.php";
 include "global/methods.php";

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
	$active = 1;
	$disabled = 0;
	while ($row = $result->fetch_assoc()) {
     $id = intval($row['id']);
	 $empid = intval($row['employee_id']);
	 if($role == 'employee'){
		 $q = "SELECT * FROM employees WHERE id = $empid";
		 $exe2 = $conn->query($q);
		 while($row2 = mysqli_fetch_array($exe2)){
			$active = intval($row2['active']);
			$disabled = intval($row2['disabled']);
		 }
	 }
	}
	if($result->num_rows > 0){
		if($role == 'employee'){
			if($active == 1 && $disabled == 0){
				$myobj = $arrayName = array('message' => 'success',
									'id' => $id
									
		 	);	
			}else{
				$myobj = $arrayName = array('message' => "Account Not Found" );
			}
		}else{
			$myobj = $arrayName = array('message' => 'success',
									'id' => $id
									
		 	);
		}
		
	}else{
		$myobj = $arrayName = array('message' => "Account Not Found" );
	}
	
	echo json_encode($myobj);
?>