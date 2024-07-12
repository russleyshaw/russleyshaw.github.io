"use client";

import mermaid from "mermaid";
import { useEffect, useState } from "react";
mermaid.initialize({
    theme: "dark",
});

export default function Mermaid(props: { code: string }) {
    const [expanded, setExpanded] = useState(false);

    const { code } = props;

    useEffect(() => {
        mermaid.run();
    }, [code, expanded]);

    return (
        <>
            <pre onClick={() => setExpanded(true)} className="mermaid hover:shadow-2xl">
                {props.code}
            </pre>
            {expanded && (
                <div
                    onClick={() => setExpanded(false)}
                    className="fixed top-0 left-0 w-full h-full backdrop-blur"
                >
                    <pre
                        onClick={() => setExpanded(true)}
                        className="mermaid w-full h-full flex flex-col justify-center items-center"
                    >
                        {props.code}
                    </pre>
                </div>
            )}
        </>
    );
}
