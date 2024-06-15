import "../lib/highlight";

import "highlight.js/styles/github-dark.css";
import hljs from "highlight.js";

import { trimLines } from "../lib/string";
import { useState } from "react";
import { copyToClipboard } from "../lib/clipboard";
import TagButton from "./TagButton";

export interface GenericCodeBlockProps {
    language?: string;
    code?: string;
    footer?: React.ReactNode;
    actions?: React.ReactNode;
    title?: string;
}

export default function GenericCodeBlock(props: GenericCodeBlockProps) {
    const { code, language } = props;

    const [copied, setCopied] = useState(false);
    const trimmedCode = trimLines(code ?? "");
    const highlighted = hljs.highlight(trimmedCode, { language: language ?? "typescript" });

    const langName = getLanguageName(language);

    return (
        <div className="flex flex-col bg-black/10 p-4 shadow rounded-lg gap-2 border border-black">
            <div className="flex flex-row justify-between gap-1">
                <div className="flex flex-row gap-1">
                    <span className="opacity-50">{props.title ?? langName}</span>
                </div>

                <div className="flex flex-row gap-1">
                    <TagButton
                        onClick={() => {
                            copyToClipboard(code ?? "");
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                        }}
                    >
                        {copied ? "Copied!" : "Copy"}
                    </TagButton>
                    {props.actions}
                </div>
            </div>

            <hr className="opacity-25" />

            <pre className="overflow-x-auto text-sm">
                {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
                <code dangerouslySetInnerHTML={{ __html: highlighted.value }} />
            </pre>

            {props.footer}
        </div>
    );
}

function getLanguageName(lang?: string) {
    if (!lang) return "Unknown";

    switch (lang.toLowerCase().trim()) {
        case "ts":
        case "tsx":
        case "typescript":
            return "TypeScript";
        case "js":
        case "jsx":
        case "javascript":
            return "JavaScript";
    }

    return lang;
}
