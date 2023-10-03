import { observer } from "mobx-react";

import hljs from "highlight.js";
import "../highlight.scss";

import { useCallback, useMemo, useState } from "react";
import { css, styled } from "styled-components";
import { trimLines } from "../lib/string";
import { Button } from "@blueprintjs/core";
import { OpenInPlayground } from "./OpenInPlayground";

export interface CodeBlockProps {
    filename?: string;
    language?: string;
    code: string;
    
    minimal?: boolean;
}

const MinimalRootDivCss = css`
    padding: 0;
    border: none;
    box-shadow: none;
    border-radius: 0;
`;

const RootDiv = styled.div<{ minimal?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: start;

    position: relative;

    padding: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    font-family: "Fira Code", monospace;

    ${p => p.minimal && MinimalRootDivCss}
`;

const ActionsDiv = styled.div`
    position: absolute;
    top: 0;
    right: 0;

    margin-right: -0.5rem;

    transform: translateX(100%);

    display: flex;
    flex-direction: column;
    align-items: start;
`;

const CodeDiv = styled.div<{ minimal?: boolean }>`
    overflow: auto;
    flex: 1;

    pre {
        font-size: ${p => (p.minimal ? "0.6rem" : "0.75rem")};
    }
`;

export const CodeBlock = observer((props: CodeBlockProps) => {
    const [copied, setCopied] = useState(false);

    const { code, language = "typescript", minimal } = props;

    const trimmedCode = useMemo(() => trimLines(code), [code]);
    const highlighted = useMemo(() => {
        return hljs.highlight(language, trimmedCode).value;
    }, [trimmedCode, language]);

    const onCopyClick = useCallback(() => {
        navigator.clipboard.writeText(trimmedCode);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 5000);
    }, [trimmedCode]);

    const showOpenInPlayground = language === "ts" || language === "typescript";

    return (
        <RootDiv minimal={minimal}>
            {!minimal && (
                <ActionsDiv>
                    <Button
                        minimal
                        small
                        onClick={onCopyClick}
                        icon="clipboard"
                        text={copied ? "Copied!" : "Copy"}
                    />
                    {showOpenInPlayground && <OpenInPlayground minimal code={trimmedCode} />}
                </ActionsDiv>
            )}
            <CodeDiv minimal={minimal}>
                <pre>
                    <code dangerouslySetInnerHTML={{ __html: highlighted }} />
                </pre>
            </CodeDiv>
        </RootDiv>
    );
});
