import { Checkbox as AriaCheckbox } from "react-aria-components";

import style from "./Checkbox.module.css";
import { observer } from "mobx-react";

export interface CheckboxProps {
    children?: React.ReactNode;
    disabled?: boolean;
    checked?: boolean;
    value?: string;
    onChange?: (checked: boolean) => void;
}

export const Checkbox = observer((props: CheckboxProps) => {
    const { children, disabled, checked, onChange, value } = props;
    return (
        <AriaCheckbox
            isDisabled={disabled}
            value={value}
            isSelected={checked}
            onChange={v => onChange?.(v)}
            className={style.input}
        >
            <>
                <div className={style.checkbox}>
                    <svg viewBox="0 0 18 18" aria-hidden="true">
                        <polyline points="1 9 7 14 15 4" />
                    </svg>
                </div>
                {children}
            </>
        </AriaCheckbox>
    );
});
