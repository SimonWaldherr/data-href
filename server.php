<?php

$output['status'] = true;

if($_SERVER["REQUEST_METHOD"] == 'POST') {
  $classname = $_POST['classname'];
  $dataquery = json_decode($_POST['query'], true);
} else {
  $classname = $_GET['classname'];
  $dataquery = json_decode($_GET['query'], true);
}

if($classname == 'baf red') {
  $classname = 'baf blue';
} elseif($classname == 'baf blue') {
  $classname = 'baf red';
}

if(isset($dataquery['follow'])) {
  if($dataquery['follow'] == true) {
    $output['innerhtml'] = 'unfollow';
    $output['query'] = '{"follow":false}';
  } else {
    $output['innerhtml'] = 'follow';
    $output['query'] = '{"follow":true}';
  }
}

if(isset($dataquery['like'])) {
  if($dataquery['like'] == true) {
    $output['innerhtml'] = 'unlike';
    $output['query'] = '{"like":false}';
  } else {
    $output['innerhtml'] = 'like';
    $output['query'] = '{"like":true}';
  }
}

if(isset($dataquery['time'])) {
  if($dataquery['time'] == 'update') {
    $output['innerhtml'] = date('H:i:s');
  }
}

$output['classname'] = $classname;

die(json_encode($output));

?>
