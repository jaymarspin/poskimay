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
$postjson = json_decode(file_get_contents('php://input'), true);

// let data = {
//         productname: this.productname,
//         stocks: this.stocks,
//         category: this.category,
//         barcode: this.barcode,
        
//       }
$imageinsrt = false;
$myobj = array();
$productname = $postjson['productname'];
$stocks = $postjson['stocks'];
$category = $postjson['category'];
$barcode = $postjson['barcode'];
$price = doubleval($postjson['price']);
$description = $postjson['description'];
$base64data = $postjson['base64data'];

$q = "INSERT INTO products(product_name,category,description,barcode) VALUES(?,?,?,?)";
$stmt = $conn->prepare($q);
$stmt->bind_param("ssss",$productname,$category,$description,$barcode);
$exe = $stmt->execute();
if ($exe) {
	
	$id = $conn->insert_id;
	$q = "INSERT INTO products_stocks(product_id,stocks_count) VALUES(?,?)";
	$stmt = $conn->prepare($q);
	$stmt->bind_param("ii",$id,$stocks);
	$exe = $stmt->execute();

	$q = "INSERT INTO product_price(product_id,price) VALUES(?,?)";
	$stmt = $conn->prepare($q);
	$stmt->bind_param("id",$id,$price);
	$exe = $stmt->execute();
	
	if (!empty($base64data)) {
						$value = explode(",", $base64data);
						$img = base64_decode($value[1]);
						$target_path = "gallery/100/".uniqid("".false).time().".".'jpg'; 
						$done = file_put_contents($target_path, $img);
							 if ($done) {
					 	$destination50 = "gallery/50/".uniqid("".false).time().".".'jpg';
						$compress50 = $methods->compress($target_path,$destination50,50);
						$destination20 = "gallery/20/".uniqid("".false).time().".".'jpg';
						$compress20 = $methods->compress($target_path,$destination20,20);
						if($destination50 == "" || $destination50 == null){
							$destination50 = $target_path;
						}if($destination20 == "" || $destination20 == null){
							$destination20 = $target_path;
						}
						$q = "INSERT INTO product_image(product_id,name20,name50,name100) VALUES(?,?,?,?)";
						 	$stmt = $conn->prepare($q);
						 	$stmt->bind_param("isss",$id,$destination20,$destination50,$target_path);
						 	$exe = $stmt->execute();
						 	if ($exe) {
						 		$imageinsrt = true;
						 	}					
					 }
	}

	$myobj = $arrayName = array('message' => "success",
								'imageinsert' => $base64data
	 );
}else{
	$myobj = $arrayName = array('message' => "error occured!" );
}

echo json_encode($myobj);

?>