import { isValid } from "date-fns";

export function parseDate(d: number | string | null | undefined): Date | null {
    if (d == null) return null;

    const newDate = new Date(d);

    if (!isValid(newDate)) return null;

    return newDate;
}
