import { empty, node } from "../builder/HtmlBuilder";
import { boxCenter } from "./geometry/Box";
import { DgDiagram } from "./DgDiagram";
import { DgNode } from "./DgNode";

const SVG_NS = 'http://www.w3.org/2000/svg';

export class DgLink extends HTMLElement {

    static TAG = 'dg-link';

    constructor() {
        super();
    }

    connectedCallback() {        
       this.getDgDiagram().registerLink(this);
    }

    drawLink(fromNode: DgNode, toNode: DgNode): SVGLineElement {
        const center1 = boxCenter(fromNode.getBox());
        const center2 = boxCenter(toNode.getBox());
        const line = document.createElementNS(SVG_NS, 'line'); 
        line.setAttribute('x1', center1.x.toString());
        line.setAttribute('x2', center2.x.toString());
        line.setAttribute('y1', center1.y.toString());
        line.setAttribute('y2', center2.y.toString());
        line.setAttribute('stroke', '#FF0000');
        line.setAttribute('stroke-width', '2');
        return line;
    }

    get from(): string {
        return this.getAttribute('from');
    }

    get to(): string {
        return this.getAttribute('to');
    }
    
    private getDgDiagram(from: HTMLElement = this): DgDiagram | undefined {
        if (from.parentElement instanceof DgDiagram) {
            return from.parentElement;
        }
        if (from.parentElement) {
            return this.getDgDiagram(from.parentElement);
        }
        return undefined;
    }

}

customElements.define(DgLink.TAG, DgLink)