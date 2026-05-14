# hokuriku-gift-campaign

このリポジトリには、[welcome-hokuriku.jp](https://welcome-hokuriku.jp)で実施されたアンケート調査のオープンデータが収録されています。データは毎日自動更新され、[Hokuriku Inbound Tourism DX Open Data Visualization Web Application](https://hokuriku-inbound-kanko.github.io/hokuriku-inbound-kanko-visualization/)で使用されています。

このリポジトリは[Hokuriku Inbound Tourism DX Data Consortium](https://github.com/hokuriku-inbound-kanko)によって公開されています。

## デモ

- **📊 データ可視化アプリ:** [調査データをグラフ化して表示](https://hokuriku-inbound-kanko.github.io/hokuriku-inbound-kanko-visualization/)
- **💬 翻訳コメントビューアー:** [観光客からの自由記述コメントのAI翻訳を閲覧](https://code4fukui.github.io/hokuriku-gift-campaign/comments.html)
- **📄 生データテーブル:** [完全な生データセットをWeb上の表形式で表示](https://code4fukui.github.io/hokuriku-gift-campaign/index.html)

## データファイル

- `daily/`: 日次の調査データを個別のCSVファイルとして格納しています。各ファイルはSFTPサーバーから自動的に取得され、Shift-JISからUTF-8に変換されます。
- `all.csv`: `daily/`ディレクトリのすべてのCSVファイルを集約したメインデータセットです。
- `all_ja.csv`: `all.csv`のコピーで、アンケートの自由記述コメントの日本語訳を含む追加列（`推奨度の理由(旅行)_ja`）が含まれています。

## 自動化ワークフロー

このリポジトリでは、データ収集と処理を自動化するために以下のスクリプト群を使用しています:

1.  **日次取得:** シェルスクリプト（`autoupdate.sh`）が毎日実行され、更新プロセスをトリガーします。
2.  **SFTPダウンロード:** `update.sh`スクリプトがSFTPサーバーに接続し、前日の調査結果をダウンロードします。
3.  **文字コード変換:** 元のShift-JIS形式のダウンロードファイルを、Denoスクリプト（`conv-charset.ts`）を使用してUTF-8に変換します。
4.  **コミット:** 新しいUTF-8エンコードの日次CSVファイルを`daily/`ディレクトリにコミットします。
5.  **集約（手動）:** `make.js`スクリプトを実行して、`daily/`ディレクトリ内のすべてのファイルをメインの`all.csv`ファイルに結合します。
6.  **翻訳（手動）:** `add-trans.js`スクリプトが`all.csv`を読み込み、AIサービスを使用してコメントを日本語に翻訳し、結果を`all_ja.csv`として保存します。

## ローカルでの使用

データ処理スクリプトをローカルで実行するには、以下が必要です:

- [Deno](https://deno.land/)ランタイム
- データサーバーのSFTP認証情報

### セットアップ

1.  リポジトリをクローンします:
    ```sh
    git clone https://github.com/code4fukui/hokuriku-gift-campaign.git
    cd hokuriku-gift-campaign
    ```

2.  `.env.sample`から`.env`ファイルを作成し、SFTPの認証情報を追加します:
    ```sh
    cp .env.sample .env
    # .envを編集して認証情報を追加
    ```

### スクリプトの実行

-   **最新の日次データを取得:**
    ```sh
    bash update.sh
    ```

-   **日次ファイルから`all.csv`を再構築:**
    ```sh
    deno run -A make.js
    ```

-   **翻訳済みの`all_ja.csv`ファイルを生成:**
    ```sh
    deno run -A add-trans.js
    ```

## ライセンス

MIT License — 詳細は[LICENSE](LICENSE)を参照してください。
