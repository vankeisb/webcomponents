/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/builder/HtmlBuilder.ts":
/*!************************************!*\
  !*** ./src/builder/HtmlBuilder.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => (/* binding */ a),
/* harmony export */   "div": () => (/* binding */ div),
/* harmony export */   "empty": () => (/* binding */ empty),
/* harmony export */   "h1": () => (/* binding */ h1),
/* harmony export */   "input": () => (/* binding */ input),
/* harmony export */   "label": () => (/* binding */ label),
/* harmony export */   "node": () => (/* binding */ node),
/* harmony export */   "p": () => (/* binding */ p),
/* harmony export */   "slot": () => (/* binding */ slot),
/* harmony export */   "span": () => (/* binding */ span),
/* harmony export */   "style": () => (/* binding */ style),
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
function node(tag) {
    return (a, ...c) => {
        const n = document.createElement(tag);
        c.forEach((child) => n.appendChild(child));
        const keys = Object.keys(a);
        keys.forEach((k) => setProperty(n, k, getProperty(a, k)));
        return n;
    };
}
function getProperty(o, key) {
    return o[key];
}
function setProperty(o, key, value) {
    o[key] = value;
}
const div = node('div');
const span = node('span');
const a = node('a');
const p = node('p');
const h1 = node('h1');
const input = node('input');
const label = node('label');
const slot = node('slot');
const style = node('style');
function text(s) {
    return document.createTextNode(s);
}
function empty(e) {
    while (e.firstChild) {
        e.removeChild(e.firstChild);
    }
}


/***/ }),

/***/ "./src/customer/CustomerApp.ts":
/*!*************************************!*\
  !*** ./src/customer/CustomerApp.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomerApp": () => (/* binding */ CustomerApp)
/* harmony export */ });
/* harmony import */ var _builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../builder/HtmlBuilder */ "./src/builder/HtmlBuilder.ts");
/* harmony import */ var _CustomerEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CustomerEditor */ "./src/customer/CustomerEditor.ts");
/* harmony import */ var _CustomerList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CustomerList */ "./src/customer/CustomerList.ts");



class CustomerApp extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        this.customerList = _CustomerList__WEBPACK_IMPORTED_MODULE_2__.CustomerList.newInstance();
        this.customerList.addEventListener('customer-selected', (e) => {
            const { firstName, lastName } = e.detail;
            this.customerEditor.firstName = firstName;
            this.customerEditor.lastName = lastName;
        });
        this.customerEditor = _CustomerEditor__WEBPACK_IMPORTED_MODULE_1__.CustomerEditor.newInstance();
        this.customerEditor.addEventListener('customer-changed', (e) => {
            const { firstName, lastName } = e.detail;
            const selectedRow = this.customerList.getSelectedRow();
            if (selectedRow) {
                selectedRow.firstName = firstName;
                selectedRow.lastName = lastName;
            }
        });
        shadow.appendChild((0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.div)({
            className: 'app',
        }, (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.h1)({}, (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.text)('List')), this.customerList, (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.h1)({}, (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.text)('Editor')), this.customerEditor));
    }
    init(customers) {
        this.customerList.setCustomers(customers);
        this.customerEditor.clear();
    }
}
CustomerApp.TAG_NAME = "customers-app";
customElements.define(CustomerApp.TAG_NAME, CustomerApp);


/***/ }),

/***/ "./src/customer/CustomerEditor.ts":
/*!****************************************!*\
  !*** ./src/customer/CustomerEditor.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomerEditor": () => (/* binding */ CustomerEditor)
/* harmony export */ });
/* harmony import */ var _builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../builder/HtmlBuilder */ "./src/builder/HtmlBuilder.ts");

