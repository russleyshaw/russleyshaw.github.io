import { observer } from "mobx-react";

import "../lib/highlight";

import hljs from "highlight.js";

import { useCallback, useMemo, useState } from "react";
import { styled } from "styled-components";
import { trimLines } from "../lib/string";
import { OpenInPlayground } from "./OpenInPlayground";

import { AnimatePresence, motion } from "framer-motion";

import styles from "./CodeBlock.module.css";

export interface CodeBlockProps {
    filename?: string;
    language?: string;
    code?: string;
}

export const CodeBlock = observer((props: CodeBlockProps) => {
    const [copied, setCopied] = useState(false);
    const [hovered, setHovered] = useState(false);

    const { code = "", language } = props;

    const trimmedCode = useMemo(() => trimLines(code ?? ""), [code]);
    const highlighted = useMemo(() => {
        return hljs.highlight(trimmedCode, { language: language ?? "typescript" });
    }, [trimmedCode]);

    const onCopyClick = useCallback(() => {
        navigator.clipboard.writeText(trimmedCode);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 5000);
    }, [trimmedCode]);

    const lang = language ?? highlighted.language;

    const showOpenInPlayground = lang === "ts" || lang === "typescript" || lang === "tsx";

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
                            right: -100,
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
                            right: -100,
                            opacity: 0,
                        }}
                    >
                        <button type="button" className="button" onClick={onCopyClick}>
                            {copied ? "Copied!" : "Copy"}
                        </button>
                        {showOpenInPlayground && (
                            <button type="button" className="button">
                                TS Playground
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <pre>
                <code dangerouslySetInnerHTML={{ __html: highlighted.value }} />
            </pre>
        </div>
    );
});
