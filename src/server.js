const express = require("express")
const server = express()

// Configurar pasta publica. Para poder atribuir o styles para todos os arquivos
server.use(express.static("public"))//configuração de arquivo estatico

// Utilizando template Engine
const nunjucks = require("nunjucks")
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
    // resposta enviar arquivo = dirname + pasta
        return res.render("create-point.html")//render ele entende q vai passar pelo motor do nunjucks
    })

    server.get("/search",(req,res) => {
        // resposta enviar arquivo = dirname + pasta
            return res.render("search-results.html")//render ele entende q vai passar pelo motor do nunjucks
        })
    


// Ligar o servidor
server.listen(3000) // node src/server.js para iniciar o servidor ou npm start
