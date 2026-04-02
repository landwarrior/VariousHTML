/**
 * ガントチャートを作成する
 * @param {HTMLElement} tableElement
 * @param {string} targetSelector
 */
function createGantt(tableElement, targetSelector) {
    // テーブルからデータを取得して Frappe Gantt 形式に変換
    const rows = tableElement.querySelectorAll('tbody tr');
    // Frappe Gantt の定義で日付は YYYY-MM-DD にしているので、そこに合わせるための関数
    const normalizeDate = (s) => s.trim().replace(/\//g, '-');
    const tasks = [];
    for (const row of rows) {
        const cells = row.querySelectorAll('td');
        if (cells.length < 5) {
            continue;
        }
        let custom_class = '';
        if (cells[0].innerText.includes('設計')) {
            custom_class = 'gantt-design';
        } else if (cells[0].innerText.includes('実装')) {
            custom_class = 'gantt-dev';
        } else if (cells[0].innerText.includes('テスト')) {
            custom_class = 'gantt-test';
        }
        tasks.push({
            id: cells[0].innerText, // 依存関係を追えるように ID もタスク名を使う
            name: cells[0].innerText,
            start: normalizeDate(cells[1].innerText),
            end: normalizeDate(cells[2].innerText),
            progress: parseInt(cells[3].innerText),
            dependencies: cells[4].innerText, // 先行タスクのタスク名を指定する
            custom_class: custom_class,
        });
    }

    // ガントチャートの初期化
    const gantt = new Gantt(targetSelector, tasks, {
        language: 'ja',
        infinite_padding: false, // 無限スクロールの無効化
        scroll_to: 'start', // スクロールを開始位置にする
        date_format: 'YYYY-MM-DD', // 日付のフォーマット
        bar_height: 30, // バーの高さ(px)。既定は 30。小さくするとバー全体が縮む
        upper_header_height: 30, // 上部ヘッダー（月）の高さ(px)。既定は 45。小さくするとヘッダー全体が縮む
        lower_header_height: 22, // 下部ヘッダー（日付）の高さ(px)。既定は 30。小さくするとヘッダー全体が縮む
        move_dependencies: true, // 依存関係の移動を許可。規定は許可
        readonly_progress: true, // 進捗をreadonly にする。規定は false
        readonly_dates: true, // タスクの日付を readonly にする。規定は false
        readonly: true, // まとめて readonly にする。規定は false
        view_mode_select: true, // 表示モードを変更可能にする。規定は false
    });

    // Day 以下の細かい粒度のモードは列幅を個別に設定して再描画
    const widthMap = { Hour: 15, 'Quarter Day': 20, 'Half Day': 25, Day: 30 };
    for (const [name, width] of Object.entries(widthMap)) {
        const mode = gantt.options.view_modes.find((m) => m.name === name);
        if (mode) mode.column_width = width;
    }
    // 初期表示時の Day モードは初期値の45pxで描画されるため、プロパティを更新した後に再描画させる
    gantt.change_view_mode('Day');
}
