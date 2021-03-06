const rankTags = new Set(['初期', 'エリート', '上級エリート']);
const positionTags = new Set(['近距離', '遠距離']);
const jobTags = new Set([
    '前衛タイプ',
    '医療タイプ',
    '先鋒タイプ',
    '術師タイプ',
    '狙撃タイプ',
    '重装タイプ',
    '補助タイプ',
    '特殊タイプ'
]);

const featureTags = new Set([
    '治療',
    '支援',
    '火力',
    '範囲攻撃',
    '減速',
    '生存',
    '防御',
    '弱化',
    '強制移動',
    '牽制',
    '爆発力',
    '召喚',
    '高速再配置',
    'COST回復',
    'ロボット'
]);
const rareTags = new Set([
    'エリート',
    '上級エリート',
    '特殊タイプ',
    '支援',
    '弱化',
    '強制移動',
    '牽制',
    '爆発力',
    '召喚',
    '高速再配置'
]);
const operators = {
    'エクシア': new Set(['上級エリート', '遠距離', '狙撃タイプ', '火力']),
    'イフリータ': new Set(['上級エリート', '遠距離', '術師タイプ', '範囲攻撃', '弱化']),
    'シージ': new Set(['上級エリート', '近距離', '先鋒タイプ', '火力', 'COST回復']),
    'シルバーアッシュ': new Set(['上級エリート', '近距離', '前衛タイプ', '火力', '支援']),
    'ホシグマ': new Set(['上級エリート', '近距離', '重装タイプ', '火力', '防御']),
    'サリア': new Set([
        '上級エリート',
        '近距離',
        '重装タイプ',
        '支援',
        '防御',
        '治療'
    ]),
    'シャイニング': new Set(['上級エリート', '遠距離', '医療タイプ', '支援', '治療']),
    'ナイチンゲール': new Set(['上級エリート', '遠距離', '医療タイプ', '支援', '治療']),
    'チェン': new Set(['上級エリート', '近距離', '前衛タイプ', '火力', '爆発力']),
    'スカジ': new Set(['上級エリート', '近距離', '前衛タイプ', '火力', '生存']),
    'アズリウス': new Set(['エリート', '遠距離', '狙撃タイプ', '火力']),
    'プラチナ': new Set(['エリート', '遠距離', '狙撃タイプ', '火力']),
    'メテオリーテ': new Set(['エリート', '遠距離', '狙撃タイプ', '範囲攻撃', '弱化']),
    'プロヴァンス': new Set(['エリート', '遠距離', '狙撃タイプ', '火力']),
    'ファイヤーウォッチ': new Set(['エリート', '遠距離', '狙撃タイプ', '火力', '爆発力']),
    'ナイトメア': new Set([
        'エリート',
        '遠距離',
        '術師タイプ',
        '治療',
        '火力',
        '減速'
    ]),
    'テキサス': new Set(['エリート', '近距離', '先鋒タイプ', '牽制', 'COST回復']),
    'ズィマー': new Set(['エリート', '近距離', '先鋒タイプ', '支援', 'COST回復']),
    'インドラ': new Set(['エリート', '近距離', '前衛タイプ', '火力', '生存']),
    'スペクター': new Set(['エリート', '近距離', '前衛タイプ', '範囲攻撃', '生存']),
    'スワイヤー': new Set(['エリート', '近距離', '前衛タイプ', '支援', '火力']),
    'ヴァルカン': new Set([
        'エリート',
        '近距離',
        '重装タイプ',
        '火力',
        '防御',
        '生存'
    ]),
    'ニアール': new Set(['エリート', '近距離', '重装タイプ', '防御', '治療']),
    'リスカム': new Set(['エリート', '近距離', '重装タイプ', '火力', '防御']),
    'クロワッサン': new Set(['エリート', '近距離', '重装タイプ', '強制移動', '防御']),
    'フィリオプシス': new Set(['エリート', '遠距離', '医療タイプ', '治療', '支援']),
    'サイレンス': new Set(['エリート', '遠距離', '医療タイプ', '治療']),
    'ワルファリン': new Set(['エリート', '遠距離', '医療タイプ', '治療', '支援']),
    'メイヤー': new Set(['エリート', '遠距離', '補助タイプ', '召喚', '牽制']),
    'プラマニクス': new Set(['エリート', '遠距離', '補助タイプ', '弱化']),
    'イースチナ': new Set(['エリート', '遠距離', '補助タイプ', '火力', '減速']),
    'レッド': new Set(['エリート', '近距離', '特殊タイプ', '牽制', '高速再配置']),
    'クリフハート': new Set(['エリート', '近距離', '特殊タイプ', '火力', '強制移動']),
    'マンティコア': new Set(['エリート', '近距離', '特殊タイプ', '火力', '生存']),
    'エフイーター': new Set(['エリート', '近距離', '特殊タイプ', '減速', '強制移動']),
    'ジェシカ': new Set(['遠距離', '狙撃タイプ', '火力', '生存']),
    'メテオ': new Set(['遠距離', '狙撃タイプ', '火力', '弱化']),
    'シラユキ': new Set(['遠距離', '狙撃タイプ', '範囲攻撃', '減速']),
    'ヘイズ': new Set(['遠距離', '術師タイプ', '火力', '弱化']),
    'ギターノ': new Set(['遠距離', '術師タイプ', '範囲攻撃']),
    'グレイ': new Set(['遠距離', '術師タイプ', '範囲攻撃', '減速']),
    'スカベンジャー': new Set(['近距離', '先鋒タイプ', '火力', 'COST回復']),
    'ヴィグナ': new Set(['近距離', '先鋒タイプ', '火力', 'COST回復']),
    'ドーベルマン': new Set(['近距離', '前衛タイプ', '火力', '支援']),
    'マトイマル': new Set(['近距離', '前衛タイプ', '火力', '生存']),
    'フロストリーフ': new Set(['近距離', '前衛タイプ', '火力', '減速']),
    'ムース': new Set(['近距離', '前衛タイプ', '火力']),
    'エステル': new Set(['近距離', '前衛タイプ', '範囲攻撃', '生存']),
    'ビーハンター': new Set(['近距離', '前衛タイプ', '火力']),
    'マッターホルン': new Set(['近距離', '重装タイプ', '防御']),
    'クオーラ': new Set(['近距離', '重装タイプ', '防御']),
    'グム': new Set(['近距離', '重装タイプ', '防御', '治療']),
    'ミルラ': new Set(['遠距離', '医療タイプ', '治療']),
    'パフューマー': new Set(['遠距離', '医療タイプ', '治療']),
    'アーススピリット': new Set(['遠距離', '補助タイプ', '減速']),
    'グラベル': new Set(['近距離', '特殊タイプ', '防御', '高速再配置']),
    'ロープ': new Set(['近距離', '特殊タイプ', '強制移動']),
    'ショウ': new Set(['近距離', '特殊タイプ', '強制移動']),
    'クルース': new Set(['遠距離', '狙撃タイプ', '火力']),
    'アドナキエル': new Set(['遠距離', '狙撃タイプ', '火力']),
    'カタパルト': new Set(['遠距離', '狙撃タイプ', '範囲攻撃']),
    'ラヴァ': new Set(['遠距離', '術師タイプ', '範囲攻撃']),
    'スチュワード': new Set(['遠距離', '術師タイプ', '火力']),
    'フェン': new Set(['近距離', '先鋒タイプ', 'COST回復']),
    'バニラ': new Set(['近距離', '先鋒タイプ', 'COST回復']),
    'プリュム': new Set(['近距離', '先鋒タイプ', '火力', 'COST回復']),
    'メランサ': new Set(['近距離', '前衛タイプ', '火力', '生存']),
    'ミッドナイト': new Set(['近距離', '前衛タイプ', '火力']),
    'ポプカル': new Set(['近距離', '前衛タイプ', '範囲攻撃', '生存']),
    'ビーグル': new Set(['近距離', '重装タイプ', '防御']),
    'スポット': new Set(['近距離', '重装タイプ', '治療', '防御']),
    'ハイビスカス': new Set(['遠距離', '医療タイプ', '治療']),
    'アンセル': new Set(['遠距離', '医療タイプ', '治療']),
    'オーキッド': new Set(['遠距離', '補助タイプ', '減速']),
    'レンジャー': new Set(['初期', '遠距離', '狙撃タイプ']),
    '12F': new Set(['初期', '遠距離', '術師タイプ']),
    'ドゥリン': new Set(['初期', '遠距離', '術師タイプ']),
    'ヤトウ': new Set(['初期', '近距離', '先鋒タイプ']),
    'ノイルホーン': new Set(['初期', '近距離', '重装タイプ']),
    'Castle-3': new Set(['近距離', '前衛タイプ', 'ロボット', '支援']),
    'Lancet-2': new Set(['遠距離', '医療タイプ', 'ロボット', '治療']),
    'THRM-EX': new Set(['近距離', '特殊タイプ', 'ロボット', '爆発力'])
};
const star6 = new Set([
    'エクシア',
    'イフリータ',
    'シージ',
    'シルバーアッシュ',
    'ホシグマ',
    'サリア',
    'シャイニング',
    'ナイチンゲール',
    'チェン',
    'スカジ'
]);
const star5 = new Set([
    'アズリウス',
    'プラチナ',
    'メテオリーテ',
    'プロヴァンス',
    'ファイヤーウォッチ',
    'ナイトメア',
    'テキサス',
    'ズィマー',
    'インドラ',
    'スペクター',
    'スワイヤー',
    'ヴァルカン',
    'ニアール',
    'リスカム',
    'クロワッサン',
    'フィリオプシス',
    'サイレンス',
    'ワルファリン',
    'メイヤー',
    'プラマニクス',
    'イースチナ',
    'レッド',
    'クリフハート',
    'マンティコア',
    'エフイーター'
]);
const star4 = new Set([
    'ジェシカ',
    'メテオ',
    'シラユキ',
    'ヘイズ',
    'ギターノ',
    'グレイ',
    'スカベンジャー',
    'ヴィグナ',
    'ドーベルマン',
    'マトイマル',
    'フロストリーフ',
    'ムース',
    'エステル',
    'ビーハンター',
    'マッターホルン',
    'クオーラ',
    'グム',
    'ミルラ',
    'パフューマー',
    'アーススピリット',
    'グラベル',
    'ロープ',
    'ショウ'
]);
const star3 = new Set([
    'クルース',
    'アドナキエル',
    'カタパルト',
    'ラヴァ',
    'スチュワード',
    'フェン',
    'バニラ',
    'プリュム',
    'メランサ',
    'ミッドナイト',
    'ポプカル',
    'ビーグル',
    'スポット',
    'ハイビスカス',
    'アンセル',
    'オーキッド'
]);
const star2 = new Set(['レンジャー', '12F', 'ドゥリン', 'ヤトウ', 'ノイルホーン']);
const star1 = new Set(['Castle-3', 'Lancet-2', 'THRM-EX']);

