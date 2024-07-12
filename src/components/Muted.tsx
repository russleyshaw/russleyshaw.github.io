export default function Muted(props: { children: React.ReactNode }) {
    return <span className="opacity-50 text-xs">{props.children}</span>;
}
