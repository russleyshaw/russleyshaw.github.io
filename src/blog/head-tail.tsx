import { observer } from "mobx-react";
import Code from "../components/Code";
import { CodeBlock } from "../components/CodeBlock";

export default observer(() => {
    return (
        <>
            <p>
                TypeScript treats array indexes as always defined. Same with destructuring. One
                issue encountered in Partcaster was we were expecting a first element and captured
                the rest in a seperate value
            </p>
            <Code c="const [first, ...rest] = values;" />
            <p>
            However, in this case values was <Code c="[]" /> so first was undefined and rest was{" "}
            <Code c="[]"/>. To prevent this, write a simple getHeadTail() function that treats
            the first element as undefined.
            </p>
            <CodeBlock
                code={`

function getHeadTail<T>(items: T[]): [T | undefined, T[]] {
    const [first, ...rest] = items;
    return [first, rest];
}

const [first, rest] = getHeadTail([1, 2, 3]);
console.log(first, rest); // 1, [2, 3]
            `}/>
            <p>
            Or consider using <Code c="arr.at(number)"/> which treats its return result as <Code c="T | undefined"/>. It accepts
            negative values so you can do <Code c="arr.at(-1)"/> to get the last element or <Code c="arr.at(0)" /> to get the
            first element.
            </p>

            
        </>
    );
});
