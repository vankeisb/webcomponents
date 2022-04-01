import { empty, node } from "../builder/HtmlBuilder";
import { boxCenter, boxIntersection } from "./geometry/Box";
import { DgDiagram } from "./DgDiagram";
import { DgNode } from "./DgNode";
import { Line, lineIntersection } from "./geometry/Line";

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
        const fromBox = fromNode.getBox();
        const toBox = toNode.getBox();
        const center1 = boxCenter(fromBox);
        const center2 = boxCenter(toBox);

        const line: Line = {
            from: center1,
            to: center2,
        }
        const isect1 = boxIntersection(fromBox, line);
        const isect2 = boxIntersection(toBox, line);

        const svgLine = document.createElementNS(SVG_NS, 'line'); 
        svgLine.setAttribute('x1', isect1.x.toString());
        svgLine.setAttribute('x2', isect2.x.toString());
        svgLine.setAttribute('y1', isect1.y.toString());
        svgLine.setAttribute('y2', isect2.y.toString());
        svgLine.setAttribute('stroke', 'black');
        svgLine.setAttribute('stroke-width', '2');
        svgLine.setAttribute('marker-end', 'url(#arrowhead)');

        return svgLine;
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