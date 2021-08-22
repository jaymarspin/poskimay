 

<?php
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
$count = 0;

$limitcount = intval($page) * intval($limit);
$tmp = array();
$baselimit = $limitcount - intval($limit);
 $q = "SELECT * FROM employees WHERE active = 1 ORDER BY id DESC";
$exe = $conn->query($q);
$employees_count = $exe->num_rows;
 while ($row = mysqli_fetch_array($exe)) {

 	if ($count >= $baselimit) {
 		 

 		$rendered = $methods->getRenderedHours(intval($row['id']),$conn);
	$tmp[] = $arrayName = array(
									'id' => $row['id'],
									'fname' => $row['fname'],
									'lname' => $row['lname'],
									'address' => $row['address'],
                                    'rendered' => $rendered,
									'gender' => ucwords($row['gender']),
								 


	 );
 	}
 	

 	$count += 1;
 	if ($count > $limitcount - 1) {
 		break;
 	}


 }
 $myobj = $arrayName = array('employees_count' => $employees_count,
 								'employees' => $tmp,
 								'limitcount' => $limitcount
  );
 echo json_encode($myobj);
?>