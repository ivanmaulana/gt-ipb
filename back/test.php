<?php

		$link = mysqli_connect("localhost","sepeda","blst2016!!","sepeda") or die("Error " . mysqli_error($connection));

/* if (isset($_POST['mahasiswaNim']) && isset($_POST['no_sepeda']) && isset($_POST['price']) && isset($_POST['description'])) { */

if (isset($_POST["penjagaId"]) && isset($_POST["penjagaToken"]) && isset($_POST["shelterId"])){

	$penjagaId = $_POST["penjagaId"];
    $penjagaToken = $_POST["penjagaToken"];
	$shelterId = $_POST["shelterId"];

	// get all products from products table
	$result = mysqli_query($link, "SELECT sepedaId FROM sepeda WHERE sepedaLokasi = '$shelterId'");

	// check for empty result
	if (mysqli_num_rows($result) > 0) {
		// looping through all results
		// products node
		$response["mahasiswa"] = array();

		while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
			$maha = array();
			$mahasiswa["mahasiswaNim"] = $row["mahasiswaNim"];
			$mahasiswa["mahasiswaNama"] = $row["mahasiswaNama"];
			$mahasiswa["mahasiswaStatus"] = $row["mahasiswaStatus"];
			$mahasiswa["mahasiswaDenda"] = $row["mahasiswaDenda"];

			// push single product into final response array
			array_push($response["mahasiswa"], $mahasiswa);
		}
		// success
		$response["success"] = 1;

		// echoing JSON response
		echo json_encode($response);
	} else {
		// no products found
		$response["success"] = 0;
		$response["message"] = "No products found";

		// echo no users JSON
		echo json_encode($response);
	}
}
?>
