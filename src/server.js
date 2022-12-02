const express = require("express")
const server = express()

// Pegar o banco de dados
const db = require("./database/db.js")

// Configurar pasta publica. Para poder atribuir o styles para todos os arquivos
server.use(express.static("public"))//configuração de arquivo estatico

// Habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true}))

// Utilizando template Engine
const nunjucks = require("nunjucks")
const { get } = require("lodash")
// Para saber quais pasta estão os html que vão usar
nunjucks.configure("src/views", {
    express: server,
    noCache:true
    
})





//Configurar caminhos da minha aplicação
// Pagina inical
//req : Requisição
//res : Resposta
server.get("/",(req,res) => {
// resposta enviar arquivo = dirname + pasta
    return res.render("index.html", {title:"Um titulo"})
})

server.get("/create-point",(req,res) => {
    // Req.body = corpo do formulario
    // Query Strings da url = req.query
        console.log(req.body)
    // resposta enviar arquivo = dirname + pasta
        return res.render("create-point.html")//render ele entende q vai passar pelo motor do nunjucks
    })

server.post("/savepoint",(req, res) =>{
    // Inserir dados no banco de dados
    const query =`INSERT INTO places (
       imagem,
        name,
        address,
        address2,
        state,
        city,items) VALUES (?,?,?,?,?,?,?);`
          
            const values = [
                req.body.image,
                req.body.name,
                req.body.address,
                req.body.address2,
                req.body.state,
                req.body.city,
                req.body.items
            ]
        
            function afterInsertData(err){
                if(err){
                    console.log(err)
                    return res.send("Erro no cadastro!")
                }
                console.log("Cadastrado com sucesso")
                console.log(this)//this está referenciando a resposta q o run ta trazendo
                return res.render("create-point.html",{saved:true})
            }
        
        db.run(query,values,afterInsertData)

   
})

    server.get("/search",(req,res) => {
        const search = req.query.search

        if (search == "") {
            // Pesquisa vazia   
            // resposta enviar arquivo = dirname + pasta
        return res.render("search-results.html",{ total:0 })//render ele entende q vai passar pelo motor do nunjucks
        
        }

        // Pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`,function(err,rows){
        if(err){
            return console.log(err)
        }
        
        const total = rows.length
        // Mostrar a pagina html com os bancos de dados
        // resposta enviar arquivo = dirname + pasta
        return res.render("search-results.html",{ places:rows, total })//render ele entende q vai passar pelo motor do nunjucks
        
    })
})
    


// Ligar o servidor
server.listen(3000) // node src/server.js para iniciar o servidor ou npm start
