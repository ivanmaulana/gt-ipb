<?php
	
	$query = "
		SELECT DATE(pinjamanWaktuPinjam) as tanggal, COUNT(*) as jumlah FROM pinjaman GROUP BY DATE(pinjamanWaktuPinjam) ORDER BY pinjamanWaktuPinjam DESC LIMIT 0, 10";
	$result = @mysql_query($query);
	$count = @mysql_num_rows($result);
	
?>