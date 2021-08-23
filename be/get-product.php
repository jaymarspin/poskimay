 

<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
 require_once("include/header.php");

require_once("include/connection.php");
require_once("include/timezone.php");
require_once("global/methods.php");
$conn = new connection();
$conn = $conn->connectionString();
$methods = new globalMethods();
$myobj = array();

$id = $_GET['id'];


 $q = "SELECT * FROM products WHERE id = $id";
$exe = $conn->query($q);

 while ($row = mysqli_fetch_array($exe)) {


 		 

 		$price = $methods->getProductPrice(intval($row['id']),$conn);
	$stocks = $methods->getProductStock(intval($row['id']),$conn);
	$image = $methods->getProductImage(intval($row['id']),$conn);
	$myobj = $arrayName = array('product_name' => ucwords($row['product_name']),
									'id' => intval($row['id']),
									'category' => $methods->getProductCategory($row['category'],$conn),
									'barcode' => $row['barcode'],
									'price' => $price,
									'stocks' => $stocks,
									'image' => $image,
									'description' => nl2br($row['description']),
									'date_updated' => $row['date_updated'],
									'date_created' => $row['date_created']


	 );
 	
 	



 }

 echo json_encode($myobj);
?>