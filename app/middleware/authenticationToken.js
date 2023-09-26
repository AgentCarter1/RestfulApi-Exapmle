const jwt = require("jsonwebtoken");
const userRedis = require("../utils/userRedis")
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  //console.log(token);
  const secretKey = "j^5&X9t#Rz@p$2sL";
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }
  //console.log("GELDİ");
  jwt.verify(token, secretKey, async (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }else{
      const email = req.body.email;
      const boolean = await userRedis.isSessionBlacklisted(email,token)
      console.log(boolean);
      if(boolean){
        return res.status(403).json({ message: "Token is not using" });
      }else{
        next();
      }
      
    }
  })
};

const logout = async (req, res, next) => {
  const token = req.header("Authorization");
  //console.log(token);
  const secretKey = "mysecretkey";
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    else{
      next();
    }
  })
/* 
  const email = req.body.email;

  // Oturumun siyah listede olup olmadığını kontrol et
  const isBlacklisted = await userRedis.isSessionBlacklisted(email, token);
  //console.log(isBlacklisted);
  if (isBlacklisted) {
    return res.status(403).json({ message: "Token is blacklisted" });
  } else {
    next();
  }*/
};

module.exports = {
  authenticateToken,
  logout
  
}