export function isNotNil<T>(value: T | null | undefined): value is T {
    return value != null;
}

export function getFirst<T>(items: T[]): T | undefined {
    return items[0];
}

export function mapEntries<T extends string, U, V>(
    obj: Record<T, U>,
    fn: (key: T, value: U) => V,
): V[] {
    return Object.entries(obj).map(([key, value]) => fn(key as T, value as U));
}

export function toggleSet<T>(set: Set<T>, value: T) {
    if (set.has(value)) {
        set.delete(value);
    } else {
        set.add(value);
    }

    return set;
}
