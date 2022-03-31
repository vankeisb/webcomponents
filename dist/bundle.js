/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.ts":
/*!********************!*\
  !*** ./src/App.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "App": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./builder/HtmlBuilder */ "./src/builder/HtmlBuilder.ts");
/* harmony import */ var _widgets_CustomerEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./widgets/CustomerEditor */ "./src/widgets/CustomerEditor.ts");
/* harmony import */ var _widgets_CustomerList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./widgets/CustomerList */ "./src/widgets/CustomerList.ts");



class App extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        this.customerList = _widgets_CustomerList__WEBPACK_IMPORTED_MODULE_2__.CustomerList.newInstance();
        this.customerList.addEventListener('customer-selected', (e) => {
            const { firstName, lastName } = e.detail;
            this.customerEditor.firstName = firstName;
            this.customerEditor.lastName = lastName;
        });
        this.customerEditor = _widgets_CustomerEditor__WEBPACK_IMPORTED_MODULE_1__.CustomerEditor.newInstance();
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
App.TAG_NAME = "customers-app";
customElements.define(App.TAG_NAME, App);


/***/ }),

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

/***/ "./src/widgets/CustomerEditor.ts":
/*!***************************************!*\
  !*** ./src/widgets/CustomerEditor.ts ***!
  \***************************************/
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

/***/ "./src/widgets/CustomerList.ts":
/*!*************************************!*\
  !*** ./src/widgets/CustomerList.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomerList": () => (/* binding */ CustomerList)
/* harmony export */ });
/* harmony import */ var _builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../builder/HtmlBuilder */ "./src/builder/HtmlBuilder.ts");
/* harmony import */ var _CustomerRow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CustomerRow */ "./src/widgets/CustomerRow.ts");


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

/***/ "./src/widgets/CustomerRow.ts":
/*!************************************!*\
  !*** ./src/widgets/CustomerRow.ts ***!
  \************************************/
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
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ "./src/App.ts");

