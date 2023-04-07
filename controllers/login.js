const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

module.exports = {
   loginUser: async (req, res) => {
      try {
         const user = await User.findOne({ email: req.body.email })

         if (!user) res.json('Email does not exist')

         const hashedPassword = CryptoJS.AES.decrypt(
            user.password, process.env.PASS_SECRET
         )

         const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

         const inputPassword = req.body.password

         if (originalPassword !== inputPassword) res.json('Incorrect password')

         const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
         },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
         )
         if (user && originalPassword == inputPassword) res.status(200).json({ user, accessToken })
      }
      catch (err) {
         res.status(500).json(err)
      }
   }
}