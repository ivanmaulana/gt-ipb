<?php
	
	$sepedaId = fiPOST('sepedaId');
	$jenisSepedaId = fiPOST('jenisSepedaId');
	$sepedaLokasi = fiPOST('sepedaLokasi');
	$query = "INSERT INTO sepeda(sepedaId, jenisSepedaId, sepedaLokasi) VALUES ('$sepedaId', '$jenisSepedaId' , '$sepedaLokasi')";
	$result = @mysql_query($query);

	$mode = 'insert';
	
?>