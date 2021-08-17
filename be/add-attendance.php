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
$id = intval($postjson['id']);

$in_out = $postjson['inout'];
$myobj = array();
if($in_out == 'time in'){
    $q = "INSERT INTO attendance(employee_id,time_in) VALUES(?,?)";
    $stmt = $conn->prepare($q);
    $date = date('H:i:s');
    $stmt->bind_param("ii",$id,$date);
    $stmt->execute();
    $q = "INSERT INTO attendance(employee_id,time_id) VALUES($id,$date)";
}else{

}
$myobj = $arrayName = array('message' => $q );
echo json_encode($myobj)
?>