import { expect, test } from "bun:test";

import { kanaToRomaji } from "./kana";

testKanaToRomaji("あ", "a");
testKanaToRomaji("い", "i");

// complex
testKanaToRomaji("きゃ", "kya");
testKanaToRomaji("きゅ", "kyu");

// words
testKanaToRomaji("かっけ", "kakke");
testKanaToRomaji("かっけい", "kakkei");

testKanaToRomaji("こっち", "kotchi");

testKanaToRomaji("ぼっち ざ ろっく!", "botchi za rokku!");

function testKanaToRomaji(kana: string, romaji: string) {
    test(`${kana} => ${romaji}`, () => {
        expect(kanaToRomaji(kana)).toBe(romaji);
    });
}
