/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/SafeParseInt.ts":
/*!*****************************!*\
  !*** ./src/SafeParseInt.ts ***!
  \*****************************/
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

/***/ "./src/diagram/DgDiagram.ts":
/*!**********************************!*\
  !*** ./src/diagram/DgDiagram.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DgDiagram": () => (/* binding */ DgDiagram)
/* harmony export */ });
/* harmony import */ var _builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../builder/HtmlBuilder */ "./src/builder/HtmlBuilder.ts");

const diagStyles = `
    .dg-diagram {
        height: 100%;
        position: relative;
    }
    .dg-scroll-pane {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        overflow: auto;
    }
    .dg-content-pane {
        background-color: lightgrey;
        position: relative;
    }
`;
class DgDiagram extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const contentPane = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.div)({ className: 'dg-content-pane' }, (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.slot)({}));
        const scrollPane = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.div)({ className: 'dg-scroll-pane' }, contentPane);
        shadow.appendChild(scrollPane);
        shadow.appendChild((0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.style)({}, (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.text)(diagStyles)));
    }
    connectedCallback() {
    }
}
DgDiagram.TAG = "dg-diagram";
customElements.define(DgDiagram.TAG, DgDiagram);


/***/ }),

/***/ "./src/diagram/DgNode.ts":
/*!*******************************!*\
  !*** ./src/diagram/DgNode.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DgNode": () => (/* binding */ DgNode)
/* harmony export */ });
/* harmony import */ var _builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../builder/HtmlBuilder */ "./src/builder/HtmlBuilder.ts");
/* harmony import */ var _SafeParseInt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SafeParseInt */ "./src/SafeParseInt.ts");


const css = `
    .dg-node {
        position: absolute;
        display: flex;        
    }
`;
class DgNode extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        this.dgNode = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.div)({ className: 'dg-node' }, (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.slot)({}));
        shadow.appendChild(this.dgNode);
        shadow.appendChild((0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.style)({}, (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.text)(css)));
    }
    connectedCallback() {
        const s = this.dgNode.style;
        s.left = this.x + "px";
        s.top = this.y + "px";
        s.width = this.w + "px";
        s.height = this.h + "px";
    }
    get x() {
        return (0,_SafeParseInt__WEBPACK_IMPORTED_MODULE_1__.safeParseInt)(this.getAttribute('x'));
    }
    get y() {
        return (0,_SafeParseInt__WEBPACK_IMPORTED_MODULE_1__.safeParseInt)(this.getAttribute('y'));
    }
    get h() {
        return (0,_SafeParseInt__WEBPACK_IMPORTED_MODULE_1__.safeParseInt)(this.getAttribute('h'));
    }
    get w() {
        return (0,_SafeParseInt__WEBPACK_IMPORTED_MODULE_1__.safeParseInt)(this.getAttribute('w'));
    }
}
DgNode.TAG = "dg-node";
customElements.define(DgNode.TAG, DgNode);


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
/* harmony import */ var _SafeParseInt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SafeParseInt */ "./src/SafeParseInt.ts");


class ScrollItem extends HTMLElement {
    constructor() {
        super();
        this.wrapper = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.div)({}, (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.slot)({}));
        this.attachShadow({ mode: 'open' }).appendChild(this.wrapper);
    }
    connectedCallback() {
        this.wrapper.style.position = "absolute";
        this.wrapper.style.top = this.top + 'px';
        this.wrapper.style.left = this.left + 'px';
        // ugly ! need a timeout here to let browser render otherwise the element isn't yet sized
        // TODO find way to get called when the component has been rendered
        setTimeout(() => {
            this.computeDimensions();
        }, 0);
    }
    computeDimensions() {
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
/* harmony import */ var _SafeParseInt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SafeParseInt */ "./src/SafeParseInt.ts");
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
        const items = this.querySelectorAll(_ScrollItem__WEBPACK_IMPORTED_MODULE_2__.ScrollItem.TAG_NAME);
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
/* harmony import */ var _diagram_DgDiagram__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./diagram/DgDiagram */ "./src/diagram/DgDiagram.ts");
/* harmony import */ var _diagram_DgNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./diagram/DgNode */ "./src/diagram/DgNode.ts");
/* harmony import */ var _virtual_scroller_ScrollItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./virtual-scroller/ScrollItem */ "./src/virtual-scroller/ScrollItem.ts");
/* harmony import */ var _virtual_scroller_VirtualScroller__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./virtual-scroller/VirtualScroller */ "./src/virtual-scroller/VirtualScroller.ts");





