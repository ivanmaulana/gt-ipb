<?php
	
	$query = "
		SELECT
		  *, 
		  (SELECT COUNT(*) FROM pinjaman WHERE shelterIdPinjam = shelter.shelterId AND DATE(pinjamanWaktuPinjam) = DATE(NOW()) ) as sepedaDipinjam,
		  (SELECT COUNT(*) FROM pinjaman WHERE shelterIdKembali = shelter.shelterId AND DATE(pinjamanWaktuKembali) = DATE(NOW()) ) as sepedaKembali,
		  (SELECT COUNT(*) FROM sepeda WHERE sepedaLokasi = shelter.shelterId ) as sepedaSisa,
		  (SELECT GROUP_CONCAT(DISTINCT penjagaNama SEPARATOR ', ') FROM penjagaShelter, penjaga WHERE shelter.shelterId = penjagaShelter.shelterId AND penjagaShelter.penjagaId = penjaga.penjagaId AND penjagaShelterWaktuMasuk > penjagaShelterWaktuKeluar GROUP BY shelterId) as penjagaNama
		  FROM shelter WHERE shelterId > 0";
	$result = @mysql_query($query);
	$count = @mysql_num_rows($result);
	
?>