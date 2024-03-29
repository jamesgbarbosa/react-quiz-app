import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json());

// Some cors config
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/questions', async (req, res) => {
    const fileContent = await fs.readFile('./data/quizItems.json');

    const questions = JSON.parse(fileContent);
    setTimeout(() => {
        res.status(200).json({ questions: questions });
    }, 1000)
});

app.listen(3000, 'localhost', () => {
    console.log("Server running in port: ", 3000)
})

