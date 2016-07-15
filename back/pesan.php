o<?php
    // check HTTP Origin
	if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }

		$connection = mysqli_connect("localhost","sepeda","blst2016!!","sepeda") or die("Error " . mysqli_error($connection));

    // get JSON input from HTTP POST
    $postdata = file_get_contents("php://input");

    if ($postdata){
				// JSON Decode from input
				$request = json_decode($postdata);
				$pesan2 = $request->pesan;
				$nim = $request->nim;
				$pesan = nl2br($pesan2);

				$query = mysqli_query($connection, "INSERT INTO pesan (nim, pesan) VALUES ('$nim', '$pesan')");

        // avoid print unless username & password is set
        if ($query){
            echo "sukses";
        }
        else {
            echo "gagal";
        }

        mysqli_close($connection);
    }
    else echo "";
?>
