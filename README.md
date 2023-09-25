# Hazırlık Aşaması #

1-) Projemizi Bilgisayarımıza indirdikten sonra, klasör içerisinde terminali açıyoruz.
2-) Sırasıyla aşağıdaki komutları çalıştırıyoruz :
        -> npm install bcrypt
        -> npm install pg
        -> npm install pg-hstore
        -> npm install sequelize

3-) Bir veritabanına da ihtiyacımız olduğu için, bunu Docker ile çözeceğiz.
4-) Docker Desktop uygulamasını bilgisayarımıza kurduktan sonra terminal ekranın açıp aşağıdaki komutu çalıştırıyoruz:
        -> docker run --name mypostgre -e POSTGRES_PASSWORD=admin -p 5432:5432 -d --rm postgres
5-) Redis için:
        -> docker -p 6379:6379 redis
6-) ardından dozya dizinin içerisinde konsola gelip aşağıdaki kodla projemizi çalıştırıyoruz :
        -> npm start

