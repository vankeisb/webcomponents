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


/***/ }),

/***/ "./src/virtual-scroller/SafeParseInt.ts":
/*!**********************************************!*\
  !*** ./src/virtual-scroller/SafeParseInt.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "safeParseInt": () => (/* binding */ safeParseInt)
/* harmony export */ });
function safeParseInt(s) {
    const i = parseInt(s);
    if (isNaN(i)) {
        return 0;
    }
    return i;
}


/***/ }),

/***/ "./src/virtual-scroller/ScrollItem.ts":
/*!********************************************!*\
  !*** ./src/virtual-scroller/ScrollItem.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScrollItem": () => (/* binding */ ScrollItem)
/* harmony export */ });
/* harmony import */ var _builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../builder/HtmlBuilder */ "./src/builder/HtmlBuilder.ts");
/* harmony import */ var _SafeParseInt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SafeParseInt */ "./src/virtual-scroller/SafeParseInt.ts");


class ScrollItem extends HTMLElement {
    constructor() {
        super();
        this.wrapper = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.div)({}, (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.slot)({}));
        this.attachShadow({ mode: 'open' }).appendChild(this.wrapper);
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
    get top() {
        return (0,_SafeParseInt__WEBPACK_IMPORTED_MODULE_1__.safeParseInt)(this.getAttribute('top'));
    }
    set top(t) {
        this.setAttribute('top', t.toString());
    }
    get left() {
        return (0,_SafeParseInt__WEBPACK_IMPORTED_MODULE_1__.safeParseInt)(this.getAttribute('left'));
    }
    set left(l) {
        this.setAttribute('left', l.toString());
    }
    get width() {
        return (0,_SafeParseInt__WEBPACK_IMPORTED_MODULE_1__.safeParseInt)(this.getAttribute('width'));
    }
    set width(w) {
        this.setAttribute('width', w.toString());
    }
    get height() {
        return (0,_SafeParseInt__WEBPACK_IMPORTED_MODULE_1__.safeParseInt)(this.getAttribute('height'));
    }
    set height(h) {
        this.setAttribute('height', h.toString());
    }
}
ScrollItem.TAG_NAME = "scroll-item";
customElements.define(ScrollItem.TAG_NAME, ScrollItem);


/***/ }),

/***/ "./src/virtual-scroller/VirtualScroller.ts":
/*!*************************************************!*\
  !*** ./src/virtual-scroller/VirtualScroller.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VirtualScroller": () => (/* binding */ VirtualScroller)
/* harmony export */ });
/* harmony import */ var _builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../builder/HtmlBuilder */ "./src/builder/HtmlBuilder.ts");
/* harmony import */ var _SafeParseInt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SafeParseInt */ "./src/virtual-scroller/SafeParseInt.ts");
/* harmony import */ var _ScrollItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ScrollItem */ "./src/virtual-scroller/ScrollItem.ts");



class VirtualScroller extends HTMLElement {
    constructor() {
        super();
        this.scrollTimeout = undefined;
        this.counter = 0;
        this.contentPane = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.div)({ className: 'content-pane' }, (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.slot)({}));
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
        });
        const shadow = this.attachShadow({ mode: 'open' });
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
        debugger;
        this.setScrollPaneDimensions();
    }
    disconnectedCallback() {
        if (this.scrollTimeout) {
            this.counter++;
            clearTimeout(this.scrollTimeout);
        }
    }
    setScrollPaneDimensions() {
        this.contentPane.style.height = this.contentHeight + "px";
        this.contentPane.style.width = this.contentWidth + "px";
    }
    get contentHeight() {
        return (0,_SafeParseInt__WEBPACK_IMPORTED_MODULE_1__.safeParseInt)(this.getAttribute('content-height'));
    }
    set contentHeight(h) {
        this.setAttribute('content-height', h.toString());
    }
    get contentWidth() {
        return (0,_SafeParseInt__WEBPACK_IMPORTED_MODULE_1__.safeParseInt)(this.getAttribute('content-height'));
    }
    set contentWidth(w) {
        this.setAttribute('content-width', w.toString());
    }
    get top() {
        return (0,_SafeParseInt__WEBPACK_IMPORTED_MODULE_1__.safeParseInt)(this.getAttribute('top'));
    }
    set top(t) {
        this.setAttribute('top', t.toString());
    }
    get left() {
        return (0,_SafeParseInt__WEBPACK_IMPORTED_MODULE_1__.safeParseInt)(this.getAttribute('left'));
    }
    set left(l) {
        this.setAttribute('left', l.toString());
    }
    getScrollItems() {
        const items = this.shadowRoot.querySelectorAll(_ScrollItem__WEBPACK_IMPORTED_MODULE_2__.ScrollItem.TAG_NAME);
        debugger;
        return Array.from(items);
    }
}
VirtualScroller.TAG_NAME = "virtual-scroller";
customElements.define(VirtualScroller.TAG_NAME, VirtualScroller);


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
/* harmony import */ var _virtual_scroller_ScrollItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./virtual-scroller/ScrollItem */ "./src/virtual-scroller/ScrollItem.ts");
/* harmony import */ var _virtual_scroller_VirtualScroller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./virtual-scroller/VirtualScroller */ "./src/virtual-scroller/VirtualScroller.ts");



