import classnames from "classnames";
import mermaid from "mermaid";
import { observer } from "mobx-react";

import { getRandElementId, useOnce } from "../lib/react";
import { useEffect, useState } from "react";
import { Button } from "./aria/Button";
import CodeBlock from "./CodeBlock";
import { motion } from "framer-motion";

export interface MermaidProps {
    diagram: string;
}

mermaid.initialize({
    theme: "dark",
});

export default observer((props: MermaidProps) => {
    const { diagram } = props;

    const divId = useOnce(() => getRandElementId("mermaid"));
    const [svg, setSvg] = useState<string | null>(null);
    const [divRef, setDivRef] = useState<HTMLDivElement | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [hovered, setHovered] = useState(false);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        void mermaid.render(divId, diagram).then(({ svg }) => {
            setSvg(svg);
        });
    }, [divRef, diagram]);

    return (
        <>
            <div
                className="relative"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: hovered || isExpanded ? 1 : 0,
                    }}
                    transition={{
                        duration: 0.2,
                    }}
                    className="absolute bottom-0 right-0 text-xs"
                >
                    <Button onPress={() => setIsExpanded((v) => !v)}>
                        {isExpanded ? "Collapse" : "Expand"}
                    </Button>
                </motion.div>
                <div ref={setDivRef} id={divId} className={classnames("mermaid")}>
                    {diagram}
                </div>
                {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
                <div dangerouslySetInnerHTML={{ __html: svg ?? "" }} />
            </div>

            {isExpanded && <CodeBlock code={diagram} actions={false} />}
        </>
    );
});
