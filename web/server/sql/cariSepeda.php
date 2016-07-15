<?php
	
	$sepedaId = fiPOST('sepedaId');
	$query = "SELECT * FROM sepeda, jenisSepeda, shelter WHERE sepeda.jenisSepedaId = jenisSepeda.jenisSepedaId AND sepedaLokasi = shelterId AND sepeda.sepedaId = '$sepedaId' ORDER BY sepedaId ASC";
	$result = @mysql_query($query);
	$count = @mysql_num_rows($result);
	
?>