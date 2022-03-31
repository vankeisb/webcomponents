import { a, div, empty, span, text } from "../builder/HtmlBuilder";

export class CustomerRow extends HTMLElement {

    static TAG_NAME = 'customer-row';

    private readonly shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open'});        
    }

    static get observedAttributes() {
        return ['firstName', 'lastName', 'selected'];
    }

    attributeChangedCallback(name: string) {
        console.log("attr changed", name);
        this.updateDom();
    }
      

    private updateDom() {
        empty(this.shadow);

        const createLink = (textContent: string) => {
            const aElem = a({href: '#'}, text(textContent));
            aElem.addEventListener('click', () => {
                this.dispatchEvent(
                    new CustomEvent(
                        'customer-clicked',
                        {
                            detail: {
                                firstName: this.firstName,
                                lastName: this.lastName,
                            }
                        }
                    )
                )
            });
            return aElem;
        };

        const contentText = this.firstName + " " + this.lastName;
        this.shadow.appendChild(
            div(
                {
                    className: 'cust-row'
                },
                this.selected
                    ? span({}, text(contentText))
                    : createLink(contentText)
            )
        );
    }

    connectedCallback() {
        this.updateDom();
    }

    get firstName(): string {
        return this.getAttribute('first-name');
    }

    set firstName(fn: string) {
        this.setAttribute('first-name', fn);
        this.updateDom();
    }

    get lastName(): string {
        return this.getAttribute('last-name');
    }

    set lastName(ln: string) {
        this.setAttribute('last-name', ln);
        this.updateDom();
    }

    get selected(): boolean {
        return this.hasAttribute('selected');
    }

    set selected(s: boolean) {
        if (s) {
            this.setAttribute('selected', '');
        } else {
            this.removeAttribute('selected');
        }
        this.updateDom();
    }

    static newInstance(firstName: string, lastName: string): CustomerRow {
        const res = document.createElement(CustomerRow.TAG_NAME) as CustomerRow;
        res.firstName = firstName;
        res.lastName = lastName;
        return res;
    }

}

customElements.define('customer-row', CustomerRow);