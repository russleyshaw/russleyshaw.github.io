import type { MDXComponents } from "mdx/types";
import CodeBlock from "./components/SmartCodeBlock";
import Mermaid from "./components/Mermaid";

import Muted from "./components/Muted";
import Tooltip from "./components/Tooltip";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        pre: (props: any) => {
            if (props.children.type === "code") {
                const language = props.children.props.className?.replace("language-", "");
                const code = props.children.props.children as string;

                if (language === "mermaid") {
                    return <Mermaid code={code} />;
                }

                return <CodeBlock code={code} language={language} />;
            }

            return <pre {...props} />;
        },
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        img: (props: any) => {
            return (
                <div>
                    {/* biome-ignore lint/a11y/useAltText: <explanation> */}
                    <img {...props} />
                    {props.title && <span>{props.title}</span>}
                </div>
            );
        },

        Muted,
        Tooltip,
    };
}
