const express = require("express");
const authenticateMiddleware = require("../middleware/authenticationToken")
const userController = require("../controllers/userController");
const { user } = require("../models");
const userRouter = express.Router()



// Yeni bir kullanıcı oluşturmak için POST isteği
userRouter.post("/", userController.create);

// Belirli bir kullanıcının bilgilerini almak için GET isteği
userRouter.get("/:id",[authenticateMiddleware.authenticateToken], userController.getById);

// Belirli bir kullanıcının bilgilerini güncellemek için PUT isteği
userRouter.put("/:id",[authenticateMiddleware.authenticateToken], userController.updateById);

// Belirli bir kullanıcıyı silmek için DELETE isteği
userRouter.delete("/:id",[authenticateMiddleware.authenticateToken], userController.deleteById);

// Tüm kullanıcıları silmek için DELETE isteği
userRouter.delete("/",[authenticateMiddleware.authenticateToken], userController.deleteAll);

// Tüm kullanıcıları almak için GET isteği
userRouter.get("/", [authenticateMiddleware.authenticateToken],userController.getAll);

userRouter.post("/logout",[authenticateMiddleware.authenticateToken], userController.logout);

userRouter.post("/login",userController.login)



module.exports = userRouter;