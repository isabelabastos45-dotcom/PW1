const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(
            'https://ron-swanson-quotes.herokuapp.com/v2/quotes'
        );
        const quote = response.data[0];
        res.render('index', { quote });
    } catch (error) {
        console.error(error);
        res.render('index', {
            quote: 'Erro ao obter mensagem.'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});