<?php
	
	// Check account
	$penjagaUsername = fiPOST('penjagaUsername');
	$password = fiPOST('password');
	$newToken = md5('aisive'.'sepeda'.$penjagaUsername.time().rand());
	$query = "UPDATE penjaga SET penjagaToken = '$newToken' WHERE penjagaUsername = '$penjagaUsername' AND password = '$password' AND penjagaStatus = 'a'";
	$result = @mysql_query($query);
//	$count = @mysql_num_rows($result);
	
	if ($result && mysql_affected_rows()) {
		$mode = 'signin';
		$json['penjagaToken'] = $newToken;
	}
	
?>