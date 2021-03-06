<?php

/**
 * 
 */

class globalMethods
{

	function __construct()
	{
	}

	function getBusinessCategory($id, $conn)
	{
		$q = "SELECT * FROM business_category WHERE id = $id";
		$exe = $conn->query($q);
		$myobj = array();
		while ($row = mysqli_fetch_array($exe)) {

			$myobj = $arrayName = array(
				'category' => ucwords($row['category']),
				'id' => $row['id']


			);
		}

		return $myobj;
	}

	function getProductsSold($id, $conn)
	{
		$q = "SELECT * FROM sold WHERE whole_sold_id = $id";
		$exe = $conn->query($q);
		$myobj = array();
		while ($row = mysqli_fetch_array($exe)) {
			$myobj[] = $arrayName = array(
				'id' => $row['id'],
				'product' => $this->getProduct($row['product_id'], $conn),
				'quantity' => $row['quantity'],
				'date_updated' => $row['date_updated'],
				'date_created' => $row['date_created']


			);
		}
		return $myobj;
	}
	function getProductCategory($id, $conn)
	{
		$q = "SELECT * FROM categories WHERE id = $id";
		$exe = $conn->query($q);
		$myobj = array();
		while ($row = mysqli_fetch_array($exe)) {

			$myobj = $arrayName = array(
				'category' => ucwords($row['category']),
				'id' => intval($row['id'])


			);
		}

		return $myobj;
	}


	function getProduct($id, $conn)
	{
		$q = "SELECT * FROM products WHERE id = $id";
		$exe = $conn->query($q);
		$myobj = array();
		while ($row = mysqli_fetch_array($exe)) {

			$price = $this->getProductPrice(intval($row['id']), $conn);
			$stocks = $this->getProductStock(intval($row['id']), $conn);
			$image = $this->getProductImage(intval($row['id']), $conn);
			$myobj = $arrayName = array(
				'product_name' => ucwords($row['product_name']),
				'id' => $row['id'],
				'category' => $this->getProductCategory($row['category'], $conn),
				'barcode' => $row['barcode'],
				'price' => $price,
				'stocks' => $stocks,
				'image' => $image,
				'quantity' => 1,
				'description' => nl2br($row['description']),
				'date_updated' => $row['date_updated'],
				'date_created' => $row['date_created']


			);
		}

		return $myobj;
	}

	function getEmployeeRoles($id, $conn)
	{
		$q = "SELECT * FROM accounts_roles WHERE employee_id = $id && active = 1";
		$exe = $conn->query($q);
		$myobj = array();
		while ($row = mysqli_fetch_array($exe)) {
			if (!in_array($row['role'], $myobj)) {
				array_push($myobj, $row['role']);
			}
		}

		return $myobj;
	}
	function getProductPrice($id, $conn)
	{
		$q = "SELECT * FROM product_price WHERE product_id = $id";
		$exe = $conn->query($q);
		$myobj = array();
		while ($row = mysqli_fetch_array($exe)) {

			$myobj = $arrayName = array(
				'price' => doubleval($row['price']),
				'id' => $row['id']


			);
		}

		return $myobj;
	}


	function getAttendacePic($id, $conn)
	{
		$q = "SELECT * FROM attendance_pic WHERE attendance_id = $id";
		$exe = $conn->query($q);
		$myobj = array();
		while ($row = mysqli_fetch_array($exe)) {

			$myobj[] = $arrayName = array(
				'imagePath' => $row['imagePath'],
				'in_out' => $row['in_out']

			);
		}

		return $myobj;
	}

