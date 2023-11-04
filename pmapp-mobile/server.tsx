import express, { Request, Response } from 'express';

import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';

// .envの読み込み
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection(atob(process.env.DATABASE_URL!));

// アカウント必要区分を判断する
app.get('/application/app=:app', (req: Request, res: Response) => {
    const app = req.params.app;
    const sql: string = "select accountClas from application where name = ?";
    db.query(sql, [app], (err: Error | null, result: any) => {
        if (err) {
            console.log(err);
            res.status(500).send(result);
        } else {
            res.status(200).json(result);
        }
    });
});

// アカウントのサジェスト
app.get('/account/app=:app', (req: Request, res: Response) => {
    const app = req.params.app;
    const sql: string = "SELECT distinct other_info FROM uptodatepassword WHERE app = ?";
    db.query(sql, [app], (err: Error | null, result: any) => {
        if (err) {
            console.log(err);
            res.status(500).send(result);
        } else {
            res.status(200).json(result);
        }
    });
});

// パスワード取得
// アカウント必要区分「あり」の場合
app.get('/pwd/app=:app&account=:account', (req: Request, res: Response) => {
    const app = req.params.app;
    const account = req.params.account;
    const sql: string = "SELECT pwd from password where no = (select no from uptodatepassword WHERE app = ? AND other_info = ?)";
    db.query(sql, [app, account], (err: Error | null, result: any) => {
        if (err) {
            console.log(err);
            res.status(500).send(result);
        } else {
            res.status(200).json(result);
        }
    });
});

// アカウント必要区分「なし」の場合
app.get('/pwd/app=:app', (req: Request, res: Response) => {
    const app = req.params.app;
    const sql: string = "select pwd from password where no = (select no from uptodatepassword where app=?)";
    db.query(sql, [app], (err: Error | null, result: any) => {
        if (err) {
            console.log(err);
            res.status(500).send(result);
        } else {
            res.status(200).json(result);
        }
    });
});

// サーバー起動
app.listen(3000, () => {
    console.log('running on port 3000');
});

export default app;