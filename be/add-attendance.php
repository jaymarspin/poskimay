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
if ($in_out == 'time in') {
    $q = "INSERT INTO attendance(employee_id,time_in) VALUES(?,NOW())";
    $stmt = $conn->prepare($q);
    $stmt->bind_param("i", $id);
    $exe = $stmt->execute();
    if ($exe) {

        if (addSelfie($postjson['myimage'], $conn,$in_out,$conn->insert_id) == true) {
            $myobj = $arrayName = array('message' => 'success');
        } else {
            $myobj = $arrayName = array('message' => 'Error Occured!1');
            $conn->rollback();
        }
    } else {
        $myobj = $arrayName = array('message' => 'Error Occured!2');
    }
} else {
    $q = "SELECT * FROM attendance WHERE employee_id = $id";
    $exe = $conn->query($q);
    $attendance_id = 0;
    $suggestlogin = false;
    $last_date = null;
    $last_timeout = null;

    while ($row = mysqli_fetch_array($exe)) {
        $attendance_id = intval($row['id']);
        $last_date = strtotime($row['time_in']);
        $last_timeout = $row['time_out'];
    }
    if (is_null($last_timeout)) {
        $hours = $methods->getTimeElapseHours($last_date);
        if (intval($hours) > 9) {
            $suggestlogin = true;
            if (!empty($postjson['goTimeOut'])) {
                $suggestlogin = false;
            }
        }
        if ($suggestlogin == false) {
            $q = "UPDATE attendance SET time_out = NOW() WHERE id = ?";
            $stmt = $conn->prepare($q);
            $stmt->bind_param("i",$attendance_id);

            $exe = $stmt->execute();
            if ($exe) {
                $q = "SELECT id,employee_id FROM attendance WHERE employee_id = $id ORDER BY id DESC LIMIT 1";
                $exe = $conn->query($q);
                while($row = mysqli_fetch_array($exe)){
                    $attendance_id = intval($row['id']);
                }
                if (addSelfie($postjson['myimage'], $conn, $in_out,$attendance_id) == true) {
                    $myobj = $arrayName = array('message' => 'success');
                } else {
                    $myobj = $arrayName = array('message' => 'Error Occured!');
                    $conn->rollback();
                }
            } else {
                $myobj = $arrayName = array('message' => 'Error Occured!');
            }
        } else {
            $myobj = $arrayName = array(
                'message' => 'suggesttimein',
                'hours' => $hours
            );
        }
    } else {
        $myobj = $arrayName = array(
            'message' => 'shouldTimeIn',

        );
    }
}



function addSelfie($myimage, $connection,$in_out,$id)
{
    $tmp = false;
    $value = explode(",", $myimage);
    $img = base64_decode($value[1]);
    $target_path = "attendance/" . uniqid("" . false) . time() . "." . 'jpg';
    $done = file_put_contents($target_path, $img);
    if ($done) {
        $q = "INSERT INTO attendance_pic(attendance_id,imagePath,in_out) VALUES(?,?,?)";
        $stmt = $connection->prepare($q);
        $stmt->bind_param("iss", $id, $target_path,$in_out);
        $exe = $stmt->execute();
        if ($exe) {
            $tmp = true;
        } else {
            $tmp = false;
            $connection->rollback();
        }
    }

    return $tmp;
}
echo json_encode($myobj);
