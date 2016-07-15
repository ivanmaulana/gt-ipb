<?php
	
	$query = "
		SELECT DATE(pinjamanWaktuKembali) as tanggal, COUNT(*) as jumlah FROM pinjaman WHERE pinjamanWaktuKembali > 0 GROUP BY DATE(pinjamanWaktuKembali) ORDER BY pinjamanWaktuKembali DESC LIMIT 0, 10";
	$result = @mysql_query($query);
	$count = @mysql_num_rows($result);
	
?>