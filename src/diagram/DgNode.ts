import { div, slot, style, text } from "../builder/HtmlBuilder";
import { safeParseInt } from "../SafeParseInt";

const css = `
    .dg-node {
        position: absolute;
        display: flex;        
    }
`;

export class DgNode extends HTMLElement {

    static TAG = "dg-node";

    private readonly dgNode: HTMLDivElement;

    constructor() {
        super();
        const shadow = this.attachShadow({mode:'open'});
        this.dgNode = div({className: 'dg-node'}, slot({}));
        shadow.appendChild(this.dgNode);
        shadow.appendChild(style({}, text(css)));
    }

    connectedCallback() {
        this.refreshPosAndSizeFromProps();
    }

    private refreshPosAndSizeFromProps() {
        const s = this.dgNode.style;
        s.left = this.x + "px";
        s.top = this.y + "px";
        s.width = this.w + "px";
        s.height = this.h + "px";
    }

    get x(): number {
        return safeParseInt(this.getAttribute('x'));
    }

    set x(x: number) {
        this.setAttribute('x', x.toString());
        this.refreshPosAndSizeFromProps();
    }

    get y(): number {
        return safeParseInt(this.getAttribute('y'));
    }

    set y(y: number) {
        this.setAttribute('y', y.toString());
        this.refreshPosAndSizeFromProps();
    }

    get h(): number {
        return safeParseInt(this.getAttribute('h'));
    }

    get w(): number {
        return safeParseInt(this.getAttribute('w'));
    }

   

}

customElements.define(DgNode.TAG, DgNode);