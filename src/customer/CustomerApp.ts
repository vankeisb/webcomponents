import { div, h1, text } from "../builder/HtmlBuilder";
import { Customer } from "./Customer";
import { CustomerEditor } from "./CustomerEditor";
import { CustomerList } from "./CustomerList";
import { CustomerRow } from "./CustomerRow";

export class CustomerApp extends HTMLElement {

    static TAG_NAME = "customers-app";

    private readonly customerList: CustomerList;
    private readonly customerEditor: CustomerEditor;

    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});

        this.customerList = CustomerList.newInstance();
        this.customerList.addEventListener('customer-selected', (e: CustomEvent) => {
            const { firstName, lastName } = e.detail;
            this.customerEditor.firstName = firstName;
            this.customerEditor.lastName = lastName;
        });

        this.customerEditor = CustomerEditor.newInstance();
        this.customerEditor.addEventListener('customer-changed', (e:CustomEvent) => {
            const { firstName, lastName } = e.detail;
            const selectedRow: CustomerRow | undefined = this.customerList.getSelectedRow();
            if (selectedRow) {
                selectedRow.firstName = firstName;
                selectedRow.lastName = lastName;    
            }
        });

        shadow.appendChild(
            div(
                {
                    className: 'app',
                },
                h1({}, text('List')),
                this.customerList,
                h1({}, text('Editor')),
                this.customerEditor
            )
        );

    }

    init(customers: ReadonlyArray<Customer>) {
        this.customerList.setCustomers(customers);
        this.customerEditor.clear();
    }

}

customElements.define(CustomerApp.TAG_NAME, CustomerApp);