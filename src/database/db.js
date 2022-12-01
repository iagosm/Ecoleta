const { create } = require("lodash")

// importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()//verbose ta configurando para ver mensagens sempre q mexer.irá aparecer no terminal 

// iniciar o objeto de banco de dados
const db = new sqlite3.Database("./src/database/database.db")

// Utilizar o objeto de banco de dados para as operações
// Serialize = ele vai rodar uma sequencia de codigo
db.serialize(() =>{

    //Com comandos SQL eu vou : 

    // 1 criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            imagem TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        ); 
    `)

    //2 Inserir dados na tabela
    const query =`INSERT INTO places (
    imagem,name,address,address2,state,city,items) VALUES (?,?,?,?,?,?,?);`
  
    const values = [
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "Colectoria",
        "Guilherme Gemballa, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }
        console.log("Cadastrado com sucesso")
        console.log(this)//this está referenciando a resposta q o run ta trazendo
}

// db.run(query,values,afterInsertData)
    

    //3 consultar dados da tabela


    //4     Deletar Dados da tabela
})