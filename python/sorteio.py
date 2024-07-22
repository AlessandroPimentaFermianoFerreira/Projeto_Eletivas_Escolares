
import mysql.connector


# ---------------------Conexao BD-----------------
mydb = mysql.connector.connect(
  host="localhost",
  user="adm",
  password="P@ssw0rd"
)

cursor = mydb.cursor()

# -----------------------Fim Conexao BD-----------------------


# --------------- Pesquisar as vagas-------------------------
def pesquisa_vaga(eletiva):

    query = f"SELECT quantidade FROM pjeletiva.tabela_eletivas WHERE tabela_eletivas.id_eletiva = '{eletiva}'"
    cursor = mydb.cursor()
    cursor.execute(query)
    linha_vaga = cursor.fetchone()
    quant =  cursor.rowcount
    
    return linha_vaga
    
  
# --------------------Fim da pesquisa de vagas ------------------

# ---------------------- Atualiza a vagas ---------------------------
def atualizar_vaga(argumento):
    
        myquery = f"UPDATE pjeletiva.tabela_eletivas SET quantidade = (SELECT SUM(LR.quantidade) - 1 FROM pjeletiva.tabela_eletivas LR WHERE LR.id_eletiva = '{argumento}') WHERE pjeletiva.tabela_eletivas.id_eletiva = '{argumento}'"
        cursor = mydb.cursor()
        cursor.execute(myquery)
        atualiza_vaga = cursor.fetchone()
        if(cursor.rowcount > 0):
            return 1
        else:
            return 0
         
    

# ---------------------- Fim Atualiza a vagas ---------------------------


# -------------------------Jogando elemento sortiado e atualizando tabela --------------------
def numbers_to_strings(argument, matricula_aluno):
    
    adicionar_eletiva = add_tabela_sorteio(matricula_aluno, argument)
    
    if(adicionar_eletiva == "addsucesso"):
        return "sucesso"
    else:
        return "erro"
    
#   ---------------Fim------------------------------      


# --------------Query buscando alunos-------------------------
def buscar_alunos():
    consulta_alunos = f"SELECT * FROM pjeletiva.alunos a INNER JOIN pjeletiva.eletivas e ON a.matricula = e.id_aluno ORDER BY RAND();"
    cursor = mydb.cursor()
    cursor.execute(consulta_alunos)
    linhas = cursor.fetchall()
    return linhas


# ---------------Fim-----------------------------------------


# -------------------Query INSERT na tabela de elementos sorteados ----------------------

def add_tabela_sorteio(id_aluno, eletiva_sorteada):
    
        add_sorteio = f"INSERT INTO pjeletiva.eletivas_sorteadas (id_aluno, eletiva_A) VALUES ('{id_aluno}','{eletiva_sorteada}');"
        cursor = mydb.cursor()
        cursor.execute(add_sorteio)
        linhas = cursor.fetchall()
        quant =  cursor.rowcount
        if(quant > 0):
            resultado = atualizar_vaga(eletiva_sorteada)
            if(resultado == 1):
                return "addsucesso"
            else:
                return "erro"


# ------------------------Fim-----------------------------------------------------------

def consultando_user_ja_foi_sorteado(matricula):
    consulta_sorteio = f"SELECT * FROM pjeletiva.eletivas_sorteadas WHERE id_aluno = '{matricula}';"
    cursor = mydb.cursor()
    cursor.execute(consulta_sorteio)
    linhas = cursor.fetchone()
    quant =  cursor.rowcount
    if(quant > 0):
        return True
    else:
        return False



#---------Query sorteio de eletivas-----------------
def sorteiando_eletivas(lista_de_eletivas):
    eletivas_dispo = []
   
    for linha in lista_de_eletivas:
        quant_eletivas_selecionadas = pesquisa_vaga(linha)
       
        
        if quant_eletivas_selecionadas is not None:
            if(quant_eletivas_selecionadas[0] > 0):
                
                eletivas_dispo.append(linha)
               
                
    if(len(eletivas_dispo) > 0):
        eletiva_escolhida = eletivas_dispo[0]
    else:
        eletiva_escolhida = 0     
    
    return eletiva_escolhida
 # ---------------------------------------------
 
 
#  ----------------------MAIN()-------------------


alunos = buscar_alunos()
lista = []
for index, element in enumerate(alunos):
    nome = element[2]
    matricula = element[0]
    turma = element[3]
    segmento = element[4]
    
    if(element[12] == ""):
        lista = [int(element[6]), int(element[7]), int(element[8]),int(element[9]), int(element[10]), int(element[11])]
    else:
        lista = [int(element[6]), int(element[7]), int(element[8]),int(element[9]), int(element[10]), int(element[11]), int(element[12])]
        
    print("----------------------------------------------")
    if(consultando_user_ja_foi_sorteado(matricula) == True):
            print("ALUNO JA FOI SORTEADO ===> ", nome , "MATRICULA ====>", matricula)
           
    else:
        escolhendo_eletiva = sorteiando_eletivas(lista)
        if(escolhendo_eletiva == 0):
            print("ALUNO NAO POSSUI ELETIVA DISPONIVEL NO SEU PERFIL ===> ", nome , "MATRICULA ====>", matricula)
        
        else:
            
            numbers_to_strings(escolhendo_eletiva, matricula)
            print("ALUNO SORTEADO ===> ", nome , "MATRICULA ====>", matricula, "ELETIVA =========>", escolhendo_eletiva)
            
    print("----------------------------------------------")
        

mydb.commit()
cursor.close()
mydb.close()