const userRouter = require("./app/routes/userRouter")
const adminRouter = require("./app/routes/adminRouter")
const express = require("express");

const app = express();

app.use(express.json()); // JSON verilerini işlemek için body-parser kullanılıyor

app.use(express.urlencoded({ extended: true })); // URL kodunu çözmek için body-parser kullanılıyor

const db = require("./app/models"); // Veritabanı modelini içe aktarır
const PORT = process.env.PORT || 8080; // Port numarasını ayarlar (varsayılan olarak 8080)


// Veritabanı ile bağlantıyı kurar ve sunucuyu dinlemeye başlar
db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log("Failed To Connect Server: " + err.message);
  });



app.use("/user",userRouter)
//require("./app/routes/userRoutes")(app);