class CustomerEditor extends HTMLElement {
    constructor() {
        super();
        this.firstNameInput = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.input)({
            type: 'text',
            name: 'first-name'
        });
        this.firstNameInput.addEventListener('input', () => {
            this.firstName = this.firstNameInput.value;
            this.fireCustomerChanged();
        });
        this.lastNameInput = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.input)({
            type: 'text',
            name: 'last-name'
        });
        this.lastNameInput.addEventListener('input', () => {
            this.lastName = this.lastNameInput.value;
            this.fireCustomerChanged();
        });
        const shadow = this.attachShadow({ mode: 'open' });
        const labelLn = document.createElement('label');
        labelLn.textContent = 'Last name';
        labelLn.htmlFor = 'last-name';
        shadow.appendChild((0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.label)({ htmlFor: 'first-name' }, (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.text)('First name')));
        shadow.appendChild(this.firstNameInput);
        shadow.appendChild((0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.label)({ htmlFor: 'last-name' }, (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.text)('Last name')));
        shadow.appendChild(this.lastNameInput);
    }
    get firstName() {
        return this.getAttribute('first-name');
    }
    set firstName(fn) {
        this.setAttribute('first-name', fn);
        this.firstNameInput.value = fn;
    }
    get lastName() {
        return this.getAttribute('last-name');
    }
    set lastName(ln) {
        this.setAttribute('last-name', ln);
        this.lastNameInput.value = ln;
    }
    clear() {
        this.firstName = '';
        this.lastName = '';
    }
    setValuesFromAttributes() {
        var _a, _b;
        this.firstNameInput.value = (_a = this.getAttribute('first-name')) !== null && _a !== void 0 ? _a : '';
        this.lastNameInput.value = (_b = this.getAttribute('last-name')) !== null && _b !== void 0 ? _b : '';
    }
    fireCustomerChanged() {
        const customerChangedEvent = new CustomEvent('customer-changed', {
            detail: {
                firstName: this.firstName,
                lastName: this.lastName,
            }
        });
        this.dispatchEvent(customerChangedEvent);
    }
    connectedCallback() {
        this.setValuesFromAttributes();
    }
    static newInstance(firstName = '', lastName = '') {
        const res = document.createElement(CustomerEditor.TAG_NAME);
        res.firstName = firstName;
        res.lastName = lastName;
        return res;
    }
}
CustomerEditor.TAG_NAME = 'customer-editor';
customElements.define(CustomerEditor.TAG_NAME, CustomerEditor);


/***/ }),

/***/ "./src/customer/CustomerList.ts":
/*!**************************************!*\
  !*** ./src/customer/CustomerList.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomerList": () => (/* binding */ CustomerList)
/* harmony export */ });
/* harmony import */ var _builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../builder/HtmlBuilder */ "./src/builder/HtmlBuilder.ts");
/* harmony import */ var _CustomerRow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CustomerRow */ "./src/customer/CustomerRow.ts");


class CustomerList extends HTMLElement {
    constructor() {
        super();
        // const wrapper = document.createElement('div');
        // wrapper.classList.add('cust-list');
        // const s = document.createElement('slot');
        // const p = document.createElement('p');
        // p.textContent = 'No customers';
        // s.appendChild(p);
        // wrapper.appendChild(s);
        this._slot = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.slot)({}, (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.p)({}, (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.text)('No customers')));
        this.attachShadow({ mode: 'open' })
            .appendChild((0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.div)({ className: 'cust-list' }, this._slot, (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.style)({}, (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.text)(`
                            .cust-list {
                            background-color: lightgreen;
                            }
                            `))));
        // const style = document.createElement('style');
        // style.textContent = ;
        // wrapper.appendChild(style);
    }
    connectedCallback() {
        this.getRows().forEach(this.addRowEventListener.bind(this));
    }
    getRows() {
        const rows = this._slot.querySelectorAll(_CustomerRow__WEBPACK_IMPORTED_MODULE_1__.CustomerRow.TAG_NAME);
        return Array.from(rows);
    }
    addRowEventListener(row) {
        row.addEventListener('customer-clicked', (e) => {
            const detail = e.detail;
            const { firstName, lastName } = detail;
            this.getRows().forEach(row => {
                row.selected = row.firstName === firstName && row.lastName === lastName;
            });
            this.dispatchEvent(new CustomEvent('customer-selected', {
                detail
            }));
        });
    }
    static newInstance() {
        return document.createElement(CustomerList.TAG_NAME);
    }
    setCustomers(customers) {
        (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.empty)(this._slot);
        customers.forEach(c => {
            const row = _CustomerRow__WEBPACK_IMPORTED_MODULE_1__.CustomerRow.newInstance(c.firstName, c.lastName);
            this.addRowEventListener(row);
            this._slot.appendChild(row);
        });
    }
    getSelectedRow() {
        return this.getRows().find(r => r.selected);
    }
}
CustomerList.TAG_NAME = 'customer-list';
customElements.define(CustomerList.TAG_NAME, CustomerList);


