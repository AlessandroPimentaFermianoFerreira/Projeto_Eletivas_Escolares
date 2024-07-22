<?php

$servername = "localhost";
$username = "adm";
$password = "P@ssw0rd";
$dbname = "pjeletiva";

try {
    $conn = new PDO("mysql:host=$servername; port=3306; dbname=$dbname", $username, $password);

    // Ativar o modo de erros
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  } catch(PDOException $e) {
    // erro na conexão
    $error = $e->getMessage();
    echo "Erro: $error";
  }



?>