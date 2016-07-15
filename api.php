<?php
    
    // username check
    function search($ldap_con, $base_dn = false, $filter ='', $attr = array())
    {
            $result = ldap_search($ldap_con, $base_dn, $filter, $attr);
            return ldap_get_entries($ldap_con, $result);
    }

    // password check
    function check_password($ldap_con, $rdn, $password)
    {
            $bind = @ldap_bind($ldap_con, $rdn, $password);
            if($bind) return true;
            else return false;
    }

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
    
    // DB Connect
    $host = "172.17.1.6";
    $port = "389";
    $base_dn = "dc=ipb,dc=ac,dc=id";

    // get JSON input from HTTP POST
    $postdata = file_get_contents("php://input");
    
    // JSON Decode from input
    $request = json_decode($postdata);
    $username = $request->username;
    $password = $request->password;

    $ldap_con = ldap_connect( $host, $port );

    $data = search($ldap_con, $base_dn, 'uid='.$username);
    
    // avoid print unless username & password is set
    if (isset($username) and isset($password) and $data['count']>0){
        $cek = check_password($ldap_con, $data[0]['dn'], $password);
        if ($cek == true){
		echo $data[0]['nrp'][0];
	}
    }
    else {
        echo false;
    }

?>
