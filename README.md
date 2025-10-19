# Pong Game - React/Next.js + TypeScript

React、Next.js、TypeScriptを使用したクラシックなピンポンゲームの実装です。

## 機能

- **プレイヤー操作**: マウスまたは矢印キー（↑/↓）を使用して左側のパドル（緑色）を操作
- **コンピュータAI**: 右側のパドル（赤色）はボールを追従するシンプルなAIによって制御
- **ボール物理演算**: パドルと壁の衝突判定によるリアルなバウンド
- **スコアシステム**: プレイヤーとコンピュータの得点を記録
- **視覚的フィードバック**: 色分けされたパドルとスコアボード

## 遊び方

1. 「Start Game」ボタンをクリックしてゲームを開始
2. パドル（緑色、左側）を以下の方法で操作:
   - マウスを上下に動かす、または
   - ↑と↓の矢印キーを使用
3. コンピュータのパドル（赤色、右側）を抜いてボールを打ち返す
4. 先に得点した方が勝利！（ゲームは無限に続きます）
5. 「Reset Game」ボタンをクリックしてスコアを0-0でリセット

## インストール

```bash
# 依存関係をインストール
npm install

# Huskyフックを初期化（自動的に実行されます）
npm run prepare
```

## 開発

```bash
# 開発サーバーを起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

### リンティング

プロジェクトにはESLintとPrettierが設定されています:

```bash
# コードをリンティング
npm run lint

# コードを自動修正
npx eslint --ext .ts,.tsx . --fix

# Prettierでフォーマット
npx prettier --write "**/*.{js,jsx,ts,tsx,json,md}"
```

コミット時には、`husky`と`lint-staged`により自動的にリンターが実行されます。

- TypeScript/TSXファイル: ESLintで自動修正
- JS/JSX/JSON/MDファイル: Prettierで自動フォーマット

## プロダクションビルド

```bash
# アプリケーションをビルド
npm run build

# プロダクションサーバーを起動
npm start
```

## 技術スタック

- **React** - UIライブラリ
- **Next.js** - Reactフレームワーク
- **TypeScript** - 型安全性
- **HTML5 Canvas** - ゲームレンダリング
- **MUI (Material-UI)** - UIコンポーネントライブラリ

### 開発ツール

- **ESLint** - コード品質チェック
- **Prettier** - コードフォーマッター
- **Husky** - Gitフック管理
- **lint-staged** - ステージングされたファイルのリンティング

## プロジェクト構造

```
├── components/
│   └── PongGame.tsx      # すべてのゲームロジックを含むメインゲームコンポーネント
├── pages/
│   ├── _app.tsx          # Next.jsアプリラッパー
│   └── index.tsx         # ホームページ
├── next.config.ts        # Next.js設定
├── tsconfig.json         # TypeScript設定
└── package.json          # 依存関係とスクリプト
```

## ゲームメカニクス

- **キャンバスサイズ**: 800x600ピクセル
- **パドルサイズ**: 10x100ピクセル
- **ボールサイズ**: 半径8ピクセル
- **ボール速度**: フレームあたり5ピクセル
- **パドル速度**: フレームあたり6ピクセル（プレイヤー）、フレームあたり4.2ピクセル（コンピュータ）
- **フレームレート**: `requestAnimationFrame`を使用した60 FPS

## ライセンス

MIT
