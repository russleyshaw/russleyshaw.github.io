import { CodeBlock } from "../components/CodeBlock";
import { makeBlogPost } from "../lib/blog";

export default function HeadTailPost() {
    return (
        <div>
            <h1>Friday TypeScript Facts!</h1>
            <p>
                TypeScript treats array indexes as always defined. Same with destructuring. One
                issue encountered in Partcaster was we were expecting a first element and captured
                the rest in a seperate value
            </p>
            <code>{`const [first, ...rest] = values;`}</code>
            However, in this case values was <code>{`[]`}</code> so first was undefined and rest was{" "}
            <code>{`[]`}</code>. To prevent this, write a simple getHeadTail() function that treats
            the first element as undefined.
            <CodeBlock
                code={`

function getHeadTail<T>(items: T[]): [T | undefined, T[]] {
    const [first, ...rest] = items;
    return [first, rest];
}
`}
            />
            const [first, rest] = getHeadTail([1, 2, 3]); first; // 1; tail; [2, 3] Or consider
            using arr.at(number) which treats its return result as T | undefined. It accepts
            negative values so you can do arr.at(-1) to get the last element or arr.at(0) to get the
            first element.
        </div>
    );
}
