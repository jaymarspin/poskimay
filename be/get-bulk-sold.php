
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

$limit = $_GET['limit'];
$page = $_GET['page'];
$start = $_GET['start'];
$end = $_GET['end'];
$count = 0;

$limitcount = intval($page) * intval($limit);
$tmp = array();
$baselimit = $limitcount - intval($limit);
$q = "SELECT * FROM whole_sold";
$exe = $conn->query($q);
$sold_count = $exe->num_rows;
 while ($row = mysqli_fetch_array($exe)) {

 	if ($count >= $baselimit) {
        $products_sold = $methods->getProductsSold(intval($row['id']),$conn);
        $tmp[] = $arrayName = array('employee_id' => $row['employee_id'],
                                    'cash' => $row['cash'],
                                    'products' => $products_sold,
                                    'id' => intval($row['id']),
                                    'date_created' => $row['date_created']
    );
 	}
 	

 	$count += 1;
 	if ($count > $limitcount - 1) {
 		break;
 	}


 }
 $myobj = $arrayName = array('sold_count' => $sold_count,
 								'sold' => $tmp,
 								'limitcount' => $limitcount,
								 'start' => $start,
								 'end' => $end
  );
 echo json_encode($myobj);
?>