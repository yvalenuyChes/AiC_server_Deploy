const express = require('express')
const  router = express.Router()
const UserSchema = require('../Models/user')
const nodemailer = require('nodemailer')




router.post('/', (req,res)=>{
   UserSchema.findOne({email:req.body.email})
   .then(user => {
    const EMAIL_HOST = process.env.SMTP_HOST
    const EMAIL_USERNAME = process.env.SMTP_USERNAME
    const EMAIL_PASSWORD = process.env.SMTP_PASSWORD
       const transport = nodemailer.createTransport({
           host: EMAIL_HOST,
           port: 2525,
           auth: {
           user: EMAIL_USERNAME,
           pass: EMAIL_PASSWORD
           }
        })

        
       transport.sendMail({
           from:'aic_test@gmail.com',
           to: req.body.email,
           subject:'Проверка почты',
           html:`
           <!DOCTYPE html
           PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
       <html xmlns="http://www.w3.org/1999/xhtml">
       
       <head>
           <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
           <title>HTML Template</title>
           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
           <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,600" rel="stylesheet" />
           <style>
               body {
                   width: 100% !important;
                   -webkit-text-size-adjust: 100%;
                   -ms-text-size-adjust: 100%;
                   margin: 0;
                   padding: 0;
                   line-height: 100%;
                   font-family: Arial, Helvetica, sans-serif, 'Raleway';
               }
       
               [style*="Raleway"] {
                   font-family: 'Raleway', arial, sans-serif !important;
               }
       
               img {
                   outline: none;
                   text-decoration: none;
                   border: none;
                   -ms-interpolation-mode: bicubic;
                   max-width: 100% !important;
                   margin: 0;
                   padding: 0;
                   display: block;
               }
       
               table td {
                   border-collapse: collapse;
               }
       
               table {
                   border-collapse: collapse;
               }
       
               table a {
                   text-decoration: none;
               }
       
               .menu a {
                   color: #6c6c6c;
                   font-size: 14px;
                   font-weight: 400;
                   letter-spacing: 0.28px;
                   text-decoration: none;
               }
       
               .menu td {
                   padding-left: 30px;
               }
       
               .header-td {
                   padding-top: 40px;
                   padding-bottom: 40px;
               }
       
               .features-td {
                   padding-top: 100px;
                   padding-bottom: 30px;
               }
       
               .features-td p {
                   color: #8c8c8c;
                   font-size: 14px;
                   font-weight: 400;
                   line-height: 26px;
                   letter-spacing: 0.28px;
               }
       
               .blockqoute-td {
                   padding-top: 150px;
                   padding-bottom: 50px;
               }
       
               .table-600 img {
                   width: 300px;
                   height: 200px;
               }
       
               .block-td p {
                   color: #8c8c8c;
                   font-size: 14px;
                   font-weight: 400;
                   line-height: 30px;
                   letter-spacing: 0.28px;
               }
       
               .block-table td {
                   padding-top: 20px;
                   padding-bottom: 20px;
               }
       
               .title {
                   color: #8c8c8c;
                   font-size: 16px;
               }
       
               .button {
                   display: block;
                   width: 150px;
                   background-color: royalblue;
                   line-height: 30px;
                   color: white;
                   text-decoration: none;
                   border-radius: 5px;
               }
       
       
               .block-table {
                   border-top: 1px solid #e6e6e6;
                   border-left: 1px solid #e6e6e6;
                   border-right: 1px solid #e6e6e6;
                   border-bottom: 1px solid #e6e6e6;
               }
       
       
               .footer-td {
                   padding-top: 80px;
                   padding-bottom: 80px;
               }
       
               .footer-menu-td {
                   padding-top: 60px;
                   padding-bottom: 35px;
               }
       
               .footer-menu-td a {
                   color: #bcc9dd;
                   font-size: 14px;
                   font-weight: 400;
                   letter-spacing: 0.36px;
                   text-decoration: none;
               }
       
               .copyright-td {
                   color: #bcc9dd;
                   font-size: 12px;
                   font-weight: 400;
                   letter-spacing: 0.31px;
               }
       
               .copyright-td a {
                   font-weight: 600;
                   text-decoration: none;
                   color: #bcc9dd;
               }
       
               @media (max-width: 870px) {
                   .table-850 {
                       width: 600px !important;
                   }
       
                   .table-600 {
                       width: 550px !important;
                   }
       
                   .block-table {
                       width: 200px !important;
                   }
       
                   .block-table p br {
                       display: none !important;
                   }
       
                   .features-td td {
                       display: block !important;
                       margin-bottom: 50px !important;
                   }
               }
       
               @media (max-width: 620px) {
                   .table-850 {
                       width: 400px !important;
                   }
       
                   .table-600 {
                       width: 320px !important;
                   }
       
                   .block-td {
                       display: block !important;
                       margin-bottom: 50px !important;
                       padding: 0 !important;
                   }
       
                   .blockqoute-td tr {
                       display: block !important;
                   }
       
                   .block-table {
                       width: 320px !important;
                       display: block !important;
                       margin: 0 auto !important;
                   }
       
                   .logo {
                       display: block !important;
                       margin: 0 auto !important;
                       text-align: center !important;
                       width: 200px !important;
                       margin-bottom: 20px !important;
                   }
       
                   .logo img {
                       margin: 0 auto !important;
                   }
       
                   .menu {
                       display: block !important;
                       margin: 0 auto !important;
                   }
               }
       
               @media (max-width: 420px) {
                   .table-850 {
                       width: 300px !important;
                   }
       
                   .table-600 {
                       width: 260px !important;
                   }
       
                   .block-table {
                       width: 260px !important;
                   }
       
                   .blockqoute-td {
                       padding-top: 50px !important;
                       padding-bottom: 50px !important;
                   }
       
                   .footer-menu-td table {
                       width: 260px !important;
                   }
       
                   .menu td {
                       padding-left: 10px !important;
                       padding-right: 10px !important;
                   }
               }
           </style>
       </head>
       
       <body style="margin: 0; padding: 0;">
           <div style="font-size:0px;color:#ffffff;opacity:0;visibility:hidden;width:0;height:0;display:none;">Тестовое
               письмо</div>
           <table cellpadding="0" cellspacing="0" width="100%">
               <tr>
                   <td>
                       <table class="main table-850" cellpadding="0" cellspacing="0" width="850" align="center">
                           <tr>
                               <td height="30" width="850"></td>
                           </tr>
                           <tr>
                               <td bgcolor="#ffffff" class="header-td">
                                   <table class="table-600" cellpadding="0" cellspacing="0" width="600" align="center">
                                       <tr>
                                           <td align="left" class="logo">
                                               <a href="##" style="color: black;">AiW</a>
                                           </td>
                                           <td align="right" class="menu">
                                               <table cellpadding="0" cellspacing="0">
                                                   <tr>
                                                       <td><a href="##" class="link">Команда</a></td>
                                                       <td><a href=" ##" class="link">Планы</a></td>
                                                       <td><a href=" ##" class="link">Стоимость</a></td>
                                                       <td><a href=" ##" class="link">Контакты</a></td>
                                                   </tr>
                                               </table>
                                           </td>
                                       </tr>
                                   </table>
                               </td>
                           </tr>
                           <tr>
                               <td class=" banner-td">
                                   <a href="#">
                                       <img src="https://lifeo.ru/wp-content/uploads/gifka-more-39.gif" alt="banner" />
                                   </a>
                               </td>
                           </tr>
                          
                           <tr>
                               <td class="blockqoute-td" bgcolor="#ffffff">
                                   <table class="table-600" cellpadding="0" cellspacing="0" width="600" align="center">
                                       <tr>
                                           <td class="block-td" align="center" style="padding-right: 20px;">
                                               <table cellpadding="0" cellspacing="0" class="block-table" align="center" width="280">
                                                   <tr>
                                                       <td align="center">
                                                           <p>
                                                               Ваш проверочный код: ${user.checkNumber}
                                                           </p>
                                                       </td>
                                                   </tr>
                                               </table>
                                           </td>
                                           <td class="block-td" align="center" style="padding-left: 20px;">
                                               <table cellpadding="0" cellspacing="0" class="block-table" align="center" width="280">
                                                   <tr>
                                                       <td align="center">
                                                           <p>
                                                               Ну и сюда можно
                                                           </p>
                                                       </td>
                                                   </tr>
                                               </table>
                                           </td>
                                       </tr>
                                   </table>
                               </td>
                           </tr>
                           <tr>
                               <td class="footer-td" bgcolor="#38404b">
                                   <table class="table-600" cellpadding="0" cellspacing="0" width="600" align="center">
                                       <tr>
                                           <td class="footer-logo" align="center">
                                               <a href="##" style="color:#bcc9dd;">AiW</a>
                                           </td>
                                       </tr>
                                       <tr>
                                           <td class="footer-menu-td" align="center">
                                               <table cellpadding="0" cellspacing="0" width="350" align="center">
                                                   <tr>
                                                       <td align="center"><a href="##">О нас</a></td>
                                                       <td align="center"><a href="##">Команда</a></td>
                                                       <td align="center"><a href="##">Новости</a></td>
                                                       <td align="center"><a href="##">Контакты</a></td>
                                                   </tr>
                                               </table>
                                           </td>
                                       </tr>
                                       <tr>
                                           <td class="copyright-td" align="center">
                                               © 2021 Alice in wonderland
                                               <br />
                                               All Rights Reserved
                                           </td>
                                       </tr>
                                   </table>
                               </td>
                           </tr>
                           <tr>
                               <td height="30" width="850"></td>
                           </tr>
                       </table>
                   </td>
               </tr>
           </table>
       </body>
       
       </html>
           `
       },
       (err,data) => {
           if(err){
               console.error('Ошибка при отправке', err)
           }else{
               res.status(200).send({
                   message:'Письмо отправлено'
               })
           }
       }
       )
   })
})

module.exports = router