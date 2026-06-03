const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: true }));

app.get('/v1/hi', (req, res) => {
    const out = {
        msg: "Hello, World!"
    };

    res.status(200).json(out);
});

app.get('/v1/hi/user/:name', (req, res) => {
    const out = {
        msg: "Hello, " + req.params.name
    };

    res.status(200).json(out);
});

app.post('/v1/hi', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            error: "Name is required"
        });
    }

    const out = {
        msg: `Hello, ${name.toUpperCase()} from POST!`
    };

    res.status(200).json(out);
});

app.all(/.*/, (req, res) => {
    res.status(404).json({
        error: "Invalid endpoint"
    });
});

app.listen(PORT, () => {
    console.log(`Hello API on port ${PORT}`);
});