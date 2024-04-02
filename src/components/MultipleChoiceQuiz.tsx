import { observer } from "mobx-react";
import { useState } from "react";

import { Button } from "./aria/Button";
import { RadioGroup } from "./aria/RadioGroup";
import { CheckboxGroup, CheckboxOption } from "./aria/CheckboxGroup";

import { getFirst } from "../lib/common";

import { FaCircleCheck, FaCircleQuestion, FaCircleXmark } from "react-icons/fa6";

interface BaseProps<T_AnswerKey extends string> {
    title?: string;
    hint?: string;
    explanation?: string;

    choices: CheckboxOption<T_AnswerKey>[];

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
                if (props.answer.every(a => values.has(a))) {
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
            <div className="flex flex-col bg-raisin p-4">
                <div
                    className="flex flex-row items-center gap-2 text-2xl data-[status=error]:text-red-500 data-[status=success]:text-green-500"
                    data-status={status}
                >
                    {headerIcon}
                    <span>{myTitle}</span>
                </div>
                <div>{children}</div>

                {props.type === "single" && (
                    <RadioGroup<T>
                        value={[...values][0]}
                        choices={choices}
                        onChange={v => setValues(new Set([v as T]))}
                    />
                )}

                {props.type === "multiple" && (
                    <CheckboxGroup<T>
                        values={[...values]}
                        onChange={v => setValues(new Set(v as T[]))}
                        choices={choices}
                    />
                )}

                {error && hint && <div>Hint: {hint}</div>}
                {success && explanation && <div>Reason: {explanation}</div>}

                <div className="mt-2">
                    <Button isDisabled={values.size === 0} onPress={onSubmit}>
                        Submit
                    </Button>
                </div>
            </div>
        );
    },
);
