const jwt = require("jsonwebtoken");
const db = require("../models"); // Veritabanı bağlantısı için modülleri içe aktarır
const User = db.user; // Kullanıcı modelini alır
const Op = db.Sequelize.Op; // Sequelize operatörlerini içe aktarır
const createJwt = require("../utils/jwtToken")
const bcrypt = require("bcrypt");
const saltRounds = 10;
const userRedis = require("../utils/userRedis")
// Yeni bir kullanıcı oluşturmak için POST isteği
exports.create = (req, res) => {
  // İsteği doğrulama, eğer gerekli alanlar eksikse hata döner
  if (!req.body.firstName || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Parolayı hashleme
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      res.status(500).send({
        message: "Password hashing failed."
      });
      return;
    }

    // Kullanıcı nesnesi oluşturma
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email ? req.body.email : "bos",
      password: hash, // Hashlenmiş parolayı kaydet
    };

    // Kullanıcıyı veritabanına kaydetme
    User.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        // Hata durumunda uygun yanıtı gönderme
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });
  });
};

// Tüm kullanıcıları getirmek için GET isteği
exports.getAll = (req, res) => {
  console.log("GELDİ");
  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Belirli bir kullanıcının bilgilerini getirmek için GET isteği
exports.getById = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(user => {
      if (!user) {
        res.status(404).send({ message: "User not found" });
      } else {
        res.send(user);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

// Belirli bir kullanıcının bilgilerini güncellemek için PUT isteği
exports.updateById = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(user => {
      if (!user) {
        res.status(404).send({ message: "User not found" });
      } else {
        const updatedUser = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          userName: req.body.userName,  
          email: req.body.email ? req.body.email : "bos",
          password: req.body.email ? req.body.email : "bos",
        };

        user.update(updatedUser)
          .then(() => {
            res.send({ message: "User was updated successfully." });
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating User with id=" + id
            });
          });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

// Belirli bir kullanıcıyı silmek için DELETE isteği
exports.deleteById = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(user => {
      if (!user) {
        res.status(404).send({ message: "User not found" });
      } else {
        user.destroy()
          .then(() => {
            res.send({ message: "User was deleted successfully." });
          })
          .catch(err => {
            res.status(500).send({
              message: "Error deleting User with id=" + id
            });
          });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

// Tüm kullanıcıları silmek için DELETE isteği
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {}, // Tüm kullanıcıları silmek için boş bir koşul
    truncate: false // Veritabanının tamamen sıfırlanmamasını sağlar
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully.` });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error deleting all Users: " + err.message
      });
    });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Veritabanından kullanıcıyı bul
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Kullanıcı adı veya şifre yanlış" });
    }

    // Parolayı karşılaştır
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Kullanıcı adı veya şifre yanlış" });
    }

    const [accessToken, refreshToken] = createJwt.createToken(user.id);
    // Kullanıcı doğrulandı, JWT oluştur

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

// Logout işlemi
exports.logout = async (req, res) => {
  const { email } = req.body;
  const token = req.header("Authorization");
  try {
    // Redis'te oturumu siyah listeye ekle
    await userRedis.blacklistSession(email, token);

    // Başarılı yanıt gönder
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Hata:', error);
  }
};





