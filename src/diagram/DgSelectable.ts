import { div, slot, style, text } from "../builder/HtmlBuilder";
import { DgDiagram } from "./DgDiagram";
import { DgNode } from "./DgNode";

export class DgSelectable extends HTMLElement {

    static TAG = "dg-selectable";

    constructor() {
        super();
        const shadow = this.attachShadow({mode:'open'});
        const domNode = div(
            { className: 'dg-selectable' },
            slot({})
        );
        shadow.appendChild(domNode);
        shadow.appendChild(
            style({}, text(`
                .dg-selectable {
                    cursor: pointer;
                    display: flex;
                    height: 100%;
                }
            `))
        );        
    }

    connectedCallback() {
        this.addEventListener('click', () => {
            this.selected = !this.selected;
        });
    }

    get selected() {
        return this.hasAttribute('selected');
    }

    set selected(s: boolean) {
        if (s) {
            this.setAttribute('selected', '');            
        } else {
            this.removeAttribute('selected');
        }
    }

    // private getDgNode(from: HTMLElement = this): DgNode | undefined {
    //     if (from.parentElement instanceof DgNode) {
    //         return from.parentElement;
    //     }
    //     if (from.parentElement) {
    //         return this.getDgNode(from.parentElement);
    //     }
    //     return undefined;
    // }

}

customElements.define(DgSelectable.TAG, DgSelectable);