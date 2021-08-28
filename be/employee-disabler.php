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
$myobj = array();
$id = intval($postjson['id']);
$disabled = boolval($postjson['disabled']);
if($disabled == true){
    $disabled = 0;
}else{
    $disabled = 1;
}
$q = "UPDATE employees SET disabled = $disabled WHERE id = $id";
$exe = $conn->query($q);
if($exe){
    $myobj = $arrayName = array('message' => 'success');
}else{
    $myobj = $arrayName = array('message' => 'failed');
}
echo json_encode($myobj);



?>