const express = require('express')
const router = express.Router()
const authMiddleware = require("../middleware/auth")


router.get("/profile", authMiddleware , (req,res)=>{
     res.status(200).json({
    message: 'Welcome to protected route!',
    userId: req.userId
  })
})

module.exports = router