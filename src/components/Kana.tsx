import { observer } from "mobx-react";
import { kanaToRomaji } from "../kana";

export interface KanaProps {
    text: string;
}

export const Kana = observer((props: KanaProps) => {
    const { text } = props;

    const romaji = kanaToRomaji(text);

    function onClick() {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = "ja-JP";
        speech.rate = 0.66;

        speechSynthesis.speak(speech);
    }

    return (
        <span>
            <span
                className="cursor-pointer border-b-2 border-dashed border-orchid-300"
                onClick={onClick}
                title={romaji}
                onKeyDown={onClick}
            >
                {text}
            </span>
        </span>
    );
});
