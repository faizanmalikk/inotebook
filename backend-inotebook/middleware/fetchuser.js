var jwt = require('jsonwebtoken');
const jwt_secret = "thisissecret@1"

const fetchuser = (req, res , next)=>{
//Get the user from the jwt token and add id to the req object
const token = req.header("auth-token")
if(!token){
    return res.status(401).json({error : "Please authenticate using a valid token"});
}
try {
    const data = jwt.verify(token,jwt_secret);
    req.user = data.user;
    next();

} catch (error) {
    return res.status(401).json({error : "Please authenticate using a valid token"});

}

}
module.exports = fetchuser;