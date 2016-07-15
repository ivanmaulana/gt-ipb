<?php
	
	$query = "SELECT * FROM penjagaShelter, penjaga, shelter WHERE penjagaShelter.penjagaId = penjaga.penjagaId AND shelter.shelterId = penjagaShelter.shelterId ORDER BY penjagaShelterWaktuMasuk DESC";
	$result = @mysql_query($query);
	$count = @mysql_num_rows($result);
	
?>