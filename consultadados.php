<?php

include_once("conexao.php");

$lista_de_users = array();

if ($_POST) {
   
    $lista_eletiva = filter_var_array($_POST['data']);
    
    foreach ($lista_eletiva as $value) {
        $eletiva = $value['id'];
        $user = consulta_users($eletiva,$conn);
        if (is_array($user)) {
            array_push($lista_de_users, $user);
        }
    }
    if(count($lista_de_users) > 0){
        $dados = json_encode($lista_de_users, JSON_UNESCAPED_UNICODE);
        echo $dados;
    }else{
        return "vazio";
    }
    
}





function consulta_users($eletiva,$conn){

    $result = $conn->prepare("SELECT * FROM pjeletiva.alunos a INNER JOIN pjeletiva.eletivas_sorteadas e ON a.matricula = e.id_aluno WHERE e.eletiva_A = :eletiva;");
    $result->bindParam(":eletiva", $eletiva);
    $result->execute();

    if ($result->rowCount() > 0) {
        $user = $result->fetchAll();
        return $user;

    }else{
        echo "0";
    }

}






?>