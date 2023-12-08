import { observer } from "mobx-react";

import "../lib/higihlight";

import hljs from "highlight.js";

import { useCallback, useMemo, useState } from "react";
import { styled } from "styled-components";
import { trimLines } from "../lib/string";
import { Button } from "@blueprintjs/core";
import { OpenInPlayground } from "./OpenInPlayground";

import { AnimatePresence, motion } from "framer-motion";

import styles from "./CodeBlock.module.css";

export interface CodeBlockProps {
    filename?: string;
    language?: string;
    code?: string;
}

const CodeDiv = styled.div`
    overflow: auto;
    flex: 1;
`;

export const CodeBlock = observer((props: CodeBlockProps) => {
    const [copied, setCopied] = useState(false);
    const [hovered, setHovered] = useState(false);

    const { code = "" } = props;

    const trimmedCode = useMemo(() => trimLines(code ?? ""), [code]);
    const highlighted = useMemo(() => {
        return hljs.highlightAuto(trimmedCode);
    }, [trimmedCode]);

    const onCopyClick = useCallback(() => {
        navigator.clipboard.writeText(trimmedCode);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 5000);
    }, [trimmedCode]);

    const showOpenInPlayground =
        highlighted.language === "ts" || highlighted.language === "typescript";

    return (
        <div
            className={styles.root}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        className={styles.actions}
                        initial={{
                            right: -50,
                            opacity: 0,
                        }}
                        animate={{
                            right: 0,
                            opacity: 1,
                        }}
                        transition={{
                            duration: 0.5,
                        }}
                        exit={{
                            right: -50,
                            opacity: 0,
                        }}
                    >
                        <Button
                            minimal
                            small
                            onClick={onCopyClick}
                            icon="clipboard"
                            text={copied ? "Copied!" : "Copy"}
                        />
                        {showOpenInPlayground && <OpenInPlayground minimal code={trimmedCode} />}
                    </motion.div>
                )}
            </AnimatePresence>

            <CodeDiv>
                <pre>
                    <code dangerouslySetInnerHTML={{ __html: highlighted.value }} />
                </pre>
            </CodeDiv>
        </div>
    );
});
