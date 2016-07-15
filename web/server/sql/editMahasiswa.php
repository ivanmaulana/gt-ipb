<?php
	
	// Check account
	$mahasiswaNim = fiPOST('mahasiswaNim');
	$mahasiswaStatus = fiPOST('mahasiswaStatus');
	$mahasiswaDenda = fiPOST('mahasiswaDenda');
	$query = "UPDATE mahasiswa SET mahasiswaStatus = '$mahasiswaStatus', mahasiswaDenda = '$mahasiswaDenda' WHERE mahasiswaNim = '$mahasiswaNim' OR mahasiswaNimS2 = '$mahasiswaNim' OR mahasiswaNimS3 = '$mahasiswaNim'";
	$result = @mysql_query($query);
//	$count = @mysql_num_rows($result);

	$mode = 'update';
?>