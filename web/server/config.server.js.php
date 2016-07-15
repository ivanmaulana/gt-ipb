<?php
	header('Content-type: text/javascript');
	@include 'php/encryption.php';
	
	// URL Server
	$UrlServer = "http://$_SERVER[HTTP_HOST]".rtrim("$_SERVER[REQUEST_URI]", 'config.server.js');
	
	// GET Parameter
	$data['app'] = 'Aisive';
	$data['mode'] = 'select';
	
	$sql[] = 'selectUserUrl';		
	$sql[] = 'selectEduBgUserUrl';
	$sql[] = 'selectUserCardUserUrl';
	$sql[] = 'selectUser';
	$sql[] = 'selectDivision';
	$sql[] = 'selectTimeline';
	$sql[] = 'selectProjectDivisionIdUserUrl';
	$sql[] = 'selectProjectLimitOrder';
	$sql[] = 'selectProjectProjectUrl';
	$sql[] = 'selectUserProjectUrl';
	
	for ($i = 0; $i< sizeof($sql); $i++ ) {
		$data['sql'] = $sql[$i];
		echo 'app.value(\''.$sql[$i].'\', \''.aiEncode(json_encode($data)).'\'); ';
	}
?>

