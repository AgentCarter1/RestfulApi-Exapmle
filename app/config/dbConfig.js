module.exports = {
  HOST: "0.0.0.0",  // Veritabanı sunucusunun IP adresi veya alan adı
  port: '5432',      // PostgreSQL veritabanı bağlantı noktası
  USER: "postgres",  // PostgreSQL kullanıcı adı
  PASSWORD: "admin", // PostgreSQL şifresi
  DB: "postgres",        // Kullanılacak veritabanının adı
  dialect: "postgres", // Kullanılan veritabanı türü (PostgreSQL)
  pool: {
    max: 5,           // Maksimum eş zamanlı bağlantı sayısı
    min: 0,           // Minimum eş zamanlı bağlantı sayısı
    acquire: 30000,   // Bağlantı elde etme (get) süresi (milisaniye cinsinden)
    idle: 10000       // Bağlantı boşta kalma süresi (milisaniye cinsinden)
  }
};
