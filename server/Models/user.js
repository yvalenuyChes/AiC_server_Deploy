const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
   name:String,
   
   email:String,

   password: String,

   tickets:[{
      name: String,
      personNumber: Number,
      dateFrom: Date,
      dateCome:Date,
      price: Number
   }], 

   photo: {
      data: Buffer,
      contentType: String
   },

   confirmed: Boolean,

   checkNumber: Number,

   resetPasswordCode: Number,

   creditCards: [{
      cardNumber: Number,
      holderName: String,
      expireDate: String,
      bankName: String,
      brand: String
   }]
}, 
{ timestamp: true },
)

module.exports = model('User', UserSchema)