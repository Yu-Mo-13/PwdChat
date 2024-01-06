import express from 'express';

const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'build')));

// 静的ファイルのルーティング
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build/index.html'));
});

// サーバー起動
app.listen(port, () => {
    console.log(`running on port ${port}`);
});
