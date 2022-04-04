import { div, slot, style, text } from "../builder/HtmlBuilder";
import { DgNode } from "./DgNode";
import {dragDeltas, dragUpdate, MouseDrag, newMouseDrag} from "./MouseDrag";

interface DragState {
    readonly refX: number;
    readonly refY: number;
    mouseDrag: MouseDrag;

}

export class DgDraggable extends HTMLElement {

    static TAG = "dg-draggable";

    private dragState: DragState | undefined;

    constructor() {
        super();

        const mouseMove = (e: MouseEvent) => {
            if (this.dragState) {
                dragUpdate(this.dragState.mouseDrag, e);
                const { dx, dy } = dragDeltas(this.dragState.mouseDrag);
                const dgNode = DgNode.getParentDgNode(this);
                if (dgNode) {
                    dgNode.x = this.dragState.refX + dx;
                    dgNode.y = this.dragState.refY + dy;
                }
            }
        }

        const mouseUp = (e: MouseEvent) => {
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
            this.dragState = undefined;
        }

        this.addEventListener('mousedown', e => {
            const { clientX, clientY } = e;
            const dgNode = DgNode.getParentDgNode(this);
            if (dgNode) {
                this.dragState = {
                    mouseDrag: newMouseDrag(e),
                    refX: dgNode.x,
                    refY: dgNode.y,
                };
                document.addEventListener('mousemove', mouseMove);
                document.addEventListener('mouseup', mouseUp);
            }
        });
    }
}

customElements.define(DgDraggable.TAG, DgDraggable);
