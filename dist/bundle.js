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
    // registerLink(link: DgLink) {
    //     const line = link.drawLink(this.getNodeById(link.from), this.getNodeById(link.to));
    //     line.setAttribute("from", link.from);
    //     line.setAttribute("to", link.to);
    //     this.linksSvg.appendChild(line);
    // }
    registerNode(node) {
        node.addEventListener('moved', () => {
            // update all links
            this.getDgLinks()
                .forEach(dgLink => {
                if (dgLink.from === node.id || dgLink.to === node.id) {
                    dgLink.drawLink();
                }
            });
            //
            // this.linksSvg.querySelectorAll("line")
            //     .forEach(line => line.remove());
            // // add new
            // this.getDgLinks()
            //     .forEach(l => {
            //         const line = l.drawLink(this.getNodeById(l.from), this.getNodeById(l.to));
            //         this.linksSvg.appendChild(line);
            //     });
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
        this.diagram = _DgDiagram__WEBPACK_IMPORTED_MODULE_1__.DgDiagram.getParentDgDiagram(this);
        this.linksSvg = this.diagram.linksSvg;
        this.drawLink();
    }
    // static get observedAttributes() {
    //     return ['selected'];
    // }
    //
    // attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    //     if (oldValue !== null) {
    //         if (name === 'selected') {
    //
    //         }
    //     }
    // }
    clearLink() {
        if (this.linksSvg && this.lineSvg) {
            this.linksSvg.removeChild(this.lineSvg);
            this.lineSvg = undefined;
        }
    }
    drawLink() {
        this.clearLink();
        const fromNode = this.diagram.getNodeById(this.from);
        const toNode = this.diagram.getNodeById(this.to);
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
        this.linksSvg.appendChild(svgLine);
        this.lineSvg = svgLine;
    }
    get from() {
        return this.getAttribute('from');
    }
    get to() {
        return this.getAttribute('to');
    }
    get selected() {
        return this.hasAttribute('selected');
    }
    set selected(selected) {
        if (selected) {
            this.setAttribute('selected', '');
        }
        else {
            this.removeAttribute('selected');
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUU7UUFDdEMsT0FBTyxTQUFTO0tBQ25CO0lBRUgsbUVBQW1FO0lBQ2pFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBRTNCLE9BQU8sRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDO0FBQ2pCLENBQUM7Ozs7Ozs7VUN6Q0g7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMZ0Q7QUFDSTtBQUNWO0FBQ0E7QUFHVTtBQUVwRCxxQkFBcUI7QUFDckIseUlBQXlJO0FBQ3pJLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkRBQWEsRUFBRSx1REFBVSxFQUFFLGlFQUFlLEVBQUUsdURBQVUsRUFBRSxtRUFBZ0IsQ0FBQyxDQUFDO0FBRXRGLHlDQUF5QztBQUN6Qyw4RUFBOEU7QUFDOUUsc0NBQXNDO0FBQ3RDLGlCQUFpQjtBQUNqQixzREFBc0Q7QUFDdEQsc0RBQXNEO0FBQ3RELGlEQUFpRDtBQUNqRCxTQUFTO0FBQ1QsS0FBSyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvU2FmZVBhcnNlSW50LnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvYnVpbGRlci9IdG1sQnVpbGRlci50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2RpYWdyYW0vRGdEaWFncmFtLnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvZGlhZ3JhbS9EZ0RyYWdnYWJsZS50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2RpYWdyYW0vRGdMaW5rLnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvZGlhZ3JhbS9EZ05vZGUudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy9kaWFncmFtL0RnUmVzaXplYWJsZS50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2RpYWdyYW0vTW91c2VEcmFnLnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvZGlhZ3JhbS9nZW9tZXRyeS9Cb3gudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy9kaWFncmFtL2dlb21ldHJ5L0xpbmUudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHNhZmVQYXJzZUludChzOnN0cmluZyB8IG51bGwpOiBudW1iZXIge1xuICAgIGNvbnN0IGkgPSBwYXJzZUludChzKTtcbiAgICBpZiAoaXNOYU4oaSkpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiBpO1xufSIsImV4cG9ydCB0eXBlIERlZXBQYXJ0aWFsPFQ+ID0gUGFydGlhbDx7IFtQIGluIGtleW9mIFRdOiBEZWVwUGFydGlhbDxUW1BdPiB9PjtcblxudHlwZSBOb2RlQnVpbGRlcjxLIGV4dGVuZHMga2V5b2YgSFRNTEVsZW1lbnRUYWdOYW1lTWFwPiA9IChcbiAgYTogRGVlcFBhcnRpYWw8SFRNTEVsZW1lbnRUYWdOYW1lTWFwW0tdPixcbiAgLi4uYzogTm9kZVtdXG4pID0+IEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5vZGU8SyBleHRlbmRzIGtleW9mIEhUTUxFbGVtZW50VGFnTmFtZU1hcD4odGFnOiBLKTogTm9kZUJ1aWxkZXI8Sz4ge1xuICByZXR1cm4gKGE6IERlZXBQYXJ0aWFsPEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXT4sIC4uLmM6IE5vZGVbXSkgPT4ge1xuICAgIGNvbnN0IG46IEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBjLmZvckVhY2goKGNoaWxkKSA9PiBuLmFwcGVuZENoaWxkKGNoaWxkKSk7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGEpIGFzIEFycmF5PGtleW9mIHR5cGVvZiBhPjtcbiAgICBrZXlzLmZvckVhY2goKGspID0+IHNldFByb3BlcnR5KG4sIGssIGdldFByb3BlcnR5KGEsIGspKSk7XG4gICAgcmV0dXJuIG47XG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldFByb3BlcnR5PFQsIEsgZXh0ZW5kcyBrZXlvZiBUPihvOiBULCBrZXk6IEspOiBUW0tdIHtcbiAgcmV0dXJuIG9ba2V5XTtcbn1cblxuZnVuY3Rpb24gc2V0UHJvcGVydHk8VCwgSyBleHRlbmRzIGtleW9mIFQ+KG86IFQsIGtleTogSywgdmFsdWU6IFRbS10pOiB2b2lkIHtcbiAgb1trZXldID0gdmFsdWU7XG59XG5cbmV4cG9ydCBjb25zdCBkaXYgPSBub2RlKCdkaXYnKTtcbmV4cG9ydCBjb25zdCBzcGFuID0gbm9kZSgnc3BhbicpO1xuZXhwb3J0IGNvbnN0IGEgPSBub2RlKCdhJyk7XG5leHBvcnQgY29uc3QgcCA9IG5vZGUoJ3AnKTtcbmV4cG9ydCBjb25zdCBoMSA9IG5vZGUoJ2gxJyk7XG5leHBvcnQgY29uc3QgaW5wdXQgPSBub2RlKCdpbnB1dCcpO1xuZXhwb3J0IGNvbnN0IGxhYmVsID0gbm9kZSgnbGFiZWwnKTtcbmV4cG9ydCBjb25zdCBzbG90ID0gbm9kZSgnc2xvdCcpO1xuZXhwb3J0IGNvbnN0IHN0eWxlID0gbm9kZSgnc3R5bGUnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRleHQoczogc3RyaW5nKTogVGV4dCB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVtcHR5KGU6IE5vZGUpIHtcbiAgd2hpbGUoZS5maXJzdENoaWxkKSB7XG4gICAgZS5yZW1vdmVDaGlsZChlLmZpcnN0Q2hpbGQpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBweChuOiBudW1iZXIpOiBzdHJpbmcge1xuICByZXR1cm4gbiArICdweCc7XG59XG4iLCJpbXBvcnQgeyBkaXYsIHNsb3QsIHN0eWxlLCB0ZXh0IH0gZnJvbSBcIi4uL2J1aWxkZXIvSHRtbEJ1aWxkZXJcIjtcbmltcG9ydCB7IERnTGluayB9IGZyb20gXCIuL0RnTGlua1wiO1xuaW1wb3J0IHsgRGdOb2RlIH0gZnJvbSBcIi4vRGdOb2RlXCI7XG5cbmNvbnN0IFNWR19OUyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG5cbmNvbnN0IGRpYWdTdHlsZXMgPSBgXG4gICAgLmRnLWRpYWdyYW0ge1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB9XG4gICAgLmRnLXNjcm9sbC1wYW5lIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIH1cbiAgICAuZGctbGlua3Mge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgIH1cbiAgICAuZGctY29udGVudC1wYW5lIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmV5O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgfVxuYDtcblxuY29uc3Qgc3ZnRGVmcyA9IGBcbjxtYXJrZXIgaWQ9XCJhcnJvd2hlYWRcIiBtYXJrZXJXaWR0aD1cIjEwXCIgbWFya2VySGVpZ2h0PVwiN1wiIFxucmVmWD1cIjlcIiByZWZZPVwiMy41XCIgb3JpZW50PVwiYXV0b1wiPlxuICAgIDxwb2x5Z29uIHBvaW50cz1cIjAgMCwgMTAgMy41LCAwIDdcIiAvPlxuPC9tYXJrZXI+XG5gXG5cbmV4cG9ydCBjbGFzcyBEZ0RpYWdyYW0gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cbiAgICBzdGF0aWMgVEFHID0gXCJkZy1kaWFncmFtXCJcblxuICAgIHJlYWRvbmx5IGxpbmtzU3ZnOiBTVkdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFNWR19OUywgJ3N2ZycpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGNvbnN0IHNoYWRvdyA9IHRoaXMuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcblxuICAgICAgICB0aGlzLmxpbmtzU3ZnLmNsYXNzTGlzdC5hZGQoJ2RnLWxpbmtzJyk7XG4gICAgICAgIGNvbnN0IGRlZnM6IFNWR0RlZnNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFNWR19OUywgJ3N2ZycpO1xuICAgICAgICBkZWZzLmlubmVySFRNTCA9IHN2Z0RlZnM7XG4gICAgICAgIHRoaXMubGlua3NTdmcuYXBwZW5kQ2hpbGQoZGVmcyk7XG4gICAgICAgIGNvbnN0IGxpbmtzU2xvdDogSFRNTFNsb3RFbGVtZW50ID0gc2xvdCh7IG5hbWU6IFwibGlua3NcIn0pXG4gICAgICAgIHRoaXMubGlua3NTdmcuYXBwZW5kQ2hpbGQobGlua3NTbG90KTtcblxuICAgICAgICBjb25zdCBzY3JvbGxQYW5lID0gZGl2KFxuICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdkZy1zY3JvbGwtcGFuZScgfSxcbiAgICAgICAgICAgIHRoaXMubGlua3NTdmcsXG4gICAgICAgICAgICBzbG90KHt9KSxcbiAgICAgICAgKTtcblxuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQoc2Nyb2xsUGFuZSk7XG4gICAgICAgIHNoYWRvdy5hcHBlbmRDaGlsZChzdHlsZSh7fSwgdGV4dChkaWFnU3R5bGVzKSkpO1xuICAgIH1cblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIH1cblxuICAgIGdldERnTm9kZXMoKTogUmVhZG9ubHlBcnJheTxEZ05vZGU+IHtcbiAgICAgICAgY29uc3QgcSA9IHRoaXMucXVlcnlTZWxlY3RvckFsbDxEZ05vZGU+KERnTm9kZS5UQUcpO1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShxKTtcbiAgICB9XG5cbiAgICBnZXROb2RlQnlJZChpZDogc3RyaW5nKTogRGdOb2RlIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGdOb2RlcygpLmZpbmQobiA9PiBuLmlkID09PSBpZCk7XG4gICAgfVxuXG4gICAgZ2V0RGdMaW5rcygpOiBSZWFkb25seUFycmF5PERnTGluaz4ge1xuICAgICAgICBjb25zdCBxID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsPERnTGluaz4oRGdMaW5rLlRBRyk7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHEpO1xuICAgIH1cblxuICAgIC8vIHJlZ2lzdGVyTGluayhsaW5rOiBEZ0xpbmspIHtcbiAgICAvLyAgICAgY29uc3QgbGluZSA9IGxpbmsuZHJhd0xpbmsodGhpcy5nZXROb2RlQnlJZChsaW5rLmZyb20pLCB0aGlzLmdldE5vZGVCeUlkKGxpbmsudG8pKTtcbiAgICAvLyAgICAgbGluZS5zZXRBdHRyaWJ1dGUoXCJmcm9tXCIsIGxpbmsuZnJvbSk7XG4gICAgLy8gICAgIGxpbmUuc2V0QXR0cmlidXRlKFwidG9cIiwgbGluay50byk7XG4gICAgLy8gICAgIHRoaXMubGlua3NTdmcuYXBwZW5kQ2hpbGQobGluZSk7XG4gICAgLy8gfVxuXG4gICAgcmVnaXN0ZXJOb2RlKG5vZGU6IERnTm9kZSkge1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdmVkJywgKCkgPT4ge1xuICAgICAgICAgICAgLy8gdXBkYXRlIGFsbCBsaW5rc1xuICAgICAgICAgICAgdGhpcy5nZXREZ0xpbmtzKClcbiAgICAgICAgICAgICAgICAuZm9yRWFjaChkZ0xpbmsgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGdMaW5rLmZyb20gPT09IG5vZGUuaWQgfHwgZGdMaW5rLnRvID09PSBub2RlLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZ0xpbmsuZHJhd0xpbmsoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIHRoaXMubGlua3NTdmcucXVlcnlTZWxlY3RvckFsbChcImxpbmVcIilcbiAgICAgICAgICAgIC8vICAgICAuZm9yRWFjaChsaW5lID0+IGxpbmUucmVtb3ZlKCkpO1xuICAgICAgICAgICAgLy8gLy8gYWRkIG5ld1xuICAgICAgICAgICAgLy8gdGhpcy5nZXREZ0xpbmtzKClcbiAgICAgICAgICAgIC8vICAgICAuZm9yRWFjaChsID0+IHtcbiAgICAgICAgICAgIC8vICAgICAgICAgY29uc3QgbGluZSA9IGwuZHJhd0xpbmsodGhpcy5nZXROb2RlQnlJZChsLmZyb20pLCB0aGlzLmdldE5vZGVCeUlkKGwudG8pKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5saW5rc1N2Zy5hcHBlbmRDaGlsZChsaW5lKTtcbiAgICAgICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldFBhcmVudERnRGlhZ3JhbShmcm9tOiBIVE1MRWxlbWVudCk6IERnRGlhZ3JhbSB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmIChmcm9tLnBhcmVudEVsZW1lbnQgaW5zdGFuY2VvZiBEZ0RpYWdyYW0pIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZyb20ucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIERnRGlhZ3JhbS5nZXRQYXJlbnREZ0RpYWdyYW0oZnJvbS5wYXJlbnRFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRGdEaWFncmFtLlRBRywgRGdEaWFncmFtKTtcbiIsImltcG9ydCB7IGRpdiwgc2xvdCwgc3R5bGUsIHRleHQgfSBmcm9tIFwiLi4vYnVpbGRlci9IdG1sQnVpbGRlclwiO1xuaW1wb3J0IHsgRGdOb2RlIH0gZnJvbSBcIi4vRGdOb2RlXCI7XG5pbXBvcnQge2RyYWdEZWx0YXMsIGRyYWdVcGRhdGUsIE1vdXNlRHJhZywgbmV3TW91c2VEcmFnfSBmcm9tIFwiLi9Nb3VzZURyYWdcIjtcblxuaW50ZXJmYWNlIERyYWdTdGF0ZSB7XG4gICAgcmVhZG9ubHkgcmVmWDogbnVtYmVyO1xuICAgIHJlYWRvbmx5IHJlZlk6IG51bWJlcjtcbiAgICBtb3VzZURyYWc6IE1vdXNlRHJhZztcblxufVxuXG5leHBvcnQgY2xhc3MgRGdEcmFnZ2FibGUgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cbiAgICBzdGF0aWMgVEFHID0gXCJkZy1kcmFnZ2FibGVcIjtcblxuICAgIHByaXZhdGUgZHJhZ1N0YXRlOiBEcmFnU3RhdGUgfCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBjb25zdCBtb3VzZU1vdmUgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ1N0YXRlKSB7XG4gICAgICAgICAgICAgICAgZHJhZ1VwZGF0ZSh0aGlzLmRyYWdTdGF0ZS5tb3VzZURyYWcsIGUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZHgsIGR5IH0gPSBkcmFnRGVsdGFzKHRoaXMuZHJhZ1N0YXRlLm1vdXNlRHJhZyk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGdOb2RlID0gRGdOb2RlLmdldFBhcmVudERnTm9kZSh0aGlzKTtcbiAgICAgICAgICAgICAgICBpZiAoZGdOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRnTm9kZS54ID0gdGhpcy5kcmFnU3RhdGUucmVmWCArIGR4O1xuICAgICAgICAgICAgICAgICAgICBkZ05vZGUueSA9IHRoaXMuZHJhZ1N0YXRlLnJlZlkgKyBkeTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtb3VzZVVwID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlTW92ZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2VVcCk7XG4gICAgICAgICAgICB0aGlzLmRyYWdTdGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGNsaWVudFgsIGNsaWVudFkgfSA9IGU7XG4gICAgICAgICAgICBjb25zdCBkZ05vZGUgPSBEZ05vZGUuZ2V0UGFyZW50RGdOb2RlKHRoaXMpO1xuICAgICAgICAgICAgaWYgKGRnTm9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ1N0YXRlID0ge1xuICAgICAgICAgICAgICAgICAgICBtb3VzZURyYWc6IG5ld01vdXNlRHJhZyhlKSxcbiAgICAgICAgICAgICAgICAgICAgcmVmWDogZGdOb2RlLngsXG4gICAgICAgICAgICAgICAgICAgIHJlZlk6IGRnTm9kZS55LFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2VNb3ZlKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2VVcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKERnRHJhZ2dhYmxlLlRBRywgRGdEcmFnZ2FibGUpO1xuIiwiaW1wb3J0IHtib3hDZW50ZXIsIGJveEludGVyc2VjdGlvbn0gZnJvbSBcIi4vZ2VvbWV0cnkvQm94XCI7XG5pbXBvcnQge0RnRGlhZ3JhbX0gZnJvbSBcIi4vRGdEaWFncmFtXCI7XG5pbXBvcnQge0RnTm9kZX0gZnJvbSBcIi4vRGdOb2RlXCI7XG5pbXBvcnQge0xpbmV9IGZyb20gXCIuL2dlb21ldHJ5L0xpbmVcIjtcblxuY29uc3QgU1ZHX05TID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcblxuZXhwb3J0IGNsYXNzIERnTGluayBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICAgIHN0YXRpYyBUQUcgPSAnZGctbGluayc7XG5cbiAgICBwcml2YXRlIGxpbmtzU3ZnOiBTVkdFbGVtZW50IHwgdW5kZWZpbmVkO1xuICAgIHByaXZhdGUgbGluZVN2ZzogU1ZHTGluZUVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgcHJpdmF0ZSBkaWFncmFtOiBEZ0RpYWdyYW0gfCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5kaWFncmFtID0gRGdEaWFncmFtLmdldFBhcmVudERnRGlhZ3JhbSh0aGlzKTtcbiAgICAgICAgdGhpcy5saW5rc1N2ZyA9IHRoaXMuZGlhZ3JhbS5saW5rc1N2ZztcbiAgICAgICAgdGhpcy5kcmF3TGluaygpO1xuICAgIH1cblxuICAgIC8vIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIC8vICAgICByZXR1cm4gWydzZWxlY3RlZCddO1xuICAgIC8vIH1cbiAgICAvL1xuICAgIC8vIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lOiBzdHJpbmcsIG9sZFZhbHVlOiBzdHJpbmcgfCBudWxsLCBuZXdWYWx1ZTogc3RyaW5nIHwgbnVsbCkge1xuICAgIC8vICAgICBpZiAob2xkVmFsdWUgIT09IG51bGwpIHtcbiAgICAvLyAgICAgICAgIGlmIChuYW1lID09PSAnc2VsZWN0ZWQnKSB7XG4gICAgLy9cbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vIH1cblxuICAgIGNsZWFyTGluaygpIHtcbiAgICAgICAgaWYgKHRoaXMubGlua3NTdmcgJiYgdGhpcy5saW5lU3ZnKSB7XG4gICAgICAgICAgICB0aGlzLmxpbmtzU3ZnLnJlbW92ZUNoaWxkKHRoaXMubGluZVN2Zyk7XG4gICAgICAgICAgICB0aGlzLmxpbmVTdmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3TGluaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jbGVhckxpbmsoKTtcblxuICAgICAgICBjb25zdCBmcm9tTm9kZTogRGdOb2RlID0gdGhpcy5kaWFncmFtLmdldE5vZGVCeUlkKHRoaXMuZnJvbSk7XG4gICAgICAgIGNvbnN0IHRvTm9kZTogRGdOb2RlID0gdGhpcy5kaWFncmFtLmdldE5vZGVCeUlkKHRoaXMudG8pO1xuXG4gICAgICAgIGNvbnN0IGZyb21Cb3ggPSBmcm9tTm9kZS5nZXRCb3goKTtcbiAgICAgICAgY29uc3QgdG9Cb3ggPSB0b05vZGUuZ2V0Qm94KCk7XG4gICAgICAgIGNvbnN0IGNlbnRlcjEgPSBib3hDZW50ZXIoZnJvbUJveCk7XG4gICAgICAgIGNvbnN0IGNlbnRlcjIgPSBib3hDZW50ZXIodG9Cb3gpO1xuXG4gICAgICAgIGNvbnN0IGxpbmU6IExpbmUgPSB7XG4gICAgICAgICAgICBmcm9tOiBjZW50ZXIxLFxuICAgICAgICAgICAgdG86IGNlbnRlcjIsXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXNlY3QxID0gYm94SW50ZXJzZWN0aW9uKGZyb21Cb3gsIGxpbmUpO1xuICAgICAgICBjb25zdCBpc2VjdDIgPSBib3hJbnRlcnNlY3Rpb24odG9Cb3gsIGxpbmUpO1xuXG4gICAgICAgIGNvbnN0IGZyb21Qb2ludCA9IGlzZWN0MSB8fCBjZW50ZXIxO1xuICAgICAgICBjb25zdCB0b1BvaW50ID0gaXNlY3QyIHx8IGNlbnRlcjI7XG5cbiAgICAgICAgY29uc3Qgc3ZnTGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhTVkdfTlMsICdsaW5lJyk7XG4gICAgICAgIHN2Z0xpbmUuc2V0QXR0cmlidXRlKCd4MScsIGZyb21Qb2ludC54LnRvU3RyaW5nKCkpO1xuICAgICAgICBzdmdMaW5lLnNldEF0dHJpYnV0ZSgneDInLCB0b1BvaW50LngudG9TdHJpbmcoKSk7XG4gICAgICAgIHN2Z0xpbmUuc2V0QXR0cmlidXRlKCd5MScsIGZyb21Qb2ludC55LnRvU3RyaW5nKCkpO1xuICAgICAgICBzdmdMaW5lLnNldEF0dHJpYnV0ZSgneTInLCB0b1BvaW50LnkudG9TdHJpbmcoKSk7XG4gICAgICAgIHN2Z0xpbmUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCAnYmxhY2snKTtcbiAgICAgICAgc3ZnTGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsICcyJyk7XG4gICAgICAgIHN2Z0xpbmUuc2V0QXR0cmlidXRlKCdtYXJrZXItZW5kJywgJ3VybCgjYXJyb3doZWFkKScpO1xuXG4gICAgICAgIHRoaXMubGlua3NTdmcuYXBwZW5kQ2hpbGQoc3ZnTGluZSk7XG4gICAgICAgIHRoaXMubGluZVN2ZyA9IHN2Z0xpbmU7XG4gICAgfVxuXG4gICAgZ2V0IGZyb20oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdmcm9tJyk7XG4gICAgfVxuXG4gICAgZ2V0IHRvKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndG8nKTtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgnc2VsZWN0ZWQnKTtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0ZWQoc2VsZWN0ZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKERnTGluay5UQUcsIERnTGluaylcbiIsImltcG9ydCB7IGRpdiwgc2xvdCwgc3R5bGUsIHRleHQgfSBmcm9tIFwiLi4vYnVpbGRlci9IdG1sQnVpbGRlclwiO1xuaW1wb3J0IHsgc2FmZVBhcnNlSW50IH0gZnJvbSBcIi4uL1NhZmVQYXJzZUludFwiO1xuaW1wb3J0IHsgQm94LCBib3hFcXVhbHMgfSBmcm9tIFwiLi9nZW9tZXRyeS9Cb3hcIjtcbmltcG9ydCB7IERnRGlhZ3JhbSB9IGZyb20gXCIuL0RnRGlhZ3JhbVwiO1xuXG5jb25zdCBjc3MgPSBgXG4gICAgLmRnLW5vZGUge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7ICAgXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47ICAgIFxuICAgIH1cbmA7XG5cbmV4cG9ydCBjbGFzcyBEZ05vZGUgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cbiAgICBzdGF0aWMgVEFHID0gXCJkZy1ub2RlXCI7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IGRnTm9kZTogSFRNTERpdkVsZW1lbnQ7XG4gICAgcHJpdmF0ZSByZWFkb25seSBkZ1Nsb3Q6IEhUTUxTbG90RWxlbWVudDtcbiAgICBwcml2YXRlIG1vdXNlRG93bkJveDogQm94IHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGNvbnN0IHNoYWRvdyA9IHRoaXMuYXR0YWNoU2hhZG93KHttb2RlOidvcGVuJ30pO1xuICAgICAgICB0aGlzLmRnU2xvdCA9IHNsb3Qoe30pO1xuICAgICAgICB0aGlzLmRnTm9kZSA9IGRpdih7Y2xhc3NOYW1lOiAnZGctbm9kZSd9LCB0aGlzLmRnU2xvdCk7XG4gICAgICAgIHNoYWRvdy5hcHBlbmRDaGlsZCh0aGlzLmRnTm9kZSk7XG4gICAgICAgIHNoYWRvdy5hcHBlbmRDaGlsZChzdHlsZSh7fSwgdGV4dChjc3MpKSk7XG4gICAgfVxuXG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmRnTm9kZS5zdHlsZTtcbiAgICAgICAgcy5sZWZ0ID0gdGhpcy54ICsgXCJweFwiO1xuICAgICAgICBzLnRvcCA9IHRoaXMueSArIFwicHhcIjtcbiAgICAgICAgcy53aWR0aCA9IHRoaXMudyArIFwicHhcIjtcbiAgICAgICAgcy5oZWlnaHQgPSB0aGlzLmggKyBcInB4XCI7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tb3VzZURvd25Cb3ggPSB0aGlzLmdldEJveCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMubW91c2VEb3duQm94KSB7XG4gICAgICAgICAgICAgICAgaWYgKGJveEVxdWFscyh0aGlzLmdldEJveCgpLCB0aGlzLm1vdXNlRG93bkJveCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICF0aGlzLnNlbGVjdGVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubW91c2VEb3duQm94ID0gdW5kZWZpbmVkO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5nZXREZ0RpYWdyYW0oKS5yZWdpc3Rlck5vZGUodGhpcyk7XG4gICAgfVxuXG4gICAgZ2V0Qm94KCk6IEJveCB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiB0aGlzLngsXG4gICAgICAgICAgICB5OiB0aGlzLnksXG4gICAgICAgICAgICB3OiB0aGlzLncsXG4gICAgICAgICAgICBoOiB0aGlzLmgsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICAgICAgcmV0dXJuIFsneCcsICd5JywgJ2gnLCAndyddO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmlyZU1vdmVkKCkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoXG4gICAgICAgICAgICAgICAgJ21vdmVkJyxcbiAgICAgICAgICAgICAgICB7IGRldGFpbDogdGhpcyB9XG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICB9XG5cbiAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZTogc3RyaW5nLCBvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmRnTm9kZS5zdHlsZTtcbiAgICAgICAgaWYgKG9sZFZhbHVlID09PSBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgY2FzZSAneCc6IHtcbiAgICAgICAgICAgICAgICBzLmxlZnQgPSB0aGlzLnggKyAncHgnO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZU1vdmVkKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICd5Jzoge1xuICAgICAgICAgICAgICAgIHMudG9wID0gdGhpcy55ICsgJ3B4JztcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmVNb3ZlZCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAndyc6IHtcbiAgICAgICAgICAgICAgICBzLndpZHRoID0gdGhpcy53ICsgJ3B4JztcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmVNb3ZlZCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAnaCc6IHtcbiAgICAgICAgICAgICAgICBzLmhlaWdodCA9IHRoaXMuaCArICdweCc7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlTW92ZWQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgIH1cblxuICAgIGdldCB4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ3gnKSk7XG4gICAgfVxuXG4gICAgc2V0IHgoeDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd4JywgeC50b1N0cmluZygpKTtcbiAgICAgICAgdGhpcy5kZ05vZGUuc3R5bGUubGVmdCA9IHggKyAncHgnO1xuICAgIH1cblxuICAgIGdldCB5KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ3knKSk7XG4gICAgfVxuXG4gICAgc2V0IHkoeTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd5JywgeS50b1N0cmluZygpKTtcbiAgICAgICAgdGhpcy5kZ05vZGUuc3R5bGUudG9wID0geSArICdweCc7XG4gICAgfVxuXG4gICAgZ2V0IGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNhZmVQYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgnaCcpKTtcbiAgICB9XG5cbiAgICBzZXQgaChoOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2gnLCBoLnRvU3RyaW5nKCkpO1xuICAgICAgICB0aGlzLmRnTm9kZS5zdHlsZS5oZWlnaHQgPSBoICsgJ3B4JztcbiAgICB9XG5cbiAgICBnZXQgdygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc2FmZVBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCd3JykpO1xuICAgIH1cblxuICAgIHNldCB3KHc6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgndycsIHcudG9TdHJpbmcoKSk7XG4gICAgICAgIHRoaXMuZGdOb2RlLnN0eWxlLndpZHRoID0gdyArICdweCc7XG4gICAgfVxuXG4gICAgZ2V0IHNlbGVjdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGVkKHM6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdzZWxlY3RlZCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0RGdEaWFncmFtKCk6IERnRGlhZ3JhbSB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiBEZ0RpYWdyYW0uZ2V0UGFyZW50RGdEaWFncmFtKHRoaXMpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRQYXJlbnREZ05vZGUoZnJvbTogSFRNTEVsZW1lbnQpOiBEZ05vZGUgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoZnJvbS5wYXJlbnRFbGVtZW50IGluc3RhbmNlb2YgRGdOb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbS5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIGlmIChmcm9tLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBEZ05vZGUuZ2V0UGFyZW50RGdOb2RlKGZyb20ucGFyZW50RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cblxuXG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShEZ05vZGUuVEFHLCBEZ05vZGUpO1xuIiwiaW1wb3J0IHtzYWZlUGFyc2VJbnR9IGZyb20gXCIuLi9TYWZlUGFyc2VJbnRcIjtcbmltcG9ydCB7RGdOb2RlfSBmcm9tIFwiLi9EZ05vZGVcIjtcbmltcG9ydCB7ZGl2LCBlbXB0eSwgcHgsIHNsb3QsIHN0eWxlLCB0ZXh0fSBmcm9tIFwiLi4vYnVpbGRlci9IdG1sQnVpbGRlclwiO1xuaW1wb3J0IHtkcmFnRGVsdGFzLCBkcmFnVXBkYXRlLCBNb3VzZURyYWcsIG5ld01vdXNlRHJhZ30gZnJvbSBcIi4vTW91c2VEcmFnXCI7XG5cbnR5cGUgRHJhZ01vZGUgPVxuICAgIHwgJ3RvcCdcbiAgICB8ICdib3R0b20nXG4gICAgfCAnbGVmdCdcbiAgICB8ICdyaWdodCdcbiAgICB8ICd0b3AtbGVmdCdcbiAgICB8ICd0b3AtcmlnaHQnXG4gICAgfCAnYm90dG9tLWxlZnQnXG4gICAgfCAnYm90dG9tLXJpZ2h0J1xuXG5pbnRlcmZhY2UgUmVzaXplU3RhdGUge1xuICAgIHJlYWRvbmx5IHJlZlg6IG51bWJlcjtcbiAgICByZWFkb25seSByZWZZOiBudW1iZXI7XG4gICAgcmVhZG9ubHkgcmVmVzogbnVtYmVyO1xuICAgIHJlYWRvbmx5IHJlZkg6IG51bWJlcjtcbiAgICByZWFkb25seSBtb2RlOiBEcmFnTW9kZTtcbiAgICBtb3VzZURyYWc6IE1vdXNlRHJhZztcbn1cblxuY29uc3QgTUlOX1NJWkUgPSAxMDtcblxuZXhwb3J0IGNsYXNzIERnUmVzaXplYWJsZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICAgIHN0YXRpYyBUQUcgPSAnZGctcmVzaXplYWJsZSc7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IHNoYWRvdzogU2hhZG93Um9vdDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJlRWxlbXM6IFJlYWRvbmx5QXJyYXk8SFRNTERpdkVsZW1lbnQ+O1xuXG4gICAgcHJpdmF0ZSBkcmFnU3RhdGU6IFJlc2l6ZVN0YXRlIHwgdW5kZWZpbmVkO1xuXG4gICAgcHJpdmF0ZSBkb2NNb3VzZU1vdmUgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5kcmFnU3RhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGRnTm9kZSA9IERnTm9kZS5nZXRQYXJlbnREZ05vZGUodGhpcyk7XG4gICAgICAgICAgICBpZiAoZGdOb2RlKSB7XG4gICAgICAgICAgICAgICAgZHJhZ1VwZGF0ZSh0aGlzLmRyYWdTdGF0ZS5tb3VzZURyYWcsIGUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZHgsIGR5IH0gPSBkcmFnRGVsdGFzKHRoaXMuZHJhZ1N0YXRlLm1vdXNlRHJhZyk7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmRyYWdTdGF0ZS5tb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0b3BcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyByZWZZLCByZWZIIH0gPSB0aGlzLmRyYWdTdGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1kgPSByZWZZICsgZHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdIID0gcmVmSCAtIGR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0ggPCBNSU5fU0laRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRnTm9kZS55ID0gbmV3WTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRnTm9kZS5oID0gbmV3SDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJib3R0b21cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyByZWZIIH0gPSB0aGlzLmRyYWdTdGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0ggPSByZWZIICsgZHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3SCA8IE1JTl9TSVpFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGdOb2RlLmggPSBuZXdIO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImxlZnRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyByZWZYLCByZWZXIH0gPSB0aGlzLmRyYWdTdGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1ggPSByZWZYICsgZHg7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdXID0gcmVmVyAtIGR4O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1cgPCBNSU5fU0laRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRnTm9kZS54ID0gbmV3WDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRnTm9kZS53ID0gbmV3VztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJyaWdodFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHJlZlcgfSA9IHRoaXMuZHJhZ1N0YXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3VyA9IHJlZlcgKyBkeDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdXIDwgTUlOX1NJWkUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBkZ05vZGUudyA9IG5ld1c7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidG9wLWxlZnRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyByZWZYLCByZWZXLCByZWZZLCByZWZIIH0gPSB0aGlzLmRyYWdTdGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdZID0gcmVmWSArIGR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0ggPSByZWZIIC0gZHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3SCA8IE1JTl9TSVpFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3SCA9IE1JTl9TSVpFO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlbHRhSCA9IG5ld0ggLSByZWZIO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1kgPSByZWZZIC0gZGVsdGFIO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1ggPSByZWZYICsgZHg7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3VyA9IHJlZlcgLSBkeDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdXIDwgTUlOX1NJWkUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdXID0gTUlOX1NJWkU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVsdGFXID0gbmV3VyAtIHJlZlc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3WCA9IHJlZlggLSBkZWx0YVc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBkZ05vZGUueSA9IG5ld1k7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZ05vZGUuaCA9IG5ld0g7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZ05vZGUueCA9IG5ld1g7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZ05vZGUudyA9IG5ld1c7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPIG90aGVyIHJlc2l6ZSBtb2Rlcy4uLlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZG9jTW91c2VVcCA9ICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5kb2NNb3VzZU1vdmUpO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5kb2NNb3VzZVVwKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zaGFkb3cgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICAgICAgdGhpcy5zaGFkb3cuYXBwZW5kQ2hpbGQoc2xvdCh7fSkpO1xuXG4gICAgICAgIGNvbnN0IHJlVG9wID0gZGl2KHsgY2xhc3NOYW1lOiAnZGctcmVzaXplLWVsZW0gJ30pO1xuICAgICAgICByZVRvcC5zdHlsZS50b3AgPSBcIjBcIjtcbiAgICAgICAgcmVUb3Auc3R5bGUubGVmdCA9IFwiMnB4XCI7XG4gICAgICAgIHJlVG9wLnN0eWxlLnJpZ2h0ID0gXCIycHhcIjtcbiAgICAgICAgcmVUb3Auc3R5bGUuaGVpZ2h0ID0gXCIycHhcIjtcbiAgICAgICAgcmVUb3Auc3R5bGUuY3Vyc29yID0gXCJucy1yZXNpemVcIjtcbiAgICAgICAgcmVUb3AuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vblJlTW91c2VEb3duKCd0b3AnKSk7XG5cbiAgICAgICAgY29uc3QgcmVCb3R0b20gPSBkaXYoeyBjbGFzc05hbWU6ICdkZy1yZXNpemUtZWxlbSAnfSk7XG4gICAgICAgIHJlQm90dG9tLnN0eWxlLmJvdHRvbSA9IFwiMFwiO1xuICAgICAgICByZUJvdHRvbS5zdHlsZS5sZWZ0ID0gXCIycHhcIjtcbiAgICAgICAgcmVCb3R0b20uc3R5bGUucmlnaHQgPSBcIjJweFwiO1xuICAgICAgICByZUJvdHRvbS5zdHlsZS5oZWlnaHQgPSBcIjJweFwiO1xuICAgICAgICByZUJvdHRvbS5zdHlsZS5jdXJzb3IgPSBcIm5zLXJlc2l6ZVwiO1xuICAgICAgICByZUJvdHRvbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uUmVNb3VzZURvd24oJ2JvdHRvbScpKTtcblxuICAgICAgICBjb25zdCByZUxlZnQgPSBkaXYoeyBjbGFzc05hbWU6ICdkZy1yZXNpemUtZWxlbSAnfSk7XG4gICAgICAgIHJlTGVmdC5zdHlsZS50b3AgPSBcIjJweFwiO1xuICAgICAgICByZUxlZnQuc3R5bGUuYm90dG9tID0gXCIycHhcIjtcbiAgICAgICAgcmVMZWZ0LnN0eWxlLmxlZnQgPSBcIjBcIjtcbiAgICAgICAgcmVMZWZ0LnN0eWxlLndpZHRoID0gXCIycHhcIjtcbiAgICAgICAgcmVMZWZ0LnN0eWxlLmN1cnNvciA9IFwiZXctcmVzaXplXCI7XG4gICAgICAgIHJlTGVmdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uUmVNb3VzZURvd24oJ2xlZnQnKSk7XG5cbiAgICAgICAgY29uc3QgcmVSaWdodCA9IGRpdih7IGNsYXNzTmFtZTogJ2RnLXJlc2l6ZS1lbGVtICd9KTtcbiAgICAgICAgcmVSaWdodC5zdHlsZS50b3AgPSBcIjJweFwiO1xuICAgICAgICByZVJpZ2h0LnN0eWxlLmJvdHRvbSA9IFwiMnB4XCI7XG4gICAgICAgIHJlUmlnaHQuc3R5bGUucmlnaHQgPSBcIjBcIjtcbiAgICAgICAgcmVSaWdodC5zdHlsZS53aWR0aCA9IFwiMnB4XCI7XG4gICAgICAgIHJlUmlnaHQuc3R5bGUuY3Vyc29yID0gXCJldy1yZXNpemVcIjtcbiAgICAgICAgcmVSaWdodC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uUmVNb3VzZURvd24oJ3JpZ2h0JykpO1xuXG4gICAgICAgIGNvbnN0IHJlVG9wTGVmdCA9IGRpdih7IGNsYXNzTmFtZTogJ2RnLXJlc2l6ZS1lbGVtICd9KTtcbiAgICAgICAgcmVUb3BMZWZ0LnN0eWxlLnRvcCA9IFwiMFwiO1xuICAgICAgICByZVRvcExlZnQuc3R5bGUubGVmdCA9IFwiMFwiO1xuICAgICAgICByZVRvcExlZnQuc3R5bGUud2lkdGggPSBcIjJweFwiO1xuICAgICAgICByZVRvcExlZnQuc3R5bGUuaGVpZ2h0ID0gXCIycHhcIjtcbiAgICAgICAgcmVUb3BMZWZ0LnN0eWxlLmN1cnNvciA9IFwibndzZS1yZXNpemVcIjtcbiAgICAgICAgcmVUb3BMZWZ0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25SZU1vdXNlRG93bigndG9wLWxlZnQnKSk7XG5cbiAgICAgICAgY29uc3QgcmVUb3BSaWdodCA9IGRpdih7IGNsYXNzTmFtZTogJ2RnLXJlc2l6ZS1lbGVtICd9KTtcbiAgICAgICAgcmVUb3BSaWdodC5zdHlsZS50b3AgPSBcIjBcIjtcbiAgICAgICAgcmVUb3BSaWdodC5zdHlsZS5yaWdodCA9IFwiMFwiO1xuICAgICAgICByZVRvcFJpZ2h0LnN0eWxlLndpZHRoID0gXCIycHhcIjtcbiAgICAgICAgcmVUb3BSaWdodC5zdHlsZS5oZWlnaHQgPSBcIjJweFwiO1xuICAgICAgICByZVRvcFJpZ2h0LnN0eWxlLmN1cnNvciA9IFwibmVzdy1yZXNpemVcIjtcbiAgICAgICAgcmVUb3BSaWdodC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uUmVNb3VzZURvd24oJ3RvcC1yaWdodCcpKTtcblxuICAgICAgICBjb25zdCByZUJvdHRvbUxlZnQgPSBkaXYoeyBjbGFzc05hbWU6ICdkZy1yZXNpemUtZWxlbSAnfSk7XG4gICAgICAgIHJlQm90dG9tTGVmdC5zdHlsZS5ib3R0b20gPSBcIjBcIjtcbiAgICAgICAgcmVCb3R0b21MZWZ0LnN0eWxlLmxlZnQgPSBcIjBcIjtcbiAgICAgICAgcmVCb3R0b21MZWZ0LnN0eWxlLndpZHRoID0gXCIycHhcIjtcbiAgICAgICAgcmVCb3R0b21MZWZ0LnN0eWxlLmhlaWdodCA9IFwiMnB4XCI7XG4gICAgICAgIHJlQm90dG9tTGVmdC5zdHlsZS5jdXJzb3IgPSBcIm5lc3ctcmVzaXplXCI7XG4gICAgICAgIHJlQm90dG9tTGVmdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uUmVNb3VzZURvd24oJ2JvdHRvbS1sZWZ0JykpO1xuXG4gICAgICAgIGNvbnN0IHJlQm90dG9tUmlnaHQgPSBkaXYoeyBjbGFzc05hbWU6ICdkZy1yZXNpemUtZWxlbSAnfSk7XG4gICAgICAgIHJlQm90dG9tUmlnaHQuc3R5bGUuYm90dG9tID0gXCIwXCI7XG4gICAgICAgIHJlQm90dG9tUmlnaHQuc3R5bGUucmlnaHQgPSBcIjBcIjtcbiAgICAgICAgcmVCb3R0b21SaWdodC5zdHlsZS53aWR0aCA9IFwiMnB4XCI7XG4gICAgICAgIHJlQm90dG9tUmlnaHQuc3R5bGUuaGVpZ2h0ID0gXCIycHhcIjtcbiAgICAgICAgcmVCb3R0b21SaWdodC5zdHlsZS5jdXJzb3IgPSBcIm53c2UtcmVzaXplXCI7XG4gICAgICAgIHJlQm90dG9tUmlnaHQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vblJlTW91c2VEb3duKCdib3R0b20tcmlnaHQnKSk7XG5cbiAgICAgICAgdGhpcy5yZUVsZW1zID0gW1xuICAgICAgICAgICAgcmVUb3BMZWZ0LFxuICAgICAgICAgICAgcmVUb3AsXG4gICAgICAgICAgICByZVRvcFJpZ2h0LFxuICAgICAgICAgICAgcmVSaWdodCxcbiAgICAgICAgICAgIHJlQm90dG9tUmlnaHQsXG4gICAgICAgICAgICByZUJvdHRvbSxcbiAgICAgICAgICAgIHJlQm90dG9tTGVmdCxcbiAgICAgICAgICAgIHJlTGVmdFxuICAgICAgICBdXG5cbiAgICAgICAgdGhpcy5zaGFkb3cuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICBzdHlsZShcbiAgICAgICAgICAgICAgICB7fSxcbiAgICAgICAgICAgICAgICB0ZXh0KGBcbiAgICAgICAgICAgICAgICAgICAgLmRnLXJlc2l6ZS1lbGVtIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDsgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlOyBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGApKVxuICAgICAgICApXG5cbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT5cbiAgICAgICAgICAgIHRoaXMuYWRkUmVzaXplRWxlbXMoKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5yZW1vdmVSZXNpemVFbGVtcygpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblJlTW91c2VEb3duKG1vZGU6IERyYWdNb2RlKTogKGU6TW91c2VFdmVudCkgPT4gdm9pZCB7XG4gICAgICAgIHJldHVybiBlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRnTm9kZSA9IERnTm9kZS5nZXRQYXJlbnREZ05vZGUodGhpcyk7XG4gICAgICAgICAgICBpZiAoZGdOb2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIG1vdXNlRHJhZzogbmV3TW91c2VEcmFnKGUpLFxuICAgICAgICAgICAgICAgICAgICBtb2RlLFxuICAgICAgICAgICAgICAgICAgICByZWZXOiBkZ05vZGUudyxcbiAgICAgICAgICAgICAgICAgICAgcmVmSDogZGdOb2RlLmgsXG4gICAgICAgICAgICAgICAgICAgIHJlZlg6IGRnTm9kZS54LFxuICAgICAgICAgICAgICAgICAgICByZWZZOiBkZ05vZGUueSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuZG9jTW91c2VNb3ZlKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5kb2NNb3VzZVVwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYWRkUmVzaXplRWxlbXMoKSB7XG4gICAgICAgIHRoaXMucmVFbGVtcy5mb3JFYWNoKGUgPT4gdGhpcy5zaGFkb3cuYXBwZW5kQ2hpbGQoZSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlUmVzaXplRWxlbXMoKSB7XG4gICAgICAgIHRoaXMucmVFbGVtcy5mb3JFYWNoKGUgPT4gdGhpcy5zaGFkb3cucmVtb3ZlQ2hpbGQoZSkpO1xuICAgIH1cblxuICAgIGdldCBoZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNhZmVQYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgnaGVpZ2h0JykpO1xuICAgIH1cblxuICAgIHNldCBoZWlnaHQoaGVpZ2h0OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGhlaWdodC50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNhZmVQYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgnaGVpZ2h0JykpO1xuICAgIH1cblxuICAgIHNldCB3aWR0aCh3aWR0aDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHdpZHRoLnRvU3RyaW5nKCkpO1xuICAgIH1cblxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRGdSZXNpemVhYmxlLlRBRywgRGdSZXNpemVhYmxlKTtcbiIsImV4cG9ydCBpbnRlcmZhY2UgTW91c2VEcmFnIHtcbiAgICByZWFkb25seSBkb3duWDogbnVtYmVyO1xuICAgIHJlYWRvbmx5IGRvd25ZOiBudW1iZXI7XG4gICAgY3VyWDogbnVtYmVyO1xuICAgIGN1clk6IG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5ld01vdXNlRHJhZyhlOiBNb3VzZUV2ZW50KTogTW91c2VEcmFnIHtcbiAgICBjb25zdCB7IGNsaWVudFgsIGNsaWVudFkgfSA9IGU7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZG93blg6IGNsaWVudFgsXG4gICAgICAgIGRvd25ZOiBjbGllbnRZLFxuICAgICAgICBjdXJYOiBjbGllbnRYLFxuICAgICAgICBjdXJZOiBjbGllbnRZLFxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRyYWdEZWx0YXMoZDogTW91c2VEcmFnKTogeyBkeDogbnVtYmVyLCBkeTogbnVtYmVyIH0ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGR4OiBkLmN1clggLSBkLmRvd25YLFxuICAgICAgICBkeTogZC5jdXJZIC0gZC5kb3duWSxcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkcmFnVXBkYXRlKGQ6IE1vdXNlRHJhZywgZTogTW91c2VFdmVudCkge1xuICAgIGQuY3VyWCA9IGUuY2xpZW50WDtcbiAgICBkLmN1clkgPSBlLmNsaWVudFk7XG59XG5cbiIsImltcG9ydCB7IExpbmUsIGxpbmVJbnRlcnNlY3Rpb24gfSBmcm9tIFwiLi9MaW5lXCI7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuL1BvaW50XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQm94IHtcbiAgICByZWFkb25seSB4OiBudW1iZXI7XG4gICAgcmVhZG9ubHkgeTogbnVtYmVyO1xuICAgIHJlYWRvbmx5IHc6IG51bWJlcjtcbiAgICByZWFkb25seSBoOiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBib3hFcXVhbHMoYjE6IEJveCwgYjI6IEJveCk6IGJvb2xlYW4ge1xuICAgIGlmIChiMSA9PSBiMikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGIxLnggPT09IGIyLnggJiZcbiAgICAgICAgYjEueSA9PT0gYjIueSAmJlxuICAgICAgICBiMS53ID09PSBiMi53ICYmXG4gICAgICAgIGIxLmggPT09IGIyLmg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBib3hDZW50ZXIoYjogQm94KTogUG9pbnQge1xuICAgIHJldHVybiB7XG4gICAgICAgIHg6IGIueCArIE1hdGgucm91bmQoYi53IC8gMiksXG4gICAgICAgIHk6IGIueSArIE1hdGgucm91bmQoYi5oIC8gMilcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGJveFRvTGluZXMoYm94OiBCb3gpOiBSZWFkb25seUFycmF5PExpbmU+IHtcbiAgICBjb25zdCB7IHgsIHkgLCB3LCBoIH0gPSBib3g7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgeyBcbiAgICAgICAgICAgIGZyb206IHsgeCwgeSB9LFxuICAgICAgICAgICAgdG86IHsgeDogeCArIHcsIHl9XG4gICAgICAgIH0sXG4gICAgICAgIHsgXG4gICAgICAgICAgICBmcm9tOiB7IHg6IHggKyB3LCB5fSxcbiAgICAgICAgICAgIHRvOiB7IHg6IHggKyB3LCB5OiB5ICsgaCB9XG4gICAgICAgIH0sXG4gICAgICAgIHsgXG4gICAgICAgICAgICBmcm9tOiB7IHg6IHggKyB3LCB5OiB5ICsgaCB9LFxuICAgICAgICAgICAgdG86IHsgeCwgeTogeSArIGggfSxcbiAgICAgICAgfSxcbiAgICAgICAgeyBcbiAgICAgICAgICAgIGZyb206IHsgeCwgeTogeSArIGggfSxcbiAgICAgICAgICAgIHRvOiB7IHgsIHkgfSxcbiAgICAgICAgfSxcbiAgICBdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBib3hJbnRlcnNlY3Rpb24oYm94OiBCb3gsIGxpbmU6IExpbmUpOiBQb2ludCB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgbGluZXMgPSBib3hUb0xpbmVzKGJveCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgY29uc3QgcCA9IGxpbmVJbnRlcnNlY3Rpb24obGluZXNbaV0sIGxpbmUpO1xuICAgICAgICBpZiAocCkge1xuICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi9Qb2ludFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIExpbmUge1xuICAgIHJlYWRvbmx5IGZyb206IFBvaW50O1xuICAgIHJlYWRvbmx5IHRvOiBQb2ludDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVJbnRlcnNlY3Rpb24obDE6IExpbmUsIGwyOiBMaW5lKTogUG9pbnQgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiBpbnRlcnNlY3QobDEuZnJvbS54LCBsMS5mcm9tLnksIGwxLnRvLngsIGwxLnRvLnksIGwyLmZyb20ueCwgbDIuZnJvbS55LCBsMi50by54LCBsMi50by55KTtcbn1cblxuLy8gbGluZSBpbnRlcmNlcHQgbWF0aCBieSBQYXVsIEJvdXJrZSBodHRwOi8vcGF1bGJvdXJrZS5uZXQvZ2VvbWV0cnkvcG9pbnRsaW5lcGxhbmUvXG4vLyBEZXRlcm1pbmUgdGhlIGludGVyc2VjdGlvbiBwb2ludCBvZiB0d28gbGluZSBzZWdtZW50c1xuLy8gUmV0dXJuIHVuZGVmaW5lZCBpZiB0aGUgbGluZXMgZG9uJ3QgaW50ZXJzZWN0XG5mdW5jdGlvbiBpbnRlcnNlY3QoeDE6IG51bWJlciwgeTE6IG51bWJlciwgeDI6IG51bWJlciwgeTI6IG51bWJlciwgeDM6IG51bWJlciwgeTM6IG51bWJlciwgeDQ6IG51bWJlciwgeTQ6IG51bWJlcik6IFBvaW50IHwgdW5kZWZpbmVkIHtcblxuICAgIC8vIENoZWNrIGlmIG5vbmUgb2YgdGhlIGxpbmVzIGFyZSBvZiBsZW5ndGggMFxuICAgICAgaWYgKCh4MSA9PT0geDIgJiYgeTEgPT09IHkyKSB8fCAoeDMgPT09IHg0ICYmIHkzID09PSB5NCkpIHtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICBcbiAgICAgIGNvbnN0IGRlbm9taW5hdG9yID0gKCh5NCAtIHkzKSAqICh4MiAtIHgxKSAtICh4NCAtIHgzKSAqICh5MiAtIHkxKSlcbiAgXG4gICAgLy8gTGluZXMgYXJlIHBhcmFsbGVsXG4gICAgICBpZiAoZGVub21pbmF0b3IgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICBcbiAgICAgIGxldCB1YSA9ICgoeDQgLSB4MykgKiAoeTEgLSB5MykgLSAoeTQgLSB5MykgKiAoeDEgLSB4MykpIC8gZGVub21pbmF0b3JcbiAgICAgIGxldCB1YiA9ICgoeDIgLSB4MSkgKiAoeTEgLSB5MykgLSAoeTIgLSB5MSkgKiAoeDEgLSB4MykpIC8gZGVub21pbmF0b3JcbiAgXG4gICAgLy8gaXMgdGhlIGludGVyc2VjdGlvbiBhbG9uZyB0aGUgc2VnbWVudHNcbiAgICAgIGlmICh1YSA8IDAgfHwgdWEgPiAxIHx8IHViIDwgMCB8fCB1YiA+IDEpIHtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICB9XG4gIFxuICAgIC8vIFJldHVybiBhIG9iamVjdCB3aXRoIHRoZSB4IGFuZCB5IGNvb3JkaW5hdGVzIG9mIHRoZSBpbnRlcnNlY3Rpb25cbiAgICAgIGxldCB4ID0geDEgKyB1YSAqICh4MiAtIHgxKVxuICAgICAgbGV0IHkgPSB5MSArIHVhICogKHkyIC0geTEpXG4gIFxuICAgICAgcmV0dXJuIHt4LCB5fVxuICB9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBDdXN0b21lckFwcCB9IGZyb20gXCIuL2N1c3RvbWVyL0N1c3RvbWVyQXBwXCI7XG5pbXBvcnQgeyBEZ0RpYWdyYW0gfSBmcm9tIFwiLi9kaWFncmFtL0RnRGlhZ3JhbVwiO1xuaW1wb3J0IHsgRGdEcmFnZ2FibGUgfSBmcm9tIFwiLi9kaWFncmFtL0RnRHJhZ2dhYmxlXCI7XG5pbXBvcnQgeyBEZ0xpbmsgfSBmcm9tIFwiLi9kaWFncmFtL0RnTGlua1wiO1xuaW1wb3J0IHsgRGdOb2RlIH0gZnJvbSBcIi4vZGlhZ3JhbS9EZ05vZGVcIjtcbmltcG9ydCB7IFNjcm9sbEl0ZW0gfSBmcm9tIFwiLi92aXJ0dWFsLXNjcm9sbGVyL1Njcm9sbEl0ZW1cIjtcbmltcG9ydCB7IFZpcnR1YWxTY3JvbGxlciB9IGZyb20gXCIuL3ZpcnR1YWwtc2Nyb2xsZXIvVmlydHVhbFNjcm9sbGVyXCI7XG5pbXBvcnQge0RnUmVzaXplYWJsZX0gZnJvbSBcIi4vZGlhZ3JhbS9EZ1Jlc2l6ZWFibGVcIjtcblxuLy8ganVzdCBmb3IgaW1wb3J0cyAhXG4vLyBjb25zb2xlLmxvZygneWFsbGEnLCBDdXN0b21lckFwcC5UQUdfTkFNRSwgVmlydHVhbFNjcm9sbGVyLlRBR19OQU1FLCBTY3JvbGxJdGVtLlRBR19OQU1FLCBEZ0RpYWdyYW0uVEFHLCBEZ05vZGUuVEFHLCBEZ0RyYWdnYWJsZS5UQUcpO1xuY29uc29sZS5sb2coRGdEaWFncmFtLlRBRywgRGdOb2RlLlRBRywgRGdEcmFnZ2FibGUuVEFHLCBEZ0xpbmsuVEFHLCBEZ1Jlc2l6ZWFibGUuVEFHKTtcblxuLy8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBlID0+IHtcbi8vICAgICBjb25zdCBhcHA6IEN1c3RvbWVyQXBwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpIGFzIEN1c3RvbWVyQXBwO1xuLy8gICAgIGNvbnNvbGUubG9nKFwiYXBwIGxvYWRlZFwiLCBhcHApO1xuLy8gICAgIGFwcC5pbml0KFtcbi8vICAgICAgICAgeyBmaXJzdE5hbWU6ICdUb3RvJywgbGFzdE5hbWU6ICdCaWxvdXRlJyB9LFxuLy8gICAgICAgICB7IGZpcnN0TmFtZTogJ0ZyZW5jaCcsIGxhc3ROYW1lOiAnRnJpZXMnIH0sXG4vLyAgICAgICAgIHsgZmlyc3ROYW1lOiAnRm9vJywgbGFzdE5hbWU6ICdCYXInIH0sXG4vLyAgICAgXSlcbi8vIH0pXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=