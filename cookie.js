const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

const secretKey = 'your-secret-key';
const accessTokenSecret = 'access-secret-key';
const refreshTokenSecret = 'refresh-secret-key';

const users = [
  {
    id: 1,
    username: 'kullanici1',
    password: 'parola1',
    role: 'user',
  },
  {
    id: 2,
    username: 'kullanici2',
    password: 'parola2',
    role: 'admin',
  },
];

const accessTokens = {};
const refreshTokens = {};

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    res.status(401).json({ message: 'Giriş başarısız.' });
    return;
  }

  const accessToken = jwt.sign({ userId: user.id, username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId: user.id, username: user.username, role: user.role }, refreshTokenSecret, { expiresIn: '7d' });

  accessTokens[username] = accessToken;
  refreshTokens[username] = refreshToken;

  res.cookie('refreshToken', refreshToken, { httpOnly: true });
  res.cookie('accessToken', accessToken, { httpOnly: true });
  res.json({ message: 'Giriş başarılı.', accessToken });
});

app.post('/refresh', (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Yenileme tokeni bulunamadı.' });
  }

  jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Yenileme tokeni geçersiz.' });
    }

    const accessToken = jwt.sign({ userId: user.userId, username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '15m' });
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.json({ accessToken });
  });
});

app.post('/logout', (req, res) => {
  res.clearCookie('refreshToken');
  res.clearCookie('accessToken');
  res.json({ message: 'Çıkış başarılı.' });
  // Access token ve refresh token'ı iptal etmek için accessTokens ve refreshTokens nesnelerinden kaldırabilirsiniz.
});

app.get('/profile', (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    res.status(401).json({ message: 'Oturum açılmamış.' });
    return;
  }

  jwt.verify(token, accessTokenSecret, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Geçersiz oturum.' });
    } else {
      res.json(decoded);
    }
  });
});

app.get('/adminpanel', (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    res.status(401).json({ message: 'Oturum açılmamış.' });
    return;
  }

  jwt.verify(token, accessTokenSecret, (err, decoded) => {
    if (err || decoded.role !== 'admin') {
      res.status(401).json({ message: 'Geçersiz oturum veya yetkisiz erişim.' });
    } else {
      res.json(decoded);
    }
  });
});

app.listen(3000, () => {
  console.log('Uygulama 3000 portunda çalışıyor.');
});
