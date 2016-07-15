<?php
	
	$query = "
		SELECT
		  (SELECT COUNT(*) FROM pinjaman WHERE pinjamanWaktuKembali < pinjamanWaktuPinjam) as sepedaSedangDipinjam, 
		  (SELECT COUNT(DISTINCT shelterId) FROM penjagaShelter WHERE penjagaShelterWaktuMasuk > penjagaShelterWaktuKeluar) as shelterSedangBuka, 
		  (SELECT COUNT(*) FROM sepeda WHERE sepedaLokasi >= 0) as jumlahSepeda, 
		  (SELECT COUNT(*) FROM shelter WHERE shelterId > 0) as jumlahShelter,
		  (SELECT COUNT(*) FROM mahasiswa) as jumlahMahasiswa,
		  (SELECT COUNT(*) FROM penjaga WHERE penjagaStatus = 'n') as jumlahPenjaga,
		  (SELECT COUNT(*) FROM pinjaman WHERE YEAR(pinjamanWaktuPinjam) = YEAR(NOW()) AND MONTH(pinjamanWaktuPinjam) = MONTH(NOW()) ) as jumlahPinjaman";
	$result = @mysql_query($query);
	$count = @mysql_num_rows($result);
	
?>