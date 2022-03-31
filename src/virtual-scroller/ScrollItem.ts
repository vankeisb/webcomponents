import { div, slot } from "../builder/HtmlBuilder";
import { safeParseInt } from "./SafeParseInt";

export class ScrollItem extends HTMLElement {

    static TAG_NAME = "scroll-item";

    private readonly wrapper: HTMLDivElement;

    constructor() {
        super();        
        this.wrapper = div(
            {
            }, 
            slot({})
        );
        this.attachShadow({mode:'open'}).appendChild(this.wrapper);
    }

    connectedCallback() {
        debugger;
        this.wrapper.style.position = "absolute";
        this.wrapper.style.top = this.top + 'px';
        this.wrapper.style.left = this.left + 'px';
    }

    computeDimensions() {
        debugger;
        const box = this.wrapper.getBoundingClientRect();
        this.height = box.height;
        this.width = box.width;
    }

    get top(): number {
        return safeParseInt(this.getAttribute('top'));
    }

    set top(t: number) {
        this.setAttribute('top', t.toString());
    }

    get left(): number {
        return safeParseInt(this.getAttribute('left'));
    }

    set left(l: number) {
        this.setAttribute('left', l.toString());
    }

    get width(): number {
        return safeParseInt(this.getAttribute('width'));        
    }

    set width(w: number) {
        this.setAttribute('width', w.toString());
    }

    get height(): number {
        return safeParseInt(this.getAttribute('height'));        
    }

    set height(h: number) {
        this.setAttribute('height', h.toString());
    }

}

customElements.define(ScrollItem.TAG_NAME, ScrollItem);
