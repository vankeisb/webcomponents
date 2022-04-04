export interface MouseDrag {
    readonly downX: number;
    readonly downY: number;
    curX: number;
    curY: number;
}

export function newMouseDrag(e: MouseEvent): MouseDrag {
    const { clientX, clientY } = e;
    return {
        downX: clientX,
        downY: clientY,
        curX: clientX,
        curY: clientY,
    }
}

export function dragDeltas(d: MouseDrag): { dx: number, dy: number } {
    return {
        dx: d.curX - d.downX,
        dy: d.curY - d.downY,
    }
}

export function dragUpdate(d: MouseDrag, e: MouseEvent) {
    d.curX = e.clientX;
    d.curY = e.clientY;
}

