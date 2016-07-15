<?php
	
	$query = "SELECT * FROM pinjaman, mahasiswa, penjaga, shelter, jenisSepeda WHERE (pinjaman.mahasiswaNim = mahasiswa.mahasiswaNim OR pinjaman.mahasiswaNim = mahasiswa.mahasiswaNimS2 OR pinjaman.mahasiswaNim = mahasiswa.mahasiswaNimS3) AND pinjaman.penjagaIdPinjam = penjaga.penjagaId AND pinjaman.shelterIdPinjam = shelter.shelterId AND jenisSepeda.jenisSepedaId = pinjaman.sepedaJenis ORDER by pinjamanId DESC LIMIT 0,500";
	$result = @mysql_query($query);
	$count = @mysql_num_rows($result);
	
?>