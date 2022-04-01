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
`;

export class DgDiagram extends HTMLElement {

    static TAG = "dg-diagram"

    private linksSvg: SVGElement = document.createElementNS(SVG_NS, 'svg');

    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        
        this.linksSvg.classList.add('dg-links');
        const linksSlot: HTMLSlotElement = slot({ name: "links"})
        this.linksSvg.appendChild(linksSlot);

        const scrollPane = div(
            { className: 'dg-scroll-pane' },
            slot({}),
            this.linksSvg,
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

    getDgLinks(): ReadonlyArray<DgLink> {
        const q = this.querySelectorAll<DgLink>(DgLink.TAG);
        return Array.from(q);
    }

    registerLink(link: DgLink) {
        const line = link.drawLink(this.getNodeById(link.from), this.getNodeById(link.to));
        line.setAttribute("from", link.from);
        line.setAttribute("to", link.to);
        this.linksSvg.appendChild(line);
    }

    registerNode(node: DgNode) {
        node.addEventListener('moved', () => {
            // update all links
            this.linksSvg.querySelectorAll("line")
                .forEach(line => line.remove());
            // add new
            this.getDgLinks()
                .forEach(l => {
                    const line = l.drawLink(this.getNodeById(l.from), this.getNodeById(l.to));
                    this.linksSvg.appendChild(line);
                });
        });
    }

}

customElements.define(DgDiagram.TAG, DgDiagram);