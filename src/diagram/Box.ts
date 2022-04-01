export interface Box {
    readonly x: number;
    readonly y: number;
    readonly w: number;
    readonly h: number;
}

export function boxEquals(b1: Box, b2: Box): boolean {
    if (b1 == b2) {
        return true;
    }
    return b1.x === b2.x &&
        b1.y === b2.y &&
        b1.w === b2.w &&
        b1.h === b2.h;
}