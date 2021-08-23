 

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

$id = intval($_GET['id']);
$timeID = intval($_GET['timeid']);
$q = "SELECT * FROM attendance WHERE employee_id = $id && id = $timeID";
$exe = $conn->query($q);
while($row = mysqli_fetch_array($exe)){
    $getAttendacePic = $methods->getAttendacePic($timeID,$conn);
        $myobj = $arrayName = array(
            'time_in' => $row['time_in'],
            'time_out' => $row['time_out'],
            'attendacePic' => $getAttendacePic,
            'date_created' => $row['date_created']
        );
    
    
}
echo json_encode($myobj);

?>