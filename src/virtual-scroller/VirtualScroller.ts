import { div, slot, style, text } from "../builder/HtmlBuilder";
import { safeParseInt } from "../SafeParseInt";
import { ScrollItem } from "./ScrollItem";

export class VirtualScroller extends HTMLElement {

    static TAG_NAME = "virtual-scroller";

    private readonly contentPane: HTMLDivElement;
    private scrollTimeout: any = undefined;
    private counter: number = 0;

    constructor() {
        super();

        this.contentPane = div({className: 'content-pane'}, slot({}));

        this.addEventListener('scroll', e => {
            if (this.scrollTimeout) {
                clearTimeout(this.scrollTimeout);
            }
            this.counter++;
            const _counter = this.counter;
            this.scrollTimeout = setTimeout(() => {
                if (this.counter === _counter) {
                    const newTop = this.scrollTop;
                    const newLeft = this.scrollLeft;
                    this.top = newTop;
                    this.left = newLeft;
                }
            }, 10);
        })

        const shadow = this.attachShadow({mode:'open'});
        shadow.appendChild(this.contentPane);
    }

    static get observedAttributes() {
        return [
            'content-height', 
            'content-width', 
            'top', 
            'left', 
        ];
    }

    connectedCallback() {
        this.setScrollPaneDimensions();
    }

    disconnectedCallback() {
        if (this.scrollTimeout) {
            this.counter++;
            clearTimeout(this.scrollTimeout);
        }
    }

    private setScrollPaneDimensions() {
        this.contentPane.style.height = this.contentHeight + "px";
        this.contentPane.style.width = this.contentWidth + "px";
    }

    get contentHeight(): number {
        return safeParseInt(this.getAttribute('content-height'));
    }

    set contentHeight(h: number) {
        this.setAttribute('content-height', h.toString());
    }

    get contentWidth(): number {
        return safeParseInt(this.getAttribute('content-height'));
    }

    set contentWidth(w: number) {
        this.setAttribute('content-width', w.toString());
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

    getScrollItems(): ReadonlyArray<ScrollItem> {
        const items: NodeListOf<ScrollItem> = this.querySelectorAll(ScrollItem.TAG_NAME);
        debugger;
        return Array.from(items);
    }


}

customElements.define(VirtualScroller.TAG_NAME, VirtualScroller);