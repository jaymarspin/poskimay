 

<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once("include/connection.php");
require_once("include/timezone.php");
require_once("global/methods.php");
$conn = new connection();
$conn = $conn->connectionString();
$methods = new globalMethods();
$myobj = array();

$limit = $_GET['limit'];
$page = $_GET['page'];
$count = 0;

$limitcount = intval($page) * intval($limit);
$tmp = array();
$baselimit = $limitcount - intval($limit);
$q = "SELECT * FROM products WHERE deleted = 0 ORDER BY id DESC";
$exe = $conn->query($q);
$products_count = $exe->num_rows;
if (!empty($_GET['category'])) {
	$exe2 = $conn->query($q);
	$products_count = 1;
	while ($row = mysqli_fetch_array($exe2)) {
		$category = $methods->getProductCategory($row['category'], $conn);
		if (intval($category['id']) == intval($_GET['category'])) {
			$products_count += 1;
		}
	}
}

while ($row = mysqli_fetch_array($exe)) {
	if ($count >= $baselimit) {
		$category = $methods->getProductCategory($row['category'], $conn);
		$tmp2 = true;
		if (!empty($_GET['category'])) {

			if (intval($category['id']) != intval($_GET['category'])) {
				$tmp2 = false;
			}
		}
		if ($tmp2 == true) {
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
	}


	$count += 1;
	if ($count > $limitcount - 1) {
		break;
	}
}
$myobj = $arrayName = array(
	'products_count' => $products_count,
	'products' => $tmp,
	'limitcount' => $limitcount,
);
echo json_encode($myobj);
?>