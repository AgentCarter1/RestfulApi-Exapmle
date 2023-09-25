const jwt = require("jsonwebtoken");

const createToken = (user) => {
    const secretKey = "mysecretkey";

    // Access Token ve Refresh Token süreleri (örnek olarak)
    const accessTokenExpireTime = "15m"; // 15 dakika
    const refreshTokenExpireTime = "7d";  // 7 gün

    const accessToken = jwt.sign({ userId: user }, secretKey, {
        expiresIn: accessTokenExpireTime,
    });

      // Refresh Token oluştur
      const refreshToken = jwt.sign({ userId: user }, secretKey, {
        expiresIn: refreshTokenExpireTime,
    });
    return [accessToken,refreshToken];
}


module.exports = {
    createToken
}