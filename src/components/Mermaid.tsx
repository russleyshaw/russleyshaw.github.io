import classnames from "classnames";
import mermaid from "mermaid";
import { observer } from "mobx-react";

import { THEME_STORE } from "../models/theme";
import styles from "./Mermaid.module.css";
import { getRandElementId, useOnce } from "../lib/react";
import { useEffect, useState } from "react";
import { autorun } from "mobx";
import Button from "./aria/Button";
import CodeBlock from "./CodeBlock";

export interface MermaidProps {
    diagram: string;
}

autorun(() => {
    mermaid.initialize({
        startOnLoad: false,
        theme: THEME_STORE.isDarkMode ? "dark" : "light",
    });
});

export default observer((props: MermaidProps) => {
    const { diagram } = props;

    const divId = useOnce(() => getRandElementId("mermaid"));
    const [svg, setSvg] = useState<string | null>(null);
    const [divRef, setDivRef] = useState<HTMLDivElement | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        void mermaid.render(divId, diagram).then(({ svg }) => {
            setSvg(svg);
        });
    }, [divRef, diagram, THEME_STORE.isDarkMode]);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.buttons}>
                    <Button className="small" onPress={() => setIsExpanded((v) => !v)}>
                        {isExpanded ? "Collapse" : "Expand"}
                    </Button>
                </div>
                <div ref={setDivRef} id={divId} className={classnames("mermaid")}>
                    {diagram}
                </div>
                {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
                <div className={styles.root} dangerouslySetInnerHTML={{ __html: svg ?? "" }} />
            </div>

            {isExpanded && <CodeBlock code={diagram} actions={false} />}
        </>
    );
});
