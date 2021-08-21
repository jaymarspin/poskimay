
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

$start = date("d-M-Y", strtotime($_GET['start']));
$start = strtotime($start);

$end = date("d-M-Y", strtotime($_GET['end']));
$end = strtotime($end);

$count = 0;

$limitcount = intval($page) * intval($limit);
$tmp = array();
$baselimit = $limitcount - intval($limit);
$q = "SELECT * FROM whole_sold ORDER by id DESC";
$exe = $conn->query($q);
$exe2 = $conn->query($q);
$sold_count = 0;
$date_created = 0;
while ($row2 = mysqli_fetch_array($exe2)) {
	$date_created = date("Y-M-d", strtotime(strval($row2['date_created'])));
	$date_created = strtotime($date_created);

	if ($date_created >= $start && $date_created <= $end) {
		$sold_count += 1;
	}
}

while ($row = mysqli_fetch_array($exe)) {
	$date_created = date("Y-M-d", strtotime(strval($row['date_created'])));
	$date_created = strtotime($date_created);

	if ($date_created >= $start && $date_created <= $end) {
		if ($count >= $baselimit) {



			$products_sold = $methods->getProductsSold(intval($row['id']), $conn);
			$tmp[] = $arrayName = array(
				'employee_id' => $row['employee_id'],
				'cash' => $row['cash'],
				'products' => $products_sold,
				'id' => intval($row['id']),
				'date_created' => $row['date_created']
			);
		}
		$count += 1;
	}
	



	if ($count > $limitcount - 1) {
		break;
	}
}
$myobj = $arrayName = array(
	'sold_count' => $sold_count,
	'sold' => $tmp,
	'limitcount' => $limitcount,
	'start' => $start,
	'end' => $end,
	'date_created' => $date_created,
	'baselimit' => $baselimit

);
echo json_encode($myobj);
?>