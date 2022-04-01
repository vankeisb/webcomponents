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

/***/ "./src/diagram/DgDraggable.ts":
/*!************************************!*\
  !*** ./src/diagram/DgDraggable.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DgDraggable": () => (/* binding */ DgDraggable)
/* harmony export */ });
/* harmony import */ var _builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../builder/HtmlBuilder */ "./src/builder/HtmlBuilder.ts");
/* harmony import */ var _DgNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DgNode */ "./src/diagram/DgNode.ts");


function deltas(ds) {
    return {
        deltaX: ds.curX - ds.downX,
        deltaY: ds.curY - ds.downY
    };
}
class DgDraggable extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const domNode = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.div)({ className: 'dg-draggable' }, (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.slot)({}));
        shadow.appendChild(domNode);
        shadow.appendChild((0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.style)({}, (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.text)(`
            .dg-draggable {
                cursor: move;
            }
            `)));
        const mouseMove = (e) => {
            if (this.dragState) {
                const { clientX, clientY } = e;
                this.dragState.curX = clientX;
                this.dragState.curY = clientY;
                const { deltaX, deltaY } = deltas(this.dragState);
                console.log(deltaX, deltaY);
                const dgNode = this.getDgNode();
                if (dgNode) {
                    dgNode.x = this.dragState.refX + deltaX;
                    dgNode.y = this.dragState.refY + deltaY;
                }
            }
        };
        const mouseUp = (e) => {
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
            this.dragState = undefined;
        };
        domNode.addEventListener('mousedown', e => {
            const { clientX, clientY } = e;
            const dgNode = this.getDgNode();
            if (dgNode) {
                this.dragState = {
                    downX: clientX,
                    downY: clientY,
                    curX: clientX,
                    curY: clientY,
                    refX: dgNode.x,
                    refY: dgNode.y,
                };
                console.log("mousedown");
                document.addEventListener('mousemove', mouseMove);
                document.addEventListener('mouseup', mouseUp);
            }
        });
    }
    getDgNode(from = this) {
        if (from.parentElement instanceof _DgNode__WEBPACK_IMPORTED_MODULE_1__.DgNode) {
            return from.parentElement;
        }
        if (from.parentElement) {
            return this.getDgNode(from.parentElement);
        }
        return undefined;
    }
}
DgDraggable.TAG = "dg-draggable";
customElements.define(DgDraggable.TAG, DgDraggable);


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
        this.refreshPosAndSizeFromProps();
    }
    refreshPosAndSizeFromProps() {
        const s = this.dgNode.style;
        s.left = this.x + "px";
        s.top = this.y + "px";
        s.width = this.w + "px";
        s.height = this.h + "px";
    }
    get x() {
        return (0,_SafeParseInt__WEBPACK_IMPORTED_MODULE_1__.safeParseInt)(this.getAttribute('x'));
    }
    set x(x) {
        this.setAttribute('x', x.toString());
        this.refreshPosAndSizeFromProps();
    }
    get y() {
        return (0,_SafeParseInt__WEBPACK_IMPORTED_MODULE_1__.safeParseInt)(this.getAttribute('y'));
    }
    set y(y) {
        this.setAttribute('y', y.toString());
        this.refreshPosAndSizeFromProps();
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
/* harmony import */ var _diagram_DgDraggable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./diagram/DgDraggable */ "./src/diagram/DgDraggable.ts");
/* harmony import */ var _diagram_DgNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./diagram/DgNode */ "./src/diagram/DgNode.ts");
/* harmony import */ var _virtual_scroller_ScrollItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./virtual-scroller/ScrollItem */ "./src/virtual-scroller/ScrollItem.ts");
/* harmony import */ var _virtual_scroller_VirtualScroller__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./virtual-scroller/VirtualScroller */ "./src/virtual-scroller/VirtualScroller.ts");






