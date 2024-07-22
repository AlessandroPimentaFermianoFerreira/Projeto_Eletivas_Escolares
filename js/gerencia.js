var tab_eletiva


function tabelaeletiva() {
    tab_eletiva = $('#tab_eletiva').DataTable({
        pageLength: 5,
        lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "Todos"]],
        orderCellsTop: false,
        retrieve: false,
        language: {
            url: '//cdn.datatables.net/plug-ins/2.0.3/i18n/pt-BR.json',
        },
       //ADICIONA O BOTAO EXCEL E PDF NA TABELA
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excelHtml5',
                title: 'Eletiva_2º_semestre_XLS',
                text: 'Exportar para Excel'

            },
            {
                extend: 'pdfHtml5',
                title: 'Eletiva_2º_semestre_PDF',
                text: 'Exportar para PDF'

            }

        ]

    });
}



function buscar_eletiva() {
   

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    const checkedValues = [];
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            checkedValues.push({
                id: checkbox.id,
                name: checkbox.name,
                value: checkbox.value
            });
           
        }

    });
    var tamanho = checkedValues.length;
    if (tamanho == 0) {

        let mensagem = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;"><symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></symbol><symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></symbol><symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </symbol></svg> <div class="alert alert-warning d-flex align-items-center" role="alert"><svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg><div class="text-uppercase" >Selecione eletiva para realizar a consulta</div></div> `;

        let titulo = '<h5 class="modal-title text-uppercase text-center">Atenção:</h5>';
        $("#mensageria").html(mensagem);
        $(".titulo").html(titulo);
        $(".confirmar").remove();
        abrirModal('meumodal');

    } else {
        
        tab_eletiva.destroy();
        tabelaeletiva();
        $.post("consultadados.php", { data: checkedValues }, function (retorno) {

            const obj = JSON.parse(retorno);
            
            obj.forEach((item) => {

                item.forEach(function (pessoa) {
                    let matricula = pessoa['matricula'];
                    let nome = pessoa['nome'];
                    let turma = pessoa['turma'];
                    let segmento = pessoa['segmento'];
                    let elemento = pessoa['eletiva_A'];
                    var eletiva = parseInt(elemento);

                    let eletiva_sorteada = tratando_name_eletiva(eletiva)

                    tab_eletiva.row.add([matricula, nome, turma, segmento, eletiva_sorteada]).draw(false);
                });
            });


        });



    }
}


function verificar_elemento(id) {
    if (id != "") {


        $.post("verificar_eletiva.php", { data: id }, function (retorno) {
            if (retorno == "semdados") {
                let mensagem = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;"><symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></symbol><symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></symbol><symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </symbol></svg> <div class="alert alert-warning d-flex align-items-center" role="alert"><svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg><div class="text-uppercase" >Não existe dados há serem carregados na eletiva</div></div> `;

                let titulo = '<h5 class="modal-title text-uppercase text-center">Atenção:</h5>';
                $("#mensageria").html(mensagem);
                $(".titulo").html(titulo);
                $(".confirmar").remove();
                abrirModal('meumodal');
                const checkbox = document.getElementById(id);
                checkbox.checked = false;
            } else {
                return true;
            }
        });

    }

}



function abrirModal(id) {
    $(`#${id}`).modal("show");
}


function fecharModal(id) {
    $(`#${id}`).modal("hide");
}


function fechando() {
    $(".fechar").on("click", function () {
        fecharModal();
    });
}



function tratando_name_eletiva(eletiva) {


    switch (eletiva) {

        case 1:
            return "SEMPRE QUIS SABER";


        case 2:
            return "QUEM NÃO CANTA, DANÇA!";


        case 3:
            return "TERRA-MAR (CULTURA AFRO-BRASILEIRA)";

        case 4:

            return "NEM TUDO SÃO FLORES, SÃO PETS";

        case 5:

            return "AEROMODELISMO";

        case 6:

            return "BRINCANDO E REUTILIZANDO";

        case 7:

            return "A MARÉ ESTÁ PARA PEIXE";

        case 8:

            return "ENTRE LINHAS";

        case 9:

            return "DE OLHO NO IFES";

        case 10:

            return "CARTAS NA MESA"

        case 11:

            return "LEITURA PARA MENTES CURIOSAS";

        case 12:

            return "CINEMA EM AÇÃO";

        case 13:

            return "LABORATORIO";

    }


}











