interface KanaMap {
    [key: string]: string;
}

const DAKUTEN_CHAR = "\u3099";
const HANDAKUTEN_CHAR = "\u309A";
const HIRI_SOKUON_CHAR = "っ";
const KATA_SOKUON_CHAR = "ッ";

const HIRI_VOWEL_MAP = {
    あ: "a",
    い: "i",
    う: "u",
    え: "e",
    お: "o",
} satisfies KanaMap;

const KATA_VOWEL_MAP = {
    ア: "a",
    イ: "i",
    ウ: "u",
    エ: "e",
    オ: "o",
} satisfies KanaMap;

const HIRI_K_MAP = {
    か: "ka",
    き: "ki",
    く: "ku",
    け: "ke",
    こ: "ko",
} satisfies KanaMap;

const KATA_K_MAP = {
    カ: "ka",
    キ: "ki",
    ク: "ku",
    ケ: "ke",
    コ: "ko",
} satisfies KanaMap;

const HIRI_S_MAP = {
    さ: "sa",
    し: "shi",
    す: "su",
    せ: "se",
    そ: "so",
} satisfies KanaMap;

const KATA_S_MAP = {
    サ: "sa",
    シ: "shi",
    ス: "su",
    セ: "se",
    ソ: "so",
} satisfies KanaMap;

const HIRI_T_MAP = {
    た: "ta",
    ち: "chi",
    つ: "tsu",
    て: "te",
    と: "to",
} satisfies KanaMap;

const KATA_T_MAP = {
    タ: "ta",
    チ: "chi",
    ツ: "tsu",
    テ: "te",
    ト: "to",
} satisfies KanaMap;

const HIRI_N_MAP = {
    な: "na",
    に: "ni",
    ぬ: "nu",
    ね: "ne",
    の: "no",
} satisfies KanaMap;

const KATA_N_MAP = {
    ナ: "na",
    ニ: "ni",
    ヌ: "nu",
    ネ: "ne",
    ノ: "no",
} satisfies KanaMap;

const HIRI_H_MAP = {
    は: "ha",
    ひ: "hi",
    ふ: "fu",
    へ: "he",
    ほ: "ho",
} satisfies KanaMap;

const KATA_H_MAP = {
    ハ: "ha",
    ヒ: "hi",
    フ: "fu",
    ヘ: "he",
    ホ: "ho",
} satisfies KanaMap;

const HIRI_M_MAP = {
    ま: "ma",
    み: "mi",
    む: "mu",
    め: "me",
    も: "mo",
} satisfies KanaMap;

const KATA_M_MAP = {
    マ: "ma",
    ミ: "mi",
    ム: "mu",
    メ: "me",
    モ: "mo",
} satisfies KanaMap;

const HIRI_Y_MAP = {
    や: "ya",
    ゆ: "yu",
    よ: "yo",
} satisfies KanaMap;

const KATA_Y_MAP = {
    ヤ: "ya",
    ユ: "yu",
    ヨ: "yo",
} satisfies KanaMap;

const HIRI_R_MAP = {
    ら: "ra",
    り: "ri",
    る: "ru",
    れ: "re",
    ろ: "ro",
} satisfies KanaMap;

const KATA_R_MAP = {
    ラ: "ra",
    リ: "ri",
    ル: "ru",
    レ: "re",
    ロ: "ro",
} satisfies KanaMap;

const HIRI_W_MAP = {
    わ: "wa",
    を: "wo",
    ん: "n",
} satisfies KanaMap;

const KATA_W_MAP = {
    ワ: "wa",
    ヲ: "wo",
    ン: "n",
} satisfies KanaMap;

const HIRI_PLAIN_MAP = {
    ...HIRI_VOWEL_MAP,
    ...HIRI_K_MAP,
    ...HIRI_S_MAP,
    ...HIRI_T_MAP,
    ...HIRI_N_MAP,
    ...HIRI_H_MAP,
    ...HIRI_M_MAP,
    ...HIRI_Y_MAP,
    ...HIRI_R_MAP,
    ...HIRI_W_MAP,
} satisfies KanaMap;

const KATA_PLAIN_MAP = {
    ...KATA_VOWEL_MAP,
    ...KATA_K_MAP,
    ...KATA_S_MAP,
    ...KATA_T_MAP,
    ...KATA_N_MAP,
    ...KATA_H_MAP,
    ...KATA_M_MAP,
    ...KATA_Y_MAP,
    ...KATA_R_MAP,
    ...KATA_W_MAP,
} satisfies KanaMap;

const HIRI_DAKUTENABLE_MAP = {
    ...HIRI_K_MAP,
    ...HIRI_S_MAP,
    ...HIRI_T_MAP,
    ...HIRI_H_MAP,
    ...HIRI_M_MAP,
    ...HIRI_R_MAP,
} satisfies KanaMap;

const KATA_DAKUTENABLE_MAP = {
    ...KATA_K_MAP,
    ...KATA_S_MAP,
    ...KATA_T_MAP,
    ...KATA_H_MAP,
    ...KATA_M_MAP,
    ...KATA_R_MAP,
} satisfies KanaMap;