// just for imports !
console.log('yalla', _customer_CustomerApp__WEBPACK_IMPORTED_MODULE_0__.CustomerApp.TAG_NAME, _virtual_scroller_VirtualScroller__WEBPACK_IMPORTED_MODULE_5__.VirtualScroller.TAG_NAME, _virtual_scroller_ScrollItem__WEBPACK_IMPORTED_MODULE_4__.ScrollItem.TAG_NAME, _diagram_DgDiagram__WEBPACK_IMPORTED_MODULE_1__.DgDiagram.TAG, _diagram_DgNode__WEBPACK_IMPORTED_MODULE_3__.DgNode.TAG, _diagram_DgDraggable__WEBPACK_IMPORTED_MODULE_2__.DgDraggable.TAG);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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S0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7QUE1Rk0sd0JBQVEsR0FBRyxrQkFBa0IsQ0FBQztBQWlHekMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxDQUFDOzs7Ozs7O1VDdkdqRTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOcUQ7QUFDTDtBQUNJO0FBQ1Y7QUFDaUI7QUFDVTtBQUVyRSxxQkFBcUI7QUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsdUVBQW9CLEVBQUUsdUZBQXdCLEVBQUUsNkVBQW1CLEVBQUUsNkRBQWEsRUFBRSx1REFBVSxFQUFFLGlFQUFlLENBQUMsQ0FBQztBQUV0SSx5Q0FBeUM7QUFDekMsOEVBQThFO0FBQzlFLHNDQUFzQztBQUN0QyxpQkFBaUI7QUFDakIsc0RBQXNEO0FBQ3RELHNEQUFzRDtBQUN0RCxpREFBaUQ7QUFDakQsU0FBUztBQUNULEtBQUsiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL1NhZmVQYXJzZUludC50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2J1aWxkZXIvSHRtbEJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy9jdXN0b21lci9DdXN0b21lckFwcC50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2N1c3RvbWVyL0N1c3RvbWVyRWRpdG9yLnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvY3VzdG9tZXIvQ3VzdG9tZXJMaXN0LnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvY3VzdG9tZXIvQ3VzdG9tZXJSb3cudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy9kaWFncmFtL0RnRGlhZ3JhbS50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2RpYWdyYW0vRGdEcmFnZ2FibGUudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy9kaWFncmFtL0RnTm9kZS50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL3ZpcnR1YWwtc2Nyb2xsZXIvU2Nyb2xsSXRlbS50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL3ZpcnR1YWwtc2Nyb2xsZXIvVmlydHVhbFNjcm9sbGVyLnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBzYWZlUGFyc2VJbnQoczpzdHJpbmcgfCBudWxsKTogbnVtYmVyIHtcbiAgICBjb25zdCBpID0gcGFyc2VJbnQocyk7XG4gICAgaWYgKGlzTmFOKGkpKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gaTtcbn0iLCJleHBvcnQgdHlwZSBEZWVwUGFydGlhbDxUPiA9IFBhcnRpYWw8eyBbUCBpbiBrZXlvZiBUXTogRGVlcFBhcnRpYWw8VFtQXT4gfT47XG5cbnR5cGUgTm9kZUJ1aWxkZXI8SyBleHRlbmRzIGtleW9mIEhUTUxFbGVtZW50VGFnTmFtZU1hcD4gPSAoXG4gIGE6IERlZXBQYXJ0aWFsPEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXT4sXG4gIC4uLmM6IE5vZGVbXVxuKSA9PiBIVE1MRWxlbWVudFRhZ05hbWVNYXBbS107XG5cbmV4cG9ydCBmdW5jdGlvbiBub2RlPEsgZXh0ZW5kcyBrZXlvZiBIVE1MRWxlbWVudFRhZ05hbWVNYXA+KHRhZzogSyk6IE5vZGVCdWlsZGVyPEs+IHtcbiAgcmV0dXJuIChhOiBEZWVwUGFydGlhbDxIVE1MRWxlbWVudFRhZ05hbWVNYXBbS10+LCAuLi5jOiBOb2RlW10pID0+IHtcbiAgICBjb25zdCBuOiBIVE1MRWxlbWVudFRhZ05hbWVNYXBbS10gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgYy5mb3JFYWNoKChjaGlsZCkgPT4gbi5hcHBlbmRDaGlsZChjaGlsZCkpO1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhhKSBhcyBBcnJheTxrZXlvZiB0eXBlb2YgYT47XG4gICAga2V5cy5mb3JFYWNoKChrKSA9PiBzZXRQcm9wZXJ0eShuLCBrLCBnZXRQcm9wZXJ0eShhLCBrKSkpO1xuICAgIHJldHVybiBuO1xuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRQcm9wZXJ0eTxULCBLIGV4dGVuZHMga2V5b2YgVD4obzogVCwga2V5OiBLKTogVFtLXSB7XG4gIHJldHVybiBvW2tleV07XG59XG5cbmZ1bmN0aW9uIHNldFByb3BlcnR5PFQsIEsgZXh0ZW5kcyBrZXlvZiBUPihvOiBULCBrZXk6IEssIHZhbHVlOiBUW0tdKTogdm9pZCB7XG4gIG9ba2V5XSA9IHZhbHVlO1xufVxuXG5leHBvcnQgY29uc3QgZGl2ID0gbm9kZSgnZGl2Jyk7XG5leHBvcnQgY29uc3Qgc3BhbiA9IG5vZGUoJ3NwYW4nKTtcbmV4cG9ydCBjb25zdCBhID0gbm9kZSgnYScpO1xuZXhwb3J0IGNvbnN0IHAgPSBub2RlKCdwJyk7XG5leHBvcnQgY29uc3QgaDEgPSBub2RlKCdoMScpO1xuZXhwb3J0IGNvbnN0IGlucHV0ID0gbm9kZSgnaW5wdXQnKTtcbmV4cG9ydCBjb25zdCBsYWJlbCA9IG5vZGUoJ2xhYmVsJyk7XG5leHBvcnQgY29uc3Qgc2xvdCA9IG5vZGUoJ3Nsb3QnKTtcbmV4cG9ydCBjb25zdCBzdHlsZSA9IG5vZGUoJ3N0eWxlJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXh0KHM6IHN0cmluZyk6IFRleHQge1xuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbXB0eShlOiBOb2RlKSB7XG4gIHdoaWxlKGUuZmlyc3RDaGlsZCkge1xuICAgIGUucmVtb3ZlQ2hpbGQoZS5maXJzdENoaWxkKTtcbiAgfVxufSIsImltcG9ydCB7IGRpdiwgaDEsIHRleHQgfSBmcm9tIFwiLi4vYnVpbGRlci9IdG1sQnVpbGRlclwiO1xuaW1wb3J0IHsgQ3VzdG9tZXIgfSBmcm9tIFwiLi9DdXN0b21lclwiO1xuaW1wb3J0IHsgQ3VzdG9tZXJFZGl0b3IgfSBmcm9tIFwiLi9DdXN0b21lckVkaXRvclwiO1xuaW1wb3J0IHsgQ3VzdG9tZXJMaXN0IH0gZnJvbSBcIi4vQ3VzdG9tZXJMaXN0XCI7XG5pbXBvcnQgeyBDdXN0b21lclJvdyB9IGZyb20gXCIuL0N1c3RvbWVyUm93XCI7XG5cbmV4cG9ydCBjbGFzcyBDdXN0b21lckFwcCBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICAgIHN0YXRpYyBUQUdfTkFNRSA9IFwiY3VzdG9tZXJzLWFwcFwiO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBjdXN0b21lckxpc3Q6IEN1c3RvbWVyTGlzdDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGN1c3RvbWVyRWRpdG9yOiBDdXN0b21lckVkaXRvcjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBjb25zdCBzaGFkb3cgPSB0aGlzLmF0dGFjaFNoYWRvdyh7bW9kZTogJ29wZW4nfSk7XG5cbiAgICAgICAgdGhpcy5jdXN0b21lckxpc3QgPSBDdXN0b21lckxpc3QubmV3SW5zdGFuY2UoKTtcbiAgICAgICAgdGhpcy5jdXN0b21lckxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY3VzdG9tZXItc2VsZWN0ZWQnLCAoZTogQ3VzdG9tRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZmlyc3ROYW1lLCBsYXN0TmFtZSB9ID0gZS5kZXRhaWw7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVyRWRpdG9yLmZpcnN0TmFtZSA9IGZpcnN0TmFtZTtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJFZGl0b3IubGFzdE5hbWUgPSBsYXN0TmFtZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jdXN0b21lckVkaXRvciA9IEN1c3RvbWVyRWRpdG9yLm5ld0luc3RhbmNlKCk7XG4gICAgICAgIHRoaXMuY3VzdG9tZXJFZGl0b3IuYWRkRXZlbnRMaXN0ZW5lcignY3VzdG9tZXItY2hhbmdlZCcsIChlOkN1c3RvbUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGZpcnN0TmFtZSwgbGFzdE5hbWUgfSA9IGUuZGV0YWlsO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRSb3c6IEN1c3RvbWVyUm93IHwgdW5kZWZpbmVkID0gdGhpcy5jdXN0b21lckxpc3QuZ2V0U2VsZWN0ZWRSb3coKTtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZFJvdykge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkUm93LmZpcnN0TmFtZSA9IGZpcnN0TmFtZTtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFJvdy5sYXN0TmFtZSA9IGxhc3ROYW1lOyAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgZGl2KFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnYXBwJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGgxKHt9LCB0ZXh0KCdMaXN0JykpLFxuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJMaXN0LFxuICAgICAgICAgICAgICAgIGgxKHt9LCB0ZXh0KCdFZGl0b3InKSksXG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21lckVkaXRvclxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgaW5pdChjdXN0b21lcnM6IFJlYWRvbmx5QXJyYXk8Q3VzdG9tZXI+KSB7XG4gICAgICAgIHRoaXMuY3VzdG9tZXJMaXN0LnNldEN1c3RvbWVycyhjdXN0b21lcnMpO1xuICAgICAgICB0aGlzLmN1c3RvbWVyRWRpdG9yLmNsZWFyKCk7XG4gICAgfVxuXG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShDdXN0b21lckFwcC5UQUdfTkFNRSwgQ3VzdG9tZXJBcHApOyIsImltcG9ydCB7IGlucHV0LCBsYWJlbCwgdGV4dCB9IGZyb20gXCIuLi9idWlsZGVyL0h0bWxCdWlsZGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBDdXN0b21lckVkaXRvciBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICAgIHN0YXRpYyBUQUdfTkFNRSA9ICdjdXN0b21lci1lZGl0b3InO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBmaXJzdE5hbWVJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxhc3ROYW1lSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZmlyc3ROYW1lSW5wdXQgPSBpbnB1dCh7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICBuYW1lOiAnZmlyc3QtbmFtZSdcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5maXJzdE5hbWVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmlyc3ROYW1lID0gdGhpcy5maXJzdE5hbWVJbnB1dC52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZmlyZUN1c3RvbWVyQ2hhbmdlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmxhc3ROYW1lSW5wdXQgPSBpbnB1dCh7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICBuYW1lOiAnbGFzdC1uYW1lJ1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLmxhc3ROYW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxhc3ROYW1lID0gdGhpcy5sYXN0TmFtZUlucHV0LnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5maXJlQ3VzdG9tZXJDaGFuZ2VkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHNoYWRvdyA9IHRoaXMuYXR0YWNoU2hhZG93KHttb2RlOidvcGVuJ30pO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbGFiZWxMbjogSFRNTExhYmVsRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIGxhYmVsTG4udGV4dENvbnRlbnQgPSAnTGFzdCBuYW1lJztcbiAgICAgICAgbGFiZWxMbi5odG1sRm9yID0gJ2xhc3QtbmFtZSc7XG5cbiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKGxhYmVsKHtodG1sRm9yOiAnZmlyc3QtbmFtZSd9LCB0ZXh0KCdGaXJzdCBuYW1lJykpKTtcbiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKHRoaXMuZmlyc3ROYW1lSW5wdXQpO1xuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQobGFiZWwoe2h0bWxGb3I6ICdsYXN0LW5hbWUnfSwgdGV4dCgnTGFzdCBuYW1lJykpKTtcbiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKHRoaXMubGFzdE5hbWVJbnB1dCk7XG4gICAgfVxuXG4gICAgZ2V0IGZpcnN0TmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2ZpcnN0LW5hbWUnKTtcbiAgICB9XG5cbiAgICBzZXQgZmlyc3ROYW1lKGZuOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2ZpcnN0LW5hbWUnLCBmbik7XG4gICAgICAgIHRoaXMuZmlyc3ROYW1lSW5wdXQudmFsdWUgPSBmbjtcbiAgICB9XG5cbiAgICBnZXQgbGFzdE5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdsYXN0LW5hbWUnKTtcbiAgICB9XG5cbiAgICBzZXQgbGFzdE5hbWUobG46IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnbGFzdC1uYW1lJywgbG4pO1xuICAgICAgICB0aGlzLmxhc3ROYW1lSW5wdXQudmFsdWUgPSBsbjtcbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5maXJzdE5hbWUgPSAnJztcbiAgICAgICAgdGhpcy5sYXN0TmFtZSA9ICcnO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0VmFsdWVzRnJvbUF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIHRoaXMuZmlyc3ROYW1lSW5wdXQudmFsdWUgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZmlyc3QtbmFtZScpID8/ICcnO1xuICAgICAgICB0aGlzLmxhc3ROYW1lSW5wdXQudmFsdWUgPSB0aGlzLmdldEF0dHJpYnV0ZSgnbGFzdC1uYW1lJykgPz8gJyc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaXJlQ3VzdG9tZXJDaGFuZ2VkKCkge1xuICAgICAgICBjb25zdCBjdXN0b21lckNoYW5nZWRFdmVudDogQ3VzdG9tRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXG4gICAgICAgICAgICAnY3VzdG9tZXItY2hhbmdlZCcsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogdGhpcy5maXJzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiB0aGlzLmxhc3ROYW1lLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGN1c3RvbWVyQ2hhbmdlZEV2ZW50KTtcbiAgICB9XG5cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5zZXRWYWx1ZXNGcm9tQXR0cmlidXRlcygpO1xuICAgIH1cblxuICAgIHN0YXRpYyBuZXdJbnN0YW5jZShmaXJzdE5hbWU6IHN0cmluZyA9ICcnLCBsYXN0TmFtZTogc3RyaW5nID0gJycpOiBDdXN0b21lckVkaXRvciB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoQ3VzdG9tZXJFZGl0b3IuVEFHX05BTUUpIGFzIEN1c3RvbWVyRWRpdG9yO1xuICAgICAgICByZXMuZmlyc3ROYW1lID0gZmlyc3ROYW1lO1xuICAgICAgICByZXMubGFzdE5hbWUgPSBsYXN0TmFtZTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShDdXN0b21lckVkaXRvci5UQUdfTkFNRSwgQ3VzdG9tZXJFZGl0b3IpO1xuIiwiaW1wb3J0IHsgZGl2LCBlbXB0eSwgc2xvdCwgdGV4dCwgcCwgc3R5bGUgfSBmcm9tIFwiLi4vYnVpbGRlci9IdG1sQnVpbGRlclwiO1xuaW1wb3J0IHsgQ3VzdG9tZXIgfSBmcm9tIFwiLi9DdXN0b21lclwiO1xuaW1wb3J0IHsgQ3VzdG9tZXJSb3cgfSBmcm9tIFwiLi9DdXN0b21lclJvd1wiO1xuXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJMaXN0IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gICAgc3RhdGljIFRBR19OQU1FID0gJ2N1c3RvbWVyLWxpc3QnO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBfc2xvdDogSFRNTFNsb3RFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgXG4gICAgICAgIC8vIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgLy8gd3JhcHBlci5jbGFzc0xpc3QuYWRkKCdjdXN0LWxpc3QnKTtcbiAgICAgICAgLy8gY29uc3QgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Nsb3QnKTtcbiAgICAgICAgLy8gY29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgLy8gcC50ZXh0Q29udGVudCA9ICdObyBjdXN0b21lcnMnO1xuICAgICAgICAvLyBzLmFwcGVuZENoaWxkKHApO1xuICAgICAgICAvLyB3cmFwcGVyLmFwcGVuZENoaWxkKHMpO1xuXG4gICAgICAgIHRoaXMuX3Nsb3QgPSBzbG90KHt9LCBwKHt9LCB0ZXh0KCdObyBjdXN0b21lcnMnKSkpO1xuXG4gICAgICAgIHRoaXMuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KVxuICAgICAgICAgICAgLmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgICAgIGRpdihcbiAgICAgICAgICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdjdXN0LWxpc3QnfSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2xvdCxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUoXG4gICAgICAgICAgICAgICAgICAgICAgICB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQoYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jdXN0LWxpc3Qge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JlZW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgLy8gY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICAvLyBzdHlsZS50ZXh0Q29udGVudCA9IDtcbiAgICAgICAgLy8gd3JhcHBlci5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgfVxuXG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMuZ2V0Um93cygpLmZvckVhY2godGhpcy5hZGRSb3dFdmVudExpc3RlbmVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Um93cygpOiBSZWFkb25seUFycmF5PEN1c3RvbWVyUm93PiB7XG4gICAgICAgIGNvbnN0IHJvd3M6IE5vZGVMaXN0T2Y8Q3VzdG9tZXJSb3c+ID0gdGhpcy5fc2xvdC5xdWVyeVNlbGVjdG9yQWxsKEN1c3RvbWVyUm93LlRBR19OQU1FKTtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20ocm93cyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRSb3dFdmVudExpc3RlbmVyKHJvdzogQ3VzdG9tZXJSb3cpIHtcbiAgICAgICAgcm93LmFkZEV2ZW50TGlzdGVuZXIoJ2N1c3RvbWVyLWNsaWNrZWQnLCAoZTogQ3VzdG9tRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRldGFpbCA9IGUuZGV0YWlsOyAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgeyBmaXJzdE5hbWUsIGxhc3ROYW1lIH0gPSBkZXRhaWw7XG4gICAgICAgICAgICB0aGlzLmdldFJvd3MoKS5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgICAgICAgcm93LnNlbGVjdGVkID0gcm93LmZpcnN0TmFtZSA9PT0gZmlyc3ROYW1lICYmIHJvdy5sYXN0TmFtZSA9PT0gbGFzdE5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoXG4gICAgICAgICAgICAgICAgICAgICdjdXN0b21lci1zZWxlY3RlZCcsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBuZXdJbnN0YW5jZSgpOiBDdXN0b21lckxpc3Qge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChDdXN0b21lckxpc3QuVEFHX05BTUUpIGFzIEN1c3RvbWVyTGlzdDtcbiAgICB9XG5cbiAgICBzZXRDdXN0b21lcnMoY3VzdG9tZXJzOiBSZWFkb25seUFycmF5PEN1c3RvbWVyPikge1xuICAgICAgICBlbXB0eSh0aGlzLl9zbG90KTtcbiAgICAgICAgY3VzdG9tZXJzLmZvckVhY2goYyA9PiB7XG4gICAgICAgICAgICBjb25zdCByb3cgPSBDdXN0b21lclJvdy5uZXdJbnN0YW5jZShjLmZpcnN0TmFtZSwgYy5sYXN0TmFtZSk7XG4gICAgICAgICAgICB0aGlzLmFkZFJvd0V2ZW50TGlzdGVuZXIocm93KTtcbiAgICAgICAgICAgIHRoaXMuX3Nsb3QuYXBwZW5kQ2hpbGQocm93KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWRSb3coKTogQ3VzdG9tZXJSb3cgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRSb3dzKCkuZmluZChyID0+IHIuc2VsZWN0ZWQpO1xuICAgIH1cblxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoQ3VzdG9tZXJMaXN0LlRBR19OQU1FLCBDdXN0b21lckxpc3QpOyIsImltcG9ydCB7IGEsIGRpdiwgZW1wdHksIHNwYW4sIHRleHQgfSBmcm9tIFwiLi4vYnVpbGRlci9IdG1sQnVpbGRlclwiO1xuXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJSb3cgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cbiAgICBzdGF0aWMgVEFHX05BTUUgPSAnY3VzdG9tZXItcm93JztcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2hhZG93OiBTaGFkb3dSb290O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc2hhZG93ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3Blbid9KTsgICAgICAgIFxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgICAgICByZXR1cm4gWydmaXJzdE5hbWUnLCAnbGFzdE5hbWUnLCAnc2VsZWN0ZWQnXTtcbiAgICB9XG5cbiAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXR0ciBjaGFuZ2VkXCIsIG5hbWUpO1xuICAgICAgICB0aGlzLnVwZGF0ZURvbSgpO1xuICAgIH1cbiAgICAgIFxuXG4gICAgcHJpdmF0ZSB1cGRhdGVEb20oKSB7XG4gICAgICAgIGVtcHR5KHRoaXMuc2hhZG93KTtcblxuICAgICAgICBjb25zdCBjcmVhdGVMaW5rID0gKHRleHRDb250ZW50OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFFbGVtID0gYSh7aHJlZjogJyMnfSwgdGV4dCh0ZXh0Q29udGVudCkpO1xuICAgICAgICAgICAgYUVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgICAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnY3VzdG9tZXItY2xpY2tlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogdGhpcy5maXJzdE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiB0aGlzLmxhc3ROYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGFFbGVtO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGNvbnRlbnRUZXh0ID0gdGhpcy5maXJzdE5hbWUgKyBcIiBcIiArIHRoaXMubGFzdE5hbWU7XG4gICAgICAgIHRoaXMuc2hhZG93LmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgZGl2KFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnY3VzdC1yb3cnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkXG4gICAgICAgICAgICAgICAgICAgID8gc3Bhbih7fSwgdGV4dChjb250ZW50VGV4dCkpXG4gICAgICAgICAgICAgICAgICAgIDogY3JlYXRlTGluayhjb250ZW50VGV4dClcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy51cGRhdGVEb20oKTtcbiAgICB9XG5cbiAgICBnZXQgZmlyc3ROYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnZmlyc3QtbmFtZScpO1xuICAgIH1cblxuICAgIHNldCBmaXJzdE5hbWUoZm46IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnZmlyc3QtbmFtZScsIGZuKTtcbiAgICAgICAgdGhpcy51cGRhdGVEb20oKTtcbiAgICB9XG5cbiAgICBnZXQgbGFzdE5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdsYXN0LW5hbWUnKTtcbiAgICB9XG5cbiAgICBzZXQgbGFzdE5hbWUobG46IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnbGFzdC1uYW1lJywgbG4pO1xuICAgICAgICB0aGlzLnVwZGF0ZURvbSgpO1xuICAgIH1cblxuICAgIGdldCBzZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdzZWxlY3RlZCcpO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RlZChzOiBib29sZWFuKSB7XG4gICAgICAgIGlmIChzKSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZURvbSgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBuZXdJbnN0YW5jZShmaXJzdE5hbWU6IHN0cmluZywgbGFzdE5hbWU6IHN0cmluZyk6IEN1c3RvbWVyUm93IHtcbiAgICAgICAgY29uc3QgcmVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChDdXN0b21lclJvdy5UQUdfTkFNRSkgYXMgQ3VzdG9tZXJSb3c7XG4gICAgICAgIHJlcy5maXJzdE5hbWUgPSBmaXJzdE5hbWU7XG4gICAgICAgIHJlcy5sYXN0TmFtZSA9IGxhc3ROYW1lO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2N1c3RvbWVyLXJvdycsIEN1c3RvbWVyUm93KTsiLCJpbXBvcnQgeyBkaXYsIHNsb3QsIHN0eWxlLCB0ZXh0IH0gZnJvbSBcIi4uL2J1aWxkZXIvSHRtbEJ1aWxkZXJcIjtcblxuY29uc3QgZGlhZ1N0eWxlcyA9IGBcbiAgICAuZGctZGlhZ3JhbSB7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIH1cbiAgICAuZGctc2Nyb2xsLXBhbmUge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgfVxuICAgIC5kZy1jb250ZW50LXBhbmUge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyZXk7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB9XG5gO1xuXG5leHBvcnQgY2xhc3MgRGdEaWFncmFtIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gICAgc3RhdGljIFRBRyA9IFwiZGctZGlhZ3JhbVwiXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgY29uc3Qgc2hhZG93ID0gdGhpcy5hdHRhY2hTaGFkb3coe21vZGU6ICdvcGVuJ30pO1xuICAgICAgICBjb25zdCBjb250ZW50UGFuZSA9IGRpdihcbiAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnZGctY29udGVudC1wYW5lJyB9LCBcbiAgICAgICAgICAgIHNsb3Qoe30pXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHNjcm9sbFBhbmUgPSBkaXYoXG4gICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2RnLXNjcm9sbC1wYW5lJyB9LFxuICAgICAgICAgICAgY29udGVudFBhbmVcbiAgICAgICAgKTtcbiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKHNjcm9sbFBhbmUpO1xuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQoc3R5bGUoe30sIHRleHQoZGlhZ1N0eWxlcykpKTtcbiAgICB9ICAgIFxuXG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgfVxuXG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShEZ0RpYWdyYW0uVEFHLCBEZ0RpYWdyYW0pOyIsImltcG9ydCB7IGRpdiwgc2xvdCwgc3R5bGUsIHRleHQgfSBmcm9tIFwiLi4vYnVpbGRlci9IdG1sQnVpbGRlclwiO1xuaW1wb3J0IHsgRGdOb2RlIH0gZnJvbSBcIi4vRGdOb2RlXCI7XG5cbmludGVyZmFjZSBEcmFnU3RhdGUge1xuICAgIHJlYWRvbmx5IHJlZlg6IG51bWJlcjtcbiAgICByZWFkb25seSByZWZZOiBudW1iZXI7XG4gICAgcmVhZG9ubHkgZG93blg6IG51bWJlcjtcbiAgICByZWFkb25seSBkb3duWTogbnVtYmVyO1xuICAgIGN1clg6IG51bWJlcjtcbiAgICBjdXJZOiBudW1iZXI7XG59XG5cbmZ1bmN0aW9uIGRlbHRhcyhkczpEcmFnU3RhdGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBkZWx0YVg6IGRzLmN1clggLSBkcy5kb3duWCxcbiAgICAgICAgZGVsdGFZOiBkcy5jdXJZIC0gZHMuZG93bllcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEZ0RyYWdnYWJsZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICAgIHN0YXRpYyBUQUcgPSBcImRnLWRyYWdnYWJsZVwiO1xuXG4gICAgcHJpdmF0ZSBkcmFnU3RhdGU6IERyYWdTdGF0ZSB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGNvbnN0IHNoYWRvdyA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nfSk7XG4gICAgICAgIGNvbnN0IGRvbU5vZGUgPSBkaXYoeyBjbGFzc05hbWU6ICdkZy1kcmFnZ2FibGUnfSwgc2xvdCh7fSkpO1xuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQoZG9tTm9kZSk7XG4gICAgICAgIHNoYWRvdy5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIHN0eWxlKHt9LCB0ZXh0KGBcbiAgICAgICAgICAgIC5kZy1kcmFnZ2FibGUge1xuICAgICAgICAgICAgICAgIGN1cnNvcjogbW92ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGApKVxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IG1vdXNlTW92ZSA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5kcmFnU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGNsaWVudFgsIGNsaWVudFkgfSA9IGU7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnU3RhdGUuY3VyWCA9IGNsaWVudFg7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnU3RhdGUuY3VyWSA9IGNsaWVudFk7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkZWx0YVgsIGRlbHRhWSB9ID0gZGVsdGFzKHRoaXMuZHJhZ1N0YXRlKTsgXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGVsdGFYLCBkZWx0YVkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRnTm9kZSA9IHRoaXMuZ2V0RGdOb2RlKCk7ICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGRnTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBkZ05vZGUueCA9IHRoaXMuZHJhZ1N0YXRlLnJlZlggKyBkZWx0YVg7XG4gICAgICAgICAgICAgICAgICAgIGRnTm9kZS55ID0gdGhpcy5kcmFnU3RhdGUucmVmWSArIGRlbHRhWTsgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbW91c2VVcCA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZU1vdmUpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNlVXApO1xuICAgICAgICAgICAgdGhpcy5kcmFnU3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBkb21Ob2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGUgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBjbGllbnRYLCBjbGllbnRZIH0gPSBlO1xuICAgICAgICAgICAgY29uc3QgZGdOb2RlID0gdGhpcy5nZXREZ05vZGUoKTsgICAgICBcbiAgICAgICAgICAgIGlmIChkZ05vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZG93blg6IGNsaWVudFgsXG4gICAgICAgICAgICAgICAgICAgIGRvd25ZOiBjbGllbnRZLFxuICAgICAgICAgICAgICAgICAgICBjdXJYOiBjbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICBjdXJZOiBjbGllbnRZLFxuICAgICAgICAgICAgICAgICAgICByZWZYOiBkZ05vZGUueCxcbiAgICAgICAgICAgICAgICAgICAgcmVmWTogZGdOb2RlLnksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1vdXNlZG93blwiKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZU1vdmUpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwKTsgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGdOb2RlKGZyb206IEhUTUxFbGVtZW50ID0gdGhpcyk6IERnTm9kZSB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmIChmcm9tLnBhcmVudEVsZW1lbnQgaW5zdGFuY2VvZiBEZ05vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZyb20ucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGdOb2RlKGZyb20ucGFyZW50RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cblxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRGdEcmFnZ2FibGUuVEFHLCBEZ0RyYWdnYWJsZSk7IiwiaW1wb3J0IHsgZGl2LCBzbG90LCBzdHlsZSwgdGV4dCB9IGZyb20gXCIuLi9idWlsZGVyL0h0bWxCdWlsZGVyXCI7XG5pbXBvcnQgeyBzYWZlUGFyc2VJbnQgfSBmcm9tIFwiLi4vU2FmZVBhcnNlSW50XCI7XG5cbmNvbnN0IGNzcyA9IGBcbiAgICAuZGctbm9kZSB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgZGlzcGxheTogZmxleDsgICAgICAgIFxuICAgIH1cbmA7XG5cbmV4cG9ydCBjbGFzcyBEZ05vZGUgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cbiAgICBzdGF0aWMgVEFHID0gXCJkZy1ub2RlXCI7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IGRnTm9kZTogSFRNTERpdkVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgY29uc3Qgc2hhZG93ID0gdGhpcy5hdHRhY2hTaGFkb3coe21vZGU6J29wZW4nfSk7XG4gICAgICAgIHRoaXMuZGdOb2RlID0gZGl2KHtjbGFzc05hbWU6ICdkZy1ub2RlJ30sIHNsb3Qoe30pKTtcbiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKHRoaXMuZGdOb2RlKTtcbiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKHN0eWxlKHt9LCB0ZXh0KGNzcykpKTtcbiAgICB9XG5cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoUG9zQW5kU2l6ZUZyb21Qcm9wcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVmcmVzaFBvc0FuZFNpemVGcm9tUHJvcHMoKSB7XG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmRnTm9kZS5zdHlsZTtcbiAgICAgICAgcy5sZWZ0ID0gdGhpcy54ICsgXCJweFwiO1xuICAgICAgICBzLnRvcCA9IHRoaXMueSArIFwicHhcIjtcbiAgICAgICAgcy53aWR0aCA9IHRoaXMudyArIFwicHhcIjtcbiAgICAgICAgcy5oZWlnaHQgPSB0aGlzLmggKyBcInB4XCI7XG4gICAgfVxuXG4gICAgZ2V0IHgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNhZmVQYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgneCcpKTtcbiAgICB9XG5cbiAgICBzZXQgeCh4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3gnLCB4LnRvU3RyaW5nKCkpO1xuICAgICAgICB0aGlzLnJlZnJlc2hQb3NBbmRTaXplRnJvbVByb3BzKCk7XG4gICAgfVxuXG4gICAgZ2V0IHkoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNhZmVQYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgneScpKTtcbiAgICB9XG5cbiAgICBzZXQgeSh5OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3knLCB5LnRvU3RyaW5nKCkpO1xuICAgICAgICB0aGlzLnJlZnJlc2hQb3NBbmRTaXplRnJvbVByb3BzKCk7XG4gICAgfVxuXG4gICAgZ2V0IGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNhZmVQYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgnaCcpKTtcbiAgICB9XG5cbiAgICBnZXQgdygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc2FmZVBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCd3JykpO1xuICAgIH1cblxuICAgXG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKERnTm9kZS5UQUcsIERnTm9kZSk7IiwiaW1wb3J0IHsgZGl2LCBzbG90IH0gZnJvbSBcIi4uL2J1aWxkZXIvSHRtbEJ1aWxkZXJcIjtcbmltcG9ydCB7IHNhZmVQYXJzZUludCB9IGZyb20gXCIuLi9TYWZlUGFyc2VJbnRcIjtcbmltcG9ydCB7IFZpcnR1YWxTY3JvbGxlciB9IGZyb20gXCIuL1ZpcnR1YWxTY3JvbGxlclwiO1xuXG5leHBvcnQgY2xhc3MgU2Nyb2xsSXRlbSBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICAgIHN0YXRpYyBUQUdfTkFNRSA9IFwic2Nyb2xsLWl0ZW1cIjtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgd3JhcHBlcjogSFRNTERpdkVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTsgICAgICAgIFxuICAgICAgICB0aGlzLndyYXBwZXIgPSBkaXYoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB9LCBcbiAgICAgICAgICAgIHNsb3Qoe30pXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYXR0YWNoU2hhZG93KHttb2RlOidvcGVuJ30pLmFwcGVuZENoaWxkKHRoaXMud3JhcHBlcik7XG4gICAgfVxuXG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMud3JhcHBlci5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgdGhpcy53cmFwcGVyLnN0eWxlLnRvcCA9IHRoaXMudG9wICsgJ3B4JztcbiAgICAgICAgdGhpcy53cmFwcGVyLnN0eWxlLmxlZnQgPSB0aGlzLmxlZnQgKyAncHgnO1xuICAgICAgICAvLyB1Z2x5ICEgbmVlZCBhIHRpbWVvdXQgaGVyZSB0byBsZXQgYnJvd3NlciByZW5kZXIgb3RoZXJ3aXNlIHRoZSBlbGVtZW50IGlzbid0IHlldCBzaXplZFxuICAgICAgICAvLyBUT0RPIGZpbmQgd2F5IHRvIGdldCBjYWxsZWQgd2hlbiB0aGUgY29tcG9uZW50IGhhcyBiZWVuIHJlbmRlcmVkXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb21wdXRlRGltZW5zaW9ucygpO1xuICAgICAgICB9LCAwKTtcbiAgICB9XG5cbiAgICBjb21wdXRlRGltZW5zaW9ucygpIHtcbiAgICAgICAgY29uc3QgYm94ID0gdGhpcy53cmFwcGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGJveC5oZWlnaHQ7XG4gICAgICAgIHRoaXMud2lkdGggPSBib3gud2lkdGg7ICAgIFxuICAgIH1cblxuICAgIGdldCB0b3AoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNhZmVQYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgndG9wJykpO1xuICAgIH1cblxuICAgIHNldCB0b3AodDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd0b3AnLCB0LnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIGdldCBsZWZ0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ2xlZnQnKSk7XG4gICAgfVxuXG4gICAgc2V0IGxlZnQobDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdsZWZ0JywgbC50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNhZmVQYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgnd2lkdGgnKSk7ICAgICAgICBcbiAgICB9XG5cbiAgICBzZXQgd2lkdGgodzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHcudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgZ2V0IGhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc2FmZVBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCdoZWlnaHQnKSk7ICAgICAgICBcbiAgICB9XG5cbiAgICBzZXQgaGVpZ2h0KGg6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgaC50b1N0cmluZygpKTtcbiAgICB9XG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFNjcm9sbEl0ZW0uVEFHX05BTUUsIFNjcm9sbEl0ZW0pO1xuIiwiaW1wb3J0IHsgZGl2LCBzbG90LCBzdHlsZSwgdGV4dCB9IGZyb20gXCIuLi9idWlsZGVyL0h0bWxCdWlsZGVyXCI7XG5pbXBvcnQgeyBzYWZlUGFyc2VJbnQgfSBmcm9tIFwiLi4vU2FmZVBhcnNlSW50XCI7XG5pbXBvcnQgeyBTY3JvbGxJdGVtIH0gZnJvbSBcIi4vU2Nyb2xsSXRlbVwiO1xuXG5leHBvcnQgY2xhc3MgVmlydHVhbFNjcm9sbGVyIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gICAgc3RhdGljIFRBR19OQU1FID0gXCJ2aXJ0dWFsLXNjcm9sbGVyXCI7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbnRlbnRQYW5lOiBIVE1MRGl2RWxlbWVudDtcbiAgICBwcml2YXRlIHNjcm9sbFRpbWVvdXQ6IGFueSA9IHVuZGVmaW5lZDtcbiAgICBwcml2YXRlIGNvdW50ZXI6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLmNvbnRlbnRQYW5lID0gZGl2KHtjbGFzc05hbWU6ICdjb250ZW50LXBhbmUnfSwgc2xvdCh7fSkpO1xuXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxUaW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuc2Nyb2xsVGltZW91dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvdW50ZXIrKztcbiAgICAgICAgICAgIGNvbnN0IF9jb3VudGVyID0gdGhpcy5jb3VudGVyO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY291bnRlciA9PT0gX2NvdW50ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3VG9wID0gdGhpcy5zY3JvbGxUb3A7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0xlZnQgPSB0aGlzLnNjcm9sbExlZnQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9wID0gbmV3VG9wO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxlZnQgPSBuZXdMZWZ0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEwKTtcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBzaGFkb3cgPSB0aGlzLmF0dGFjaFNoYWRvdyh7bW9kZTonb3Blbid9KTtcbiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKHRoaXMuY29udGVudFBhbmUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgJ2NvbnRlbnQtaGVpZ2h0JywgXG4gICAgICAgICAgICAnY29udGVudC13aWR0aCcsIFxuICAgICAgICAgICAgJ3RvcCcsIFxuICAgICAgICAgICAgJ2xlZnQnLCBcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5zZXRTY3JvbGxQYW5lRGltZW5zaW9ucygpO1xuICAgIH1cblxuICAgIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICBpZiAodGhpcy5zY3JvbGxUaW1lb3V0KSB7XG4gICAgICAgICAgICB0aGlzLmNvdW50ZXIrKztcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNjcm9sbFRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRTY3JvbGxQYW5lRGltZW5zaW9ucygpIHtcbiAgICAgICAgdGhpcy5jb250ZW50UGFuZS5zdHlsZS5oZWlnaHQgPSB0aGlzLmNvbnRlbnRIZWlnaHQgKyBcInB4XCI7XG4gICAgICAgIHRoaXMuY29udGVudFBhbmUuc3R5bGUud2lkdGggPSB0aGlzLmNvbnRlbnRXaWR0aCArIFwicHhcIjtcbiAgICB9XG5cbiAgICBnZXQgY29udGVudEhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc2FmZVBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCdjb250ZW50LWhlaWdodCcpKTtcbiAgICB9XG5cbiAgICBzZXQgY29udGVudEhlaWdodChoOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnQtaGVpZ2h0JywgaC50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBnZXQgY29udGVudFdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQtaGVpZ2h0JykpO1xuICAgIH1cblxuICAgIHNldCBjb250ZW50V2lkdGgodzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdjb250ZW50LXdpZHRoJywgdy50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBnZXQgdG9wKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ3RvcCcpKTtcbiAgICB9XG5cbiAgICBzZXQgdG9wKHQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgndG9wJywgdC50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBnZXQgbGVmdCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc2FmZVBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCdsZWZ0JykpO1xuICAgIH1cblxuICAgIHNldCBsZWZ0KGw6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnbGVmdCcsIGwudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgZ2V0U2Nyb2xsSXRlbXMoKTogUmVhZG9ubHlBcnJheTxTY3JvbGxJdGVtPiB7XG4gICAgICAgIGNvbnN0IGl0ZW1zOiBOb2RlTGlzdE9mPFNjcm9sbEl0ZW0+ID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKFNjcm9sbEl0ZW0uVEFHX05BTUUpO1xuICAgICAgICBkZWJ1Z2dlcjtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oaXRlbXMpO1xuICAgIH1cblxuXG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShWaXJ0dWFsU2Nyb2xsZXIuVEFHX05BTUUsIFZpcnR1YWxTY3JvbGxlcik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBDdXN0b21lckFwcCB9IGZyb20gXCIuL2N1c3RvbWVyL0N1c3RvbWVyQXBwXCI7XG5pbXBvcnQgeyBEZ0RpYWdyYW0gfSBmcm9tIFwiLi9kaWFncmFtL0RnRGlhZ3JhbVwiO1xuaW1wb3J0IHsgRGdEcmFnZ2FibGUgfSBmcm9tIFwiLi9kaWFncmFtL0RnRHJhZ2dhYmxlXCI7XG5pbXBvcnQgeyBEZ05vZGUgfSBmcm9tIFwiLi9kaWFncmFtL0RnTm9kZVwiO1xuaW1wb3J0IHsgU2Nyb2xsSXRlbSB9IGZyb20gXCIuL3ZpcnR1YWwtc2Nyb2xsZXIvU2Nyb2xsSXRlbVwiO1xuaW1wb3J0IHsgVmlydHVhbFNjcm9sbGVyIH0gZnJvbSBcIi4vdmlydHVhbC1zY3JvbGxlci9WaXJ0dWFsU2Nyb2xsZXJcIjtcblxuLy8ganVzdCBmb3IgaW1wb3J0cyAhXG5jb25zb2xlLmxvZygneWFsbGEnLCBDdXN0b21lckFwcC5UQUdfTkFNRSwgVmlydHVhbFNjcm9sbGVyLlRBR19OQU1FLCBTY3JvbGxJdGVtLlRBR19OQU1FLCBEZ0RpYWdyYW0uVEFHLCBEZ05vZGUuVEFHLCBEZ0RyYWdnYWJsZS5UQUcpO1xuXG4vLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGUgPT4ge1xuLy8gICAgIGNvbnN0IGFwcDogQ3VzdG9tZXJBcHAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykgYXMgQ3VzdG9tZXJBcHA7XG4vLyAgICAgY29uc29sZS5sb2coXCJhcHAgbG9hZGVkXCIsIGFwcCk7XG4vLyAgICAgYXBwLmluaXQoW1xuLy8gICAgICAgICB7IGZpcnN0TmFtZTogJ1RvdG8nLCBsYXN0TmFtZTogJ0JpbG91dGUnIH0sXG4vLyAgICAgICAgIHsgZmlyc3ROYW1lOiAnRnJlbmNoJywgbGFzdE5hbWU6ICdGcmllcycgfSxcbi8vICAgICAgICAgeyBmaXJzdE5hbWU6ICdGb28nLCBsYXN0TmFtZTogJ0JhcicgfSxcbi8vICAgICBdKVxuLy8gfSlcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==