const jwt = require('jsonwebtoken')

module.exports = {
   verifyToken: (req, res, next) => {
      const authHeader = req.headers.token
      if (authHeader) {
         const token = authHeader.split(' ')[1]
         jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) res.status(403).json('Token is not valid.')
            req.user = user
            next()
         })
      } else {
         res.status(401).json('You are not authenticated.')
      }
   },
   verifyTokenAndAuth: (req, res, next) => {
      module.exports.verifyToken(req, res, () => {
         if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
         } else {
            res.status(403).json('You are not authorized to do this.')
         }
      })
   }, verifyTokenAndAdmin: (req, res, next) => {
      module.exports.verifyToken(req, res, () => {
         if (req.user.isAdmin) {
            next()
         } else {
            res.status(403).json('You are not authorized to do this.')
         }
      })
   }
}