import { MDXProvider } from "@mdx-js/react";
import type { MDXComponents } from "mdx/types";

import { ReactNode, Suspense, lazy } from "react";

import styles from "./Mdx.module.css";

const Mermaid = lazy(() => import("./Mermaid"));
const CodeBlock = lazy(() => import("./CodeBlock"));

const components: MDXComponents = {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    pre: (props: any) => {
        if (props.children.type === "code") {
            const language = props.children.props.className?.replace("language-", "");
            const code = props.children.props.children as string;

            if (language === "mermaid") {
                return (
                    <Suspense fallback="Loading diagram...">
                        <Mermaid diagram={code} />
                    </Suspense>
                );
            }

            return (
                <Suspense fallback="Loading code block...">
                    <CodeBlock code={code} language={language} />
                </Suspense>
            );
        }

        return <pre {...props} />;
    },
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    img: (props: any) => {
        return (
            <div className={styles.imgContainer}>
                {/* biome-ignore lint/a11y/useAltText: <explanation> */}
                <img {...props} />
                {props.title && <span className={styles.caption}>{props.title}</span>}
            </div>
        );
    },
};
export default (props: { children: ReactNode }) => {
    return (
        <div className={styles.mdxContent}>
            <MDXProvider components={components}>{props.children}</MDXProvider>
        </div>
    );
};
