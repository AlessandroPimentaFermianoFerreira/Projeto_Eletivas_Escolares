<?php

include_once("conexao.php");



if ($_POST) {
    $data =  filter_var_array( $_POST['data']);

    if($data != ""){

        $nome = $data[0]['nome'];
        $matricula = $data[0]['matricula'];
        $turma = $data[0]['ano'];
        $seguimento = $data[0]['seguimento'];
        $eletivas_escolhidas = $data[0]['eletivas_escolhidas'];
        $quantidade_eletivas = $data[0]['quant_eletivas_obrigatoria'];

        
        $usuario = consultando_usuario_cadastrado($matricula, $conn);
        if($usuario == 0){
            $cadastro_user = cadastrando_usuario($nome, $matricula, $turma, $seguimento, $conn);
            $cadastro_eletiva = cadastrando_eletiva($eletivas_escolhidas, $matricula, $quantidade_eletivas, $conn);
            if($cadastro_user == 1 && $cadastro_eletiva == 1)
                echo 'sucesso';
            else
                echo "erro";
        }else{
            echo "usuariocadastrado";
        }   


        

    }

}

function consultando_usuario_cadastrado($matricula, $conn){

    if($matricula != ""){
        $result = $conn->prepare("SELECT * FROM pjeletiva.alunos where matricula  = :matricula");
        $result->bindParam(":matricula", $matricula);
        $result->execute();
    
        if ($result->rowCount() > 0) {
            $user = $result->fetch();
            return 1;
    
        }else{
            return 0;
        }
    
    }


}

function cadastrando_usuario($nome, $matricula, $turma, $seguimento, $conn){

    $stmt = $conn->prepare("INSERT INTO  pjeletiva.alunos(nome, matricula, turma, segmento) VALUES (:nome, :matricula, :turma, :segmento )");

    $stmt->bindParam(":nome", $nome);
    $stmt->bindParam(":matricula", $matricula);
    $stmt->bindParam(":turma", $turma);
    $stmt->bindParam(":segmento", $seguimento);
    $stmt->execute();

    $num_rows = $stmt->rowCount();
    if($num_rows > 0){
        return 1;
    }else{
        return 0;
    }

}

function cadastrando_eletiva($eletivas, $matricula, $quantidade_eletivas, $conn){
   

    switch($quantidade_eletivas){

        case 6:

            $stmt = $conn->prepare("INSERT INTO  pjeletiva.eletivas(id_aluno, eletiva_A, eletiva_B, eletiva_C, eletiva_D, eletiva_E,eletiva_F) VALUES (:matricula, :eletiva1, :eletiva2, :eletiva3, :eletiva4, :eletiva5, :eletiva6 )");

            $stmt->bindParam(":matricula", $matricula);
            $stmt->bindParam(":eletiva1", $eletivas[0]);
            $stmt->bindParam(":eletiva2", $eletivas[1]);
            $stmt->bindParam(":eletiva3", $eletivas[2]);
            $stmt->bindParam(":eletiva4", $eletivas[3]);
            $stmt->bindParam(":eletiva5", $eletivas[4]);
            $stmt->bindParam(":eletiva6", $eletivas[5]);
            $stmt->execute();

            $num_rows = $stmt->rowCount();
            if($num_rows > 0){
                return 1;
            }else{
                return  0;
             }


            break;

        case 7:

            $stmt = $conn->prepare("INSERT INTO  pjeletiva.eletivas(id_aluno, eletiva_A, eletiva_B, eletiva_C, eletiva_D, eletiva_E,eletiva_F,eletiva_G) VALUES (:matricula, :eletiva1, :eletiva2, :eletiva3, :eletiva4, :eletiva5, :eletiva6, :eletiva7 )");

            $stmt->bindParam(":matricula", $matricula);
            $stmt->bindParam(":eletiva1", $eletivas[0]);
            $stmt->bindParam(":eletiva2", $eletivas[1]);
            $stmt->bindParam(":eletiva3", $eletivas[2]);
            $stmt->bindParam(":eletiva4", $eletivas[3]);
            $stmt->bindParam(":eletiva5", $eletivas[4]);
            $stmt->bindParam(":eletiva6", $eletivas[5]);
            $stmt->bindParam(":eletiva7", $eletivas[6]);
    
            $stmt->execute();

            $num_rows = $stmt->rowCount();
            if($num_rows > 0){
                return 1;
            }else{
                return 0;
            }

            break;

    }
  
    

}








$conn = null;


?>