'use strict'

const router = require('express').Router()
const db = require('APP/db')

// models we need
const Order = db.model('orders')
const Product = db.model('products')
const ProductOrdered = db.model('productsOrdered')
const User = db.model('users')

router.post('/:productId/:userId', (req, res, next) => {
  // only for logged-in users for now
  Order.findOrCreate({
    where: {
      status: 'cart',
      user_id: req.params.userId
    }
  })
    .then(createdOrUpdatedOrder => {
      Order.findOne({
        where: {
          status: 'cart',
          user_id: req.params.userId
        }
      })
        .then(order => {
          Product.findById(req.params.productId)
            .then(product => {
              ProductOrdered.create({
                price: Number(product.price.slice(1))*100,
                product_id: product.id,
                order_id: order.id
              })
                res.json(product) 
            })
          })
      }).catch(next)
})

module.exports = router

// we tried using redux-persist to persist the cart, but it doesn't qualify the persistence based on who's logged in, etc
// each time we create a cart (aka add a product to it), we create a new Order instance (with default status of 'cart')
// THEN (order_id needs to exist), add the product to the productsOrdered table (aka, create a new productsOrdered instance)
// (when checking out, we will have to update the price of the product in the productsOrdered table)
