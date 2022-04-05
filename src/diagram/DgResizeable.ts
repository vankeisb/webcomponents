import {safeParseInt} from "../SafeParseInt";
import {DgNode} from "./DgNode";
import {div, empty, px, slot, style, text} from "../builder/HtmlBuilder";
import {dragDeltas, dragUpdate, MouseDrag, newMouseDrag} from "./MouseDrag";

type DragMode =
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'

interface ResizeState {
    readonly refX: number;
    readonly refY: number;
    readonly refW: number;
    readonly refH: number;
    readonly mode: DragMode;
    mouseDrag: MouseDrag;
}

const MIN_SIZE = 10;

export class DgResizeable extends HTMLElement {

    static TAG = 'dg-resizeable';

    private readonly shadow: ShadowRoot;
    private readonly reElems: ReadonlyArray<HTMLDivElement>;

    private dragState: ResizeState | undefined;

    private docMouseMove = (e: MouseEvent) => {
        if (this.dragState) {
            const dgNode = DgNode.getParentDgNode(this);
            if (dgNode) {
                dragUpdate(this.dragState.mouseDrag, e);
                const { dx, dy } = dragDeltas(this.dragState.mouseDrag);
                switch (this.dragState.mode) {
                    case "top": {
                        const { refY, refH } = this.dragState;
                        const newY = refY + dy;
                        const newH = refH - dy;
                        if (newH < MIN_SIZE) {
                            return;
                        }
                        dgNode.y = newY;
                        dgNode.h = newH;
                        break;
                    }
                    case "bottom": {
                        const { refH } = this.dragState;
                        const newH = refH + dy;
                        if (newH < MIN_SIZE) {
                            return;
                        }
                        dgNode.h = newH;
                        break;
                    }
                    case "left": {
                        const { refX, refW } = this.dragState;
                        const newX = refX + dx;
                        const newW = refW - dx;
                        if (newW < MIN_SIZE) {
                            return;
                        }
                        dgNode.x = newX;
                        dgNode.w = newW;
                        break;
                    }
                    case "right": {
                        const { refW } = this.dragState;
                        const newW = refW + dx;
                        if (newW < MIN_SIZE) {
                            return;
                        }
                        dgNode.w = newW;
                        break;
                    }
                    case "top-left": {
                        const { refX, refW, refY, refH } = this.dragState;
                        let newY = refY + dy;
                        let newH = refH - dy;
                        if (newH < MIN_SIZE) {
                            newH = MIN_SIZE;
                            const deltaH = newH - refH;
                            newY = refY - deltaH;
                        }
                        let newX = refX + dx;
                        let newW = refW - dx;
                        if (newW < MIN_SIZE) {
                            newW = MIN_SIZE;
                            const deltaW = newW - refW;
                            newX = refX - deltaW;
                        }
                        dgNode.y = newY;
                        dgNode.h = newH;
                        dgNode.x = newX;
                        dgNode.w = newW;
                        break;
                    }
                    // TODO other resize modes...
                }
            }
        }
    }

    private docMouseUp = () => {
        document.removeEventListener('mousemove', this.docMouseMove);
        document.removeEventListener('mouseup', this.docMouseUp);
    }

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.appendChild(slot({}));

        const reTop = div({ className: 'dg-resize-elem '});
        reTop.style.top = "0";
        reTop.style.left = "2px";
        reTop.style.right = "2px";
        reTop.style.height = "2px";
        reTop.style.cursor = "ns-resize";
        reTop.addEventListener('mousedown', this.onReMouseDown('top'));

        const reBottom = div({ className: 'dg-resize-elem '});
        reBottom.style.bottom = "0";
        reBottom.style.left = "2px";
        reBottom.style.right = "2px";
        reBottom.style.height = "2px";
        reBottom.style.cursor = "ns-resize";
        reBottom.addEventListener('mousedown', this.onReMouseDown('bottom'));

