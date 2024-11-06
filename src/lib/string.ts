/**
 * Split a string into lines
 * @param code - The string to split
 * @returns An array of lines
 */
export function splitLines(code: string) {
    return code.split(/\r?\n/);
}
