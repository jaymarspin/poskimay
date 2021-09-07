<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);


require_once("include/connection.php");
require_once("global/methods.php");
$methods = new globalMethods();
$conn = new connection();
$conn = $conn->connectionString();
$myobj = array();
$q = "SELECT * FROM employees ";
$exe = $conn->query($q);

while ($row = mysqli_fetch_array($exe)) {
    $myobj[] =  $arrayName = array(
        'id' => $row['id'],
        'fname' => ucfirst($row['fname']),
        'lname' => ucfirst($row['lname']),
        'address' => $row['address'],
        'contact' => $row['contact'],
        'gender' => ucwords($row['gender']),
        'date_updated' => $row['date_updated'],
        'date_created' => $row['date_created']


    );
}
echo json_encode($myobj);


?>