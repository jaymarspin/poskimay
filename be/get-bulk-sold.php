<?php
 require_once("include/header.php");

require_once("include/connection.php");
require_once("include/timezone.php");
require_once("global/methods.php");

$conn = new connection();
$conn = $conn->connectionString();
$methods = new globalMethods();

$q = "SELECT * FROM whole_sold";
$exe = $conn->query($q);
$myobj = array();
    while($row = mysqli_fetch_array($exe)){
        $products_sold = $methods->getProductsSold(intval($row['id']),$conn);
        $myobj[] = $arrayName = array('employee_id' => $row['employee_id'],
                                    'cash' => $row['cash'],
    );
}

echo json_encode($myobj);

?>