<?php
    //pengaturan database
    $host = "localhost";
    $user = "sepeda";//biasanya defaultnya "root"
    $pass = "blst2016!!";//kalo xampp ngga pake password jadi tdk ush di isi apa2..
    $db = "sepeda";//udah tau kan maksudnya.. :D
    $koneksi = mysql_connect($host, $user, $pass) or die (/*'Koneksi Gagal!'*/);
    if($koneksi)
    {
       //     echo "Koneksi Sukses.";
    }
    if(!mysql_select_db($db))
   {
       //     echo "Database tidak ada.!";
   }
    //selesai pengaturan
?>