// just for imports !
console.log('yalla', _customer_CustomerApp__WEBPACK_IMPORTED_MODULE_0__.CustomerApp.TAG_NAME, _virtual_scroller_VirtualScroller__WEBPACK_IMPORTED_MODULE_2__.VirtualScroller.TAG_NAME, _virtual_scroller_ScrollItem__WEBPACK_IMPORTED_MODULE_1__.ScrollItem.TAG_NAME);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUUsU0FBUyxFQUFFO1FBQzFDLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFO1FBQzFDLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO0tBQ3hDLENBQUM7QUFDTixDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2J1aWxkZXIvSHRtbEJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy9jdXN0b21lci9DdXN0b21lckFwcC50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2N1c3RvbWVyL0N1c3RvbWVyRWRpdG9yLnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvY3VzdG9tZXIvQ3VzdG9tZXJMaXN0LnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvY3VzdG9tZXIvQ3VzdG9tZXJSb3cudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy92aXJ0dWFsLXNjcm9sbGVyL1NhZmVQYXJzZUludC50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL3ZpcnR1YWwtc2Nyb2xsZXIvU2Nyb2xsSXRlbS50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL3ZpcnR1YWwtc2Nyb2xsZXIvVmlydHVhbFNjcm9sbGVyLnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB0eXBlIERlZXBQYXJ0aWFsPFQ+ID0gUGFydGlhbDx7IFtQIGluIGtleW9mIFRdOiBEZWVwUGFydGlhbDxUW1BdPiB9PjtcblxudHlwZSBOb2RlQnVpbGRlcjxLIGV4dGVuZHMga2V5b2YgSFRNTEVsZW1lbnRUYWdOYW1lTWFwPiA9IChcbiAgYTogRGVlcFBhcnRpYWw8SFRNTEVsZW1lbnRUYWdOYW1lTWFwW0tdPixcbiAgLi4uYzogTm9kZVtdXG4pID0+IEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5vZGU8SyBleHRlbmRzIGtleW9mIEhUTUxFbGVtZW50VGFnTmFtZU1hcD4odGFnOiBLKTogTm9kZUJ1aWxkZXI8Sz4ge1xuICByZXR1cm4gKGE6IERlZXBQYXJ0aWFsPEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXT4sIC4uLmM6IE5vZGVbXSkgPT4ge1xuICAgIGNvbnN0IG46IEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBjLmZvckVhY2goKGNoaWxkKSA9PiBuLmFwcGVuZENoaWxkKGNoaWxkKSk7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGEpIGFzIEFycmF5PGtleW9mIHR5cGVvZiBhPjtcbiAgICBrZXlzLmZvckVhY2goKGspID0+IHNldFByb3BlcnR5KG4sIGssIGdldFByb3BlcnR5KGEsIGspKSk7XG4gICAgcmV0dXJuIG47XG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldFByb3BlcnR5PFQsIEsgZXh0ZW5kcyBrZXlvZiBUPihvOiBULCBrZXk6IEspOiBUW0tdIHtcbiAgcmV0dXJuIG9ba2V5XTtcbn1cblxuZnVuY3Rpb24gc2V0UHJvcGVydHk8VCwgSyBleHRlbmRzIGtleW9mIFQ+KG86IFQsIGtleTogSywgdmFsdWU6IFRbS10pOiB2b2lkIHtcbiAgb1trZXldID0gdmFsdWU7XG59XG5cbmV4cG9ydCBjb25zdCBkaXYgPSBub2RlKCdkaXYnKTtcbmV4cG9ydCBjb25zdCBzcGFuID0gbm9kZSgnc3BhbicpO1xuZXhwb3J0IGNvbnN0IGEgPSBub2RlKCdhJyk7XG5leHBvcnQgY29uc3QgcCA9IG5vZGUoJ3AnKTtcbmV4cG9ydCBjb25zdCBoMSA9IG5vZGUoJ2gxJyk7XG5leHBvcnQgY29uc3QgaW5wdXQgPSBub2RlKCdpbnB1dCcpO1xuZXhwb3J0IGNvbnN0IGxhYmVsID0gbm9kZSgnbGFiZWwnKTtcbmV4cG9ydCBjb25zdCBzbG90ID0gbm9kZSgnc2xvdCcpO1xuZXhwb3J0IGNvbnN0IHN0eWxlID0gbm9kZSgnc3R5bGUnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRleHQoczogc3RyaW5nKTogVGV4dCB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVtcHR5KGU6IE5vZGUpIHtcbiAgd2hpbGUoZS5maXJzdENoaWxkKSB7XG4gICAgZS5yZW1vdmVDaGlsZChlLmZpcnN0Q2hpbGQpO1xuICB9XG59IiwiaW1wb3J0IHsgZGl2LCBoMSwgdGV4dCB9IGZyb20gXCIuLi9idWlsZGVyL0h0bWxCdWlsZGVyXCI7XG5pbXBvcnQgeyBDdXN0b21lciB9IGZyb20gXCIuL0N1c3RvbWVyXCI7XG5pbXBvcnQgeyBDdXN0b21lckVkaXRvciB9IGZyb20gXCIuL0N1c3RvbWVyRWRpdG9yXCI7XG5pbXBvcnQgeyBDdXN0b21lckxpc3QgfSBmcm9tIFwiLi9DdXN0b21lckxpc3RcIjtcbmltcG9ydCB7IEN1c3RvbWVyUm93IH0gZnJvbSBcIi4vQ3VzdG9tZXJSb3dcIjtcblxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyQXBwIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gICAgc3RhdGljIFRBR19OQU1FID0gXCJjdXN0b21lcnMtYXBwXCI7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IGN1c3RvbWVyTGlzdDogQ3VzdG9tZXJMaXN0O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY3VzdG9tZXJFZGl0b3I6IEN1c3RvbWVyRWRpdG9yO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGNvbnN0IHNoYWRvdyA9IHRoaXMuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcblxuICAgICAgICB0aGlzLmN1c3RvbWVyTGlzdCA9IEN1c3RvbWVyTGlzdC5uZXdJbnN0YW5jZSgpO1xuICAgICAgICB0aGlzLmN1c3RvbWVyTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjdXN0b21lci1zZWxlY3RlZCcsIChlOiBDdXN0b21FdmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBmaXJzdE5hbWUsIGxhc3ROYW1lIH0gPSBlLmRldGFpbDtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJFZGl0b3IuZmlyc3ROYW1lID0gZmlyc3ROYW1lO1xuICAgICAgICAgICAgdGhpcy5jdXN0b21lckVkaXRvci5sYXN0TmFtZSA9IGxhc3ROYW1lO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmN1c3RvbWVyRWRpdG9yID0gQ3VzdG9tZXJFZGl0b3IubmV3SW5zdGFuY2UoKTtcbiAgICAgICAgdGhpcy5jdXN0b21lckVkaXRvci5hZGRFdmVudExpc3RlbmVyKCdjdXN0b21lci1jaGFuZ2VkJywgKGU6Q3VzdG9tRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZmlyc3ROYW1lLCBsYXN0TmFtZSB9ID0gZS5kZXRhaWw7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFJvdzogQ3VzdG9tZXJSb3cgfCB1bmRlZmluZWQgPSB0aGlzLmN1c3RvbWVyTGlzdC5nZXRTZWxlY3RlZFJvdygpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkUm93KSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRSb3cuZmlyc3ROYW1lID0gZmlyc3ROYW1lO1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkUm93Lmxhc3ROYW1lID0gbGFzdE5hbWU7ICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICBkaXYoXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdhcHAnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaDEoe30sIHRleHQoJ0xpc3QnKSksXG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21lckxpc3QsXG4gICAgICAgICAgICAgICAgaDEoe30sIHRleHQoJ0VkaXRvcicpKSxcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVyRWRpdG9yXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICBpbml0KGN1c3RvbWVyczogUmVhZG9ubHlBcnJheTxDdXN0b21lcj4pIHtcbiAgICAgICAgdGhpcy5jdXN0b21lckxpc3Quc2V0Q3VzdG9tZXJzKGN1c3RvbWVycyk7XG4gICAgICAgIHRoaXMuY3VzdG9tZXJFZGl0b3IuY2xlYXIoKTtcbiAgICB9XG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEN1c3RvbWVyQXBwLlRBR19OQU1FLCBDdXN0b21lckFwcCk7IiwiaW1wb3J0IHsgaW5wdXQsIGxhYmVsLCB0ZXh0IH0gZnJvbSBcIi4uL2J1aWxkZXIvSHRtbEJ1aWxkZXJcIjtcblxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyRWRpdG9yIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gICAgc3RhdGljIFRBR19OQU1FID0gJ2N1c3RvbWVyLWVkaXRvcic7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IGZpcnN0TmFtZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbGFzdE5hbWVJbnB1dDogSFRNTElucHV0RWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5maXJzdE5hbWVJbnB1dCA9IGlucHV0KHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgIG5hbWU6ICdmaXJzdC1uYW1lJ1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLmZpcnN0TmFtZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5maXJzdE5hbWUgPSB0aGlzLmZpcnN0TmFtZUlucHV0LnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5maXJlQ3VzdG9tZXJDaGFuZ2VkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubGFzdE5hbWVJbnB1dCA9IGlucHV0KHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgIG5hbWU6ICdsYXN0LW5hbWUnXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMubGFzdE5hbWVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubGFzdE5hbWUgPSB0aGlzLmxhc3ROYW1lSW5wdXQudmFsdWU7XG4gICAgICAgICAgICB0aGlzLmZpcmVDdXN0b21lckNoYW5nZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgc2hhZG93ID0gdGhpcy5hdHRhY2hTaGFkb3coe21vZGU6J29wZW4nfSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBsYWJlbExuOiBIVE1MTGFiZWxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgbGFiZWxMbi50ZXh0Q29udGVudCA9ICdMYXN0IG5hbWUnO1xuICAgICAgICBsYWJlbExuLmh0bWxGb3IgPSAnbGFzdC1uYW1lJztcblxuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQobGFiZWwoe2h0bWxGb3I6ICdmaXJzdC1uYW1lJ30sIHRleHQoJ0ZpcnN0IG5hbWUnKSkpO1xuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQodGhpcy5maXJzdE5hbWVJbnB1dCk7XG4gICAgICAgIHNoYWRvdy5hcHBlbmRDaGlsZChsYWJlbCh7aHRtbEZvcjogJ2xhc3QtbmFtZSd9LCB0ZXh0KCdMYXN0IG5hbWUnKSkpO1xuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQodGhpcy5sYXN0TmFtZUlucHV0KTtcbiAgICB9XG5cbiAgICBnZXQgZmlyc3ROYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnZmlyc3QtbmFtZScpO1xuICAgIH1cblxuICAgIHNldCBmaXJzdE5hbWUoZm46IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnZmlyc3QtbmFtZScsIGZuKTtcbiAgICAgICAgdGhpcy5maXJzdE5hbWVJbnB1dC52YWx1ZSA9IGZuO1xuICAgIH1cblxuICAgIGdldCBsYXN0TmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2xhc3QtbmFtZScpO1xuICAgIH1cblxuICAgIHNldCBsYXN0TmFtZShsbjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdsYXN0LW5hbWUnLCBsbik7XG4gICAgICAgIHRoaXMubGFzdE5hbWVJbnB1dC52YWx1ZSA9IGxuO1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLmZpcnN0TmFtZSA9ICcnO1xuICAgICAgICB0aGlzLmxhc3ROYW1lID0gJyc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRWYWx1ZXNGcm9tQXR0cmlidXRlcygpIHtcbiAgICAgICAgdGhpcy5maXJzdE5hbWVJbnB1dC52YWx1ZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdmaXJzdC1uYW1lJykgPz8gJyc7XG4gICAgICAgIHRoaXMubGFzdE5hbWVJbnB1dC52YWx1ZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdsYXN0LW5hbWUnKSA/PyAnJztcbiAgICB9XG5cbiAgICBwcml2YXRlIGZpcmVDdXN0b21lckNoYW5nZWQoKSB7XG4gICAgICAgIGNvbnN0IGN1c3RvbWVyQ2hhbmdlZEV2ZW50OiBDdXN0b21FdmVudCA9IG5ldyBDdXN0b21FdmVudChcbiAgICAgICAgICAgICdjdXN0b21lci1jaGFuZ2VkJyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lOiB0aGlzLmZpcnN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbGFzdE5hbWU6IHRoaXMubGFzdE5hbWUsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoY3VzdG9tZXJDaGFuZ2VkRXZlbnQpO1xuICAgIH1cblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLnNldFZhbHVlc0Zyb21BdHRyaWJ1dGVzKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIG5ld0luc3RhbmNlKGZpcnN0TmFtZTogc3RyaW5nID0gJycsIGxhc3ROYW1lOiBzdHJpbmcgPSAnJyk6IEN1c3RvbWVyRWRpdG9yIHtcbiAgICAgICAgY29uc3QgcmVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChDdXN0b21lckVkaXRvci5UQUdfTkFNRSkgYXMgQ3VzdG9tZXJFZGl0b3I7XG4gICAgICAgIHJlcy5maXJzdE5hbWUgPSBmaXJzdE5hbWU7XG4gICAgICAgIHJlcy5sYXN0TmFtZSA9IGxhc3ROYW1lO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEN1c3RvbWVyRWRpdG9yLlRBR19OQU1FLCBDdXN0b21lckVkaXRvcik7XG4iLCJpbXBvcnQgeyBkaXYsIGVtcHR5LCBzbG90LCB0ZXh0LCBwLCBzdHlsZSB9IGZyb20gXCIuLi9idWlsZGVyL0h0bWxCdWlsZGVyXCI7XG5pbXBvcnQgeyBDdXN0b21lciB9IGZyb20gXCIuL0N1c3RvbWVyXCI7XG5pbXBvcnQgeyBDdXN0b21lclJvdyB9IGZyb20gXCIuL0N1c3RvbWVyUm93XCI7XG5cbmV4cG9ydCBjbGFzcyBDdXN0b21lckxpc3QgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cbiAgICBzdGF0aWMgVEFHX05BTUUgPSAnY3VzdG9tZXItbGlzdCc7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IF9zbG90OiBIVE1MU2xvdEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICBcbiAgICAgICAgLy8gY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAvLyB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2N1c3QtbGlzdCcpO1xuICAgICAgICAvLyBjb25zdCBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2xvdCcpO1xuICAgICAgICAvLyBjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAvLyBwLnRleHRDb250ZW50ID0gJ05vIGN1c3RvbWVycyc7XG4gICAgICAgIC8vIHMuYXBwZW5kQ2hpbGQocCk7XG4gICAgICAgIC8vIHdyYXBwZXIuYXBwZW5kQ2hpbGQocyk7XG5cbiAgICAgICAgdGhpcy5fc2xvdCA9IHNsb3Qoe30sIHAoe30sIHRleHQoJ05vIGN1c3RvbWVycycpKSk7XG5cbiAgICAgICAgdGhpcy5hdHRhY2hTaGFkb3coe21vZGU6ICdvcGVuJ30pXG4gICAgICAgICAgICAuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICAgICAgZGl2KFxuICAgICAgICAgICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2N1c3QtbGlzdCd9LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zbG90LFxuICAgICAgICAgICAgICAgICAgICBzdHlsZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dChgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmN1c3QtbGlzdCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmVlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAvLyBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgIC8vIHN0eWxlLnRleHRDb250ZW50ID0gO1xuICAgICAgICAvLyB3cmFwcGVyLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICB9XG5cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5nZXRSb3dzKCkuZm9yRWFjaCh0aGlzLmFkZFJvd0V2ZW50TGlzdGVuZXIuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRSb3dzKCk6IFJlYWRvbmx5QXJyYXk8Q3VzdG9tZXJSb3c+IHtcbiAgICAgICAgY29uc3Qgcm93czogTm9kZUxpc3RPZjxDdXN0b21lclJvdz4gPSB0aGlzLl9zbG90LnF1ZXJ5U2VsZWN0b3JBbGwoQ3VzdG9tZXJSb3cuVEFHX05BTUUpO1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShyb3dzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFJvd0V2ZW50TGlzdGVuZXIocm93OiBDdXN0b21lclJvdykge1xuICAgICAgICByb3cuYWRkRXZlbnRMaXN0ZW5lcignY3VzdG9tZXItY2xpY2tlZCcsIChlOiBDdXN0b21FdmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGV0YWlsID0gZS5kZXRhaWw7ICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCB7IGZpcnN0TmFtZSwgbGFzdE5hbWUgfSA9IGRldGFpbDtcbiAgICAgICAgICAgIHRoaXMuZ2V0Um93cygpLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICAgICAgICByb3cuc2VsZWN0ZWQgPSByb3cuZmlyc3ROYW1lID09PSBmaXJzdE5hbWUgJiYgcm93Lmxhc3ROYW1lID09PSBsYXN0TmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgICAgICAgIG5ldyBDdXN0b21FdmVudChcbiAgICAgICAgICAgICAgICAgICAgJ2N1c3RvbWVyLXNlbGVjdGVkJyxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIG5ld0luc3RhbmNlKCk6IEN1c3RvbWVyTGlzdCB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KEN1c3RvbWVyTGlzdC5UQUdfTkFNRSkgYXMgQ3VzdG9tZXJMaXN0O1xuICAgIH1cblxuICAgIHNldEN1c3RvbWVycyhjdXN0b21lcnM6IFJlYWRvbmx5QXJyYXk8Q3VzdG9tZXI+KSB7XG4gICAgICAgIGVtcHR5KHRoaXMuX3Nsb3QpO1xuICAgICAgICBjdXN0b21lcnMuZm9yRWFjaChjID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IEN1c3RvbWVyUm93Lm5ld0luc3RhbmNlKGMuZmlyc3ROYW1lLCBjLmxhc3ROYW1lKTtcbiAgICAgICAgICAgIHRoaXMuYWRkUm93RXZlbnRMaXN0ZW5lcihyb3cpO1xuICAgICAgICAgICAgdGhpcy5fc2xvdC5hcHBlbmRDaGlsZChyb3cpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZFJvdygpOiBDdXN0b21lclJvdyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFJvd3MoKS5maW5kKHIgPT4gci5zZWxlY3RlZCk7XG4gICAgfVxuXG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShDdXN0b21lckxpc3QuVEFHX05BTUUsIEN1c3RvbWVyTGlzdCk7IiwiaW1wb3J0IHsgYSwgZGl2LCBlbXB0eSwgc3BhbiwgdGV4dCB9IGZyb20gXCIuLi9idWlsZGVyL0h0bWxCdWlsZGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBDdXN0b21lclJvdyBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICAgIHN0YXRpYyBUQUdfTkFNRSA9ICdjdXN0b21lci1yb3cnO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBzaGFkb3c6IFNoYWRvd1Jvb3Q7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zaGFkb3cgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJ30pOyAgICAgICAgXG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIHJldHVybiBbJ2ZpcnN0TmFtZScsICdsYXN0TmFtZScsICdzZWxlY3RlZCddO1xuICAgIH1cblxuICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJhdHRyIGNoYW5nZWRcIiwgbmFtZSk7XG4gICAgICAgIHRoaXMudXBkYXRlRG9tKCk7XG4gICAgfVxuICAgICAgXG5cbiAgICBwcml2YXRlIHVwZGF0ZURvbSgpIHtcbiAgICAgICAgZW1wdHkodGhpcy5zaGFkb3cpO1xuXG4gICAgICAgIGNvbnN0IGNyZWF0ZUxpbmsgPSAodGV4dENvbnRlbnQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgYUVsZW0gPSBhKHtocmVmOiAnIyd9LCB0ZXh0KHRleHRDb250ZW50KSk7XG4gICAgICAgICAgICBhRWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBDdXN0b21FdmVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICdjdXN0b21lci1jbGlja2VkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lOiB0aGlzLmZpcnN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdE5hbWU6IHRoaXMubGFzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gYUVsZW07XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgY29udGVudFRleHQgPSB0aGlzLmZpcnN0TmFtZSArIFwiIFwiICsgdGhpcy5sYXN0TmFtZTtcbiAgICAgICAgdGhpcy5zaGFkb3cuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICBkaXYoXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdjdXN0LXJvdydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgPyBzcGFuKHt9LCB0ZXh0KGNvbnRlbnRUZXh0KSlcbiAgICAgICAgICAgICAgICAgICAgOiBjcmVhdGVMaW5rKGNvbnRlbnRUZXh0KVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZURvbSgpO1xuICAgIH1cblxuICAgIGdldCBmaXJzdE5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdmaXJzdC1uYW1lJyk7XG4gICAgfVxuXG4gICAgc2V0IGZpcnN0TmFtZShmbjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdmaXJzdC1uYW1lJywgZm4pO1xuICAgICAgICB0aGlzLnVwZGF0ZURvbSgpO1xuICAgIH1cblxuICAgIGdldCBsYXN0TmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2xhc3QtbmFtZScpO1xuICAgIH1cblxuICAgIHNldCBsYXN0TmFtZShsbjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdsYXN0LW5hbWUnLCBsbik7XG4gICAgICAgIHRoaXMudXBkYXRlRG9tKCk7XG4gICAgfVxuXG4gICAgZ2V0IHNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGVkKHM6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdzZWxlY3RlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlRG9tKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIG5ld0luc3RhbmNlKGZpcnN0TmFtZTogc3RyaW5nLCBsYXN0TmFtZTogc3RyaW5nKTogQ3VzdG9tZXJSb3cge1xuICAgICAgICBjb25zdCByZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KEN1c3RvbWVyUm93LlRBR19OQU1FKSBhcyBDdXN0b21lclJvdztcbiAgICAgICAgcmVzLmZpcnN0TmFtZSA9IGZpcnN0TmFtZTtcbiAgICAgICAgcmVzLmxhc3ROYW1lID0gbGFzdE5hbWU7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY3VzdG9tZXItcm93JywgQ3VzdG9tZXJSb3cpOyIsImV4cG9ydCBmdW5jdGlvbiBzYWZlUGFyc2VJbnQoczpzdHJpbmcgfCBudWxsKTogbnVtYmVyIHtcbiAgICBjb25zdCBpID0gcGFyc2VJbnQocyk7XG4gICAgaWYgKGlzTmFOKGkpKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gaTtcbn0iLCJpbXBvcnQgeyBkaXYsIHNsb3QgfSBmcm9tIFwiLi4vYnVpbGRlci9IdG1sQnVpbGRlclwiO1xuaW1wb3J0IHsgc2FmZVBhcnNlSW50IH0gZnJvbSBcIi4vU2FmZVBhcnNlSW50XCI7XG5cbmV4cG9ydCBjbGFzcyBTY3JvbGxJdGVtIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gICAgc3RhdGljIFRBR19OQU1FID0gXCJzY3JvbGwtaXRlbVwiO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSB3cmFwcGVyOiBIVE1MRGl2RWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpOyAgICAgICAgXG4gICAgICAgIHRoaXMud3JhcHBlciA9IGRpdihcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgc2xvdCh7fSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hdHRhY2hTaGFkb3coe21vZGU6J29wZW4nfSkuYXBwZW5kQ2hpbGQodGhpcy53cmFwcGVyKTtcbiAgICB9XG5cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgZGVidWdnZXI7XG4gICAgICAgIHRoaXMud3JhcHBlci5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgdGhpcy53cmFwcGVyLnN0eWxlLnRvcCA9IHRoaXMudG9wICsgJ3B4JztcbiAgICAgICAgdGhpcy53cmFwcGVyLnN0eWxlLmxlZnQgPSB0aGlzLmxlZnQgKyAncHgnO1xuICAgIH1cblxuICAgIGNvbXB1dGVEaW1lbnNpb25zKCkge1xuICAgICAgICBkZWJ1Z2dlcjtcbiAgICAgICAgY29uc3QgYm94ID0gdGhpcy53cmFwcGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGJveC5oZWlnaHQ7XG4gICAgICAgIHRoaXMud2lkdGggPSBib3gud2lkdGg7XG4gICAgfVxuXG4gICAgZ2V0IHRvcCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc2FmZVBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCd0b3AnKSk7XG4gICAgfVxuXG4gICAgc2V0IHRvcCh0OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3RvcCcsIHQudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgZ2V0IGxlZnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNhZmVQYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgnbGVmdCcpKTtcbiAgICB9XG5cbiAgICBzZXQgbGVmdChsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2xlZnQnLCBsLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIGdldCB3aWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc2FmZVBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCd3aWR0aCcpKTsgICAgICAgIFxuICAgIH1cblxuICAgIHNldCB3aWR0aCh3OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgdy50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBnZXQgaGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpKTsgICAgICAgIFxuICAgIH1cblxuICAgIHNldCBoZWlnaHQoaDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBoLnRvU3RyaW5nKCkpO1xuICAgIH1cblxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoU2Nyb2xsSXRlbS5UQUdfTkFNRSwgU2Nyb2xsSXRlbSk7XG4iLCJpbXBvcnQgeyBkaXYsIHNsb3QsIHN0eWxlLCB0ZXh0IH0gZnJvbSBcIi4uL2J1aWxkZXIvSHRtbEJ1aWxkZXJcIjtcbmltcG9ydCB7IHNhZmVQYXJzZUludCB9IGZyb20gXCIuL1NhZmVQYXJzZUludFwiO1xuaW1wb3J0IHsgU2Nyb2xsSXRlbSB9IGZyb20gXCIuL1Njcm9sbEl0ZW1cIjtcblxuZXhwb3J0IGNsYXNzIFZpcnR1YWxTY3JvbGxlciBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICAgIHN0YXRpYyBUQUdfTkFNRSA9IFwidmlydHVhbC1zY3JvbGxlclwiO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBjb250ZW50UGFuZTogSFRNTERpdkVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBzY3JvbGxUaW1lb3V0OiBhbnkgPSB1bmRlZmluZWQ7XG4gICAgcHJpdmF0ZSBjb3VudGVyOiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5jb250ZW50UGFuZSA9IGRpdih7Y2xhc3NOYW1lOiAnY29udGVudC1wYW5lJ30sIHNsb3Qoe30pKTtcblxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsVGltZW91dCkge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNjcm9sbFRpbWVvdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb3VudGVyKys7XG4gICAgICAgICAgICBjb25zdCBfY291bnRlciA9IHRoaXMuY291bnRlcjtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvdW50ZXIgPT09IF9jb3VudGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1RvcCA9IHRoaXMuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdMZWZ0ID0gdGhpcy5zY3JvbGxMZWZ0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvcCA9IG5ld1RvcDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZWZ0ID0gbmV3TGVmdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxMCk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc3Qgc2hhZG93ID0gdGhpcy5hdHRhY2hTaGFkb3coe21vZGU6J29wZW4nfSk7XG4gICAgICAgIHNoYWRvdy5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnRQYW5lKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICdjb250ZW50LWhlaWdodCcsIFxuICAgICAgICAgICAgJ2NvbnRlbnQtd2lkdGgnLCBcbiAgICAgICAgICAgICd0b3AnLCBcbiAgICAgICAgICAgICdsZWZ0JywgXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIGRlYnVnZ2VyO1xuICAgICAgICB0aGlzLnNldFNjcm9sbFBhbmVEaW1lbnNpb25zKCk7XG4gICAgfVxuXG4gICAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIGlmICh0aGlzLnNjcm9sbFRpbWVvdXQpIHtcbiAgICAgICAgICAgIHRoaXMuY291bnRlcisrO1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuc2Nyb2xsVGltZW91dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFNjcm9sbFBhbmVEaW1lbnNpb25zKCkge1xuICAgICAgICB0aGlzLmNvbnRlbnRQYW5lLnN0eWxlLmhlaWdodCA9IHRoaXMuY29udGVudEhlaWdodCArIFwicHhcIjtcbiAgICAgICAgdGhpcy5jb250ZW50UGFuZS5zdHlsZS53aWR0aCA9IHRoaXMuY29udGVudFdpZHRoICsgXCJweFwiO1xuICAgIH1cblxuICAgIGdldCBjb250ZW50SGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQtaGVpZ2h0JykpO1xuICAgIH1cblxuICAgIHNldCBjb250ZW50SGVpZ2h0KGg6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnY29udGVudC1oZWlnaHQnLCBoLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIGdldCBjb250ZW50V2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNhZmVQYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgnY29udGVudC1oZWlnaHQnKSk7XG4gICAgfVxuXG4gICAgc2V0IGNvbnRlbnRXaWR0aCh3OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnQtd2lkdGgnLCB3LnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIGdldCB0b3AoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNhZmVQYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgndG9wJykpO1xuICAgIH1cblxuICAgIHNldCB0b3AodDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd0b3AnLCB0LnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIGdldCBsZWZ0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ2xlZnQnKSk7XG4gICAgfVxuXG4gICAgc2V0IGxlZnQobDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdsZWZ0JywgbC50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBnZXRTY3JvbGxJdGVtcygpOiBSZWFkb25seUFycmF5PFNjcm9sbEl0ZW0+IHtcbiAgICAgICAgY29uc3QgaXRlbXM6IE5vZGVMaXN0T2Y8U2Nyb2xsSXRlbT4gPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvckFsbChTY3JvbGxJdGVtLlRBR19OQU1FKTtcbiAgICAgICAgZGVidWdnZXI7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKGl0ZW1zKTtcbiAgICB9XG5cblxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoVmlydHVhbFNjcm9sbGVyLlRBR19OQU1FLCBWaXJ0dWFsU2Nyb2xsZXIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQ3VzdG9tZXJBcHAgfSBmcm9tIFwiLi9jdXN0b21lci9DdXN0b21lckFwcFwiO1xuaW1wb3J0IHsgU2Nyb2xsSXRlbSB9IGZyb20gXCIuL3ZpcnR1YWwtc2Nyb2xsZXIvU2Nyb2xsSXRlbVwiO1xuaW1wb3J0IHsgVmlydHVhbFNjcm9sbGVyIH0gZnJvbSBcIi4vdmlydHVhbC1zY3JvbGxlci9WaXJ0dWFsU2Nyb2xsZXJcIjtcblxuLy8ganVzdCBmb3IgaW1wb3J0cyAhXG5jb25zb2xlLmxvZygneWFsbGEnLCBDdXN0b21lckFwcC5UQUdfTkFNRSwgVmlydHVhbFNjcm9sbGVyLlRBR19OQU1FLCBTY3JvbGxJdGVtLlRBR19OQU1FKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBlID0+IHtcbiAgICBjb25zdCBhcHA6IEN1c3RvbWVyQXBwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpIGFzIEN1c3RvbWVyQXBwO1xuICAgIGNvbnNvbGUubG9nKFwiYXBwIGxvYWRlZFwiLCBhcHApO1xuICAgIGFwcC5pbml0KFtcbiAgICAgICAgeyBmaXJzdE5hbWU6ICdUb3RvJywgbGFzdE5hbWU6ICdCaWxvdXRlJyB9LFxuICAgICAgICB7IGZpcnN0TmFtZTogJ0ZyZW5jaCcsIGxhc3ROYW1lOiAnRnJpZXMnIH0sXG4gICAgICAgIHsgZmlyc3ROYW1lOiAnRm9vJywgbGFzdE5hbWU6ICdCYXInIH0sXG4gICAgXSlcbn0pXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=