const DAKUTENABLE_MAP = {
    ...HIRI_DAKUTENABLE_MAP,
    ...KATA_DAKUTENABLE_MAP,
} satisfies KanaMap;

// Dakuten

const HIRI_G_MAP = {
    が: "ga",
    ぎ: "gi",
    ぐ: "gu",
    げ: "ge",
    ご: "go",
} satisfies KanaMap;

const KATA_G_MAP = {
    ガ: "ga",
    ギ: "gi",
    グ: "gu",
    ゲ: "ge",
    ゴ: "go",
} satisfies KanaMap;

const HIRI_Z_MAP = {
    ざ: "za",
    じ: "ji",
    ず: "zu",
    ぜ: "ze",
    ぞ: "zo",
} satisfies KanaMap;

const KATA_Z_MAP = {
    ザ: "za",
    ジ: "ji",
    ズ: "zu",
    ゼ: "ze",
    ゾ: "zo",
} satisfies KanaMap;

const HIRI_D_MAP = {
    だ: "da",
    ぢ: "ji",
    づ: "zu",
    で: "de",
    ど: "do",
} satisfies KanaMap;

const KATA_D_MAP = {
    ダ: "da",
    ヂ: "ji",
    ヅ: "zu",
    デ: "de",
    ド: "do",
} satisfies KanaMap;

const HIRI_B_MAP = {
    ば: "ba",
    び: "bi",
    ぶ: "bu",
    べ: "be",
    ぼ: "bo",
} satisfies KanaMap;

const KATA_B_MAP = {
    バ: "ba",
    ビ: "bi",
    ブ: "bu",
    ベ: "be",
    ボ: "bo",
} satisfies KanaMap;

// Handakuten

const HIRI_P_MAP = {
    ぱ: "pa",
    ぴ: "pi",
    ぷ: "pu",
    ぺ: "pe",
    ぽ: "po",
} satisfies KanaMap;

const KATA_P_MAP = {
    パ: "pa",
    ピ: "pi",
    プ: "pu",
    ペ: "pe",
    ポ: "po",
} satisfies KanaMap;

const HIRI_DAKUTEN_MAP = {
    ...HIRI_G_MAP,
    ...HIRI_Z_MAP,
    ...HIRI_D_MAP,
    ...HIRI_B_MAP,
} satisfies KanaMap;

const KATA_DAKUTEN_MAP = {
    ...KATA_G_MAP,
    ...KATA_Z_MAP,
    ...KATA_D_MAP,
    ...KATA_B_MAP,
} satisfies KanaMap;

const DAKUTEN_MAP = {
    ...HIRI_DAKUTEN_MAP,
    ...KATA_DAKUTEN_MAP,
} satisfies KanaMap;

const HIRI_HANDAKUTEN_MAP = {
    ...HIRI_P_MAP,
} satisfies KanaMap;

const KATA_HANDAKUTEN_MAP = {
    ...KATA_P_MAP,
} satisfies KanaMap;

const HANDAKUTEN_MAP = {
    ...HIRI_HANDAKUTEN_MAP,
    ...KATA_HANDAKUTEN_MAP,
} satisfies KanaMap;

const HIRI_K_DIGRAPH_MAP = {
    きゃ: "kya",
    きゅ: "kyu",
    きょ: "kyo",
} satisfies KanaMap;

const KATA_K_DIGRAPH_MAP = {
    キャ: "kya",
    キュ: "kyu",
    キョ: "kyo",
} satisfies KanaMap;

const HIRI_S_DIGRAPH_MAP = {
    しゃ: "sha",
    しゅ: "shu",
    しょ: "sho",
} satisfies KanaMap;

const KATA_S_DIGRAPH_MAP = {
    シャ: "sha",
    シュ: "shu",
    ショ: "sho",
} satisfies KanaMap;

const HIRI_T_DIGRAPH_MAP = {
    ちゃ: "cha",
    ちゅ: "chu",
    ちょ: "cho",
} satisfies KanaMap;

const KATA_T_DIGRAPH_MAP = {
    チャ: "cha",
    チュ: "chu",
    チョ: "cho",
} satisfies KanaMap;

const HIRI_N_DIGRAPH_MAP = {
    にゃ: "nya",
    にゅ: "nyu",
    にょ: "nyo",
} satisfies KanaMap;

const KATA_N_DIGRAPH_MAP = {
    ニャ: "nya",
    ニュ: "nyu",
    ニョ: "nyo",
} satisfies KanaMap;

const HIRI_H_DIGRAPH_MAP = {
    ひゃ: "hya",
    ひゅ: "hyu",
    ひょ: "hyo",
} satisfies KanaMap;

const KATA_H_DIGRAPH_MAP = {
    ヒャ: "hya",
    ヒュ: "hyu",
    ヒョ: "hyo",
} satisfies KanaMap;

const HIRI_M_DIGRAPH_MAP = {
    みゃ: "mya",
    みゅ: "myu",
    みょ: "myo",
} satisfies KanaMap;

