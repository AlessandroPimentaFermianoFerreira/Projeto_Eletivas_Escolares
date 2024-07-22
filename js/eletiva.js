var counter = 1;
var t;
var ver = false;
var radiobtn;


//Construir minha tabela
function const_tabela() {
    t = $('#tabelaeletiva').DataTable({
        paging: false,
        orderCellsTop: false,
        retrieve: false,
        paging: false,
        info: false,
        select: false,
        searching: false,

        "language": {
            "emptyTable": " ",
        },
    });
}

function criandorowseletiva(nomeeletiva, selecao) {

    var quant_eletivas = $(`#${selecao}`).val();
    var id_eletiva = $(`#${nomeeletiva}`).val();
    id_eletiva.checked = true;

    var tamanhoelet = verificacounttabela().length;



    if (tamanhoelet <= quant_eletivas && quant_eletivas != "") {
        //DESABILITAR O BOTAO QUANDO SELECIONADO
        if ($(`#${nomeeletiva}`).prop("checked", true)) {
            $(`#${nomeeletiva}`).prop('disabled', true);
        }
        //VARIAVEL PARA ADICIONAR O ID DO BOTAO
        // var parent = document.querySelector($(`#${nomeeletiva}`));


        var botao_apagar = '<button type="button" class="btn btn-danger" onclick="apagar_eletiva(' + nomeeletiva + ');" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"> <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/></svg></button>';
        if ($(`${nomeeletiva}`).val() != "" && id_eletiva != "" && id_eletiva != "Selecione") {


            var elem = document.getElementById(nomeeletiva)
            var name = elem.name;

            if (tamanhoelet == 0) {
                counter = tamanhoelet + 1;
                t.row.add([counter, name, botao_apagar]).draw(false);
                counter++;
            } else {
                vetores = verificacounttabela();
                var h = analisando(vetores, name);
                if (h.length > 0) {
                    let mensagem = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;"><symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></symbol><symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></symbol><symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                  </symbol></svg> <div class="alert alert-warning d-flex align-items-center" role="alert"><svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg><div class="text-uppercase" >Eletiva já está selecionada, se quiser trocar a ordem, clique em apagar!</div></div> `;

                    let titulo = '<h5 class="modal-title text-uppercase text-center">Adicionar Eletivas:</h5>';
                    $("#mensageria").html(mensagem);
                    $(".titulo").html(titulo);
                    $(".confirmar").remove();
                    abrirModal('mymodal');
                } else {
                    t.row.add([counter, name, botao_apagar]).draw(false);
                    counter++;
                }

            }

        }

    } else {

        let mensagem = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;"><symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></symbol><symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></symbol><symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </symbol></svg> <div class="alert alert-danger d-flex align-items-center" role="alert"><svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg><div class="text-uppercase" >Você atingiu o Maximo de eletivas escolhidas!   Total ` + quant_eletivas + ` eletivas</div></div> `;


        // let mensagem = '<div class="alert alert-danger text-uppercase" role="alert">Você atingiu o Maximo de eletivas escolhidas!   Total ' + quant_eletivas + ' eletivas</a></div>';
        let titulo = '<h5 class="modal-title text-uppercase text-center">Atenção:</h5>';
        $("#mensageria").html(mensagem);
        $(".titulo").html(titulo);
        $(".confirmar").remove();
        abrirModal('mymodal');

    }
}


function verificacounttabela() {
    var pedidos = [];
    var pedido = [];

    $('#tabelaeletiva tbody tr').each(function () {

        // Recuperar todas as colunas da linha percorida
        colunas = $(this).children();

        // Criar objeto para armazenar os dados
        pedido = {
            'id': $(colunas[0]).text(), // valor da coluna Produto
            'nome_eletiva': $(colunas[1]).text(), // Valor da coluna nome eletiva
        };

        // Adicionar o objeto pedido no array
        //if verifica se existe alguma row preenchida, caso não adiciona no array de eletiva
        if ($(colunas[1]).text() != "") {
            pedidos.push(pedido);

        }

    });

    return pedidos;

}






