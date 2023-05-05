const express = require('express')
const bodyParser = require('body-parser')
const { default: mongoose } = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')


const PORT = process.env.PORT || 8000

const UserSchema = require('./server/Models/user')


const send_verification_letter = require('./server/routes/send_verification_letter')
const signup = require('./server/routes/signup')
// const login = require('./routes/login')


        const server = express()
        server.use(bodyParser.json())
        server.use(bodyParser.urlencoded({ extended: true }))

        const DATABASE_URL =  'mongodb+srv://vlados:26029830052tapor@projectdb.lss9m.mongodb.net/?retryWrites=true&w=majority'
        mongoose
            .connect(DATABASE_URL, {
                useNEWUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                console.log('database connected');
             })

           
             server.use(cors())


             server.use((req, res, next) => {
                 res.setHeader("Access-Control-Allow-Origin", "*")
                 res.setHeader(
                   "Access-Control-Allow-Headers",
                   "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, cookie",
                 )
                 res.setHeader(
                   "Access-Control-Allow-Methods",
                   "GET, POST, PUT, DELETE, PATCH, OPTIONS"
                 )
                 next()
               });
     
     

        server.use('/signup',signup)

        server.use('/send_virified_letter', send_verification_letter)


        server.post('/login', (req,res)=>{
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
                        message:'Неверный пароль',
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

        // server.post('/remind_password', (req, res)=>{
        //     UserSchema.findOne({email:req.body.email})
        //     .then(user => {
        //         bcrypt.(user.password, user.password)
        //         .then()
        //     })
        // })

        server.get('/user',  (req,res)=> {
            const token = req.headers.cookie
            console.log(token);
            const cookie = token.slice(6)
            const decoded = jwt.decode(cookie)
            UserSchema.findOne({email:decoded.userEmail})
            .then((result,err) => {
                    if(result){
                        res.status(200).send(result)
                    }else{
                        console.log(err)
                    }
                }
            )
        })

        server.post('/send_reset_password_code', (req, res)=> {
            const email = req.body.email
            UserSchema.findOne({email})
            .then(user=> {
                res.status(200).send({
                    message:'find user'
                })
                // const EMAIL_HOST = process.env.SMTP_HOST
                // const EMAIL_USERNAME = process.env.SMTP_USERNAME
                // const EMAIL_PASSWORD = process.env.SMTP_PASSWORD
                //    const transport = nodemailer.createTransport({
                //        host: EMAIL_HOST,
                //        port: 2525,
                //        auth: {
                //        user: EMAIL_USERNAME,
                //        pass: EMAIL_PASSWORD
                //        }
                //     })
            
                    
                //    transport.sendMail({
                //        from:'aic_test@gmail.com',
                //        to: user.email,
                //        subject:'Код для сброса пароля',
                //        html:`${user.resetPasswordCode}`
                //     })
            })
            .catch(err=> {
                res.status(404).send({
                    message:'Почта не найдена',
                    color: 'rgb(208, 97, 97)',
                    err
                })
            })
        })


        server.post('/verify-reset-password-code', (req, res)=>{
            const userCode = req.body.send_code
            const email = req.body.email

            UserSchema.findOne({email})
            .then(user => {
                if(user.resetPasswordCode === userCode){
                    UserSchema.findOneAndUpdate(
                        {email},
                        {$set:{resetPasswordCode:Math.floor(100000 + Math.random() * (999999 + 1 - 100000)) }}
                    )
                    res.status(200).send({
                        isCkecked: true
                    })
                }else{
                    res.status(500).send({
                        message:'Невалидный код',
                        isCkecked: false
                    })
                }
            })
        })


        server.post('/change-password', (req,res)=> {
            UserSchema.findOneAndUpdate(
                {email:req.body.email},
                {$set:{password:req.body.newPassword}}
            )
            .then(() => {
                res.status(200).send({
                    message:'Пароль успешно изменен',
                    color:'rgb(47, 160, 47)'
                })
            })
            .catch(err => {
                res.status(500).send({
                    message:'Ошибка сервера, проверьте подключение к интернету и повторите попытку',
                    color:'rgb(208, 97, 97)'
                })
            })
        })

        server.post('/order_ticket', (req, res)=> {
            const ticket = {
                name: req.body.name,
                personNumber: req.body.personNumber,
                dateFrom: req.body.dateFrom,
                dateCome:req.body.dateCome,
                price: req.body.price
            }
            try{

                UserSchema.findOneAndUpdate(
                    {email:req.body.email}, 
                    {$push: {tickets:ticket}}, 
                    { upsert: true },  
                    ).then(()=>{
                        res.status(200).send({
                          message:  'Билет заказан',
                          color:'rgb(47, 160, 47)'
                        })
                    })
                   

            }catch(e){
                res.status(200).send({
                    message:  'Не удалось заказать билет',
                    color:'rgb(208, 97, 97)'
                  })
            }
        })

        server.post('/add_card', (req,res)=> {

            const creditCard = {
                cardNumber: req.body.cardNumber,
                holderName: req.body.holderName,
                expireDate: '21/30',
                bankName: req.body.bankName,
                brand:req.body.brand
            }
            try{
                
                UserSchema.findOne({email: req.body.email}).then(user=>{  
                    let isUniqCard = true
                    if(user.creditCards.length > 0){
                        user.creditCards.map(card => {
                            if(card.cardNumber.toString() === req.body.cardNumber){
                              return isUniqCard = false
                            }
                        })
                        isUniqCard
                        ?
                        UserSchema.findOneAndUpdate(
                                {email:req.body.email },
                                {$push: {creditCards:creditCard}},
                                { upsert: true }, 
                            ).then(()=> {
                                res.status(200).send({
                                  message:  'Вы успешно привязали карту',
                                  color:'rgb(47, 160, 47)'
                                })
                            })
                            : 
                            res.status(200).send({
                                message: 'Карта уже добавлена',
                                color:'rgb(208, 97, 97)',
                            })
                    }else{
                        UserSchema.findOneAndUpdate(
                            {email:req.body.email },
                            {$push: {creditCards:creditCard}},
                            { upsert: true }, 
                        ).then(()=> {
                            res.status(200).send({
                               message: 'Вы успешно привязали карту',
                               color:'rgb(47, 160, 47)'
                            })

                        })
                    }
                   
                })
                
            }catch(e){
                console.log(e)
            }
        })


        server.post('/delete_card', (req, res)=> {
            UserSchema.findOne({email: req.body.email}).then(
                user => { 
                    let findCard = null
                    let deletedCardNumber = null

                    user.creditCards.map((card, key)=> {
                        if(card.cardNumber.toString() === req.body.cardNumber){
                            findCard = key
                            deletedCardNumber = card.cardNumber.toString()
                           
                        }
                    })

                    findCard >= 0
                    ? UserSchema.findOneAndUpdate(
                        {email:req.body.email },
                        {$pull: {creditCards:{ cardNumber:deletedCardNumber} }},
                        { upsert: true }, 
                    )
                    .then(()=> {
                        res.status(200).send({
                            message:'Карта удалена',
                            color:'rgb(47, 160, 47)'
                        })
                    })
                    : 
                    res.status(200).send({
                        message:'Карта не найдена',
                        color:'rgb(208, 97, 97)',
                    })
                }
            )
        })


       
        server.listen(PORT, (err) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${PORT}`)
        })
