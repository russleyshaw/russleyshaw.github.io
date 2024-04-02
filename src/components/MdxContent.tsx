import { MDXProvider } from "@mdx-js/react";
import type { MDXComponents } from "mdx/types";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import { ReactNode, Suspense, lazy, useState } from "react";

import style from "./MdxContent.module.css";
import { FaXmark } from "react-icons/fa6";
import { Button } from "react-aria-components";
import { observer } from "mobx-react";

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
            <div>
                {/* biome-ignore lint/a11y/useAltText: <explanation> */}
                <img {...props} />
                {props.title && <span>{props.title}</span>}
            </div>
        );
    },
};
export default (props: { children: ReactNode }) => {
    return (
        <ErrorBoundary FallbackComponent={ErrorDialog}>
            <div className={style.mdxContent}>
                <MDXProvider components={components}>{props.children}</MDXProvider>
            </div>
        </ErrorBoundary>
    );
};

const ErrorDialog = observer((props: FallbackProps) => {
    const { error } = props;

    const [dismissed, setDismissed] = useState(false);

    if (dismissed) return null;

    return (
        <div className="fixed left-0 top-0 flex h-full w-full flex-col justify-center content-center bg-black/10 backdrop-blur-sm items-center">
            <div className="relative flex max-h-[50%] max-w-[50%] flex-col gap-4 rounded  bg-black/50 p-8">
                <div className="absolute top-0 right-0">
                    <Button
                        className="text-white bg-red-500 p-2 rounded m-4"
                        onPress={() => setDismissed(true)}
                    >
                        <FaXmark />
                    </Button>
                </div>
                <h1 className="text-red-500">Something went wrong!</h1>
                <div>{error.message}</div>
                <div className="overflow-auto text-xs text-red-500">{error.stack}</div>
            </div>
        </div>
    );
});
