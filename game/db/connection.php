<?php
    // settings
    $servername = "localhost";
    $username   = "root";
    $password   = "";
    $dbname     = "advancer";
    
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