// just for imports !
console.log('yalla', _App__WEBPACK_IMPORTED_MODULE_0__.App.TAG_NAME);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ040QjtBQUs1QixxQkFBcUI7QUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsOENBQVksQ0FBQyxDQUFDO0FBRW5DLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDaEMsTUFBTSxHQUFHLEdBQVEsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQVEsQ0FBQztJQUN2RCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMvQixHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ0wsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUU7UUFDMUMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUU7UUFDMUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7S0FDeEMsQ0FBQztBQUNOLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvQXBwLnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvYnVpbGRlci9IdG1sQnVpbGRlci50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL3dpZGdldHMvQ3VzdG9tZXJFZGl0b3IudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy93aWRnZXRzL0N1c3RvbWVyTGlzdC50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL3dpZGdldHMvQ3VzdG9tZXJSb3cudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGl2LCBoMSwgdGV4dCB9IGZyb20gXCIuL2J1aWxkZXIvSHRtbEJ1aWxkZXJcIjtcbmltcG9ydCB7IEN1c3RvbWVyIH0gZnJvbSBcIi4vQ3VzdG9tZXJcIjtcbmltcG9ydCB7IEN1c3RvbWVyRWRpdG9yIH0gZnJvbSBcIi4vd2lkZ2V0cy9DdXN0b21lckVkaXRvclwiO1xuaW1wb3J0IHsgQ3VzdG9tZXJMaXN0IH0gZnJvbSBcIi4vd2lkZ2V0cy9DdXN0b21lckxpc3RcIjtcbmltcG9ydCB7IEN1c3RvbWVyUm93IH0gZnJvbSBcIi4vd2lkZ2V0cy9DdXN0b21lclJvd1wiO1xuXG5leHBvcnQgY2xhc3MgQXBwIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gICAgc3RhdGljIFRBR19OQU1FID0gXCJjdXN0b21lcnMtYXBwXCI7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IGN1c3RvbWVyTGlzdDogQ3VzdG9tZXJMaXN0O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY3VzdG9tZXJFZGl0b3I6IEN1c3RvbWVyRWRpdG9yO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGNvbnN0IHNoYWRvdyA9IHRoaXMuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcblxuICAgICAgICB0aGlzLmN1c3RvbWVyTGlzdCA9IEN1c3RvbWVyTGlzdC5uZXdJbnN0YW5jZSgpO1xuICAgICAgICB0aGlzLmN1c3RvbWVyTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjdXN0b21lci1zZWxlY3RlZCcsIChlOiBDdXN0b21FdmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBmaXJzdE5hbWUsIGxhc3ROYW1lIH0gPSBlLmRldGFpbDtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJFZGl0b3IuZmlyc3ROYW1lID0gZmlyc3ROYW1lO1xuICAgICAgICAgICAgdGhpcy5jdXN0b21lckVkaXRvci5sYXN0TmFtZSA9IGxhc3ROYW1lO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmN1c3RvbWVyRWRpdG9yID0gQ3VzdG9tZXJFZGl0b3IubmV3SW5zdGFuY2UoKTtcbiAgICAgICAgdGhpcy5jdXN0b21lckVkaXRvci5hZGRFdmVudExpc3RlbmVyKCdjdXN0b21lci1jaGFuZ2VkJywgKGU6Q3VzdG9tRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZmlyc3ROYW1lLCBsYXN0TmFtZSB9ID0gZS5kZXRhaWw7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFJvdzogQ3VzdG9tZXJSb3cgfCB1bmRlZmluZWQgPSB0aGlzLmN1c3RvbWVyTGlzdC5nZXRTZWxlY3RlZFJvdygpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkUm93KSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRSb3cuZmlyc3ROYW1lID0gZmlyc3ROYW1lO1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkUm93Lmxhc3ROYW1lID0gbGFzdE5hbWU7ICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICBkaXYoXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdhcHAnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaDEoe30sIHRleHQoJ0xpc3QnKSksXG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21lckxpc3QsXG4gICAgICAgICAgICAgICAgaDEoe30sIHRleHQoJ0VkaXRvcicpKSxcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVyRWRpdG9yXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICBpbml0KGN1c3RvbWVyczogUmVhZG9ubHlBcnJheTxDdXN0b21lcj4pIHtcbiAgICAgICAgdGhpcy5jdXN0b21lckxpc3Quc2V0Q3VzdG9tZXJzKGN1c3RvbWVycyk7XG4gICAgICAgIHRoaXMuY3VzdG9tZXJFZGl0b3IuY2xlYXIoKTtcbiAgICB9XG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEFwcC5UQUdfTkFNRSwgQXBwKTsiLCJleHBvcnQgdHlwZSBEZWVwUGFydGlhbDxUPiA9IFBhcnRpYWw8eyBbUCBpbiBrZXlvZiBUXTogRGVlcFBhcnRpYWw8VFtQXT4gfT47XG5cbnR5cGUgTm9kZUJ1aWxkZXI8SyBleHRlbmRzIGtleW9mIEhUTUxFbGVtZW50VGFnTmFtZU1hcD4gPSAoXG4gIGE6IERlZXBQYXJ0aWFsPEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXT4sXG4gIC4uLmM6IE5vZGVbXVxuKSA9PiBIVE1MRWxlbWVudFRhZ05hbWVNYXBbS107XG5cbmV4cG9ydCBmdW5jdGlvbiBub2RlPEsgZXh0ZW5kcyBrZXlvZiBIVE1MRWxlbWVudFRhZ05hbWVNYXA+KHRhZzogSyk6IE5vZGVCdWlsZGVyPEs+IHtcbiAgcmV0dXJuIChhOiBEZWVwUGFydGlhbDxIVE1MRWxlbWVudFRhZ05hbWVNYXBbS10+LCAuLi5jOiBOb2RlW10pID0+IHtcbiAgICBjb25zdCBuOiBIVE1MRWxlbWVudFRhZ05hbWVNYXBbS10gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgYy5mb3JFYWNoKChjaGlsZCkgPT4gbi5hcHBlbmRDaGlsZChjaGlsZCkpO1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhhKSBhcyBBcnJheTxrZXlvZiB0eXBlb2YgYT47XG4gICAga2V5cy5mb3JFYWNoKChrKSA9PiBzZXRQcm9wZXJ0eShuLCBrLCBnZXRQcm9wZXJ0eShhLCBrKSkpO1xuICAgIHJldHVybiBuO1xuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRQcm9wZXJ0eTxULCBLIGV4dGVuZHMga2V5b2YgVD4obzogVCwga2V5OiBLKTogVFtLXSB7XG4gIHJldHVybiBvW2tleV07XG59XG5cbmZ1bmN0aW9uIHNldFByb3BlcnR5PFQsIEsgZXh0ZW5kcyBrZXlvZiBUPihvOiBULCBrZXk6IEssIHZhbHVlOiBUW0tdKTogdm9pZCB7XG4gIG9ba2V5XSA9IHZhbHVlO1xufVxuXG5leHBvcnQgY29uc3QgZGl2ID0gbm9kZSgnZGl2Jyk7XG5leHBvcnQgY29uc3Qgc3BhbiA9IG5vZGUoJ3NwYW4nKTtcbmV4cG9ydCBjb25zdCBhID0gbm9kZSgnYScpO1xuZXhwb3J0IGNvbnN0IHAgPSBub2RlKCdwJyk7XG5leHBvcnQgY29uc3QgaDEgPSBub2RlKCdoMScpO1xuZXhwb3J0IGNvbnN0IGlucHV0ID0gbm9kZSgnaW5wdXQnKTtcbmV4cG9ydCBjb25zdCBsYWJlbCA9IG5vZGUoJ2xhYmVsJyk7XG5leHBvcnQgY29uc3Qgc2xvdCA9IG5vZGUoJ3Nsb3QnKTtcbmV4cG9ydCBjb25zdCBzdHlsZSA9IG5vZGUoJ3N0eWxlJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXh0KHM6IHN0cmluZyk6IFRleHQge1xuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbXB0eShlOiBOb2RlKSB7XG4gIHdoaWxlKGUuZmlyc3RDaGlsZCkge1xuICAgIGUucmVtb3ZlQ2hpbGQoZS5maXJzdENoaWxkKTtcbiAgfVxufSIsImltcG9ydCB7IGlucHV0LCBsYWJlbCwgdGV4dCB9IGZyb20gXCIuLi9idWlsZGVyL0h0bWxCdWlsZGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBDdXN0b21lckVkaXRvciBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICAgIHN0YXRpYyBUQUdfTkFNRSA9ICdjdXN0b21lci1lZGl0b3InO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBmaXJzdE5hbWVJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxhc3ROYW1lSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZmlyc3ROYW1lSW5wdXQgPSBpbnB1dCh7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICBuYW1lOiAnZmlyc3QtbmFtZSdcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5maXJzdE5hbWVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmlyc3ROYW1lID0gdGhpcy5maXJzdE5hbWVJbnB1dC52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZmlyZUN1c3RvbWVyQ2hhbmdlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmxhc3ROYW1lSW5wdXQgPSBpbnB1dCh7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICBuYW1lOiAnbGFzdC1uYW1lJ1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLmxhc3ROYW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxhc3ROYW1lID0gdGhpcy5sYXN0TmFtZUlucHV0LnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5maXJlQ3VzdG9tZXJDaGFuZ2VkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHNoYWRvdyA9IHRoaXMuYXR0YWNoU2hhZG93KHttb2RlOidvcGVuJ30pO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbGFiZWxMbjogSFRNTExhYmVsRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIGxhYmVsTG4udGV4dENvbnRlbnQgPSAnTGFzdCBuYW1lJztcbiAgICAgICAgbGFiZWxMbi5odG1sRm9yID0gJ2xhc3QtbmFtZSc7XG5cbiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKGxhYmVsKHtodG1sRm9yOiAnZmlyc3QtbmFtZSd9LCB0ZXh0KCdGaXJzdCBuYW1lJykpKTtcbiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKHRoaXMuZmlyc3ROYW1lSW5wdXQpO1xuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQobGFiZWwoe2h0bWxGb3I6ICdsYXN0LW5hbWUnfSwgdGV4dCgnTGFzdCBuYW1lJykpKTtcbiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKHRoaXMubGFzdE5hbWVJbnB1dCk7XG4gICAgfVxuXG4gICAgZ2V0IGZpcnN0TmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2ZpcnN0LW5hbWUnKTtcbiAgICB9XG5cbiAgICBzZXQgZmlyc3ROYW1lKGZuOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2ZpcnN0LW5hbWUnLCBmbik7XG4gICAgICAgIHRoaXMuZmlyc3ROYW1lSW5wdXQudmFsdWUgPSBmbjtcbiAgICB9XG5cbiAgICBnZXQgbGFzdE5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdsYXN0LW5hbWUnKTtcbiAgICB9XG5cbiAgICBzZXQgbGFzdE5hbWUobG46IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnbGFzdC1uYW1lJywgbG4pO1xuICAgICAgICB0aGlzLmxhc3ROYW1lSW5wdXQudmFsdWUgPSBsbjtcbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5maXJzdE5hbWUgPSAnJztcbiAgICAgICAgdGhpcy5sYXN0TmFtZSA9ICcnO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0VmFsdWVzRnJvbUF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIHRoaXMuZmlyc3ROYW1lSW5wdXQudmFsdWUgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZmlyc3QtbmFtZScpID8/ICcnO1xuICAgICAgICB0aGlzLmxhc3ROYW1lSW5wdXQudmFsdWUgPSB0aGlzLmdldEF0dHJpYnV0ZSgnbGFzdC1uYW1lJykgPz8gJyc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaXJlQ3VzdG9tZXJDaGFuZ2VkKCkge1xuICAgICAgICBjb25zdCBjdXN0b21lckNoYW5nZWRFdmVudDogQ3VzdG9tRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXG4gICAgICAgICAgICAnY3VzdG9tZXItY2hhbmdlZCcsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogdGhpcy5maXJzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiB0aGlzLmxhc3ROYW1lLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGN1c3RvbWVyQ2hhbmdlZEV2ZW50KTtcbiAgICB9XG5cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5zZXRWYWx1ZXNGcm9tQXR0cmlidXRlcygpO1xuICAgIH1cblxuICAgIHN0YXRpYyBuZXdJbnN0YW5jZShmaXJzdE5hbWU6IHN0cmluZyA9ICcnLCBsYXN0TmFtZTogc3RyaW5nID0gJycpOiBDdXN0b21lckVkaXRvciB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoQ3VzdG9tZXJFZGl0b3IuVEFHX05BTUUpIGFzIEN1c3RvbWVyRWRpdG9yO1xuICAgICAgICByZXMuZmlyc3ROYW1lID0gZmlyc3ROYW1lO1xuICAgICAgICByZXMubGFzdE5hbWUgPSBsYXN0TmFtZTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShDdXN0b21lckVkaXRvci5UQUdfTkFNRSwgQ3VzdG9tZXJFZGl0b3IpO1xuIiwiaW1wb3J0IHsgZGl2LCBlbXB0eSwgc2xvdCwgdGV4dCwgcCwgc3R5bGUgfSBmcm9tIFwiLi4vYnVpbGRlci9IdG1sQnVpbGRlclwiO1xuaW1wb3J0IHsgQ3VzdG9tZXIgfSBmcm9tIFwiLi4vQ3VzdG9tZXJcIjtcbmltcG9ydCB7IEN1c3RvbWVyUm93IH0gZnJvbSBcIi4vQ3VzdG9tZXJSb3dcIjtcblxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyTGlzdCBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICAgIHN0YXRpYyBUQUdfTkFNRSA9ICdjdXN0b21lci1saXN0JztcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Nsb3Q6IEhUTUxTbG90RWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIFxuICAgICAgICAvLyBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIC8vIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnY3VzdC1saXN0Jyk7XG4gICAgICAgIC8vIGNvbnN0IHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzbG90Jyk7XG4gICAgICAgIC8vIGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIC8vIHAudGV4dENvbnRlbnQgPSAnTm8gY3VzdG9tZXJzJztcbiAgICAgICAgLy8gcy5hcHBlbmRDaGlsZChwKTtcbiAgICAgICAgLy8gd3JhcHBlci5hcHBlbmRDaGlsZChzKTtcblxuICAgICAgICB0aGlzLl9zbG90ID0gc2xvdCh7fSwgcCh7fSwgdGV4dCgnTm8gY3VzdG9tZXJzJykpKTtcblxuICAgICAgICB0aGlzLmF0dGFjaFNoYWRvdyh7bW9kZTogJ29wZW4nfSlcbiAgICAgICAgICAgIC5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgICAgICBkaXYoXG4gICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnY3VzdC1saXN0J30sXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nsb3QsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlKFxuICAgICAgICAgICAgICAgICAgICAgICAge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0KGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3VzdC1saXN0IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyZWVuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIC8vIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgLy8gc3R5bGUudGV4dENvbnRlbnQgPSA7XG4gICAgICAgIC8vIHdyYXBwZXIuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgIH1cblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLmdldFJvd3MoKS5mb3JFYWNoKHRoaXMuYWRkUm93RXZlbnRMaXN0ZW5lci5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFJvd3MoKTogUmVhZG9ubHlBcnJheTxDdXN0b21lclJvdz4ge1xuICAgICAgICBjb25zdCByb3dzOiBOb2RlTGlzdE9mPEN1c3RvbWVyUm93PiA9IHRoaXMuX3Nsb3QucXVlcnlTZWxlY3RvckFsbChDdXN0b21lclJvdy5UQUdfTkFNRSk7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHJvd3MpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkUm93RXZlbnRMaXN0ZW5lcihyb3c6IEN1c3RvbWVyUm93KSB7XG4gICAgICAgIHJvdy5hZGRFdmVudExpc3RlbmVyKCdjdXN0b21lci1jbGlja2VkJywgKGU6IEN1c3RvbUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkZXRhaWwgPSBlLmRldGFpbDsgICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHsgZmlyc3ROYW1lLCBsYXN0TmFtZSB9ID0gZGV0YWlsO1xuICAgICAgICAgICAgdGhpcy5nZXRSb3dzKCkuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICAgICAgICAgIHJvdy5zZWxlY3RlZCA9IHJvdy5maXJzdE5hbWUgPT09IGZpcnN0TmFtZSAmJiByb3cubGFzdE5hbWUgPT09IGxhc3ROYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KFxuICAgICAgICAgICAgICAgICAgICAnY3VzdG9tZXItc2VsZWN0ZWQnLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgbmV3SW5zdGFuY2UoKTogQ3VzdG9tZXJMaXN0IHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoQ3VzdG9tZXJMaXN0LlRBR19OQU1FKSBhcyBDdXN0b21lckxpc3Q7XG4gICAgfVxuXG4gICAgc2V0Q3VzdG9tZXJzKGN1c3RvbWVyczogUmVhZG9ubHlBcnJheTxDdXN0b21lcj4pIHtcbiAgICAgICAgZW1wdHkodGhpcy5fc2xvdCk7XG4gICAgICAgIGN1c3RvbWVycy5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgY29uc3Qgcm93ID0gQ3VzdG9tZXJSb3cubmV3SW5zdGFuY2UoYy5maXJzdE5hbWUsIGMubGFzdE5hbWUpO1xuICAgICAgICAgICAgdGhpcy5hZGRSb3dFdmVudExpc3RlbmVyKHJvdyk7XG4gICAgICAgICAgICB0aGlzLl9zbG90LmFwcGVuZENoaWxkKHJvdyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldFNlbGVjdGVkUm93KCk6IEN1c3RvbWVyUm93IHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Um93cygpLmZpbmQociA9PiByLnNlbGVjdGVkKTtcbiAgICB9XG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEN1c3RvbWVyTGlzdC5UQUdfTkFNRSwgQ3VzdG9tZXJMaXN0KTsiLCJpbXBvcnQgeyBhLCBkaXYsIGVtcHR5LCBzcGFuLCB0ZXh0IH0gZnJvbSBcIi4uL2J1aWxkZXIvSHRtbEJ1aWxkZXJcIjtcblxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyUm93IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gICAgc3RhdGljIFRBR19OQU1FID0gJ2N1c3RvbWVyLXJvdyc7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IHNoYWRvdzogU2hhZG93Um9vdDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnNoYWRvdyA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nfSk7ICAgICAgICBcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICAgICAgcmV0dXJuIFsnZmlyc3ROYW1lJywgJ2xhc3ROYW1lJywgJ3NlbGVjdGVkJ107XG4gICAgfVxuXG4gICAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWU6IHN0cmluZykge1xuICAgICAgICBjb25zb2xlLmxvZyhcImF0dHIgY2hhbmdlZFwiLCBuYW1lKTtcbiAgICAgICAgdGhpcy51cGRhdGVEb20oKTtcbiAgICB9XG4gICAgICBcblxuICAgIHByaXZhdGUgdXBkYXRlRG9tKCkge1xuICAgICAgICBlbXB0eSh0aGlzLnNoYWRvdyk7XG5cbiAgICAgICAgY29uc3QgY3JlYXRlTGluayA9ICh0ZXh0Q29udGVudDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhRWxlbSA9IGEoe2hyZWY6ICcjJ30sIHRleHQodGV4dENvbnRlbnQpKTtcbiAgICAgICAgICAgIGFFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICAgICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2N1c3RvbWVyLWNsaWNrZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IHRoaXMuZmlyc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZTogdGhpcy5sYXN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBhRWxlbTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjb250ZW50VGV4dCA9IHRoaXMuZmlyc3ROYW1lICsgXCIgXCIgKyB0aGlzLmxhc3ROYW1lO1xuICAgICAgICB0aGlzLnNoYWRvdy5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIGRpdihcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2N1c3Qtcm93J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFxuICAgICAgICAgICAgICAgICAgICA/IHNwYW4oe30sIHRleHQoY29udGVudFRleHQpKVxuICAgICAgICAgICAgICAgICAgICA6IGNyZWF0ZUxpbmsoY29udGVudFRleHQpXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMudXBkYXRlRG9tKCk7XG4gICAgfVxuXG4gICAgZ2V0IGZpcnN0TmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2ZpcnN0LW5hbWUnKTtcbiAgICB9XG5cbiAgICBzZXQgZmlyc3ROYW1lKGZuOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2ZpcnN0LW5hbWUnLCBmbik7XG4gICAgICAgIHRoaXMudXBkYXRlRG9tKCk7XG4gICAgfVxuXG4gICAgZ2V0IGxhc3ROYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnbGFzdC1uYW1lJyk7XG4gICAgfVxuXG4gICAgc2V0IGxhc3ROYW1lKGxuOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2xhc3QtbmFtZScsIGxuKTtcbiAgICAgICAgdGhpcy51cGRhdGVEb20oKTtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgnc2VsZWN0ZWQnKTtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0ZWQoczogYm9vbGVhbikge1xuICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVEb20oKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbmV3SW5zdGFuY2UoZmlyc3ROYW1lOiBzdHJpbmcsIGxhc3ROYW1lOiBzdHJpbmcpOiBDdXN0b21lclJvdyB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoQ3VzdG9tZXJSb3cuVEFHX05BTUUpIGFzIEN1c3RvbWVyUm93O1xuICAgICAgICByZXMuZmlyc3ROYW1lID0gZmlyc3ROYW1lO1xuICAgICAgICByZXMubGFzdE5hbWUgPSBsYXN0TmFtZTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjdXN0b21lci1yb3cnLCBDdXN0b21lclJvdyk7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBBcHAgfSBmcm9tIFwiLi9BcHBcIjtcbmltcG9ydCB7IEN1c3RvbWVyRWRpdG9yIH0gZnJvbSBcIi4vd2lkZ2V0cy9DdXN0b21lckVkaXRvclwiO1xuaW1wb3J0IHsgQ3VzdG9tZXJMaXN0IH0gZnJvbSBcIi4vd2lkZ2V0cy9DdXN0b21lckxpc3RcIjtcbmltcG9ydCB7IEN1c3RvbWVyUm93IH0gZnJvbSBcIi4vd2lkZ2V0cy9DdXN0b21lclJvd1wiO1xuXG4vLyBqdXN0IGZvciBpbXBvcnRzICFcbmNvbnNvbGUubG9nKCd5YWxsYScsIEFwcC5UQUdfTkFNRSk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZSA9PiB7XG4gICAgY29uc3QgYXBwOiBBcHAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykgYXMgQXBwO1xuICAgIGNvbnNvbGUubG9nKFwiYXBwIGxvYWRlZFwiLCBhcHApO1xuICAgIGFwcC5pbml0KFtcbiAgICAgICAgeyBmaXJzdE5hbWU6ICdUb3RvJywgbGFzdE5hbWU6ICdCaWxvdXRlJyB9LFxuICAgICAgICB7IGZpcnN0TmFtZTogJ0ZyZW5jaCcsIGxhc3ROYW1lOiAnRnJpZXMnIH0sXG4gICAgICAgIHsgZmlyc3ROYW1lOiAnRm9vJywgbGFzdE5hbWU6ICdCYXInIH0sXG4gICAgXSlcbn0pXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=