import "../lib/highlight";

import "highlight.js/styles/github-dark.css";
import hljs from "highlight.js";

import { trimLines } from "../lib/string";

export interface GenericCodeBlockProps {
    language?: string;
    code?: string;
}

export default function GenericCodeBlock(props: GenericCodeBlockProps) {
    const { code, language } = props;

    const trimmedCode = trimLines(code ?? "");
    const highlighted = hljs.highlight(trimmedCode, { language: language ?? "typescript" });

    return (
        <pre className="overflow-x-auto text-sm">
            {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
            <code dangerouslySetInnerHTML={{ __html: highlighted.value }} />
        </pre>
    );
}
