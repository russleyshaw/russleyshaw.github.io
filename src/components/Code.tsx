import { observer } from "mobx-react";
import { useMemo } from "react";
import hljs from "highlight.js";
import { trimLines } from "../lib/string";
import styled from "styled-components";

interface CodeProps {
    c: string;
    lang?: string;
}

const Code = styled.code`
    font-size: 0.75rem;
    font-family: "Fira Code", monospace;

    background-color: rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 0.25rem;
    border-radius: 0.25rem;
`;

export default observer((props: CodeProps) => {
    const { c: code, lang: language = "ts" } = props;
    const highlighted = useMemo(() => {
        return hljs.highlight(language, trimLines(code)).value;
    }, [code, language]);

    return <Code dangerouslySetInnerHTML={{ __html: highlighted }} />;
});
