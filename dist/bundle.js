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
        this.addEventListener('mousedown', e => {
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
        if (from.parentElement instanceof _DgNode__WEBPACK_IMPORTED_MODULE_0__.DgNode) {
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
        this.getDgDiagram().registerLink(this);
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
        const svgLine = document.createElementNS(SVG_NS, 'line');
        svgLine.setAttribute('x1', isect1.x.toString());
        svgLine.setAttribute('x2', isect2.x.toString());
        svgLine.setAttribute('y1', isect1.y.toString());
        svgLine.setAttribute('y2', isect2.y.toString());
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
    getDgDiagram(from = this) {
        if (from.parentElement instanceof _DgDiagram__WEBPACK_IMPORTED_MODULE_1__.DgDiagram) {
            return from.parentElement;
        }
        if (from.parentElement) {
            return this.getDgDiagram(from.parentElement);
        }
        return undefined;
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
    getDgDiagram(from = this) {
        if (from.parentElement instanceof _DgDiagram__WEBPACK_IMPORTED_MODULE_3__.DgDiagram) {
            return from.parentElement;
        }
        if (from.parentElement) {
            return this.getDgDiagram(from.parentElement);
        }
        return undefined;
    }
}
DgNode.TAG = "dg-node";
customElements.define(DgNode.TAG, DgNode);


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




// just for imports !
// console.log('yalla', CustomerApp.TAG_NAME, VirtualScroller.TAG_NAME, ScrollItem.TAG_NAME, DgDiagram.TAG, DgNode.TAG, DgDraggable.TAG);
console.log(_diagram_DgDiagram__WEBPACK_IMPORTED_MODULE_0__.DgDiagram.TAG, _diagram_DgNode__WEBPACK_IMPORTED_MODULE_3__.DgNode.TAG, _diagram_DgDraggable__WEBPACK_IMPORTED_MODULE_1__.DgDraggable.TAG, _diagram_DgLink__WEBPACK_IMPORTED_MODULE_2__.DgLink.TAG);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy9idWlsZGVyL0h0bWxCdWlsZGVyLnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvZGlhZ3JhbS9EZ0RpYWdyYW0udHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy9kaWFncmFtL0RnRHJhZ2dhYmxlLnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvZGlhZ3JhbS9EZ0xpbmsudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy9kaWFncmFtL0RnTm9kZS50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2RpYWdyYW0vZ2VvbWV0cnkvQm94LnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvZGlhZ3JhbS9nZW9tZXRyeS9MaW5lLnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBzYWZlUGFyc2VJbnQoczpzdHJpbmcgfCBudWxsKTogbnVtYmVyIHtcbiAgICBjb25zdCBpID0gcGFyc2VJbnQocyk7XG4gICAgaWYgKGlzTmFOKGkpKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gaTtcbn0iLCJleHBvcnQgdHlwZSBEZWVwUGFydGlhbDxUPiA9IFBhcnRpYWw8eyBbUCBpbiBrZXlvZiBUXTogRGVlcFBhcnRpYWw8VFtQXT4gfT47XG5cbnR5cGUgTm9kZUJ1aWxkZXI8SyBleHRlbmRzIGtleW9mIEhUTUxFbGVtZW50VGFnTmFtZU1hcD4gPSAoXG4gIGE6IERlZXBQYXJ0aWFsPEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXT4sXG4gIC4uLmM6IE5vZGVbXVxuKSA9PiBIVE1MRWxlbWVudFRhZ05hbWVNYXBbS107XG5cbmV4cG9ydCBmdW5jdGlvbiBub2RlPEsgZXh0ZW5kcyBrZXlvZiBIVE1MRWxlbWVudFRhZ05hbWVNYXA+KHRhZzogSyk6IE5vZGVCdWlsZGVyPEs+IHtcbiAgcmV0dXJuIChhOiBEZWVwUGFydGlhbDxIVE1MRWxlbWVudFRhZ05hbWVNYXBbS10+LCAuLi5jOiBOb2RlW10pID0+IHtcbiAgICBjb25zdCBuOiBIVE1MRWxlbWVudFRhZ05hbWVNYXBbS10gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgYy5mb3JFYWNoKChjaGlsZCkgPT4gbi5hcHBlbmRDaGlsZChjaGlsZCkpO1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhhKSBhcyBBcnJheTxrZXlvZiB0eXBlb2YgYT47XG4gICAga2V5cy5mb3JFYWNoKChrKSA9PiBzZXRQcm9wZXJ0eShuLCBrLCBnZXRQcm9wZXJ0eShhLCBrKSkpO1xuICAgIHJldHVybiBuO1xuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRQcm9wZXJ0eTxULCBLIGV4dGVuZHMga2V5b2YgVD4obzogVCwga2V5OiBLKTogVFtLXSB7XG4gIHJldHVybiBvW2tleV07XG59XG5cbmZ1bmN0aW9uIHNldFByb3BlcnR5PFQsIEsgZXh0ZW5kcyBrZXlvZiBUPihvOiBULCBrZXk6IEssIHZhbHVlOiBUW0tdKTogdm9pZCB7XG4gIG9ba2V5XSA9IHZhbHVlO1xufVxuXG5leHBvcnQgY29uc3QgZGl2ID0gbm9kZSgnZGl2Jyk7XG5leHBvcnQgY29uc3Qgc3BhbiA9IG5vZGUoJ3NwYW4nKTtcbmV4cG9ydCBjb25zdCBhID0gbm9kZSgnYScpO1xuZXhwb3J0IGNvbnN0IHAgPSBub2RlKCdwJyk7XG5leHBvcnQgY29uc3QgaDEgPSBub2RlKCdoMScpO1xuZXhwb3J0IGNvbnN0IGlucHV0ID0gbm9kZSgnaW5wdXQnKTtcbmV4cG9ydCBjb25zdCBsYWJlbCA9IG5vZGUoJ2xhYmVsJyk7XG5leHBvcnQgY29uc3Qgc2xvdCA9IG5vZGUoJ3Nsb3QnKTtcbmV4cG9ydCBjb25zdCBzdHlsZSA9IG5vZGUoJ3N0eWxlJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXh0KHM6IHN0cmluZyk6IFRleHQge1xuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbXB0eShlOiBOb2RlKSB7XG4gIHdoaWxlKGUuZmlyc3RDaGlsZCkge1xuICAgIGUucmVtb3ZlQ2hpbGQoZS5maXJzdENoaWxkKTtcbiAgfVxufSIsImltcG9ydCB7IGRpdiwgc2xvdCwgc3R5bGUsIHRleHQgfSBmcm9tIFwiLi4vYnVpbGRlci9IdG1sQnVpbGRlclwiO1xuaW1wb3J0IHsgRGdMaW5rIH0gZnJvbSBcIi4vRGdMaW5rXCI7XG5pbXBvcnQgeyBEZ05vZGUgfSBmcm9tIFwiLi9EZ05vZGVcIjtcblxuY29uc3QgU1ZHX05TID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcblxuY29uc3QgZGlhZ1N0eWxlcyA9IGBcbiAgICAuZGctZGlhZ3JhbSB7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIH1cbiAgICAuZGctc2Nyb2xsLXBhbmUge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgfVxuICAgIC5kZy1saW5rcyB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgfVxuICAgIC5kZy1jb250ZW50LXBhbmUge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyZXk7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB9XG5gO1xuXG5jb25zdCBzdmdEZWZzID0gYFxuPG1hcmtlciBpZD1cImFycm93aGVhZFwiIG1hcmtlcldpZHRoPVwiMTBcIiBtYXJrZXJIZWlnaHQ9XCI3XCIgXG5yZWZYPVwiOVwiIHJlZlk9XCIzLjVcIiBvcmllbnQ9XCJhdXRvXCI+XG4gICAgPHBvbHlnb24gcG9pbnRzPVwiMCAwLCAxMCAzLjUsIDAgN1wiIC8+XG48L21hcmtlcj5cbmBcblxuZXhwb3J0IGNsYXNzIERnRGlhZ3JhbSBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICAgIHN0YXRpYyBUQUcgPSBcImRnLWRpYWdyYW1cIlxuXG4gICAgcHJpdmF0ZSBsaW5rc1N2ZzogU1ZHRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhTVkdfTlMsICdzdmcnKTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBjb25zdCBzaGFkb3cgPSB0aGlzLmF0dGFjaFNoYWRvdyh7bW9kZTogJ29wZW4nfSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmxpbmtzU3ZnLmNsYXNzTGlzdC5hZGQoJ2RnLWxpbmtzJyk7XG4gICAgICAgIGNvbnN0IGRlZnM6IFNWR0RlZnNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFNWR19OUywgJ3N2ZycpO1xuICAgICAgICBkZWZzLmlubmVySFRNTCA9IHN2Z0RlZnM7XG4gICAgICAgIHRoaXMubGlua3NTdmcuYXBwZW5kQ2hpbGQoZGVmcyk7XG4gICAgICAgIGNvbnN0IGxpbmtzU2xvdDogSFRNTFNsb3RFbGVtZW50ID0gc2xvdCh7IG5hbWU6IFwibGlua3NcIn0pXG4gICAgICAgIHRoaXMubGlua3NTdmcuYXBwZW5kQ2hpbGQobGlua3NTbG90KTtcblxuICAgICAgICBjb25zdCBzY3JvbGxQYW5lID0gZGl2KFxuICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdkZy1zY3JvbGwtcGFuZScgfSxcbiAgICAgICAgICAgIHRoaXMubGlua3NTdmcsXG4gICAgICAgICAgICBzbG90KHt9KSxcbiAgICAgICAgKTtcblxuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQoc2Nyb2xsUGFuZSk7XG4gICAgICAgIHNoYWRvdy5hcHBlbmRDaGlsZChzdHlsZSh7fSwgdGV4dChkaWFnU3R5bGVzKSkpO1xuICAgIH0gICAgXG5cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB9XG5cbiAgICBnZXREZ05vZGVzKCk6IFJlYWRvbmx5QXJyYXk8RGdOb2RlPiB7XG4gICAgICAgIGNvbnN0IHEgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGw8RGdOb2RlPihEZ05vZGUuVEFHKTtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20ocSk7XG4gICAgfVxuXG4gICAgZ2V0Tm9kZUJ5SWQoaWQ6IHN0cmluZyk6IERnTm9kZSB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERnTm9kZXMoKS5maW5kKG4gPT4gbi5pZCA9PT0gaWQpO1xuICAgIH1cblxuICAgIGdldERnTGlua3MoKTogUmVhZG9ubHlBcnJheTxEZ0xpbms+IHtcbiAgICAgICAgY29uc3QgcSA9IHRoaXMucXVlcnlTZWxlY3RvckFsbDxEZ0xpbms+KERnTGluay5UQUcpO1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShxKTtcbiAgICB9XG5cbiAgICByZWdpc3RlckxpbmsobGluazogRGdMaW5rKSB7XG4gICAgICAgIGNvbnN0IGxpbmUgPSBsaW5rLmRyYXdMaW5rKHRoaXMuZ2V0Tm9kZUJ5SWQobGluay5mcm9tKSwgdGhpcy5nZXROb2RlQnlJZChsaW5rLnRvKSk7XG4gICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKFwiZnJvbVwiLCBsaW5rLmZyb20pO1xuICAgICAgICBsaW5lLnNldEF0dHJpYnV0ZShcInRvXCIsIGxpbmsudG8pO1xuICAgICAgICB0aGlzLmxpbmtzU3ZnLmFwcGVuZENoaWxkKGxpbmUpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyTm9kZShub2RlOiBEZ05vZGUpIHtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3ZlZCcsICgpID0+IHtcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBhbGwgbGlua3NcbiAgICAgICAgICAgIHRoaXMubGlua3NTdmcucXVlcnlTZWxlY3RvckFsbChcImxpbmVcIilcbiAgICAgICAgICAgICAgICAuZm9yRWFjaChsaW5lID0+IGxpbmUucmVtb3ZlKCkpO1xuICAgICAgICAgICAgLy8gYWRkIG5ld1xuICAgICAgICAgICAgdGhpcy5nZXREZ0xpbmtzKClcbiAgICAgICAgICAgICAgICAuZm9yRWFjaChsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGluZSA9IGwuZHJhd0xpbmsodGhpcy5nZXROb2RlQnlJZChsLmZyb20pLCB0aGlzLmdldE5vZGVCeUlkKGwudG8pKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saW5rc1N2Zy5hcHBlbmRDaGlsZChsaW5lKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShEZ0RpYWdyYW0uVEFHLCBEZ0RpYWdyYW0pOyIsImltcG9ydCB7IGRpdiwgc2xvdCwgc3R5bGUsIHRleHQgfSBmcm9tIFwiLi4vYnVpbGRlci9IdG1sQnVpbGRlclwiO1xuaW1wb3J0IHsgRGdOb2RlIH0gZnJvbSBcIi4vRGdOb2RlXCI7XG5cbmludGVyZmFjZSBEcmFnU3RhdGUge1xuICAgIHJlYWRvbmx5IHJlZlg6IG51bWJlcjtcbiAgICByZWFkb25seSByZWZZOiBudW1iZXI7XG4gICAgcmVhZG9ubHkgZG93blg6IG51bWJlcjtcbiAgICByZWFkb25seSBkb3duWTogbnVtYmVyO1xuICAgIGN1clg6IG51bWJlcjtcbiAgICBjdXJZOiBudW1iZXI7XG59XG5cbmZ1bmN0aW9uIGRlbHRhcyhkczpEcmFnU3RhdGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBkZWx0YVg6IGRzLmN1clggLSBkcy5kb3duWCxcbiAgICAgICAgZGVsdGFZOiBkcy5jdXJZIC0gZHMuZG93bllcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEZ0RyYWdnYWJsZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICAgIHN0YXRpYyBUQUcgPSBcImRnLWRyYWdnYWJsZVwiO1xuXG4gICAgcHJpdmF0ZSBkcmFnU3RhdGU6IERyYWdTdGF0ZSB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGNvbnN0IG1vdXNlTW92ZSA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5kcmFnU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGNsaWVudFgsIGNsaWVudFkgfSA9IGU7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnU3RhdGUuY3VyWCA9IGNsaWVudFg7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnU3RhdGUuY3VyWSA9IGNsaWVudFk7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkZWx0YVgsIGRlbHRhWSB9ID0gZGVsdGFzKHRoaXMuZHJhZ1N0YXRlKTsgXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGVsdGFYLCBkZWx0YVkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRnTm9kZSA9IHRoaXMuZ2V0RGdOb2RlKCk7ICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGRnTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBkZ05vZGUueCA9IHRoaXMuZHJhZ1N0YXRlLnJlZlggKyBkZWx0YVg7XG4gICAgICAgICAgICAgICAgICAgIGRnTm9kZS55ID0gdGhpcy5kcmFnU3RhdGUucmVmWSArIGRlbHRhWTsgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbW91c2VVcCA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZU1vdmUpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNlVXApO1xuICAgICAgICAgICAgdGhpcy5kcmFnU3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGUgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBjbGllbnRYLCBjbGllbnRZIH0gPSBlO1xuICAgICAgICAgICAgY29uc3QgZGdOb2RlID0gdGhpcy5nZXREZ05vZGUoKTsgICAgICBcbiAgICAgICAgICAgIGlmIChkZ05vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZG93blg6IGNsaWVudFgsXG4gICAgICAgICAgICAgICAgICAgIGRvd25ZOiBjbGllbnRZLFxuICAgICAgICAgICAgICAgICAgICBjdXJYOiBjbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICBjdXJZOiBjbGllbnRZLFxuICAgICAgICAgICAgICAgICAgICByZWZYOiBkZ05vZGUueCxcbiAgICAgICAgICAgICAgICAgICAgcmVmWTogZGdOb2RlLnksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1vdXNlZG93blwiKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZU1vdmUpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwKTsgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGdOb2RlKGZyb206IEhUTUxFbGVtZW50ID0gdGhpcyk6IERnTm9kZSB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmIChmcm9tLnBhcmVudEVsZW1lbnQgaW5zdGFuY2VvZiBEZ05vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZyb20ucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGdOb2RlKGZyb20ucGFyZW50RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cblxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRGdEcmFnZ2FibGUuVEFHLCBEZ0RyYWdnYWJsZSk7IiwiaW1wb3J0IHsgZW1wdHksIG5vZGUgfSBmcm9tIFwiLi4vYnVpbGRlci9IdG1sQnVpbGRlclwiO1xuaW1wb3J0IHsgYm94Q2VudGVyLCBib3hJbnRlcnNlY3Rpb24gfSBmcm9tIFwiLi9nZW9tZXRyeS9Cb3hcIjtcbmltcG9ydCB7IERnRGlhZ3JhbSB9IGZyb20gXCIuL0RnRGlhZ3JhbVwiO1xuaW1wb3J0IHsgRGdOb2RlIH0gZnJvbSBcIi4vRGdOb2RlXCI7XG5pbXBvcnQgeyBMaW5lLCBsaW5lSW50ZXJzZWN0aW9uIH0gZnJvbSBcIi4vZ2VvbWV0cnkvTGluZVwiO1xuXG5jb25zdCBTVkdfTlMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xuXG5leHBvcnQgY2xhc3MgRGdMaW5rIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gICAgc3RhdGljIFRBRyA9ICdkZy1saW5rJztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkgeyAgICAgICAgXG4gICAgICAgdGhpcy5nZXREZ0RpYWdyYW0oKS5yZWdpc3RlckxpbmsodGhpcyk7XG4gICAgfVxuXG4gICAgZHJhd0xpbmsoZnJvbU5vZGU6IERnTm9kZSwgdG9Ob2RlOiBEZ05vZGUpOiBTVkdMaW5lRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGZyb21Cb3ggPSBmcm9tTm9kZS5nZXRCb3goKTtcbiAgICAgICAgY29uc3QgdG9Cb3ggPSB0b05vZGUuZ2V0Qm94KCk7XG4gICAgICAgIGNvbnN0IGNlbnRlcjEgPSBib3hDZW50ZXIoZnJvbUJveCk7XG4gICAgICAgIGNvbnN0IGNlbnRlcjIgPSBib3hDZW50ZXIodG9Cb3gpO1xuXG4gICAgICAgIGNvbnN0IGxpbmU6IExpbmUgPSB7XG4gICAgICAgICAgICBmcm9tOiBjZW50ZXIxLFxuICAgICAgICAgICAgdG86IGNlbnRlcjIsXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXNlY3QxID0gYm94SW50ZXJzZWN0aW9uKGZyb21Cb3gsIGxpbmUpO1xuICAgICAgICBjb25zdCBpc2VjdDIgPSBib3hJbnRlcnNlY3Rpb24odG9Cb3gsIGxpbmUpO1xuXG4gICAgICAgIGNvbnN0IHN2Z0xpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoU1ZHX05TLCAnbGluZScpOyBcbiAgICAgICAgc3ZnTGluZS5zZXRBdHRyaWJ1dGUoJ3gxJywgaXNlY3QxLngudG9TdHJpbmcoKSk7XG4gICAgICAgIHN2Z0xpbmUuc2V0QXR0cmlidXRlKCd4MicsIGlzZWN0Mi54LnRvU3RyaW5nKCkpO1xuICAgICAgICBzdmdMaW5lLnNldEF0dHJpYnV0ZSgneTEnLCBpc2VjdDEueS50b1N0cmluZygpKTtcbiAgICAgICAgc3ZnTGluZS5zZXRBdHRyaWJ1dGUoJ3kyJywgaXNlY3QyLnkudG9TdHJpbmcoKSk7XG4gICAgICAgIHN2Z0xpbmUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCAnYmxhY2snKTtcbiAgICAgICAgc3ZnTGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsICcyJyk7XG4gICAgICAgIHN2Z0xpbmUuc2V0QXR0cmlidXRlKCdtYXJrZXItZW5kJywgJ3VybCgjYXJyb3doZWFkKScpO1xuXG4gICAgICAgIHJldHVybiBzdmdMaW5lO1xuICAgIH1cblxuICAgIGdldCBmcm9tKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnZnJvbScpO1xuICAgIH1cblxuICAgIGdldCB0bygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RvJyk7XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgZ2V0RGdEaWFncmFtKGZyb206IEhUTUxFbGVtZW50ID0gdGhpcyk6IERnRGlhZ3JhbSB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmIChmcm9tLnBhcmVudEVsZW1lbnQgaW5zdGFuY2VvZiBEZ0RpYWdyYW0pIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZyb20ucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGdEaWFncmFtKGZyb20ucGFyZW50RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKERnTGluay5UQUcsIERnTGluaykiLCJpbXBvcnQgeyBkaXYsIHNsb3QsIHN0eWxlLCB0ZXh0IH0gZnJvbSBcIi4uL2J1aWxkZXIvSHRtbEJ1aWxkZXJcIjtcbmltcG9ydCB7IHNhZmVQYXJzZUludCB9IGZyb20gXCIuLi9TYWZlUGFyc2VJbnRcIjtcbmltcG9ydCB7IEJveCwgYm94RXF1YWxzIH0gZnJvbSBcIi4vZ2VvbWV0cnkvQm94XCI7XG5pbXBvcnQgeyBEZ0RpYWdyYW0gfSBmcm9tIFwiLi9EZ0RpYWdyYW1cIjtcblxuY29uc3QgY3NzID0gYFxuICAgIC5kZy1ub2RlIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBkaXNwbGF5OiBmbGV4OyAgIFxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuOyAgICBcbiAgICB9XG5gO1xuXG5leHBvcnQgY2xhc3MgRGdOb2RlIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gICAgc3RhdGljIFRBRyA9IFwiZGctbm9kZVwiO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBkZ05vZGU6IEhUTUxEaXZFbGVtZW50O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZGdTbG90OiBIVE1MU2xvdEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBtb3VzZURvd25Cb3g6IEJveCB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBjb25zdCBzaGFkb3cgPSB0aGlzLmF0dGFjaFNoYWRvdyh7bW9kZTonb3Blbid9KTtcbiAgICAgICAgdGhpcy5kZ1Nsb3QgPSBzbG90KHt9KTtcbiAgICAgICAgdGhpcy5kZ05vZGUgPSBkaXYoe2NsYXNzTmFtZTogJ2RnLW5vZGUnfSwgdGhpcy5kZ1Nsb3QpO1xuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQodGhpcy5kZ05vZGUpO1xuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQoc3R5bGUoe30sIHRleHQoY3NzKSkpO1xuICAgIH1cblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkgeyAgICAgICAgXG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmRnTm9kZS5zdHlsZTtcbiAgICAgICAgcy5sZWZ0ID0gdGhpcy54ICsgXCJweFwiO1xuICAgICAgICBzLnRvcCA9IHRoaXMueSArIFwicHhcIjtcbiAgICAgICAgcy53aWR0aCA9IHRoaXMudyArIFwicHhcIjtcbiAgICAgICAgcy5oZWlnaHQgPSB0aGlzLmggKyBcInB4XCI7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJtb3VzZWRvd25cIiwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLm1vdXNlRG93bkJveCA9IHRoaXMuZ2V0Qm94KCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1vdXNldXBcIiwgdGhpcyk7XG4gICAgICAgICAgICBpZiAodGhpcy5tb3VzZURvd25Cb3gpIHtcbiAgICAgICAgICAgICAgICBpZiAoYm94RXF1YWxzKHRoaXMuZ2V0Qm94KCksIHRoaXMubW91c2VEb3duQm94KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gIXRoaXMuc2VsZWN0ZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5tb3VzZURvd25Cb3ggPSB1bmRlZmluZWQ7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmdldERnRGlhZ3JhbSgpLnJlZ2lzdGVyTm9kZSh0aGlzKTtcbiAgICB9XG5cbiAgICBnZXRCb3goKTogQm94IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHRoaXMueCxcbiAgICAgICAgICAgIHk6IHRoaXMueSxcbiAgICAgICAgICAgIHc6IHRoaXMudyxcbiAgICAgICAgICAgIGg6IHRoaXMuaCxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgICAgICByZXR1cm4gWyd4JywgJ3knLCAnaCcsICd3J107XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaXJlTW92ZWQoKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICAgIG5ldyBDdXN0b21FdmVudChcbiAgICAgICAgICAgICAgICAnbW92ZWQnLFxuICAgICAgICAgICAgICAgIHsgZGV0YWlsOiB0aGlzIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKVxuICAgIH1cblxuICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lOiBzdHJpbmcsIG9sZFZhbHVlOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcyA9IHRoaXMuZGdOb2RlLnN0eWxlO1xuICAgICAgICBpZiAob2xkVmFsdWUgPT09IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBjYXNlICd4Jzoge1xuICAgICAgICAgICAgICAgIHMubGVmdCA9IHRoaXMueCArICdweCc7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlTW92ZWQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ3knOiB7XG4gICAgICAgICAgICAgICAgcy50b3AgPSB0aGlzLnkgKyAncHgnO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZU1vdmVkKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICd3Jzoge1xuICAgICAgICAgICAgICAgIHMud2lkdGggPSB0aGlzLncgKyAncHgnO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZU1vdmVkKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdoJzoge1xuICAgICAgICAgICAgICAgIHMuaGVpZ2h0ID0gdGhpcy5oICsgJ3B4JztcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmVNb3ZlZCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBpZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgfVxuXG4gICAgZ2V0IHgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNhZmVQYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgneCcpKTtcbiAgICB9XG5cbiAgICBzZXQgeCh4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3gnLCB4LnRvU3RyaW5nKCkpO1xuICAgICAgICB0aGlzLmRnTm9kZS5zdHlsZS5sZWZ0ID0gdGhpcy54ICsgJ3B4JztcbiAgICB9XG5cbiAgICBnZXQgeSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc2FmZVBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCd5JykpO1xuICAgIH1cblxuICAgIHNldCB5KHk6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgneScsIHkudG9TdHJpbmcoKSk7XG4gICAgICAgIHRoaXMuZGdOb2RlLnN0eWxlLnRvcCA9IHRoaXMueSArICdweCc7XG4gICAgfVxuXG4gICAgZ2V0IGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNhZmVQYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgnaCcpKTtcbiAgICB9XG5cbiAgICBnZXQgdygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc2FmZVBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCd3JykpO1xuICAgIH1cblxuICAgIGdldCBzZWxlY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdzZWxlY3RlZCcpO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RlZChzOiBib29sZWFuKSB7XG4gICAgICAgIGlmIChzKSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnJyk7ICAgICAgICAgICAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldERnRGlhZ3JhbShmcm9tOiBIVE1MRWxlbWVudCA9IHRoaXMpOiBEZ0RpYWdyYW0gfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoZnJvbS5wYXJlbnRFbGVtZW50IGluc3RhbmNlb2YgRGdEaWFncmFtKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbS5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIGlmIChmcm9tLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERnRGlhZ3JhbShmcm9tLnBhcmVudEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKERnTm9kZS5UQUcsIERnTm9kZSk7IiwiaW1wb3J0IHsgTGluZSwgbGluZUludGVyc2VjdGlvbiB9IGZyb20gXCIuL0xpbmVcIjtcbmltcG9ydCB7IFBvaW50IH0gZnJvbSBcIi4vUG9pbnRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBCb3gge1xuICAgIHJlYWRvbmx5IHg6IG51bWJlcjtcbiAgICByZWFkb25seSB5OiBudW1iZXI7XG4gICAgcmVhZG9ubHkgdzogbnVtYmVyO1xuICAgIHJlYWRvbmx5IGg6IG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJveEVxdWFscyhiMTogQm94LCBiMjogQm94KTogYm9vbGVhbiB7XG4gICAgaWYgKGIxID09IGIyKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gYjEueCA9PT0gYjIueCAmJlxuICAgICAgICBiMS55ID09PSBiMi55ICYmXG4gICAgICAgIGIxLncgPT09IGIyLncgJiZcbiAgICAgICAgYjEuaCA9PT0gYjIuaDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJveENlbnRlcihiOiBCb3gpOiBQb2ludCB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogYi54ICsgTWF0aC5yb3VuZChiLncgLyAyKSxcbiAgICAgICAgeTogYi55ICsgTWF0aC5yb3VuZChiLmggLyAyKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gYm94VG9MaW5lcyhib3g6IEJveCk6IFJlYWRvbmx5QXJyYXk8TGluZT4ge1xuICAgIGNvbnN0IHsgeCwgeSAsIHcsIGggfSA9IGJveDtcbiAgICByZXR1cm4gW1xuICAgICAgICB7IFxuICAgICAgICAgICAgZnJvbTogeyB4LCB5IH0sXG4gICAgICAgICAgICB0bzogeyB4OiB4ICsgdywgeX1cbiAgICAgICAgfSxcbiAgICAgICAgeyBcbiAgICAgICAgICAgIGZyb206IHsgeDogeCArIHcsIHl9LFxuICAgICAgICAgICAgdG86IHsgeDogeCArIHcsIHk6IHkgKyBoIH1cbiAgICAgICAgfSxcbiAgICAgICAgeyBcbiAgICAgICAgICAgIGZyb206IHsgeDogeCArIHcsIHk6IHkgKyBoIH0sXG4gICAgICAgICAgICB0bzogeyB4LCB5OiB5ICsgaCB9LFxuICAgICAgICB9LFxuICAgICAgICB7IFxuICAgICAgICAgICAgZnJvbTogeyB4LCB5OiB5ICsgaCB9LFxuICAgICAgICAgICAgdG86IHsgeCwgeSB9LFxuICAgICAgICB9LFxuICAgIF1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJveEludGVyc2VjdGlvbihib3g6IEJveCwgbGluZTogTGluZSk6IFBvaW50IHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBsaW5lcyA9IGJveFRvTGluZXMoYm94KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aCA7IGkrKykge1xuICAgICAgICBjb25zdCBwID0gbGluZUludGVyc2VjdGlvbihsaW5lc1tpXSwgbGluZSk7XG4gICAgICAgIGlmIChwKSB7XG4gICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBQb2ludCB9IGZyb20gXCIuL1BvaW50XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGluZSB7XG4gICAgcmVhZG9ubHkgZnJvbTogUG9pbnQ7XG4gICAgcmVhZG9ubHkgdG86IFBvaW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGluZUludGVyc2VjdGlvbihsMTogTGluZSwgbDI6IExpbmUpOiBQb2ludCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIGludGVyc2VjdChsMS5mcm9tLngsIGwxLmZyb20ueSwgbDEudG8ueCwgbDEudG8ueSwgbDIuZnJvbS54LCBsMi5mcm9tLnksIGwyLnRvLngsIGwyLnRvLnkpO1xufVxuXG4vLyBsaW5lIGludGVyY2VwdCBtYXRoIGJ5IFBhdWwgQm91cmtlIGh0dHA6Ly9wYXVsYm91cmtlLm5ldC9nZW9tZXRyeS9wb2ludGxpbmVwbGFuZS9cbi8vIERldGVybWluZSB0aGUgaW50ZXJzZWN0aW9uIHBvaW50IG9mIHR3byBsaW5lIHNlZ21lbnRzXG4vLyBSZXR1cm4gdW5kZWZpbmVkIGlmIHRoZSBsaW5lcyBkb24ndCBpbnRlcnNlY3RcbmZ1bmN0aW9uIGludGVyc2VjdCh4MTogbnVtYmVyLCB5MTogbnVtYmVyLCB4MjogbnVtYmVyLCB5MjogbnVtYmVyLCB4MzogbnVtYmVyLCB5MzogbnVtYmVyLCB4NDogbnVtYmVyLCB5NDogbnVtYmVyKTogUG9pbnQgfCB1bmRlZmluZWQge1xuXG4gICAgLy8gQ2hlY2sgaWYgbm9uZSBvZiB0aGUgbGluZXMgYXJlIG9mIGxlbmd0aCAwXG4gICAgICBpZiAoKHgxID09PSB4MiAmJiB5MSA9PT0geTIpIHx8ICh4MyA9PT0geDQgJiYgeTMgPT09IHk0KSkge1xuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gIFxuICAgICAgY29uc3QgZGVub21pbmF0b3IgPSAoKHk0IC0geTMpICogKHgyIC0geDEpIC0gKHg0IC0geDMpICogKHkyIC0geTEpKVxuICBcbiAgICAvLyBMaW5lcyBhcmUgcGFyYWxsZWxcbiAgICAgIGlmIChkZW5vbWluYXRvciA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gIFxuICAgICAgbGV0IHVhID0gKCh4NCAtIHgzKSAqICh5MSAtIHkzKSAtICh5NCAtIHkzKSAqICh4MSAtIHgzKSkgLyBkZW5vbWluYXRvclxuICAgICAgbGV0IHViID0gKCh4MiAtIHgxKSAqICh5MSAtIHkzKSAtICh5MiAtIHkxKSAqICh4MSAtIHgzKSkgLyBkZW5vbWluYXRvclxuICBcbiAgICAvLyBpcyB0aGUgaW50ZXJzZWN0aW9uIGFsb25nIHRoZSBzZWdtZW50c1xuICAgICAgaWYgKHVhIDwgMCB8fCB1YSA+IDEgfHwgdWIgPCAwIHx8IHViID4gMSkge1xuICAgICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICAgIH1cbiAgXG4gICAgLy8gUmV0dXJuIGEgb2JqZWN0IHdpdGggdGhlIHggYW5kIHkgY29vcmRpbmF0ZXMgb2YgdGhlIGludGVyc2VjdGlvblxuICAgICAgbGV0IHggPSB4MSArIHVhICogKHgyIC0geDEpXG4gICAgICBsZXQgeSA9IHkxICsgdWEgKiAoeTIgLSB5MSlcbiAgXG4gICAgICByZXR1cm4ge3gsIHl9XG4gIH0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEN1c3RvbWVyQXBwIH0gZnJvbSBcIi4vY3VzdG9tZXIvQ3VzdG9tZXJBcHBcIjtcbmltcG9ydCB7IERnRGlhZ3JhbSB9IGZyb20gXCIuL2RpYWdyYW0vRGdEaWFncmFtXCI7XG5pbXBvcnQgeyBEZ0RyYWdnYWJsZSB9IGZyb20gXCIuL2RpYWdyYW0vRGdEcmFnZ2FibGVcIjtcbmltcG9ydCB7IERnTGluayB9IGZyb20gXCIuL2RpYWdyYW0vRGdMaW5rXCI7XG5pbXBvcnQgeyBEZ05vZGUgfSBmcm9tIFwiLi9kaWFncmFtL0RnTm9kZVwiO1xuaW1wb3J0IHsgU2Nyb2xsSXRlbSB9IGZyb20gXCIuL3ZpcnR1YWwtc2Nyb2xsZXIvU2Nyb2xsSXRlbVwiO1xuaW1wb3J0IHsgVmlydHVhbFNjcm9sbGVyIH0gZnJvbSBcIi4vdmlydHVhbC1zY3JvbGxlci9WaXJ0dWFsU2Nyb2xsZXJcIjtcblxuLy8ganVzdCBmb3IgaW1wb3J0cyAhXG4vLyBjb25zb2xlLmxvZygneWFsbGEnLCBDdXN0b21lckFwcC5UQUdfTkFNRSwgVmlydHVhbFNjcm9sbGVyLlRBR19OQU1FLCBTY3JvbGxJdGVtLlRBR19OQU1FLCBEZ0RpYWdyYW0uVEFHLCBEZ05vZGUuVEFHLCBEZ0RyYWdnYWJsZS5UQUcpO1xuY29uc29sZS5sb2coRGdEaWFncmFtLlRBRywgRGdOb2RlLlRBRywgRGdEcmFnZ2FibGUuVEFHLCBEZ0xpbmsuVEFHKTtcblxuLy8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBlID0+IHtcbi8vICAgICBjb25zdCBhcHA6IEN1c3RvbWVyQXBwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpIGFzIEN1c3RvbWVyQXBwO1xuLy8gICAgIGNvbnNvbGUubG9nKFwiYXBwIGxvYWRlZFwiLCBhcHApO1xuLy8gICAgIGFwcC5pbml0KFtcbi8vICAgICAgICAgeyBmaXJzdE5hbWU6ICdUb3RvJywgbGFzdE5hbWU6ICdCaWxvdXRlJyB9LFxuLy8gICAgICAgICB7IGZpcnN0TmFtZTogJ0ZyZW5jaCcsIGxhc3ROYW1lOiAnRnJpZXMnIH0sXG4vLyAgICAgICAgIHsgZmlyc3ROYW1lOiAnRm9vJywgbGFzdE5hbWU6ICdCYXInIH0sXG4vLyAgICAgXSlcbi8vIH0pXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=