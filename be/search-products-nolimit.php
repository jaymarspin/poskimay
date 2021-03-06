 

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

$page = $_GET['page'];
$search = strval($_GET['search']);
$search = trim($search);
$count = 0;


$tmp = array();

$q = "SELECT * FROM products WHERE deleted = 0 && product_name = '$search' ORDER BY id DESC";
$exe = $conn->query($q);
$products_count = $exe->num_rows;
while ($row = mysqli_fetch_array($exe)) {

		$category = $methods->getProductCategory($row['category'], $conn);
	
			$price = $methods->getProductPrice(intval($row['id']), $conn);
			$stocks = $methods->getProductStock(intval($row['id']), $conn);
			$image = $methods->getProductImage(intval($row['id']), $conn);
			$tmp[] = $arrayName = array(
				'product_name' => ucwords($row['product_name']),
				'id' => intval($row['id']),
				'category' => $category,
				'barcode' => $row['barcode'],
				'price' => $price,
				'stocks' => $stocks,
				'image' => $image,
				'quantity' => 1,
				'availability' => intval($row['availability']),
				'description' => nl2br($row['description']),
				'date_updated' => $row['date_updated'],
				'date_created' => $row['date_created']


			);
		


	
}
$myobj = $arrayName = array(
	'products_count' => $products_count,
	'products' => $tmp,
);
echo json_encode($myobj);
?>