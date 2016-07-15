<?php
		$link = mysqli_connect("localhost","sepeda","blst2016!!","sepeda") or die("Error " . mysqli_error($connection));

if (isset($_POST["penjagaUsername"]) && isset($_POST["password"]) && isset($_POST["shelterId"])){

    $penjagaUsername = $_POST["penjagaUsername"];
    $password = $_POST["password"];
	$shelterId = $_POST["shelterId"];
	$status = false;

	$query ="SELECT penjagaId, penjagaUsername, password FROM penjaga WHERE penjagaUsername = '$penjagaUsername' AND password = '$password'";
	$sql = mysqli_query($link, $query);

	if (!mysqli_num_rows($sql)==0){

	    $row = mysqli_fetch_array($sql, MYSQLI_ASSOC);
    	$penjagaId = $row['penjagaId'];

        $token = bin2hex(openssl_random_pseudo_bytes(16));

    	$query1 = "UPDATE penjaga SET penjagaToken = '$token' WHERE penjagaId = '$penjagaId'";
    	$sql1 = mysqli_query($link, $query1);

    	$arr = array('success' => 1,'penjagaId' => $penjagaId, 'penjagaToken' => $token, 'shelterId' => $shelterId);

		echo json_encode($arr);

    	$query2 = "DELETE FROM penjagaShelter WHERE shelterId = '$shelterId'";
    	$sql2 = mysqli_query($link, $query2);

    	$query3 = "INSERT INTO penjagaShelter (shelterId, penjagaId) VALUES ('$shelterId','$penjagaId')";
    	$sql3 = mysqli_query($link, $query3);

    	$query4 = "INSERT INTO penjagaActivity (penjagaId, shelterId, keterangan) VALUES ('$penjagaId','$shelterId', '1')";
    	$sql4 = mysqli_query($link, $query4);
    }

	else {
    	$arr = array('success' => 0);
    	echo json_encode($arr);
    }
}

?>
