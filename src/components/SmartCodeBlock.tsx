"use client";

import { useAsync } from "react-use";
import GenericCodeBlock from "./GenericCodeBlock";

import { getTypeScriptErrors } from "../lib/typescript";
import { useState } from "react";
import TagButton from "./TagButton";

export interface CodeBlockProps {
    filename?: string;
    language?: string;
    code?: string;
}

export default function CodeBlock(props: CodeBlockProps) {
    const { code = "", language } = props;

    const isTypeScript = language === "ts" || language === "typescript" || language === "tsx";

    const result = parseTsBlock(code);

    const [showHidden, setShowHidden] = useState(false);
    const shownCode = showHidden ? code : result.code;

    const shouldCompile = isTypeScript && result.tsCheck;
    const tsErrors = useAsync(async () => {
        if (!shouldCompile) return [];
        return getTypeScriptErrors(code ?? "");
    }, [shouldCompile, code]);
    return (
        <GenericCodeBlock
            actions={
                result.totalHidden > 0 && (
                    <TagButton onClick={() => setShowHidden((v) => !v)}>
                        {showHidden ? "Collapse" : "Show All"}
                    </TagButton>
                )
            }
            code={shownCode}
            language={language}
            footer={
                <CodeBlockCompileStatus
                    compilable={shouldCompile}
                    loading={tsErrors.loading}
                    errors={tsErrors.value}
                />
            }
        />
    );
}

interface CodeBlockCompileStatusProps {
    compilable?: boolean;
    loading?: boolean;
    errors?: string[];
}

function CodeBlockCompileStatus(props: CodeBlockCompileStatusProps) {
    const { loading, errors = [], compilable } = props;

    if (!compilable) {
        return null;
    }

    if (loading) {
        return <div className="text-xs text-yellow-500">Compiling...</div>;
    }

    if (errors.length > 0) {
        return (
            <div className="text-xs text-red-500">
                <span className="font-bold">Errors:</span>
                <ul className="list-disc ml-4">
                    {errors.map((e) => (
                        <li key={e}>{e}</li>
                    ))}
                </ul>
            </div>
        );
    }

    if (errors.length === 0) {
        return <div className="text-xs text-green-500">Compiled successfully!</div>;
    }

    return null;
}

function isTextCommentKeyword(line: string, keyword: string) {
    return line.trim().startsWith(`// ${keyword}`);
}

function parseTsBlock(code: string) {
    const lines = code.split("\n");

    const shownLines: string[] = [];

    let tsCheck = false;
    let hiding = false;
    let filename: string | undefined;

    for (const line of lines) {
        if (isTextCommentKeyword(line, "filename")) {
            filename = line.replace("// filename", "").trim();
            continue;
        }
        if (isTextCommentKeyword(line, "tscheck")) {
            tsCheck = true;
            continue;
        }

        if (isTextCommentKeyword(line, "hide")) {
            hiding = true;

            continue;
        }

        if (isTextCommentKeyword(line, "show")) {
            hiding = false;
            continue;
        }

        if (hiding) {
            continue;
        }

        shownLines.push(line);
    }

    return {
        tsCheck,
        totalHidden: lines.length - shownLines.length,
        code: shownLines.join("\n"),
        filename,
    };
}
