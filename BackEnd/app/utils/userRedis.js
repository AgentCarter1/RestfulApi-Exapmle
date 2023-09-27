const { response } = require('express');
const Redis = require('ioredis');

const redis = new Redis({
  host: 'localhost', // Redis sunucusu adresi
  port: 6379,        // Redis bağlantı noktası
});

// Oturumu siyah listeye ekleme
async function blacklistSession(email, token) {
  await redis.set(email, token);
}

// Oturumu siyah listede kontrol etmek için fonksiyon
async function isSessionBlacklisted(email, token) {
  const blacklistedToken = await redis.get(email,(error,data)=>{
    if(error){
      res.status(401).json({ message: error });
    }else{
      return data;
    }
  });
  //console.log("BlackList Token : "+blacklistedToken+"\n");
  //console.log("Token : "+token)
  if( blacklistedToken === token ){
    return true
  }else {
    return false
  }
}


module.exports = {
    blacklistSession,
    isSessionBlacklisted,
}