import {safeParseInt} from "../SafeParseInt";
import {DgNode} from "./DgNode";
import {div, empty, px, slot, style, text} from "../builder/HtmlBuilder";

const MIN_SIZE = 10;
const BORDER_SIZE = 2;

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
    readonly refW: number;
    readonly refH: number;
    readonly downX: number;
    readonly downY: number;
    curX: number;
    curY: number;
    readonly mode: DragMode;
}

function deltas(ds:ResizeState) {
    return {
        deltaX: ds.curX - ds.downX,
        deltaY: ds.curY - ds.downY
    }
}

export class DgResizeable extends HTMLElement {

    static TAG = 'dg-resizeable';

    private readonly shadow: ShadowRoot;
    private readonly reElems: ReadonlyArray<HTMLDivElement>;

    private dragState: ResizeState | undefined;

    private docMouseMove = (e: MouseEvent) => {
        if (this.dragState) {
            const { clientX, clientY } = e;
            this.dragState.curX = clientX;
            this.dragState.curY = clientY;
            const { deltaX, deltaY } = deltas(this.dragState);
            console.log("moved", deltaX, deltaY);

        }
    }

    private docMouseUp = (e: MouseEvent) => {
        console.log("up !");
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

        const reLeft = div({ className: 'dg-resize-elem '});
        reLeft.style.top = "2px";
        reLeft.style.bottom = "2px";
        reLeft.style.left = "0";
        reLeft.style.width = "2px";
        reLeft.style.cursor = "ew-resize";

        const reRight = div({ className: 'dg-resize-elem '});
        reRight.style.top = "2px";
        reRight.style.bottom = "2px";
        reRight.style.right = "0";
        reRight.style.width = "2px";
        reRight.style.cursor = "ew-resize";

        const reTopLeft = div({ className: 'dg-resize-elem '});
        reTopLeft.style.top = "0";
        reTopLeft.style.left = "0";
        reTopLeft.style.width = "2px";
        reTopLeft.style.height = "2px";
        reTopLeft.style.cursor = "nwse-resize";

        const reTopRight = div({ className: 'dg-resize-elem '});
        reTopRight.style.top = "0";
        reTopRight.style.right = "0";
        reTopRight.style.width = "2px";
        reTopRight.style.height = "2px";
        reTopRight.style.cursor = "nesw-resize";

        const reBottomLeft = div({ className: 'dg-resize-elem '});
        reBottomLeft.style.bottom = "0";
        reBottomLeft.style.left = "0";
        reBottomLeft.style.width = "2px";
        reBottomLeft.style.height = "2px";
        reBottomLeft.style.cursor = "nesw-resize";

        const reBottomRight = div({ className: 'dg-resize-elem '});
        reBottomRight.style.bottom = "0";
        reBottomRight.style.right = "0";
        reBottomRight.style.width = "2px";
        reBottomRight.style.height = "2px";
        reBottomRight.style.cursor = "nwse-resize";

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
            const { clientX, clientY } = e;
            const dgNode = DgNode.getParentDgNode(this);
            if (dgNode) {
                this.dragState = {
                    mode,
                    downX: clientX,
                    downY: clientY,
                    curX: clientX,
                    curY: clientY,
                    refW: dgNode.w,
                    refH: dgNode.h,
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


    // private addResizeElems() {
    //     empty(this.shadow);
    //     const dgNode = DgNode.getParentDgNode(this);
    //     const { x, y, w, h } = dgNode;
    //     if (w >= MIN_SIZE && h >= MIN_SIZE) {
    //         const leftTopDiv = div({
    //             className: 'dg-resizer-left-top',
    //             style: {
    //                 // backgroundColor: 'red',
    //                 position: 'absolute',
    //                 left: px(x),
    //                 top: px(y),
    //                 height: px(2),
    //                 width: px(2)
    //             }
    //         });
    //         // this.shadow.appendChild(leftTopDiv);
    //         // const leftDiv = div({ className: 'dg-resizer-left'});
    //     }
    //
    // }

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
