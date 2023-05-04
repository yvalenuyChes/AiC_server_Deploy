const express = require('express')
const  router = express.Router()

const bcrypt = require('bcrypt')

const UserSchema = require('../Models/user')

router.post('/', (req,res)=>{
   UserSchema.findOne({email:req.body.email})
   .then(user => {
       bcrypt.compare(req.body.password, user.password)
       .then(passwordCheck => {
           if(!passwordCheck){
               return response.status(400).send({
                   message: "Неверный пароль",
                   error,
                 })
           }

           const token = jwt.sign({
               userId: user._id,
               userEmail: user.email
           },
           'RANDON-TOKEN',
           {expiresIn:'300h'}
           )


           res.status(200).send({
               message: "Вы успешно вошли в систему",
               email: user.email,
               token,
               color:'rgb(47, 160, 47)'
           })
       })
       .catch(err => {
           res.status(400).send({
               message:'Пароль',
               err
           })
       })
   })
   .catch(err => {
       res.status(404).send({
           message:'Почта не найдена',
           err
       })
   })
})


module.exports = router