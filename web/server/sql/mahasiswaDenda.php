<?php
	
	$query = "SELECT * FROM mahasiswa WHERE mahasiswaDenda != 0";
	$result = @mysql_query($query);
	$count = @mysql_num_rows($result);
	
?>