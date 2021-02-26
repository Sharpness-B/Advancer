<?php
    require("connection.php");
    $userID      = $_GET["userID"];
    $fingerprint = $_GET["fingerprint"];


    
    // sjekk om bruker finnes fra før av
    if (!$userID) { // hvis 0
        // registrer ny bruker
        $sql = "INSERT INTO users (fingerprint) VALUES(\"$fingerprint\");";
        $result = mysqli_query($connection, $sql);

        // hent ut id
        $sql = "SELECT * FROM users WHERE fingerprint=\"$fingerprint\" ORDER BY id LIMIT 1;"; // fingerprint er kandidatnøkkel
    }

    else {
        $sql = "SELECT * FROM users WHERE id=\"$userID\";";
    }



    // returner upgrades
    $result = mysqli_query($connection, $sql);

    while ($row = mysqli_fetch_assoc($result)) {
        $userID = $row["id"];

        echo "
        {
            \"userID\": $userID,
    
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
