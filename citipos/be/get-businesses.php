<?php


require_once("include/connection.php");
require_once("include/timezone.php");
require_once("global/methods.php");

$conn = new connection();
$conn = $conn->connectionString();
$methods = new globalMethods();
$myobj = array(); 
$id = $_GET['id'];
$q = "SELECT * FROM business WHERE owners_id = $id";
$exe = $conn->query($q);
while ($row = mysqli_fetch_array($exe)) {
	$myobj[] = $arrayName = array('business_name' => ucwords($row['business_name']),
									'id' => $row['id'],
									'category' => $methods->getBusinessCategory($row['category'],$conn),
									'image_assets' => $methods->getBusinessPng(intval($row['category']))
	 );
}
echo json_encode($myobj);

?>