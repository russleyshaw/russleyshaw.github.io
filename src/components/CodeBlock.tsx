import { observer } from "mobx-react";

import "../lib/highlight";

import hljs from "highlight.js";

import { useCallback, useMemo, useState } from "react";
import { trimLines } from "../lib/string";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./aria/Button";
import { ButtonGroup } from "./aria/ButtonGroup";

export interface CodeBlockProps {
    filename?: string;
    language?: string;
    code?: string;
    actions?: boolean;
}

export default observer((props: CodeBlockProps) => {
    const [copied, setCopied] = useState(false);
    const [hovered, setHovered] = useState(false);

    const { code = "", language, actions = true } = props;

    const trimmedCode = useMemo(() => trimLines(code ?? ""), [code]);
    const highlighted = useMemo(() => {
        return hljs.highlight(trimmedCode, { language: language ?? "typescript" });
    }, [trimmedCode, language]);

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
            className="relative rounded bg-jet p-4"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {actions && (
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            transition={{
                                duration: 0.5,
                            }}
                            exit={{
                                opacity: 0,
                            }}
                            className="absolute right-2 top-2 flex-col p-2 text-xs"
                        >
                            <ButtonGroup>
                                <Button type="button" className="button" onPress={onCopyClick}>
                                    {copied ? "Copied!" : "Copy"}
                                </Button>
                                {showOpenInPlayground && (
                                    <Button type="button" className="button">
                                        TS Playground
                                    </Button>
                                )}
                            </ButtonGroup>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}

            <pre className="overflow-x-auto">
                {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
                <code dangerouslySetInnerHTML={{ __html: highlighted.value }} />
            </pre>
        </div>
    );
});
