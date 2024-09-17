# ecomeru
ecomeru は、膨大なECサイトのレビューをAI技術を用いて要約し、ユーザーが商品購入の意思決定を迅速かつ効率的に行えるようにサポートするサービスです。
ecomeruは「Ecommerce」と「まとめる」を組み合わせた造語です。

トップページ
![home](https://github.com/user-attachments/assets/9bfd8a31-431d-4b39-89f1-5f8fae3eea90)

## 実装機能
- ユーザー利用機能
  - Discordアカウントを利用したユーザー登録(OAuth2)
  - Rakuten APIを利用した商品検索
  - OpenAI APIを使ったレビューの分析・要約
  - レスポンシブ対応
- 非ユーザー利用機能

## 工夫した点
- 外部API処理を、RedisとSidekiqを使って非同期化
- Dockerを採用し、環境構築の手間を削減
- カルーセルを使用し、商品画像を並べて表示

## 使用した技術
- フロントエンド
  - HTML/CSS
  - JavaScript
  - TypeScript
  - Next.js (App Router)
  - ESLint/Prettier（コード解析ツール）
- バックエンド
  - Ruby
  - Rails（APIモード）
  - Sidekiq
  - Redis
- インフラ・開発環境
  - Docker/Docker-compose
  - AWS
  - nginx