	function getRenderedHours($id, $start, $end, $conn)
	{
		$q = "SELECT * FROM attendance WHERE employee_id = $id";
		$exe = $conn->query($q);
		$myobj = array();
		$rendered = array();
		$notimeout = array();
		while ($row = mysqli_fetch_array($exe)) {
			$time_in = date("Y-M-d", strtotime(strval($row['time_in'])));
			$time_in = strtotime($time_in);
			$time_out = date("Y-M-d", strtotime(strval($row['time_out'])));
			$time_out = strtotime($time_out);

			if ($time_in >= $start && $time_out <= $end) {
				if (!empty($row['time_in']) && !empty($row['time_out'])) {
					$torender = $this->getTimeElapseHoursTwoDates(strval($row['time_in']), strval($row['time_out']));
					$tmp = $arrayName = array(
						'torender' => $torender,
						'time_in' => $row['time_in'],
						'time_out' => $row['time_out'],
						'id' => intval($row['id'])
					);
					array_push($rendered, $tmp);
				} else if ($row['time_in'] && empty($row['time_out'])) {
					$tmp = $arrayName = array(
						'time_in' => $row['time_in'],

						'id' => intval($row['id'])
					);
					array_push($notimeout, $tmp);
				}
			}
		}
		$myobj = $arrayName = array(
			'rendered' => $rendered,
			'timeout' => $notimeout
		);
		return $myobj;
	}
	function getProductStock($id, $conn)
	{
		$q = "SELECT * FROM products_stocks WHERE product_id = $id";
		$exe = $conn->query($q);
		$myobj = array();
		$stock_id = 0;
		$stocks_count = 0;
		while ($row = mysqli_fetch_array($exe)) {
			$stock_id = intval($row['id']);
			$stocks_count = intval($row['stocks_count']);
			
		}
		$q = "SELECT * FROM sold WHERE stock_id = $stock_id";
		$exe = $conn->query($q);
		$toMinus = 0;
		while($row = mysqli_fetch_array($exe)){
			$toMinus = $toMinus + intval($row['quantity']);
		}
		$stocks_count = intval($stocks_count - $toMinus);
		$myobj = $arrayName = array(
			'stocks_count' => $stocks_count,
			'id' => $stock_id,
		);

		return $myobj;
	}

	function getProductImage($id, $conn)
	{
		$q = "SELECT * FROM product_image WHERE product_id = $id";
		$exe = $conn->query($q);
		$myobj = array();
		while ($row = mysqli_fetch_array($exe)) {

			$myobj = $arrayName = array(
				'name100' => $row['name100'],
				'name50' => $row['name50'],
				'name20' => $row['name20'],
				'id' => $row['id']


			);
		}

		return $myobj;
	}

	function getBusinessPng($id)
	{
		$assets = "restaurant.svg";
		if ($id == 1) {
			$assets = "restaurant.svg";
		} else if ($id == 2) {
			$assets = "online-store.svg";
		} else if ($id == 3) {
			$assets = "pharmacy.svg";
		}

		return $assets;
	}

	function bubble_sort($arr)
	{
		$n = sizeof($arr);
		for ($i = 1; $i < $n; $i++) {
			$flag = false;
			for ($j = $n - 1; $j >= $i; $j--) {
				if (doubleval($arr[$j - 1]['distance']) > doubleval($arr[$j]['distance'])) {
					$tmp = $arr[$j - 1];
					$arr[$j - 1] = $arr[$j];
					$arr[$j] = $tmp;
					$flag = true;
				}
			}
			if (!$flag) {
				break;
			}
		}

		return $arr;
	}

	function bubble_sort2($arr)
	{
		$n = sizeof($arr);
		for ($i = 1; $i < $n; $i++) {
			$flag = false;
			for ($j = $n - 1; $j >= $i; $j--) {
				if ($arr[$j - 1] > $arr[$j]) {
					$tmp = $arr[$j - 1];
					$arr[$j - 1] = $arr[$j];
					$arr[$j] = $tmp;
					$flag = true;
				}
			}
			if (!$flag) {
				break;
			}
		}

		return $arr;
	}

	function getStations($id, $conn)
	{
		$q = "SELECT * FROM stations WHERE id = $id";
		$exe = $conn->query($q);
		$myobj = array();
		while ($row = mysqli_fetch_array($exe)) {

			$myobj = $arrayName = array(
				'station' => ucwords($row['station']),
				'date_created' => $row['date_created'],
				'address' => $row['address'],
				'lat' => $row['lat'],
				'lng' => $row['lng'],
				'contact' => $row['contact'],
				'id' => $row['id']

			);
		}

		return $myobj;
	}

	function getLocation($id, $conn)
	{
		$q = "SELECT * FROM user_locations WHERE user_id = $id";
		$exe = $conn->query($q);
		$myobj = array();
		while ($row = mysqli_fetch_array($exe)) {
			$timelapse = $this->getTimeElapse($row['date_created']);
			$myobj = $arrayName = array(
				'lat' => $row['lat'],
				'lng' => $row['lng'],
				'date_created' => $row['date_created'],
				'timelapse' => $timelapse
			);
		}

		return $myobj;
	}

	function getRadius($id, $conn)
	{
		$q = "SELECT * FROM radius WHERE crime_id = $id";
		$exe = $conn->query($q);
		$myobj = array();
		while ($row = mysqli_fetch_array($exe)) {

			$myobj = $arrayName = array(
				'radius' => $row['radius']


			);
		}

		return $myobj;
	}


