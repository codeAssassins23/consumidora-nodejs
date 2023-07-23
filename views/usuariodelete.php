<?php 

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'http://fast.spring.informaticapp.com:9090/admin/user/'.$_GET['id'],
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'DELETE',

));

$response = curl_exec($curl);

curl_close($curl);
$data = json_decode($response, true);
header("Location: usuario.php");
?>