// just for imports !
console.log('yalla', _customer_CustomerApp__WEBPACK_IMPORTED_MODULE_0__.CustomerApp.TAG_NAME, _virtual_scroller_VirtualScroller__WEBPACK_IMPORTED_MODULE_4__.VirtualScroller.TAG_NAME, _virtual_scroller_ScrollItem__WEBPACK_IMPORTED_MODULE_3__.ScrollItem.TAG_NAME, _diagram_DgDiagram__WEBPACK_IMPORTED_MODULE_1__.DgDiagram.TAG, _diagram_DgNode__WEBPACK_IMPORTED_MODULE_2__.DgNode.TAG);
// window.addEventListener('load', e => {
//     const app: CustomerApp = document.getElementById('app') as CustomerApp;
//     console.log("app loaded", app);
//     app.init([
//         { firstName: 'Toto', lastName: 'Biloute' },
//         { firstName: 'French', lastName: 'Fries' },
//         { firstName: 'Foo', lastName: 'Bar' },
//     ])
// })

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cmMvU2FmZVBhcnNlSW50LnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvYnVpbGRlci9IdG1sQnVpbGRlci50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2N1c3RvbWVyL0N1c3RvbWVyQXBwLnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvY3VzdG9tZXIvQ3VzdG9tZXJFZGl0b3IudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy9jdXN0b21lci9DdXN0b21lckxpc3QudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy9jdXN0b21lci9DdXN0b21lclJvdy50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2RpYWdyYW0vRGdEaWFncmFtLnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvZGlhZ3JhbS9EZ05vZGUudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy92aXJ0dWFsLXNjcm9sbGVyL1Njcm9sbEl0ZW0udHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy92aXJ0dWFsLXNjcm9sbGVyL1ZpcnR1YWxTY3JvbGxlci50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gc2FmZVBhcnNlSW50KHM6c3RyaW5nIHwgbnVsbCk6IG51bWJlciB7XG4gICAgY29uc3QgaSA9IHBhcnNlSW50KHMpO1xuICAgIGlmIChpc05hTihpKSkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIGk7XG59IiwiZXhwb3J0IHR5cGUgRGVlcFBhcnRpYWw8VD4gPSBQYXJ0aWFsPHsgW1AgaW4ga2V5b2YgVF06IERlZXBQYXJ0aWFsPFRbUF0+IH0+O1xuXG50eXBlIE5vZGVCdWlsZGVyPEsgZXh0ZW5kcyBrZXlvZiBIVE1MRWxlbWVudFRhZ05hbWVNYXA+ID0gKFxuICBhOiBEZWVwUGFydGlhbDxIVE1MRWxlbWVudFRhZ05hbWVNYXBbS10+LFxuICAuLi5jOiBOb2RlW11cbikgPT4gSFRNTEVsZW1lbnRUYWdOYW1lTWFwW0tdO1xuXG5leHBvcnQgZnVuY3Rpb24gbm9kZTxLIGV4dGVuZHMga2V5b2YgSFRNTEVsZW1lbnRUYWdOYW1lTWFwPih0YWc6IEspOiBOb2RlQnVpbGRlcjxLPiB7XG4gIHJldHVybiAoYTogRGVlcFBhcnRpYWw8SFRNTEVsZW1lbnRUYWdOYW1lTWFwW0tdPiwgLi4uYzogTm9kZVtdKSA9PiB7XG4gICAgY29uc3QgbjogSFRNTEVsZW1lbnRUYWdOYW1lTWFwW0tdID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgIGMuZm9yRWFjaCgoY2hpbGQpID0+IG4uYXBwZW5kQ2hpbGQoY2hpbGQpKTtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoYSkgYXMgQXJyYXk8a2V5b2YgdHlwZW9mIGE+O1xuICAgIGtleXMuZm9yRWFjaCgoaykgPT4gc2V0UHJvcGVydHkobiwgaywgZ2V0UHJvcGVydHkoYSwgaykpKTtcbiAgICByZXR1cm4gbjtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0UHJvcGVydHk8VCwgSyBleHRlbmRzIGtleW9mIFQ+KG86IFQsIGtleTogSyk6IFRbS10ge1xuICByZXR1cm4gb1trZXldO1xufVxuXG5mdW5jdGlvbiBzZXRQcm9wZXJ0eTxULCBLIGV4dGVuZHMga2V5b2YgVD4obzogVCwga2V5OiBLLCB2YWx1ZTogVFtLXSk6IHZvaWQge1xuICBvW2tleV0gPSB2YWx1ZTtcbn1cblxuZXhwb3J0IGNvbnN0IGRpdiA9IG5vZGUoJ2RpdicpO1xuZXhwb3J0IGNvbnN0IHNwYW4gPSBub2RlKCdzcGFuJyk7XG5leHBvcnQgY29uc3QgYSA9IG5vZGUoJ2EnKTtcbmV4cG9ydCBjb25zdCBwID0gbm9kZSgncCcpO1xuZXhwb3J0IGNvbnN0IGgxID0gbm9kZSgnaDEnKTtcbmV4cG9ydCBjb25zdCBpbnB1dCA9IG5vZGUoJ2lucHV0Jyk7XG5leHBvcnQgY29uc3QgbGFiZWwgPSBub2RlKCdsYWJlbCcpO1xuZXhwb3J0IGNvbnN0IHNsb3QgPSBub2RlKCdzbG90Jyk7XG5leHBvcnQgY29uc3Qgc3R5bGUgPSBub2RlKCdzdHlsZScpO1xuXG5leHBvcnQgZnVuY3Rpb24gdGV4dChzOiBzdHJpbmcpOiBUZXh0IHtcbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW1wdHkoZTogTm9kZSkge1xuICB3aGlsZShlLmZpcnN0Q2hpbGQpIHtcbiAgICBlLnJlbW92ZUNoaWxkKGUuZmlyc3RDaGlsZCk7XG4gIH1cbn0iLCJpbXBvcnQgeyBkaXYsIGgxLCB0ZXh0IH0gZnJvbSBcIi4uL2J1aWxkZXIvSHRtbEJ1aWxkZXJcIjtcbmltcG9ydCB7IEN1c3RvbWVyIH0gZnJvbSBcIi4vQ3VzdG9tZXJcIjtcbmltcG9ydCB7IEN1c3RvbWVyRWRpdG9yIH0gZnJvbSBcIi4vQ3VzdG9tZXJFZGl0b3JcIjtcbmltcG9ydCB7IEN1c3RvbWVyTGlzdCB9IGZyb20gXCIuL0N1c3RvbWVyTGlzdFwiO1xuaW1wb3J0IHsgQ3VzdG9tZXJSb3cgfSBmcm9tIFwiLi9DdXN0b21lclJvd1wiO1xuXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJBcHAgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cbiAgICBzdGF0aWMgVEFHX05BTUUgPSBcImN1c3RvbWVycy1hcHBcIjtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgY3VzdG9tZXJMaXN0OiBDdXN0b21lckxpc3Q7XG4gICAgcHJpdmF0ZSByZWFkb25seSBjdXN0b21lckVkaXRvcjogQ3VzdG9tZXJFZGl0b3I7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgY29uc3Qgc2hhZG93ID0gdGhpcy5hdHRhY2hTaGFkb3coe21vZGU6ICdvcGVuJ30pO1xuXG4gICAgICAgIHRoaXMuY3VzdG9tZXJMaXN0ID0gQ3VzdG9tZXJMaXN0Lm5ld0luc3RhbmNlKCk7XG4gICAgICAgIHRoaXMuY3VzdG9tZXJMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2N1c3RvbWVyLXNlbGVjdGVkJywgKGU6IEN1c3RvbUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGZpcnN0TmFtZSwgbGFzdE5hbWUgfSA9IGUuZGV0YWlsO1xuICAgICAgICAgICAgdGhpcy5jdXN0b21lckVkaXRvci5maXJzdE5hbWUgPSBmaXJzdE5hbWU7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVyRWRpdG9yLmxhc3ROYW1lID0gbGFzdE5hbWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY3VzdG9tZXJFZGl0b3IgPSBDdXN0b21lckVkaXRvci5uZXdJbnN0YW5jZSgpO1xuICAgICAgICB0aGlzLmN1c3RvbWVyRWRpdG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2N1c3RvbWVyLWNoYW5nZWQnLCAoZTpDdXN0b21FdmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBmaXJzdE5hbWUsIGxhc3ROYW1lIH0gPSBlLmRldGFpbDtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkUm93OiBDdXN0b21lclJvdyB8IHVuZGVmaW5lZCA9IHRoaXMuY3VzdG9tZXJMaXN0LmdldFNlbGVjdGVkUm93KCk7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRSb3cpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFJvdy5maXJzdE5hbWUgPSBmaXJzdE5hbWU7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRSb3cubGFzdE5hbWUgPSBsYXN0TmFtZTsgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNoYWRvdy5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIGRpdihcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2FwcCcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBoMSh7fSwgdGV4dCgnTGlzdCcpKSxcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVyTGlzdCxcbiAgICAgICAgICAgICAgICBoMSh7fSwgdGV4dCgnRWRpdG9yJykpLFxuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJFZGl0b3JcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIGluaXQoY3VzdG9tZXJzOiBSZWFkb25seUFycmF5PEN1c3RvbWVyPikge1xuICAgICAgICB0aGlzLmN1c3RvbWVyTGlzdC5zZXRDdXN0b21lcnMoY3VzdG9tZXJzKTtcbiAgICAgICAgdGhpcy5jdXN0b21lckVkaXRvci5jbGVhcigpO1xuICAgIH1cblxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoQ3VzdG9tZXJBcHAuVEFHX05BTUUsIEN1c3RvbWVyQXBwKTsiLCJpbXBvcnQgeyBpbnB1dCwgbGFiZWwsIHRleHQgfSBmcm9tIFwiLi4vYnVpbGRlci9IdG1sQnVpbGRlclwiO1xuXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJFZGl0b3IgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cbiAgICBzdGF0aWMgVEFHX05BTUUgPSAnY3VzdG9tZXItZWRpdG9yJztcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgZmlyc3ROYW1lSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSByZWFkb25seSBsYXN0TmFtZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmZpcnN0TmFtZUlucHV0ID0gaW5wdXQoe1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgbmFtZTogJ2ZpcnN0LW5hbWUnXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuZmlyc3ROYW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZpcnN0TmFtZSA9IHRoaXMuZmlyc3ROYW1lSW5wdXQudmFsdWU7XG4gICAgICAgICAgICB0aGlzLmZpcmVDdXN0b21lckNoYW5nZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5sYXN0TmFtZUlucHV0ID0gaW5wdXQoe1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgbmFtZTogJ2xhc3QtbmFtZSdcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5sYXN0TmFtZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sYXN0TmFtZSA9IHRoaXMubGFzdE5hbWVJbnB1dC52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZmlyZUN1c3RvbWVyQ2hhbmdlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzaGFkb3cgPSB0aGlzLmF0dGFjaFNoYWRvdyh7bW9kZTonb3Blbid9KTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGxhYmVsTG46IEhUTUxMYWJlbEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICBsYWJlbExuLnRleHRDb250ZW50ID0gJ0xhc3QgbmFtZSc7XG4gICAgICAgIGxhYmVsTG4uaHRtbEZvciA9ICdsYXN0LW5hbWUnO1xuXG4gICAgICAgIHNoYWRvdy5hcHBlbmRDaGlsZChsYWJlbCh7aHRtbEZvcjogJ2ZpcnN0LW5hbWUnfSwgdGV4dCgnRmlyc3QgbmFtZScpKSk7XG4gICAgICAgIHNoYWRvdy5hcHBlbmRDaGlsZCh0aGlzLmZpcnN0TmFtZUlucHV0KTtcbiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKGxhYmVsKHtodG1sRm9yOiAnbGFzdC1uYW1lJ30sIHRleHQoJ0xhc3QgbmFtZScpKSk7XG4gICAgICAgIHNoYWRvdy5hcHBlbmRDaGlsZCh0aGlzLmxhc3ROYW1lSW5wdXQpO1xuICAgIH1cblxuICAgIGdldCBmaXJzdE5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdmaXJzdC1uYW1lJyk7XG4gICAgfVxuXG4gICAgc2V0IGZpcnN0TmFtZShmbjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdmaXJzdC1uYW1lJywgZm4pO1xuICAgICAgICB0aGlzLmZpcnN0TmFtZUlucHV0LnZhbHVlID0gZm47XG4gICAgfVxuXG4gICAgZ2V0IGxhc3ROYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnbGFzdC1uYW1lJyk7XG4gICAgfVxuXG4gICAgc2V0IGxhc3ROYW1lKGxuOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2xhc3QtbmFtZScsIGxuKTtcbiAgICAgICAgdGhpcy5sYXN0TmFtZUlucHV0LnZhbHVlID0gbG47XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuZmlyc3ROYW1lID0gJyc7XG4gICAgICAgIHRoaXMubGFzdE5hbWUgPSAnJztcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFZhbHVlc0Zyb21BdHRyaWJ1dGVzKCkge1xuICAgICAgICB0aGlzLmZpcnN0TmFtZUlucHV0LnZhbHVlID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2ZpcnN0LW5hbWUnKSA/PyAnJztcbiAgICAgICAgdGhpcy5sYXN0TmFtZUlucHV0LnZhbHVlID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2xhc3QtbmFtZScpID8/ICcnO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmlyZUN1c3RvbWVyQ2hhbmdlZCgpIHtcbiAgICAgICAgY29uc3QgY3VzdG9tZXJDaGFuZ2VkRXZlbnQ6IEN1c3RvbUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuICAgICAgICAgICAgJ2N1c3RvbWVyLWNoYW5nZWQnLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IHRoaXMuZmlyc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZTogdGhpcy5sYXN0TmFtZSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChjdXN0b21lckNoYW5nZWRFdmVudCk7XG4gICAgfVxuXG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMuc2V0VmFsdWVzRnJvbUF0dHJpYnV0ZXMoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbmV3SW5zdGFuY2UoZmlyc3ROYW1lOiBzdHJpbmcgPSAnJywgbGFzdE5hbWU6IHN0cmluZyA9ICcnKTogQ3VzdG9tZXJFZGl0b3Ige1xuICAgICAgICBjb25zdCByZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KEN1c3RvbWVyRWRpdG9yLlRBR19OQU1FKSBhcyBDdXN0b21lckVkaXRvcjtcbiAgICAgICAgcmVzLmZpcnN0TmFtZSA9IGZpcnN0TmFtZTtcbiAgICAgICAgcmVzLmxhc3ROYW1lID0gbGFzdE5hbWU7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoQ3VzdG9tZXJFZGl0b3IuVEFHX05BTUUsIEN1c3RvbWVyRWRpdG9yKTtcbiIsImltcG9ydCB7IGRpdiwgZW1wdHksIHNsb3QsIHRleHQsIHAsIHN0eWxlIH0gZnJvbSBcIi4uL2J1aWxkZXIvSHRtbEJ1aWxkZXJcIjtcbmltcG9ydCB7IEN1c3RvbWVyIH0gZnJvbSBcIi4vQ3VzdG9tZXJcIjtcbmltcG9ydCB7IEN1c3RvbWVyUm93IH0gZnJvbSBcIi4vQ3VzdG9tZXJSb3dcIjtcblxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyTGlzdCBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICAgIHN0YXRpYyBUQUdfTkFNRSA9ICdjdXN0b21lci1saXN0JztcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Nsb3Q6IEhUTUxTbG90RWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIFxuICAgICAgICAvLyBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIC8vIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnY3VzdC1saXN0Jyk7XG4gICAgICAgIC8vIGNvbnN0IHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzbG90Jyk7XG4gICAgICAgIC8vIGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIC8vIHAudGV4dENvbnRlbnQgPSAnTm8gY3VzdG9tZXJzJztcbiAgICAgICAgLy8gcy5hcHBlbmRDaGlsZChwKTtcbiAgICAgICAgLy8gd3JhcHBlci5hcHBlbmRDaGlsZChzKTtcblxuICAgICAgICB0aGlzLl9zbG90ID0gc2xvdCh7fSwgcCh7fSwgdGV4dCgnTm8gY3VzdG9tZXJzJykpKTtcblxuICAgICAgICB0aGlzLmF0dGFjaFNoYWRvdyh7bW9kZTogJ29wZW4nfSlcbiAgICAgICAgICAgIC5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgICAgICBkaXYoXG4gICAgICAgICAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnY3VzdC1saXN0J30sXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nsb3QsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlKFxuICAgICAgICAgICAgICAgICAgICAgICAge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0KGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3VzdC1saXN0IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyZWVuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIC8vIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgLy8gc3R5bGUudGV4dENvbnRlbnQgPSA7XG4gICAgICAgIC8vIHdyYXBwZXIuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgIH1cblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLmdldFJvd3MoKS5mb3JFYWNoKHRoaXMuYWRkUm93RXZlbnRMaXN0ZW5lci5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFJvd3MoKTogUmVhZG9ubHlBcnJheTxDdXN0b21lclJvdz4ge1xuICAgICAgICBjb25zdCByb3dzOiBOb2RlTGlzdE9mPEN1c3RvbWVyUm93PiA9IHRoaXMuX3Nsb3QucXVlcnlTZWxlY3RvckFsbChDdXN0b21lclJvdy5UQUdfTkFNRSk7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHJvd3MpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkUm93RXZlbnRMaXN0ZW5lcihyb3c6IEN1c3RvbWVyUm93KSB7XG4gICAgICAgIHJvdy5hZGRFdmVudExpc3RlbmVyKCdjdXN0b21lci1jbGlja2VkJywgKGU6IEN1c3RvbUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkZXRhaWwgPSBlLmRldGFpbDsgICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHsgZmlyc3ROYW1lLCBsYXN0TmFtZSB9ID0gZGV0YWlsO1xuICAgICAgICAgICAgdGhpcy5nZXRSb3dzKCkuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICAgICAgICAgIHJvdy5zZWxlY3RlZCA9IHJvdy5maXJzdE5hbWUgPT09IGZpcnN0TmFtZSAmJiByb3cubGFzdE5hbWUgPT09IGxhc3ROYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KFxuICAgICAgICAgICAgICAgICAgICAnY3VzdG9tZXItc2VsZWN0ZWQnLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgbmV3SW5zdGFuY2UoKTogQ3VzdG9tZXJMaXN0IHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoQ3VzdG9tZXJMaXN0LlRBR19OQU1FKSBhcyBDdXN0b21lckxpc3Q7XG4gICAgfVxuXG4gICAgc2V0Q3VzdG9tZXJzKGN1c3RvbWVyczogUmVhZG9ubHlBcnJheTxDdXN0b21lcj4pIHtcbiAgICAgICAgZW1wdHkodGhpcy5fc2xvdCk7XG4gICAgICAgIGN1c3RvbWVycy5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgY29uc3Qgcm93ID0gQ3VzdG9tZXJSb3cubmV3SW5zdGFuY2UoYy5maXJzdE5hbWUsIGMubGFzdE5hbWUpO1xuICAgICAgICAgICAgdGhpcy5hZGRSb3dFdmVudExpc3RlbmVyKHJvdyk7XG4gICAgICAgICAgICB0aGlzLl9zbG90LmFwcGVuZENoaWxkKHJvdyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldFNlbGVjdGVkUm93KCk6IEN1c3RvbWVyUm93IHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Um93cygpLmZpbmQociA9PiByLnNlbGVjdGVkKTtcbiAgICB9XG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEN1c3RvbWVyTGlzdC5UQUdfTkFNRSwgQ3VzdG9tZXJMaXN0KTsiLCJpbXBvcnQgeyBhLCBkaXYsIGVtcHR5LCBzcGFuLCB0ZXh0IH0gZnJvbSBcIi4uL2J1aWxkZXIvSHRtbEJ1aWxkZXJcIjtcblxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyUm93IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gICAgc3RhdGljIFRBR19OQU1FID0gJ2N1c3RvbWVyLXJvdyc7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IHNoYWRvdzogU2hhZG93Um9vdDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnNoYWRvdyA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nfSk7ICAgICAgICBcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICAgICAgcmV0dXJuIFsnZmlyc3ROYW1lJywgJ2xhc3ROYW1lJywgJ3NlbGVjdGVkJ107XG4gICAgfVxuXG4gICAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWU6IHN0cmluZykge1xuICAgICAgICBjb25zb2xlLmxvZyhcImF0dHIgY2hhbmdlZFwiLCBuYW1lKTtcbiAgICAgICAgdGhpcy51cGRhdGVEb20oKTtcbiAgICB9XG4gICAgICBcblxuICAgIHByaXZhdGUgdXBkYXRlRG9tKCkge1xuICAgICAgICBlbXB0eSh0aGlzLnNoYWRvdyk7XG5cbiAgICAgICAgY29uc3QgY3JlYXRlTGluayA9ICh0ZXh0Q29udGVudDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhRWxlbSA9IGEoe2hyZWY6ICcjJ30sIHRleHQodGV4dENvbnRlbnQpKTtcbiAgICAgICAgICAgIGFFbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICAgICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2N1c3RvbWVyLWNsaWNrZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IHRoaXMuZmlyc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZTogdGhpcy5sYXN0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBhRWxlbTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjb250ZW50VGV4dCA9IHRoaXMuZmlyc3ROYW1lICsgXCIgXCIgKyB0aGlzLmxhc3ROYW1lO1xuICAgICAgICB0aGlzLnNoYWRvdy5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIGRpdihcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2N1c3Qtcm93J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFxuICAgICAgICAgICAgICAgICAgICA/IHNwYW4oe30sIHRleHQoY29udGVudFRleHQpKVxuICAgICAgICAgICAgICAgICAgICA6IGNyZWF0ZUxpbmsoY29udGVudFRleHQpXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMudXBkYXRlRG9tKCk7XG4gICAgfVxuXG4gICAgZ2V0IGZpcnN0TmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2ZpcnN0LW5hbWUnKTtcbiAgICB9XG5cbiAgICBzZXQgZmlyc3ROYW1lKGZuOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2ZpcnN0LW5hbWUnLCBmbik7XG4gICAgICAgIHRoaXMudXBkYXRlRG9tKCk7XG4gICAgfVxuXG4gICAgZ2V0IGxhc3ROYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnbGFzdC1uYW1lJyk7XG4gICAgfVxuXG4gICAgc2V0IGxhc3ROYW1lKGxuOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2xhc3QtbmFtZScsIGxuKTtcbiAgICAgICAgdGhpcy51cGRhdGVEb20oKTtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgnc2VsZWN0ZWQnKTtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0ZWQoczogYm9vbGVhbikge1xuICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVEb20oKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbmV3SW5zdGFuY2UoZmlyc3ROYW1lOiBzdHJpbmcsIGxhc3ROYW1lOiBzdHJpbmcpOiBDdXN0b21lclJvdyB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoQ3VzdG9tZXJSb3cuVEFHX05BTUUpIGFzIEN1c3RvbWVyUm93O1xuICAgICAgICByZXMuZmlyc3ROYW1lID0gZmlyc3ROYW1lO1xuICAgICAgICByZXMubGFzdE5hbWUgPSBsYXN0TmFtZTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjdXN0b21lci1yb3cnLCBDdXN0b21lclJvdyk7IiwiaW1wb3J0IHsgZGl2LCBzbG90LCBzdHlsZSwgdGV4dCB9IGZyb20gXCIuLi9idWlsZGVyL0h0bWxCdWlsZGVyXCI7XG5cbmNvbnN0IGRpYWdTdHlsZXMgPSBgXG4gICAgLmRnLWRpYWdyYW0ge1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB9XG4gICAgLmRnLXNjcm9sbC1wYW5lIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIH1cbiAgICAuZGctY29udGVudC1wYW5lIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmV5O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgfVxuYDtcblxuZXhwb3J0IGNsYXNzIERnRGlhZ3JhbSBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICAgIHN0YXRpYyBUQUcgPSBcImRnLWRpYWdyYW1cIlxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGNvbnN0IHNoYWRvdyA9IHRoaXMuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcbiAgICAgICAgY29uc3QgY29udGVudFBhbmUgPSBkaXYoXG4gICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2RnLWNvbnRlbnQtcGFuZScgfSwgXG4gICAgICAgICAgICBzbG90KHt9KVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBzY3JvbGxQYW5lID0gZGl2KFxuICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdkZy1zY3JvbGwtcGFuZScgfSxcbiAgICAgICAgICAgIGNvbnRlbnRQYW5lXG4gICAgICAgICk7XG4gICAgICAgIHNoYWRvdy5hcHBlbmRDaGlsZChzY3JvbGxQYW5lKTtcbiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKHN0eWxlKHt9LCB0ZXh0KGRpYWdTdHlsZXMpKSk7XG4gICAgfSAgICBcblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIH1cblxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRGdEaWFncmFtLlRBRywgRGdEaWFncmFtKTsiLCJpbXBvcnQgeyBkaXYsIHNsb3QsIHN0eWxlLCB0ZXh0IH0gZnJvbSBcIi4uL2J1aWxkZXIvSHRtbEJ1aWxkZXJcIjtcbmltcG9ydCB7IHNhZmVQYXJzZUludCB9IGZyb20gXCIuLi9TYWZlUGFyc2VJbnRcIjtcblxuY29uc3QgY3NzID0gYFxuICAgIC5kZy1ub2RlIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBkaXNwbGF5OiBmbGV4OyAgICAgICAgXG4gICAgfVxuYDtcblxuZXhwb3J0IGNsYXNzIERnTm9kZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICAgIHN0YXRpYyBUQUcgPSBcImRnLW5vZGVcIjtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgZGdOb2RlOiBIVE1MRGl2RWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBjb25zdCBzaGFkb3cgPSB0aGlzLmF0dGFjaFNoYWRvdyh7bW9kZTonb3Blbid9KTtcbiAgICAgICAgdGhpcy5kZ05vZGUgPSBkaXYoe2NsYXNzTmFtZTogJ2RnLW5vZGUnfSwgc2xvdCh7fSkpO1xuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQodGhpcy5kZ05vZGUpO1xuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQoc3R5bGUoe30sIHRleHQoY3NzKSkpO1xuICAgIH1cblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICBjb25zdCBzID0gdGhpcy5kZ05vZGUuc3R5bGU7XG4gICAgICAgIHMubGVmdCA9IHRoaXMueCArIFwicHhcIjtcbiAgICAgICAgcy50b3AgPSB0aGlzLnkgKyBcInB4XCI7XG4gICAgICAgIHMud2lkdGggPSB0aGlzLncgKyBcInB4XCI7XG4gICAgICAgIHMuaGVpZ2h0ID0gdGhpcy5oICsgXCJweFwiO1xuICAgIH1cblxuICAgIGdldCB4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ3gnKSk7XG4gICAgfVxuXG4gICAgZ2V0IHkoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNhZmVQYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgneScpKTtcbiAgICB9XG5cbiAgICBnZXQgaCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc2FmZVBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCdoJykpO1xuICAgIH1cblxuICAgIGdldCB3KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ3cnKSk7XG4gICAgfVxuXG4gICBcblxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRGdOb2RlLlRBRywgRGdOb2RlKTsiLCJpbXBvcnQgeyBkaXYsIHNsb3QgfSBmcm9tIFwiLi4vYnVpbGRlci9IdG1sQnVpbGRlclwiO1xuaW1wb3J0IHsgc2FmZVBhcnNlSW50IH0gZnJvbSBcIi4uL1NhZmVQYXJzZUludFwiO1xuaW1wb3J0IHsgVmlydHVhbFNjcm9sbGVyIH0gZnJvbSBcIi4vVmlydHVhbFNjcm9sbGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBTY3JvbGxJdGVtIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gICAgc3RhdGljIFRBR19OQU1FID0gXCJzY3JvbGwtaXRlbVwiO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSB3cmFwcGVyOiBIVE1MRGl2RWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpOyAgICAgICAgXG4gICAgICAgIHRoaXMud3JhcHBlciA9IGRpdihcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgc2xvdCh7fSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hdHRhY2hTaGFkb3coe21vZGU6J29wZW4nfSkuYXBwZW5kQ2hpbGQodGhpcy53cmFwcGVyKTtcbiAgICB9XG5cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy53cmFwcGVyLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICB0aGlzLndyYXBwZXIuc3R5bGUudG9wID0gdGhpcy50b3AgKyAncHgnO1xuICAgICAgICB0aGlzLndyYXBwZXIuc3R5bGUubGVmdCA9IHRoaXMubGVmdCArICdweCc7XG4gICAgICAgIC8vIHVnbHkgISBuZWVkIGEgdGltZW91dCBoZXJlIHRvIGxldCBicm93c2VyIHJlbmRlciBvdGhlcndpc2UgdGhlIGVsZW1lbnQgaXNuJ3QgeWV0IHNpemVkXG4gICAgICAgIC8vIFRPRE8gZmluZCB3YXkgdG8gZ2V0IGNhbGxlZCB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gcmVuZGVyZWRcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbXB1dGVEaW1lbnNpb25zKCk7XG4gICAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIGNvbXB1dGVEaW1lbnNpb25zKCkge1xuICAgICAgICBjb25zdCBib3ggPSB0aGlzLndyYXBwZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gYm94LmhlaWdodDtcbiAgICAgICAgdGhpcy53aWR0aCA9IGJveC53aWR0aDsgICAgXG4gICAgfVxuXG4gICAgZ2V0IHRvcCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc2FmZVBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCd0b3AnKSk7XG4gICAgfVxuXG4gICAgc2V0IHRvcCh0OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3RvcCcsIHQudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgZ2V0IGxlZnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNhZmVQYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgnbGVmdCcpKTtcbiAgICB9XG5cbiAgICBzZXQgbGVmdChsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2xlZnQnLCBsLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIGdldCB3aWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc2FmZVBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCd3aWR0aCcpKTsgICAgICAgIFxuICAgIH1cblxuICAgIHNldCB3aWR0aCh3OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgdy50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBnZXQgaGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpKTsgICAgICAgIFxuICAgIH1cblxuICAgIHNldCBoZWlnaHQoaDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBoLnRvU3RyaW5nKCkpO1xuICAgIH1cblxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoU2Nyb2xsSXRlbS5UQUdfTkFNRSwgU2Nyb2xsSXRlbSk7XG4iLCJpbXBvcnQgeyBkaXYsIHNsb3QsIHN0eWxlLCB0ZXh0IH0gZnJvbSBcIi4uL2J1aWxkZXIvSHRtbEJ1aWxkZXJcIjtcbmltcG9ydCB7IHNhZmVQYXJzZUludCB9IGZyb20gXCIuLi9TYWZlUGFyc2VJbnRcIjtcbmltcG9ydCB7IFNjcm9sbEl0ZW0gfSBmcm9tIFwiLi9TY3JvbGxJdGVtXCI7XG5cbmV4cG9ydCBjbGFzcyBWaXJ0dWFsU2Nyb2xsZXIgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cbiAgICBzdGF0aWMgVEFHX05BTUUgPSBcInZpcnR1YWwtc2Nyb2xsZXJcIjtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgY29udGVudFBhbmU6IEhUTUxEaXZFbGVtZW50O1xuICAgIHByaXZhdGUgc2Nyb2xsVGltZW91dDogYW55ID0gdW5kZWZpbmVkO1xuICAgIHByaXZhdGUgY291bnRlcjogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuY29udGVudFBhbmUgPSBkaXYoe2NsYXNzTmFtZTogJ2NvbnRlbnQtcGFuZSd9LCBzbG90KHt9KSk7XG5cbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBlID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjcm9sbFRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5zY3JvbGxUaW1lb3V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY291bnRlcisrO1xuICAgICAgICAgICAgY29uc3QgX2NvdW50ZXIgPSB0aGlzLmNvdW50ZXI7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb3VudGVyID09PSBfY291bnRlcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdUb3AgPSB0aGlzLnNjcm9sbFRvcDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3TGVmdCA9IHRoaXMuc2Nyb2xsTGVmdDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3AgPSBuZXdUb3A7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGVmdCA9IG5ld0xlZnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMTApO1xuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IHNoYWRvdyA9IHRoaXMuYXR0YWNoU2hhZG93KHttb2RlOidvcGVuJ30pO1xuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50UGFuZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAnY29udGVudC1oZWlnaHQnLCBcbiAgICAgICAgICAgICdjb250ZW50LXdpZHRoJywgXG4gICAgICAgICAgICAndG9wJywgXG4gICAgICAgICAgICAnbGVmdCcsIFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLnNldFNjcm9sbFBhbmVEaW1lbnNpb25zKCk7XG4gICAgfVxuXG4gICAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIGlmICh0aGlzLnNjcm9sbFRpbWVvdXQpIHtcbiAgICAgICAgICAgIHRoaXMuY291bnRlcisrO1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuc2Nyb2xsVGltZW91dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFNjcm9sbFBhbmVEaW1lbnNpb25zKCkge1xuICAgICAgICB0aGlzLmNvbnRlbnRQYW5lLnN0eWxlLmhlaWdodCA9IHRoaXMuY29udGVudEhlaWdodCArIFwicHhcIjtcbiAgICAgICAgdGhpcy5jb250ZW50UGFuZS5zdHlsZS53aWR0aCA9IHRoaXMuY29udGVudFdpZHRoICsgXCJweFwiO1xuICAgIH1cblxuICAgIGdldCBjb250ZW50SGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQtaGVpZ2h0JykpO1xuICAgIH1cblxuICAgIHNldCBjb250ZW50SGVpZ2h0KGg6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnY29udGVudC1oZWlnaHQnLCBoLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIGdldCBjb250ZW50V2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNhZmVQYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgnY29udGVudC1oZWlnaHQnKSk7XG4gICAgfVxuXG4gICAgc2V0IGNvbnRlbnRXaWR0aCh3OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnQtd2lkdGgnLCB3LnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIGdldCB0b3AoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNhZmVQYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgndG9wJykpO1xuICAgIH1cblxuICAgIHNldCB0b3AodDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd0b3AnLCB0LnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIGdldCBsZWZ0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ2xlZnQnKSk7XG4gICAgfVxuXG4gICAgc2V0IGxlZnQobDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdsZWZ0JywgbC50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBnZXRTY3JvbGxJdGVtcygpOiBSZWFkb25seUFycmF5PFNjcm9sbEl0ZW0+IHtcbiAgICAgICAgY29uc3QgaXRlbXM6IE5vZGVMaXN0T2Y8U2Nyb2xsSXRlbT4gPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoU2Nyb2xsSXRlbS5UQUdfTkFNRSk7XG4gICAgICAgIGRlYnVnZ2VyO1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShpdGVtcyk7XG4gICAgfVxuXG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFZpcnR1YWxTY3JvbGxlci5UQUdfTkFNRSwgVmlydHVhbFNjcm9sbGVyKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEN1c3RvbWVyQXBwIH0gZnJvbSBcIi4vY3VzdG9tZXIvQ3VzdG9tZXJBcHBcIjtcbmltcG9ydCB7IERnRGlhZ3JhbSB9IGZyb20gXCIuL2RpYWdyYW0vRGdEaWFncmFtXCI7XG5pbXBvcnQgeyBEZ05vZGUgfSBmcm9tIFwiLi9kaWFncmFtL0RnTm9kZVwiO1xuaW1wb3J0IHsgU2Nyb2xsSXRlbSB9IGZyb20gXCIuL3ZpcnR1YWwtc2Nyb2xsZXIvU2Nyb2xsSXRlbVwiO1xuaW1wb3J0IHsgVmlydHVhbFNjcm9sbGVyIH0gZnJvbSBcIi4vdmlydHVhbC1zY3JvbGxlci9WaXJ0dWFsU2Nyb2xsZXJcIjtcblxuLy8ganVzdCBmb3IgaW1wb3J0cyAhXG5jb25zb2xlLmxvZygneWFsbGEnLCBDdXN0b21lckFwcC5UQUdfTkFNRSwgVmlydHVhbFNjcm9sbGVyLlRBR19OQU1FLCBTY3JvbGxJdGVtLlRBR19OQU1FLCBEZ0RpYWdyYW0uVEFHLCBEZ05vZGUuVEFHKTtcblxuLy8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBlID0+IHtcbi8vICAgICBjb25zdCBhcHA6IEN1c3RvbWVyQXBwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpIGFzIEN1c3RvbWVyQXBwO1xuLy8gICAgIGNvbnNvbGUubG9nKFwiYXBwIGxvYWRlZFwiLCBhcHApO1xuLy8gICAgIGFwcC5pbml0KFtcbi8vICAgICAgICAgeyBmaXJzdE5hbWU6ICdUb3RvJywgbGFzdE5hbWU6ICdCaWxvdXRlJyB9LFxuLy8gICAgICAgICB7IGZpcnN0TmFtZTogJ0ZyZW5jaCcsIGxhc3ROYW1lOiAnRnJpZXMnIH0sXG4vLyAgICAgICAgIHsgZmlyc3ROYW1lOiAnRm9vJywgbGFzdE5hbWU6ICdCYXInIH0sXG4vLyAgICAgXSlcbi8vIH0pXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=