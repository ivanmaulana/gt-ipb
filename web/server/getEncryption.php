<?php
	
	@include 'php/encryption.php';
	@include 'php/var.php';
	
/*	$mode = fiGET('mode');
	$input = fiGET('input');
	$key = fiGET('key');
*/
	$mode = 'encode';
	$data['app'] = 'Aisive';
	$data['mode'] = 'select';
	$data['sql'] = 'selectUser';
	$input = json_encode($data);
	


	switch ($mode) {
		case 'encode' :
			echo aiEncode($input);
			break;
		case 'decode' :
			echo aiDecode($input);
			break;		
	}
	
?>