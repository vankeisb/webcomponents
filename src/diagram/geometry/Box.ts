import { Line, lineIntersection } from "./Line";
import { Point } from "./Point";

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

export function boxCenter(b: Box): Point {
    return {
        x: b.x + Math.round(b.w / 2),
        y: b.y + Math.round(b.h / 2)
    }
}

function boxToLines(box: Box): ReadonlyArray<Line> {
    const { x, y , w, h } = box;
    return [
        { 
            from: { x, y },
            to: { x: x + w, y}
        },
        { 
            from: { x: x + w, y},
            to: { x: x + w, y: y + h }
        },
        { 
            from: { x: x + w, y: y + h },
            to: { x, y: y + h },
        },
        { 
            from: { x, y: y + h },
            to: { x, y },
        },
    ]
}

export function boxIntersection(box: Box, line: Line): Point | undefined {
    const lines = boxToLines(box);
    for (let i = 0; i < lines.length ; i++) {
        const p = lineIntersection(lines[i], line);
        if (p) {
            return p;
        }
    }
}