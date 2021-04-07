<?php
    // settings
    $servername = "localhost";
    $username   = "root";
    $password   = "";
    $dbname     = "advancer";

    $servername = "mysql.elev.stolav.it";
    $username = "stolav_advancer";
    $password = "LRGH?v*C";
    $dbname = "stolav_advancer";
    
    // the connection to db
    $connection = mysqli_connect(
        $servername, $username, $password, $dbname
    );
    
    mysqli_set_charset($connection, "utf-8");

    // check 
    if (!$connection) {
        die("db connection failed");
    }
?>
