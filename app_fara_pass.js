
let scriptsT =`<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="browser.js"></script>`

let formT =`<form action="/addddd" method="POST" id="todoForm">
<input type ="text" value="" id ="inputTodo">
<button>Adauga</button>
</form>`

let stringcon = "mongodb+srv://user:pass@cluster0-zktbz.mongodb.net/todoApp?retryWrites=true&w=majority"


let express = require("express")

let todoApp = express()
todoApp.use(express.static("scripts"))
todoApp.use(express.json())
todoApp.use(express.urlencoded({extended:false}))

//conectare la bd
let mongodb = require("mongodb")
let db

mongodb.connect(stringcon,{ useUnifiedTopology: true },function(err,client){
db = client.db()
todoApp.listen(3000)
})

// end conectare la bd



//preluare date



todoApp.get('/',function(req,res){

    db.collection('items').find().toArray(function(err,items){
  
    let listT = `<ul id="ulTodo"></ul>\n`  

     let itemsT = `<script>let itemsArray = ${JSON.stringify(items)}</script>`

  
  res.send(formT+listT+itemsT+scriptsT)
  })
  
})

//end preluare date



//stergere item

todoApp.post('/delete',function(req,res){
  let id = new mongodb.ObjectId(req.body.id)
  db.collection('items').deleteOne({_id:id},function(err,response){
    res.send(response)
  })
  
})
//end stergere item


//editare item

todoApp.post('/edit',function(req,res){
  let id = new mongodb.ObjectId(req.body.id)
  let newVal= req.body.newVal
  db.collection('items').findOneAndUpdate({_id:id},{$set:{text:newVal}},function(err,response){
    res.send(response)
  })
  
})
//end editare item

//adaugare item

todoApp.post('/adauga',function(req,res){
  
  let valTodo= req.body.text
  db.collection('items').insertOne({text:valTodo},function(err,response){
    res.send(response)
  })
  
})
//end adaugare item
