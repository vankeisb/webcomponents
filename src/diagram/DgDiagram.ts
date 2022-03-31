import { div, slot, style, text } from "../builder/HtmlBuilder";

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
    .dg-content-pane {
        background-color: lightgrey;
        position: relative;
    }
`;

export class DgDiagram extends HTMLElement {

    static TAG = "dg-diagram"

    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const contentPane = div(
            { className: 'dg-content-pane' }, 
            slot({})
        );
        const scrollPane = div(
            { className: 'dg-scroll-pane' },
            contentPane
        );
        shadow.appendChild(scrollPane);
        shadow.appendChild(style({}, text(diagStyles)));
    }    

    connectedCallback() {
    }

}

customElements.define(DgDiagram.TAG, DgDiagram);