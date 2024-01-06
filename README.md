# PMAPP Mobile
パスワード管理システム(モバイルver)
使用技術
フロントエンド：React
バックエンド：Python(FastAPI)(別リポジトリ)
2023/11/26 0.0.0 MVP
2024/1/6 1.0.0 リリース
・ログイン
・アプリ読込
・パスワード検索

# 本番デプロイ手順(Heroku)
1. フロントエンドをViteを使ってビルド
   - npm run build
   - npm run preview (動作確認 -> npm run previewで動作に問題がなければ、基本的に本番動作に問題はないはず)
   - 基本的にnpm run buildを実行したときに、build直下にモジュールがビルドされるので、それも含めて各featureブランチにプッシュ
2. プルリクエスト・マージ後に(Local Repo)mainブランチに切り替えてプル
3. git push heroku mainでHerokuにて自動デプロイ
4. Herokuにて[Open App]して動作確認
