import { div, slot } from "../builder/HtmlBuilder";

const css = `
    .dg-node {
        position: absolute;
        top: 100px;
    }
`;


export class DgNode extends HTMLElement {

    static TAG = "dg-node";

    constructor() {
        super();
        this
            .attachShadow({mode:'open'})
            .appendChild(
                div(
                    {
                        className: 'dg-node'
                    },
                    slot({})
                )
            )
    }

    connectedCallback() {

    }

}

customElements.define(DgNode.TAG, DgNode);