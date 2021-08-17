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
    $q = "INSERT INTO attendance(employee_id,time_in) VALUES(?,NOW())";
    $stmt = $conn->prepare($q);
    $stmt->bind_param("i",$id);
    $exe = $stmt->execute();
    if($exe){
        $myobj = $arrayName = array('message' => 'success');
    }else{
        $myobj = $arrayName = array('message' => 'Error Occured!');
    }
  }else{
    $q = "SELECT * FROM attendance WHERE employee_id = $id";
    $exe = $conn->query($q);
    $attendance_id = 0;
    $suggestlogin = false;
    $last_date = null;
    $last_timeout = null;
 
        while($row = mysqli_fetch_array($exe)){
            $attendance_id = intval($row['id']);
            $last_date = strtotime($row['time_in']);
            $last_timeout = $row['time_out'];
             
        }
        if(is_null($last_timeout)){
            $hours = $methods->getTimeElapseHours($last_date);
            if(intval($hours) > 9){
                $suggestlogin = true;
                if(!empty($postjson['goTimeOut'])){
                    $suggestlogin = false;
                }
            
        }if($suggestlogin == false ){
            $q = "UPDATE attendance SET time_out = NOW() WHERE id = $attendance_id";
            $exe = $conn->query($q);
            if($exe){
                $myobj = $arrayName = array('message' => 'success');
            }else{
                $myobj = $arrayName = array('message' => 'Error Occured!');
            }
        }else{
            $myobj = $arrayName = array('message' => 'suggesttimein',
                                        'hours' => $hours
            );
        }
        }else{
            $myobj = $arrayName = array('message' => 'shouldTimeIn',
                                        
            );
        }
        
  }
echo json_encode($myobj)
?>