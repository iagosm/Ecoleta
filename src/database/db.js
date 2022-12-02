const { create } = require("lodash")

// importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()//verbose ta configurando para ver mensagens sempre q mexer.irá aparecer no terminal 

// iniciar o objeto de banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
// Utilizar o objeto de banco de dados para as operações
// Serialize = ele vai rodar uma sequencia de codigo
db.serialize(() =>{

//     //Com comandos SQL eu vou : 

//     // 1 criar uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places(
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             imagem TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         ); 
//     `)

//     //2 Inserir dados na tabela
//     
    

//     //3 consultar dados da tabela
//     // db.all(`SELECT name FROM places`,function(err,rows){
//     //     if(err){
//     //         return console.log(err)
//     //     }
//     //     console.log("Aqui estão seus registros: ")
//     //     console.log(rows)
//     // })


//     //4     Deletar Dados da tabela
    // db.run(`DELETE FROM places WHERE id = ?`,[1],function(err){
    //     if(err){
    //         return console.log(err)
    //     }
    // })
    // console.log("Registro deletado com sucesso!")
})
