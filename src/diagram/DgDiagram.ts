import { div, slot, style, text } from "../builder/HtmlBuilder";
import { DgLink } from "./DgLink";
import { DgNode } from "./DgNode";

const SVG_NS = 'http://www.w3.org/2000/svg';

const diagStyles = `
    .dg-diagram {
        height: 100%;
        position: relative;
    }
    .dg-scroll-pane {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        overflow: auto;
    }
    .dg-links {
        width: 100%;
        height: 100%;
    }
    .dg-content-pane {
        background-color: lightgrey;
        position: relative;
    }

    #arrowhead {
        fill: black;
    }

    #arrowhead-selected {
        fill: lightgreen;
    }

    .dg-link-line {
        stroke: black;
        cursor: pointer;
    }

    .dg-link-line.dg-selected {
        stroke: lightgreen;
    }
`;

const svgDefs = `
<marker id="arrowhead" markerWidth="10" markerHeight="7" 
refX="9" refY="3.5" orient="auto">
    <polygon points="0 0, 10 3.5, 0 7" />
</marker>
<marker id="arrowhead-selected" markerWidth="10" markerHeight="7" 
refX="9" refY="3.5" orient="auto">
    <polygon points="0 0, 10 3.5, 0 7" />
</marker>
`

export class DgDiagram extends HTMLElement {

    static TAG = "dg-diagram"

    private readonly linksSvg: SVGElement = document.createElementNS(SVG_NS, 'svg');

    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});

        this.linksSvg.classList.add('dg-links');
        const defs: SVGDefsElement = document.createElementNS(SVG_NS, 'defs');
        defs.innerHTML = svgDefs;
        this.linksSvg.appendChild(defs);

        const scrollPane = div(
            { className: 'dg-scroll-pane' },
            this.linksSvg,
            slot({}),
        );

        shadow.appendChild(scrollPane);
        shadow.appendChild(style({}, text(diagStyles)));
    }

    connectedCallback() {
    }

    getDgNodes(): ReadonlyArray<DgNode> {
        const q = this.querySelectorAll<DgNode>(DgNode.TAG);
        return Array.from(q);
    }

    getNodeById(id: string): DgNode | undefined {
        return this.getDgNodes().find(n => n.id === id);
    }

    private getDgLinks(): ReadonlyArray<DgLink> {
        const q = this.querySelectorAll<DgLink>(DgLink.TAG);
        return Array.from(q);
    }

    registerLink(link: DgLink) {
        link.setLinksSvg(this.linksSvg);
        link.draw();
    }

    private clearLink(link: DgLink) {
        Array.from(this.linksSvg.querySelectorAll("line"))
            .filter(l => 
                l.getAttribute('data-from') === link.from 
                    && l.getAttribute('data-to') === link.to
            )
            .forEach(l => l.remove());
    }

    registerNode(node: DgNode) {
        node.addEventListener('moved', () => {
            // update links connected to this node
            this.getDgLinks()
                .forEach(dgLink => {
                    if (dgLink.from === node.id || dgLink.to === node.id) {
                        dgLink.draw();
                    }
                });
        });
    }

    static getParentDgDiagram(from: HTMLElement): DgDiagram | undefined {
        if (from.parentElement instanceof DgDiagram) {
            return from.parentElement;
        }
        if (from.parentElement) {
            return DgDiagram.getParentDgDiagram(from.parentElement);
        }
        return undefined;
    }

}

customElements.define(DgDiagram.TAG, DgDiagram);