function lista_name_eletiva_id() {
    var lista = [];
    var eletiva_name = [];

    $('#tabelaeletiva tbody tr').each(function () {

        // Recuperar todas as colunas da linha percorida
        col = $(this).children();

        // Criar objeto para armazenar os dados
        eletiva_name = {
            'id': $(col[0]).text(), // valor da coluna Produto
            'nome_eletiva': $(col[1]).text(), // Valor da coluna nome eletiva
        };

        // Adicionar o objeto pedido no array
        //if verifica se existe alguma row preenchida, caso não adiciona no array de eletiva
        if ($(col[1]).text() != "") {

            eletiva_id = tratando_name_eletiva($(col[1]).text())
            // console.log(eletiva_id)
            lista.push(eletiva_id);

        }

    });

    return lista;

}





function tratando_name_eletiva(eletiva) {
  

    switch (eletiva) {

        case "SEMPRE QUIS SABER":
            return 1;


        case "QUEM NÃO CANTA, DANÇA!":
            return 2;


        case "TERRA-MAR (CULTURA AFRO-BRASILEIRA)":
            return 3;

        case "NEM TUDO SÃO FLORES, SÃO PETS":

            return 4;

        case "AEROMODELISMO":

            return 5;

        case "BRINCANDO E REUTILIZANDO":

            return 6;

        case "A MARÉ ESTÁ PARA PEIXE":

            return 7;

        case "ENTRE LINHAS":

            return 8;

        case "DE OLHO NO IFES":

            return 9;

        case "CARTAS NA MESA":

            return 10;

        case "LEITURA PARA MENTES CURIOSAS":

            return 11;

        case "CINEMA EM AÇÃO":

            return 12;

        case "LABORATORIO":

            return 13;

    }


}



function apagar_eletiva(nomeeletiva) {
    ///HABILITA O BOTAO NOVAMENTE QUANDO APAGADO
    if ($(`#${nomeeletiva}`).prop("checked", true)) {
        $(`#${nomeeletiva}`).prop('disabled', false);
    }

    $('#tabelaeletiva tbody').on('click', 'button', function () {
        $($(this).parents('tr')).addClass('selected');
        t.row('.selected').remove().draw(false);
        var vt = verificacounttabela().length;
        counter = vt + 1;


    });
}


function analisando(vetor, elem) {
    var elementos = [];
    Object.entries(vetor).forEach(entry => {

        const [key, value] = entry;
        if (value['nome_eletiva'] === elem) {
            elementos.push(value['nome_eletiva']);
        }
    });
    return elementos;
}



