<?php
	
	$query = "SELECT * FROM activity ORDER BY activityId DESC LIMIT 0, 5";
	$result = @mysql_query($query);
	$count = @mysql_num_rows($result);
	
?>