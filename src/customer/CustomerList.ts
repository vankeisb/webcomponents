import { div, empty, slot, text, p, style } from "../builder/HtmlBuilder";
import { Customer } from "./Customer";
import { CustomerRow } from "./CustomerRow";

export class CustomerList extends HTMLElement {

    static TAG_NAME = 'customer-list';

    private readonly _slot: HTMLSlotElement;

    constructor() {
        super();
    
        // const wrapper = document.createElement('div');
        // wrapper.classList.add('cust-list');
        // const s = document.createElement('slot');
        // const p = document.createElement('p');
        // p.textContent = 'No customers';
        // s.appendChild(p);
        // wrapper.appendChild(s);

        this._slot = slot({}, p({}, text('No customers')));

        this.attachShadow({mode: 'open'})
            .appendChild(
                div(
                    { className: 'cust-list'},
                    this._slot,
                    style(
                        {},
                        text(`
                            .cust-list {
                            background-color: lightgreen;
                            }
                            `
                        )
                    )
                )
            );

        // const style = document.createElement('style');
        // style.textContent = ;
        // wrapper.appendChild(style);
    }

    connectedCallback() {
        this.getRows().forEach(this.addRowEventListener.bind(this));
    }

    private getRows(): ReadonlyArray<CustomerRow> {
        const rows: NodeListOf<CustomerRow> = this._slot.querySelectorAll(CustomerRow.TAG_NAME);
        return Array.from(rows);
    }

    private addRowEventListener(row: CustomerRow) {
        row.addEventListener('customer-clicked', (e: CustomEvent) => {
            const detail = e.detail;            
            const { firstName, lastName } = detail;
            this.getRows().forEach(row => {
                row.selected = row.firstName === firstName && row.lastName === lastName;
            });
            this.dispatchEvent(
                new CustomEvent(
                    'customer-selected',
                    {
                        detail
                    }
                )
            )
        })
    }

    static newInstance(): CustomerList {
        return document.createElement(CustomerList.TAG_NAME) as CustomerList;
    }

    setCustomers(customers: ReadonlyArray<Customer>) {
        empty(this._slot);
        customers.forEach(c => {
            const row = CustomerRow.newInstance(c.firstName, c.lastName);
            this.addRowEventListener(row);
            this._slot.appendChild(row);
        });
    }

    getSelectedRow(): CustomerRow | undefined {
        return this.getRows().find(r => r.selected);
    }

}

customElements.define(CustomerList.TAG_NAME, CustomerList);