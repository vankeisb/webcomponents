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
/* harmony export */   "px": () => (/* binding */ px),
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
function px(n) {
    return n + 'px';
}


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
/* harmony import */ var _DgLink__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DgLink */ "./src/diagram/DgLink.ts");
/* harmony import */ var _DgNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DgNode */ "./src/diagram/DgNode.ts");



const SVG_NS = 'http://www.w3.org/2000/svg';
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
    .dg-links {
        width: 100%;
        height: 100%;
    }
    .dg-content-pane {
        background-color: lightgrey;
        position: relative;
    }
`;
const svgDefs = `
<marker id="arrowhead" markerWidth="10" markerHeight="7" 
refX="9" refY="3.5" orient="auto">
    <polygon points="0 0, 10 3.5, 0 7" />
</marker>
`;
class DgDiagram extends HTMLElement {
    constructor() {
        super();
        this.linksSvg = document.createElementNS(SVG_NS, 'svg');
        const shadow = this.attachShadow({ mode: 'open' });
        this.linksSvg.classList.add('dg-links');
        const defs = document.createElementNS(SVG_NS, 'svg');
        defs.innerHTML = svgDefs;
        this.linksSvg.appendChild(defs);
        const linksSlot = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.slot)({ name: "links" });
        this.linksSvg.appendChild(linksSlot);
        const scrollPane = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.div)({ className: 'dg-scroll-pane' }, this.linksSvg, (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.slot)({}));
        shadow.appendChild(scrollPane);
        shadow.appendChild((0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.style)({}, (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.text)(diagStyles)));
    }
    connectedCallback() {
    }
    getDgNodes() {
        const q = this.querySelectorAll(_DgNode__WEBPACK_IMPORTED_MODULE_2__.DgNode.TAG);
        return Array.from(q);
    }
    getNodeById(id) {
        return this.getDgNodes().find(n => n.id === id);
    }
    getDgLinks() {
        const q = this.querySelectorAll(_DgLink__WEBPACK_IMPORTED_MODULE_1__.DgLink.TAG);
        return Array.from(q);
    }
    registerLink(link) {
        const line = link.drawLink(this.getNodeById(link.from), this.getNodeById(link.to));
        line.setAttribute("from", link.from);
        line.setAttribute("to", link.to);
        this.linksSvg.appendChild(line);
    }
    registerNode(node) {
        node.addEventListener('moved', () => {
            // update all links
            this.linksSvg.querySelectorAll("line")
                .forEach(line => line.remove());
            // add new
            this.getDgLinks()
                .forEach(l => {
                const line = l.drawLink(this.getNodeById(l.from), this.getNodeById(l.to));
                this.linksSvg.appendChild(line);
            });
        });
    }
    static getParentDgDiagram(from) {
        if (from.parentElement instanceof DgDiagram) {
            return from.parentElement;
        }
        if (from.parentElement) {
            return DgDiagram.getParentDgDiagram(from.parentElement);
        }
        return undefined;
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
/* harmony import */ var _DgNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DgNode */ "./src/diagram/DgNode.ts");
/* harmony import */ var _MouseDrag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MouseDrag */ "./src/diagram/MouseDrag.ts");


class DgDraggable extends HTMLElement {
    constructor() {
        super();
        const mouseMove = (e) => {
            if (this.dragState) {
                (0,_MouseDrag__WEBPACK_IMPORTED_MODULE_1__.dragUpdate)(this.dragState.mouseDrag, e);
                const { dx, dy } = (0,_MouseDrag__WEBPACK_IMPORTED_MODULE_1__.dragDeltas)(this.dragState.mouseDrag);
                const dgNode = _DgNode__WEBPACK_IMPORTED_MODULE_0__.DgNode.getParentDgNode(this);
                if (dgNode) {
                    dgNode.x = this.dragState.refX + dx;
                    dgNode.y = this.dragState.refY + dy;
                }
            }
        };
        const mouseUp = (e) => {
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
            this.dragState = undefined;
        };
        this.addEventListener('mousedown', e => {
            const { clientX, clientY } = e;
            const dgNode = _DgNode__WEBPACK_IMPORTED_MODULE_0__.DgNode.getParentDgNode(this);
            if (dgNode) {
                this.dragState = {
                    mouseDrag: (0,_MouseDrag__WEBPACK_IMPORTED_MODULE_1__.newMouseDrag)(e),
                    refX: dgNode.x,
                    refY: dgNode.y,
                };
                document.addEventListener('mousemove', mouseMove);
                document.addEventListener('mouseup', mouseUp);
            }
        });
    }
}
DgDraggable.TAG = "dg-draggable";
customElements.define(DgDraggable.TAG, DgDraggable);


/***/ }),

/***/ "./src/diagram/DgLink.ts":
/*!*******************************!*\
  !*** ./src/diagram/DgLink.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DgLink": () => (/* binding */ DgLink)
/* harmony export */ });
/* harmony import */ var _geometry_Box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./geometry/Box */ "./src/diagram/geometry/Box.ts");
/* harmony import */ var _DgDiagram__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DgDiagram */ "./src/diagram/DgDiagram.ts");


const SVG_NS = 'http://www.w3.org/2000/svg';
class DgLink extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        _DgDiagram__WEBPACK_IMPORTED_MODULE_1__.DgDiagram.getParentDgDiagram(this).registerLink(this);
    }
    drawLink(fromNode, toNode) {
        const fromBox = fromNode.getBox();
        const toBox = toNode.getBox();
        const center1 = (0,_geometry_Box__WEBPACK_IMPORTED_MODULE_0__.boxCenter)(fromBox);
        const center2 = (0,_geometry_Box__WEBPACK_IMPORTED_MODULE_0__.boxCenter)(toBox);
        const line = {
            from: center1,
            to: center2,
        };
        const isect1 = (0,_geometry_Box__WEBPACK_IMPORTED_MODULE_0__.boxIntersection)(fromBox, line);
        const isect2 = (0,_geometry_Box__WEBPACK_IMPORTED_MODULE_0__.boxIntersection)(toBox, line);
        const fromPoint = isect1 || center1;
        const toPoint = isect2 || center2;
        const svgLine = document.createElementNS(SVG_NS, 'line');
        svgLine.setAttribute('x1', fromPoint.x.toString());
        svgLine.setAttribute('x2', toPoint.x.toString());
        svgLine.setAttribute('y1', fromPoint.y.toString());
        svgLine.setAttribute('y2', toPoint.y.toString());
        svgLine.setAttribute('stroke', 'black');
        svgLine.setAttribute('stroke-width', '2');
        svgLine.setAttribute('marker-end', 'url(#arrowhead)');
        return svgLine;
    }
    get from() {
        return this.getAttribute('from');
    }
    get to() {
        return this.getAttribute('to');
    }
}
DgLink.TAG = 'dg-link';
customElements.define(DgLink.TAG, DgLink);


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
/* harmony import */ var _geometry_Box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./geometry/Box */ "./src/diagram/geometry/Box.ts");
/* harmony import */ var _DgDiagram__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DgDiagram */ "./src/diagram/DgDiagram.ts");




const css = `
    .dg-node {
        position: absolute;
        display: flex;   
        overflow: hidden;    
    }
