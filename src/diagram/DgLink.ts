import { node } from "../builder/HtmlBuilder";
import { boxCenter } from "./Box";
import { DgDiagram } from "./DgDiagram";
import { DgNode } from "./DgNode";

const SVG_NS = 'http://www.w3.org/2000/svg';

export class DgLink extends HTMLElement {

    static TAG = 'dg-link';

    constructor() {
        super();
    }

    get from(): string {
        return this.getAttribute('from');
    }

    get to(): string {
        return this.getAttribute('to');
    }

    connectedCallback() {
        const dgDiagram = this.getDgDiagram();
        const fromNode = dgDiagram.getNodeById(this.from);
        const toNode = dgDiagram.getNodeById(this.to);
        if (fromNode && toNode) {
            const center1 = boxCenter(fromNode.getBox());
            const center2 = boxCenter(toNode.getBox());

            const left = Math.min(center1.x, center2.x);
            const top = Math.min(center1.y, center2.y);
            const height = center2.y - center1.y;
            const width = center2.x - center1.x;

            const heightMin = Math.max(1, height);
            const widthMin = Math.max(1, width);

            const svg = document.createElementNS(SVG_NS, 'svg');
            svg.style.position = "absolute";
            svg.style.left = center1.x + "px";
            svg.style.top = center1.y + "px";
            svg.style.width = widthMin + "px";
            svg.style.height = heightMin + "px";
            svg.setAttribute("width", widthMin.toString());
            svg.setAttribute("height", heightMin.toString());
            const line = document.createElementNS(SVG_NS, 'line'); 
            line.setAttribute('x1', "0");
            line.setAttribute('x2', width.toString());
            line.setAttribute('y1', "0");
            line.setAttribute('y2', height.toString());
            line.setAttribute('stroke', '#FF0000');
            line.setAttribute('stroke-width', '2');
            svg.appendChild(line);

            const shadow = this.attachShadow({mode: 'closed'});
            shadow.appendChild(svg);
        }
    }
    
    getDgDiagram(from: HTMLElement = this): DgDiagram | undefined {
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