<?php 
	

	
	@include 'php/conn.php';
	@include 'php/var.php';
	@include 'php/encryption.php';
	

	for ($i=0; $i<200; $i++) {
		$query = "INSERT INTO sepeda (jenisSepedaId, sepedaLokasi) VALUES (".rand(1,2).", ".rand(1,7).")";
		
		$result = @mysql_query($query);
		
		if ($result) ;
	}
	
	
	@include 'conn-close.php';

?>