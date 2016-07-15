<?php

function fiGET( $fiInput ) {
	return @mysql_real_escape_string( stripslashes ( trim($_GET[$fiInput]) ) );
};

function fiPOST( $fiInput ) {
	return @mysql_real_escape_string( stripslashes ( trim($_POST[$fiInput]) ) );
};

?>