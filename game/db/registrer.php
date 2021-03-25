<?php
    require("connection.php");
    $userID      = $_GET["userID"];
    $fingerprint = $_GET["fingerprint"];



    // hvis 0 <=> hvis cookien ikke finnes
    if (!$userID) {
        // hvis fingerprinten ikke finnes i db
        $sql = "SELECT * FROM users WHERE fingerprint=\"$fingerprint\";";
        $result = mysqli_query($connection, $sql);
        $cnt = mysqli_num_rows($result);

        if (!$cnt) {
            // registrer ny bruker
            $sql = "INSERT INTO users (fingerprint) VALUES(\"$fingerprint\");";
            $result = mysqli_query($connection, $sql);
        }

        // hent ut id og upgrades
        $sql = "SELECT * FROM users WHERE fingerprint=\"$fingerprint\";"; // fingerprint er kandidatnøkkel
    }

    else {
        // hvis brukeren ikke finnes i db
        $sql = "SELECT * FROM users WHERE id=$userID;";
        $result = mysqli_query($connection, $sql);
        $cnt = mysqli_num_rows($result);

        if (!$cnt) {
            // registrer ny bruker
            $sql = "INSERT INTO users (id, fingerprint) VALUES($userID, \"$fingerprint\");";
            $result = mysqli_query($connection, $sql);
        }

        else {
            // oppdatere fingerprint
            $sql = "UPDATE users SET fingerprint=\"$fingerprint\" WHERE id=$userID;";
            $result = mysqli_query($connection, $sql);
        }

        // hent ut upgrades
        $sql = "SELECT * FROM users WHERE id=$userID;";
    }



    // returner upgrades
    $result = mysqli_query($connection, $sql);

    while ($row = mysqli_fetch_assoc($result)) {
        echo "{
            \"userID\": ".$row["id"].",
            \"balance\": ".$row["balance"].",
    
            \"upgrades\": {
                \"armor\":   ".$row["armor"].",
                \"speed\":   ".$row["speed"].",
                \"laser\":   ".$row["laser"].",
                \"missile\": ".$row["missile"].",
                \"energy\":  ".$row["energy"]."
            }
        }";
    }
?>