`;
class DgNode extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        this.dgSlot = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.slot)({});
        this.dgNode = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.div)({ className: 'dg-node' }, this.dgSlot);
        shadow.appendChild(this.dgNode);
        shadow.appendChild((0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.style)({}, (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.text)(css)));
    }
    connectedCallback() {
        const s = this.dgNode.style;
        s.left = this.x + "px";
        s.top = this.y + "px";
        s.width = this.w + "px";
        s.height = this.h + "px";
        this.addEventListener('mousedown', () => {
            this.mouseDownBox = this.getBox();
        });
        this.addEventListener('mouseup', () => {
            if (this.mouseDownBox) {
                if ((0,_geometry_Box__WEBPACK_IMPORTED_MODULE_2__.boxEquals)(this.getBox(), this.mouseDownBox)) {
                    this.selected = !this.selected;
                }
            }
            this.mouseDownBox = undefined;
        });
        this.getDgDiagram().registerNode(this);
    }
    getBox() {
        return {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h,
        };
    }
    static get observedAttributes() {
        return ['x', 'y', 'h', 'w'];
    }
    fireMoved() {
        this.dispatchEvent(new CustomEvent('moved', { detail: this }));
    }
    attributeChangedCallback(name, oldValue, newValue) {
        const s = this.dgNode.style;
        if (oldValue === newValue) {
            return;
        }
        switch (name) {
            case 'x': {
                s.left = this.x + 'px';
                this.fireMoved();
                break;
            }
            case 'y': {
                s.top = this.y + 'px';
                this.fireMoved();
                break;
            }
            case 'w': {
                s.width = this.w + 'px';
                this.fireMoved();
                break;
            }
            case 'h': {
                s.height = this.h + 'px';
                this.fireMoved();
                break;
            }
            default:
                break;
        }
    }
    get id() {
        return this.getAttribute('id');
    }
    get x() {
        return (0,_SafeParseInt__WEBPACK_IMPORTED_MODULE_1__.safeParseInt)(this.getAttribute('x'));
    }
    set x(x) {
        this.setAttribute('x', x.toString());
        this.dgNode.style.left = x + 'px';
    }
    get y() {
        return (0,_SafeParseInt__WEBPACK_IMPORTED_MODULE_1__.safeParseInt)(this.getAttribute('y'));
    }
    set y(y) {
        this.setAttribute('y', y.toString());
        this.dgNode.style.top = y + 'px';
    }
    get h() {
        return (0,_SafeParseInt__WEBPACK_IMPORTED_MODULE_1__.safeParseInt)(this.getAttribute('h'));
    }
    set h(h) {
        this.setAttribute('h', h.toString());
        this.dgNode.style.height = h + 'px';
    }
    get w() {
        return (0,_SafeParseInt__WEBPACK_IMPORTED_MODULE_1__.safeParseInt)(this.getAttribute('w'));
    }
    set w(w) {
        this.setAttribute('w', w.toString());
        this.dgNode.style.width = w + 'px';
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
    }
    getDgDiagram() {
        return _DgDiagram__WEBPACK_IMPORTED_MODULE_3__.DgDiagram.getParentDgDiagram(this);
    }
    static getParentDgNode(from) {
        if (from.parentElement instanceof DgNode) {
            return from.parentElement;
        }
        if (from.parentElement) {
            return DgNode.getParentDgNode(from.parentElement);
        }
        return undefined;
    }
}
DgNode.TAG = "dg-node";
customElements.define(DgNode.TAG, DgNode);


/***/ }),

/***/ "./src/diagram/DgResizeable.ts":
/*!*************************************!*\
  !*** ./src/diagram/DgResizeable.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DgResizeable": () => (/* binding */ DgResizeable)
/* harmony export */ });
/* harmony import */ var _SafeParseInt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../SafeParseInt */ "./src/SafeParseInt.ts");
/* harmony import */ var _DgNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DgNode */ "./src/diagram/DgNode.ts");
/* harmony import */ var _builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../builder/HtmlBuilder */ "./src/builder/HtmlBuilder.ts");
/* harmony import */ var _MouseDrag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MouseDrag */ "./src/diagram/MouseDrag.ts");




const MIN_SIZE = 10;
class DgResizeable extends HTMLElement {
    constructor() {
        super();
        this.docMouseMove = (e) => {
            if (this.dragState) {
                const dgNode = _DgNode__WEBPACK_IMPORTED_MODULE_1__.DgNode.getParentDgNode(this);
                if (dgNode) {
                    (0,_MouseDrag__WEBPACK_IMPORTED_MODULE_3__.dragUpdate)(this.dragState.mouseDrag, e);
                    const { dx, dy } = (0,_MouseDrag__WEBPACK_IMPORTED_MODULE_3__.dragDeltas)(this.dragState.mouseDrag);
                    switch (this.dragState.mode) {
                        case "top": {
                            const { refY, refH } = this.dragState;
                            const newY = refY + dy;
                            const newH = refH - dy;
                            if (newH < MIN_SIZE) {
                                return;
                            }
                            dgNode.y = newY;
                            dgNode.h = newH;
                            break;
                        }
                        case "bottom": {
                            const { refH } = this.dragState;
                            const newH = refH + dy;
                            if (newH < MIN_SIZE) {
                                return;
                            }
                            dgNode.h = newH;
                            break;
                        }
                        case "left": {
                            const { refX, refW } = this.dragState;
                            const newX = refX + dx;
                            const newW = refW - dx;
                            if (newW < MIN_SIZE) {
                                return;
                            }
                            dgNode.x = newX;
                            dgNode.w = newW;
                            break;
                        }
                        case "right": {
                            const { refW } = this.dragState;
                            const newW = refW + dx;
                            if (newW < MIN_SIZE) {
                                return;
                            }
                            dgNode.w = newW;
                            break;
                        }
                        case "top-left": {
                            const { refX, refW, refY, refH } = this.dragState;
                            let newY = refY + dy;
                            let newH = refH - dy;
                            if (newH < MIN_SIZE) {
                                newH = MIN_SIZE;
                                const deltaH = newH - refH;
                                newY = refY - deltaH;
                            }
                            let newX = refX + dx;
                            let newW = refW - dx;
                            if (newW < MIN_SIZE) {
                                newW = MIN_SIZE;
                                const deltaW = newW - refW;
                                newX = refX - deltaW;
                            }
                            dgNode.y = newY;
                            dgNode.h = newH;
                            dgNode.x = newX;
                            dgNode.w = newW;
                            break;
                        }
                        // TODO other resize modes...
                    }
                }
            }
        };
        this.docMouseUp = () => {
            document.removeEventListener('mousemove', this.docMouseMove);
            document.removeEventListener('mouseup', this.docMouseUp);
        };
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.appendChild((0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_2__.slot)({}));
        const reTop = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_2__.div)({ className: 'dg-resize-elem ' });
        reTop.style.top = "0";
        reTop.style.left = "2px";
        reTop.style.right = "2px";
        reTop.style.height = "2px";
        reTop.style.cursor = "ns-resize";
        reTop.addEventListener('mousedown', this.onReMouseDown('top'));
        const reBottom = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_2__.div)({ className: 'dg-resize-elem ' });
        reBottom.style.bottom = "0";
        reBottom.style.left = "2px";
        reBottom.style.right = "2px";
        reBottom.style.height = "2px";
        reBottom.style.cursor = "ns-resize";
        reBottom.addEventListener('mousedown', this.onReMouseDown('bottom'));
        const reLeft = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_2__.div)({ className: 'dg-resize-elem ' });
        reLeft.style.top = "2px";
        reLeft.style.bottom = "2px";
        reLeft.style.left = "0";
        reLeft.style.width = "2px";
        reLeft.style.cursor = "ew-resize";
        reLeft.addEventListener('mousedown', this.onReMouseDown('left'));
        const reRight = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_2__.div)({ className: 'dg-resize-elem ' });
        reRight.style.top = "2px";
        reRight.style.bottom = "2px";
        reRight.style.right = "0";
        reRight.style.width = "2px";
        reRight.style.cursor = "ew-resize";
        reRight.addEventListener('mousedown', this.onReMouseDown('right'));
        const reTopLeft = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_2__.div)({ className: 'dg-resize-elem ' });
        reTopLeft.style.top = "0";
        reTopLeft.style.left = "0";
        reTopLeft.style.width = "2px";
        reTopLeft.style.height = "2px";
        reTopLeft.style.cursor = "nwse-resize";
        reTopLeft.addEventListener('mousedown', this.onReMouseDown('top-left'));
        const reTopRight = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_2__.div)({ className: 'dg-resize-elem ' });
        reTopRight.style.top = "0";
        reTopRight.style.right = "0";
        reTopRight.style.width = "2px";
        reTopRight.style.height = "2px";
        reTopRight.style.cursor = "nesw-resize";
        reTopRight.addEventListener('mousedown', this.onReMouseDown('top-right'));
        const reBottomLeft = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_2__.div)({ className: 'dg-resize-elem ' });
        reBottomLeft.style.bottom = "0";
        reBottomLeft.style.left = "0";
        reBottomLeft.style.width = "2px";
        reBottomLeft.style.height = "2px";
        reBottomLeft.style.cursor = "nesw-resize";
        reBottomLeft.addEventListener('mousedown', this.onReMouseDown('bottom-left'));
        const reBottomRight = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_2__.div)({ className: 'dg-resize-elem ' });
        reBottomRight.style.bottom = "0";
        reBottomRight.style.right = "0";
        reBottomRight.style.width = "2px";
        reBottomRight.style.height = "2px";
        reBottomRight.style.cursor = "nwse-resize";
        reBottomRight.addEventListener('mousedown', this.onReMouseDown('bottom-right'));
        this.reElems = [
            reTopLeft,
            reTop,
            reTopRight,
            reRight,
            reBottomRight,
            reBottom,
            reBottomLeft,
            reLeft
        ];
        this.shadow.appendChild((0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_2__.style)({}, (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_2__.text)(`
                    .dg-resize-elem {
                        background-color: red;        
                        position: absolute; 
                    }
                `)));
        this.addEventListener('mouseenter', () => this.addResizeElems());
        this.addEventListener('mouseleave', () => this.removeResizeElems());
    }
    onReMouseDown(mode) {
        return e => {
            const dgNode = _DgNode__WEBPACK_IMPORTED_MODULE_1__.DgNode.getParentDgNode(this);
            if (dgNode) {
                this.dragState = {
                    mouseDrag: (0,_MouseDrag__WEBPACK_IMPORTED_MODULE_3__.newMouseDrag)(e),
                    mode,
                    refW: dgNode.w,
                    refH: dgNode.h,
                    refX: dgNode.x,
                    refY: dgNode.y,
                };
                document.addEventListener('mousemove', this.docMouseMove);
                document.addEventListener('mouseup', this.docMouseUp);
            }
        };
    }
    addResizeElems() {
        this.reElems.forEach(e => this.shadow.appendChild(e));
    }
    removeResizeElems() {
        this.reElems.forEach(e => this.shadow.removeChild(e));
    }
    get height() {
        return (0,_SafeParseInt__WEBPACK_IMPORTED_MODULE_0__.safeParseInt)(this.getAttribute('height'));
    }
    set height(height) {
        this.setAttribute('height', height.toString());
    }
    get width() {
        return (0,_SafeParseInt__WEBPACK_IMPORTED_MODULE_0__.safeParseInt)(this.getAttribute('height'));
    }
    set width(width) {
        this.setAttribute('width', width.toString());
    }
}
DgResizeable.TAG = 'dg-resizeable';
customElements.define(DgResizeable.TAG, DgResizeable);


/***/ }),

/***/ "./src/diagram/MouseDrag.ts":
/*!**********************************!*\
  !*** ./src/diagram/MouseDrag.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dragDeltas": () => (/* binding */ dragDeltas),
/* harmony export */   "dragUpdate": () => (/* binding */ dragUpdate),
/* harmony export */   "newMouseDrag": () => (/* binding */ newMouseDrag)
/* harmony export */ });
function newMouseDrag(e) {
    const { clientX, clientY } = e;
    return {
        downX: clientX,
        downY: clientY,
        curX: clientX,
        curY: clientY,
    };
}
function dragDeltas(d) {
    return {
        dx: d.curX - d.downX,
        dy: d.curY - d.downY,
    };
}
function dragUpdate(d, e) {
    d.curX = e.clientX;
    d.curY = e.clientY;
}


/***/ }),

/***/ "./src/diagram/geometry/Box.ts":
/*!*************************************!*\
  !*** ./src/diagram/geometry/Box.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boxCenter": () => (/* binding */ boxCenter),
/* harmony export */   "boxEquals": () => (/* binding */ boxEquals),
/* harmony export */   "boxIntersection": () => (/* binding */ boxIntersection)
/* harmony export */ });
/* harmony import */ var _Line__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Line */ "./src/diagram/geometry/Line.ts");

function boxEquals(b1, b2) {
    if (b1 == b2) {
        return true;
    }
    return b1.x === b2.x &&
        b1.y === b2.y &&
        b1.w === b2.w &&
        b1.h === b2.h;
}
function boxCenter(b) {
    return {
        x: b.x + Math.round(b.w / 2),
        y: b.y + Math.round(b.h / 2)
    };
}
function boxToLines(box) {
    const { x, y, w, h } = box;
    return [
        {
            from: { x, y },
            to: { x: x + w, y }
        },
        {
            from: { x: x + w, y },
            to: { x: x + w, y: y + h }
        },
        {
            from: { x: x + w, y: y + h },
            to: { x, y: y + h },
        },
        {
            from: { x, y: y + h },
            to: { x, y },
        },
    ];
}
function boxIntersection(box, line) {
    const lines = boxToLines(box);
    for (let i = 0; i < lines.length; i++) {
        const p = (0,_Line__WEBPACK_IMPORTED_MODULE_0__.lineIntersection)(lines[i], line);
        if (p) {
            return p;
        }
    }
}


/***/ }),

/***/ "./src/diagram/geometry/Line.ts":
/*!**************************************!*\
  !*** ./src/diagram/geometry/Line.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lineIntersection": () => (/* binding */ lineIntersection)
/* harmony export */ });
function lineIntersection(l1, l2) {
    return intersect(l1.from.x, l1.from.y, l1.to.x, l1.to.y, l2.from.x, l2.from.y, l2.to.x, l2.to.y);
}
// line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
// Determine the intersection point of two line segments
// Return undefined if the lines don't intersect
function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    // Check if none of the lines are of length 0
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
        return undefined;
    }
    const denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    // Lines are parallel
    if (denominator === 0) {
        return undefined;
    }
    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;
    // is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
        return undefined;
    }
    // Return a object with the x and y coordinates of the intersection
    let x = x1 + ua * (x2 - x1);
    let y = y1 + ua * (y2 - y1);
    return { x, y };
}


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
/* harmony import */ var _diagram_DgDiagram__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./diagram/DgDiagram */ "./src/diagram/DgDiagram.ts");
/* harmony import */ var _diagram_DgDraggable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./diagram/DgDraggable */ "./src/diagram/DgDraggable.ts");
/* harmony import */ var _diagram_DgLink__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./diagram/DgLink */ "./src/diagram/DgLink.ts");
/* harmony import */ var _diagram_DgNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./diagram/DgNode */ "./src/diagram/DgNode.ts");
/* harmony import */ var _diagram_DgResizeable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./diagram/DgResizeable */ "./src/diagram/DgResizeable.ts");





// just for imports !
// console.log('yalla', CustomerApp.TAG_NAME, VirtualScroller.TAG_NAME, ScrollItem.TAG_NAME, DgDiagram.TAG, DgNode.TAG, DgDraggable.TAG);
console.log(_diagram_DgDiagram__WEBPACK_IMPORTED_MODULE_0__.DgDiagram.TAG, _diagram_DgNode__WEBPACK_IMPORTED_MODULE_3__.DgNode.TAG, _diagram_DgDraggable__WEBPACK_IMPORTED_MODULE_1__.DgDraggable.TAG, _diagram_DgLink__WEBPACK_IMPORTED_MODULE_2__.DgLink.TAG, _diagram_DgResizeable__WEBPACK_IMPORTED_MODULE_4__.DgResizeable.TAG);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMZ0Q7QUFDSTtBQUNWO0FBQ0E7QUFHVTtBQUVwRCxxQkFBcUI7QUFDckIseUlBQXlJO0FBQ3pJLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkRBQWEsRUFBRSx1REFBVSxFQUFFLGlFQUFlLEVBQUUsdURBQVUsRUFBRSxtRUFBZ0IsQ0FBQyxDQUFDO0FBRXRGLHlDQUF5QztBQUN6Qyw4RUFBOEU7QUFDOUUsc0NBQXNDO0FBQ3RDLGlCQUFpQjtBQUNqQixzREFBc0Q7QUFDdEQsc0RBQXNEO0FBQ3RELGlEQUFpRDtBQUNqRCxTQUFTO0FBQ1QsS0FBSyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvU2FmZVBhcnNlSW50LnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvYnVpbGRlci9IdG1sQnVpbGRlci50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2RpYWdyYW0vRGdEaWFncmFtLnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvZGlhZ3JhbS9EZ0RyYWdnYWJsZS50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2RpYWdyYW0vRGdMaW5rLnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvZGlhZ3JhbS9EZ05vZGUudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy9kaWFncmFtL0RnUmVzaXplYWJsZS50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2RpYWdyYW0vTW91c2VEcmFnLnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvZGlhZ3JhbS9nZW9tZXRyeS9Cb3gudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy9kaWFncmFtL2dlb21ldHJ5L0xpbmUudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHNhZmVQYXJzZUludChzOnN0cmluZyB8IG51bGwpOiBudW1iZXIge1xuICAgIGNvbnN0IGkgPSBwYXJzZUludChzKTtcbiAgICBpZiAoaXNOYU4oaSkpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiBpO1xufSIsImV4cG9ydCB0eXBlIERlZXBQYXJ0aWFsPFQ+ID0gUGFydGlhbDx7IFtQIGluIGtleW9mIFRdOiBEZWVwUGFydGlhbDxUW1BdPiB9PjtcblxudHlwZSBOb2RlQnVpbGRlcjxLIGV4dGVuZHMga2V5b2YgSFRNTEVsZW1lbnRUYWdOYW1lTWFwPiA9IChcbiAgYTogRGVlcFBhcnRpYWw8SFRNTEVsZW1lbnRUYWdOYW1lTWFwW0tdPixcbiAgLi4uYzogTm9kZVtdXG4pID0+IEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5vZGU8SyBleHRlbmRzIGtleW9mIEhUTUxFbGVtZW50VGFnTmFtZU1hcD4odGFnOiBLKTogTm9kZUJ1aWxkZXI8Sz4ge1xuICByZXR1cm4gKGE6IERlZXBQYXJ0aWFsPEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXT4sIC4uLmM6IE5vZGVbXSkgPT4ge1xuICAgIGNvbnN0IG46IEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBjLmZvckVhY2goKGNoaWxkKSA9PiBuLmFwcGVuZENoaWxkKGNoaWxkKSk7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGEpIGFzIEFycmF5PGtleW9mIHR5cGVvZiBhPjtcbiAgICBrZXlzLmZvckVhY2goKGspID0+IHNldFByb3BlcnR5KG4sIGssIGdldFByb3BlcnR5KGEsIGspKSk7XG4gICAgcmV0dXJuIG47XG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldFByb3BlcnR5PFQsIEsgZXh0ZW5kcyBrZXlvZiBUPihvOiBULCBrZXk6IEspOiBUW0tdIHtcbiAgcmV0dXJuIG9ba2V5XTtcbn1cblxuZnVuY3Rpb24gc2V0UHJvcGVydHk8VCwgSyBleHRlbmRzIGtleW9mIFQ+KG86IFQsIGtleTogSywgdmFsdWU6IFRbS10pOiB2b2lkIHtcbiAgb1trZXldID0gdmFsdWU7XG59XG5cbmV4cG9ydCBjb25zdCBkaXYgPSBub2RlKCdkaXYnKTtcbmV4cG9ydCBjb25zdCBzcGFuID0gbm9kZSgnc3BhbicpO1xuZXhwb3J0IGNvbnN0IGEgPSBub2RlKCdhJyk7XG5leHBvcnQgY29uc3QgcCA9IG5vZGUoJ3AnKTtcbmV4cG9ydCBjb25zdCBoMSA9IG5vZGUoJ2gxJyk7XG5leHBvcnQgY29uc3QgaW5wdXQgPSBub2RlKCdpbnB1dCcpO1xuZXhwb3J0IGNvbnN0IGxhYmVsID0gbm9kZSgnbGFiZWwnKTtcbmV4cG9ydCBjb25zdCBzbG90ID0gbm9kZSgnc2xvdCcpO1xuZXhwb3J0IGNvbnN0IHN0eWxlID0gbm9kZSgnc3R5bGUnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRleHQoczogc3RyaW5nKTogVGV4dCB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVtcHR5KGU6IE5vZGUpIHtcbiAgd2hpbGUoZS5maXJzdENoaWxkKSB7XG4gICAgZS5yZW1vdmVDaGlsZChlLmZpcnN0Q2hpbGQpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBweChuOiBudW1iZXIpOiBzdHJpbmcge1xuICByZXR1cm4gbiArICdweCc7XG59XG4iLCJpbXBvcnQgeyBkaXYsIHNsb3QsIHN0eWxlLCB0ZXh0IH0gZnJvbSBcIi4uL2J1aWxkZXIvSHRtbEJ1aWxkZXJcIjtcbmltcG9ydCB7IERnTGluayB9IGZyb20gXCIuL0RnTGlua1wiO1xuaW1wb3J0IHsgRGdOb2RlIH0gZnJvbSBcIi4vRGdOb2RlXCI7XG5cbmNvbnN0IFNWR19OUyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG5cbmNvbnN0IGRpYWdTdHlsZXMgPSBgXG4gICAgLmRnLWRpYWdyYW0ge1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB9XG4gICAgLmRnLXNjcm9sbC1wYW5lIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIH1cbiAgICAuZGctbGlua3Mge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgIH1cbiAgICAuZGctY29udGVudC1wYW5lIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmV5O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgfVxuYDtcblxuY29uc3Qgc3ZnRGVmcyA9IGBcbjxtYXJrZXIgaWQ9XCJhcnJvd2hlYWRcIiBtYXJrZXJXaWR0aD1cIjEwXCIgbWFya2VySGVpZ2h0PVwiN1wiIFxucmVmWD1cIjlcIiByZWZZPVwiMy41XCIgb3JpZW50PVwiYXV0b1wiPlxuICAgIDxwb2x5Z29uIHBvaW50cz1cIjAgMCwgMTAgMy41LCAwIDdcIiAvPlxuPC9tYXJrZXI+XG5gXG5cbmV4cG9ydCBjbGFzcyBEZ0RpYWdyYW0gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cbiAgICBzdGF0aWMgVEFHID0gXCJkZy1kaWFncmFtXCJcblxuICAgIHByaXZhdGUgbGlua3NTdmc6IFNWR0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoU1ZHX05TLCAnc3ZnJyk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgY29uc3Qgc2hhZG93ID0gdGhpcy5hdHRhY2hTaGFkb3coe21vZGU6ICdvcGVuJ30pO1xuXG4gICAgICAgIHRoaXMubGlua3NTdmcuY2xhc3NMaXN0LmFkZCgnZGctbGlua3MnKTtcbiAgICAgICAgY29uc3QgZGVmczogU1ZHRGVmc0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoU1ZHX05TLCAnc3ZnJyk7XG4gICAgICAgIGRlZnMuaW5uZXJIVE1MID0gc3ZnRGVmcztcbiAgICAgICAgdGhpcy5saW5rc1N2Zy5hcHBlbmRDaGlsZChkZWZzKTtcbiAgICAgICAgY29uc3QgbGlua3NTbG90OiBIVE1MU2xvdEVsZW1lbnQgPSBzbG90KHsgbmFtZTogXCJsaW5rc1wifSlcbiAgICAgICAgdGhpcy5saW5rc1N2Zy5hcHBlbmRDaGlsZChsaW5rc1Nsb3QpO1xuXG4gICAgICAgIGNvbnN0IHNjcm9sbFBhbmUgPSBkaXYoXG4gICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2RnLXNjcm9sbC1wYW5lJyB9LFxuICAgICAgICAgICAgdGhpcy5saW5rc1N2ZyxcbiAgICAgICAgICAgIHNsb3Qoe30pLFxuICAgICAgICApO1xuXG4gICAgICAgIHNoYWRvdy5hcHBlbmRDaGlsZChzY3JvbGxQYW5lKTtcbiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKHN0eWxlKHt9LCB0ZXh0KGRpYWdTdHlsZXMpKSk7XG4gICAgfVxuXG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgfVxuXG4gICAgZ2V0RGdOb2RlcygpOiBSZWFkb25seUFycmF5PERnTm9kZT4ge1xuICAgICAgICBjb25zdCBxID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsPERnTm9kZT4oRGdOb2RlLlRBRyk7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHEpO1xuICAgIH1cblxuICAgIGdldE5vZGVCeUlkKGlkOiBzdHJpbmcpOiBEZ05vZGUgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREZ05vZGVzKCkuZmluZChuID0+IG4uaWQgPT09IGlkKTtcbiAgICB9XG5cbiAgICBnZXREZ0xpbmtzKCk6IFJlYWRvbmx5QXJyYXk8RGdMaW5rPiB7XG4gICAgICAgIGNvbnN0IHEgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGw8RGdMaW5rPihEZ0xpbmsuVEFHKTtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20ocSk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJMaW5rKGxpbms6IERnTGluaykge1xuICAgICAgICBjb25zdCBsaW5lID0gbGluay5kcmF3TGluayh0aGlzLmdldE5vZGVCeUlkKGxpbmsuZnJvbSksIHRoaXMuZ2V0Tm9kZUJ5SWQobGluay50bykpO1xuICAgICAgICBsaW5lLnNldEF0dHJpYnV0ZShcImZyb21cIiwgbGluay5mcm9tKTtcbiAgICAgICAgbGluZS5zZXRBdHRyaWJ1dGUoXCJ0b1wiLCBsaW5rLnRvKTtcbiAgICAgICAgdGhpcy5saW5rc1N2Zy5hcHBlbmRDaGlsZChsaW5lKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck5vZGUobm9kZTogRGdOb2RlKSB7XG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW92ZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICAvLyB1cGRhdGUgYWxsIGxpbmtzXG4gICAgICAgICAgICB0aGlzLmxpbmtzU3ZnLnF1ZXJ5U2VsZWN0b3JBbGwoXCJsaW5lXCIpXG4gICAgICAgICAgICAgICAgLmZvckVhY2gobGluZSA9PiBsaW5lLnJlbW92ZSgpKTtcbiAgICAgICAgICAgIC8vIGFkZCBuZXdcbiAgICAgICAgICAgIHRoaXMuZ2V0RGdMaW5rcygpXG4gICAgICAgICAgICAgICAgLmZvckVhY2gobCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmUgPSBsLmRyYXdMaW5rKHRoaXMuZ2V0Tm9kZUJ5SWQobC5mcm9tKSwgdGhpcy5nZXROb2RlQnlJZChsLnRvKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlua3NTdmcuYXBwZW5kQ2hpbGQobGluZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRQYXJlbnREZ0RpYWdyYW0oZnJvbTogSFRNTEVsZW1lbnQpOiBEZ0RpYWdyYW0gfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoZnJvbS5wYXJlbnRFbGVtZW50IGluc3RhbmNlb2YgRGdEaWFncmFtKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbS5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIGlmIChmcm9tLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBEZ0RpYWdyYW0uZ2V0UGFyZW50RGdEaWFncmFtKGZyb20ucGFyZW50RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKERnRGlhZ3JhbS5UQUcsIERnRGlhZ3JhbSk7XG4iLCJpbXBvcnQgeyBkaXYsIHNsb3QsIHN0eWxlLCB0ZXh0IH0gZnJvbSBcIi4uL2J1aWxkZXIvSHRtbEJ1aWxkZXJcIjtcbmltcG9ydCB7IERnTm9kZSB9IGZyb20gXCIuL0RnTm9kZVwiO1xuaW1wb3J0IHtkcmFnRGVsdGFzLCBkcmFnVXBkYXRlLCBNb3VzZURyYWcsIG5ld01vdXNlRHJhZ30gZnJvbSBcIi4vTW91c2VEcmFnXCI7XG5cbmludGVyZmFjZSBEcmFnU3RhdGUge1xuICAgIHJlYWRvbmx5IHJlZlg6IG51bWJlcjtcbiAgICByZWFkb25seSByZWZZOiBudW1iZXI7XG4gICAgbW91c2VEcmFnOiBNb3VzZURyYWc7XG5cbn1cblxuZXhwb3J0IGNsYXNzIERnRHJhZ2dhYmxlIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gICAgc3RhdGljIFRBRyA9IFwiZGctZHJhZ2dhYmxlXCI7XG5cbiAgICBwcml2YXRlIGRyYWdTdGF0ZTogRHJhZ1N0YXRlIHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgY29uc3QgbW91c2VNb3ZlID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRyYWdTdGF0ZSkge1xuICAgICAgICAgICAgICAgIGRyYWdVcGRhdGUodGhpcy5kcmFnU3RhdGUubW91c2VEcmFnLCBlKTtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGR4LCBkeSB9ID0gZHJhZ0RlbHRhcyh0aGlzLmRyYWdTdGF0ZS5tb3VzZURyYWcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRnTm9kZSA9IERnTm9kZS5nZXRQYXJlbnREZ05vZGUodGhpcyk7XG4gICAgICAgICAgICAgICAgaWYgKGRnTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBkZ05vZGUueCA9IHRoaXMuZHJhZ1N0YXRlLnJlZlggKyBkeDtcbiAgICAgICAgICAgICAgICAgICAgZGdOb2RlLnkgPSB0aGlzLmRyYWdTdGF0ZS5yZWZZICsgZHk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbW91c2VVcCA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZU1vdmUpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNlVXApO1xuICAgICAgICAgICAgdGhpcy5kcmFnU3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGUgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBjbGllbnRYLCBjbGllbnRZIH0gPSBlO1xuICAgICAgICAgICAgY29uc3QgZGdOb2RlID0gRGdOb2RlLmdldFBhcmVudERnTm9kZSh0aGlzKTtcbiAgICAgICAgICAgIGlmIChkZ05vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbW91c2VEcmFnOiBuZXdNb3VzZURyYWcoZSksXG4gICAgICAgICAgICAgICAgICAgIHJlZlg6IGRnTm9kZS54LFxuICAgICAgICAgICAgICAgICAgICByZWZZOiBkZ05vZGUueSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlTW92ZSk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNlVXApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShEZ0RyYWdnYWJsZS5UQUcsIERnRHJhZ2dhYmxlKTtcbiIsImltcG9ydCB7IGVtcHR5LCBub2RlIH0gZnJvbSBcIi4uL2J1aWxkZXIvSHRtbEJ1aWxkZXJcIjtcbmltcG9ydCB7IGJveENlbnRlciwgYm94SW50ZXJzZWN0aW9uIH0gZnJvbSBcIi4vZ2VvbWV0cnkvQm94XCI7XG5pbXBvcnQgeyBEZ0RpYWdyYW0gfSBmcm9tIFwiLi9EZ0RpYWdyYW1cIjtcbmltcG9ydCB7IERnTm9kZSB9IGZyb20gXCIuL0RnTm9kZVwiO1xuaW1wb3J0IHsgTGluZSwgbGluZUludGVyc2VjdGlvbiB9IGZyb20gXCIuL2dlb21ldHJ5L0xpbmVcIjtcblxuY29uc3QgU1ZHX05TID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcblxuZXhwb3J0IGNsYXNzIERnTGluayBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICAgIHN0YXRpYyBUQUcgPSAnZGctbGluayc7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICBEZ0RpYWdyYW0uZ2V0UGFyZW50RGdEaWFncmFtKHRoaXMpLnJlZ2lzdGVyTGluayh0aGlzKTtcbiAgICB9XG5cbiAgICBkcmF3TGluayhmcm9tTm9kZTogRGdOb2RlLCB0b05vZGU6IERnTm9kZSk6IFNWR0xpbmVFbGVtZW50IHtcbiAgICAgICAgY29uc3QgZnJvbUJveCA9IGZyb21Ob2RlLmdldEJveCgpO1xuICAgICAgICBjb25zdCB0b0JveCA9IHRvTm9kZS5nZXRCb3goKTtcbiAgICAgICAgY29uc3QgY2VudGVyMSA9IGJveENlbnRlcihmcm9tQm94KTtcbiAgICAgICAgY29uc3QgY2VudGVyMiA9IGJveENlbnRlcih0b0JveCk7XG5cbiAgICAgICAgY29uc3QgbGluZTogTGluZSA9IHtcbiAgICAgICAgICAgIGZyb206IGNlbnRlcjEsXG4gICAgICAgICAgICB0bzogY2VudGVyMixcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpc2VjdDEgPSBib3hJbnRlcnNlY3Rpb24oZnJvbUJveCwgbGluZSk7XG4gICAgICAgIGNvbnN0IGlzZWN0MiA9IGJveEludGVyc2VjdGlvbih0b0JveCwgbGluZSk7XG5cbiAgICAgICAgY29uc3QgZnJvbVBvaW50ID0gaXNlY3QxIHx8IGNlbnRlcjE7XG4gICAgICAgIGNvbnN0IHRvUG9pbnQgPSBpc2VjdDIgfHwgY2VudGVyMjtcblxuICAgICAgICBjb25zdCBzdmdMaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFNWR19OUywgJ2xpbmUnKTtcbiAgICAgICAgc3ZnTGluZS5zZXRBdHRyaWJ1dGUoJ3gxJywgZnJvbVBvaW50LngudG9TdHJpbmcoKSk7XG4gICAgICAgIHN2Z0xpbmUuc2V0QXR0cmlidXRlKCd4MicsIHRvUG9pbnQueC50b1N0cmluZygpKTtcbiAgICAgICAgc3ZnTGluZS5zZXRBdHRyaWJ1dGUoJ3kxJywgZnJvbVBvaW50LnkudG9TdHJpbmcoKSk7XG4gICAgICAgIHN2Z0xpbmUuc2V0QXR0cmlidXRlKCd5MicsIHRvUG9pbnQueS50b1N0cmluZygpKTtcbiAgICAgICAgc3ZnTGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICdibGFjaycpO1xuICAgICAgICBzdmdMaW5lLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgJzInKTtcbiAgICAgICAgc3ZnTGluZS5zZXRBdHRyaWJ1dGUoJ21hcmtlci1lbmQnLCAndXJsKCNhcnJvd2hlYWQpJyk7XG5cbiAgICAgICAgcmV0dXJuIHN2Z0xpbmU7XG4gICAgfVxuXG4gICAgZ2V0IGZyb20oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdmcm9tJyk7XG4gICAgfVxuXG4gICAgZ2V0IHRvKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndG8nKTtcbiAgICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShEZ0xpbmsuVEFHLCBEZ0xpbmspXG4iLCJpbXBvcnQgeyBkaXYsIHNsb3QsIHN0eWxlLCB0ZXh0IH0gZnJvbSBcIi4uL2J1aWxkZXIvSHRtbEJ1aWxkZXJcIjtcbmltcG9ydCB7IHNhZmVQYXJzZUludCB9IGZyb20gXCIuLi9TYWZlUGFyc2VJbnRcIjtcbmltcG9ydCB7IEJveCwgYm94RXF1YWxzIH0gZnJvbSBcIi4vZ2VvbWV0cnkvQm94XCI7XG5pbXBvcnQgeyBEZ0RpYWdyYW0gfSBmcm9tIFwiLi9EZ0RpYWdyYW1cIjtcblxuY29uc3QgY3NzID0gYFxuICAgIC5kZy1ub2RlIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBkaXNwbGF5OiBmbGV4OyAgIFxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuOyAgICBcbiAgICB9XG5gO1xuXG5leHBvcnQgY2xhc3MgRGdOb2RlIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gICAgc3RhdGljIFRBRyA9IFwiZGctbm9kZVwiO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBkZ05vZGU6IEhUTUxEaXZFbGVtZW50O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZGdTbG90OiBIVE1MU2xvdEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBtb3VzZURvd25Cb3g6IEJveCB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBjb25zdCBzaGFkb3cgPSB0aGlzLmF0dGFjaFNoYWRvdyh7bW9kZTonb3Blbid9KTtcbiAgICAgICAgdGhpcy5kZ1Nsb3QgPSBzbG90KHt9KTtcbiAgICAgICAgdGhpcy5kZ05vZGUgPSBkaXYoe2NsYXNzTmFtZTogJ2RnLW5vZGUnfSwgdGhpcy5kZ1Nsb3QpO1xuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQodGhpcy5kZ05vZGUpO1xuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQoc3R5bGUoe30sIHRleHQoY3NzKSkpO1xuICAgIH1cblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICBjb25zdCBzID0gdGhpcy5kZ05vZGUuc3R5bGU7XG4gICAgICAgIHMubGVmdCA9IHRoaXMueCArIFwicHhcIjtcbiAgICAgICAgcy50b3AgPSB0aGlzLnkgKyBcInB4XCI7XG4gICAgICAgIHMud2lkdGggPSB0aGlzLncgKyBcInB4XCI7XG4gICAgICAgIHMuaGVpZ2h0ID0gdGhpcy5oICsgXCJweFwiO1xuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubW91c2VEb3duQm94ID0gdGhpcy5nZXRCb3goKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1vdXNlRG93bkJveCkge1xuICAgICAgICAgICAgICAgIGlmIChib3hFcXVhbHModGhpcy5nZXRCb3goKSwgdGhpcy5tb3VzZURvd25Cb3gpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAhdGhpcy5zZWxlY3RlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1vdXNlRG93bkJveCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZ2V0RGdEaWFncmFtKCkucmVnaXN0ZXJOb2RlKHRoaXMpO1xuICAgIH1cblxuICAgIGdldEJveCgpOiBCb3gge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogdGhpcy54LFxuICAgICAgICAgICAgeTogdGhpcy55LFxuICAgICAgICAgICAgdzogdGhpcy53LFxuICAgICAgICAgICAgaDogdGhpcy5oLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIHJldHVybiBbJ3gnLCAneScsICdoJywgJ3cnXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZpcmVNb3ZlZCgpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KFxuICAgICAgICAgICAgICAgICdtb3ZlZCcsXG4gICAgICAgICAgICAgICAgeyBkZXRhaWw6IHRoaXMgfVxuICAgICAgICAgICAgKVxuICAgICAgICApXG4gICAgfVxuXG4gICAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWU6IHN0cmluZywgb2xkVmFsdWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBzID0gdGhpcy5kZ05vZGUuc3R5bGU7XG4gICAgICAgIGlmIChvbGRWYWx1ZSA9PT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3gnOiB7XG4gICAgICAgICAgICAgICAgcy5sZWZ0ID0gdGhpcy54ICsgJ3B4JztcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmVNb3ZlZCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAneSc6IHtcbiAgICAgICAgICAgICAgICBzLnRvcCA9IHRoaXMueSArICdweCc7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlTW92ZWQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ3cnOiB7XG4gICAgICAgICAgICAgICAgcy53aWR0aCA9IHRoaXMudyArICdweCc7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlTW92ZWQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ2gnOiB7XG4gICAgICAgICAgICAgICAgcy5oZWlnaHQgPSB0aGlzLmggKyAncHgnO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZU1vdmVkKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICB9XG5cbiAgICBnZXQgeCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc2FmZVBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCd4JykpO1xuICAgIH1cblxuICAgIHNldCB4KHg6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgneCcsIHgudG9TdHJpbmcoKSk7XG4gICAgICAgIHRoaXMuZGdOb2RlLnN0eWxlLmxlZnQgPSB4ICsgJ3B4JztcbiAgICB9XG5cbiAgICBnZXQgeSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc2FmZVBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCd5JykpO1xuICAgIH1cblxuICAgIHNldCB5KHk6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgneScsIHkudG9TdHJpbmcoKSk7XG4gICAgICAgIHRoaXMuZGdOb2RlLnN0eWxlLnRvcCA9IHkgKyAncHgnO1xuICAgIH1cblxuICAgIGdldCBoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ2gnKSk7XG4gICAgfVxuXG4gICAgc2V0IGgoaDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdoJywgaC50b1N0cmluZygpKTtcbiAgICAgICAgdGhpcy5kZ05vZGUuc3R5bGUuaGVpZ2h0ID0gaCArICdweCc7XG4gICAgfVxuXG4gICAgZ2V0IHcoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNhZmVQYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgndycpKTtcbiAgICB9XG5cbiAgICBzZXQgdyh3OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3cnLCB3LnRvU3RyaW5nKCkpO1xuICAgICAgICB0aGlzLmRnTm9kZS5zdHlsZS53aWR0aCA9IHcgKyAncHgnO1xuICAgIH1cblxuICAgIGdldCBzZWxlY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdzZWxlY3RlZCcpO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RlZChzOiBib29sZWFuKSB7XG4gICAgICAgIGlmIChzKSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldERnRGlhZ3JhbSgpOiBEZ0RpYWdyYW0gfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gRGdEaWFncmFtLmdldFBhcmVudERnRGlhZ3JhbSh0aGlzKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0UGFyZW50RGdOb2RlKGZyb206IEhUTUxFbGVtZW50KTogRGdOb2RlIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKGZyb20ucGFyZW50RWxlbWVudCBpbnN0YW5jZW9mIERnTm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZyb20ucGFyZW50RWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZnJvbS5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gRGdOb2RlLmdldFBhcmVudERnTm9kZShmcm9tLnBhcmVudEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG5cblxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRGdOb2RlLlRBRywgRGdOb2RlKTtcbiIsImltcG9ydCB7c2FmZVBhcnNlSW50fSBmcm9tIFwiLi4vU2FmZVBhcnNlSW50XCI7XG5pbXBvcnQge0RnTm9kZX0gZnJvbSBcIi4vRGdOb2RlXCI7XG5pbXBvcnQge2RpdiwgZW1wdHksIHB4LCBzbG90LCBzdHlsZSwgdGV4dH0gZnJvbSBcIi4uL2J1aWxkZXIvSHRtbEJ1aWxkZXJcIjtcbmltcG9ydCB7ZHJhZ0RlbHRhcywgZHJhZ1VwZGF0ZSwgTW91c2VEcmFnLCBuZXdNb3VzZURyYWd9IGZyb20gXCIuL01vdXNlRHJhZ1wiO1xuXG50eXBlIERyYWdNb2RlID1cbiAgICB8ICd0b3AnXG4gICAgfCAnYm90dG9tJ1xuICAgIHwgJ2xlZnQnXG4gICAgfCAncmlnaHQnXG4gICAgfCAndG9wLWxlZnQnXG4gICAgfCAndG9wLXJpZ2h0J1xuICAgIHwgJ2JvdHRvbS1sZWZ0J1xuICAgIHwgJ2JvdHRvbS1yaWdodCdcblxuaW50ZXJmYWNlIFJlc2l6ZVN0YXRlIHtcbiAgICByZWFkb25seSByZWZYOiBudW1iZXI7XG4gICAgcmVhZG9ubHkgcmVmWTogbnVtYmVyO1xuICAgIHJlYWRvbmx5IHJlZlc6IG51bWJlcjtcbiAgICByZWFkb25seSByZWZIOiBudW1iZXI7XG4gICAgcmVhZG9ubHkgbW9kZTogRHJhZ01vZGU7XG4gICAgbW91c2VEcmFnOiBNb3VzZURyYWc7XG59XG5cbmNvbnN0IE1JTl9TSVpFID0gMTA7XG5cbmV4cG9ydCBjbGFzcyBEZ1Jlc2l6ZWFibGUgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cbiAgICBzdGF0aWMgVEFHID0gJ2RnLXJlc2l6ZWFibGUnO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBzaGFkb3c6IFNoYWRvd1Jvb3Q7XG4gICAgcHJpdmF0ZSByZWFkb25seSByZUVsZW1zOiBSZWFkb25seUFycmF5PEhUTUxEaXZFbGVtZW50PjtcblxuICAgIHByaXZhdGUgZHJhZ1N0YXRlOiBSZXNpemVTdGF0ZSB8IHVuZGVmaW5lZDtcblxuICAgIHByaXZhdGUgZG9jTW91c2VNb3ZlID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ1N0YXRlKSB7XG4gICAgICAgICAgICBjb25zdCBkZ05vZGUgPSBEZ05vZGUuZ2V0UGFyZW50RGdOb2RlKHRoaXMpO1xuICAgICAgICAgICAgaWYgKGRnTm9kZSkge1xuICAgICAgICAgICAgICAgIGRyYWdVcGRhdGUodGhpcy5kcmFnU3RhdGUubW91c2VEcmFnLCBlKTtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGR4LCBkeSB9ID0gZHJhZ0RlbHRhcyh0aGlzLmRyYWdTdGF0ZS5tb3VzZURyYWcpO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5kcmFnU3RhdGUubW9kZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidG9wXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgcmVmWSwgcmVmSCB9ID0gdGhpcy5kcmFnU3RhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdZID0gcmVmWSArIGR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3SCA9IHJlZkggLSBkeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdIIDwgTUlOX1NJWkUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBkZ05vZGUueSA9IG5ld1k7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZ05vZGUuaCA9IG5ld0g7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYm90dG9tXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgcmVmSCB9ID0gdGhpcy5kcmFnU3RhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdIID0gcmVmSCArIGR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0ggPCBNSU5fU0laRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRnTm9kZS5oID0gbmV3SDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJsZWZ0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgcmVmWCwgcmVmVyB9ID0gdGhpcy5kcmFnU3RhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdYID0gcmVmWCArIGR4O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3VyA9IHJlZlcgLSBkeDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdXIDwgTUlOX1NJWkUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBkZ05vZGUueCA9IG5ld1g7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZ05vZGUudyA9IG5ld1c7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwicmlnaHRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyByZWZXIH0gPSB0aGlzLmRyYWdTdGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1cgPSByZWZXICsgZHg7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3VyA8IE1JTl9TSVpFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGdOb2RlLncgPSBuZXdXO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRvcC1sZWZ0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgcmVmWCwgcmVmVywgcmVmWSwgcmVmSCB9ID0gdGhpcy5kcmFnU3RhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3WSA9IHJlZlkgKyBkeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdIID0gcmVmSCAtIGR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0ggPCBNSU5fU0laRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0ggPSBNSU5fU0laRTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWx0YUggPSBuZXdIIC0gcmVmSDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdZID0gcmVmWSAtIGRlbHRhSDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdYID0gcmVmWCArIGR4O1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1cgPSByZWZXIC0gZHg7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3VyA8IE1JTl9TSVpFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VyA9IE1JTl9TSVpFO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlbHRhVyA9IG5ld1cgLSByZWZXO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ggPSByZWZYIC0gZGVsdGFXO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGdOb2RlLnkgPSBuZXdZO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGdOb2RlLmggPSBuZXdIO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGdOb2RlLnggPSBuZXdYO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGdOb2RlLncgPSBuZXdXO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyBvdGhlciByZXNpemUgbW9kZXMuLi5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRvY01vdXNlVXAgPSAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuZG9jTW91c2VNb3ZlKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuZG9jTW91c2VVcCk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc2hhZG93ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgICAgIHRoaXMuc2hhZG93LmFwcGVuZENoaWxkKHNsb3Qoe30pKTtcblxuICAgICAgICBjb25zdCByZVRvcCA9IGRpdih7IGNsYXNzTmFtZTogJ2RnLXJlc2l6ZS1lbGVtICd9KTtcbiAgICAgICAgcmVUb3Auc3R5bGUudG9wID0gXCIwXCI7XG4gICAgICAgIHJlVG9wLnN0eWxlLmxlZnQgPSBcIjJweFwiO1xuICAgICAgICByZVRvcC5zdHlsZS5yaWdodCA9IFwiMnB4XCI7XG4gICAgICAgIHJlVG9wLnN0eWxlLmhlaWdodCA9IFwiMnB4XCI7XG4gICAgICAgIHJlVG9wLnN0eWxlLmN1cnNvciA9IFwibnMtcmVzaXplXCI7XG4gICAgICAgIHJlVG9wLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25SZU1vdXNlRG93bigndG9wJykpO1xuXG4gICAgICAgIGNvbnN0IHJlQm90dG9tID0gZGl2KHsgY2xhc3NOYW1lOiAnZGctcmVzaXplLWVsZW0gJ30pO1xuICAgICAgICByZUJvdHRvbS5zdHlsZS5ib3R0b20gPSBcIjBcIjtcbiAgICAgICAgcmVCb3R0b20uc3R5bGUubGVmdCA9IFwiMnB4XCI7XG4gICAgICAgIHJlQm90dG9tLnN0eWxlLnJpZ2h0ID0gXCIycHhcIjtcbiAgICAgICAgcmVCb3R0b20uc3R5bGUuaGVpZ2h0ID0gXCIycHhcIjtcbiAgICAgICAgcmVCb3R0b20uc3R5bGUuY3Vyc29yID0gXCJucy1yZXNpemVcIjtcbiAgICAgICAgcmVCb3R0b20uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vblJlTW91c2VEb3duKCdib3R0b20nKSk7XG5cbiAgICAgICAgY29uc3QgcmVMZWZ0ID0gZGl2KHsgY2xhc3NOYW1lOiAnZGctcmVzaXplLWVsZW0gJ30pO1xuICAgICAgICByZUxlZnQuc3R5bGUudG9wID0gXCIycHhcIjtcbiAgICAgICAgcmVMZWZ0LnN0eWxlLmJvdHRvbSA9IFwiMnB4XCI7XG4gICAgICAgIHJlTGVmdC5zdHlsZS5sZWZ0ID0gXCIwXCI7XG4gICAgICAgIHJlTGVmdC5zdHlsZS53aWR0aCA9IFwiMnB4XCI7XG4gICAgICAgIHJlTGVmdC5zdHlsZS5jdXJzb3IgPSBcImV3LXJlc2l6ZVwiO1xuICAgICAgICByZUxlZnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vblJlTW91c2VEb3duKCdsZWZ0JykpO1xuXG4gICAgICAgIGNvbnN0IHJlUmlnaHQgPSBkaXYoeyBjbGFzc05hbWU6ICdkZy1yZXNpemUtZWxlbSAnfSk7XG4gICAgICAgIHJlUmlnaHQuc3R5bGUudG9wID0gXCIycHhcIjtcbiAgICAgICAgcmVSaWdodC5zdHlsZS5ib3R0b20gPSBcIjJweFwiO1xuICAgICAgICByZVJpZ2h0LnN0eWxlLnJpZ2h0ID0gXCIwXCI7XG4gICAgICAgIHJlUmlnaHQuc3R5bGUud2lkdGggPSBcIjJweFwiO1xuICAgICAgICByZVJpZ2h0LnN0eWxlLmN1cnNvciA9IFwiZXctcmVzaXplXCI7XG4gICAgICAgIHJlUmlnaHQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vblJlTW91c2VEb3duKCdyaWdodCcpKTtcblxuICAgICAgICBjb25zdCByZVRvcExlZnQgPSBkaXYoeyBjbGFzc05hbWU6ICdkZy1yZXNpemUtZWxlbSAnfSk7XG4gICAgICAgIHJlVG9wTGVmdC5zdHlsZS50b3AgPSBcIjBcIjtcbiAgICAgICAgcmVUb3BMZWZ0LnN0eWxlLmxlZnQgPSBcIjBcIjtcbiAgICAgICAgcmVUb3BMZWZ0LnN0eWxlLndpZHRoID0gXCIycHhcIjtcbiAgICAgICAgcmVUb3BMZWZ0LnN0eWxlLmhlaWdodCA9IFwiMnB4XCI7XG4gICAgICAgIHJlVG9wTGVmdC5zdHlsZS5jdXJzb3IgPSBcIm53c2UtcmVzaXplXCI7XG4gICAgICAgIHJlVG9wTGVmdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uUmVNb3VzZURvd24oJ3RvcC1sZWZ0JykpO1xuXG4gICAgICAgIGNvbnN0IHJlVG9wUmlnaHQgPSBkaXYoeyBjbGFzc05hbWU6ICdkZy1yZXNpemUtZWxlbSAnfSk7XG4gICAgICAgIHJlVG9wUmlnaHQuc3R5bGUudG9wID0gXCIwXCI7XG4gICAgICAgIHJlVG9wUmlnaHQuc3R5bGUucmlnaHQgPSBcIjBcIjtcbiAgICAgICAgcmVUb3BSaWdodC5zdHlsZS53aWR0aCA9IFwiMnB4XCI7XG4gICAgICAgIHJlVG9wUmlnaHQuc3R5bGUuaGVpZ2h0ID0gXCIycHhcIjtcbiAgICAgICAgcmVUb3BSaWdodC5zdHlsZS5jdXJzb3IgPSBcIm5lc3ctcmVzaXplXCI7XG4gICAgICAgIHJlVG9wUmlnaHQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vblJlTW91c2VEb3duKCd0b3AtcmlnaHQnKSk7XG5cbiAgICAgICAgY29uc3QgcmVCb3R0b21MZWZ0ID0gZGl2KHsgY2xhc3NOYW1lOiAnZGctcmVzaXplLWVsZW0gJ30pO1xuICAgICAgICByZUJvdHRvbUxlZnQuc3R5bGUuYm90dG9tID0gXCIwXCI7XG4gICAgICAgIHJlQm90dG9tTGVmdC5zdHlsZS5sZWZ0ID0gXCIwXCI7XG4gICAgICAgIHJlQm90dG9tTGVmdC5zdHlsZS53aWR0aCA9IFwiMnB4XCI7XG4gICAgICAgIHJlQm90dG9tTGVmdC5zdHlsZS5oZWlnaHQgPSBcIjJweFwiO1xuICAgICAgICByZUJvdHRvbUxlZnQuc3R5bGUuY3Vyc29yID0gXCJuZXN3LXJlc2l6ZVwiO1xuICAgICAgICByZUJvdHRvbUxlZnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vblJlTW91c2VEb3duKCdib3R0b20tbGVmdCcpKTtcblxuICAgICAgICBjb25zdCByZUJvdHRvbVJpZ2h0ID0gZGl2KHsgY2xhc3NOYW1lOiAnZGctcmVzaXplLWVsZW0gJ30pO1xuICAgICAgICByZUJvdHRvbVJpZ2h0LnN0eWxlLmJvdHRvbSA9IFwiMFwiO1xuICAgICAgICByZUJvdHRvbVJpZ2h0LnN0eWxlLnJpZ2h0ID0gXCIwXCI7XG4gICAgICAgIHJlQm90dG9tUmlnaHQuc3R5bGUud2lkdGggPSBcIjJweFwiO1xuICAgICAgICByZUJvdHRvbVJpZ2h0LnN0eWxlLmhlaWdodCA9IFwiMnB4XCI7XG4gICAgICAgIHJlQm90dG9tUmlnaHQuc3R5bGUuY3Vyc29yID0gXCJud3NlLXJlc2l6ZVwiO1xuICAgICAgICByZUJvdHRvbVJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25SZU1vdXNlRG93bignYm90dG9tLXJpZ2h0JykpO1xuXG4gICAgICAgIHRoaXMucmVFbGVtcyA9IFtcbiAgICAgICAgICAgIHJlVG9wTGVmdCxcbiAgICAgICAgICAgIHJlVG9wLFxuICAgICAgICAgICAgcmVUb3BSaWdodCxcbiAgICAgICAgICAgIHJlUmlnaHQsXG4gICAgICAgICAgICByZUJvdHRvbVJpZ2h0LFxuICAgICAgICAgICAgcmVCb3R0b20sXG4gICAgICAgICAgICByZUJvdHRvbUxlZnQsXG4gICAgICAgICAgICByZUxlZnRcbiAgICAgICAgXVxuXG4gICAgICAgIHRoaXMuc2hhZG93LmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgc3R5bGUoXG4gICAgICAgICAgICAgICAge30sXG4gICAgICAgICAgICAgICAgdGV4dChgXG4gICAgICAgICAgICAgICAgICAgIC5kZy1yZXNpemUtZWxlbSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7ICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBgKSlcbiAgICAgICAgKVxuXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+XG4gICAgICAgICAgICB0aGlzLmFkZFJlc2l6ZUVsZW1zKClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT5cbiAgICAgICAgICAgIHRoaXMucmVtb3ZlUmVzaXplRWxlbXMoKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25SZU1vdXNlRG93bihtb2RlOiBEcmFnTW9kZSk6IChlOk1vdXNlRXZlbnQpID0+IHZvaWQge1xuICAgICAgICByZXR1cm4gZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkZ05vZGUgPSBEZ05vZGUuZ2V0UGFyZW50RGdOb2RlKHRoaXMpO1xuICAgICAgICAgICAgaWYgKGRnTm9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ1N0YXRlID0ge1xuICAgICAgICAgICAgICAgICAgICBtb3VzZURyYWc6IG5ld01vdXNlRHJhZyhlKSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZSxcbiAgICAgICAgICAgICAgICAgICAgcmVmVzogZGdOb2RlLncsXG4gICAgICAgICAgICAgICAgICAgIHJlZkg6IGRnTm9kZS5oLFxuICAgICAgICAgICAgICAgICAgICByZWZYOiBkZ05vZGUueCxcbiAgICAgICAgICAgICAgICAgICAgcmVmWTogZGdOb2RlLnksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmRvY01vdXNlTW92ZSk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuZG9jTW91c2VVcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFJlc2l6ZUVsZW1zKCkge1xuICAgICAgICB0aGlzLnJlRWxlbXMuZm9yRWFjaChlID0+IHRoaXMuc2hhZG93LmFwcGVuZENoaWxkKGUpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZVJlc2l6ZUVsZW1zKCkge1xuICAgICAgICB0aGlzLnJlRWxlbXMuZm9yRWFjaChlID0+IHRoaXMuc2hhZG93LnJlbW92ZUNoaWxkKGUpKTtcbiAgICB9XG5cbiAgICBnZXQgaGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpKTtcbiAgICB9XG5cbiAgICBzZXQgaGVpZ2h0KGhlaWdodDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBoZWlnaHQudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgZ2V0IHdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpKTtcbiAgICB9XG5cbiAgICBzZXQgd2lkdGgod2lkdGg6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3aWR0aC50b1N0cmluZygpKTtcbiAgICB9XG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKERnUmVzaXplYWJsZS5UQUcsIERnUmVzaXplYWJsZSk7XG4iLCJleHBvcnQgaW50ZXJmYWNlIE1vdXNlRHJhZyB7XG4gICAgcmVhZG9ubHkgZG93blg6IG51bWJlcjtcbiAgICByZWFkb25seSBkb3duWTogbnVtYmVyO1xuICAgIGN1clg6IG51bWJlcjtcbiAgICBjdXJZOiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdNb3VzZURyYWcoZTogTW91c2VFdmVudCk6IE1vdXNlRHJhZyB7XG4gICAgY29uc3QgeyBjbGllbnRYLCBjbGllbnRZIH0gPSBlO1xuICAgIHJldHVybiB7XG4gICAgICAgIGRvd25YOiBjbGllbnRYLFxuICAgICAgICBkb3duWTogY2xpZW50WSxcbiAgICAgICAgY3VyWDogY2xpZW50WCxcbiAgICAgICAgY3VyWTogY2xpZW50WSxcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkcmFnRGVsdGFzKGQ6IE1vdXNlRHJhZyk6IHsgZHg6IG51bWJlciwgZHk6IG51bWJlciB9IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBkeDogZC5jdXJYIC0gZC5kb3duWCxcbiAgICAgICAgZHk6IGQuY3VyWSAtIGQuZG93blksXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZHJhZ1VwZGF0ZShkOiBNb3VzZURyYWcsIGU6IE1vdXNlRXZlbnQpIHtcbiAgICBkLmN1clggPSBlLmNsaWVudFg7XG4gICAgZC5jdXJZID0gZS5jbGllbnRZO1xufVxuXG4iLCJpbXBvcnQgeyBMaW5lLCBsaW5lSW50ZXJzZWN0aW9uIH0gZnJvbSBcIi4vTGluZVwiO1xuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi9Qb2ludFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJveCB7XG4gICAgcmVhZG9ubHkgeDogbnVtYmVyO1xuICAgIHJlYWRvbmx5IHk6IG51bWJlcjtcbiAgICByZWFkb25seSB3OiBudW1iZXI7XG4gICAgcmVhZG9ubHkgaDogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYm94RXF1YWxzKGIxOiBCb3gsIGIyOiBCb3gpOiBib29sZWFuIHtcbiAgICBpZiAoYjEgPT0gYjIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBiMS54ID09PSBiMi54ICYmXG4gICAgICAgIGIxLnkgPT09IGIyLnkgJiZcbiAgICAgICAgYjEudyA9PT0gYjIudyAmJlxuICAgICAgICBiMS5oID09PSBiMi5oO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYm94Q2VudGVyKGI6IEJveCk6IFBvaW50IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiBiLnggKyBNYXRoLnJvdW5kKGIudyAvIDIpLFxuICAgICAgICB5OiBiLnkgKyBNYXRoLnJvdW5kKGIuaCAvIDIpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBib3hUb0xpbmVzKGJveDogQm94KTogUmVhZG9ubHlBcnJheTxMaW5lPiB7XG4gICAgY29uc3QgeyB4LCB5ICwgdywgaCB9ID0gYm94O1xuICAgIHJldHVybiBbXG4gICAgICAgIHsgXG4gICAgICAgICAgICBmcm9tOiB7IHgsIHkgfSxcbiAgICAgICAgICAgIHRvOiB7IHg6IHggKyB3LCB5fVxuICAgICAgICB9LFxuICAgICAgICB7IFxuICAgICAgICAgICAgZnJvbTogeyB4OiB4ICsgdywgeX0sXG4gICAgICAgICAgICB0bzogeyB4OiB4ICsgdywgeTogeSArIGggfVxuICAgICAgICB9LFxuICAgICAgICB7IFxuICAgICAgICAgICAgZnJvbTogeyB4OiB4ICsgdywgeTogeSArIGggfSxcbiAgICAgICAgICAgIHRvOiB7IHgsIHk6IHkgKyBoIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHsgXG4gICAgICAgICAgICBmcm9tOiB7IHgsIHk6IHkgKyBoIH0sXG4gICAgICAgICAgICB0bzogeyB4LCB5IH0sXG4gICAgICAgIH0sXG4gICAgXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYm94SW50ZXJzZWN0aW9uKGJveDogQm94LCBsaW5lOiBMaW5lKTogUG9pbnQgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGxpbmVzID0gYm94VG9MaW5lcyhib3gpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHAgPSBsaW5lSW50ZXJzZWN0aW9uKGxpbmVzW2ldLCBsaW5lKTtcbiAgICAgICAgaWYgKHApIHtcbiAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4vUG9pbnRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBMaW5lIHtcbiAgICByZWFkb25seSBmcm9tOiBQb2ludDtcbiAgICByZWFkb25seSB0bzogUG9pbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5lSW50ZXJzZWN0aW9uKGwxOiBMaW5lLCBsMjogTGluZSk6IFBvaW50IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gaW50ZXJzZWN0KGwxLmZyb20ueCwgbDEuZnJvbS55LCBsMS50by54LCBsMS50by55LCBsMi5mcm9tLngsIGwyLmZyb20ueSwgbDIudG8ueCwgbDIudG8ueSk7XG59XG5cbi8vIGxpbmUgaW50ZXJjZXB0IG1hdGggYnkgUGF1bCBCb3Vya2UgaHR0cDovL3BhdWxib3Vya2UubmV0L2dlb21ldHJ5L3BvaW50bGluZXBsYW5lL1xuLy8gRGV0ZXJtaW5lIHRoZSBpbnRlcnNlY3Rpb24gcG9pbnQgb2YgdHdvIGxpbmUgc2VnbWVudHNcbi8vIFJldHVybiB1bmRlZmluZWQgaWYgdGhlIGxpbmVzIGRvbid0IGludGVyc2VjdFxuZnVuY3Rpb24gaW50ZXJzZWN0KHgxOiBudW1iZXIsIHkxOiBudW1iZXIsIHgyOiBudW1iZXIsIHkyOiBudW1iZXIsIHgzOiBudW1iZXIsIHkzOiBudW1iZXIsIHg0OiBudW1iZXIsIHk0OiBudW1iZXIpOiBQb2ludCB8IHVuZGVmaW5lZCB7XG5cbiAgICAvLyBDaGVjayBpZiBub25lIG9mIHRoZSBsaW5lcyBhcmUgb2YgbGVuZ3RoIDBcbiAgICAgIGlmICgoeDEgPT09IHgyICYmIHkxID09PSB5MikgfHwgKHgzID09PSB4NCAmJiB5MyA9PT0geTQpKSB7XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgXG4gICAgICBjb25zdCBkZW5vbWluYXRvciA9ICgoeTQgLSB5MykgKiAoeDIgLSB4MSkgLSAoeDQgLSB4MykgKiAoeTIgLSB5MSkpXG4gIFxuICAgIC8vIExpbmVzIGFyZSBwYXJhbGxlbFxuICAgICAgaWYgKGRlbm9taW5hdG9yID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgXG4gICAgICBsZXQgdWEgPSAoKHg0IC0geDMpICogKHkxIC0geTMpIC0gKHk0IC0geTMpICogKHgxIC0geDMpKSAvIGRlbm9taW5hdG9yXG4gICAgICBsZXQgdWIgPSAoKHgyIC0geDEpICogKHkxIC0geTMpIC0gKHkyIC0geTEpICogKHgxIC0geDMpKSAvIGRlbm9taW5hdG9yXG4gIFxuICAgIC8vIGlzIHRoZSBpbnRlcnNlY3Rpb24gYWxvbmcgdGhlIHNlZ21lbnRzXG4gICAgICBpZiAodWEgPCAwIHx8IHVhID4gMSB8fCB1YiA8IDAgfHwgdWIgPiAxKSB7XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgfVxuICBcbiAgICAvLyBSZXR1cm4gYSBvYmplY3Qgd2l0aCB0aGUgeCBhbmQgeSBjb29yZGluYXRlcyBvZiB0aGUgaW50ZXJzZWN0aW9uXG4gICAgICBsZXQgeCA9IHgxICsgdWEgKiAoeDIgLSB4MSlcbiAgICAgIGxldCB5ID0geTEgKyB1YSAqICh5MiAtIHkxKVxuICBcbiAgICAgIHJldHVybiB7eCwgeX1cbiAgfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQ3VzdG9tZXJBcHAgfSBmcm9tIFwiLi9jdXN0b21lci9DdXN0b21lckFwcFwiO1xuaW1wb3J0IHsgRGdEaWFncmFtIH0gZnJvbSBcIi4vZGlhZ3JhbS9EZ0RpYWdyYW1cIjtcbmltcG9ydCB7IERnRHJhZ2dhYmxlIH0gZnJvbSBcIi4vZGlhZ3JhbS9EZ0RyYWdnYWJsZVwiO1xuaW1wb3J0IHsgRGdMaW5rIH0gZnJvbSBcIi4vZGlhZ3JhbS9EZ0xpbmtcIjtcbmltcG9ydCB7IERnTm9kZSB9IGZyb20gXCIuL2RpYWdyYW0vRGdOb2RlXCI7XG5pbXBvcnQgeyBTY3JvbGxJdGVtIH0gZnJvbSBcIi4vdmlydHVhbC1zY3JvbGxlci9TY3JvbGxJdGVtXCI7XG5pbXBvcnQgeyBWaXJ0dWFsU2Nyb2xsZXIgfSBmcm9tIFwiLi92aXJ0dWFsLXNjcm9sbGVyL1ZpcnR1YWxTY3JvbGxlclwiO1xuaW1wb3J0IHtEZ1Jlc2l6ZWFibGV9IGZyb20gXCIuL2RpYWdyYW0vRGdSZXNpemVhYmxlXCI7XG5cbi8vIGp1c3QgZm9yIGltcG9ydHMgIVxuLy8gY29uc29sZS5sb2coJ3lhbGxhJywgQ3VzdG9tZXJBcHAuVEFHX05BTUUsIFZpcnR1YWxTY3JvbGxlci5UQUdfTkFNRSwgU2Nyb2xsSXRlbS5UQUdfTkFNRSwgRGdEaWFncmFtLlRBRywgRGdOb2RlLlRBRywgRGdEcmFnZ2FibGUuVEFHKTtcbmNvbnNvbGUubG9nKERnRGlhZ3JhbS5UQUcsIERnTm9kZS5UQUcsIERnRHJhZ2dhYmxlLlRBRywgRGdMaW5rLlRBRywgRGdSZXNpemVhYmxlLlRBRyk7XG5cbi8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZSA9PiB7XG4vLyAgICAgY29uc3QgYXBwOiBDdXN0b21lckFwcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSBhcyBDdXN0b21lckFwcDtcbi8vICAgICBjb25zb2xlLmxvZyhcImFwcCBsb2FkZWRcIiwgYXBwKTtcbi8vICAgICBhcHAuaW5pdChbXG4vLyAgICAgICAgIHsgZmlyc3ROYW1lOiAnVG90bycsIGxhc3ROYW1lOiAnQmlsb3V0ZScgfSxcbi8vICAgICAgICAgeyBmaXJzdE5hbWU6ICdGcmVuY2gnLCBsYXN0TmFtZTogJ0ZyaWVzJyB9LFxuLy8gICAgICAgICB7IGZpcnN0TmFtZTogJ0ZvbycsIGxhc3ROYW1lOiAnQmFyJyB9LFxuLy8gICAgIF0pXG4vLyB9KVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9