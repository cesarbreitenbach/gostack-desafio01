const express = require('express');

const app = express();
app.use(express.json());

const contador = {
   atual:0
}

app.use((req, res, next)=>{
   contador.atual++;
   console.log(`Chamada ${req.method} na api, url: ${req.url}, chamada numero: ${contador.atual}`)
   next()
})

const projects = [
   {
   "id":1,
   "title":"Projeto Frota",
   "tasks":['Aprender o processo', 'Transformar oleo de motor em diesel']
   }
]

function verifyProjectMiddleware(req, res, next) {
   if(!projects[req.params.id]){
      res.status(404).send("Projeto não localizado")
   }
   next();
}


app.get('/api/projects', (req, res)=>{
   console.log("Oi")
   res.json(projects)
})

app.post('/api/projects', (req, res)=>{

      projects.push(req.body)
      res.status(201).send("Inserido com sucesso")
})

app.put('/api/projects/:id', verifyProjectMiddleware, (req, res)=>{
   projects[req.params.id].title = req.body.title
   res.status(202).send("Titulo atualzado")
})

app.delete('/api/projects/:id', verifyProjectMiddleware, (req, res) =>{
   const i = req.params.id
   projects.splice(i, 1)
   res.status(200).send("Deletado com sucesso")
})

app.listen(3000, ()=>{
   console.log("Ouvindo porta 3000")
})