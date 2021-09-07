<?php

require_once("include/connection.php");
$conn = new connection();
$conn = $conn->connectionString();
$myobj = array();

$id = $_GET['id'];
$limit = $_GET['limit'];
$page = $_GET['page'];
$count = 0;

$limitcount = intval($page) * intval($limit);
$tmp = array();
$baselimit = $limitcount - intval($limit);
 $q = "SELECT * FROM business WHERE brgy = $id ORDER BY businessname ASC";
$exe = $conn->query($q);
$businessess_count = $exe->num_rows;
 while ($row = mysqli_fetch_array($exe)) {

 	if ($count >= $baselimit) {
 		$tmp[] = $arrayName = array('businesstype' => $row['businesstype'],
 									'businessname' => ucwords($row['businessname']),
 									'businessemail' => $row['businessemail'],
 									'businesscontact' => $row['businesscontact'],
 									'businessaddress' => $row['businessaddress'],
 									'ownersfname' => $row['ownersfname'],
 									'ownerslastname' => $row['ownerslastname'],
 									'ownersaddress' => $row['ownersaddress'],
 									'initial' => $row['initial'],
 								'id' => intval($row['id'])


 	 ); 
 	}
 	

 	$count += 1;
 	if ($count > $limitcount - 1) {
 		break;
 	}


 }
 $myobj = $arrayName = array('businessess_count' => $businessess_count,
 								'business' => $tmp,
 								'limitcount' => $limitcount
  );
 echo json_encode($myobj);
?>