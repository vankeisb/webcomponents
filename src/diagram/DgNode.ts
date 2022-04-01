import { div, slot, style, text } from "../builder/HtmlBuilder";
import { safeParseInt } from "../SafeParseInt";

const css = `
    .dg-node {
        position: absolute;
        display: flex;   
        overflow: hidden;    
    }
`;

export class DgNode extends HTMLElement {

    static TAG = "dg-node";

    private readonly dgNode: HTMLDivElement;
    private readonly dgSlot: HTMLSlotElement;

    constructor() {
        super();
        const shadow = this.attachShadow({mode:'open'});
        this.dgSlot = slot({});
        this.dgNode = div({className: 'dg-node'}, this.dgSlot);
        shadow.appendChild(this.dgNode);
        shadow.appendChild(style({}, text(css)));
    }

    connectedCallback() {        
        const s = this.dgNode.style;
        s.left = this.x + "px";
        s.top = this.y + "px";
        s.width = this.w + "px";
        s.height = this.h + "px";
    }

    static get observedAttributes() {
        return ['x', 'y', 'h', 'w'];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        const s = this.dgNode.style;
        switch (name) {
            case 'x': {
                s.left = this.x + 'px';
                break;
            }
            case 'y': {
                s.top = this.y + 'px';
                break;
            }
            case 'w': {
                s.width = this.w + 'px';
                break;
            }
            case 'h': {
                s.height = this.h + 'px';
                break;
            }
            default:
                break;
        }
    }

    get x(): number {
        return safeParseInt(this.getAttribute('x'));
    }

    set x(x: number) {
        this.setAttribute('x', x.toString());
        this.dgNode.style.left = this.x + 'px';
    }

    get y(): number {
        return safeParseInt(this.getAttribute('y'));
    }

    set y(y: number) {
        this.setAttribute('y', y.toString());
        this.dgNode.style.top = this.y + 'px';
    }

    get h(): number {
        return safeParseInt(this.getAttribute('h'));
    }

    get w(): number {
        return safeParseInt(this.getAttribute('w'));
    }

}

customElements.define(DgNode.TAG, DgNode);