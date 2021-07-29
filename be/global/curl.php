<?php


/**
 * 
 */
class curlMethods
{
	
	function __construct()
	{
		# code...
	}

	function notification($title,$body,$role,$to){

		$url = "https://fcm.googleapis.com/fcm/send";
		$api_key = "AAAAs4emyDY:APA91bG2XEnwHMCtga2YE2vLqaZNcnjkae6F_WQz9LLgpBZl5kOVOMtavqKQj4aM4MHo5XwWPssZsHCHJWDISu-SkBnzxnr2mbHCytvd0JLE-ojdhQbhEyyjF5JgT__r5kXH1pyVeZtB";

 		$headers = array
            (
                'Authorization: key='.$api_key,
                'Content-Type: application/json'
            ); 

	 
             
              $data = array
            (
              'data' =>
              array (
                 
                'body' => "$body",
                'role' => "$role", 
                 
                 
              ),
              'notification' =>
              array (
                'title' => "$title",
                'body' => "$body",
                 "sound" => "default",
                "click_action" => "FCM_PLUGIN_ACTIVITY",
                "icon" => "fcm_push_icon"
                 
                 
              ),
              'to' => "$to",
               
              'priority' => 'high',
              //'restricted_package_name' => 'com.onlyoneapp.test', //IF YOU WANT SEND TO ONLY ONE APP
            );
           
            // else if($role == "sms"){
            //   $data = array
            // (
            //   'data' =>
            //   array (
            //     'title' => "$title",
            //     'body' => "$body",
            //     'role' => "$role", 
            //     'tracked_id' => "$uuid",
                 
            //   ),
            //   'notification' =>
            //   array (
            //     'title' => "Sms Update",
            //     'body' => "$body",
            //     'role' => "$role", 
            //     'tracked_id' => "$uuid",
                 
            //   ),
            //   'to' => "$to",
               
            //   'priority' => 'high',
            //   //'restricted_package_name' => 'com.onlyoneapp.test', //IF YOU WANT SEND TO ONLY ONE APP
            // );
            // }

       

			$content = json_encode($data);
            $curl = curl_init($url);
            curl_setopt($curl, CURLOPT_HEADER, false);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $content);
            curl_setopt($curl,CURLOPT_SSL_VERIFYPEER, false );
            $result = curl_exec($curl);
            curl_close($curl);

            $arr = array();
            $arr = json_decode($result,true);
            return $arr;

	}

	 
}

// curl \ --request POST \ --header "Authorization: key=AAAARlVLxSg:APA91bHWSQ_FkeZsV0GiusXpANdfUAljn1aBlnqWhj6DvK_78EeEJlzt8imRq6Zb7AXJy2y4NL7JVgPauVckPCdTvvHSNcdjkD5VJwVcCJ6dpQc5zC_gQVtd8-b6aqQEH70-wghOgpjW" \ --header "Content-Type: application/json" \ --data "{\"notification\":{\"title\": \"My title\", \"text\": \"My text\", \"sound\": \"default\"}, \"priority\": \"High\", \"to\": \"eE1bGY-zAPM:APA91bELOVnI51joSDwSYLfig5oMg6eXffUMZEwsdPIiGAhvN2qNAyxoCd-J9zSxTS2--jpB5IdvDZZSGlZEAre4nV3rhUdSFPyakcXUUlsgHwfzSomgAFao9eK7nFmK3OSc2KSQ6Ctw\"}" \ https://fcm.googleapis.com/fcm/send

?>