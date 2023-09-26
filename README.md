# Hazırlık Aşaması

Bu README dosyası, projenizi başlatmadan önce yapmanız gereken hazırlık adımlarını içerir.

## Adım 1: Proje İndirme

1. Projeyi bilgisayarınıza indirin.
2. Klasör içinde bir terminal açın.

## Adım 2: Bağımlılıkları Yükleme

Proje bağımlılıklarını yüklemek için aşağıdaki komutları sırayla çalıştırın:

```bash

npm install bcrypt
npm install pg
npm install pg-hstore
npm install sequelize
npm install express
npm install ioredis
npm install jsonwebtoken
npm install nodemon
npm install dotenv

```

## Adım 3: Veritabanı Oluşturma

1. Veritabanını Docker kullanarak bunu hızlıca oluşturuyoruz.

2. Bilgisayarınıza Docker Desktop uygulamasını kurun.
3. Terminali açın ve aşağıdaki komutu çalıştırın:

# PostgreSQL:
```bash
docker run --name mypostgres -e POSTGRES_PASSWORD=admin -p 5432:5432 -d --rm postgres
```
# Redis:
```bash
docker run -p 6379:6379 redis
```

## Adım 4: Projeyi Çalıştırma

1. Projenizi çalıştırmak için aşağıdaki adımları izleyin:

2. Proje klasörünün içine gidin.

3. Dosya dizinin içerisine gelip Terminali açın.

# Aşağıdaki komutu çalıştırın:

```bash
npm start
```
