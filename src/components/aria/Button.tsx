import { Button as AriaButton, ButtonProps } from "react-aria-components";

export const Button = (props: ButtonProps) => {
    return (
        <AriaButton
            {...props}
            className="border-collapse rounded-md border bg-jet p-2 data-[active=true]:bg-purple"
        />
    );
};
