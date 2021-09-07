<?php

require_once("include/connection.php");
require_once("include/timezone.php");
require_once("global/methods.php");

$conn = new connection();
$conn = $conn->connectionString();
$methods = new globalMethods();
$myobj = array(); 
$id = $_GET['id'];
$q = "SELECT * FROM employees WHERE id = $id";
$exe = $conn->query($q);
while ($row = mysqli_fetch_array($exe)) {

	$employeeRoles = $methods->getEmployeeRoles($row['id'],$conn);
	$myobj = $arrayName = array(

		'id' => $row['id'],
									'fname' => $row['fname'],
									'lname' => $row['lname'],
									'address' => $row['address'],
									'contact' => $row['contact'],
									'gender' => ucwords($row['gender']),
									'date_updated' => $row['date_updated'],
									'date_created' => $row['date_created'],
									'employeeRoles' => $employeeRoles
	 );
}
echo json_encode($myobj);

?>