const KATA_M_DIGRAPH_MAP = {
    ミャ: "mya",
    ミュ: "myu",
    ミョ: "myo",
} satisfies KanaMap;

const HIRI_R_DIGRAPH_MAP = {
    りゃ: "rya",
    りゅ: "ryu",
    りょ: "ryo",
} satisfies KanaMap;

const KATA_R_DIGRAPH_MAP = {
    リャ: "rya",
    リュ: "ryu",
    リョ: "ryo",
} satisfies KanaMap;

const HIRI_G_DIGRAPH_MAP = {
    ぎゃ: "gya",
    ぎゅ: "gyu",
    ぎょ: "gyo",
} satisfies KanaMap;

const KATA_G_DIGRAPH_MAP = {
    ギャ: "gya",
    ギュ: "gyu",
    ギョ: "gyo",
} satisfies KanaMap;

const HIRI_Z_DIGRAPH_MAP = {
    じゃ: "ja",
    じゅ: "ju",
    じょ: "jo",
} satisfies KanaMap;

const KATA_Z_DIGRAPH_MAP = {
    ジャ: "ja",
    ジュ: "ju",
    ジョ: "jo",
} satisfies KanaMap;

const HIRI_B_DIGRAPH_MAP = {
    びゃ: "bya",
    びゅ: "byu",
    びょ: "byo",
} satisfies KanaMap;

const KATA_B_DIGRAPH_MAP = {
    ビャ: "bya",
    ビュ: "byu",
    ビョ: "byo",
} satisfies KanaMap;

const HIRI_P_DIGRAPH_MAP = {
    ぴゃ: "pya",
    ぴゅ: "pyu",
    ぴょ: "pyo",
} satisfies KanaMap;

const KATA_P_DIGRAPH_MAP = {
    ピャ: "pya",
    ピュ: "pyu",
    ピョ: "pyo",
} satisfies KanaMap;

const KATA_DIGRAPH_MAP = {
    ...KATA_K_DIGRAPH_MAP,
    ...KATA_S_DIGRAPH_MAP,
    ...KATA_T_DIGRAPH_MAP,
    ...KATA_N_DIGRAPH_MAP,
    ...KATA_H_DIGRAPH_MAP,
    ...KATA_M_DIGRAPH_MAP,
    ...KATA_R_DIGRAPH_MAP,
    ...KATA_G_DIGRAPH_MAP,
    ...KATA_Z_DIGRAPH_MAP,
    ...KATA_B_DIGRAPH_MAP,
    ...KATA_P_DIGRAPH_MAP,
} satisfies KanaMap;

const HIRI_DIGRAPH_MAP = {
    ...HIRI_K_DIGRAPH_MAP,
    ...HIRI_S_DIGRAPH_MAP,
    ...HIRI_T_DIGRAPH_MAP,
    ...HIRI_N_DIGRAPH_MAP,
    ...HIRI_H_DIGRAPH_MAP,
    ...HIRI_M_DIGRAPH_MAP,
    ...HIRI_R_DIGRAPH_MAP,
    ...HIRI_G_DIGRAPH_MAP,
    ...HIRI_Z_DIGRAPH_MAP,
    ...HIRI_B_DIGRAPH_MAP,
    ...HIRI_P_DIGRAPH_MAP,
} satisfies KanaMap;

const HIRI_MAP = {
    ...HIRI_PLAIN_MAP,
    ...HIRI_DAKUTEN_MAP,
    ...HIRI_HANDAKUTEN_MAP,
    ...HIRI_DIGRAPH_MAP,
} satisfies KanaMap;

const KATA_MAP = {
    ...KATA_PLAIN_MAP,
    ...KATA_DAKUTEN_MAP,
    ...KATA_HANDAKUTEN_MAP,
    ...KATA_DIGRAPH_MAP,
} satisfies KanaMap;

const KANA_MAP = {
    ...HIRI_MAP,
    ...KATA_MAP,
} satisfies KanaMap;

export function kanaToRomaji(input: string): string {
    let result = "";

    for (let i = 0; i < input.length; i++) {
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        const currentChar = input[i]!;
        const nextChar = input[i + 1];

        // Handle youon (e.g. きゃ)
        if (nextChar && (KANA_MAP as KanaMap)[currentChar + nextChar]) {
            result += (KANA_MAP as KanaMap)[currentChar + nextChar];
            i++;
            continue;
        }

        // Handle sokuon (e.g. かっけ)
        if (currentChar === HIRI_SOKUON_CHAR || currentChar === KATA_SOKUON_CHAR) {
            if (nextChar === "ち" || nextChar === "チ") {
                result += "tchi";
                i++;

                continue;
            }

            if (nextChar) {
                result += (KANA_MAP as KanaMap)[nextChar]?.charAt(0) || nextChar.charAt(0);
            }
            continue;
        }

        result += (KANA_MAP as KanaMap)[currentChar] ?? currentChar;
    }

    return result;
}
