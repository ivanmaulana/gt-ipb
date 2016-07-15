<?php
//
//   sql = CREATE VIEW jumlahSepeda AS SELECT
// sum(case when sepedaLokasi = 1 then 1 else 0 end) shelter1,
// sum(case when sepedaLokasi = 2 then 1 else 0 end) shelter2,
// sum(case when sepedaLokasi = 3 then 1 else 0 end) shelter3,
// sum(case when sepedaLokasi = 4 then 1 else 0 end) shelter4,
// sum(case when sepedaLokasi = 5 then 1 else 0 end) shelter5,
// sum(case when sepedaLokasi = 6 then 1 else 0 end) shelter6,
// sum(case when sepedaLokasi = 7 then 1 else 0 end) shelter7,
// sum(case when sepedaLokasi = 8 then 1 else 0 end) shelter8,
// sum(case when sepedaLokasi = 9 then 1 else 0 end) shelter9,
// sum(case when sepedaLokasi = 10 then 1 else 0 end) shelter10
// from sepeda

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

		$link = mysqli_connect("localhost","sepeda","blst2016!!","sepeda") or die("Error " . mysqli_error($connection));

    // get a product from products table
    $result = mysqli_query($link, "SELECT * FROM jumlahSepeda") or die("Error in Selecting " . mysqli_error($connection));

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result))
    {
        $emparray[] = $row;
    }
    echo json_encode($emparray);

    mysqli_close($connection);

?>
