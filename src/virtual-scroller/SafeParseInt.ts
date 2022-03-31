export function safeParseInt(s:string | null): number {
    const i = parseInt(s);
    if (isNaN(i)) {
        return 0;
    }
    return i;
}