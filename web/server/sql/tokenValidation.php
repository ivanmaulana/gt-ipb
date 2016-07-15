<?php
	
	// Check account
	$penjagaToken = fiPOST('penjagaToken');
	$query = "SELECT * FROM penjaga WHERE penjagaStatus = 'a' AND penjagaToken = ((((((('$penjagaToken')))))))";
	$result = @mysql_query($query);
	$count = @mysql_num_rows($result);
	
	if ($data = @mysql_fetch_assoc($result)) {
		$json['penjagaToken'] = $penjagaToken;
		$auth = true;
	}
	
?>