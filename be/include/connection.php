<?php
include("timezone.php");
class connection
{
	private $host = "localhost";
	private $db = "pos";
	private $db_user = "root";
	private $db_pass = "";
	
	function connectionString(){ 
		return new mysqli($this->host,$this->db_user,$this->db_pass,$this->db);
	}
	function __construct()
	{
		
	} 
}
// $conn = new connection();
// $conn = $conn->connectionString();
?>