	function getCrimeLocation($id, $conn)
	{
		$q = "SELECT * FROM crime_location_pin WHERE crime_id = $id";
		$exe = $conn->query($q);
		$myobj = null;
		if ($exe->num_rows > 0) {
			while ($row = mysqli_fetch_array($exe)) {
				$timelapse = $this->getTimeElapse($row['date_created']);
				$myobj = $arrayName = array(
					'lat' => $row['lat'],
					'lng' => $row['lng'],


				);
			}
		}

		return $myobj;
	}
	function notify($curl, $conn, $label)
	{
		$q = "SELECT * FROM fcm_token";
		$exe = $conn->query($q);
		while ($row = mysqli_fetch_array($exe)) {
			// function notification($title,$body,$role,$to){
			$curl->notification("Crime Alert", $label, "", $row['token']);
		}
	}

	function distance_calc($mylat, $mylng, $lat2, $lon2, $unit)
	{

		$theta = $mylng - $lon2;
		$dist = sin(deg2rad($mylat)) * sin(deg2rad($lat2)) +  cos(deg2rad($mylat)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
		$dist = acos($dist);
		$dist = rad2deg($dist);
		$miles = $dist * 60 * 1.1515;
		$unit = strtoupper($unit);

		if ($unit == "K") {
			$d = ($miles * 1.609344);

			return $d;
		} else if ($unit == "N") {
			return ($miles * 0.8684);
		} else {
			return $miles;
		}
	}

	function validid($id, $conn)
	{
		$q = "SELECT * FROM validid WHERE user_id = $id";
		$exe = $conn->query($q);
		$myobj = array();
		while ($row = mysqli_fetch_array($exe)) {
			$myobj = $arrayName = array(
				'back' => $row['back'],
				'front' => $row['front'],
			);
		}

		return $myobj;
	}




	function getCrimePhoto($id, $conn)
	{
		$q = "SELECT * FROM crime_photo WHERE crime_id = $id";
		$exe = $conn->query($q);
		$myobj = array();
		while ($row = mysqli_fetch_array($exe)) {
			$myobj = $arrayName = array(
				'name20' => $row['name20'],
				'name50' => $row['name50'],
				'name100' => $row['name100']
			);
		}

		return $myobj;
	}


	function getUser($id, $conn)
	{
		$q = "SELECT * FROM users WHERE id = $id";
		$exe = $conn->query($q);
		$myobj = array();
		while ($row = mysqli_fetch_array($exe)) {
			$profile = $this->getprofile($id, $conn);
			$getTrackingId = $this->getTrackingId($id, $conn);
			$location = $this->getLocation($id, $conn);
			$validid = $this->validid($id, $conn);
			$myobj = $arrayName = array(
				'fname' => ucwords($row['fname']),
				'lname' => ucwords($row['lname']),
				'email' => $row['email'],
				'contact' => $row['contact'],
				'bdate' => $row['bdate'],
				'gender' => $row['gender'],
				'id' => $row['id'],
				'profile' => $profile,
				'tracking_id' => $getTrackingId,
				'location' => $location,
				'validid' => $validid


			);
		}

		return $myobj;
	}

	function getTrackingId($id, $conn)
	{
		$q = "SELECT * FROM tracking_id WHERE user_id = $id";
		$exe = $conn->query($q);
		$myobj = array();
		while ($row = mysqli_fetch_array($exe)) {

			$myobj = $arrayName = array(
				'code' => $row['code']


			);
		}

		return $myobj;
	}
	function getTimeElapseHours($date_created)
	{
		require __DIR__ . '../../vendor/autoload.php';
		$tmpelaps = 0;

		$m = new \Moment\Moment($date_created);
		$momentFromVo = $m->fromNow();
		if ((int)$momentFromVo->getHours() > 0) {
			$tmpelaps = (int)$momentFromVo->getHours();
		}
		return $tmpelaps;
	}
	function getTimeElapseHoursTwoDates($date1, $date2)
	{
		// 		$f = 'Y-m-d H:i:s';
		// $d1 = \DateTime::createFromFormat($date1, $f);
		// $d2 = \DateTime::createFromFormat($date2, $f);

		// $diff = $d2->diff($d1);
		// $hours = $diff->h + ($diff->days * 24);

		// $day1 = strval($date1);
		// $day1 = strtotime($day1);
		// $day2 = strval($date2);
		// $day2 = strtotime($day2);

		// $diffHours = round(($day2 - $day1) / 3600);


		require __DIR__ . '../../vendor/autoload.php';
		$tmpelaps = 0;

		$m = new \Moment\Moment($date1);
		$momentFromVo = $m->from($date2);
		if ((int)$momentFromVo->getHours() > 0) {
			$tmpelaps = (int)$momentFromVo->getHours();
		}
		return $tmpelaps;
	}

	function getTimeElapse($date_created)
	{
		require __DIR__ . '../../vendor/autoload.php';
		$tmpelaps = null;
		$number = 0;

		$m = new \Moment\Moment($date_created);
		$momentFromVo = $m->fromNow();
		if ((int)$momentFromVo->getWeeks() > 0) {
			if ((int)$momentFromVo->getWeeks() == 1) {
				$tmpelaps = (int)$momentFromVo->getWeeks() . " week ago";
			} else {
				$tmpelaps = (int)$momentFromVo->getWeeks() . " weeks ago";
			}
		} else if ((int)$momentFromVo->getDays() > 0) {
			if ((int)$momentFromVo->getDays() == 1) {
				$tmpelaps = (int)$momentFromVo->getDays() . " day ago";
			} else {
				$tmpelaps = (int)$momentFromVo->getDays() . " days ago";
			}
		} else if ((int)$momentFromVo->getHours() > 0) {
			if ((int)$momentFromVo->getHours() == 1) {
				$tmpelaps = (int)$momentFromVo->getHours() . " hour ago";
			} else {
				$tmpelaps = (int)$momentFromVo->getHours() . " hours ago";
			}
		} else if ((int)$momentFromVo->getMinutes() > 0) {
			if ((int)$momentFromVo->getMinutes() == 1) {
				$tmpelaps = (int)$momentFromVo->getMinutes() . " minute ago";
			} else {
				$tmpelaps = (int)$momentFromVo->getMinutes() . " minutes ago";
			}
		}
		return $tmpelaps;
	}

	function compress($source, $destination, $quality)
	{

		$info = getimagesize($source);

		if ($info['mime'] == 'image/jpeg')
			$image = imagecreatefromjpeg($source);

		elseif ($info['mime'] == 'image/gif')
			$image = imagecreatefromgif($source);

		elseif ($info['mime'] == 'image/png')
			$image = imagecreatefrompng($source);

		imagejpeg($image, $destination, $quality);

		return $destination;
	}

	function getMedias($id, $conn, $table_name)
	{
		$q = "SELECT * FROM $table_name WHERE chat_id = $id";
		$exe = $conn->query($q);
		$myobj = array();
		while ($row = mysqli_fetch_array($exe)) {
			$myobj[] = $arrayName = array(
				'name20' => $row['name20'],
				'name50' => $row['name50'],
				'name100' => $row['name100']
			);
		}

		return $myobj;
	}

	function getprofile($id, $conn)
	{
		$q = "SELECT * FROM selfie WHERE user_id = $id";
		$exe = $conn->query($q);
		$myobj = array();
		while ($row = mysqli_fetch_array($exe)) {
			$myobj = $arrayName = array(
				'name20' => $row['name20'],
				'name50' => $row['name50'],
				'name100' => $row['name100']
			);
		}

		return $myobj;
	}


	function getFollowers($id, $conn)
	{
		$q = "SELECT * FROM followers WHERE lodi_id = $id";
		$exe = $conn->query($q);

		return $exe->num_rows;
	}

	function getLodi($id, $conn)
	{
		$q = "SELECT * FROM lodis WHERE id = $id";
		$exe = $conn->query($q);
		$myobj = array();
		while ($row = mysqli_fetch_array($exe)) {
			$myobj = $arrayName = array(
				'fname' => ucwords($row['fname']),
				'lname' => ucwords($row['lname']),
				'email' => ucwords($row['lname']),
				'contact' => ucwords($row['contact']),
				'social' => ucwords($row['social']),
				'followers' => ucwords($row['followers']),
				'date_created' => ucwords($row['date_created']),
				'category' => $this->getTalent($id, $conn),
				'profile' => $this->getprofile(intval($row['profile']), $conn),
				'followers' => $this->getFollowers(intval($row['id']), $conn),
				'id' => $row['id']


			);
		}

		return $myobj;
	}

	function getTable($id, $conn, $fan_id)
	{
		$returnval = "";
		$table = $id . "to" . $fan_id;
		$q = "SELECT * FROM chats WHERE chat_table = '$table'";
		$exe = $conn->query($q);

		if ($exe->num_rows > 0) {
			$returnval = $table;
		} else {
			$table = $fan_id . "to" . $id;
			$q = "SELECT * FROM chats WHERE chat_table = '$table'";
			$exe = $conn->query($q);
			if ($exe->num_rows > 0) {
				$returnval = $table;
			}
		}
		return $returnval;
	}

	function getTeaser($id, $conn)
	{
		$q = "SELECT * FROM teaser WHERE lodi_id = $id";
		$exe = $conn->query($q);
		$myobj = array();
		if ($exe->num_rows > 0) {
			while ($row = mysqli_fetch_array($exe)) {
				$myobj[] = $arrayName = array(
					'teaser' => $row['teaser_path'],
					'date_updated' => $row['date_updated'],
					'date_created' => $row['date_created'],
				);
			}
		}


		return $myobj;
	}

	function getChatter($table, $id, $conn)
	{
		$split = explode("to", $table);
		$tmpid = 0;

		if ($id == intval($split[0])) {
			$tmpid = $split[1];
		} else {
			$tmpid = $split[0];
		}
		return $this->getLodi($tmpid, $conn);
	}

	function getTalentFee($id, $conn)
	{
		$myobj = array();
		$q = "SELECT * FROM talent_fee WHERE lodi_id = $id";
		$exe = $conn->query($q);
		while ($row = mysqli_fetch_array($exe)) {
			$myobj[] = $arrayName = array(
				'role' => $row['role'],
				'amount' => $row['amount'],

			);
		}


		return $myobj;
	}

	function getTalent($id, $conn)
	{
		$myobj = array();
		$q = "SELECT * FROM categories WHERE lodi_id = $id";
		$exe = $conn->query($q);
		while ($row = mysqli_fetch_array($exe)) {
			$myobj[] = $arrayName = array(
				'id' => $row['id'],
				'category' => $row['category'],

			);
		}


		return $myobj;
	}

	function getTransactionCount($id, $conn)
	{
		$myobj = array();
		$q = "SELECT * FROM chats WHERE lodi_id = $id";
		$exe = $conn->query($q);

		while ($row = mysqli_fetch_array($exe)) {
			$table = $row['chat_table'];
			$q = "SELECT * FROM $table WHERE sender <> $id";
			$exe2 = $conn->query($q);
			while ($row2 = mysqli_fetch_array($exe2)) {
				$myobj[] = $arrayName = array('role' => $row2['role'],);
			}
		}


		return $myobj;
	}

	function getBio($id, $conn)
	{
		$q = "SELECT * FROM lodi_bio WHERE lodi_id = $id";
		$exe = $conn->query($q);
		$myobj = null;
		while ($row = mysqli_fetch_array($exe)) {
			$myobj = $arrayName = array('bio' => $row['bio']);
		}

		return $myobj;
	}

	function getChatAllowed($fan_id, $lodi_id, $conn)
	{
		$q = "SELECT * FROM payment_data WHERE lodi_id = $lodi_id AND fan_id = $fan_id AND used = 0";
		$exe = $conn->query($q);
		$myobj = null;
		while ($row = mysqli_fetch_array($exe)) {
			$myobj = $arrayName = array(
				'amount' => $row['amount'],
				'date_created' => $row['date_created'],
				'id' => $row['id'],
				'role' => $row['role'],
				'used' => $row['used']
			);
		}

		return $myobj;
	}

	function getupdateFollowers($conn, $id)
	{
		$q = "SELECT * FROM updates_followers WHERE update_id = $id";
		$exe = $conn->query($q);

		return $exe->num_rows;
	}




	function paypal()
	{
		$ch = curl_init();
		$clientId = "AZPA4mVy-DZS4k6bO1YHZ9IOmVooKF_qFjvuIppUv4oP6KzXSt7KwBfl-R09qzlZ--Jt7Dco8kcEqbUt";
		$secret = "ECmDD6GrsCDNqSzhyqkIzkROMC16tnds-09uGpnD6h-Xsf4tDlgkoNFuY1C7PK8DwBAWAmvGCJZwCj4k";

		curl_setopt($ch, CURLOPT_URL, "https://api.sandbox.paypal.com/v1/oauth2/token");
		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_USERPWD, $clientId . ":" . $secret);
		curl_setopt($ch, CURLOPT_POSTFIELDS, "grant_type=client_credentials");

		$result = curl_exec($ch);

		if (empty($result)) die("Error: No response.");
		else {
			$json = json_decode($result);
			print_r($json);
		}

		curl_close($ch);
	}
}
	

	// $source_img = 'source.jpg';
	// $destination_img = 'destination .jpg';

	// $d = compress($source_img, $destination_img, 90);