window.addEventListener('load', () => {
    for (const tag of rankTags) {
        const btnElem = document.createElement('button');
        btnElem.innerText = tag;
        if (rareTags.has(tag)) {
            btnElem.classList.add('rare');
        }
        document.getElementById('rank_tags').appendChild(btnElem);
    }
    for (const tag of positionTags) {
        const btnElem = document.createElement('button');
        btnElem.innerText = tag;
        if (rareTags.has(tag)) {
            btnElem.classList.add('rare');
        }
        document.getElementById('position_tags').appendChild(btnElem);
    }
    for (const tag of jobTags) {
        const btnElem = document.createElement('button');
        btnElem.innerText = tag;
        if (rareTags.has(tag)) {
            btnElem.classList.add('rare');
        }
        document.getElementById('job_tags').appendChild(btnElem);
    }
    for (const tag of featureTags) {
        const btnElem = document.createElement('button');
        btnElem.innerText = tag;
        if (rareTags.has(tag)) {
            btnElem.classList.add('rare');
        }
        document.getElementById('feature_tags').appendChild(btnElem);
    }
    document.getElementById('searchTags').addEventListener('click', (event) => {
        if (event.target.tagName.toLowerCase() === 'button') {
            if (!event.target.classList.contains('clicked')) {
                if (document.querySelectorAll('button.clicked').length < 3) {
                    event.target.classList.toggle('clicked');
                }
            } else {
                event.target.classList.toggle('clicked');
            }
            searchTarget();
        }
    });
});


