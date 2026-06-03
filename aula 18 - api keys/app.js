require('dotenv').config();

const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/search', async (req, res) => {
    const astro = req.body.astro.toLowerCase();
    try {
        const response = await axios.get(
            `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&count=50`
        );
        const images = response.data.filter(img =>
            img.media_type === 'image' &&
            !img.copyright &&
            img.title.toLowerCase().includes(astro)
        );
        console.log("Astro:", astro);
        console.log("Quantidade encontrada:", images.length);
        
        res.render('result', {
            images,
            astro
        });
    } catch (err) {
        console.error(err.message);
        res.send('Erro NASA');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});