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
            console.log("mousedown", this);
            this.mouseDownBox = this.getBox();
        });
        this.addEventListener('mouseup', () => {
            console.log("mouseup", this);
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
                console.log("move", this.dragState);
                const dgNode = _DgNode__WEBPACK_IMPORTED_MODULE_1__.DgNode.getParentDgNode(this);
                if (dgNode) {
                    (0,_MouseDrag__WEBPACK_IMPORTED_MODULE_3__.dragUpdate)(this.dragState.mouseDrag, e);
                    const { dx, dy } = (0,_MouseDrag__WEBPACK_IMPORTED_MODULE_3__.dragDeltas)(this.dragState.mouseDrag);
                    console.log("deltas", dx, dy, "mode", this.dragState.mode);
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
            console.log("up !");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUUzQixPQUFPLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQztBQUNqQixDQUFDOzs7Ozs7O1VDekNIO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTGdEO0FBQ0k7QUFDVjtBQUNBO0FBR1U7QUFFcEQscUJBQXFCO0FBQ3JCLHlJQUF5STtBQUN6SSxPQUFPLENBQUMsR0FBRyxDQUFDLDZEQUFhLEVBQUUsdURBQVUsRUFBRSxpRUFBZSxFQUFFLHVEQUFVLEVBQUUsbUVBQWdCLENBQUMsQ0FBQztBQUV0Rix5Q0FBeUM7QUFDekMsOEVBQThFO0FBQzlFLHNDQUFzQztBQUN0QyxpQkFBaUI7QUFDakIsc0RBQXNEO0FBQ3RELHNEQUFzRDtBQUN0RCxpREFBaUQ7QUFDakQsU0FBUztBQUNULEtBQUsiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL1NhZmVQYXJzZUludC50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2J1aWxkZXIvSHRtbEJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy9kaWFncmFtL0RnRGlhZ3JhbS50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2RpYWdyYW0vRGdEcmFnZ2FibGUudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy9kaWFncmFtL0RnTGluay50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2RpYWdyYW0vRGdOb2RlLnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvZGlhZ3JhbS9EZ1Jlc2l6ZWFibGUudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy9kaWFncmFtL01vdXNlRHJhZy50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2RpYWdyYW0vZ2VvbWV0cnkvQm94LnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvZGlhZ3JhbS9nZW9tZXRyeS9MaW5lLnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBzYWZlUGFyc2VJbnQoczpzdHJpbmcgfCBudWxsKTogbnVtYmVyIHtcbiAgICBjb25zdCBpID0gcGFyc2VJbnQocyk7XG4gICAgaWYgKGlzTmFOKGkpKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gaTtcbn0iLCJleHBvcnQgdHlwZSBEZWVwUGFydGlhbDxUPiA9IFBhcnRpYWw8eyBbUCBpbiBrZXlvZiBUXTogRGVlcFBhcnRpYWw8VFtQXT4gfT47XG5cbnR5cGUgTm9kZUJ1aWxkZXI8SyBleHRlbmRzIGtleW9mIEhUTUxFbGVtZW50VGFnTmFtZU1hcD4gPSAoXG4gIGE6IERlZXBQYXJ0aWFsPEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXT4sXG4gIC4uLmM6IE5vZGVbXVxuKSA9PiBIVE1MRWxlbWVudFRhZ05hbWVNYXBbS107XG5cbmV4cG9ydCBmdW5jdGlvbiBub2RlPEsgZXh0ZW5kcyBrZXlvZiBIVE1MRWxlbWVudFRhZ05hbWVNYXA+KHRhZzogSyk6IE5vZGVCdWlsZGVyPEs+IHtcbiAgcmV0dXJuIChhOiBEZWVwUGFydGlhbDxIVE1MRWxlbWVudFRhZ05hbWVNYXBbS10+LCAuLi5jOiBOb2RlW10pID0+IHtcbiAgICBjb25zdCBuOiBIVE1MRWxlbWVudFRhZ05hbWVNYXBbS10gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgYy5mb3JFYWNoKChjaGlsZCkgPT4gbi5hcHBlbmRDaGlsZChjaGlsZCkpO1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhhKSBhcyBBcnJheTxrZXlvZiB0eXBlb2YgYT47XG4gICAga2V5cy5mb3JFYWNoKChrKSA9PiBzZXRQcm9wZXJ0eShuLCBrLCBnZXRQcm9wZXJ0eShhLCBrKSkpO1xuICAgIHJldHVybiBuO1xuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRQcm9wZXJ0eTxULCBLIGV4dGVuZHMga2V5b2YgVD4obzogVCwga2V5OiBLKTogVFtLXSB7XG4gIHJldHVybiBvW2tleV07XG59XG5cbmZ1bmN0aW9uIHNldFByb3BlcnR5PFQsIEsgZXh0ZW5kcyBrZXlvZiBUPihvOiBULCBrZXk6IEssIHZhbHVlOiBUW0tdKTogdm9pZCB7XG4gIG9ba2V5XSA9IHZhbHVlO1xufVxuXG5leHBvcnQgY29uc3QgZGl2ID0gbm9kZSgnZGl2Jyk7XG5leHBvcnQgY29uc3Qgc3BhbiA9IG5vZGUoJ3NwYW4nKTtcbmV4cG9ydCBjb25zdCBhID0gbm9kZSgnYScpO1xuZXhwb3J0IGNvbnN0IHAgPSBub2RlKCdwJyk7XG5leHBvcnQgY29uc3QgaDEgPSBub2RlKCdoMScpO1xuZXhwb3J0IGNvbnN0IGlucHV0ID0gbm9kZSgnaW5wdXQnKTtcbmV4cG9ydCBjb25zdCBsYWJlbCA9IG5vZGUoJ2xhYmVsJyk7XG5leHBvcnQgY29uc3Qgc2xvdCA9IG5vZGUoJ3Nsb3QnKTtcbmV4cG9ydCBjb25zdCBzdHlsZSA9IG5vZGUoJ3N0eWxlJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXh0KHM6IHN0cmluZyk6IFRleHQge1xuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbXB0eShlOiBOb2RlKSB7XG4gIHdoaWxlKGUuZmlyc3RDaGlsZCkge1xuICAgIGUucmVtb3ZlQ2hpbGQoZS5maXJzdENoaWxkKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHgobjogbnVtYmVyKTogc3RyaW5nIHtcbiAgcmV0dXJuIG4gKyAncHgnO1xufVxuIiwiaW1wb3J0IHsgZGl2LCBzbG90LCBzdHlsZSwgdGV4dCB9IGZyb20gXCIuLi9idWlsZGVyL0h0bWxCdWlsZGVyXCI7XG5pbXBvcnQgeyBEZ0xpbmsgfSBmcm9tIFwiLi9EZ0xpbmtcIjtcbmltcG9ydCB7IERnTm9kZSB9IGZyb20gXCIuL0RnTm9kZVwiO1xuXG5jb25zdCBTVkdfTlMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xuXG5jb25zdCBkaWFnU3R5bGVzID0gYFxuICAgIC5kZy1kaWFncmFtIHtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgfVxuICAgIC5kZy1zY3JvbGwtcGFuZSB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBib3R0b206IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICBvdmVyZmxvdzogYXV0bztcbiAgICB9XG4gICAgLmRnLWxpbmtzIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICB9XG4gICAgLmRnLWNvbnRlbnQtcGFuZSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JleTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIH1cbmA7XG5cbmNvbnN0IHN2Z0RlZnMgPSBgXG48bWFya2VyIGlkPVwiYXJyb3doZWFkXCIgbWFya2VyV2lkdGg9XCIxMFwiIG1hcmtlckhlaWdodD1cIjdcIiBcbnJlZlg9XCI5XCIgcmVmWT1cIjMuNVwiIG9yaWVudD1cImF1dG9cIj5cbiAgICA8cG9seWdvbiBwb2ludHM9XCIwIDAsIDEwIDMuNSwgMCA3XCIgLz5cbjwvbWFya2VyPlxuYFxuXG5leHBvcnQgY2xhc3MgRGdEaWFncmFtIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gICAgc3RhdGljIFRBRyA9IFwiZGctZGlhZ3JhbVwiXG5cbiAgICBwcml2YXRlIGxpbmtzU3ZnOiBTVkdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFNWR19OUywgJ3N2ZycpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGNvbnN0IHNoYWRvdyA9IHRoaXMuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcblxuICAgICAgICB0aGlzLmxpbmtzU3ZnLmNsYXNzTGlzdC5hZGQoJ2RnLWxpbmtzJyk7XG4gICAgICAgIGNvbnN0IGRlZnM6IFNWR0RlZnNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFNWR19OUywgJ3N2ZycpO1xuICAgICAgICBkZWZzLmlubmVySFRNTCA9IHN2Z0RlZnM7XG4gICAgICAgIHRoaXMubGlua3NTdmcuYXBwZW5kQ2hpbGQoZGVmcyk7XG4gICAgICAgIGNvbnN0IGxpbmtzU2xvdDogSFRNTFNsb3RFbGVtZW50ID0gc2xvdCh7IG5hbWU6IFwibGlua3NcIn0pXG4gICAgICAgIHRoaXMubGlua3NTdmcuYXBwZW5kQ2hpbGQobGlua3NTbG90KTtcblxuICAgICAgICBjb25zdCBzY3JvbGxQYW5lID0gZGl2KFxuICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdkZy1zY3JvbGwtcGFuZScgfSxcbiAgICAgICAgICAgIHRoaXMubGlua3NTdmcsXG4gICAgICAgICAgICBzbG90KHt9KSxcbiAgICAgICAgKTtcblxuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQoc2Nyb2xsUGFuZSk7XG4gICAgICAgIHNoYWRvdy5hcHBlbmRDaGlsZChzdHlsZSh7fSwgdGV4dChkaWFnU3R5bGVzKSkpO1xuICAgIH1cblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIH1cblxuICAgIGdldERnTm9kZXMoKTogUmVhZG9ubHlBcnJheTxEZ05vZGU+IHtcbiAgICAgICAgY29uc3QgcSA9IHRoaXMucXVlcnlTZWxlY3RvckFsbDxEZ05vZGU+KERnTm9kZS5UQUcpO1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShxKTtcbiAgICB9XG5cbiAgICBnZXROb2RlQnlJZChpZDogc3RyaW5nKTogRGdOb2RlIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGdOb2RlcygpLmZpbmQobiA9PiBuLmlkID09PSBpZCk7XG4gICAgfVxuXG4gICAgZ2V0RGdMaW5rcygpOiBSZWFkb25seUFycmF5PERnTGluaz4ge1xuICAgICAgICBjb25zdCBxID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsPERnTGluaz4oRGdMaW5rLlRBRyk7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHEpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyTGluayhsaW5rOiBEZ0xpbmspIHtcbiAgICAgICAgY29uc3QgbGluZSA9IGxpbmsuZHJhd0xpbmsodGhpcy5nZXROb2RlQnlJZChsaW5rLmZyb20pLCB0aGlzLmdldE5vZGVCeUlkKGxpbmsudG8pKTtcbiAgICAgICAgbGluZS5zZXRBdHRyaWJ1dGUoXCJmcm9tXCIsIGxpbmsuZnJvbSk7XG4gICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKFwidG9cIiwgbGluay50byk7XG4gICAgICAgIHRoaXMubGlua3NTdmcuYXBwZW5kQ2hpbGQobGluZSk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJOb2RlKG5vZGU6IERnTm9kZSkge1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdmVkJywgKCkgPT4ge1xuICAgICAgICAgICAgLy8gdXBkYXRlIGFsbCBsaW5rc1xuICAgICAgICAgICAgdGhpcy5saW5rc1N2Zy5xdWVyeVNlbGVjdG9yQWxsKFwibGluZVwiKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKGxpbmUgPT4gbGluZS5yZW1vdmUoKSk7XG4gICAgICAgICAgICAvLyBhZGQgbmV3XG4gICAgICAgICAgICB0aGlzLmdldERnTGlua3MoKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKGwgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5lID0gbC5kcmF3TGluayh0aGlzLmdldE5vZGVCeUlkKGwuZnJvbSksIHRoaXMuZ2V0Tm9kZUJ5SWQobC50bykpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpbmtzU3ZnLmFwcGVuZENoaWxkKGxpbmUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0UGFyZW50RGdEaWFncmFtKGZyb206IEhUTUxFbGVtZW50KTogRGdEaWFncmFtIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKGZyb20ucGFyZW50RWxlbWVudCBpbnN0YW5jZW9mIERnRGlhZ3JhbSkge1xuICAgICAgICAgICAgcmV0dXJuIGZyb20ucGFyZW50RWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZnJvbS5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gRGdEaWFncmFtLmdldFBhcmVudERnRGlhZ3JhbShmcm9tLnBhcmVudEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShEZ0RpYWdyYW0uVEFHLCBEZ0RpYWdyYW0pO1xuIiwiaW1wb3J0IHsgZGl2LCBzbG90LCBzdHlsZSwgdGV4dCB9IGZyb20gXCIuLi9idWlsZGVyL0h0bWxCdWlsZGVyXCI7XG5pbXBvcnQgeyBEZ05vZGUgfSBmcm9tIFwiLi9EZ05vZGVcIjtcbmltcG9ydCB7ZHJhZ0RlbHRhcywgZHJhZ1VwZGF0ZSwgTW91c2VEcmFnLCBuZXdNb3VzZURyYWd9IGZyb20gXCIuL01vdXNlRHJhZ1wiO1xuXG5pbnRlcmZhY2UgRHJhZ1N0YXRlIHtcbiAgICByZWFkb25seSByZWZYOiBudW1iZXI7XG4gICAgcmVhZG9ubHkgcmVmWTogbnVtYmVyO1xuICAgIG1vdXNlRHJhZzogTW91c2VEcmFnO1xuXG59XG5cbmV4cG9ydCBjbGFzcyBEZ0RyYWdnYWJsZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICAgIHN0YXRpYyBUQUcgPSBcImRnLWRyYWdnYWJsZVwiO1xuXG4gICAgcHJpdmF0ZSBkcmFnU3RhdGU6IERyYWdTdGF0ZSB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGNvbnN0IG1vdXNlTW92ZSA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5kcmFnU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBkcmFnVXBkYXRlKHRoaXMuZHJhZ1N0YXRlLm1vdXNlRHJhZywgZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkeCwgZHkgfSA9IGRyYWdEZWx0YXModGhpcy5kcmFnU3RhdGUubW91c2VEcmFnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkZ05vZGUgPSBEZ05vZGUuZ2V0UGFyZW50RGdOb2RlKHRoaXMpO1xuICAgICAgICAgICAgICAgIGlmIChkZ05vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGdOb2RlLnggPSB0aGlzLmRyYWdTdGF0ZS5yZWZYICsgZHg7XG4gICAgICAgICAgICAgICAgICAgIGRnTm9kZS55ID0gdGhpcy5kcmFnU3RhdGUucmVmWSArIGR5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1vdXNlVXAgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2VNb3ZlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ1N0YXRlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgY2xpZW50WCwgY2xpZW50WSB9ID0gZTtcbiAgICAgICAgICAgIGNvbnN0IGRnTm9kZSA9IERnTm9kZS5nZXRQYXJlbnREZ05vZGUodGhpcyk7XG4gICAgICAgICAgICBpZiAoZGdOb2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIG1vdXNlRHJhZzogbmV3TW91c2VEcmFnKGUpLFxuICAgICAgICAgICAgICAgICAgICByZWZYOiBkZ05vZGUueCxcbiAgICAgICAgICAgICAgICAgICAgcmVmWTogZGdOb2RlLnksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZU1vdmUpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRGdEcmFnZ2FibGUuVEFHLCBEZ0RyYWdnYWJsZSk7XG4iLCJpbXBvcnQgeyBlbXB0eSwgbm9kZSB9IGZyb20gXCIuLi9idWlsZGVyL0h0bWxCdWlsZGVyXCI7XG5pbXBvcnQgeyBib3hDZW50ZXIsIGJveEludGVyc2VjdGlvbiB9IGZyb20gXCIuL2dlb21ldHJ5L0JveFwiO1xuaW1wb3J0IHsgRGdEaWFncmFtIH0gZnJvbSBcIi4vRGdEaWFncmFtXCI7XG5pbXBvcnQgeyBEZ05vZGUgfSBmcm9tIFwiLi9EZ05vZGVcIjtcbmltcG9ydCB7IExpbmUsIGxpbmVJbnRlcnNlY3Rpb24gfSBmcm9tIFwiLi9nZW9tZXRyeS9MaW5lXCI7XG5cbmNvbnN0IFNWR19OUyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG5cbmV4cG9ydCBjbGFzcyBEZ0xpbmsgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cbiAgICBzdGF0aWMgVEFHID0gJ2RnLWxpbmsnO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgRGdEaWFncmFtLmdldFBhcmVudERnRGlhZ3JhbSh0aGlzKS5yZWdpc3RlckxpbmsodGhpcyk7XG4gICAgfVxuXG4gICAgZHJhd0xpbmsoZnJvbU5vZGU6IERnTm9kZSwgdG9Ob2RlOiBEZ05vZGUpOiBTVkdMaW5lRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGZyb21Cb3ggPSBmcm9tTm9kZS5nZXRCb3goKTtcbiAgICAgICAgY29uc3QgdG9Cb3ggPSB0b05vZGUuZ2V0Qm94KCk7XG4gICAgICAgIGNvbnN0IGNlbnRlcjEgPSBib3hDZW50ZXIoZnJvbUJveCk7XG4gICAgICAgIGNvbnN0IGNlbnRlcjIgPSBib3hDZW50ZXIodG9Cb3gpO1xuXG4gICAgICAgIGNvbnN0IGxpbmU6IExpbmUgPSB7XG4gICAgICAgICAgICBmcm9tOiBjZW50ZXIxLFxuICAgICAgICAgICAgdG86IGNlbnRlcjIsXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXNlY3QxID0gYm94SW50ZXJzZWN0aW9uKGZyb21Cb3gsIGxpbmUpO1xuICAgICAgICBjb25zdCBpc2VjdDIgPSBib3hJbnRlcnNlY3Rpb24odG9Cb3gsIGxpbmUpO1xuXG4gICAgICAgIGNvbnN0IGZyb21Qb2ludCA9IGlzZWN0MSB8fCBjZW50ZXIxO1xuICAgICAgICBjb25zdCB0b1BvaW50ID0gaXNlY3QyIHx8IGNlbnRlcjI7XG5cbiAgICAgICAgY29uc3Qgc3ZnTGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhTVkdfTlMsICdsaW5lJyk7XG4gICAgICAgIHN2Z0xpbmUuc2V0QXR0cmlidXRlKCd4MScsIGZyb21Qb2ludC54LnRvU3RyaW5nKCkpO1xuICAgICAgICBzdmdMaW5lLnNldEF0dHJpYnV0ZSgneDInLCB0b1BvaW50LngudG9TdHJpbmcoKSk7XG4gICAgICAgIHN2Z0xpbmUuc2V0QXR0cmlidXRlKCd5MScsIGZyb21Qb2ludC55LnRvU3RyaW5nKCkpO1xuICAgICAgICBzdmdMaW5lLnNldEF0dHJpYnV0ZSgneTInLCB0b1BvaW50LnkudG9TdHJpbmcoKSk7XG4gICAgICAgIHN2Z0xpbmUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCAnYmxhY2snKTtcbiAgICAgICAgc3ZnTGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsICcyJyk7XG4gICAgICAgIHN2Z0xpbmUuc2V0QXR0cmlidXRlKCdtYXJrZXItZW5kJywgJ3VybCgjYXJyb3doZWFkKScpO1xuXG4gICAgICAgIHJldHVybiBzdmdMaW5lO1xuICAgIH1cblxuICAgIGdldCBmcm9tKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnZnJvbScpO1xuICAgIH1cblxuICAgIGdldCB0bygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RvJyk7XG4gICAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRGdMaW5rLlRBRywgRGdMaW5rKVxuIiwiaW1wb3J0IHsgZGl2LCBzbG90LCBzdHlsZSwgdGV4dCB9IGZyb20gXCIuLi9idWlsZGVyL0h0bWxCdWlsZGVyXCI7XG5pbXBvcnQgeyBzYWZlUGFyc2VJbnQgfSBmcm9tIFwiLi4vU2FmZVBhcnNlSW50XCI7XG5pbXBvcnQgeyBCb3gsIGJveEVxdWFscyB9IGZyb20gXCIuL2dlb21ldHJ5L0JveFwiO1xuaW1wb3J0IHsgRGdEaWFncmFtIH0gZnJvbSBcIi4vRGdEaWFncmFtXCI7XG5cbmNvbnN0IGNzcyA9IGBcbiAgICAuZGctbm9kZSB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgZGlzcGxheTogZmxleDsgICBcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsgICAgXG4gICAgfVxuYDtcblxuZXhwb3J0IGNsYXNzIERnTm9kZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICAgIHN0YXRpYyBUQUcgPSBcImRnLW5vZGVcIjtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgZGdOb2RlOiBIVE1MRGl2RWxlbWVudDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRnU2xvdDogSFRNTFNsb3RFbGVtZW50O1xuICAgIHByaXZhdGUgbW91c2VEb3duQm94OiBCb3ggfCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgY29uc3Qgc2hhZG93ID0gdGhpcy5hdHRhY2hTaGFkb3coe21vZGU6J29wZW4nfSk7XG4gICAgICAgIHRoaXMuZGdTbG90ID0gc2xvdCh7fSk7XG4gICAgICAgIHRoaXMuZGdOb2RlID0gZGl2KHtjbGFzc05hbWU6ICdkZy1ub2RlJ30sIHRoaXMuZGdTbG90KTtcbiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKHRoaXMuZGdOb2RlKTtcbiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKHN0eWxlKHt9LCB0ZXh0KGNzcykpKTtcbiAgICB9XG5cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgY29uc3QgcyA9IHRoaXMuZGdOb2RlLnN0eWxlO1xuICAgICAgICBzLmxlZnQgPSB0aGlzLnggKyBcInB4XCI7XG4gICAgICAgIHMudG9wID0gdGhpcy55ICsgXCJweFwiO1xuICAgICAgICBzLndpZHRoID0gdGhpcy53ICsgXCJweFwiO1xuICAgICAgICBzLmhlaWdodCA9IHRoaXMuaCArIFwicHhcIjtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1vdXNlZG93blwiLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMubW91c2VEb3duQm94ID0gdGhpcy5nZXRCb3goKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibW91c2V1cFwiLCB0aGlzKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm1vdXNlRG93bkJveCkge1xuICAgICAgICAgICAgICAgIGlmIChib3hFcXVhbHModGhpcy5nZXRCb3goKSwgdGhpcy5tb3VzZURvd25Cb3gpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAhdGhpcy5zZWxlY3RlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1vdXNlRG93bkJveCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZ2V0RGdEaWFncmFtKCkucmVnaXN0ZXJOb2RlKHRoaXMpO1xuICAgIH1cblxuICAgIGdldEJveCgpOiBCb3gge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogdGhpcy54LFxuICAgICAgICAgICAgeTogdGhpcy55LFxuICAgICAgICAgICAgdzogdGhpcy53LFxuICAgICAgICAgICAgaDogdGhpcy5oLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIHJldHVybiBbJ3gnLCAneScsICdoJywgJ3cnXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZpcmVNb3ZlZCgpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KFxuICAgICAgICAgICAgICAgICdtb3ZlZCcsXG4gICAgICAgICAgICAgICAgeyBkZXRhaWw6IHRoaXMgfVxuICAgICAgICAgICAgKVxuICAgICAgICApXG4gICAgfVxuXG4gICAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWU6IHN0cmluZywgb2xkVmFsdWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBzID0gdGhpcy5kZ05vZGUuc3R5bGU7XG4gICAgICAgIGlmIChvbGRWYWx1ZSA9PT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3gnOiB7XG4gICAgICAgICAgICAgICAgcy5sZWZ0ID0gdGhpcy54ICsgJ3B4JztcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmVNb3ZlZCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAneSc6IHtcbiAgICAgICAgICAgICAgICBzLnRvcCA9IHRoaXMueSArICdweCc7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlTW92ZWQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ3cnOiB7XG4gICAgICAgICAgICAgICAgcy53aWR0aCA9IHRoaXMudyArICdweCc7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlTW92ZWQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ2gnOiB7XG4gICAgICAgICAgICAgICAgcy5oZWlnaHQgPSB0aGlzLmggKyAncHgnO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZU1vdmVkKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICB9XG5cbiAgICBnZXQgeCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc2FmZVBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCd4JykpO1xuICAgIH1cblxuICAgIHNldCB4KHg6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgneCcsIHgudG9TdHJpbmcoKSk7XG4gICAgICAgIHRoaXMuZGdOb2RlLnN0eWxlLmxlZnQgPSB4ICsgJ3B4JztcbiAgICB9XG5cbiAgICBnZXQgeSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc2FmZVBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCd5JykpO1xuICAgIH1cblxuICAgIHNldCB5KHk6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgneScsIHkudG9TdHJpbmcoKSk7XG4gICAgICAgIHRoaXMuZGdOb2RlLnN0eWxlLnRvcCA9IHkgKyAncHgnO1xuICAgIH1cblxuICAgIGdldCBoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ2gnKSk7XG4gICAgfVxuXG4gICAgc2V0IGgoaDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdoJywgaC50b1N0cmluZygpKTtcbiAgICAgICAgdGhpcy5kZ05vZGUuc3R5bGUuaGVpZ2h0ID0gaCArICdweCc7XG4gICAgfVxuXG4gICAgZ2V0IHcoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNhZmVQYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgndycpKTtcbiAgICB9XG5cbiAgICBzZXQgdyh3OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3cnLCB3LnRvU3RyaW5nKCkpO1xuICAgICAgICB0aGlzLmRnTm9kZS5zdHlsZS53aWR0aCA9IHcgKyAncHgnO1xuICAgIH1cblxuICAgIGdldCBzZWxlY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdzZWxlY3RlZCcpO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RlZChzOiBib29sZWFuKSB7XG4gICAgICAgIGlmIChzKSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldERnRGlhZ3JhbSgpOiBEZ0RpYWdyYW0gfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gRGdEaWFncmFtLmdldFBhcmVudERnRGlhZ3JhbSh0aGlzKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0UGFyZW50RGdOb2RlKGZyb206IEhUTUxFbGVtZW50KTogRGdOb2RlIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKGZyb20ucGFyZW50RWxlbWVudCBpbnN0YW5jZW9mIERnTm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZyb20ucGFyZW50RWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZnJvbS5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gRGdOb2RlLmdldFBhcmVudERnTm9kZShmcm9tLnBhcmVudEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG5cblxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRGdOb2RlLlRBRywgRGdOb2RlKTtcbiIsImltcG9ydCB7c2FmZVBhcnNlSW50fSBmcm9tIFwiLi4vU2FmZVBhcnNlSW50XCI7XG5pbXBvcnQge0RnTm9kZX0gZnJvbSBcIi4vRGdOb2RlXCI7XG5pbXBvcnQge2RpdiwgZW1wdHksIHB4LCBzbG90LCBzdHlsZSwgdGV4dH0gZnJvbSBcIi4uL2J1aWxkZXIvSHRtbEJ1aWxkZXJcIjtcbmltcG9ydCB7ZHJhZ0RlbHRhcywgZHJhZ1VwZGF0ZSwgTW91c2VEcmFnLCBuZXdNb3VzZURyYWd9IGZyb20gXCIuL01vdXNlRHJhZ1wiO1xuXG50eXBlIERyYWdNb2RlID1cbiAgICB8ICd0b3AnXG4gICAgfCAnYm90dG9tJ1xuICAgIHwgJ2xlZnQnXG4gICAgfCAncmlnaHQnXG4gICAgfCAndG9wLWxlZnQnXG4gICAgfCAndG9wLXJpZ2h0J1xuICAgIHwgJ2JvdHRvbS1sZWZ0J1xuICAgIHwgJ2JvdHRvbS1yaWdodCdcblxuaW50ZXJmYWNlIFJlc2l6ZVN0YXRlIHtcbiAgICByZWFkb25seSByZWZYOiBudW1iZXI7XG4gICAgcmVhZG9ubHkgcmVmWTogbnVtYmVyO1xuICAgIHJlYWRvbmx5IHJlZlc6IG51bWJlcjtcbiAgICByZWFkb25seSByZWZIOiBudW1iZXI7XG4gICAgcmVhZG9ubHkgbW9kZTogRHJhZ01vZGU7XG4gICAgbW91c2VEcmFnOiBNb3VzZURyYWc7XG59XG5cbmNvbnN0IE1JTl9TSVpFID0gMTA7XG5cbmV4cG9ydCBjbGFzcyBEZ1Jlc2l6ZWFibGUgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cbiAgICBzdGF0aWMgVEFHID0gJ2RnLXJlc2l6ZWFibGUnO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBzaGFkb3c6IFNoYWRvd1Jvb3Q7XG4gICAgcHJpdmF0ZSByZWFkb25seSByZUVsZW1zOiBSZWFkb25seUFycmF5PEhUTUxEaXZFbGVtZW50PjtcblxuICAgIHByaXZhdGUgZHJhZ1N0YXRlOiBSZXNpemVTdGF0ZSB8IHVuZGVmaW5lZDtcblxuICAgIHByaXZhdGUgZG9jTW91c2VNb3ZlID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ1N0YXRlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1vdmVcIiwgdGhpcy5kcmFnU3RhdGUpO1xuICAgICAgICAgICAgY29uc3QgZGdOb2RlID0gRGdOb2RlLmdldFBhcmVudERnTm9kZSh0aGlzKTtcbiAgICAgICAgICAgIGlmIChkZ05vZGUpIHtcbiAgICAgICAgICAgICAgICBkcmFnVXBkYXRlKHRoaXMuZHJhZ1N0YXRlLm1vdXNlRHJhZywgZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkeCwgZHkgfSA9IGRyYWdEZWx0YXModGhpcy5kcmFnU3RhdGUubW91c2VEcmFnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImRlbHRhc1wiLCBkeCwgZHksIFwibW9kZVwiLCB0aGlzLmRyYWdTdGF0ZS5tb2RlKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZHJhZ1N0YXRlLm1vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRvcFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHJlZlksIHJlZkggfSA9IHRoaXMuZHJhZ1N0YXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3WSA9IHJlZlkgKyBkeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0ggPSByZWZIIC0gZHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3SCA8IE1JTl9TSVpFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGdOb2RlLnkgPSBuZXdZO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGdOb2RlLmggPSBuZXdIO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImJvdHRvbVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHJlZkggfSA9IHRoaXMuZHJhZ1N0YXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3SCA9IHJlZkggKyBkeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdIIDwgTUlOX1NJWkUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBkZ05vZGUuaCA9IG5ld0g7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibGVmdFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHJlZlgsIHJlZlcgfSA9IHRoaXMuZHJhZ1N0YXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3WCA9IHJlZlggKyBkeDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1cgPSByZWZXIC0gZHg7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3VyA8IE1JTl9TSVpFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGdOb2RlLnggPSBuZXdYO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGdOb2RlLncgPSBuZXdXO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInJpZ2h0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgcmVmVyB9ID0gdGhpcy5kcmFnU3RhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdXID0gcmVmVyArIGR4O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1cgPCBNSU5fU0laRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRnTm9kZS53ID0gbmV3VztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0b3AtbGVmdFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHJlZlgsIHJlZlcsIHJlZlksIHJlZkggfSA9IHRoaXMuZHJhZ1N0YXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1kgPSByZWZZICsgZHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3SCA9IHJlZkggLSBkeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdIIDwgTUlOX1NJWkUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdIID0gTUlOX1NJWkU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVsdGFIID0gbmV3SCAtIHJlZkg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3WSA9IHJlZlkgLSBkZWx0YUg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3WCA9IHJlZlggKyBkeDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdXID0gcmVmVyAtIGR4O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1cgPCBNSU5fU0laRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1cgPSBNSU5fU0laRTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWx0YVcgPSBuZXdXIC0gcmVmVztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdYID0gcmVmWCAtIGRlbHRhVztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRnTm9kZS55ID0gbmV3WTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRnTm9kZS5oID0gbmV3SDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRnTm9kZS54ID0gbmV3WDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRnTm9kZS53ID0gbmV3VztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gb3RoZXIgcmVzaXplIG1vZGVzLi4uXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkb2NNb3VzZVVwID0gKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcInVwICFcIik7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuZG9jTW91c2VNb3ZlKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuZG9jTW91c2VVcCk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc2hhZG93ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgICAgIHRoaXMuc2hhZG93LmFwcGVuZENoaWxkKHNsb3Qoe30pKTtcblxuICAgICAgICBjb25zdCByZVRvcCA9IGRpdih7IGNsYXNzTmFtZTogJ2RnLXJlc2l6ZS1lbGVtICd9KTtcbiAgICAgICAgcmVUb3Auc3R5bGUudG9wID0gXCIwXCI7XG4gICAgICAgIHJlVG9wLnN0eWxlLmxlZnQgPSBcIjJweFwiO1xuICAgICAgICByZVRvcC5zdHlsZS5yaWdodCA9IFwiMnB4XCI7XG4gICAgICAgIHJlVG9wLnN0eWxlLmhlaWdodCA9IFwiMnB4XCI7XG4gICAgICAgIHJlVG9wLnN0eWxlLmN1cnNvciA9IFwibnMtcmVzaXplXCI7XG4gICAgICAgIHJlVG9wLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25SZU1vdXNlRG93bigndG9wJykpO1xuXG4gICAgICAgIGNvbnN0IHJlQm90dG9tID0gZGl2KHsgY2xhc3NOYW1lOiAnZGctcmVzaXplLWVsZW0gJ30pO1xuICAgICAgICByZUJvdHRvbS5zdHlsZS5ib3R0b20gPSBcIjBcIjtcbiAgICAgICAgcmVCb3R0b20uc3R5bGUubGVmdCA9IFwiMnB4XCI7XG4gICAgICAgIHJlQm90dG9tLnN0eWxlLnJpZ2h0ID0gXCIycHhcIjtcbiAgICAgICAgcmVCb3R0b20uc3R5bGUuaGVpZ2h0ID0gXCIycHhcIjtcbiAgICAgICAgcmVCb3R0b20uc3R5bGUuY3Vyc29yID0gXCJucy1yZXNpemVcIjtcbiAgICAgICAgcmVCb3R0b20uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vblJlTW91c2VEb3duKCdib3R0b20nKSk7XG5cbiAgICAgICAgY29uc3QgcmVMZWZ0ID0gZGl2KHsgY2xhc3NOYW1lOiAnZGctcmVzaXplLWVsZW0gJ30pO1xuICAgICAgICByZUxlZnQuc3R5bGUudG9wID0gXCIycHhcIjtcbiAgICAgICAgcmVMZWZ0LnN0eWxlLmJvdHRvbSA9IFwiMnB4XCI7XG4gICAgICAgIHJlTGVmdC5zdHlsZS5sZWZ0ID0gXCIwXCI7XG4gICAgICAgIHJlTGVmdC5zdHlsZS53aWR0aCA9IFwiMnB4XCI7XG4gICAgICAgIHJlTGVmdC5zdHlsZS5jdXJzb3IgPSBcImV3LXJlc2l6ZVwiO1xuICAgICAgICByZUxlZnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vblJlTW91c2VEb3duKCdsZWZ0JykpO1xuXG4gICAgICAgIGNvbnN0IHJlUmlnaHQgPSBkaXYoeyBjbGFzc05hbWU6ICdkZy1yZXNpemUtZWxlbSAnfSk7XG4gICAgICAgIHJlUmlnaHQuc3R5bGUudG9wID0gXCIycHhcIjtcbiAgICAgICAgcmVSaWdodC5zdHlsZS5ib3R0b20gPSBcIjJweFwiO1xuICAgICAgICByZVJpZ2h0LnN0eWxlLnJpZ2h0ID0gXCIwXCI7XG4gICAgICAgIHJlUmlnaHQuc3R5bGUud2lkdGggPSBcIjJweFwiO1xuICAgICAgICByZVJpZ2h0LnN0eWxlLmN1cnNvciA9IFwiZXctcmVzaXplXCI7XG4gICAgICAgIHJlUmlnaHQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vblJlTW91c2VEb3duKCdyaWdodCcpKTtcblxuICAgICAgICBjb25zdCByZVRvcExlZnQgPSBkaXYoeyBjbGFzc05hbWU6ICdkZy1yZXNpemUtZWxlbSAnfSk7XG4gICAgICAgIHJlVG9wTGVmdC5zdHlsZS50b3AgPSBcIjBcIjtcbiAgICAgICAgcmVUb3BMZWZ0LnN0eWxlLmxlZnQgPSBcIjBcIjtcbiAgICAgICAgcmVUb3BMZWZ0LnN0eWxlLndpZHRoID0gXCIycHhcIjtcbiAgICAgICAgcmVUb3BMZWZ0LnN0eWxlLmhlaWdodCA9IFwiMnB4XCI7XG4gICAgICAgIHJlVG9wTGVmdC5zdHlsZS5jdXJzb3IgPSBcIm53c2UtcmVzaXplXCI7XG4gICAgICAgIHJlVG9wTGVmdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uUmVNb3VzZURvd24oJ3RvcC1sZWZ0JykpO1xuXG4gICAgICAgIGNvbnN0IHJlVG9wUmlnaHQgPSBkaXYoeyBjbGFzc05hbWU6ICdkZy1yZXNpemUtZWxlbSAnfSk7XG4gICAgICAgIHJlVG9wUmlnaHQuc3R5bGUudG9wID0gXCIwXCI7XG4gICAgICAgIHJlVG9wUmlnaHQuc3R5bGUucmlnaHQgPSBcIjBcIjtcbiAgICAgICAgcmVUb3BSaWdodC5zdHlsZS53aWR0aCA9IFwiMnB4XCI7XG4gICAgICAgIHJlVG9wUmlnaHQuc3R5bGUuaGVpZ2h0ID0gXCIycHhcIjtcbiAgICAgICAgcmVUb3BSaWdodC5zdHlsZS5jdXJzb3IgPSBcIm5lc3ctcmVzaXplXCI7XG4gICAgICAgIHJlVG9wUmlnaHQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vblJlTW91c2VEb3duKCd0b3AtcmlnaHQnKSk7XG5cbiAgICAgICAgY29uc3QgcmVCb3R0b21MZWZ0ID0gZGl2KHsgY2xhc3NOYW1lOiAnZGctcmVzaXplLWVsZW0gJ30pO1xuICAgICAgICByZUJvdHRvbUxlZnQuc3R5bGUuYm90dG9tID0gXCIwXCI7XG4gICAgICAgIHJlQm90dG9tTGVmdC5zdHlsZS5sZWZ0ID0gXCIwXCI7XG4gICAgICAgIHJlQm90dG9tTGVmdC5zdHlsZS53aWR0aCA9IFwiMnB4XCI7XG4gICAgICAgIHJlQm90dG9tTGVmdC5zdHlsZS5oZWlnaHQgPSBcIjJweFwiO1xuICAgICAgICByZUJvdHRvbUxlZnQuc3R5bGUuY3Vyc29yID0gXCJuZXN3LXJlc2l6ZVwiO1xuICAgICAgICByZUJvdHRvbUxlZnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vblJlTW91c2VEb3duKCdib3R0b20tbGVmdCcpKTtcblxuICAgICAgICBjb25zdCByZUJvdHRvbVJpZ2h0ID0gZGl2KHsgY2xhc3NOYW1lOiAnZGctcmVzaXplLWVsZW0gJ30pO1xuICAgICAgICByZUJvdHRvbVJpZ2h0LnN0eWxlLmJvdHRvbSA9IFwiMFwiO1xuICAgICAgICByZUJvdHRvbVJpZ2h0LnN0eWxlLnJpZ2h0ID0gXCIwXCI7XG4gICAgICAgIHJlQm90dG9tUmlnaHQuc3R5bGUud2lkdGggPSBcIjJweFwiO1xuICAgICAgICByZUJvdHRvbVJpZ2h0LnN0eWxlLmhlaWdodCA9IFwiMnB4XCI7XG4gICAgICAgIHJlQm90dG9tUmlnaHQuc3R5bGUuY3Vyc29yID0gXCJud3NlLXJlc2l6ZVwiO1xuICAgICAgICByZUJvdHRvbVJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25SZU1vdXNlRG93bignYm90dG9tLXJpZ2h0JykpO1xuXG4gICAgICAgIHRoaXMucmVFbGVtcyA9IFtcbiAgICAgICAgICAgIHJlVG9wTGVmdCxcbiAgICAgICAgICAgIHJlVG9wLFxuICAgICAgICAgICAgcmVUb3BSaWdodCxcbiAgICAgICAgICAgIHJlUmlnaHQsXG4gICAgICAgICAgICByZUJvdHRvbVJpZ2h0LFxuICAgICAgICAgICAgcmVCb3R0b20sXG4gICAgICAgICAgICByZUJvdHRvbUxlZnQsXG4gICAgICAgICAgICByZUxlZnRcbiAgICAgICAgXVxuXG4gICAgICAgIHRoaXMuc2hhZG93LmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgc3R5bGUoXG4gICAgICAgICAgICAgICAge30sXG4gICAgICAgICAgICAgICAgdGV4dChgXG4gICAgICAgICAgICAgICAgICAgIC5kZy1yZXNpemUtZWxlbSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7ICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBgKSlcbiAgICAgICAgKVxuXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+XG4gICAgICAgICAgICB0aGlzLmFkZFJlc2l6ZUVsZW1zKClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT5cbiAgICAgICAgICAgIHRoaXMucmVtb3ZlUmVzaXplRWxlbXMoKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25SZU1vdXNlRG93bihtb2RlOiBEcmFnTW9kZSk6IChlOk1vdXNlRXZlbnQpID0+IHZvaWQge1xuICAgICAgICByZXR1cm4gZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkZ05vZGUgPSBEZ05vZGUuZ2V0UGFyZW50RGdOb2RlKHRoaXMpO1xuICAgICAgICAgICAgaWYgKGRnTm9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ1N0YXRlID0ge1xuICAgICAgICAgICAgICAgICAgICBtb3VzZURyYWc6IG5ld01vdXNlRHJhZyhlKSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZSxcbiAgICAgICAgICAgICAgICAgICAgcmVmVzogZGdOb2RlLncsXG4gICAgICAgICAgICAgICAgICAgIHJlZkg6IGRnTm9kZS5oLFxuICAgICAgICAgICAgICAgICAgICByZWZYOiBkZ05vZGUueCxcbiAgICAgICAgICAgICAgICAgICAgcmVmWTogZGdOb2RlLnksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmRvY01vdXNlTW92ZSk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuZG9jTW91c2VVcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFJlc2l6ZUVsZW1zKCkge1xuICAgICAgICB0aGlzLnJlRWxlbXMuZm9yRWFjaChlID0+IHRoaXMuc2hhZG93LmFwcGVuZENoaWxkKGUpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZVJlc2l6ZUVsZW1zKCkge1xuICAgICAgICB0aGlzLnJlRWxlbXMuZm9yRWFjaChlID0+IHRoaXMuc2hhZG93LnJlbW92ZUNoaWxkKGUpKTtcbiAgICB9XG5cbiAgICBnZXQgaGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpKTtcbiAgICB9XG5cbiAgICBzZXQgaGVpZ2h0KGhlaWdodDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBoZWlnaHQudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgZ2V0IHdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpKTtcbiAgICB9XG5cbiAgICBzZXQgd2lkdGgod2lkdGg6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3aWR0aC50b1N0cmluZygpKTtcbiAgICB9XG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKERnUmVzaXplYWJsZS5UQUcsIERnUmVzaXplYWJsZSk7XG4iLCJleHBvcnQgaW50ZXJmYWNlIE1vdXNlRHJhZyB7XG4gICAgcmVhZG9ubHkgZG93blg6IG51bWJlcjtcbiAgICByZWFkb25seSBkb3duWTogbnVtYmVyO1xuICAgIGN1clg6IG51bWJlcjtcbiAgICBjdXJZOiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdNb3VzZURyYWcoZTogTW91c2VFdmVudCk6IE1vdXNlRHJhZyB7XG4gICAgY29uc3QgeyBjbGllbnRYLCBjbGllbnRZIH0gPSBlO1xuICAgIHJldHVybiB7XG4gICAgICAgIGRvd25YOiBjbGllbnRYLFxuICAgICAgICBkb3duWTogY2xpZW50WSxcbiAgICAgICAgY3VyWDogY2xpZW50WCxcbiAgICAgICAgY3VyWTogY2xpZW50WSxcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkcmFnRGVsdGFzKGQ6IE1vdXNlRHJhZyk6IHsgZHg6IG51bWJlciwgZHk6IG51bWJlciB9IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBkeDogZC5jdXJYIC0gZC5kb3duWCxcbiAgICAgICAgZHk6IGQuY3VyWSAtIGQuZG93blksXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZHJhZ1VwZGF0ZShkOiBNb3VzZURyYWcsIGU6IE1vdXNlRXZlbnQpIHtcbiAgICBkLmN1clggPSBlLmNsaWVudFg7XG4gICAgZC5jdXJZID0gZS5jbGllbnRZO1xufVxuXG4iLCJpbXBvcnQgeyBMaW5lLCBsaW5lSW50ZXJzZWN0aW9uIH0gZnJvbSBcIi4vTGluZVwiO1xuaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi9Qb2ludFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJveCB7XG4gICAgcmVhZG9ubHkgeDogbnVtYmVyO1xuICAgIHJlYWRvbmx5IHk6IG51bWJlcjtcbiAgICByZWFkb25seSB3OiBudW1iZXI7XG4gICAgcmVhZG9ubHkgaDogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYm94RXF1YWxzKGIxOiBCb3gsIGIyOiBCb3gpOiBib29sZWFuIHtcbiAgICBpZiAoYjEgPT0gYjIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBiMS54ID09PSBiMi54ICYmXG4gICAgICAgIGIxLnkgPT09IGIyLnkgJiZcbiAgICAgICAgYjEudyA9PT0gYjIudyAmJlxuICAgICAgICBiMS5oID09PSBiMi5oO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYm94Q2VudGVyKGI6IEJveCk6IFBvaW50IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiBiLnggKyBNYXRoLnJvdW5kKGIudyAvIDIpLFxuICAgICAgICB5OiBiLnkgKyBNYXRoLnJvdW5kKGIuaCAvIDIpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBib3hUb0xpbmVzKGJveDogQm94KTogUmVhZG9ubHlBcnJheTxMaW5lPiB7XG4gICAgY29uc3QgeyB4LCB5ICwgdywgaCB9ID0gYm94O1xuICAgIHJldHVybiBbXG4gICAgICAgIHsgXG4gICAgICAgICAgICBmcm9tOiB7IHgsIHkgfSxcbiAgICAgICAgICAgIHRvOiB7IHg6IHggKyB3LCB5fVxuICAgICAgICB9LFxuICAgICAgICB7IFxuICAgICAgICAgICAgZnJvbTogeyB4OiB4ICsgdywgeX0sXG4gICAgICAgICAgICB0bzogeyB4OiB4ICsgdywgeTogeSArIGggfVxuICAgICAgICB9LFxuICAgICAgICB7IFxuICAgICAgICAgICAgZnJvbTogeyB4OiB4ICsgdywgeTogeSArIGggfSxcbiAgICAgICAgICAgIHRvOiB7IHgsIHk6IHkgKyBoIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHsgXG4gICAgICAgICAgICBmcm9tOiB7IHgsIHk6IHkgKyBoIH0sXG4gICAgICAgICAgICB0bzogeyB4LCB5IH0sXG4gICAgICAgIH0sXG4gICAgXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYm94SW50ZXJzZWN0aW9uKGJveDogQm94LCBsaW5lOiBMaW5lKTogUG9pbnQgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGxpbmVzID0gYm94VG9MaW5lcyhib3gpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHAgPSBsaW5lSW50ZXJzZWN0aW9uKGxpbmVzW2ldLCBsaW5lKTtcbiAgICAgICAgaWYgKHApIHtcbiAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4vUG9pbnRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBMaW5lIHtcbiAgICByZWFkb25seSBmcm9tOiBQb2ludDtcbiAgICByZWFkb25seSB0bzogUG9pbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5lSW50ZXJzZWN0aW9uKGwxOiBMaW5lLCBsMjogTGluZSk6IFBvaW50IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gaW50ZXJzZWN0KGwxLmZyb20ueCwgbDEuZnJvbS55LCBsMS50by54LCBsMS50by55LCBsMi5mcm9tLngsIGwyLmZyb20ueSwgbDIudG8ueCwgbDIudG8ueSk7XG59XG5cbi8vIGxpbmUgaW50ZXJjZXB0IG1hdGggYnkgUGF1bCBCb3Vya2UgaHR0cDovL3BhdWxib3Vya2UubmV0L2dlb21ldHJ5L3BvaW50bGluZXBsYW5lL1xuLy8gRGV0ZXJtaW5lIHRoZSBpbnRlcnNlY3Rpb24gcG9pbnQgb2YgdHdvIGxpbmUgc2VnbWVudHNcbi8vIFJldHVybiB1bmRlZmluZWQgaWYgdGhlIGxpbmVzIGRvbid0IGludGVyc2VjdFxuZnVuY3Rpb24gaW50ZXJzZWN0KHgxOiBudW1iZXIsIHkxOiBudW1iZXIsIHgyOiBudW1iZXIsIHkyOiBudW1iZXIsIHgzOiBudW1iZXIsIHkzOiBudW1iZXIsIHg0OiBudW1iZXIsIHk0OiBudW1iZXIpOiBQb2ludCB8IHVuZGVmaW5lZCB7XG5cbiAgICAvLyBDaGVjayBpZiBub25lIG9mIHRoZSBsaW5lcyBhcmUgb2YgbGVuZ3RoIDBcbiAgICAgIGlmICgoeDEgPT09IHgyICYmIHkxID09PSB5MikgfHwgKHgzID09PSB4NCAmJiB5MyA9PT0geTQpKSB7XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgXG4gICAgICBjb25zdCBkZW5vbWluYXRvciA9ICgoeTQgLSB5MykgKiAoeDIgLSB4MSkgLSAoeDQgLSB4MykgKiAoeTIgLSB5MSkpXG4gIFxuICAgIC8vIExpbmVzIGFyZSBwYXJhbGxlbFxuICAgICAgaWYgKGRlbm9taW5hdG9yID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgXG4gICAgICBsZXQgdWEgPSAoKHg0IC0geDMpICogKHkxIC0geTMpIC0gKHk0IC0geTMpICogKHgxIC0geDMpKSAvIGRlbm9taW5hdG9yXG4gICAgICBsZXQgdWIgPSAoKHgyIC0geDEpICogKHkxIC0geTMpIC0gKHkyIC0geTEpICogKHgxIC0geDMpKSAvIGRlbm9taW5hdG9yXG4gIFxuICAgIC8vIGlzIHRoZSBpbnRlcnNlY3Rpb24gYWxvbmcgdGhlIHNlZ21lbnRzXG4gICAgICBpZiAodWEgPCAwIHx8IHVhID4gMSB8fCB1YiA8IDAgfHwgdWIgPiAxKSB7XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgfVxuICBcbiAgICAvLyBSZXR1cm4gYSBvYmplY3Qgd2l0aCB0aGUgeCBhbmQgeSBjb29yZGluYXRlcyBvZiB0aGUgaW50ZXJzZWN0aW9uXG4gICAgICBsZXQgeCA9IHgxICsgdWEgKiAoeDIgLSB4MSlcbiAgICAgIGxldCB5ID0geTEgKyB1YSAqICh5MiAtIHkxKVxuICBcbiAgICAgIHJldHVybiB7eCwgeX1cbiAgfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQ3VzdG9tZXJBcHAgfSBmcm9tIFwiLi9jdXN0b21lci9DdXN0b21lckFwcFwiO1xuaW1wb3J0IHsgRGdEaWFncmFtIH0gZnJvbSBcIi4vZGlhZ3JhbS9EZ0RpYWdyYW1cIjtcbmltcG9ydCB7IERnRHJhZ2dhYmxlIH0gZnJvbSBcIi4vZGlhZ3JhbS9EZ0RyYWdnYWJsZVwiO1xuaW1wb3J0IHsgRGdMaW5rIH0gZnJvbSBcIi4vZGlhZ3JhbS9EZ0xpbmtcIjtcbmltcG9ydCB7IERnTm9kZSB9IGZyb20gXCIuL2RpYWdyYW0vRGdOb2RlXCI7XG5pbXBvcnQgeyBTY3JvbGxJdGVtIH0gZnJvbSBcIi4vdmlydHVhbC1zY3JvbGxlci9TY3JvbGxJdGVtXCI7XG5pbXBvcnQgeyBWaXJ0dWFsU2Nyb2xsZXIgfSBmcm9tIFwiLi92aXJ0dWFsLXNjcm9sbGVyL1ZpcnR1YWxTY3JvbGxlclwiO1xuaW1wb3J0IHtEZ1Jlc2l6ZWFibGV9IGZyb20gXCIuL2RpYWdyYW0vRGdSZXNpemVhYmxlXCI7XG5cbi8vIGp1c3QgZm9yIGltcG9ydHMgIVxuLy8gY29uc29sZS5sb2coJ3lhbGxhJywgQ3VzdG9tZXJBcHAuVEFHX05BTUUsIFZpcnR1YWxTY3JvbGxlci5UQUdfTkFNRSwgU2Nyb2xsSXRlbS5UQUdfTkFNRSwgRGdEaWFncmFtLlRBRywgRGdOb2RlLlRBRywgRGdEcmFnZ2FibGUuVEFHKTtcbmNvbnNvbGUubG9nKERnRGlhZ3JhbS5UQUcsIERnTm9kZS5UQUcsIERnRHJhZ2dhYmxlLlRBRywgRGdMaW5rLlRBRywgRGdSZXNpemVhYmxlLlRBRyk7XG5cbi8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZSA9PiB7XG4vLyAgICAgY29uc3QgYXBwOiBDdXN0b21lckFwcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSBhcyBDdXN0b21lckFwcDtcbi8vICAgICBjb25zb2xlLmxvZyhcImFwcCBsb2FkZWRcIiwgYXBwKTtcbi8vICAgICBhcHAuaW5pdChbXG4vLyAgICAgICAgIHsgZmlyc3ROYW1lOiAnVG90bycsIGxhc3ROYW1lOiAnQmlsb3V0ZScgfSxcbi8vICAgICAgICAgeyBmaXJzdE5hbWU6ICdGcmVuY2gnLCBsYXN0TmFtZTogJ0ZyaWVzJyB9LFxuLy8gICAgICAgICB7IGZpcnN0TmFtZTogJ0ZvbycsIGxhc3ROYW1lOiAnQmFyJyB9LFxuLy8gICAgIF0pXG4vLyB9KVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9