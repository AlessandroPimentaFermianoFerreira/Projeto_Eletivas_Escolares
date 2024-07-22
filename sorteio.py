import random
import mysql.connector
import pandas as df

# ---------------------Conexao BD-----------------
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="P@ssw0rd"
)

cursor = mydb.cursor()

# -----------------------Fim Conexao BD-----------------------


# --------------- Pesquisar as vagas-------------------------
def pesquisa_vaga(eletiva):

    query = f"SELECT quantidade FROM eletivas_2024.tabela_eletivas WHERE tabela_eletivas.nome = '{eletiva}'"
    cursor = mydb.cursor()
    cursor.execute(query)
    linha_vaga = cursor.fetchone()
    return linha_vaga

# --------------------Fim da pesquisa de vagas ------------------

# ---------------------- Atualiza a vagas ---------------------------
def atualizar_vaga(argumento):
    
        myquery = f"UPDATE eletivas_2024.tabela_eletivas SET quantidade = (SELECT SUM(LR.quantidade) - 1 FROM eletivas_2024.tabela_eletivas LR WHERE LR.nome = '{argumento}') WHERE eletivas_2024.tabela_eletivas.nome = '{argumento}'"
        cursor = mydb.cursor()
        cursor.execute(myquery)
        atualiza_vaga = cursor.fetchone()
        print("Número total de ATUALIZADOS: ", cursor.rowcount)
        return atualiza_vaga
    

# ---------------------- Fim Atualiza a vagas ---------------------------


# -------------------------Jogando elemento sortiado e atualizando tabela --------------------
def numbers_to_strings(argument, matricula_aluno):
  
    match argument:
        case "Matemática":
            buscando_vaga = pesquisa_vaga(argument)
            if(buscando_vaga == 0):
                return False
            else:
                vaga = atualizar_vaga(argument)
                add = add_tabela_sorteio(matricula_aluno, argument)
        case "Português":
            buscando_vaga = pesquisa_vaga(argument)
            if(buscando_vaga == 0):
                return False
            else:
                vaga = atualizar_vaga(argument)
                return vaga
        case "História":
            buscando_vaga = pesquisa_vaga(argument)
            if(buscando_vaga == 0):
                return False
            else:
                vaga = atualizar_vaga(argument)
                return vaga
#   ---------------Fim------------------------------      


# --------------Query buscando alunos-------------------------
def buscar_alunos(id):
    consulta_alunos = f"SELECT * FROM eletivas_2024.alunos a INNER JOIN eletivas_2024.eletivas e ON a.matricula = e.id_aluno where e.indice = '{id}';"
    cursor = mydb.cursor()
    cursor.execute(consulta_alunos)
    linhas = cursor.fetchall()
    return linhas


# ---------------Fim-----------------------------------------
def consultandoaluno(matricula):
    consulta_alunos = f"SELECT * FROM alunos WHERE matricula = '{matricula}';"
    cursor = mydb.cursor()
    cursor.execute(consulta_alunos)
    linhas = cursor.fetchall()
    quantidade_alunos =  cursor.rowcount
    return quantidade_alunos




# ---------------------------Buscando quantidade------------------
def buscandoquantidade():
    quant_alunos = f"SELECT * FROM eletivas_2024.alunos;"
    cursor = mydb.cursor()
    cursor.execute(quant_alunos)
    linhas = cursor.fetchall()
    quantidade_alunos =  cursor.rowcount
    
    return quantidade_alunos

# --------------------------fim------------------------------------
# -------------------Query INSERT na tabela de elementos sorteados ----------------------

def add_tabela_sorteio(id_aluno, eletiva_sorteada):
    if(consultando_eletiva_se_ja_foi_sorteada(eletiva_sorteada) == False):
        add_sorteio = f"INSERT INTO eletivas_2024.eletivas_sorteadas (id_aluno, eletiva_A) VALUES ('{id_aluno}','{eletiva_sorteada}');"
        cursor = mydb.cursor()
        cursor.execute(add_sorteio)
        linhas = cursor.fetchall()
        quant =  cursor.rowcount
        if(quant > 0):
            return "Elemento inserindo com SUCESSO"
        else:
            return "Erro ao inserir o eletiva sorteada"
    else:
        numbers_to_strings(sorteio_eletivas_inicio)

# ------------------------Fim-----------------------------------------------------------

def consultando_eletiva_se_ja_foi_sorteada(eletiva):
    consulta_sorteio = f"SELECT * FROM eletivas_sorteadas WHERE eletiva_A = '{eletiva}' OR eletiva_B ='{eletiva}' or eletiva_C ='{eletiva}');"
    cursor = mydb.cursor()
    cursor.execute(consulta_sorteio)
    linhas = cursor.fetchall()
    quant =  cursor.rowcount
    if(quant > 0):
        return True
    else:
        return False



#---------Query sorteio de eletivas-----------------
def sorteiando_eletivas():
    consulta_sql = "SELECT * FROM eletivas_2024.eletivas"
    cursor = mydb.cursor()
    cursor.execute(consulta_sql)
    linhas = cursor.fetchall()

    for linha in linhas:
        elements = [ linha[1], linha[2],  linha[3]]
        eletivas = random.choice(elements)
    return eletivas
 # ---------------------------------------------
 
 
#  ----------------------MAIN()-------------------

 
sorteio_eletivas_inicio = sorteiando_eletivas()
alunos_pesquisados = buscandoquantidade()

while(alunos_pesquisados > 0 ):
    aluno = buscar_alunos(alunos_pesquisados) 
    print("ALUNOS PESQUISADOS",alunos_pesquisados)
    
    # vaga_eletiva_sorteio = numbers_to_strings(sorteio_eletivas_inicio, aluno[alunos_pesquisados][0])
    # if(vaga_eletiva_sorteio == False):
    #     print("Nao tem mais vaga nessa irá sortear novamente")
    #     sorteio_eletivas_inicio = sorteiando_eletivas() 
    alunos_pesquisados = alunos_pesquisados - 1
    
        

mydb.commit()
cursor.close()
mydb.close()