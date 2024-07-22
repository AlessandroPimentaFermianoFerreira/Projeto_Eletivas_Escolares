
function validamatricula(matricula) {

    if (matricula != "") {

        $.post("verifica_user.php", { data: matricula }, function (retorno) {
                console.log(retorno)
            if(retorno == 'semdados'){
                let mensagem = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;"><symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></symbol><symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></symbol><symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </symbol></svg> <div class="alert alert-danger d-flex align-items-center" role="alert"><svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg><div class="text-uppercase" >MATRICULA NÃO ENCONTRADA FAVOR PROCURE SEU PROFESSOR RESPONSÁVEL!</div></div> `;
               
                let titulo = '<h5 class="modal-title text-uppercase text-center">Atenção:</h5>';
                $("#mensageria").html(mensagem);
                $(".titulo").html(titulo);
                $(".confirmar").remove();
                abrirModal('meumodal');
                fechando();

            }else{
              
                var separar = retorno.split("</head>");

				$('head').html(separar[0]);
				var myVar = separar[1].toString("");
				var myarr = myVar.split("<alezin>");

				$('body').html(myarr[0]);
				$('alezin').html(myarr[1]);

            }

           
        });

    } else {
        let mensagem = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;"><symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></symbol><symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></symbol><symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </symbol></svg> <div class="alert alert-danger d-flex align-items-center" role="alert"><svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg><div class="text-uppercase" >INFORME SUA MATRICULA PARA CONTINUAR!</div></div> `;
       
        let titulo = '<h5 class="modal-title text-uppercase text-center">Atenção:</h5>';
        $("#mensageria").html(mensagem);
        $(".titulo").html(titulo);
        $(".confirmar").remove();
        abrirModal('meumodal');
        fechando();

    }





}



function fechar() {
    location.reload(true);
}

function fechando() {
    $(".fechar").on("click", function () {
        fechar();
    });
}

function abrirModal(id) {
    $(`#${id}`).modal("show");
}




function somenteNumeros(num) {
    var er = /[^0-9.]/;
    er.lastIndex = 0;
    var campo = num;
    if (er.test(campo.value)) {
        campo.value = "";
    }

}



function selecionadoperfileletiva(selecao) {
 
    var linkElement = document.querySelector('#turma')
    var ano = linkElement.textContent
    
    var dados = document.getElementById('turma')
    var indice = dados.value;
    
    if (indice == 6) {

        let html = `  <div class="d-flex justify-content-center"> <blockquote class="blockquote"><p class="text-center h5">Escolha as matérias Eletivas pretendentes conforme Turma `+  ano +`</p>
    </blockquote></div><div class="container col-6"> <div class="d-flex justify-content-center aleoki"> <div class="btn-group" role="group" aria-label="Basic outlined example"> <button type="button" class="btn btn-outline-dark m-2" id="1" value="1" name="SEMPRE QUIS SABER" onclick="criandorowseletiva('1','turma')">SEMPRE QUIS SABER</button>
    <button type="button" class="btn btn-outline-dark m-2" id="2" value="2" name="QUEM NÃO CANTA, DANÇA!" onclick="criandorowseletiva('2','turma')">QUEM NÃO CANTA, DANÇA!</button><button type="button" class="btn btn-outline-dark m-2" id="3" value="3" name="TERRA-MAR (CULTURA AFRO-BRASILEIRA)" onclick="criandorowseletiva('3','turma')">TERRA-MAR (CULTURA AFRO-BRASILEIRA)</button>
    <button type="button" class="btn btn-outline-dark m-2" id="4" value="4" name="NEM TUDO SÃO FLORES, SÃO PETS" onclick="criandorowseletiva('4','turma')">NEM TUDO SÃO FLORES, SÃO PETS</button>
    </div> </div></div><div class="container col-3"><div class="d-flex justify-content-center"><div class="btn-group" role="group" aria-label="Basic outlined example"><button type="button" class="btn btn-outline-dark m-2" id="5" value="5" name="AEROMODELISMO" onclick="criandorowseletiva('5','turma')">AEROMODELISMO</button>
    <button type="button" class="btn btn-outline-dark m-2" id="6" value="6" name="BRINCANDO E REUTILIZANDO" onclick="criandorowseletiva('6','turma')">BRINCANDO E REUTILIZANDO</button>
    </div></div></div>`;

        $("#resultado").html(html);

    } else {

        let html = `  <div class="d-flex justify-content-center"> <blockquote class="blockquote"><p class="text-center h5">Escolha as matérias Eletivas pretendentes conforme Turma `+  ano +` </p>
    </blockquote></div><div class="container col-6"> <div class="d-flex justify-content-center"> <div class="btn-group" role="group" aria-label="Basic outlined example"> <button type="button" class="btn btn-outline-dark m-2" id="7" value="7" name="A MARÉ ESTÁ PARA PEIXE" onclick="criandorowseletiva('7','turma')">A MARÉ ESTÁ PARA PEIXE</button>
    <button type="button" class="btn btn-outline-dark m-2" id="8" value="8" name="ENTRE LINHAS" onclick="criandorowseletiva('8','turma')">ENTRE  LINHAS</button><button type="button" class="btn btn-outline-dark m-2" id="9" value="9" name="DE OLHO NO IFES" onclick="criandorowseletiva('9','turma')">DE OLHO NO IFES</button>
    <button type="button" class="btn btn-outline-dark m-2" id="10" value="10" name="CARTAS NA MESA" onclick="criandorowseletiva('10','turma')">CARTAS NA MESA</button>
    </div> </div></div><div class="container col-3"><div class="d-flex justify-content-center"><div class="btn-group" role="group" aria-label="Basic outlined example"><button type="button" class="btn btn-outline-dark m-2" id="11" value="11" name="LEITURA PARA MENTES CURIOSAS" onclick="criandorowseletiva('11','turma')">LEITURA PARA MENTES CURIOSAS</button>
    <button type="button" class="btn btn-outline-dark m-2" id="12" value="12" name="CINEMA EM AÇÃO" onclick="criandorowseletiva('12','turma')">CINEMA EM AÇÃO</button>
    <button type="button" class="btn btn-outline-dark m-2" id="13"  value="13" name="LABORATORIO" onclick="criandorowseletiva('13','turma')">LABORATORIO</button></div></div>`;
        $("#resultado").html(html);

    }
}