const bcrypt = require("bcrypt");
// Sequelize ve Sequelize tipini içe aktararak kullanılabilir hale getirir.
module.exports = (sequelize, Sequelize) => {
  // "User" adında bir model tanımlanır.
  const Admin = sequelize.define("admin", {
    // "id" adında bir sütun eklenir, INTEGER veri tipi, otomatik artırma ve birincil anahtar olarak ayarlanmıştır.
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // "firstName" adında bir sütun eklenir, STRING veri tipi.
    firstName: {
      type: Sequelize.STRING
    },
    // "lastName" adında bir sütun eklenir, STRING veri tipi.
    lastName: {
      type: Sequelize.STRING
    },
    email: Sequelize.STRING,
    password: Sequelize.STRING,
  },
  
  );

  // Oluşturulan model nesnesi ("Admin") döndürülür.
  return Admin;
};


