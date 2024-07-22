<?php

include_once("conexao.php");

$eletivas_lista = array();

if ($_POST) {
    $eletiva = filter_var($_POST['data']);
    
    $user = consulta_users($eletiva,$conn);

    if(is_array($user)){
       echo "temdados";
        
    }else{
        echo "semdados";
    }
   
  
    
    
}


function consulta_users($eletiva,$conn){

    $result = $conn->prepare("SELECT * FROM pjeletiva.alunos a INNER JOIN pjeletiva.eletivas_sorteadas e ON a.matricula = e.id_aluno WHERE e.eletiva_A = :eletiva;");
    $result->bindParam(":eletiva", $eletiva);
    $result->execute();

    if ($result->rowCount() > 0) {
        $user = $result->fetch();
        return $user;
    }

}






?>