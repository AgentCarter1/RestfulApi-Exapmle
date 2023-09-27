const bcrypt = require("bcrypt");
// Sequelize ve Sequelize tipini içe aktararak kullanılabilir hale getirir.
module.exports = (sequelize, Sequelize) => {
  // "User" adında bir model tanımlanır.
  const User = sequelize.define("user", {
    // "id" adında bir sütun eklenir, INTEGER veri tipi, otomatik artırma ve birincil anahtar olarak ayarlanmıştır.
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userName: {
      type: Sequelize.STRING
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
  {
    timestamps: false 
  },
  );
  // Oluşturulan model nesnesi ("User") döndürülür.
  return User;
};

