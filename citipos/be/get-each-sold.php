 

<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);


require_once("include/connection.php");
require_once("include/timezone.php");
require_once("global/methods.php");
$conn = new connection();
$conn = $conn->connectionString();
$methods = new globalMethods();
$id = intval($_GET['id']);
$myobj = array();
 $q = "SELECT * FROM sold WHERE whole_sold_id = $id";
$exe = $conn->query($q);
 while ($row = mysqli_fetch_array($exe)) {
        $product = $methods->getProduct($row['product_id'],$conn);
	$myobj[] = $arrayName = array(
									'id' => $row['id'],
									'product' => $product,
                                    'quantity' => $row['quantity'],
									'date_updated' => $row['date_updated'],
									'date_created' => $row['date_created']


	 );

 	

 	

 }
 echo json_encode($myobj);
?>