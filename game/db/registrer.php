<?php
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
?>