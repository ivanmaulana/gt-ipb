<?php
	
	$query = "SELECT * FROM shelter ORDER BY shelterId ASC";
	$result = @mysql_query($query);
	$count = @mysql_num_rows($result);
	
?>