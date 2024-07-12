import "../lib/highlight";

import "highlight.js/styles/github-dark.css";
import hljs from "highlight.js";

import { trimLines } from "../lib/string";
import { useState } from "react";
import { copyToClipboard } from "../lib/clipboard";
import TagButton from "./TagButton";
import { expectDefined, expectParseInt, setAdd } from "../lib/common";
import { range } from "lodash";

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
    const [showRaw, setShowRaw] = useState(false);
    const trimmedCode = trimLines(code ?? "");

    const langName = getLanguageName(language);

    const codeLines = trimmedCode.split("\n");

    const highlightedLines = new Set<number>();
    const addedLines = new Set<number>();
    const removedLines = new Set<number>();
    const hiddenLines = new Set<number>();

    for (let lineIdx = 0; lineIdx < codeLines.length; lineIdx++) {
        const codeLine = expectDefined(codeLines[lineIdx]);

        const codeLineTrimmed = codeLine.trim();

        let cmd = getCommentCommand(codeLineTrimmed, "highlight");
        if (cmd) {
            const lines = parseLineNumbers(cmd).map((l) => l + lineIdx);
            setAdd(highlightedLines, ...lines);
            setAdd(hiddenLines, lineIdx);
        }

        cmd = getCommentCommand(codeLineTrimmed, "added");
        if (cmd) {
            const lines = parseLineNumbers(cmd).map((l) => l + lineIdx);
            setAdd(addedLines, ...lines);
            setAdd(hiddenLines, lineIdx);
        }

        cmd = getCommentCommand(codeLineTrimmed, "removed");
        if (cmd) {
            const lines = parseLineNumbers(cmd).map((l) => l + lineIdx);
            setAdd(removedLines, ...lines);
            setAdd(hiddenLines, lineIdx);
        }
    }

    const syntaxHighlighted = hljs.highlight(trimmedCode, { language: language ?? "typescript" });
    const syntaxHighlightedLines = syntaxHighlighted.value.split("\n");
    for (let i = 0; i < syntaxHighlightedLines.length; i++) {
        if (highlightedLines.has(i)) {
            syntaxHighlightedLines[i] =
                `<span class="highlight-line">${syntaxHighlightedLines[i]}</span>`;
        }
        if (addedLines.has(i)) {
            syntaxHighlightedLines[i] =
                `<span class="diff-added">${syntaxHighlightedLines[i]}</span>`;
        }
        if (removedLines.has(i)) {
            syntaxHighlightedLines[i] =
                `<span class="diff-removed">${syntaxHighlightedLines[i]}</span>`;
        }
    }

    const newHighlighted = syntaxHighlightedLines
        .filter((_l, idx) => showRaw || !hiddenLines.has(idx))
        .join("");

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
                    <TagButton onClick={() => setShowRaw(!showRaw)}>
                        {" "}
                        {showRaw ? "Hide" : "Show"} Raw
                    </TagButton>
                    {props.actions}
                </div>
            </div>

            <hr className="opacity-25" />

            <pre className="overflow-x-auto text-sm">
                {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
                <code dangerouslySetInnerHTML={{ __html: newHighlighted }} />
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

function getCommentCommand(line: string, command: string) {
    const lineTrimmed = line.trim();
    if (lineTrimmed.startsWith(`// ${command}`)) {
        return lineTrimmed.slice(`// ${command}`.length).trim();
    }

    return undefined;
}

function parseLineNumbers(line: string): number[] {
    const parts = line.split(",");
    const lineNumbers: number[] = [];

    for (const part of parts) {
        const rangeParts = part.split("-");
        if (rangeParts.length === 2) {
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            const start = expectParseInt(rangeParts[0]!);
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            const end = expectParseInt(rangeParts[1]!);

            lineNumbers.push(...range(start, end + 1));
        } else {
            const num = expectParseInt(part);
            lineNumbers.push(num);
        }
    }

    return lineNumbers;
}
