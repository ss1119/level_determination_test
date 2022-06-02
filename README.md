# レベル判定テスト

## Firebaseについて

デフォルトは以下のアカウントを利用

https://console.firebase.google.com/u/1/project/level-determination-test-f8c31/overview

### 現在使ってるサービス

- Hosting
- Cloud Firesotre
- Functions
  - Blazeプランが必要

## デプロイについて

### Hosting

masterにマージされると自動でFirebase Hostingへデプロイされる

### Functions

手動で行わないといけない。

```
cd functions
npm run deploy
```

## 対応文字コードについて

## アップロード
以下の2つの文字コードに対応してること確認済み
- UTF-8
- Shift_JIS

## ダウンロード
- レベル判定csvはShift_JIS
  - TiiFaシステムがShift_JISのみ対応しているから
- 各解答のcsvはUTF-8
  - 必要なら変える、現時点で変える必要がそんなに高くないからそのまま
