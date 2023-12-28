import { ButtonContext } from "react-aria-components";

import styles from "./ButtonGroup.module.css";

interface ButtonGroupProps {
    children?: React.ReactNode;
    isDisabled?: boolean;
}

function ButtonGroup({ children, isDisabled }: ButtonGroupProps) {
    return (
        <div className={styles.root} style={{ display: "flex", gap: 8 }}>
            <ButtonContext.Provider value={{ isDisabled }}>{children}</ButtonContext.Provider>
        </div>
    );
}
