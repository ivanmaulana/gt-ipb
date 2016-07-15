<?php
	
	// Check account
	$sepedaId = fiPOST('sepedaId');
	$jenisSepedaId = fiPOST('jenisSepedaId');
	$sepedaLokasi = fiPOST('sepedaLokasi');
	$query = "UPDATE sepeda SET sepedaLokasi = '$sepedaLokasi' WHERE sepedaId = '$sepedaId' AND jenisSepedaId = '$jenisSepedaId'";
	$result = @mysql_query($query);
//	$count = @mysql_num_rows($result);

	$mode = 'update';
?>