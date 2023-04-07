const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
   {
      fName: {
         type: String,
         required: true,
      },
      lName: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
         unique: true
      },
      password: {
         type: String,
         unique: true
      },
      newsletter: {
         type: Boolean,
      },
      isAdmin: {
         type: Boolean,
         default: false,
      },
   },
   {
      timestamps: true
   }
)

module.exports = mongoose.model('User', UserSchema)