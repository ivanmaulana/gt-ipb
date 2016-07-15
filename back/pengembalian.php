<?php

		$link = mysqli_connect("localhost","sepeda","blst2016!!","sepeda") or die("Error " . mysqli_error($connection));

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
        //echo "success";

    	$query1 = "SELECT sepedaId, mahasiswaNim FROM pinjaman WHERE sepedaId = '$sepedaId' AND mahasiswaNim = '$mahasiswaNim'";
    	$sql1 = mysqli_query($link, $query1);

		if (mysqli_num_rows($sql)==0){
            $response["success"] = 0;
        	$response["message"] = "Data Pinjaman Tidak Ditemukan";

        	echo json_encode($response);
    	}

    	else {
        	$query2 = "UPDATE pinjaman SET penjagaIdKembali = '$penjagaId', shelterIdKembali = '$shelterId', pinjamanWaktuKembali = NOW(), status = '1' WHERE mahasiswaNim = '$mahasiswaNim' AND sepedaId = '$sepedaId' AND status = '0' ";
        	$sql2 = mysqli_query($link, $query2);

        	$query3 = "UPDATE mahasiswa SET mahasiswaStatus = '0' WHERE mahasiswaNim = '$mahasiswaNim'";
        	$sql3 = mysqli_query($link, $query3);

        	$query4 = "UPDATE sepeda SET sepedaLokasi = '$shelterId' WHERE sepedaId = '$sepedaId'";
        	$sql4 = mysqli_query($link, $query4);

        	if ($sql2 && $sql3 && $sql4){

        		$response["success"] = 1;
        		$response["message"] = "Pengembalian Sukses";

        		echo json_encode($response);
            }
        	else {
            	$response["success"] = 0;
        		$response["message"] = "Pengembalian Gagal";

        		echo json_encode($response);
            }
        }

    }

}

?>
