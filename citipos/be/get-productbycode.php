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

$code = $_GET['code'];

$q = "SELECT * FROM products WHERE barcode = ? && deleted = 0";
$stmt = $conn->prepare($q);
$stmt->bind_param("s",$code);
$stmt->execute();
$result = $stmt->get_result();

/* Get the number of rows */
// $num_of_rows = $result->num_rows;

while ($row = $result->fetch_assoc()) {
     

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
                                     'quantity' => 1,
                                     'availability' => intval($row['availability']),
                                     'date_updated' => $row['date_updated'],
                                     'date_created' => $row['date_created']
 
 
      );
 
}

echo json_encode($myobj);

?>