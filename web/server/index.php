<?php 
	
	header( "Access-Control-Allow-Origin: *" );
	header( "Access-Control-Allow-Credentials: true" );
//	header( "Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS" );
//	header( "Access-Control-Max-Age: 604800" );
//	header( "Access-Control-Request-Headers: x-requested-with" );
	header( "Access-Control-Allow-Headers: x-requested-with, x-requested-by, Content-Type" );
	
	// AngularJS POST
	$_POST = json_decode(file_get_contents('php://input'), true);
	
	@include 'php/conn.php';
	@include 'php/var.php';
	@include 'php/encryption.php';
	
	// Decryption parameter get
//	$_GET = json_decode(aiDecode(fiGET('get')), true);

	// Security 1 (unactive)
	$app = 'aisive';
	
	// For validation
	$json['app'] = $app;
	$i = 1;
	
	// Read Sql
	$sql = fiGET('sql');
	
	// is token valid?
	$auth = false;
	if ($sql != 'signin') @include 'sql/tokenValidation.php';
	else $auth = true;
	
	
	// is Auth?
	if ($auth) {
		
		// Default mode = select		
		$mode = 'select';
		
		// Include sql
		@include 'sql/'.$sql.'.php';

		
		// MODE to print data
		switch ($mode) {
			case 'select' :
				while ($data = @mysql_fetch_assoc($result)) {
				
					// Password remover
					if (isset($data['password'])) unset($data['password']);
				
					// Insert to json
					$json[$i++] = $data;
				}
				break;
			case 'update' : 
				if ($result && mysql_affected_rows()) {
					$json['updateSuccess'] = 1;
				}
				else $json['updateError'] = 1;
				break;
		}
		
	}	
	else $json['error'] = 'Token is invalid';
	
	// Print data
	$callback = fiGET('callback');
	if (!empty($callback)) echo $callback.'(';		
	echo json_encode($json);		
	if (!empty($callback)) echo ');';
		
	
	
	@include 'conn-close.php';

?>