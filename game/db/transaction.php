<?php
    function price($level) {
        return $level*10;
    }

    require("connection.php");
    $userID  = $_GET["userID"];
    $upgrade = $_GET["upgrade"];



    // Hente ut verdier
    $sql = "SELECT * FROM users WHERE id=$userID;";
    $result = mysqli_query($connection, $sql);

    while ($row = mysqli_fetch_assoc($result)) {
        $values = [
            "balance" => $row["balance"],
            "armor"   => $row["armor"],
            "speed"   => $row["speed"],
            "laser"   => $row["laser"],
            "missile" => $row["missile"],
            "energy"  => $row["energy"]
        ];
    }



    // har brukeren nok penger, og er nivået under max?
    if ($values["balance"] >= price($values[$upgrade]) && $values[$upgrade]<5) {
        // gjennomføre transaksjon
        $sql = "UPDATE users 
                SET balance = balance-".price($values[$upgrade]).",
                    $upgrade = $upgrade+1
                WHERE id=$userID;";

        $result = mysqli_query($connection, $sql);

        $values["balance"] -= price($values[$upgrade]);
        $values[$upgrade] ++;
    }



    // returner nytt objekt
    echo "{
        \"balance\": ".$values["balance"].",

        \"upgrades\": {
            \"armor\":   ".$values["armor"].",
            \"speed\":   ".$values["speed"].",
            \"laser\":   ".$values["laser"].",
            \"missile\": ".$values["missile"].",
            \"energy\":  ".$values["energy"]."
        }
    }";
?>