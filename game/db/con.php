<?php
    // settings
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "flex";
    
    // the connection to db
    $con = mysqli_connect(
        $servername, $username, $password, $dbname
    );
    
    mysqli_set_charset($con, "utf-8");

    // check
    if (!$con) {
        die("db connection failed");
    }
?>
