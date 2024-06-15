interface TagButtonProps {
    onClick?: () => void;
    children?: React.ReactNode;
    title?: string;
}

export default function TagButton(props: TagButtonProps) {
    return (
        <button
            onClick={props.onClick}
            type="button"
            title={props.title}
            className="opacity-50 text-xs p-1 rounded-md border border-white hover:bg-white hover:text-black"
        >
            {props.children}
        </button>
    );
}
