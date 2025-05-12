let token='12345'

let checkToken=(req,res,next)=>{
console.log('Middleware called')
if(req.query.token=="" || req.query.token==undefined){
  return res.status(401).send({status:0,message:"Token is missing"})

}
if(req.query.token!=token){
  return res.status(401).send({status:0,message:"Token is invalid"})
}
next()
}
module.exports=checkToken