import { ButtonContext } from "react-aria-components";

interface ButtonGroupProps {
    children?: React.ReactNode;
    isDisabled?: boolean;
}

export function ButtonGroup({ children, isDisabled }: ButtonGroupProps) {
    return (
        <div className="grouped flex border-collapse flex-row">
            <ButtonContext.Provider value={{ isDisabled }}>{children}</ButtonContext.Provider>
        </div>
    );
}
