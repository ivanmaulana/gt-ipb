<?php
	
	$query = "SELECT * FROM sepeda, jenisSepeda, shelter WHERE sepeda.jenisSepedaId = jenisSepeda.jenisSepedaId AND sepedaLokasi = shelterId ORDER BY sepedaId ASC";
	$result = @mysql_query($query);
	$count = @mysql_num_rows($result);
	
?>