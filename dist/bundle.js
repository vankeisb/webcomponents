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

function deltas(ds) {
    return {
        deltaX: ds.curX - ds.downX,
        deltaY: ds.curY - ds.downY
    };
}
class DgDraggable extends HTMLElement {
    constructor() {
        super();
        const mouseMove = (e) => {
            if (this.dragState) {
                const { clientX, clientY } = e;
                this.dragState.curX = clientX;
                this.dragState.curY = clientY;
                const { deltaX, deltaY } = deltas(this.dragState);
                const dgNode = _DgNode__WEBPACK_IMPORTED_MODULE_0__.DgNode.getParentDgNode(this);
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
        this.addEventListener('mousedown', e => {
            const { clientX, clientY } = e;
            const dgNode = _DgNode__WEBPACK_IMPORTED_MODULE_0__.DgNode.getParentDgNode(this);
            if (dgNode) {
                this.dragState = {
                    downX: clientX,
                    downY: clientY,
                    curX: clientX,
                    curY: clientY,
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
        this.dgNode.style.left = this.x + 'px';
    }
    get y() {
        return (0,_SafeParseInt__WEBPACK_IMPORTED_MODULE_1__.safeParseInt)(this.getAttribute('y'));
    }
    set y(y) {
        this.setAttribute('y', y.toString());
        this.dgNode.style.top = this.y + 'px';
    }
    get h() {
        return (0,_SafeParseInt__WEBPACK_IMPORTED_MODULE_1__.safeParseInt)(this.getAttribute('h'));
    }
    get w() {
        return (0,_SafeParseInt__WEBPACK_IMPORTED_MODULE_1__.safeParseInt)(this.getAttribute('w'));
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



const MIN_SIZE = 10;
const BORDER_SIZE = 2;
function deltas(ds) {
    return {
        deltaX: ds.curX - ds.downX,
        deltaY: ds.curY - ds.downY
    };
}
class DgResizeable extends HTMLElement {
    constructor() {
        super();
        this.docMouseMove = (e) => {
            if (this.dragState) {
                const { clientX, clientY } = e;
                this.dragState.curX = clientX;
                this.dragState.curY = clientY;
                const { deltaX, deltaY } = deltas(this.dragState);
                console.log("moved", deltaX, deltaY);
            }
        };
        this.docMouseUp = (e) => {
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
        const reLeft = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_2__.div)({ className: 'dg-resize-elem ' });
        reLeft.style.top = "2px";
        reLeft.style.bottom = "2px";
        reLeft.style.left = "0";
        reLeft.style.width = "2px";
        reLeft.style.cursor = "ew-resize";
        const reRight = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_2__.div)({ className: 'dg-resize-elem ' });
        reRight.style.top = "2px";
        reRight.style.bottom = "2px";
        reRight.style.right = "0";
        reRight.style.width = "2px";
        reRight.style.cursor = "ew-resize";
        const reTopLeft = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_2__.div)({ className: 'dg-resize-elem ' });
        reTopLeft.style.top = "0";
        reTopLeft.style.left = "0";
        reTopLeft.style.width = "2px";
        reTopLeft.style.height = "2px";
        reTopLeft.style.cursor = "nwse-resize";
        const reTopRight = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_2__.div)({ className: 'dg-resize-elem ' });
        reTopRight.style.top = "0";
        reTopRight.style.right = "0";
        reTopRight.style.width = "2px";
        reTopRight.style.height = "2px";
        reTopRight.style.cursor = "nesw-resize";
        const reBottomLeft = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_2__.div)({ className: 'dg-resize-elem ' });
        reBottomLeft.style.bottom = "0";
        reBottomLeft.style.left = "0";
        reBottomLeft.style.width = "2px";
        reBottomLeft.style.height = "2px";
        reBottomLeft.style.cursor = "nesw-resize";
        const reBottomRight = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_2__.div)({ className: 'dg-resize-elem ' });
        reBottomRight.style.bottom = "0";
        reBottomRight.style.right = "0";
        reBottomRight.style.width = "2px";
        reBottomRight.style.height = "2px";
        reBottomRight.style.cursor = "nwse-resize";
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
            const { clientX, clientY } = e;
            const dgNode = _DgNode__WEBPACK_IMPORTED_MODULE_1__.DgNode.getParentDgNode(this);
            if (dgNode) {
                this.dragState = {
                    mode,
                    downX: clientX,
                    downY: clientY,
                    curX: clientX,
                    curY: clientY,
                    refW: dgNode.w,
                    refH: dgNode.h,
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
    // private addResizeElems() {
    //     empty(this.shadow);
    //     const dgNode = DgNode.getParentDgNode(this);
    //     const { x, y, w, h } = dgNode;
    //     if (w >= MIN_SIZE && h >= MIN_SIZE) {
    //         const leftTopDiv = div({
    //             className: 'dg-resizer-left-top',
    //             style: {
    //                 // backgroundColor: 'red',
    //                 position: 'absolute',
    //                 left: px(x),
    //                 top: px(y),
    //                 height: px(2),
    //                 width: px(2)
    //             }
    //         });
    //         // this.shadow.appendChild(leftTopDiv);
    //         // const leftDiv = div({ className: 'dg-resizer-left'});
    //     }
    //
    // }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SSxFQUFFLEdBQUcsQ0FBQyxFQUFFO1FBQ3RDLE9BQU8sU0FBUztLQUNuQjtJQUVILG1FQUFtRTtJQUNqRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUUzQixPQUFPLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQztBQUNqQixDQUFDOzs7Ozs7O1VDekNIO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTGdEO0FBQ0k7QUFDVjtBQUNBO0FBR1U7QUFFcEQscUJBQXFCO0FBQ3JCLHlJQUF5STtBQUN6SSxPQUFPLENBQUMsR0FBRyxDQUFDLDZEQUFhLEVBQUUsdURBQVUsRUFBRSxpRUFBZSxFQUFFLHVEQUFVLEVBQUUsbUVBQWdCLENBQUMsQ0FBQztBQUV0Rix5Q0FBeUM7QUFDekMsOEVBQThFO0FBQzlFLHNDQUFzQztBQUN0QyxpQkFBaUI7QUFDakIsc0RBQXNEO0FBQ3RELHNEQUFzRDtBQUN0RCxpREFBaUQ7QUFDakQsU0FBUztBQUNULEtBQUsiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL1NhZmVQYXJzZUludC50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2J1aWxkZXIvSHRtbEJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy9kaWFncmFtL0RnRGlhZ3JhbS50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2RpYWdyYW0vRGdEcmFnZ2FibGUudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy9kaWFncmFtL0RnTGluay50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2RpYWdyYW0vRGdOb2RlLnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvZGlhZ3JhbS9EZ1Jlc2l6ZWFibGUudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy9kaWFncmFtL2dlb21ldHJ5L0JveC50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2RpYWdyYW0vZ2VvbWV0cnkvTGluZS50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gc2FmZVBhcnNlSW50KHM6c3RyaW5nIHwgbnVsbCk6IG51bWJlciB7XG4gICAgY29uc3QgaSA9IHBhcnNlSW50KHMpO1xuICAgIGlmIChpc05hTihpKSkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIGk7XG59IiwiZXhwb3J0IHR5cGUgRGVlcFBhcnRpYWw8VD4gPSBQYXJ0aWFsPHsgW1AgaW4ga2V5b2YgVF06IERlZXBQYXJ0aWFsPFRbUF0+IH0+O1xuXG50eXBlIE5vZGVCdWlsZGVyPEsgZXh0ZW5kcyBrZXlvZiBIVE1MRWxlbWVudFRhZ05hbWVNYXA+ID0gKFxuICBhOiBEZWVwUGFydGlhbDxIVE1MRWxlbWVudFRhZ05hbWVNYXBbS10+LFxuICAuLi5jOiBOb2RlW11cbikgPT4gSFRNTEVsZW1lbnRUYWdOYW1lTWFwW0tdO1xuXG5leHBvcnQgZnVuY3Rpb24gbm9kZTxLIGV4dGVuZHMga2V5b2YgSFRNTEVsZW1lbnRUYWdOYW1lTWFwPih0YWc6IEspOiBOb2RlQnVpbGRlcjxLPiB7XG4gIHJldHVybiAoYTogRGVlcFBhcnRpYWw8SFRNTEVsZW1lbnRUYWdOYW1lTWFwW0tdPiwgLi4uYzogTm9kZVtdKSA9PiB7XG4gICAgY29uc3QgbjogSFRNTEVsZW1lbnRUYWdOYW1lTWFwW0tdID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgIGMuZm9yRWFjaCgoY2hpbGQpID0+IG4uYXBwZW5kQ2hpbGQoY2hpbGQpKTtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoYSkgYXMgQXJyYXk8a2V5b2YgdHlwZW9mIGE+O1xuICAgIGtleXMuZm9yRWFjaCgoaykgPT4gc2V0UHJvcGVydHkobiwgaywgZ2V0UHJvcGVydHkoYSwgaykpKTtcbiAgICByZXR1cm4gbjtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0UHJvcGVydHk8VCwgSyBleHRlbmRzIGtleW9mIFQ+KG86IFQsIGtleTogSyk6IFRbS10ge1xuICByZXR1cm4gb1trZXldO1xufVxuXG5mdW5jdGlvbiBzZXRQcm9wZXJ0eTxULCBLIGV4dGVuZHMga2V5b2YgVD4obzogVCwga2V5OiBLLCB2YWx1ZTogVFtLXSk6IHZvaWQge1xuICBvW2tleV0gPSB2YWx1ZTtcbn1cblxuZXhwb3J0IGNvbnN0IGRpdiA9IG5vZGUoJ2RpdicpO1xuZXhwb3J0IGNvbnN0IHNwYW4gPSBub2RlKCdzcGFuJyk7XG5leHBvcnQgY29uc3QgYSA9IG5vZGUoJ2EnKTtcbmV4cG9ydCBjb25zdCBwID0gbm9kZSgncCcpO1xuZXhwb3J0IGNvbnN0IGgxID0gbm9kZSgnaDEnKTtcbmV4cG9ydCBjb25zdCBpbnB1dCA9IG5vZGUoJ2lucHV0Jyk7XG5leHBvcnQgY29uc3QgbGFiZWwgPSBub2RlKCdsYWJlbCcpO1xuZXhwb3J0IGNvbnN0IHNsb3QgPSBub2RlKCdzbG90Jyk7XG5leHBvcnQgY29uc3Qgc3R5bGUgPSBub2RlKCdzdHlsZScpO1xuXG5leHBvcnQgZnVuY3Rpb24gdGV4dChzOiBzdHJpbmcpOiBUZXh0IHtcbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW1wdHkoZTogTm9kZSkge1xuICB3aGlsZShlLmZpcnN0Q2hpbGQpIHtcbiAgICBlLnJlbW92ZUNoaWxkKGUuZmlyc3RDaGlsZCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHB4KG46IG51bWJlcik6IHN0cmluZyB7XG4gIHJldHVybiBuICsgJ3B4Jztcbn1cbiIsImltcG9ydCB7IGRpdiwgc2xvdCwgc3R5bGUsIHRleHQgfSBmcm9tIFwiLi4vYnVpbGRlci9IdG1sQnVpbGRlclwiO1xuaW1wb3J0IHsgRGdMaW5rIH0gZnJvbSBcIi4vRGdMaW5rXCI7XG5pbXBvcnQgeyBEZ05vZGUgfSBmcm9tIFwiLi9EZ05vZGVcIjtcblxuY29uc3QgU1ZHX05TID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcblxuY29uc3QgZGlhZ1N0eWxlcyA9IGBcbiAgICAuZGctZGlhZ3JhbSB7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIH1cbiAgICAuZGctc2Nyb2xsLXBhbmUge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgfVxuICAgIC5kZy1saW5rcyB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgfVxuICAgIC5kZy1jb250ZW50LXBhbmUge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyZXk7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB9XG5gO1xuXG5jb25zdCBzdmdEZWZzID0gYFxuPG1hcmtlciBpZD1cImFycm93aGVhZFwiIG1hcmtlcldpZHRoPVwiMTBcIiBtYXJrZXJIZWlnaHQ9XCI3XCIgXG5yZWZYPVwiOVwiIHJlZlk9XCIzLjVcIiBvcmllbnQ9XCJhdXRvXCI+XG4gICAgPHBvbHlnb24gcG9pbnRzPVwiMCAwLCAxMCAzLjUsIDAgN1wiIC8+XG48L21hcmtlcj5cbmBcblxuZXhwb3J0IGNsYXNzIERnRGlhZ3JhbSBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICAgIHN0YXRpYyBUQUcgPSBcImRnLWRpYWdyYW1cIlxuXG4gICAgcHJpdmF0ZSBsaW5rc1N2ZzogU1ZHRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhTVkdfTlMsICdzdmcnKTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBjb25zdCBzaGFkb3cgPSB0aGlzLmF0dGFjaFNoYWRvdyh7bW9kZTogJ29wZW4nfSk7XG5cbiAgICAgICAgdGhpcy5saW5rc1N2Zy5jbGFzc0xpc3QuYWRkKCdkZy1saW5rcycpO1xuICAgICAgICBjb25zdCBkZWZzOiBTVkdEZWZzRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhTVkdfTlMsICdzdmcnKTtcbiAgICAgICAgZGVmcy5pbm5lckhUTUwgPSBzdmdEZWZzO1xuICAgICAgICB0aGlzLmxpbmtzU3ZnLmFwcGVuZENoaWxkKGRlZnMpO1xuICAgICAgICBjb25zdCBsaW5rc1Nsb3Q6IEhUTUxTbG90RWxlbWVudCA9IHNsb3QoeyBuYW1lOiBcImxpbmtzXCJ9KVxuICAgICAgICB0aGlzLmxpbmtzU3ZnLmFwcGVuZENoaWxkKGxpbmtzU2xvdCk7XG5cbiAgICAgICAgY29uc3Qgc2Nyb2xsUGFuZSA9IGRpdihcbiAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnZGctc2Nyb2xsLXBhbmUnIH0sXG4gICAgICAgICAgICB0aGlzLmxpbmtzU3ZnLFxuICAgICAgICAgICAgc2xvdCh7fSksXG4gICAgICAgICk7XG5cbiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKHNjcm9sbFBhbmUpO1xuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQoc3R5bGUoe30sIHRleHQoZGlhZ1N0eWxlcykpKTtcbiAgICB9XG5cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB9XG5cbiAgICBnZXREZ05vZGVzKCk6IFJlYWRvbmx5QXJyYXk8RGdOb2RlPiB7XG4gICAgICAgIGNvbnN0IHEgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGw8RGdOb2RlPihEZ05vZGUuVEFHKTtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20ocSk7XG4gICAgfVxuXG4gICAgZ2V0Tm9kZUJ5SWQoaWQ6IHN0cmluZyk6IERnTm9kZSB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERnTm9kZXMoKS5maW5kKG4gPT4gbi5pZCA9PT0gaWQpO1xuICAgIH1cblxuICAgIGdldERnTGlua3MoKTogUmVhZG9ubHlBcnJheTxEZ0xpbms+IHtcbiAgICAgICAgY29uc3QgcSA9IHRoaXMucXVlcnlTZWxlY3RvckFsbDxEZ0xpbms+KERnTGluay5UQUcpO1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShxKTtcbiAgICB9XG5cbiAgICByZWdpc3RlckxpbmsobGluazogRGdMaW5rKSB7XG4gICAgICAgIGNvbnN0IGxpbmUgPSBsaW5rLmRyYXdMaW5rKHRoaXMuZ2V0Tm9kZUJ5SWQobGluay5mcm9tKSwgdGhpcy5nZXROb2RlQnlJZChsaW5rLnRvKSk7XG4gICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKFwiZnJvbVwiLCBsaW5rLmZyb20pO1xuICAgICAgICBsaW5lLnNldEF0dHJpYnV0ZShcInRvXCIsIGxpbmsudG8pO1xuICAgICAgICB0aGlzLmxpbmtzU3ZnLmFwcGVuZENoaWxkKGxpbmUpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyTm9kZShub2RlOiBEZ05vZGUpIHtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3ZlZCcsICgpID0+IHtcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBhbGwgbGlua3NcbiAgICAgICAgICAgIHRoaXMubGlua3NTdmcucXVlcnlTZWxlY3RvckFsbChcImxpbmVcIilcbiAgICAgICAgICAgICAgICAuZm9yRWFjaChsaW5lID0+IGxpbmUucmVtb3ZlKCkpO1xuICAgICAgICAgICAgLy8gYWRkIG5ld1xuICAgICAgICAgICAgdGhpcy5nZXREZ0xpbmtzKClcbiAgICAgICAgICAgICAgICAuZm9yRWFjaChsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGluZSA9IGwuZHJhd0xpbmsodGhpcy5nZXROb2RlQnlJZChsLmZyb20pLCB0aGlzLmdldE5vZGVCeUlkKGwudG8pKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saW5rc1N2Zy5hcHBlbmRDaGlsZChsaW5lKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldFBhcmVudERnRGlhZ3JhbShmcm9tOiBIVE1MRWxlbWVudCk6IERnRGlhZ3JhbSB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmIChmcm9tLnBhcmVudEVsZW1lbnQgaW5zdGFuY2VvZiBEZ0RpYWdyYW0pIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZyb20ucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIERnRGlhZ3JhbS5nZXRQYXJlbnREZ0RpYWdyYW0oZnJvbS5wYXJlbnRFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRGdEaWFncmFtLlRBRywgRGdEaWFncmFtKTtcbiIsImltcG9ydCB7IGRpdiwgc2xvdCwgc3R5bGUsIHRleHQgfSBmcm9tIFwiLi4vYnVpbGRlci9IdG1sQnVpbGRlclwiO1xuaW1wb3J0IHsgRGdOb2RlIH0gZnJvbSBcIi4vRGdOb2RlXCI7XG5cbmludGVyZmFjZSBEcmFnU3RhdGUge1xuICAgIHJlYWRvbmx5IHJlZlg6IG51bWJlcjtcbiAgICByZWFkb25seSByZWZZOiBudW1iZXI7XG4gICAgcmVhZG9ubHkgZG93blg6IG51bWJlcjtcbiAgICByZWFkb25seSBkb3duWTogbnVtYmVyO1xuICAgIGN1clg6IG51bWJlcjtcbiAgICBjdXJZOiBudW1iZXI7XG59XG5cbmZ1bmN0aW9uIGRlbHRhcyhkczpEcmFnU3RhdGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBkZWx0YVg6IGRzLmN1clggLSBkcy5kb3duWCxcbiAgICAgICAgZGVsdGFZOiBkcy5jdXJZIC0gZHMuZG93bllcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEZ0RyYWdnYWJsZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICAgIHN0YXRpYyBUQUcgPSBcImRnLWRyYWdnYWJsZVwiO1xuXG4gICAgcHJpdmF0ZSBkcmFnU3RhdGU6IERyYWdTdGF0ZSB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGNvbnN0IG1vdXNlTW92ZSA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5kcmFnU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGNsaWVudFgsIGNsaWVudFkgfSA9IGU7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnU3RhdGUuY3VyWCA9IGNsaWVudFg7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnU3RhdGUuY3VyWSA9IGNsaWVudFk7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkZWx0YVgsIGRlbHRhWSB9ID0gZGVsdGFzKHRoaXMuZHJhZ1N0YXRlKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkZ05vZGUgPSBEZ05vZGUuZ2V0UGFyZW50RGdOb2RlKHRoaXMpO1xuICAgICAgICAgICAgICAgIGlmIChkZ05vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGdOb2RlLnggPSB0aGlzLmRyYWdTdGF0ZS5yZWZYICsgZGVsdGFYO1xuICAgICAgICAgICAgICAgICAgICBkZ05vZGUueSA9IHRoaXMuZHJhZ1N0YXRlLnJlZlkgKyBkZWx0YVk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbW91c2VVcCA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZU1vdmUpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNlVXApO1xuICAgICAgICAgICAgdGhpcy5kcmFnU3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGUgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBjbGllbnRYLCBjbGllbnRZIH0gPSBlO1xuICAgICAgICAgICAgY29uc3QgZGdOb2RlID0gRGdOb2RlLmdldFBhcmVudERnTm9kZSh0aGlzKTtcbiAgICAgICAgICAgIGlmIChkZ05vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZG93blg6IGNsaWVudFgsXG4gICAgICAgICAgICAgICAgICAgIGRvd25ZOiBjbGllbnRZLFxuICAgICAgICAgICAgICAgICAgICBjdXJYOiBjbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICBjdXJZOiBjbGllbnRZLFxuICAgICAgICAgICAgICAgICAgICByZWZYOiBkZ05vZGUueCxcbiAgICAgICAgICAgICAgICAgICAgcmVmWTogZGdOb2RlLnksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZU1vdmUpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRGdEcmFnZ2FibGUuVEFHLCBEZ0RyYWdnYWJsZSk7XG4iLCJpbXBvcnQgeyBlbXB0eSwgbm9kZSB9IGZyb20gXCIuLi9idWlsZGVyL0h0bWxCdWlsZGVyXCI7XG5pbXBvcnQgeyBib3hDZW50ZXIsIGJveEludGVyc2VjdGlvbiB9IGZyb20gXCIuL2dlb21ldHJ5L0JveFwiO1xuaW1wb3J0IHsgRGdEaWFncmFtIH0gZnJvbSBcIi4vRGdEaWFncmFtXCI7XG5pbXBvcnQgeyBEZ05vZGUgfSBmcm9tIFwiLi9EZ05vZGVcIjtcbmltcG9ydCB7IExpbmUsIGxpbmVJbnRlcnNlY3Rpb24gfSBmcm9tIFwiLi9nZW9tZXRyeS9MaW5lXCI7XG5cbmNvbnN0IFNWR19OUyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG5cbmV4cG9ydCBjbGFzcyBEZ0xpbmsgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cbiAgICBzdGF0aWMgVEFHID0gJ2RnLWxpbmsnO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgRGdEaWFncmFtLmdldFBhcmVudERnRGlhZ3JhbSh0aGlzKS5yZWdpc3RlckxpbmsodGhpcyk7XG4gICAgfVxuXG4gICAgZHJhd0xpbmsoZnJvbU5vZGU6IERnTm9kZSwgdG9Ob2RlOiBEZ05vZGUpOiBTVkdMaW5lRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGZyb21Cb3ggPSBmcm9tTm9kZS5nZXRCb3goKTtcbiAgICAgICAgY29uc3QgdG9Cb3ggPSB0b05vZGUuZ2V0Qm94KCk7XG4gICAgICAgIGNvbnN0IGNlbnRlcjEgPSBib3hDZW50ZXIoZnJvbUJveCk7XG4gICAgICAgIGNvbnN0IGNlbnRlcjIgPSBib3hDZW50ZXIodG9Cb3gpO1xuXG4gICAgICAgIGNvbnN0IGxpbmU6IExpbmUgPSB7XG4gICAgICAgICAgICBmcm9tOiBjZW50ZXIxLFxuICAgICAgICAgICAgdG86IGNlbnRlcjIsXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXNlY3QxID0gYm94SW50ZXJzZWN0aW9uKGZyb21Cb3gsIGxpbmUpO1xuICAgICAgICBjb25zdCBpc2VjdDIgPSBib3hJbnRlcnNlY3Rpb24odG9Cb3gsIGxpbmUpO1xuXG4gICAgICAgIGNvbnN0IGZyb21Qb2ludCA9IGlzZWN0MSB8fCBjZW50ZXIxO1xuICAgICAgICBjb25zdCB0b1BvaW50ID0gaXNlY3QyIHx8IGNlbnRlcjI7XG5cbiAgICAgICAgY29uc3Qgc3ZnTGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhTVkdfTlMsICdsaW5lJyk7XG4gICAgICAgIHN2Z0xpbmUuc2V0QXR0cmlidXRlKCd4MScsIGZyb21Qb2ludC54LnRvU3RyaW5nKCkpO1xuICAgICAgICBzdmdMaW5lLnNldEF0dHJpYnV0ZSgneDInLCB0b1BvaW50LngudG9TdHJpbmcoKSk7XG4gICAgICAgIHN2Z0xpbmUuc2V0QXR0cmlidXRlKCd5MScsIGZyb21Qb2ludC55LnRvU3RyaW5nKCkpO1xuICAgICAgICBzdmdMaW5lLnNldEF0dHJpYnV0ZSgneTInLCB0b1BvaW50LnkudG9TdHJpbmcoKSk7XG4gICAgICAgIHN2Z0xpbmUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCAnYmxhY2snKTtcbiAgICAgICAgc3ZnTGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsICcyJyk7XG4gICAgICAgIHN2Z0xpbmUuc2V0QXR0cmlidXRlKCdtYXJrZXItZW5kJywgJ3VybCgjYXJyb3doZWFkKScpO1xuXG4gICAgICAgIHJldHVybiBzdmdMaW5lO1xuICAgIH1cblxuICAgIGdldCBmcm9tKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnZnJvbScpO1xuICAgIH1cblxuICAgIGdldCB0bygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RvJyk7XG4gICAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRGdMaW5rLlRBRywgRGdMaW5rKVxuIiwiaW1wb3J0IHsgZGl2LCBzbG90LCBzdHlsZSwgdGV4dCB9IGZyb20gXCIuLi9idWlsZGVyL0h0bWxCdWlsZGVyXCI7XG5pbXBvcnQgeyBzYWZlUGFyc2VJbnQgfSBmcm9tIFwiLi4vU2FmZVBhcnNlSW50XCI7XG5pbXBvcnQgeyBCb3gsIGJveEVxdWFscyB9IGZyb20gXCIuL2dlb21ldHJ5L0JveFwiO1xuaW1wb3J0IHsgRGdEaWFncmFtIH0gZnJvbSBcIi4vRGdEaWFncmFtXCI7XG5cbmNvbnN0IGNzcyA9IGBcbiAgICAuZGctbm9kZSB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgZGlzcGxheTogZmxleDsgICBcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsgICAgXG4gICAgfVxuYDtcblxuZXhwb3J0IGNsYXNzIERnTm9kZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICAgIHN0YXRpYyBUQUcgPSBcImRnLW5vZGVcIjtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgZGdOb2RlOiBIVE1MRGl2RWxlbWVudDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRnU2xvdDogSFRNTFNsb3RFbGVtZW50O1xuICAgIHByaXZhdGUgbW91c2VEb3duQm94OiBCb3ggfCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgY29uc3Qgc2hhZG93ID0gdGhpcy5hdHRhY2hTaGFkb3coe21vZGU6J29wZW4nfSk7XG4gICAgICAgIHRoaXMuZGdTbG90ID0gc2xvdCh7fSk7XG4gICAgICAgIHRoaXMuZGdOb2RlID0gZGl2KHtjbGFzc05hbWU6ICdkZy1ub2RlJ30sIHRoaXMuZGdTbG90KTtcbiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKHRoaXMuZGdOb2RlKTtcbiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKHN0eWxlKHt9LCB0ZXh0KGNzcykpKTtcbiAgICB9XG5cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgY29uc3QgcyA9IHRoaXMuZGdOb2RlLnN0eWxlO1xuICAgICAgICBzLmxlZnQgPSB0aGlzLnggKyBcInB4XCI7XG4gICAgICAgIHMudG9wID0gdGhpcy55ICsgXCJweFwiO1xuICAgICAgICBzLndpZHRoID0gdGhpcy53ICsgXCJweFwiO1xuICAgICAgICBzLmhlaWdodCA9IHRoaXMuaCArIFwicHhcIjtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1vdXNlZG93blwiLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMubW91c2VEb3duQm94ID0gdGhpcy5nZXRCb3goKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibW91c2V1cFwiLCB0aGlzKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm1vdXNlRG93bkJveCkge1xuICAgICAgICAgICAgICAgIGlmIChib3hFcXVhbHModGhpcy5nZXRCb3goKSwgdGhpcy5tb3VzZURvd25Cb3gpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAhdGhpcy5zZWxlY3RlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1vdXNlRG93bkJveCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZ2V0RGdEaWFncmFtKCkucmVnaXN0ZXJOb2RlKHRoaXMpO1xuICAgIH1cblxuICAgIGdldEJveCgpOiBCb3gge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogdGhpcy54LFxuICAgICAgICAgICAgeTogdGhpcy55LFxuICAgICAgICAgICAgdzogdGhpcy53LFxuICAgICAgICAgICAgaDogdGhpcy5oLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIHJldHVybiBbJ3gnLCAneScsICdoJywgJ3cnXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZpcmVNb3ZlZCgpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgICAgbmV3IEN1c3RvbUV2ZW50KFxuICAgICAgICAgICAgICAgICdtb3ZlZCcsXG4gICAgICAgICAgICAgICAgeyBkZXRhaWw6IHRoaXMgfVxuICAgICAgICAgICAgKVxuICAgICAgICApXG4gICAgfVxuXG4gICAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWU6IHN0cmluZywgb2xkVmFsdWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBzID0gdGhpcy5kZ05vZGUuc3R5bGU7XG4gICAgICAgIGlmIChvbGRWYWx1ZSA9PT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3gnOiB7XG4gICAgICAgICAgICAgICAgcy5sZWZ0ID0gdGhpcy54ICsgJ3B4JztcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmVNb3ZlZCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAneSc6IHtcbiAgICAgICAgICAgICAgICBzLnRvcCA9IHRoaXMueSArICdweCc7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlTW92ZWQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ3cnOiB7XG4gICAgICAgICAgICAgICAgcy53aWR0aCA9IHRoaXMudyArICdweCc7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlTW92ZWQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ2gnOiB7XG4gICAgICAgICAgICAgICAgcy5oZWlnaHQgPSB0aGlzLmggKyAncHgnO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZU1vdmVkKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICB9XG5cbiAgICBnZXQgeCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc2FmZVBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCd4JykpO1xuICAgIH1cblxuICAgIHNldCB4KHg6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgneCcsIHgudG9TdHJpbmcoKSk7XG4gICAgICAgIHRoaXMuZGdOb2RlLnN0eWxlLmxlZnQgPSB0aGlzLnggKyAncHgnO1xuICAgIH1cblxuICAgIGdldCB5KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ3knKSk7XG4gICAgfVxuXG4gICAgc2V0IHkoeTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd5JywgeS50b1N0cmluZygpKTtcbiAgICAgICAgdGhpcy5kZ05vZGUuc3R5bGUudG9wID0gdGhpcy55ICsgJ3B4JztcbiAgICB9XG5cbiAgICBnZXQgaCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc2FmZVBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCdoJykpO1xuICAgIH1cblxuICAgIGdldCB3KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ3cnKSk7XG4gICAgfVxuXG4gICAgZ2V0IHNlbGVjdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGVkKHM6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdzZWxlY3RlZCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0RGdEaWFncmFtKCk6IERnRGlhZ3JhbSB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiBEZ0RpYWdyYW0uZ2V0UGFyZW50RGdEaWFncmFtKHRoaXMpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRQYXJlbnREZ05vZGUoZnJvbTogSFRNTEVsZW1lbnQpOiBEZ05vZGUgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoZnJvbS5wYXJlbnRFbGVtZW50IGluc3RhbmNlb2YgRGdOb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbS5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIGlmIChmcm9tLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBEZ05vZGUuZ2V0UGFyZW50RGdOb2RlKGZyb20ucGFyZW50RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cblxuXG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShEZ05vZGUuVEFHLCBEZ05vZGUpO1xuIiwiaW1wb3J0IHtzYWZlUGFyc2VJbnR9IGZyb20gXCIuLi9TYWZlUGFyc2VJbnRcIjtcbmltcG9ydCB7RGdOb2RlfSBmcm9tIFwiLi9EZ05vZGVcIjtcbmltcG9ydCB7ZGl2LCBlbXB0eSwgcHgsIHNsb3QsIHN0eWxlLCB0ZXh0fSBmcm9tIFwiLi4vYnVpbGRlci9IdG1sQnVpbGRlclwiO1xuXG5jb25zdCBNSU5fU0laRSA9IDEwO1xuY29uc3QgQk9SREVSX1NJWkUgPSAyO1xuXG50eXBlIERyYWdNb2RlID1cbiAgICB8ICd0b3AnXG4gICAgfCAnYm90dG9tJ1xuICAgIHwgJ2xlZnQnXG4gICAgfCAncmlnaHQnXG4gICAgfCAndG9wLWxlZnQnXG4gICAgfCAndG9wLXJpZ2h0J1xuICAgIHwgJ2JvdHRvbS1sZWZ0J1xuICAgIHwgJ2JvdHRvbS1yaWdodCdcblxuaW50ZXJmYWNlIFJlc2l6ZVN0YXRlIHtcbiAgICByZWFkb25seSByZWZXOiBudW1iZXI7XG4gICAgcmVhZG9ubHkgcmVmSDogbnVtYmVyO1xuICAgIHJlYWRvbmx5IGRvd25YOiBudW1iZXI7XG4gICAgcmVhZG9ubHkgZG93blk6IG51bWJlcjtcbiAgICBjdXJYOiBudW1iZXI7XG4gICAgY3VyWTogbnVtYmVyO1xuICAgIHJlYWRvbmx5IG1vZGU6IERyYWdNb2RlO1xufVxuXG5mdW5jdGlvbiBkZWx0YXMoZHM6UmVzaXplU3RhdGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBkZWx0YVg6IGRzLmN1clggLSBkcy5kb3duWCxcbiAgICAgICAgZGVsdGFZOiBkcy5jdXJZIC0gZHMuZG93bllcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEZ1Jlc2l6ZWFibGUgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cbiAgICBzdGF0aWMgVEFHID0gJ2RnLXJlc2l6ZWFibGUnO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBzaGFkb3c6IFNoYWRvd1Jvb3Q7XG4gICAgcHJpdmF0ZSByZWFkb25seSByZUVsZW1zOiBSZWFkb25seUFycmF5PEhUTUxEaXZFbGVtZW50PjtcblxuICAgIHByaXZhdGUgZHJhZ1N0YXRlOiBSZXNpemVTdGF0ZSB8IHVuZGVmaW5lZDtcblxuICAgIHByaXZhdGUgZG9jTW91c2VNb3ZlID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ1N0YXRlKSB7XG4gICAgICAgICAgICBjb25zdCB7IGNsaWVudFgsIGNsaWVudFkgfSA9IGU7XG4gICAgICAgICAgICB0aGlzLmRyYWdTdGF0ZS5jdXJYID0gY2xpZW50WDtcbiAgICAgICAgICAgIHRoaXMuZHJhZ1N0YXRlLmN1clkgPSBjbGllbnRZO1xuICAgICAgICAgICAgY29uc3QgeyBkZWx0YVgsIGRlbHRhWSB9ID0gZGVsdGFzKHRoaXMuZHJhZ1N0YXRlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibW92ZWRcIiwgZGVsdGFYLCBkZWx0YVkpO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRvY01vdXNlVXAgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcInVwICFcIik7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuZG9jTW91c2VNb3ZlKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuZG9jTW91c2VVcCk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc2hhZG93ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgICAgIHRoaXMuc2hhZG93LmFwcGVuZENoaWxkKHNsb3Qoe30pKTtcblxuICAgICAgICBjb25zdCByZVRvcCA9IGRpdih7IGNsYXNzTmFtZTogJ2RnLXJlc2l6ZS1lbGVtICd9KTtcbiAgICAgICAgcmVUb3Auc3R5bGUudG9wID0gXCIwXCI7XG4gICAgICAgIHJlVG9wLnN0eWxlLmxlZnQgPSBcIjJweFwiO1xuICAgICAgICByZVRvcC5zdHlsZS5yaWdodCA9IFwiMnB4XCI7XG4gICAgICAgIHJlVG9wLnN0eWxlLmhlaWdodCA9IFwiMnB4XCI7XG4gICAgICAgIHJlVG9wLnN0eWxlLmN1cnNvciA9IFwibnMtcmVzaXplXCI7XG4gICAgICAgIHJlVG9wLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25SZU1vdXNlRG93bigndG9wJykpO1xuXG4gICAgICAgIGNvbnN0IHJlQm90dG9tID0gZGl2KHsgY2xhc3NOYW1lOiAnZGctcmVzaXplLWVsZW0gJ30pO1xuICAgICAgICByZUJvdHRvbS5zdHlsZS5ib3R0b20gPSBcIjBcIjtcbiAgICAgICAgcmVCb3R0b20uc3R5bGUubGVmdCA9IFwiMnB4XCI7XG4gICAgICAgIHJlQm90dG9tLnN0eWxlLnJpZ2h0ID0gXCIycHhcIjtcbiAgICAgICAgcmVCb3R0b20uc3R5bGUuaGVpZ2h0ID0gXCIycHhcIjtcbiAgICAgICAgcmVCb3R0b20uc3R5bGUuY3Vyc29yID0gXCJucy1yZXNpemVcIjtcblxuICAgICAgICBjb25zdCByZUxlZnQgPSBkaXYoeyBjbGFzc05hbWU6ICdkZy1yZXNpemUtZWxlbSAnfSk7XG4gICAgICAgIHJlTGVmdC5zdHlsZS50b3AgPSBcIjJweFwiO1xuICAgICAgICByZUxlZnQuc3R5bGUuYm90dG9tID0gXCIycHhcIjtcbiAgICAgICAgcmVMZWZ0LnN0eWxlLmxlZnQgPSBcIjBcIjtcbiAgICAgICAgcmVMZWZ0LnN0eWxlLndpZHRoID0gXCIycHhcIjtcbiAgICAgICAgcmVMZWZ0LnN0eWxlLmN1cnNvciA9IFwiZXctcmVzaXplXCI7XG5cbiAgICAgICAgY29uc3QgcmVSaWdodCA9IGRpdih7IGNsYXNzTmFtZTogJ2RnLXJlc2l6ZS1lbGVtICd9KTtcbiAgICAgICAgcmVSaWdodC5zdHlsZS50b3AgPSBcIjJweFwiO1xuICAgICAgICByZVJpZ2h0LnN0eWxlLmJvdHRvbSA9IFwiMnB4XCI7XG4gICAgICAgIHJlUmlnaHQuc3R5bGUucmlnaHQgPSBcIjBcIjtcbiAgICAgICAgcmVSaWdodC5zdHlsZS53aWR0aCA9IFwiMnB4XCI7XG4gICAgICAgIHJlUmlnaHQuc3R5bGUuY3Vyc29yID0gXCJldy1yZXNpemVcIjtcblxuICAgICAgICBjb25zdCByZVRvcExlZnQgPSBkaXYoeyBjbGFzc05hbWU6ICdkZy1yZXNpemUtZWxlbSAnfSk7XG4gICAgICAgIHJlVG9wTGVmdC5zdHlsZS50b3AgPSBcIjBcIjtcbiAgICAgICAgcmVUb3BMZWZ0LnN0eWxlLmxlZnQgPSBcIjBcIjtcbiAgICAgICAgcmVUb3BMZWZ0LnN0eWxlLndpZHRoID0gXCIycHhcIjtcbiAgICAgICAgcmVUb3BMZWZ0LnN0eWxlLmhlaWdodCA9IFwiMnB4XCI7XG4gICAgICAgIHJlVG9wTGVmdC5zdHlsZS5jdXJzb3IgPSBcIm53c2UtcmVzaXplXCI7XG5cbiAgICAgICAgY29uc3QgcmVUb3BSaWdodCA9IGRpdih7IGNsYXNzTmFtZTogJ2RnLXJlc2l6ZS1lbGVtICd9KTtcbiAgICAgICAgcmVUb3BSaWdodC5zdHlsZS50b3AgPSBcIjBcIjtcbiAgICAgICAgcmVUb3BSaWdodC5zdHlsZS5yaWdodCA9IFwiMFwiO1xuICAgICAgICByZVRvcFJpZ2h0LnN0eWxlLndpZHRoID0gXCIycHhcIjtcbiAgICAgICAgcmVUb3BSaWdodC5zdHlsZS5oZWlnaHQgPSBcIjJweFwiO1xuICAgICAgICByZVRvcFJpZ2h0LnN0eWxlLmN1cnNvciA9IFwibmVzdy1yZXNpemVcIjtcblxuICAgICAgICBjb25zdCByZUJvdHRvbUxlZnQgPSBkaXYoeyBjbGFzc05hbWU6ICdkZy1yZXNpemUtZWxlbSAnfSk7XG4gICAgICAgIHJlQm90dG9tTGVmdC5zdHlsZS5ib3R0b20gPSBcIjBcIjtcbiAgICAgICAgcmVCb3R0b21MZWZ0LnN0eWxlLmxlZnQgPSBcIjBcIjtcbiAgICAgICAgcmVCb3R0b21MZWZ0LnN0eWxlLndpZHRoID0gXCIycHhcIjtcbiAgICAgICAgcmVCb3R0b21MZWZ0LnN0eWxlLmhlaWdodCA9IFwiMnB4XCI7XG4gICAgICAgIHJlQm90dG9tTGVmdC5zdHlsZS5jdXJzb3IgPSBcIm5lc3ctcmVzaXplXCI7XG5cbiAgICAgICAgY29uc3QgcmVCb3R0b21SaWdodCA9IGRpdih7IGNsYXNzTmFtZTogJ2RnLXJlc2l6ZS1lbGVtICd9KTtcbiAgICAgICAgcmVCb3R0b21SaWdodC5zdHlsZS5ib3R0b20gPSBcIjBcIjtcbiAgICAgICAgcmVCb3R0b21SaWdodC5zdHlsZS5yaWdodCA9IFwiMFwiO1xuICAgICAgICByZUJvdHRvbVJpZ2h0LnN0eWxlLndpZHRoID0gXCIycHhcIjtcbiAgICAgICAgcmVCb3R0b21SaWdodC5zdHlsZS5oZWlnaHQgPSBcIjJweFwiO1xuICAgICAgICByZUJvdHRvbVJpZ2h0LnN0eWxlLmN1cnNvciA9IFwibndzZS1yZXNpemVcIjtcblxuICAgICAgICB0aGlzLnJlRWxlbXMgPSBbXG4gICAgICAgICAgICByZVRvcExlZnQsXG4gICAgICAgICAgICByZVRvcCxcbiAgICAgICAgICAgIHJlVG9wUmlnaHQsXG4gICAgICAgICAgICByZVJpZ2h0LFxuICAgICAgICAgICAgcmVCb3R0b21SaWdodCxcbiAgICAgICAgICAgIHJlQm90dG9tLFxuICAgICAgICAgICAgcmVCb3R0b21MZWZ0LFxuICAgICAgICAgICAgcmVMZWZ0XG4gICAgICAgIF1cblxuICAgICAgICB0aGlzLnNoYWRvdy5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIHN0eWxlKFxuICAgICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICAgIHRleHQoYFxuICAgICAgICAgICAgICAgICAgICAuZGctcmVzaXplLWVsZW0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmVkOyAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7IFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYCkpXG4gICAgICAgIClcblxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5hZGRSZXNpemVFbGVtcygpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVJlc2l6ZUVsZW1zKClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uUmVNb3VzZURvd24obW9kZTogRHJhZ01vZGUpOiAoZTpNb3VzZUV2ZW50KSA9PiB2b2lkIHtcbiAgICAgICAgcmV0dXJuIGUgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBjbGllbnRYLCBjbGllbnRZIH0gPSBlO1xuICAgICAgICAgICAgY29uc3QgZGdOb2RlID0gRGdOb2RlLmdldFBhcmVudERnTm9kZSh0aGlzKTtcbiAgICAgICAgICAgIGlmIChkZ05vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbW9kZSxcbiAgICAgICAgICAgICAgICAgICAgZG93blg6IGNsaWVudFgsXG4gICAgICAgICAgICAgICAgICAgIGRvd25ZOiBjbGllbnRZLFxuICAgICAgICAgICAgICAgICAgICBjdXJYOiBjbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICBjdXJZOiBjbGllbnRZLFxuICAgICAgICAgICAgICAgICAgICByZWZXOiBkZ05vZGUudyxcbiAgICAgICAgICAgICAgICAgICAgcmVmSDogZGdOb2RlLmgsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmRvY01vdXNlTW92ZSk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuZG9jTW91c2VVcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFJlc2l6ZUVsZW1zKCkge1xuICAgICAgICB0aGlzLnJlRWxlbXMuZm9yRWFjaChlID0+IHRoaXMuc2hhZG93LmFwcGVuZENoaWxkKGUpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZVJlc2l6ZUVsZW1zKCkge1xuICAgICAgICB0aGlzLnJlRWxlbXMuZm9yRWFjaChlID0+IHRoaXMuc2hhZG93LnJlbW92ZUNoaWxkKGUpKTtcbiAgICB9XG5cblxuICAgIC8vIHByaXZhdGUgYWRkUmVzaXplRWxlbXMoKSB7XG4gICAgLy8gICAgIGVtcHR5KHRoaXMuc2hhZG93KTtcbiAgICAvLyAgICAgY29uc3QgZGdOb2RlID0gRGdOb2RlLmdldFBhcmVudERnTm9kZSh0aGlzKTtcbiAgICAvLyAgICAgY29uc3QgeyB4LCB5LCB3LCBoIH0gPSBkZ05vZGU7XG4gICAgLy8gICAgIGlmICh3ID49IE1JTl9TSVpFICYmIGggPj0gTUlOX1NJWkUpIHtcbiAgICAvLyAgICAgICAgIGNvbnN0IGxlZnRUb3BEaXYgPSBkaXYoe1xuICAgIC8vICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2RnLXJlc2l6ZXItbGVmdC10b3AnLFxuICAgIC8vICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIGJhY2tncm91bmRDb2xvcjogJ3JlZCcsXG4gICAgLy8gICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIC8vICAgICAgICAgICAgICAgICBsZWZ0OiBweCh4KSxcbiAgICAvLyAgICAgICAgICAgICAgICAgdG9wOiBweCh5KSxcbiAgICAvLyAgICAgICAgICAgICAgICAgaGVpZ2h0OiBweCgyKSxcbiAgICAvLyAgICAgICAgICAgICAgICAgd2lkdGg6IHB4KDIpXG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgfSk7XG4gICAgLy8gICAgICAgICAvLyB0aGlzLnNoYWRvdy5hcHBlbmRDaGlsZChsZWZ0VG9wRGl2KTtcbiAgICAvLyAgICAgICAgIC8vIGNvbnN0IGxlZnREaXYgPSBkaXYoeyBjbGFzc05hbWU6ICdkZy1yZXNpemVyLWxlZnQnfSk7XG4gICAgLy8gICAgIH1cbiAgICAvL1xuICAgIC8vIH1cblxuICAgIGdldCBoZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNhZmVQYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgnaGVpZ2h0JykpO1xuICAgIH1cblxuICAgIHNldCBoZWlnaHQoaGVpZ2h0OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGhlaWdodC50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNhZmVQYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgnaGVpZ2h0JykpO1xuICAgIH1cblxuICAgIHNldCB3aWR0aCh3aWR0aDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHdpZHRoLnRvU3RyaW5nKCkpO1xuICAgIH1cblxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRGdSZXNpemVhYmxlLlRBRywgRGdSZXNpemVhYmxlKTtcbiIsImltcG9ydCB7IExpbmUsIGxpbmVJbnRlcnNlY3Rpb24gfSBmcm9tIFwiLi9MaW5lXCI7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuL1BvaW50XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQm94IHtcbiAgICByZWFkb25seSB4OiBudW1iZXI7XG4gICAgcmVhZG9ubHkgeTogbnVtYmVyO1xuICAgIHJlYWRvbmx5IHc6IG51bWJlcjtcbiAgICByZWFkb25seSBoOiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBib3hFcXVhbHMoYjE6IEJveCwgYjI6IEJveCk6IGJvb2xlYW4ge1xuICAgIGlmIChiMSA9PSBiMikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGIxLnggPT09IGIyLnggJiZcbiAgICAgICAgYjEueSA9PT0gYjIueSAmJlxuICAgICAgICBiMS53ID09PSBiMi53ICYmXG4gICAgICAgIGIxLmggPT09IGIyLmg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBib3hDZW50ZXIoYjogQm94KTogUG9pbnQge1xuICAgIHJldHVybiB7XG4gICAgICAgIHg6IGIueCArIE1hdGgucm91bmQoYi53IC8gMiksXG4gICAgICAgIHk6IGIueSArIE1hdGgucm91bmQoYi5oIC8gMilcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGJveFRvTGluZXMoYm94OiBCb3gpOiBSZWFkb25seUFycmF5PExpbmU+IHtcbiAgICBjb25zdCB7IHgsIHkgLCB3LCBoIH0gPSBib3g7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgeyBcbiAgICAgICAgICAgIGZyb206IHsgeCwgeSB9LFxuICAgICAgICAgICAgdG86IHsgeDogeCArIHcsIHl9XG4gICAgICAgIH0sXG4gICAgICAgIHsgXG4gICAgICAgICAgICBmcm9tOiB7IHg6IHggKyB3LCB5fSxcbiAgICAgICAgICAgIHRvOiB7IHg6IHggKyB3LCB5OiB5ICsgaCB9XG4gICAgICAgIH0sXG4gICAgICAgIHsgXG4gICAgICAgICAgICBmcm9tOiB7IHg6IHggKyB3LCB5OiB5ICsgaCB9LFxuICAgICAgICAgICAgdG86IHsgeCwgeTogeSArIGggfSxcbiAgICAgICAgfSxcbiAgICAgICAgeyBcbiAgICAgICAgICAgIGZyb206IHsgeCwgeTogeSArIGggfSxcbiAgICAgICAgICAgIHRvOiB7IHgsIHkgfSxcbiAgICAgICAgfSxcbiAgICBdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBib3hJbnRlcnNlY3Rpb24oYm94OiBCb3gsIGxpbmU6IExpbmUpOiBQb2ludCB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgbGluZXMgPSBib3hUb0xpbmVzKGJveCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgY29uc3QgcCA9IGxpbmVJbnRlcnNlY3Rpb24obGluZXNbaV0sIGxpbmUpO1xuICAgICAgICBpZiAocCkge1xuICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi9Qb2ludFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIExpbmUge1xuICAgIHJlYWRvbmx5IGZyb206IFBvaW50O1xuICAgIHJlYWRvbmx5IHRvOiBQb2ludDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVJbnRlcnNlY3Rpb24obDE6IExpbmUsIGwyOiBMaW5lKTogUG9pbnQgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiBpbnRlcnNlY3QobDEuZnJvbS54LCBsMS5mcm9tLnksIGwxLnRvLngsIGwxLnRvLnksIGwyLmZyb20ueCwgbDIuZnJvbS55LCBsMi50by54LCBsMi50by55KTtcbn1cblxuLy8gbGluZSBpbnRlcmNlcHQgbWF0aCBieSBQYXVsIEJvdXJrZSBodHRwOi8vcGF1bGJvdXJrZS5uZXQvZ2VvbWV0cnkvcG9pbnRsaW5lcGxhbmUvXG4vLyBEZXRlcm1pbmUgdGhlIGludGVyc2VjdGlvbiBwb2ludCBvZiB0d28gbGluZSBzZWdtZW50c1xuLy8gUmV0dXJuIHVuZGVmaW5lZCBpZiB0aGUgbGluZXMgZG9uJ3QgaW50ZXJzZWN0XG5mdW5jdGlvbiBpbnRlcnNlY3QoeDE6IG51bWJlciwgeTE6IG51bWJlciwgeDI6IG51bWJlciwgeTI6IG51bWJlciwgeDM6IG51bWJlciwgeTM6IG51bWJlciwgeDQ6IG51bWJlciwgeTQ6IG51bWJlcik6IFBvaW50IHwgdW5kZWZpbmVkIHtcblxuICAgIC8vIENoZWNrIGlmIG5vbmUgb2YgdGhlIGxpbmVzIGFyZSBvZiBsZW5ndGggMFxuICAgICAgaWYgKCh4MSA9PT0geDIgJiYgeTEgPT09IHkyKSB8fCAoeDMgPT09IHg0ICYmIHkzID09PSB5NCkpIHtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICBcbiAgICAgIGNvbnN0IGRlbm9taW5hdG9yID0gKCh5NCAtIHkzKSAqICh4MiAtIHgxKSAtICh4NCAtIHgzKSAqICh5MiAtIHkxKSlcbiAgXG4gICAgLy8gTGluZXMgYXJlIHBhcmFsbGVsXG4gICAgICBpZiAoZGVub21pbmF0b3IgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICBcbiAgICAgIGxldCB1YSA9ICgoeDQgLSB4MykgKiAoeTEgLSB5MykgLSAoeTQgLSB5MykgKiAoeDEgLSB4MykpIC8gZGVub21pbmF0b3JcbiAgICAgIGxldCB1YiA9ICgoeDIgLSB4MSkgKiAoeTEgLSB5MykgLSAoeTIgLSB5MSkgKiAoeDEgLSB4MykpIC8gZGVub21pbmF0b3JcbiAgXG4gICAgLy8gaXMgdGhlIGludGVyc2VjdGlvbiBhbG9uZyB0aGUgc2VnbWVudHNcbiAgICAgIGlmICh1YSA8IDAgfHwgdWEgPiAxIHx8IHViIDwgMCB8fCB1YiA+IDEpIHtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICB9XG4gIFxuICAgIC8vIFJldHVybiBhIG9iamVjdCB3aXRoIHRoZSB4IGFuZCB5IGNvb3JkaW5hdGVzIG9mIHRoZSBpbnRlcnNlY3Rpb25cbiAgICAgIGxldCB4ID0geDEgKyB1YSAqICh4MiAtIHgxKVxuICAgICAgbGV0IHkgPSB5MSArIHVhICogKHkyIC0geTEpXG4gIFxuICAgICAgcmV0dXJuIHt4LCB5fVxuICB9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBDdXN0b21lckFwcCB9IGZyb20gXCIuL2N1c3RvbWVyL0N1c3RvbWVyQXBwXCI7XG5pbXBvcnQgeyBEZ0RpYWdyYW0gfSBmcm9tIFwiLi9kaWFncmFtL0RnRGlhZ3JhbVwiO1xuaW1wb3J0IHsgRGdEcmFnZ2FibGUgfSBmcm9tIFwiLi9kaWFncmFtL0RnRHJhZ2dhYmxlXCI7XG5pbXBvcnQgeyBEZ0xpbmsgfSBmcm9tIFwiLi9kaWFncmFtL0RnTGlua1wiO1xuaW1wb3J0IHsgRGdOb2RlIH0gZnJvbSBcIi4vZGlhZ3JhbS9EZ05vZGVcIjtcbmltcG9ydCB7IFNjcm9sbEl0ZW0gfSBmcm9tIFwiLi92aXJ0dWFsLXNjcm9sbGVyL1Njcm9sbEl0ZW1cIjtcbmltcG9ydCB7IFZpcnR1YWxTY3JvbGxlciB9IGZyb20gXCIuL3ZpcnR1YWwtc2Nyb2xsZXIvVmlydHVhbFNjcm9sbGVyXCI7XG5pbXBvcnQge0RnUmVzaXplYWJsZX0gZnJvbSBcIi4vZGlhZ3JhbS9EZ1Jlc2l6ZWFibGVcIjtcblxuLy8ganVzdCBmb3IgaW1wb3J0cyAhXG4vLyBjb25zb2xlLmxvZygneWFsbGEnLCBDdXN0b21lckFwcC5UQUdfTkFNRSwgVmlydHVhbFNjcm9sbGVyLlRBR19OQU1FLCBTY3JvbGxJdGVtLlRBR19OQU1FLCBEZ0RpYWdyYW0uVEFHLCBEZ05vZGUuVEFHLCBEZ0RyYWdnYWJsZS5UQUcpO1xuY29uc29sZS5sb2coRGdEaWFncmFtLlRBRywgRGdOb2RlLlRBRywgRGdEcmFnZ2FibGUuVEFHLCBEZ0xpbmsuVEFHLCBEZ1Jlc2l6ZWFibGUuVEFHKTtcblxuLy8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBlID0+IHtcbi8vICAgICBjb25zdCBhcHA6IEN1c3RvbWVyQXBwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpIGFzIEN1c3RvbWVyQXBwO1xuLy8gICAgIGNvbnNvbGUubG9nKFwiYXBwIGxvYWRlZFwiLCBhcHApO1xuLy8gICAgIGFwcC5pbml0KFtcbi8vICAgICAgICAgeyBmaXJzdE5hbWU6ICdUb3RvJywgbGFzdE5hbWU6ICdCaWxvdXRlJyB9LFxuLy8gICAgICAgICB7IGZpcnN0TmFtZTogJ0ZyZW5jaCcsIGxhc3ROYW1lOiAnRnJpZXMnIH0sXG4vLyAgICAgICAgIHsgZmlyc3ROYW1lOiAnRm9vJywgbGFzdE5hbWU6ICdCYXInIH0sXG4vLyAgICAgXSlcbi8vIH0pXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=