/***/ }),

/***/ "./src/customer/CustomerRow.ts":
/*!*************************************!*\
  !*** ./src/customer/CustomerRow.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomerRow": () => (/* binding */ CustomerRow)
/* harmony export */ });
/* harmony import */ var _builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../builder/HtmlBuilder */ "./src/builder/HtmlBuilder.ts");

class CustomerRow extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }
    static get observedAttributes() {
        return ['firstName', 'lastName', 'selected'];
    }
    attributeChangedCallback(name) {
        console.log("attr changed", name);
        this.updateDom();
    }
    updateDom() {
        (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.empty)(this.shadow);
        const createLink = (textContent) => {
            const aElem = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.a)({ href: '#' }, (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.text)(textContent));
            aElem.addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('customer-clicked', {
                    detail: {
                        firstName: this.firstName,
                        lastName: this.lastName,
                    }
                }));
            });
            return aElem;
        };
        const contentText = this.firstName + " " + this.lastName;
        this.shadow.appendChild((0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.div)({
            className: 'cust-row'
        }, this.selected
            ? (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.span)({}, (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.text)(contentText))
            : createLink(contentText)));
    }
    connectedCallback() {
        this.updateDom();
    }
    get firstName() {
        return this.getAttribute('first-name');
    }
    set firstName(fn) {
        this.setAttribute('first-name', fn);
        this.updateDom();
    }
    get lastName() {
        return this.getAttribute('last-name');
    }
    set lastName(ln) {
        this.setAttribute('last-name', ln);
        this.updateDom();
    }
    get selected() {
        return this.hasAttribute('selected');
    }
    set selected(s) {
        if (s) {
            this.setAttribute('selected', '');
        }
        else {
            this.removeAttribute('selected');
        }
        this.updateDom();
    }
    static newInstance(firstName, lastName) {
        const res = document.createElement(CustomerRow.TAG_NAME);
        res.firstName = firstName;
        res.lastName = lastName;
        return res;
    }
}
CustomerRow.TAG_NAME = 'customer-row';
customElements.define('customer-row', CustomerRow);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _customer_CustomerApp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./customer/CustomerApp */ "./src/customer/CustomerApp.ts");

