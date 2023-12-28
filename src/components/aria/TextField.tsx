import {
    TextField as AriaTextField,
    TextFieldProps as AriaTextFieldProps,
    Label,
    Input,
} from "react-aria-components";

import "./TextField.css";

interface TextFieldProps extends AriaTextFieldProps {
    label?: string;
}

export default function TextField(props: TextFieldProps) {
    const { value, label } = props;

    return (
        <AriaTextField {...props}>
            {label != null && <Label>{label}</Label>}
            <Input value={value} />
        </AriaTextField>
    );
}
