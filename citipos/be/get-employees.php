
<?php

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
 if(!empty($_GET['search'])){
	 $search = $_GET['search'];
	 $search = trim($search);
	$q = "SELECT * FROM employees WHERE active = 1 && (fname LIkE '%$search' || lname LIkE '%$search' || address LIkE '%$search') ORDER BY id DESC";
 }
$exe = $conn->query($q);
$employees_count = $exe->num_rows;
 while ($row = mysqli_fetch_array($exe)) {

 	if ($count >= $baselimit) {
 		 

 		
	$tmp[] = $arrayName = array(
									'id' => $row['id'],
									'fname' => $row['fname'],
									'lname' => $row['lname'],
									'address' => $row['address'],
									'contact' => $row['contact'],
									'gender' => ucwords($row['gender']),
									'disabled' => intval($row['disabled']),
									'date_updated' => $row['date_updated'],
									'date_created' => $row['date_created']


	 );
 	}
 	

 	$count += 1;
 	if ($count > $limitcount - 1) {
 		break;
 	}


 }
 $myobj = $arrayName = array('employees_count' => $employees_count,
 								'employees' => $tmp,
 								'limitcount' => $limitcount,
								 'q' => $q
  );
 echo json_encode($myobj);
?>