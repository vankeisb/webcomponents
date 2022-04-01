import { div, slot, style, text } from "../builder/HtmlBuilder";
import { safeParseInt } from "../SafeParseInt";
import { Box, boxEquals } from "./Box";
import { DgDiagram } from "./DgDiagram";

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
    private mouseDownBox: Box | undefined;

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
        this.addEventListener('mousedown', () => {
            console.log("mousedown", this);
            this.mouseDownBox = this.getBox();
        });
        this.addEventListener('mouseup', () => {
            console.log("mouseup", this);
            if (this.mouseDownBox) {
                if (boxEquals(this.getBox(), this.mouseDownBox)) {
                    this.selected = !this.selected;
                }
            }
            this.mouseDownBox = undefined;
        });
        this.getDgDiagram().registerNode(this);
    }

    getBox(): Box {
        return {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h,
        }
    }

    static get observedAttributes() {
        return ['x', 'y', 'h', 'w'];
    }

    private fireMoved() {
        this.dispatchEvent(
            new CustomEvent(
                'moved',
                { detail: this }
            )
        )
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        const s = this.dgNode.style;
        if (oldValue === newValue) {
            return;
        }
        switch (name) {
            case 'x': {
                s.left = this.x + 'px';
                this.fireMoved();
                break;
            }
            case 'y': {
                s.top = this.y + 'px';
                this.fireMoved();
                break;
            }
            case 'w': {
                s.width = this.w + 'px';
                this.fireMoved();
                break;
            }
            case 'h': {
                s.height = this.h + 'px';
                this.fireMoved();
                break;
            }
            default:
                break;
        }
    }

    get id(): string {
        return this.getAttribute('id');
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

    get selected() {
        return this.hasAttribute('selected');
    }

    set selected(s: boolean) {
        if (s) {
            this.setAttribute('selected', '');            
        } else {
            this.removeAttribute('selected');
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

customElements.define(DgNode.TAG, DgNode);