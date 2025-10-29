const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const publicRoutes = require('./routes/publicRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { requestLogger } = require('./middlewares/requestLogger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(session({
  secret: 'biblioteca-virtual-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(requestLogger);

// static frontend
app.use('/', express.static(path.join(__dirname, 'public')));

// api routes
app.use('/api', authRoutes);
app.use('/api', publicRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

// fallback 404
app.use((req, res) => {
  res.status(404).json({ error: 'Não encontrado' });
});

app.listen(PORT, () => {
  console.log('Servidor rodando em http://localhost:' + PORT);
});
