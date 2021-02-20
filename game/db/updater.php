<?php
    require("connection.php");

    // $sql = "INSERT INTO test VALUES ( \"".$_GET["rocket"]."\" );";
    // $result = mysqli_query($connection, $sql);  

    $sql = "SELECT RAND() AS tall;";
    $result = mysqli_query($connection, $sql);  
?>

{
    "tall": <?php while ($row = mysqli_fetch_assoc($result)) {echo $row["tall"];} ?>,
    "data": <?php echo $_GET["rocket"]; ?>
}
