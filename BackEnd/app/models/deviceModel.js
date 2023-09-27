const bcrypt = require("bcrypt");
// Sequelize ve Sequelize tipini içe aktararak kullanılabilir hale getirir.
module.exports = (sequelize, Sequelize) => {
  // "User" adında bir model tanımlanır.
  const Device = sequelize.define("device", {
    // "id" adında bir sütun eklenir, INTEGER veri tipi, otomatik artırma ve birincil anahtar olarak ayarlanmıştır.
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // "devicetName" adında bir sütun eklenir, STRING veri tipi.
    deviceName: {
      type: Sequelize.STRING
    },
    // "isRun" adında bir sütun eklenir, BOOLEAN veri tipi ve varsayılan değeri false olarak ayarlanmıştır.
    isRun: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
  },
  {
    timestamps: false // Bu satırı ekleyerek createdAt ve updatedAt sütunlarını devre dışı bırakabilirsiniz
  }
  );

  // Oluşturulan model nesnesi ("Device") döndürülür.
  return Device;
};

