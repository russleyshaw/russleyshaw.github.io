import type { MDXComponents } from "mdx/types";
import { Suspense } from "react";
import CodeBlock from "./components/SmartCodeBlock";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        pre: (props: any) => {
            if (props.children.type === "code") {
                const language = props.children.props.className?.replace("language-", "");
                const code = props.children.props.children as string;

                return (
                    <Suspense
                        fallback={
                            <pre>
                                <code>{code}</code>
                            </pre>
                        }
                    >
                        <CodeBlock code={code} language={language} />
                    </Suspense>
                );
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
    };
}
