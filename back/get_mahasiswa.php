<?php
 
// array for JSON response
$response = array();
 
// include db connect class
require_once __DIR__ . '/db_connect.php';
 
// connecting to db
$db = new DB_CONNECT();
 
// check for post data
if (isset($_POST["mahasiswaNim"])) {
    $nim = $_POST['mahasiswaNim'];
 
    // get a product from products table
    $result = mysql_query("SELECT * FROM mahasiswa WHERE mahasiswaNim = '$nim'");
 
    if (!empty($result)) {
        // check for empty result
        if (mysql_num_rows($result) > 0) {
 
            $result = mysql_fetch_array($result);
 
            $mahasiswa = array();
            $mahasiswa["mahasiswaNim"] = $result["mahasiswaNim"];
            $mahasiswa["mahasiswaNama"] = $result["mahasiswaNama"];
            $mahasiswa["mahasiswaStatus"] = $result["mahasiswaStatus"];
            $mahasiswa["mahasiswaDenda"] = $result["mahasiswaDenda"];
            // success
            $response["success"] = 1;
 
            // user node
            $response["mahasiswa"] = array();
 
            array_push($response["mahasiswa"], $mahasiswa);
 
            // echoing JSON response
            echo json_encode($response);
        } else {
            // no product found
            $response["success"] = 0;
            $response["message"] = "No product found";
 
            // echo no users JSON
            echo json_encode($response);
        }
    } else {
        // no product found
        $response["success"] = 0;
        $response["message"] = "No product found";
 
        // echo no users JSON
        echo json_encode($response);
    }
} else {
    // required field is missing
    $response["success"] = 0;
    $response["message"] = "Required field(s) is missing";
 
    // echoing JSON response
    echo json_encode($response);
}
?>
