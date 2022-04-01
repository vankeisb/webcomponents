import { div, slot, style, text } from "../builder/HtmlBuilder";
import { DgNode } from "./DgNode";

interface DragState {
    readonly refX: number;
    readonly refY: number;
    readonly downX: number;
    readonly downY: number;
    curX: number;
    curY: number;
}

function deltas(ds:DragState) {
    return {
        deltaX: ds.curX - ds.downX,
        deltaY: ds.curY - ds.downY
    }
}

export class DgDraggable extends HTMLElement {

    static TAG = "dg-draggable";

    private dragState: DragState | undefined;

    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open'});
        const domNode = div({ className: 'dg-draggable'}, slot({}));
        shadow.appendChild(domNode);
        shadow.appendChild(
            style({}, text(`
            .dg-draggable {
                cursor: move;
            }
            `))
        );

        const mouseMove = (e: MouseEvent) => {
            if (this.dragState) {
                const { clientX, clientY } = e;
                this.dragState.curX = clientX;
                this.dragState.curY = clientY;
                const { deltaX, deltaY } = deltas(this.dragState); 
                console.log(deltaX, deltaY);
                const dgNode = this.getDgNode();                  
                if (dgNode) {
                    dgNode.x = this.dragState.refX + deltaX;
                    dgNode.y = this.dragState.refY + deltaY;    
                }
            }
        }

        const mouseUp = (e: MouseEvent) => {
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
            this.dragState = undefined;
        }

        domNode.addEventListener('mousedown', e => {
            const { clientX, clientY } = e;
            const dgNode = this.getDgNode();      
            if (dgNode) {
                this.dragState = {
                    downX: clientX,
                    downY: clientY,
                    curX: clientX,
                    curY: clientY,
                    refX: dgNode.x,
                    refY: dgNode.y,
                };
                console.log("mousedown");
                document.addEventListener('mousemove', mouseMove);
                document.addEventListener('mouseup', mouseUp);    
            }
        });
    }

    private getDgNode(from: HTMLElement = this): DgNode | undefined {
        if (from.parentElement instanceof DgNode) {
            return from.parentElement;
        }
        if (from.parentElement) {
            return this.getDgNode(from.parentElement);
        }
        return undefined;
    }


}

customElements.define(DgDraggable.TAG, DgDraggable);