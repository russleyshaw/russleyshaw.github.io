import { observer } from "mobx-react";
import { useState } from "react";

import Button from "./aria/Button";
import RadioGroup from "./aria/RadioGroup";
import Radio from "./aria/Radio";
import CheckboxGroup from "./aria/CheckboxGroup";
import Checkbox from "./aria/Checkbox";

import { getFirst, mapEntries, toggleSet } from "../lib/common";
import styles from "./MultipleChoiceQuiz.module.css";

import { FaCircleCheck, FaCircleQuestion, FaCircleXmark } from "react-icons/fa6";

interface BaseProps<T_AnswerKey extends string> {
    title?: string;
    hint?: string;
    explanation?: string;

    choices: Record<T_AnswerKey, string>;

    children?: React.ReactNode;
}

interface SingleProps<T_AnswerKey extends string> extends BaseProps<T_AnswerKey> {
    type: "single";
    answer: T_AnswerKey;
}

interface MultiProps<T_AnswerKey extends string> extends BaseProps<T_AnswerKey> {
    type: "multiple";
    answer: T_AnswerKey[];
}

type MultipleChoiceQuizProps<T_AnswerKey extends string> =
    | SingleProps<T_AnswerKey>
    | MultiProps<T_AnswerKey>;

export const MultipleChoiceQuiz = observer(
    <T extends string>(props: MultipleChoiceQuizProps<T>) => {
        const { choices, answer, title, explanation, hint, children } = props;

        const [values, setValues] = useState(new Set<T>());
        const [error, setError] = useState("");
        const [success, setSuccess] = useState(false);
        const status = success ? "success" : error ? "error" : "default";

        const onSubmit = () => {
            if (props.type === "single") {
                const value = getFirst([...values]);
                if (value && answer.includes(value)) {
                    setError("");
                    setSuccess(true);
                } else {
                    setError("Incorrect");
                    setSuccess(false);
                }
            } else {
                if (props.answer.every((a) => values.has(a))) {
                    setError("");
                    setSuccess(true);
                } else {
                    setError("Incorrect");
                    setSuccess(false);
                }
            }
        };

        const myTitle = title ?? "Yes or No";

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
                    <span>{myTitle}</span>
                </div>
                <div className={styles.content}>{children}</div>

                {props.type === "single" && (
                    <RadioGroup onChange={(v) => setValues(new Set([v as T]))}>
                        {mapEntries(props.choices, (key, value) => (
                            <Radio key={key} value={key}>
                                {value}
                            </Radio>
                        ))}
                    </RadioGroup>
                )}

                {props.type === "multiple" && (
                    <CheckboxGroup onChange={(v) => setValues(new Set(v as T[]))}>
                        {mapEntries(props.choices, (key, value) => (
                            <Checkbox key={key} value={key}>
                                {value}
                            </Checkbox>
                        ))}
                    </CheckboxGroup>
                )}

                {error && hint && <div className={styles.hint}>Hint: {hint}</div>}
                {success && !explanation && <div className={styles.hint}>Success</div>}
                {success && explanation && <div className={styles.hint}>Reason: {explanation}</div>}

                <div>
                    <Button isDisabled={values.size === 0} onPress={onSubmit}>
                        Submit
                    </Button>
                </div>
            </div>
        );
    },
);
