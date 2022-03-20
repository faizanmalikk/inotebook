const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
const User = require('../models/User')
var jwt = require('jsonwebtoken');
const jwt_secret = "thisissecret@1"
const fetchuser = require('../middleware/fetchuser')

//Route 1: createUser on post /api/auth/createuser .no login required

router.post('/createuser',[
    body('name','Please enter more then three characters').isLength({ min: 3 }),
    body('email','Please enter a valid email address').isEmail(),
    body('password','Please enter a password more then five characters').isLength({ min: 5 }),

], async (req,res)=>{
    const errors = validationResult(req);
    // If any feild is empty
    let success = false;
     if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // If there exists a same email address

      let user = await User.findOne({email : req.body.email})
      if(user){
          return res.status(400).json({success,error: "This email already exits"})
      }
      var salt =  bcrypt.genSaltSync(10);
      var hashpass =  bcrypt.hashSync(req.body.password, salt);

   user =   await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashpass,
      })
    const data ={
        user : {
            id : user.id
        }
    } 
     let authtoken = jwt.sign(data,jwt_secret)
    success = true
      res.json({authtoken,success})
  
} catch (error) {
        console.error(error)
        res.status(500).json({error:"Interval error occured"})
}
})

//Route 2: Authenticate on  post /api/auth/login .no login required

router.post('/login',[
        body('email','Please enter a valid email address').isEmail(),
    body('password','Please enter a valid password').exists(),

], async (req,res)=>{
    let success = false;
    const errors = validationResult(req);
    // If any feild is empty

     if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array() });
    }
try {
 const {email,password} = req.body;
   let user = await User.findOne({email});
    if(!user){
        return res.status(400).json({success,error: "Please enter the correct cardentials"})
    }
    //Compare passwords

const comparepassword = await bcrypt.compare(password, user.password)
if(!comparepassword){
    return res.status(500).send({success, errors: "Please enter the correct cardentials"});

}
const data ={
    user : {
        id : user.id
    }
} 
success = true
 let authtoken = jwt.sign(data,jwt_secret)
  res.json({authtoken,success})

} catch (error) {
    console.error(error)
    res.status(400).send({error:"Interval error occured"})
}
})

//Route 3: Get user data on  post /api/auth/userdata .Login required

router.post('/userdata', fetchuser , async (req,res)=>{
try {
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password")
    res.send(user)

} catch (error) {
    res.status(400).send({error:"Interval error occured"})
}


})
module.exports = router