import { observer } from "mobx-react";
import { useState } from "react";

import Button from "./aria/Button";

import styles from "./MultipleChoiceQuiz.module.css";

import { FaCircleCheck, FaCircleQuestion, FaCircleXmark } from "react-icons/fa6";
import { TwoslashError, twoslasher } from "@typescript/twoslash";
import CodeBlock from "./CodeBlock";
import TextField from "./aria/TextField";

import ts from "typescript";
import * as tsvfs from "@typescript/vfs";
import lzstring from "lz-string";

interface FillBlankQuizProps {
    title: string;
    hint?: string;
    explanation?: string;

    code: string;

    children?: React.ReactNode;
}

export const FillBlankQuiz = observer((props: FillBlankQuizProps) => {
    const { title, explanation, hint, children } = props;

    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const status = success ? "success" : error ? "error" : "default";

    // Replace BLANK with value
    const filled = props.code.replace("BLANK", value || "____");

    const onSubmit = () => {
        isTypeScriptValid(filled).then((results) => {
            if (results.valid) {
                setError("");
                setSuccess(true);
            } else {
                setError(results.message || "Incorrect");
                setSuccess(false);
            }
        });
    };

    const headerIcon = success ? (
        <FaCircleCheck />
    ) : error ? (
        <FaCircleXmark />
    ) : (
        <FaCircleQuestion />
    );

    return (
        <div className={styles.root}>
            <div data-status={status} className={styles.heading}>
                {headerIcon}
                <span>{title}</span>
            </div>
            <div className={styles.content}>{children}</div>

            <CodeBlock actions={false} code={filled} />

            <TextField label="Answer" value={value} onChange={(v) => setValue(v)} />

            {error && <div className={styles.hint}>Reason: {error}</div>}
            {success && !explanation && <div className={styles.hint}>Success</div>}
            {success && explanation && <div className={styles.hint}>Reason: {explanation}</div>}

            <div>
                <Button isDisabled={!value} onPress={onSubmit}>
                    Submit
                </Button>
            </div>
        </div>
    );
});

async function isTypeScriptValid(code: string) {
    const fsMap = await tsvfs.createDefaultMapFromCDN({ target: 3 }, "3.7.3", true, ts);

    try {
        const results = twoslasher(code, "ts", {
            fsMap,
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            tsModule: ts as any,
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            lzstringModule: lzstring as any,
        });

        return {
            valid: true,
            message: results.staticQuickInfos.join(", "),
        };
    } catch (error) {
        if (error instanceof TwoslashError) {
            return {
                valid: false,
                message: error.recommendation,
            };
        }

        throw error;
    }
}
