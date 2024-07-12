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

export function maybeParseInt(value: string) {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? undefined : parsed;
}

export function expectParseInt(value: string) {
    const parsed = Number.parseInt(value, 10);
    if (Number.isNaN(parsed)) {
        throw new Error(`Could not parse integer from "${value}"`);
    }

    return parsed;
}

export function setAdd<T>(set: Set<T>, ...values: T[]) {
    for (const value of values) {
        set.add(value);
    }
    return set;
}

export function expectDefined<T>(value: T | undefined): T {
    if (value == null) {
        throw new Error("Expected value to be defined");
    }

    return value;
}
