import { observer } from "mobx-react";
import Code from "../components/Code";
import { CodeBlock } from "../components/CodeBlock";
import { Emphasis } from "../components/Emphasis";
import { Card } from "@blueprintjs/core";

export default observer(() => {
    return (
        <>
            <p>
                Type inference in TypeScript is very powerful. In a perfect world, TypeScript would
                be smart enough to infer everything with as little explicit typing as possible.
                Unfortunately, reality is a cruel mistress. Sometimes we need to give the compiler a
                helping hand.
            </p>

            <p>
                A common operation performed is filtering out <Code c="null" /> and{" "}
                <Code c="undefined" /> values from an array. Typically, this might be done like so:
            </p>
            <CodeBlock
                code={`
const arr = [0, 1, 2, null, "foo", undefined, 3, 4, 5];

const result = arr.filter(v => v != null);
        `}
            />
            <p>
                However, the type of <Code c="result" /> is{" "}
                <Code c="(string | number | null | undefined)[]" />. Given all the context provided,
                it is impossible for null or undefined to exist in this array. What we really want
                is the result to be
                <Code c="(string | number)[]" />. Typescript is not smart enough to infer that the
                only possible results from the filter are non-nullable.
            </p>

            <p>
                When the inferencing ability of TypeScript is not smart enough to follow the logic
                of otherwise fully reasonable and typed code, I call this:
            </p>

            <Card>
                <Emphasis>type decontextualization: [verb]</Emphasis> - The act of TypeScript
                inferring a type that is technically correct, but not the most restrictive type
                possible, given all dependent types.
            </Card>

            <p>
                The solution here is to reduce the scope of the decontextualization as much as
                possible by compsing the decontexualization into a function with a semantic meaning
                that forces the types to be recontexualized. In non jargon: wrap the parts of
                Typescript that fail you in small utility functions that force the correct type.
            </p>

            <p>
                In the example above, we can recontextualize the <Code c="v != null" /> operation
                into a function called <Code c="isNotNil" /> that forces/asserts the types
                appropriately.
            </p>
            <CodeBlock
                code={`
arr.filter(v => v != null);
// [0, 1, 2, "foo", 3, 4, 5]

arr.filter(Boolean);
// [1, 2, "foo", 3, 4, 5]

// Return true if not null nor undefined
function isNotNil<T>(value: T | null | undefined): value is T {
    return value != null;
}

arr.filter(isNotNil);
// [0, 1, 2, "foo", 3, 4, 5]
            `}
            />
            <p>
                Now, we have a function that more explicitly declares the intended type lost by
                TypeScript, but also it has a more meaningful name.
            </p>
        </>
    );
});
