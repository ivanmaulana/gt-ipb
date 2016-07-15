<?php
	
	$nim = fiPOST('nim');
	$query = "SELECT * FROM mahasiswa WHERE mahasiswa.mahasiswaNim = '$nim' OR mahasiswa.mahasiswaNimS2 = '$nim' OR mahasiswa.mahasiswaNimS3 = '$nim'";
	$result = @mysql_query($query);
	$count = @mysql_num_rows($result);
	
?>