<?php
	$response = array();
	require_once __DIR__ . '/db_connect.php';
	$db = new DB_CONNECT();

	if(isset($_GET["noShelter"])){
    	$noShelter = $_GET["noShelter"];
    
    	$result = mysql_query("SELECT * FROM sepeda WHERE sepedaLokasi = $noShelter");
    	if(mysql_num_rows($result) > 0){
        	$response["sepeda"] = array();
        
        	while($row = mysql_fetch_array($result)){
            	$sepeda = array();
            	$sepeda["sepedaId"] = $row["sepedaId"];
            	$sepeda["jenisSepedaId"] = $row["jenisSepedaId"];
            
            	array_push($response["sepeda"], $sepeda);
            }
        	$response["success"] = 1;
        }
    	else
        {
        	$response["success"] = 0;
        	$response["message"] = "Tidak ada sepeda disini";

        	echo json_encode($response);
        }
    }
    else 
    {
    	// required field is missing
    	$response["success"] = 0;
    	$response["message"] = "Required field(s) is missing";

    	// echoing JSON response
    	echo json_encode($response);
	}
    
?>