const Product = require('../models/Product')

module.exports = {
   getProduct: async (req, res) => {
      try {
         const product = await Product.findById(req.params.id)
         res.status(200).json(product)
      }
      catch (err) {
         res.status(500).json(err)
      }
   },
   getAllProducts: async (req, res) => {
      const qNew = req.query.new
      const qCategory = req.query.category
      try {
         let products

         if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(5)
         } else if (qCategory) {
            products = await Product.find({
               category: {
                  $in: [qCategory]
               }
            })
         } else {
            products = await Product.find()
         }

         res.status(200).json(products)
      }
      catch (err) {
         res.status(500).json(err)
      }
   },
   searchProduct: async (req, res) => {
      const product = req.params.id
      const notFound = { msg: 'We\'re sorry, no results for' }
      try {
         // Product.collection.createIndex({ title: "text", category: "text" })
         const search = await Product.find({ $text: { $search: product } })
         if (search.length >= 1) res.status(200).json(search)
         else res.status(200).json(notFound)
      }
      catch (err) {
         res.status(500).json(err)
      }
   },
   newProduct: async (req, res) => {
      const newProduct = new Product(req.body)

      try {
         const savedProduct = await newProduct.save()
         res.status(200).json(savedProduct)
      }
      catch (err) {
         res.status(500).json(err)
      }
   },
   updateProduct: async (req, res) => {
      try {
         const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, {
            $set: req.body
         },
            { new: true }
         )
         res.status(200).json(updatedProduct)
      }
      catch (err) {
         res.status(500).json(err)
      }
   },
   deleteProduct: async (req, res) => {
      try {
         await Product.findByIdAndDelete(req.params.id)
         res.status(200).json('Product deleted')
      }
      catch (err) {
         res.status(500).json(err)
      }
   }
}