// just for imports !
console.log('yalla', _customer_CustomerApp__WEBPACK_IMPORTED_MODULE_0__.CustomerApp.TAG_NAME);
window.addEventListener('load', e => {
    const app = document.getElementById('app');
    console.log("app loaded", app);
    app.init([
        { firstName: 'Toto', lastName: 'Biloute' },
        { firstName: 'French', lastName: 'Fries' },
        { firstName: 'Foo', lastName: 'Bar' },
    ]);
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTnFEO0FBRXJELHFCQUFxQjtBQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSx1RUFBb0IsQ0FBQyxDQUFDO0FBRTNDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDaEMsTUFBTSxHQUFHLEdBQWdCLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFnQixDQUFDO0lBQ3ZFLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDTCxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRTtRQUMxQyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTtRQUMxQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRTtLQUN4QyxDQUFDO0FBQ04sQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy9idWlsZGVyL0h0bWxCdWlsZGVyLnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvY3VzdG9tZXIvQ3VzdG9tZXJBcHAudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy9jdXN0b21lci9DdXN0b21lckVkaXRvci50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2N1c3RvbWVyL0N1c3RvbWVyTGlzdC50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2N1c3RvbWVyL0N1c3RvbWVyUm93LnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB0eXBlIERlZXBQYXJ0aWFsPFQ+ID0gUGFydGlhbDx7IFtQIGluIGtleW9mIFRdOiBEZWVwUGFydGlhbDxUW1BdPiB9PjtcblxudHlwZSBOb2RlQnVpbGRlcjxLIGV4dGVuZHMga2V5b2YgSFRNTEVsZW1lbnRUYWdOYW1lTWFwPiA9IChcbiAgYTogRGVlcFBhcnRpYWw8SFRNTEVsZW1lbnRUYWdOYW1lTWFwW0tdPixcbiAgLi4uYzogTm9kZVtdXG4pID0+IEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5vZGU8SyBleHRlbmRzIGtleW9mIEhUTUxFbGVtZW50VGFnTmFtZU1hcD4odGFnOiBLKTogTm9kZUJ1aWxkZXI8Sz4ge1xuICByZXR1cm4gKGE6IERlZXBQYXJ0aWFsPEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXT4sIC4uLmM6IE5vZGVbXSkgPT4ge1xuICAgIGNvbnN0IG46IEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBjLmZvckVhY2goKGNoaWxkKSA9PiBuLmFwcGVuZENoaWxkKGNoaWxkKSk7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGEpIGFzIEFycmF5PGtleW9mIHR5cGVvZiBhPjtcbiAgICBrZXlzLmZvckVhY2goKGspID0+IHNldFByb3BlcnR5KG4sIGssIGdldFByb3BlcnR5KGEsIGspKSk7XG4gICAgcmV0dXJuIG47XG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldFByb3BlcnR5PFQsIEsgZXh0ZW5kcyBrZXlvZiBUPihvOiBULCBrZXk6IEspOiBUW0tdIHtcbiAgcmV0dXJuIG9ba2V5XTtcbn1cblxuZnVuY3Rpb24gc2V0UHJvcGVydHk8VCwgSyBleHRlbmRzIGtleW9mIFQ+KG86IFQsIGtleTogSywgdmFsdWU6IFRbS10pOiB2b2lkIHtcbiAgb1trZXldID0gdmFsdWU7XG59XG5cbmV4cG9ydCBjb25zdCBkaXYgPSBub2RlKCdkaXYnKTtcbmV4cG9ydCBjb25zdCBzcGFuID0gbm9kZSgnc3BhbicpO1xuZXhwb3J0IGNvbnN0IGEgPSBub2RlKCdhJyk7XG5leHBvcnQgY29uc3QgcCA9IG5vZGUoJ3AnKTtcbmV4cG9ydCBjb25zdCBoMSA9IG5vZGUoJ2gxJyk7XG5leHBvcnQgY29uc3QgaW5wdXQgPSBub2RlKCdpbnB1dCcpO1xuZXhwb3J0IGNvbnN0IGxhYmVsID0gbm9kZSgnbGFiZWwnKTtcbmV4cG9ydCBjb25zdCBzbG90ID0gbm9kZSgnc2xvdCcpO1xuZXhwb3J0IGNvbnN0IHN0eWxlID0gbm9kZSgnc3R5bGUnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRleHQoczogc3RyaW5nKTogVGV4dCB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVtcHR5KGU6IE5vZGUpIHtcbiAgd2hpbGUoZS5maXJzdENoaWxkKSB7XG4gICAgZS5yZW1vdmVDaGlsZChlLmZpcnN0Q2hpbGQpO1xuICB9XG59IiwiaW1wb3J0IHsgZGl2LCBoMSwgdGV4dCB9IGZyb20gXCIuLi9idWlsZGVyL0h0bWxCdWlsZGVyXCI7XG5pbXBvcnQgeyBDdXN0b21lciB9IGZyb20gXCIuL0N1c3RvbWVyXCI7XG5pbXBvcnQgeyBDdXN0b21lckVkaXRvciB9IGZyb20gXCIuL0N1c3RvbWVyRWRpdG9yXCI7XG5pbXBvcnQgeyBDdXN0b21lckxpc3QgfSBmcm9tIFwiLi9DdXN0b21lckxpc3RcIjtcbmltcG9ydCB7IEN1c3RvbWVyUm93IH0gZnJvbSBcIi4vQ3VzdG9tZXJSb3dcIjtcblxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyQXBwIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gICAgc3RhdGljIFRBR19OQU1FID0gXCJjdXN0b21lcnMtYXBwXCI7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IGN1c3RvbWVyTGlzdDogQ3VzdG9tZXJMaXN0O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY3VzdG9tZXJFZGl0b3I6IEN1c3RvbWVyRWRpdG9yO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGNvbnN0IHNoYWRvdyA9IHRoaXMuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcblxuICAgICAgICB0aGlzLmN1c3RvbWVyTGlzdCA9IEN1c3RvbWVyTGlzdC5uZXdJbnN0YW5jZSgpO1xuICAgICAgICB0aGlzLmN1c3RvbWVyTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjdXN0b21lci1zZWxlY3RlZCcsIChlOiBDdXN0b21FdmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBmaXJzdE5hbWUsIGxhc3ROYW1lIH0gPSBlLmRldGFpbDtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJFZGl0b3IuZmlyc3ROYW1lID0gZmlyc3ROYW1lO1xuICAgICAgICAgICAgdGhpcy5jdXN0b21lckVkaXRvci5sYXN0TmFtZSA9IGxhc3ROYW1lO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmN1c3RvbWVyRWRpdG9yID0gQ3VzdG9tZXJFZGl0b3IubmV3SW5zdGFuY2UoKTtcbiAgICAgICAgdGhpcy5jdXN0b21lckVkaXRvci5hZGRFdmVudExpc3RlbmVyKCdjdXN0b21lci1jaGFuZ2VkJywgKGU6Q3VzdG9tRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZmlyc3ROYW1lLCBsYXN0TmFtZSB9ID0gZS5kZXRhaWw7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFJvdzogQ3VzdG9tZXJSb3cgfCB1bmRlZmluZWQgPSB0aGlzLmN1c3RvbWVyTGlzdC5nZXRTZWxlY3RlZFJvdygpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkUm93KSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRSb3cuZmlyc3ROYW1lID0gZmlyc3ROYW1lO1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkUm93Lmxhc3ROYW1lID0gbGFzdE5hbWU7ICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICBkaXYoXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdhcHAnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaDEoe30sIHRleHQoJ0xpc3QnKSksXG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21lckxpc3QsXG4gICAgICAgICAgICAgICAgaDEoe30sIHRleHQoJ0VkaXRvcicpKSxcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVyRWRpdG9yXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICBpbml0KGN1c3RvbWVyczogUmVhZG9ubHlBcnJheTxDdXN0b21lcj4pIHtcbiAgICAgICAgdGhpcy5jdXN0b21lckxpc3Quc2V0Q3VzdG9tZXJzKGN1c3RvbWVycyk7XG4gICAgICAgIHRoaXMuY3VzdG9tZXJFZGl0b3IuY2xlYXIoKTtcbiAgICB9XG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEN1c3RvbWVyQXBwLlRBR19OQU1FLCBDdXN0b21lckFwcCk7IiwiaW1wb3J0IHsgaW5wdXQsIGxhYmVsLCB0ZXh0IH0gZnJvbSBcIi4uL2J1aWxkZXIvSHRtbEJ1aWxkZXJcIjtcblxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyRWRpdG9yIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gICAgc3RhdGljIFRBR19OQU1FID0gJ2N1c3RvbWVyLWVkaXRvcic7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IGZpcnN0TmFtZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbGFzdE5hbWVJbnB1dDogSFRNTElucHV0RWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5maXJzdE5hbWVJbnB1dCA9IGlucHV0KHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgIG5hbWU6ICdmaXJzdC1uYW1lJ1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLmZpcnN0TmFtZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5maXJzdE5hbWUgPSB0aGlzLmZpcnN0TmFtZUlucHV0LnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5maXJlQ3VzdG9tZXJDaGFuZ2VkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubGFzdE5hbWVJbnB1dCA9IGlucHV0KHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgIG5hbWU6ICdsYXN0LW5hbWUnXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMubGFzdE5hbWVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubGFzdE5hbWUgPSB0aGlzLmxhc3ROYW1lSW5wdXQudmFsdWU7XG4gICAgICAgICAgICB0aGlzLmZpcmVDdXN0b21lckNoYW5nZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgc2hhZG93ID0gdGhpcy5hdHRhY2hTaGFkb3coe21vZGU6J29wZW4nfSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBsYWJlbExuOiBIVE1MTGFiZWxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgbGFiZWxMbi50ZXh0Q29udGVudCA9ICdMYXN0IG5hbWUnO1xuICAgICAgICBsYWJlbExuLmh0bWxGb3IgPSAnbGFzdC1uYW1lJztcblxuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQobGFiZWwoe2h0bWxGb3I6ICdmaXJzdC1uYW1lJ30sIHRleHQoJ0ZpcnN0IG5hbWUnKSkpO1xuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQodGhpcy5maXJzdE5hbWVJbnB1dCk7XG4gICAgICAgIHNoYWRvdy5hcHBlbmRDaGlsZChsYWJlbCh7aHRtbEZvcjogJ2xhc3QtbmFtZSd9LCB0ZXh0KCdMYXN0IG5hbWUnKSkpO1xuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQodGhpcy5sYXN0TmFtZUlucHV0KTtcbiAgICB9XG5cbiAgICBnZXQgZmlyc3ROYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnZmlyc3QtbmFtZScpO1xuICAgIH1cblxuICAgIHNldCBmaXJzdE5hbWUoZm46IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnZmlyc3QtbmFtZScsIGZuKTtcbiAgICAgICAgdGhpcy5maXJzdE5hbWVJbnB1dC52YWx1ZSA9IGZuO1xuICAgIH1cblxuICAgIGdldCBsYXN0TmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2xhc3QtbmFtZScpO1xuICAgIH1cblxuICAgIHNldCBsYXN0TmFtZShsbjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdsYXN0LW5hbWUnLCBsbik7XG4gICAgICAgIHRoaXMubGFzdE5hbWVJbnB1dC52YWx1ZSA9IGxuO1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLmZpcnN0TmFtZSA9ICcnO1xuICAgICAgICB0aGlzLmxhc3ROYW1lID0gJyc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRWYWx1ZXNGcm9tQXR0cmlidXRlcygpIHtcbiAgICAgICAgdGhpcy5maXJzdE5hbWVJbnB1dC52YWx1ZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdmaXJzdC1uYW1lJykgPz8gJyc7XG4gICAgICAgIHRoaXMubGFzdE5hbWVJbnB1dC52YWx1ZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdsYXN0LW5hbWUnKSA/PyAnJztcbiAgICB9XG5cbiAgICBwcml2YXRlIGZpcmVDdXN0b21lckNoYW5nZWQoKSB7XG4gICAgICAgIGNvbnN0IGN1c3RvbWVyQ2hhbmdlZEV2ZW50OiBDdXN0b21FdmVudCA9IG5ldyBDdXN0b21FdmVudChcbiAgICAgICAgICAgICdjdXN0b21lci1jaGFuZ2VkJyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lOiB0aGlzLmZpcnN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbGFzdE5hbWU6IHRoaXMubGFzdE5hbWUsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoY3VzdG9tZXJDaGFuZ2VkRXZlbnQpO1xuICAgIH1cblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLnNldFZhbHVlc0Zyb21BdHRyaWJ1dGVzKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIG5ld0luc3RhbmNlKGZpcnN0TmFtZTogc3RyaW5nID0gJycsIGxhc3ROYW1lOiBzdHJpbmcgPSAnJyk6IEN1c3RvbWVyRWRpdG9yIHtcbiAgICAgICAgY29uc3QgcmVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChDdXN0b21lckVkaXRvci5UQUdfTkFNRSkgYXMgQ3VzdG9tZXJFZGl0b3I7XG4gICAgICAgIHJlcy5maXJzdE5hbWUgPSBmaXJzdE5hbWU7XG4gICAgICAgIHJlcy5sYXN0TmFtZSA9IGxhc3ROYW1lO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEN1c3RvbWVyRWRpdG9yLlRBR19OQU1FLCBDdXN0b21lckVkaXRvcik7XG4iLCJpbXBvcnQgeyBkaXYsIGVtcHR5LCBzbG90LCB0ZXh0LCBwLCBzdHlsZSB9IGZyb20gXCIuLi9idWlsZGVyL0h0bWxCdWlsZGVyXCI7XG5pbXBvcnQgeyBDdXN0b21lciB9IGZyb20gXCIuL0N1c3RvbWVyXCI7XG5pbXBvcnQgeyBDdXN0b21lclJvdyB9IGZyb20gXCIuL0N1c3RvbWVyUm93XCI7XG5cbmV4cG9ydCBjbGFzcyBDdXN0b21lckxpc3QgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cbiAgICBzdGF0aWMgVEFHX05BTUUgPSAnY3VzdG9tZXItbGlzdCc7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IF9zbG90OiBIVE1MU2xvdEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICBcbiAgICAgICAgLy8gY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAvLyB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2N1c3QtbGlzdCcpO1xuICAgICAgICAvLyBjb25zdCBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2xvdCcpO1xuICAgICAgICAvLyBjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAvLyBwLnRleHRDb250ZW50ID0gJ05vIGN1c3RvbWVycyc7XG4gICAgICAgIC8vIHMuYXBwZW5kQ2hpbGQocCk7XG4gICAgICAgIC8vIHdyYXBwZXIuYXBwZW5kQ2hpbGQocyk7XG5cbiAgICAgICAgdGhpcy5fc2xvdCA9IHNsb3Qoe30sIHAoe30sIHRleHQoJ05vIGN1c3RvbWVycycpKSk7XG5cbiAgICAgICAgdGhpcy5hdHRhY2hTaGFkb3coe21vZGU6ICdvcGVuJ30pXG4gICAgICAgICAgICAuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICAgICAgZGl2KFxuICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2N1c3QtbGlzdCd9LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zbG90LFxuICAgICAgICAgICAgICAgICAgICBzdHlsZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dChgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmN1c3QtbGlzdCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmVlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAvLyBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgIC8vIHN0eWxlLnRleHRDb250ZW50ID0gO1xuICAgICAgICAvLyB3cmFwcGVyLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICB9XG5cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5nZXRSb3dzKCkuZm9yRWFjaCh0aGlzLmFkZFJvd0V2ZW50TGlzdGVuZXIuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRSb3dzKCk6IFJlYWRvbmx5QXJyYXk8Q3VzdG9tZXJSb3c+IHtcbiAgICAgICAgY29uc3Qgcm93czogTm9kZUxpc3RPZjxDdXN0b21lclJvdz4gPSB0aGlzLl9zbG90LnF1ZXJ5U2VsZWN0b3JBbGwoQ3VzdG9tZXJSb3cuVEFHX05BTUUpO1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShyb3dzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFJvd0V2ZW50TGlzdGVuZXIocm93OiBDdXN0b21lclJvdykge1xuICAgICAgICByb3cuYWRkRXZlbnRMaXN0ZW5lcignY3VzdG9tZXItY2xpY2tlZCcsIChlOiBDdXN0b21FdmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGV0YWlsID0gZS5kZXRhaWw7ICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCB7IGZpcnN0TmFtZSwgbGFzdE5hbWUgfSA9IGRldGFpbDtcbiAgICAgICAgICAgIHRoaXMuZ2V0Um93cygpLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICAgICAgICByb3cuc2VsZWN0ZWQgPSByb3cuZmlyc3ROYW1lID09PSBmaXJzdE5hbWUgJiYgcm93Lmxhc3ROYW1lID09PSBsYXN0TmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgICAgICAgIG5ldyBDdXN0b21FdmVudChcbiAgICAgICAgICAgICAgICAgICAgJ2N1c3RvbWVyLXNlbGVjdGVkJyxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIG5ld0luc3RhbmNlKCk6IEN1c3RvbWVyTGlzdCB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KEN1c3RvbWVyTGlzdC5UQUdfTkFNRSkgYXMgQ3VzdG9tZXJMaXN0O1xuICAgIH1cblxuICAgIHNldEN1c3RvbWVycyhjdXN0b21lcnM6IFJlYWRvbmx5QXJyYXk8Q3VzdG9tZXI+KSB7XG4gICAgICAgIGVtcHR5KHRoaXMuX3Nsb3QpO1xuICAgICAgICBjdXN0b21lcnMuZm9yRWFjaChjID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IEN1c3RvbWVyUm93Lm5ld0luc3RhbmNlKGMuZmlyc3ROYW1lLCBjLmxhc3ROYW1lKTtcbiAgICAgICAgICAgIHRoaXMuYWRkUm93RXZlbnRMaXN0ZW5lcihyb3cpO1xuICAgICAgICAgICAgdGhpcy5fc2xvdC5hcHBlbmRDaGlsZChyb3cpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZFJvdygpOiBDdXN0b21lclJvdyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFJvd3MoKS5maW5kKHIgPT4gci5zZWxlY3RlZCk7XG4gICAgfVxuXG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShDdXN0b21lckxpc3QuVEFHX05BTUUsIEN1c3RvbWVyTGlzdCk7IiwiaW1wb3J0IHsgYSwgZGl2LCBlbXB0eSwgc3BhbiwgdGV4dCB9IGZyb20gXCIuLi9idWlsZGVyL0h0bWxCdWlsZGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBDdXN0b21lclJvdyBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICAgIHN0YXRpYyBUQUdfTkFNRSA9ICdjdXN0b21lci1yb3cnO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBzaGFkb3c6IFNoYWRvd1Jvb3Q7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zaGFkb3cgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJ30pOyAgICAgICAgXG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIHJldHVybiBbJ2ZpcnN0TmFtZScsICdsYXN0TmFtZScsICdzZWxlY3RlZCddO1xuICAgIH1cblxuICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJhdHRyIGNoYW5nZWRcIiwgbmFtZSk7XG4gICAgICAgIHRoaXMudXBkYXRlRG9tKCk7XG4gICAgfVxuICAgICAgXG5cbiAgICBwcml2YXRlIHVwZGF0ZURvbSgpIHtcbiAgICAgICAgZW1wdHkodGhpcy5zaGFkb3cpO1xuXG4gICAgICAgIGNvbnN0IGNyZWF0ZUxpbmsgPSAodGV4dENvbnRlbnQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgYUVsZW0gPSBhKHtocmVmOiAnIyd9LCB0ZXh0KHRleHRDb250ZW50KSk7XG4gICAgICAgICAgICBhRWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBDdXN0b21FdmVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICdjdXN0b21lci1jbGlja2VkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lOiB0aGlzLmZpcnN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdE5hbWU6IHRoaXMubGFzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gYUVsZW07XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgY29udGVudFRleHQgPSB0aGlzLmZpcnN0TmFtZSArIFwiIFwiICsgdGhpcy5sYXN0TmFtZTtcbiAgICAgICAgdGhpcy5zaGFkb3cuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICBkaXYoXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdjdXN0LXJvdydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgPyBzcGFuKHt9LCB0ZXh0KGNvbnRlbnRUZXh0KSlcbiAgICAgICAgICAgICAgICAgICAgOiBjcmVhdGVMaW5rKGNvbnRlbnRUZXh0KVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZURvbSgpO1xuICAgIH1cblxuICAgIGdldCBmaXJzdE5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdmaXJzdC1uYW1lJyk7XG4gICAgfVxuXG4gICAgc2V0IGZpcnN0TmFtZShmbjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdmaXJzdC1uYW1lJywgZm4pO1xuICAgICAgICB0aGlzLnVwZGF0ZURvbSgpO1xuICAgIH1cblxuICAgIGdldCBsYXN0TmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2xhc3QtbmFtZScpO1xuICAgIH1cblxuICAgIHNldCBsYXN0TmFtZShsbjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdsYXN0LW5hbWUnLCBsbik7XG4gICAgICAgIHRoaXMudXBkYXRlRG9tKCk7XG4gICAgfVxuXG4gICAgZ2V0IHNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGVkKHM6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdzZWxlY3RlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlRG9tKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIG5ld0luc3RhbmNlKGZpcnN0TmFtZTogc3RyaW5nLCBsYXN0TmFtZTogc3RyaW5nKTogQ3VzdG9tZXJSb3cge1xuICAgICAgICBjb25zdCByZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KEN1c3RvbWVyUm93LlRBR19OQU1FKSBhcyBDdXN0b21lclJvdztcbiAgICAgICAgcmVzLmZpcnN0TmFtZSA9IGZpcnN0TmFtZTtcbiAgICAgICAgcmVzLmxhc3ROYW1lID0gbGFzdE5hbWU7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY3VzdG9tZXItcm93JywgQ3VzdG9tZXJSb3cpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQ3VzdG9tZXJBcHAgfSBmcm9tIFwiLi9jdXN0b21lci9DdXN0b21lckFwcFwiO1xuXG4vLyBqdXN0IGZvciBpbXBvcnRzICFcbmNvbnNvbGUubG9nKCd5YWxsYScsIEN1c3RvbWVyQXBwLlRBR19OQU1FKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBlID0+IHtcbiAgICBjb25zdCBhcHA6IEN1c3RvbWVyQXBwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpIGFzIEN1c3RvbWVyQXBwO1xuICAgIGNvbnNvbGUubG9nKFwiYXBwIGxvYWRlZFwiLCBhcHApO1xuICAgIGFwcC5pbml0KFtcbiAgICAgICAgeyBmaXJzdE5hbWU6ICdUb3RvJywgbGFzdE5hbWU6ICdCaWxvdXRlJyB9LFxuICAgICAgICB7IGZpcnN0TmFtZTogJ0ZyZW5jaCcsIGxhc3ROYW1lOiAnRnJpZXMnIH0sXG4gICAgICAgIHsgZmlyc3ROYW1lOiAnRm9vJywgbGFzdE5hbWU6ICdCYXInIH0sXG4gICAgXSlcbn0pXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=