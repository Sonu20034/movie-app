const express = require("express")
const router =  express.Router()
const User = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.post('/signup',async(req , res)=>{
    try { 
        const{username,email,password} = req.body 
        
        
        const existingUser = await User.findOne({email : email})
        

        if(existingUser){
            return res.status(400).json({message:"user already exists!"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        

        const newUser = new User({
            username : username,
            email : email,
            password : hashedPassword
        })

        await newUser.save()
       
        

        res.status(201).json({
            message: 'user created successfully!',
            user:{
               id : newUser._id,
               username:newUser.username,
               email:newUser.email
            }
        })




    } catch (error){
        res.status(500).json({message:'server error',error: error.message})
    }

})

router.post('/login', async (req,res)=>{
    try{
        const{email,password} =  req.body
        

        const user = await User.findOne({email:email})

        if(!user){
            return res.status(400).json({message:"Invalid email or password!"})
        }
   
       const isMatch = await bcrypt.compare(password,user.password)

       if(!isMatch){
           return res.status(400).json({ message: 'Invalid email or password!' })
       }
 

       const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:'7d'}
       )

     res.status(200).json({
        message:"Login successfully ",
        token:token,
        user:{
            id: user._id,
        username: user.username,
        email: user.email
        }
     })

    } catch (error) {
    res.status(500).json({ message: 'server error', error: error.message })
  }
})




module.exports=router