        const reLeft = div({ className: 'dg-resize-elem '});
        reLeft.style.top = "2px";
        reLeft.style.bottom = "2px";
        reLeft.style.left = "0";
        reLeft.style.width = "2px";
        reLeft.style.cursor = "ew-resize";
        reLeft.addEventListener('mousedown', this.onReMouseDown('left'));

        const reRight = div({ className: 'dg-resize-elem '});
        reRight.style.top = "2px";
        reRight.style.bottom = "2px";
        reRight.style.right = "0";
        reRight.style.width = "2px";
        reRight.style.cursor = "ew-resize";
        reRight.addEventListener('mousedown', this.onReMouseDown('right'));

        const reTopLeft = div({ className: 'dg-resize-elem '});
        reTopLeft.style.top = "0";
        reTopLeft.style.left = "0";
        reTopLeft.style.width = "2px";
        reTopLeft.style.height = "2px";
        reTopLeft.style.cursor = "nwse-resize";
        reTopLeft.addEventListener('mousedown', this.onReMouseDown('top-left'));

        const reTopRight = div({ className: 'dg-resize-elem '});
        reTopRight.style.top = "0";
        reTopRight.style.right = "0";
        reTopRight.style.width = "2px";
        reTopRight.style.height = "2px";
        reTopRight.style.cursor = "nesw-resize";
        reTopRight.addEventListener('mousedown', this.onReMouseDown('top-right'));

        const reBottomLeft = div({ className: 'dg-resize-elem '});
        reBottomLeft.style.bottom = "0";
        reBottomLeft.style.left = "0";
        reBottomLeft.style.width = "2px";
        reBottomLeft.style.height = "2px";
        reBottomLeft.style.cursor = "nesw-resize";
        reBottomLeft.addEventListener('mousedown', this.onReMouseDown('bottom-left'));

        const reBottomRight = div({ className: 'dg-resize-elem '});
        reBottomRight.style.bottom = "0";
        reBottomRight.style.right = "0";
        reBottomRight.style.width = "2px";
        reBottomRight.style.height = "2px";
        reBottomRight.style.cursor = "nwse-resize";
        reBottomRight.addEventListener('mousedown', this.onReMouseDown('bottom-right'));

        this.reElems = [
            reTopLeft,
            reTop,
            reTopRight,
            reRight,
            reBottomRight,
            reBottom,
            reBottomLeft,
            reLeft
        ]

        this.shadow.appendChild(
            style(
                {},
                text(`
                    .dg-resize-elem {
                        background-color: red;        
                        position: absolute; 
                    }
                `))
        )

        this.addEventListener('mouseenter', () =>
            this.addResizeElems()
        );
        this.addEventListener('mouseleave', () =>
            this.removeResizeElems()
        );
    }

    private onReMouseDown(mode: DragMode): (e:MouseEvent) => void {
        return e => {
            const dgNode = DgNode.getParentDgNode(this);
            if (dgNode) {
                this.dragState = {
                    mouseDrag: newMouseDrag(e),
                    mode,
                    refW: dgNode.w,
                    refH: dgNode.h,
                    refX: dgNode.x,
                    refY: dgNode.y,
                };
                document.addEventListener('mousemove', this.docMouseMove);
                document.addEventListener('mouseup', this.docMouseUp);
            }
        }
    }

    private addResizeElems() {
        this.reElems.forEach(e => this.shadow.appendChild(e));
    }

    private removeResizeElems() {
        this.reElems.forEach(e => this.shadow.removeChild(e));
    }

    get height(): number {
        return safeParseInt(this.getAttribute('height'));
    }

    set height(height: number) {
        this.setAttribute('height', height.toString());
    }

    get width(): number {
        return safeParseInt(this.getAttribute('height'));
    }

    set width(width: number) {
        this.setAttribute('width', width.toString());
    }

}

customElements.define(DgResizeable.TAG, DgResizeable);
