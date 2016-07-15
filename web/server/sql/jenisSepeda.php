<?php
	
	$query = "SELECT * FROM jenisSepeda ORDER BY jenisSepedaId ASC";
	$result = @mysql_query($query);
	$count = @mysql_num_rows($result);
	
?>