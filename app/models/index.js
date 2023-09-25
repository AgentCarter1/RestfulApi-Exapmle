// Veritabanı bağlantı ayarlarını içe aktar
const dbConfig = require("../config/dbConfig");

// Sequelize modülünü içe aktar
const Sequelize = require("sequelize");

// Sequelize ile PostgreSQL veritabanı bağlantısı oluştur
const sequelize = new Sequelize(
  dbConfig.DB,         // Veritabanı adı
  dbConfig.USER,       // Veritabanı kullanıcı adı
  dbConfig.PASSWORD,   // Veritabanı şifresi
  {
    host: dbConfig.HOST,    // Veritabanı sunucusu adresi
    dialect: dbConfig.dialect, // Veritabanı türü (PostgreSQL)
    
    // Bağlantı havuzu ayarları
    pool: {
      max: dbConfig.pool.max,       // Maksimum eş zamanlı bağlantı sayısı
      min: dbConfig.pool.min,       // Minimum eş zamanlı bağlantı sayısı
      acquire: dbConfig.pool.acquire, // Bağlantı elde etme (get) süresi (milisaniye cinsinden)
      idle: dbConfig.pool.idle      // Bağlantı boşta kalma süresi (milisaniye cinsinden)
    }
  }
);

// Boş bir nesne oluştur, bu nesne veritabanı modellerini temsil edecek
const db = {};

// Sequelize ve sequelize nesnelerini db nesnesine ekle
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// userMode.js dosyasını içe aktar ve modeli oluştur
db.admin = require("./adminModel")(sequelize, Sequelize);
db.user = require("./userModel")(sequelize, Sequelize);
db.device = require("./deviceModel")(sequelize, Sequelize);

db.admin.hasMany(db.device, {
  foreignKey: "adminId"
});

db.user.hasMany(db.device, {
  foreignKey: "userId"
});

db.device.belongsTo(db.admin, {
  foreignKey: "adminId"
});

db.device.belongsTo(db.admin, {
  foreignKey: "userId"
});

// db nesnesini dışa aktar 
module.exports = db;
