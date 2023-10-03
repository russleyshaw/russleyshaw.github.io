/**
 * Remove all empty lines from the beginning and end of a string.
 * @param text
 * @returns
 */
export function trimLines(text: string) {
    return text.replace(/^\s*\n/, "").replace(/\n\s*$/, "");
}
