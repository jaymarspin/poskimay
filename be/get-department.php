<?php
 require_once("include/header.php");

require_once("include/connection.php");
require_once("include/timezone.php");
require_once("global/methods.php");

$conn = new connection();
$conn = $conn->connectionString();
$methods = new globalMethods();
$myobj = array();
$id = $_GET['id'];
$q = "SELECT * FROM departments WHERE shop_id = $id  ORDER BY id DESC";
$exe = $conn->query($q);
while ($row = mysqli_fetch_array($exe)) {
	$myobj[] = $arrayName = array('department' => $row['department'],
									'id' => $row['id']
	 );
}
echo json_encode($myobj);

?>