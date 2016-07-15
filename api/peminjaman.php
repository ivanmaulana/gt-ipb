<?php

$link = mysqli_connect("13.76.90.160", "sepeda", "kampus", "sepeda") or die("Could not connect.");
 
/* if (isset($_POST['mahasiswaNim']) && isset($_POST['no_sepeda']) && isset($_POST['price']) && isset($_POST['description'])) { */

if (isset($_POST["penjagaId"]) && isset($_POST["penjagaToken"]) && isset($_POST["shelterId"]) && isset($_POST["mahasiswaNim"]) && isset($_POST["sepedaId"])){

    $penjagaId = $_POST["penjagaId"];
    $penjagaToken = $_POST["penjagaToken"];
	$shelterId = $_POST["shelterId"];
	$mahasiswaNim = $_POST["mahasiswaNim"];
	$sepedaId = $_POST["sepedaId"];
	
	$query = "SELECT penjagaId, penjagaToken FROM penjaga WHERE penjagaId = '$penjagaId' AND penjagaToken = '$penjagaToken'";
    $sql = mysqli_query($link, $query);

	if (mysqli_num_rows($sql)==0){
    	$response["success"] = 0;
        $response["message"] = "Gagal, Otentikasi Anda Telah Berakhir.";
 
        echo json_encode($response);
    }

	else {

		$query = mysqli_query($link, "SELECT mahasiswaNim, mahasiswaStatus FROM mahasiswa WHERE mahasiswaNim = '$mahasiswaNim'");
		
		$row = mysqli_fetch_array($query, MYSQLI_ASSOC);
		$mahasiswaStatus = $row['mahasiswaStatus'];

		if ($mahasiswaStatus === '1'){
			$response["success"] = 0;
			$response["message"] = "Gagal, Mahasiswa Sedang Meminjam Sepeda Lain";
	
			echo json_encode($response);
		}

		else if ($mahasiswaStatus === '2'){
			$response["success"] = 0;
			$response["message"] = "Gagal, Mahasiswa Sedang Mendapat Denda";
	
			echo json_encode($response);
		}

		else {
		
			$query1 = mysqli_query($link, "UPDATE mahasiswa SET mahasiswaStatus = 1 WHERE mahasiswaNim = '$mahasiswaNim'");
		
			$query2 = mysqli_query($link, "UPDATE sepeda SET sepedaLokasi = 0 WHERE sepedaId = $sepedaId");
		
			$query3 = mysqli_query($link, "INSERT INTO pinjaman (status, mahasiswaNim, sepedaId, pinjamanWaktuPinjam, penjagaIdPinjam, shelterIdPinjam) VALUES (0, '$mahasiswaNim', $sepedaId, NOW(), '$penjagaId', '$shelterId') ");

			if ($query1 && $query2 && $query3) {
			
				$response["success"] = 1;
				$response["message"] = "Sepeda successfully updated.";
	
				echo json_encode($response);
			} else { 
				$response["success"] = 0;
				$response["message"] = "Peminjaman Gagal";
		
				echo json_encode($response);
			}
		
		}
	
	}
    
} else {
    $response["success"] = 0;
    $response["message"] = "Required field(s) is missing";
 
    echo json_encode($response);
}

?>