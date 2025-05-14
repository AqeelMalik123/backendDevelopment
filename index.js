require('dotenv').config()
const express = require('express')
const checkToken = require('./checkTokenMiddleware')
const dbConnection = require('./dbConnection')
const app = express()
const port = 4000
app.use(express.json())

// let password='12345'
// console.log(process.env.TOKEN)
// app.use(checkToken)
// let checkpassword=(req,res,next)=>{
//   console.log('Password Middleware called')
//   if(req.query.password=="" || req.query.password==undefined){
//     return res.status(401).send({status:0,message:"Password is missing"})
//   }
//   if(req.query.password!=password){
//     return res.status(401).send({status:0,message:"Password is invalid"})
//   }
//   next()
// }
// app.use(checkpassword )
app.get('/student-read', (req, res) => {
  res.send('Student View API')
})
app.post('/student-insert',async(req,res)=>{
  let myDB=await dbConnection()
  let studentCollection=myDB.collection('students')
  let obj={
    name:req.body.name,
    email:req.body.email,
    // password:req.body.password
  }
  let insertRes=await studentCollection.insertOne(obj)
  console.log(obj,"obj")
  let resObj={
        status:1,
        msg:"Data Insert",
        insertRes
  }

res.send(resObj)
})
// app.post('/student-insert',(req,res)=>{
//   console.log(req.body)
//  res.send({status:1,message:"Login Success",data:req.body})
// })
app.get('/new/:id',(req,res)=>{
  let currentId=req.params.id
  res.send('<h1>About page</h1>'+currentId)
})
app.get('/new',checkToken,(req,res)=>{
  res.send('<h2>Youtube chai or code me')
})
app.listen(process.env.PORT || 4000,()=>{
  console.log('Server is running on port 3000')
})
