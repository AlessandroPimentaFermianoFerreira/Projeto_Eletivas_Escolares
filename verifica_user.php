<?php

include_once("conexao.php");

$pagina = file_get_contents('inicio.html');


if ($_POST) {
    $data = filter_var($_POST['data']);


    if($data != ""){
        $users = consulta_users($data, $conn);


        if (is_array($users)) {
        

            $dados = array();
            array_push($dados, $users);

            $substrings = $dados[0]['nome'];
            $string = "Situação";
            $pos = strpos( $substrings, $string );
            
            if ($pos === false) {
                $nome = explode("   ", $substrings);
                $palavra = trim(preg_replace('/\s\s+/',' ', $nome[0]));
             } else {
                $nome = explode("Situação", $substrings);
                $palavra = trim(preg_replace('/\s\s+/',' ', $nome[0]));
             }
             
            
           
           
            $matricula = $dados[0]['matricula'];
            $segmento = $dados[0]['segmento'];
            $turma =  $dados[0]['turma'];

            if( $dados[0]['turma'] == "6º" ||   $dados[0]['turma'] == "7º"){
                $nivel = 6;
            }elseif( $dados[0]['turma'] == "8º" ||  $dados[0]['turma'] == "9º"){
                $nivel = 7;
            }   
            

            $pagina = str_replace('$("#nomecompleto").val("");', '$("#nomecompleto").val("' . $palavra . '");', $pagina);
            $pagina = str_replace('$("#matricula").val("");', '$("#matricula").val("' . $matricula . '");', $pagina);
            
            $pagina = str_replace('$("#turma").val("");', '$("#turma").html("<option value= ' . $nivel . '> ' .$turma .  ' Ano</option>");', $pagina);

            $pagina = str_replace('$("#seguimento").val("");', '$("#seguimento").val("' .$segmento . '");', $pagina);



            echo $pagina;

        
    }else{
            echo "semdados";
    }
                
    }

}





function consulta_users($matricula, $conn){

    $result = $conn->prepare("SELECT * FROM pjeletiva.tabelas_alunos where matricula  = :matricula");
    $result->bindParam(":matricula", $matricula);
    $result->execute();

    if ($result->rowCount() > 0) {
        $user = $result->fetch();
        return $user;

    }else{
        return "1";
    }

}

$conn = null
?>