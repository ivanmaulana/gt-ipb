<?php
		$link = mysqli_connect("localhost","sepeda","blst2016!!","sepeda") or die("Error " . mysqli_error($connection));

if (isset($_POST["penjagaId"]) && isset($_POST["shelterId"])){

    $penjagaId = $_POST["penjagaId"];
	$shelterId = $_POST["shelterId"];

	$query = "UPDATE penjaga SET penjagaToken = '' WHERE penjagaId = '$penjagaId'";
   	$sql = mysqli_query($link, $query);

	$query1 = "INSERT INTO penjagaActivity (penjagaId, shelterId, keterangan, penjagaShelterWaktu) VALUES ('$penjagaId','$shelterId',0,NOW())";
   	$sql1 = mysqli_query($link, $query1);

	$query2 = "UPDATE penjagaShelter SET penjagaShelterWaktuKeluar = NOW() WHERE penjagaId = '$penjagaId' && shelterId = '$shelterId'";
   	$sql2 = mysqli_query($link, $query2);

	if($sql && $sql1 && $sql2){
    	$response["success"] = 1;
        $response["message"] = "Berhasil Logout";

        echo json_encode($response);
    }
	else {
   	 	$response["success"] = 0;
        $response["message"] = "Gagal Logout";

        echo json_encode($response);
    }
}
?>
