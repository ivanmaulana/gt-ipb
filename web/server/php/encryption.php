<?php
	
function fiEncode( $fiInput, $fiKey ) {	
	// Output variable
	$fiOutput = $fiInput;
	
	// Fi encryption
	for ($fiI = 0; $fiI < strlen($fiOutput); $fiI++) {	
		$fiOutput[$fiI] = chr(ord($fiOutput[$fiI]) ^ ord($fiKey[$fiI%strlen($fiKey)]));
	}
	return urlencode(base64_encode($fiOutput));
};

	
function fiDecode( $fiInput, $fiKey ) {		
	// Output variable
	$fiOutput = base64_decode(urldecode($fiInput));
	
	// Fi encryption
	for ($fiI = 0; $fiI < strlen($fiOutput); $fiI++) {	
		$fiOutput[$fiI] = chr(ord($fiOutput[$fiI]) ^ ord($fiKey[$fiI%strlen($fiKey)]));
	}
	
	return $fiOutput;
};


// Key
define('AISIVEKEY', 'Aisive Fakhri Fiqih Albert Ivan');
	
function aiEncode( $aiInput ) {	
	return fiEncode ( $aiInput, constant('AISIVEKEY') );
};

	
function aiDecode( $aiInput ) {		
	
	return fiDecode ( $aiInput, constant('AISIVEKEY') );
};
     
	
?>