function validacao(nome, matricula, turma, seguimento) {
    var eletivas_escolhidas = lista_name_eletiva_id();

    let tam_eletivas = verificacounttabela().length;
    var quant_eletivas_obrigatoria = $(`#${turma}`).val();

    if (tam_eletivas == 0) {

        let mensagem = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;"><symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></symbol><symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></symbol><symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </symbol></svg> <div class="alert alert-warning d-flex align-items-center" role="alert"><svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg><div class="text-uppercase" >Favor escolha as eletivas pretendentes! todos os campos obrigatório!</div></div> `;
       
        let titulo = '<h5 class="modal-title text-uppercase text-center">escolha de eletivas:</h5>';
        $("#mensageria").html(mensagem);
        $(".titulo").html(titulo);
        $(".confirmar").remove();
        abrirModal('mymodal');
        $(".fechar").on("click", function () {
            fecharModal('mymodal');
        });

    } else {
        var linkElement = document.querySelector('#turma')
        var ano = linkElement.textContent

        var listagem = [];
        listagem.push({ nome, matricula, ano, seguimento, eletivas_escolhidas, quant_eletivas_obrigatoria });




        if (quant_eletivas_obrigatoria != tam_eletivas || quant_eletivas_obrigatoria > tam_eletivas) {
            let mensagem = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;"><symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></symbol><symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></symbol><symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </symbol></svg> <div class="alert alert-warning d-flex align-items-center" role="alert"><svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg><div class="text-uppercase" >Verifique a quantidade de eletivas, conforme a sua turma é necessário a escolha de até ` + quant_eletivas_obrigatoria + `</div></div> `;
           

            // let mensagem = '<div class="alert alert-warning text-uppercase" role="alert">Verifique a quantidade de eletivas, conforme a sua turma é necessário a escolha de até ' + quant_eletivas_obrigatoria + ' </div>';
            let titulo = '<h5 class="modal-title text-uppercase text-center">escolha de eletivas:</h5>';
            $("#mensageria").html(mensagem);
            $(".titulo").html(titulo);
            $(".confirmar").remove();
            abrirModal('mymodal');
            $(".fechar").on("click", function () {
                fecharModal('mymodal');
            });


        } else {
            let mensagem = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></symbol><symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></symbol><symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></symbol></svg><div class="alert alert-success d-flex align-items-center" role="alert"><svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                  <div class="text-uppercase">Deseja confirmar o envio das eletivas selecionadas?<p class="fw-bold">A eletivas obedeceram a PRIORIDADE conforme a ordem a qual foram selecionadas! </p></div></div>`;
            let titulo = '<h5 class="modal-title text-uppercase text-center">escolha de eletivas:</h5>';
            $("#mensageria").html(mensagem);
            $(".titulo").html(titulo)
            $(".confirmar").html("")
            $(".fechar").html("")
            $(".aleokii").html(` <button type="button" class="btn btn-danger fechar" data-bs-dismiss="modal">Fechar</button><button type="button"  class="btn btn-success confirmar">Confirmar</button>`);
            abrirModal('mymodal');

            $(".fechar").on("click", function () {
                fecharModal('mymodal');
            });

            $(".confirmar").on("click", async function () {
                fecharModal('mymodal');
                abrirModal("infoload");
                
                let urlEmail = "envio.php";
                let request = { data: listagem }

                let resultadoEmail = await new Promise(resolve => $.post(urlEmail, request, function (retorno) {

                    setTimeout(() => {
                        resolve(retorno);
                        console.log(retorno)
                        if (retorno == "sucesso") {
                            
                            let mensagem = ` <div class="alert alert-success" role="alert"><h4 class="alert-heading">Cadastro realizado com sucesso!</h4><p>Aguarde orientações do seu Professor responsável, para a convocação após a realização do sorteio!</p><hr><p class="mb-0">Quaisquer dúvida procure seu orientador...</p>
                      </div> `;

                            $(".titulo").html("");
                            $(".confirmar").html("");
                            $(".fechar").html("");
                            $("#mensageria").html(mensagem);
                            $(".aleokii").html(`<button type="button" class="btn btn-secondary fechar" data-bs-dismiss="modal">Fechar</button>`);
                            abrirModal('mymodal');
                            fechando();

                        } else if ('usuariocadastrado') {


                            let mensagem = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;"><symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></symbol><symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></symbol><symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">                       <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </symbol></svg> <div class="alert alert-danger d-flex align-items-center" role="alert"><svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg><div class="text-uppercase" >Aluno já possue cadastro de eletivas</div></div> `;
                            $(".confirmar").html("");
                            $(".titulo").html("");
                            $(".aleokii").html(`<button type="button" class="btn btn-secondary fechar" data-bs-dismiss="modal">Fechar</button>`);
                            $("#mensageria").html(mensagem);
                            abrirModal('mymodal');
                            fechando();

                        } else if ("erro") {
                            let mensagem = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;"><symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></symbol><symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></symbol><symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                          </symbol></svg> <div class="alert alert-danger d-flex align-items-center" role="alert"><svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg><div class="text-uppercase" >Não foi possível realizar o cadastro. error no post</div></div> `;
                            $(".confirmar").html("");
                            $(".titulo").html("");
                            $("#mensageria").html(mensagem);
                            fechando();

                        }
                        fecharModal("infoload");

                    }, 2000);

                }));

            });

        }
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


function fecharModal(id) {
    $(`#${id}`).modal("hide");
}

function somenteNumeros(num) {
    var er = /[^0-9.]/;
    er.lastIndex = 0;
    var campo = num;
    if (er.test(campo.value)) {
        campo.value = "";
    }

}

