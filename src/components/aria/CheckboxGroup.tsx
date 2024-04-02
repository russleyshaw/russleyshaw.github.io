import {
    CheckboxGroup as AriaCheckboxGroup,
    Checkbox,
    FieldError,
    Label,
    Text,
} from "react-aria-components";

import style from "./CheckboxGroup.module.css";

export interface CheckboxOption<T extends string> {
    value: T;
    label?: React.ReactNode;
}

export interface CheckboxProps<T extends string> {
    label?: React.ReactNode;
    description?: string;
    errorMessage?: string;

    choices: CheckboxOption<T>[];

    values?: T[];
    onChange?: (values: T[]) => void;
}

import styles from "./Checkbox.module.css";
import { observer } from "mobx-react";

export const CheckboxGroup = observer(<T extends string>(props: CheckboxProps<T>) => {
    const { label, description, errorMessage, choices, values, onChange } = props;

    return (
        <AriaCheckboxGroup value={values} onChange={v => onChange?.(v as T[])}>
            {label && <Label>{label}</Label>}

            {choices.map(o => (
                <Checkbox className={styles.checkbox} key={o.value} value={o.value}>
                    {o.label ?? o.value}
                </Checkbox>
            ))}

            {description && <Text slot="description">{description}</Text>}
            {errorMessage && <FieldError>{errorMessage}</FieldError>}
        </AriaCheckboxGroup>
    );
});
