import { useState } from "react";
import { Variants, motion } from "framer-motion";
import { observer } from "mobx-react";

interface H1Props {
    children: React.ReactNode;
}

export const H1 = observer((props: H1Props) => {
    const [hovered, setHovered] = useState(false);

    const { children } = props;
    if (typeof children !== "string") {
        throw new Error("H1 children must be a string");
    }

    const anchor = getAnchor(children);

    const link = `#${anchor}`;

    return (
        <h1 onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <motion.a
                initial={"hidden"}
                animate={hovered ? "hovered" : "hidden"}
                id={anchor}
                href={link}
            >
                #
            </motion.a>
            {children}
        </h1>
    );
});

function getAnchor(text: string) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/[ ]/g, "-");
}
