interface TagProps {
    children?: React.ReactNode;
}

export default function Tag(props: TagProps) {
    return <div className="text-xs p-1 rounded border border-white">{props.children}</div>;
}
