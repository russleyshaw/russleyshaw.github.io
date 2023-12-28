import { useEffect, useState } from "react";

export function useTitle(title: string) {
    useEffect(() => {
        document.title = title;
    }, [title]);
}

export function useOnce<T>(fn: () => T): T {
    const [value] = useState(fn);
    return value;
}

export function getRandElementId(prefix: string) {
    return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}
