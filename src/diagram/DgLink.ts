import {boxCenter, boxIntersection} from "./geometry/Box";
import {DgDiagram} from "./DgDiagram";
import {DgNode} from "./DgNode";
import {Line} from "./geometry/Line";

const SVG_NS = 'http://www.w3.org/2000/svg';

export class DgLink extends HTMLElement {

    static TAG = 'dg-link';

    constructor() {
        super();
    }

    connectedCallback() {
        DgDiagram.getParentDgDiagram(this).registerLink(this);
    }

    // static get observedAttributes() {
    //     return ['selected'];
    // }
    //
    // attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    //     if (oldValue !== null) {
    //         if (name === 'selected') {
    //
    //         }
    //     }
    // }

    draw(): SVGLineElement {
        const diagram = DgDiagram.getParentDgDiagram(this);
        const fromNode: DgNode = diagram.getNodeById(this.from);
        const toNode: DgNode = diagram.getNodeById(this.to);

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

        const fromPoint = isect1 || center1;
        const toPoint = isect2 || center2;

        const svgLine = document.createElementNS(SVG_NS, 'line');
        svgLine.setAttribute('x1', fromPoint.x.toString());
        svgLine.setAttribute('x2', toPoint.x.toString());
        svgLine.setAttribute('y1', fromPoint.y.toString());
        svgLine.setAttribute('y2', toPoint.y.toString());
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

    get selected(): boolean {
        return this.hasAttribute('selected');
    }

    set selected(selected: boolean) {
        if (selected) {
            this.setAttribute('selected', '');
        } else {
            this.removeAttribute('selected');
        }
    }
}

customElements.define(DgLink.TAG, DgLink)
