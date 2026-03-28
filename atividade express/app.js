const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
    console.log(`A página ${req.path} foi acessada`);
    next();
});

app.get('/about', (req, res) => {
    res.send('Página: /about');
});

app.post('/data', (req, res) => {
    res.send('Página: /data');
});



app.get('/signup', (req, res) => {
    res.send('Página: /signup');
});

app.get('/users', (req, res) => {
    res.redirect('/signup');
});

app.get('/users/:userid', (req, res) => {
    const userid = req.params.userid;
    res.send(`Bem-vindo à página, usuário ${userid}`);
});



app.use((req, res) => {
    res.status(404).send('Página não encontrada - 404 Not Found. Para voltar, clique <a href="/about">Voltar</a>');
});

app.listen(port, () => {
    console.log('Server running...')
})