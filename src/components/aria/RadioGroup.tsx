import { observer } from "mobx-react";
import { useCallback } from "react";
import {
    Text,
    FieldError,
    RadioGroup as AriaRadioGroup,
    Label,
    Radio,
} from "react-aria-components";

import style from "./RadioGroup.module.css";

export interface RadioOption<T extends string> {
    value: T;
    label?: React.ReactNode;
}

export interface RadioGroupProps<T extends string> {
    value: T | undefined;
    label?: string;
    description?: string;
    choices: RadioOption<T>[];
    errorMessage?: string;
    disabled?: boolean;

    onChange: (value: T) => void;
}

export const RadioGroup = observer(<T extends string = string>(props: RadioGroupProps<T>) => {
    const { label, description, errorMessage, choices, value, onChange, disabled } = props;

    const onChangeCb = useCallback(
        (v: string) => {
            if (disabled) return;
            onChange(v as T);
        },
        [onChange, disabled],
    );

    return (
        <AriaRadioGroup
            className={style.radioGroup}
            isDisabled={disabled}
            value={value}
            onChange={onChangeCb}
        >
            {label && <Label>{label}</Label>}

            {choices.map(o => (
                <Radio className={style.radio} key={o.value} value={o.value}>
                    {o.label ?? o.value}
                </Radio>
            ))}

            {description && <Text slot="description">{description}</Text>}
            {errorMessage && <FieldError>{errorMessage}</FieldError>}
        </AriaRadioGroup>
    );
});
