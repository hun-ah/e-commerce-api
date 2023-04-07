const User = require('../models/User')
const CryptoJS = require('crypto-js')

module.exports = {
   registerUser: async (req, res) => {
      const { fName, lName, email, password, newsletter } = req.body

      const newUser = new User({
         fName,
         lName,
         email,
         password: CryptoJS.AES.encrypt(password, process.env.PASS_SECRET).toString(),
         newsletter
      })
      try {
         const savedUser = await newUser.save()
         res.status(200).json(savedUser)
      }
      catch (err) {
         res.status(500).json(err)
      }
   }
}