const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const API_URL = 'http://localhost:8000';

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/who', async (req, res) => {
    const username = req.body.username;
    try {
        const response = await axios.post(
            `${API_URL}/v1/hi`,
            `name=${username}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        res.render('message', {
            msg: response.data.msg
        });

    } catch (err) {
        console.error(err.message);
        res.send('Erro ao acessar API.');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});