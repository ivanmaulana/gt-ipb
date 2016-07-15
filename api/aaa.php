<?php

$date = $_POST["date"];
$time=strtotime($date);
$day=date("j",$time);
$month=date("F",$time);
$year=date("Y",$time);

$tanggal = $day." ".$month." ".$year;
// echo $date;

if(isset($date)){
// output headers so that the file is downloaded rather than displayed

	$name = "Summary Peminjaman Harian - "."$tanggal".".csv";
	header('Content-Type: text/csv; charset=utf-8');
	header("Content-Disposition: attachment; filename='.$name.");

// create a file pointer connected to the output stream
	$output = fopen('php://output', 'w');

// output the column headings
	fputcsv($output, array('Summary', $tanggal));
	fputcsv($output, array(''));
	fputcsv($output, array(''));
	fputcsv($output, array('Shelter 1', '', '', 'Shelter 2', '', '', 'Shelter 3', '', '', 'Shelter 4', '', '', 'Shelter 5', '', '', 'Shelter 6', '', '', 'Shelter 7', '', '', 'Shelter 8', '', '', 'Shelter 9', '', '', 'Shelter 10', '', ''));

	fputcsv($output, array('Shelter 1 Pinjam', 'Shelter 1 Kembali', 'Shelter 1 Belum Kembali', 'Shelter 2 Pinjam', 'Shelter 2 Kembali', 'Shelter 2 Belum Kembali', 'Shelter 3 Pinjam', 'Shelter 3 Kembali', 'Shelter 3 Belum Kembali', 'Shelter 4 Pinjam', 'Shelter 4 Kembali', 'Shelter 4 Belum Kembali', 'Shelter 5 Pinjam', 'Shelter 5 Kembali', 'Shelter 5 Belum Kembali', 'Shelter 6 Pinjam', 'Shelter 6 Kembali', 'Shelter 6 Belum Kembali', 'Shelter 7 Pinjam', 'Shelter 7 Kembali', 'Shelter 7 Belum Kembali', 'Shelter 8 Pinjam', 'Shelter 8 Kembali', 'Shelter 8 Belum Kembali', 'Shelter 9 Pinjam', 'Shelter 9 Kembali', 'Shelter 9 Belum Kembali', 'Shelter 10 Pinjam', 'Shelter 10 Kembali', 'Shelter 10 Belum Kembali'));

	$link = mysqli_connect("13.76.90.160", "sepeda", "kampus", "sepeda") or die("Could not connect.");

	$query = "SELECT
sum(case when shelterIdPinjam = 1 then 1 else 0 end) shelter1Pinjam,
sum(case when shelterIdKembali = 1 then 1 else 0 end) shelter1Kembali,
sum(case when shelterIdPinjam = 1 AND status = 0 then 1 else 0 end) shelter1BelumKembali,

sum(case when shelterIdPinjam = 2 then 1 else 0 end) shelter2Pinjam,
sum(case when shelterIdKembali = 2 then 1 else 0 end) shelter2Kembali,
sum(case when shelterIdPinjam = 2 AND status = 0 then 1 else 0 end) shelter2BelumKembali,

sum(case when shelterIdPinjam = 3 then 1 else 0 end) shelter3Pinjam,
sum(case when shelterIdKembali = 3 then 1 else 0 end) shelter3Kembali,
sum(case when shelterIdPinjam = 3 AND status = 0 then 1 else 0 end) shelter3BelumKembali,

sum(case when shelterIdPinjam = 4 then 1 else 0 end) shelter4Pinjam,
sum(case when shelterIdKembali = 4 then 1 else 0 end) shelter4Kembali,
sum(case when shelterIdPinjam = 4 AND status = 0 then 1 else 0 end) shelter4BelumKembali,

sum(case when shelterIdPinjam = 5 then 1 else 0 end) shelter5Pinjam,
sum(case when shelterIdKembali = 5 then 1 else 0 end) shelter5Kembali,
sum(case when shelterIdPinjam = 5 AND status = 0 then 1 else 0 end) shelter5BelumKembali,

sum(case when shelterIdPinjam = 6 then 1 else 0 end) shelter6Pinjam,
sum(case when shelterIdKembali = 6 then 1 else 0 end) shelter6Kembali,
sum(case when shelterIdPinjam = 6 AND status = 0 then 1 else 0 end) shelter6BelumKembali,

sum(case when shelterIdPinjam = 7 then 1 else 0 end) shelter7Pinjam,
sum(case when shelterIdKembali = 7 then 1 else 0 end) shelter7Kembali,
sum(case when shelterIdPinjam = 7 AND status = 0 then 1 else 0 end) shelter7BelumKembali,

sum(case when shelterIdPinjam = 8 then 1 else 0 end) shelter8Pinjam,
sum(case when shelterIdKembali = 8 then 1 else 0 end) shelter8Kembali,
sum(case when shelterIdPinjam = 8 AND status = 0 then 1 else 0 end) shelter8BelumKembali,

sum(case when shelterIdPinjam = 9 then 1 else 0 end) shelter9Pinjam,
sum(case when shelterIdKembali = 9 then 1 else 0 end) shelter9Kembali,
sum(case when shelterIdPinjam = 9 AND status = 0 then 1 else 0 end) shelter9BelumKembali,

sum(case when shelterIdPinjam = 10 then 1 else 0 end) shelter10Pinjam,
sum(case when shelterIdKembali = 10 then 1 else 0 end) shelter10Kembali,
sum(case when shelterIdPinjam = 10 AND status = 0 then 1 else 0 end) shelter10BelumKembali

FROM pinjaman
WHERE pinjamanWaktuPinjam LIKE '$date%'";

	$sql = mysqli_query($link, $query);
	// loop over the rows, outputting them
	while ($row = mysqli_fetch_assoc($sql)) fputcsv($output, $row);

		// $query = "UPDATE pinjamBanyak SET status = 1, pinjamanWaktuKembali = NOW(), shelterIdKembali = '$shelterId' WHERE surat = '$surat'";
		// $result1 = mysqli_query($link,$query) or die(mysqli_error());

		if ($sql){
			//echo "berhasil";
		}

	}

else echo "Silahkan Isi Tanggal dan Shelter";

?>
