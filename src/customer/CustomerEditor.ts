import { input, label, text } from "../builder/HtmlBuilder";

export class CustomerEditor extends HTMLElement {

    static TAG_NAME = 'customer-editor';

    private readonly firstNameInput: HTMLInputElement;
    private readonly lastNameInput: HTMLInputElement;

    constructor() {
        super();
        
        this.firstNameInput = input({
            type: 'text',
            name: 'first-name'
        })
        this.firstNameInput.addEventListener('input', () => {
            this.firstName = this.firstNameInput.value;
            this.fireCustomerChanged();
        });

        this.lastNameInput = input({
            type: 'text',
            name: 'last-name'
        })
        this.lastNameInput.addEventListener('input', () => {
            this.lastName = this.lastNameInput.value;
            this.fireCustomerChanged();
        });

        const shadow = this.attachShadow({mode:'open'});
        
        const labelLn: HTMLLabelElement = document.createElement('label');
        labelLn.textContent = 'Last name';
        labelLn.htmlFor = 'last-name';

        shadow.appendChild(label({htmlFor: 'first-name'}, text('First name')));
        shadow.appendChild(this.firstNameInput);
        shadow.appendChild(label({htmlFor: 'last-name'}, text('Last name')));
        shadow.appendChild(this.lastNameInput);
    }

    get firstName(): string {
        return this.getAttribute('first-name');
    }

    set firstName(fn: string) {
        this.setAttribute('first-name', fn);
        this.firstNameInput.value = fn;
    }

    get lastName(): string {
        return this.getAttribute('last-name');
    }

    set lastName(ln: string) {
        this.setAttribute('last-name', ln);
        this.lastNameInput.value = ln;
    }

    clear() {
        this.firstName = '';
        this.lastName = '';
    }

    private setValuesFromAttributes() {
        this.firstNameInput.value = this.getAttribute('first-name') ?? '';
        this.lastNameInput.value = this.getAttribute('last-name') ?? '';
    }

    private fireCustomerChanged() {
        const customerChangedEvent: CustomEvent = new CustomEvent(
            'customer-changed',
            {
                detail: {
                    firstName: this.firstName,
                    lastName: this.lastName,
                }
            }
        );
        this.dispatchEvent(customerChangedEvent);
    }

    connectedCallback() {
        this.setValuesFromAttributes();
    }

    static newInstance(firstName: string = '', lastName: string = ''): CustomerEditor {
        const res = document.createElement(CustomerEditor.TAG_NAME) as CustomerEditor;
        res.firstName = firstName;
        res.lastName = lastName;
        return res;
    }
}

customElements.define(CustomerEditor.TAG_NAME, CustomerEditor);
