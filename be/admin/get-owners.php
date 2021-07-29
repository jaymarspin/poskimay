<?php
 require_once("../include/header.php");

require_once("../include/connection.php");
require_once("../include/timezone.php");
require_once("../global/methods.php");

$conn = new connection();
$conn = $conn->connectionString();
$methods = new globalMethods();
$myobj = array();
$q = "SELECT * FROM owner ORDER BY id DESC";

$exe = $conn->query($q);
while ($row = mysqli_fetch_array($exe)) {
	$myobj[] = $arrayName = array('fname' => $row['fname'],
								'lname' => $row['lname'],
								'contact' => $row['contact'],
								'address' => $row['address'],
								'gender' => $row['gender']
	 );
}

echo json_encode($myobj);



?>