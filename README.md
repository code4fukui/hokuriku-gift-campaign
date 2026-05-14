# hokuriku-gift-campaign

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

This repository contains open data from a survey conducted at [welcome-hokuriku.jp](https://welcome-hokuriku.jp). The data is automatically updated daily and used in the [Hokuriku Inbound Tourism DX Open Data Visualization Web Application](https://hokuriku-inbound-kanko.github.io/hokuriku-inbound-kanko-visualization/).

This repository is published by the [Hokuriku Inbound Tourism DX Data Consortium](https://github.com/hokuriku-inbound-kanko).

## Demos

- **📊 Data Visualization App:** [View graphical representations of the survey data](https://hokuriku-inbound-kanko.github.io/hokuriku-inbound-kanko-visualization/)
- **💬 Translated Comments Viewer:** [Browse AI-translated free-text comments from tourists](https://code4fukui.github.io/hokuriku-gift-campaign/comments.html)
- **📄 Raw Data Table:** [View the complete raw dataset in a web-based table](https://code4fukui.github.io/hokuriku-gift-campaign/index.html)

## Data Files

- `daily/`: Contains daily survey data as individual CSV files. Each file is automatically fetched from an SFTP server and converted from Shift-JIS to UTF-8.
- `all.csv`: The main dataset, which aggregates all the CSV files from the `daily/` directory.
- `all_ja.csv`: A copy of `all.csv` with an additional column (`推奨度の理由(旅行)_ja`) containing Japanese translations of the free-text survey comments.

## Automation Workflow

This repository uses a set of scripts to automate data collection and processing:

1.  **Daily Fetch:** A shell script (`autoupdate.sh`) runs daily to trigger the update process.
2.  **SFTP Download:** The `update.sh` script connects to an SFTP server to download the previous day's survey results.
3.  **Charset Conversion:** The downloaded file, originally in Shift-JIS, is converted to UTF-8 using a Deno script (`conv-charset.ts`).
4.  **Commit:** The new UTF-8 encoded daily CSV is committed to the `daily/` directory.
5.  **Aggregation (Manual):** The `make.js` script can be run to combine all files in `daily/` into the main `all.csv` file.
6.  **Translation (Manual):** The `add-trans.js` script reads `all.csv`, uses an AI service to translate comments into Japanese, and saves the result as `all_ja.csv`.

## Local Usage

To run the data processing scripts locally, you will need:

- [Deno](https://deno.land/) runtime
- SFTP credentials for the data server

### Setup

1.  Clone the repository:
    ```sh
    git clone https://github.com/code4fukui/hokuriku-gift-campaign.git
    cd hokuriku-gift-campaign
    ```

2.  Create a `.env` file from the sample and add your SFTP credentials:
    ```sh
    cp .env.sample .env
    # Edit .env with your credentials
    ```

### Running Scripts

-   **Fetch the latest daily data:**
    ```sh
    bash update.sh
    ```

-   **Rebuild `all.csv` from daily files:**
    ```sh
    deno run -A make.js
    ```

-   **Generate the translated `all_ja.csv` file:**
    ```sh
    deno run -A add-trans.js
    ```

## License

MIT License — see [LICENSE](LICENSE).