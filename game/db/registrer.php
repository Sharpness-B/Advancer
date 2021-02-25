<?php
    require("connection.php");
    $userID      = $_GET["userID"];
    $fingerprint = $_GET["fingerprint"];

    // sjekk om bruker finnes fra før av
    //$sql = "SELECT * FROM users WHERE id=\"$userID\";";
    //$result = mysqli_query($connection, $sql);
    //$row = mysqli_fetch_assoc($result);

    // hvis ikke resultat fra db <=> hvis ikke ID i db
    //if (!$row) {
    if (!$userID) { // hvis ikke 0
        // registrer ny bruker
        //$sql = "INSERT INTO users (id) VALUES (\"$userID\");";
        $sql = "INSERT INTO users (fingerprint) VALUES(\"$fingerprint\");";
        $result = mysqli_query($connection, $sql);

        // hent ut id
        $sql = "SELECT * FROM users WHERE fingerprint=\"$fingerprint\";"; // fingerprint er kandidatnøkkel
        // $result = mysqli_query($connection, $sql);
        // while ($row = mysqli_fetch_assoc($result)) {
        //     $userID = $row["id"];
        // }
    }

    else {
        $sql = "SELECT * FROM users WHERE id=\"$userID\";";
    }

    // returner upgrades
    $result = mysqli_query($connection, $sql);

    while ($row = mysqli_fetch_assoc($result)) {
        $userID = $row["id"];

        echo "{
            \"id\": $userID,
    
            \"upgrades\": {
                \"armour\":  ".$row["armour"].",
                \"speed\":   ".$row["speed"].",
                \"laser\":   ".$row["laser"].",
                \"missile\": ".$row["missile"].",
                \"energy\":  ".$row["energy"]."
            }
        }";
    }
?>



<?php/*
    require("connection.php");
    $userID = $_GET["userID"];

    // sjekk om bruker finnes fra før av
    $sql = "SELECT * FROM users WHERE id=\"$userID\";";
    $result = mysqli_query($connection, $sql);
    $row = mysqli_fetch_assoc($result);

    // hvis ikke resultat fra db <=> hvis ikke ID i db
    if (!$row) {
        // registrer ny bruker
        $sql = "INSERT INTO users (id) VALUES (\"$userID\");";
        $result = mysqli_query($connection, $sql);
 
        // returner upgrades
        echo "{
            \"armour\":  1,
            \"speed\":   1,
            \"laser\":   1,
            \"missile\": 1,
            \"energy\":  1
        }";
    }

    // returner upgrades fra gamle brukere
    else {
        $sql = "SELECT * FROM users WHERE id=\"$userID\";";
        $result = mysqli_query($connection, $sql);

        while ($row = mysqli_fetch_assoc($result)) {
            echo "{
                \"armour\":  ".$row["armour"].",
                \"speed\":   ".$row["speed"].",
                \"laser\":   ".$row["laser"].",
                \"missile\": ".$row["missile"].",
                \"energy\":  ".$row["energy"]."
            }";
        }
    }
*/?>
