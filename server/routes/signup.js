const express = require('express')
const  router = express.Router()

const bcrypt = require('bcrypt')

const UserSchema = require('../Models/user')


router.post('/',(req,res)=>{

   UserSchema.findOne({email: req.body.email}).then(user=>{
       if(user){
           return res.status(400).send({
               message: 'Email уже занят',
           })
       }
   })


   bcrypt
   .hash(req.body.password, 10)
   .then((hashedPassword)=> {
       const user = new UserSchema({
           name:req.body.name,
           email: req.body.email,
           password:hashedPassword,
           confirmed:false,
           checkNumber: Math.floor(100000 + Math.random() * (999999 + 1 - 100000)) ,
           resetPasswordNumber: Math.floor(100000 + Math.random() * (999999 + 1 - 100000)) ,
       })

       try{
           user.save()
           .then( result =>{
               res.status(201).send({
                   message:'User Created Successfully',
                   result
               })
           })
           .catch(err => {
               res.status(500).send({
                   message:'Ошибка сервера',
                   err,
                   color:'rgb(208, 97, 97)'
               })
           })
           
       }catch(e){
           res.status(500).send({
               message:'Password was not hashed successfully',
               e
           })
       }
   })

 
})


module.exports = router