function searchTarget() {
    const selectedTags = [];
    for (const btnElem of document.querySelectorAll('button.clicked')) {
        selectedTags.push(btnElem.innerText);
    }
    const combArray = [];
    for (let i = 1; i <= selectedTags.length; i++) {
        for (const conditions of combination(selectedTags, i)) {
            combArray.push(conditions);
        }
    }
    combArray.reverse();
    const resultObject = {};
    for (const targets of combArray) {
        for (const [operatorName, tags] of Object.entries(operators)) {
            if (containsArray(targets, tags)) {
                if (!resultObject[targets]) {
                    resultObject[targets] = new Set();
                }
                resultObject[targets].add(operatorName);
            }
        }
    }
    document.getElementById('result').innerHTML = '';
    for (const [tags, operators] of Object.entries(resultObject)) {
        const parentDiv = document.createElement('div');
        parentDiv.classList.add('flex');
        const firstDiv = document.createElement('div');
        firstDiv.classList.add('first');
        for (const tag of tags.split(',')) {
            const divElem = document.createElement('div');
            divElem.innerText = tag;
            firstDiv.appendChild(divElem);
        }
        parentDiv.appendChild(firstDiv);
        const operatorDiv = document.createElement('div');
        for (const operator of operators) {
            const divElem = document.createElement('div');
            divElem.classList.add('operator');
            if (star6.has(operator)) {
                divElem.classList.add('star6');
            } else if (star5.has(operator)) {
                divElem.classList.add('star5');
            } else if (star4.has(operator)) {
                divElem.classList.add('star4');
            } else if (star3.has(operator)) {
                divElem.classList.add('star3');
            } else if (star2.has(operator)) {
                divElem.classList.add('star2');
            } else if (star1.has(operator)) {
                divElem.classList.add('star1');
            }
            divElem.innerText = operator;
            operatorDiv.appendChild(divElem);
        }
        parentDiv.appendChild(operatorDiv);
        document.getElementById('result').appendChild(parentDiv);
    }
}

function combination(baseArray, k) {
    const resultArray = [];
    if (baseArray.length < k) {
        return resultArray;
    }
    if (k === 1) {
        for (let i = 0; i < baseArray.length; i++) {
            resultArray[i] = [baseArray[i]];
        }
    } else {
        for (let i = 0; i < baseArray.length - k + 1; i++) {
            const row = combination(baseArray.slice(i + 1), k - 1);
            for (let j = 0; j < row.length; j++) {
                resultArray.push([baseArray[i]].concat(row[j]));
            }
        }
    }
    return resultArray;
}

function containsArray(checkArray, baseSet) {
    let result = true;
    for (const check of checkArray) {
        if (!baseSet.has(check)) {
            result = false;
        }
    }
    return result;
}
