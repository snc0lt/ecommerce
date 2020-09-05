const { Router } = require('express')
// import all routers;
const productRouter = require('./product.js')
const categoryRouter = require('./category.js')
const testRouter = require('./test.js')
const userRouter = require('./user.js')
const imageRouter = require('./image.js')
const orderRouter = require('./order.js')
const adminRouter = require('./admin.js')
const userAdminRouter = require("./userAdmin")
const uploadRouter = require("./upload.js")


const router = Router()

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/products', productRouter)
router.use('/category', categoryRouter)
router.use('/user', userRouter)
router.use('/test', testRouter)
router.use('/image', imageRouter)
router.use('/orders', orderRouter)
router.use('/admin', adminRouter)
router.use("/userAdmin", userAdminRouter)
router.use("/upload",uploadRouter)



module.exports = router
