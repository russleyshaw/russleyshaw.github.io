import { observer } from "mobx-react";

import hljs from "highlight.js";
import "highlight.js/styles/github-dark-dimmed.css";

import { useCallback, useMemo, useState } from "react";
import { css, styled } from "styled-components";
import { trimLines } from "../lib/string";
import { Button, Card } from "@blueprintjs/core";

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

    padding: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
    border-radius: 0.5rem;

    ${p => p.minimal && MinimalRootDivCss}
`;

const ActionsDiv = styled.div`
    position: absolute;
    top: 0;
    right: 0;

    margin-right: -0.5rem;

    transform: translateX(100%);
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

    const highlighted = useMemo(() => {
        return hljs.highlight(language, trimLines(code)).value;
    }, [code, language]);

    const onCopyClick = useCallback(() => {
        navigator.clipboard.writeText(code);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 5000);
    }, [code]);

    return (
        <RootDiv minimal={minimal}>
            {!minimal && (
                <ActionsDiv>
                    <Button
                        minimal
                        small
                        onClick={onCopyClick}
                        text={copied ? "Copied!" : "Copy"}
                    />
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
