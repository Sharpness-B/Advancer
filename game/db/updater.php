<?php
    require("connection.php");

    $userID = $_GET["userID"];
    $data = json_decode( $_GET["data"] ); // url escape


    // formater data.polygon
    $polygonSTR = "[";

    foreach ($data -> polygon as $point) {
        $polygonSTR .= "[";
        foreach ($point as $value) {
            $polygonSTR .= $value . ",";
        }
        $polygonSTR = substr($polygonSTR, 0, -1);
        $polygonSTR .= "],";
    }

    if (count($data -> polygon)) {
        $polygonSTR = substr($polygonSTR, 0, -1);
    }

    $polygonSTR .= "]";



    // fjern gamle verdier fra DB
    $sql = "DELETE FROM ships WHERE userid=$userID;";
    $result = mysqli_query($connection, $sql);  

    $sql = "DELETE FROM lasers WHERE userid=$userID;";
    $result = mysqli_query($connection, $sql); 


    // slett andres gamle verider
    $sql = "DELETE FROM ships WHERE time < NOW() - INTERVAL 5 DAY_SECOND;";
    $result = mysqli_query($connection, $sql);  

    $sql = "DELETE FROM lasers WHERE time < NOW() - INTERVAL 5 DAY_SECOND;";
    $result = mysqli_query($connection, $sql); 


    // legg til oppdaterte verdier i DB
    $sql = "INSERT INTO ships (userid, polygon) VALUES($userID, \"$polygonSTR\");";
    $result = mysqli_query($connection, $sql);

    // for hver laser
    foreach($data->lasers as $location) {
        $laserSTR = "[";
        foreach ($location as $value) {
            $laserSTR .= $value . ",";
        }
        $laserSTR = substr($laserSTR, 0, -1);
        $laserSTR .= "]";
        
        $sql = "INSERT INTO lasers (userid, location) VALUES($userID, \"$laserSTR\");";
        $result = mysqli_query($connection, $sql);  
    }



    // hente ut objekter fra andre spillere fra DB
    // skip
    $ships = []; 
    $sql = "SELECT * FROM ships WHERE NOT userid=$userID;";
    $result = mysqli_query($connection, $sql); 
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($ships, $row["polygon"]);
    }
    
    // lasere
    $lasers = [];
    $sql = "SELECT * FROM lasers WHERE NOT userid=$userID;";
    $result = mysqli_query($connection, $sql);
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($lasers, $row["location"]);
    }



    // returnere nye verdier
    // formatering
    $shipsJSON  = "["; 
    $lasersJSON = "[";

    foreach ($ships as $value) {
        $shipsJSON .= $value . ",";
    }

    foreach ($lasers as $value) {
        $lasersJSON .= $value . ",";
    }

    // fjern siste komma
    if (count($ships)) {
        $shipsJSON = substr($shipsJSON, 0, -1);
    }
    if (count($lasers)) {
        $lasersJSON = substr($lasersJSON, 0, -1);
    }

    // lukk parantesen
    $shipsJSON  .= "]"; 
    $lasersJSON .= "]";
?>

{
    "ships":  <?php echo $shipsJSON; ?>,
    "lasers": <?php echo $lasersJSON; ?>
}
