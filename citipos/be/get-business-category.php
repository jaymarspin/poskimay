<?php


require_once("include/connection.php");
require_once("include/timezone.php");
require_once("global/methods.php");

$conn = new connection();
$conn = $conn->connectionString();
$methods = new globalMethods();
$myobj = array(); 
$q = "SELECT * FROM business_category ORDER BY category ASC";
$exe = $conn->query($q);
while ($row = mysqli_fetch_array($exe)) {
	$myobj[] = $arrayName = array('category' => ucwords($row['category']),
									'id' => $row['id']
	 );
}
echo json_encode($myobj);

?>