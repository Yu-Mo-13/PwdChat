import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'build')));

// 静的ファイルのルーティング
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build'));
    console.log(req);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build/index.html'));
    console.log(req);
});

// サーバー起動
app.listen(port, () => {
    console.log(`running on port ${port}`);
});
