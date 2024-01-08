interface TagProps {
    children: React.ReactNode;
}

export function Tag(props: TagProps) {
    return <div className="rounded-md border bg-jet px-2 py-1 text-xs">{props.children}</div>;
}
