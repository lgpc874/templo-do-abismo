
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'abismo-selado',
  resave: false,
  saveUninitialized: true
}));

const auth = (req, res, next) => {
  if (req.session.user) next();
  else res.redirect('/login');
};

app.get('/', (req, res) => res.render('index'));
app.get('/portal', (req, res) => res.render('portal'));
app.get('/oraculo', (req, res) => res.render('oraculo'));
app.get('/cursos', (req, res) => res.render('cursos'));
app.get('/painel', auth, (req, res) => res.render('painel'));
app.get('/loja', (req, res) => res.render('loja'));
app.get('/bibliotheca', (req, res) => res.render('bibliotheca'));
app.get('/liber', (req, res) => res.render('liber'));
app.get('/admin', auth, (req, res) => res.render('admin'));
app.get('/login', (req, res) => res.render('login'));
app.post('/login', (req, res) => {
  const { user, pass } = req.body;
  if (user === 'iniciado' && pass === 'abismo123') {
    req.session.user = user;
    res.redirect('/painel');
  } else {
    res.render('login', { error: true });
  }
});
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
