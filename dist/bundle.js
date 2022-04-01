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

/***/ "./src/diagram/Box.ts":
/*!****************************!*\
  !*** ./src/diagram/Box.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boxCenter": () => (/* binding */ boxCenter),
/* harmony export */   "boxEquals": () => (/* binding */ boxEquals)
/* harmony export */ });
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
class DgDiagram extends HTMLElement {
    constructor() {
        super();
        this.linksSvg = document.createElementNS(SVG_NS, 'svg');
        const shadow = this.attachShadow({ mode: 'open' });
        this.linksSvg.classList.add('dg-links');
        const linksSlot = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.slot)({ name: "links" });
        this.linksSvg.appendChild(linksSlot);
        const scrollPane = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.div)({ className: 'dg-scroll-pane' }, (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.slot)({}), this.linksSvg);
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
/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Box */ "./src/diagram/Box.ts");
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
        const center1 = (0,_Box__WEBPACK_IMPORTED_MODULE_0__.boxCenter)(fromNode.getBox());
        const center2 = (0,_Box__WEBPACK_IMPORTED_MODULE_0__.boxCenter)(toNode.getBox());
        const line = document.createElementNS(SVG_NS, 'line');
        line.setAttribute('x1', center1.x.toString());
        line.setAttribute('x2', center2.x.toString());
        line.setAttribute('y1', center1.y.toString());
        line.setAttribute('y2', center2.y.toString());
        line.setAttribute('stroke', '#FF0000');
        line.setAttribute('stroke-width', '2');
        return line;
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
/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Box */ "./src/diagram/Box.ts");
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
                if ((0,_Box__WEBPACK_IMPORTED_MODULE_2__.boxEquals)(this.getBox(), this.mouseDownBox)) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDaEQ7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDOztBQTVJTSxVQUFHLEdBQUcsU0FBUyxDQUFDO0FBaUozQixjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7VUNoSzFDO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNMZ0Q7QUFDSTtBQUNWO0FBQ0E7QUFJMUMscUJBQXFCO0FBQ3JCLHlJQUF5STtBQUN6SSxPQUFPLENBQUMsR0FBRyxDQUFDLDZEQUFhLEVBQUUsdURBQVUsRUFBRSxpRUFBZSxFQUFFLHVEQUFVLENBQUMsQ0FBQztBQUVwRSx5Q0FBeUM7QUFDekMsOEVBQThFO0FBQzlFLHNDQUFzQztBQUN0QyxpQkFBaUI7QUFDakIsc0RBQXNEO0FBQ3RELHNEQUFzRDtBQUN0RCxpREFBaUQ7QUFDakQsU0FBUztBQUNULEtBQUsiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL1NhZmVQYXJzZUludC50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2J1aWxkZXIvSHRtbEJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy9kaWFncmFtL0JveC50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2RpYWdyYW0vRGdEaWFncmFtLnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvZGlhZ3JhbS9EZ0RyYWdnYWJsZS50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2RpYWdyYW0vRGdMaW5rLnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvZGlhZ3JhbS9EZ05vZGUudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHNhZmVQYXJzZUludChzOnN0cmluZyB8IG51bGwpOiBudW1iZXIge1xuICAgIGNvbnN0IGkgPSBwYXJzZUludChzKTtcbiAgICBpZiAoaXNOYU4oaSkpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiBpO1xufSIsImV4cG9ydCB0eXBlIERlZXBQYXJ0aWFsPFQ+ID0gUGFydGlhbDx7IFtQIGluIGtleW9mIFRdOiBEZWVwUGFydGlhbDxUW1BdPiB9PjtcblxudHlwZSBOb2RlQnVpbGRlcjxLIGV4dGVuZHMga2V5b2YgSFRNTEVsZW1lbnRUYWdOYW1lTWFwPiA9IChcbiAgYTogRGVlcFBhcnRpYWw8SFRNTEVsZW1lbnRUYWdOYW1lTWFwW0tdPixcbiAgLi4uYzogTm9kZVtdXG4pID0+IEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5vZGU8SyBleHRlbmRzIGtleW9mIEhUTUxFbGVtZW50VGFnTmFtZU1hcD4odGFnOiBLKTogTm9kZUJ1aWxkZXI8Sz4ge1xuICByZXR1cm4gKGE6IERlZXBQYXJ0aWFsPEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXT4sIC4uLmM6IE5vZGVbXSkgPT4ge1xuICAgIGNvbnN0IG46IEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBjLmZvckVhY2goKGNoaWxkKSA9PiBuLmFwcGVuZENoaWxkKGNoaWxkKSk7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGEpIGFzIEFycmF5PGtleW9mIHR5cGVvZiBhPjtcbiAgICBrZXlzLmZvckVhY2goKGspID0+IHNldFByb3BlcnR5KG4sIGssIGdldFByb3BlcnR5KGEsIGspKSk7XG4gICAgcmV0dXJuIG47XG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldFByb3BlcnR5PFQsIEsgZXh0ZW5kcyBrZXlvZiBUPihvOiBULCBrZXk6IEspOiBUW0tdIHtcbiAgcmV0dXJuIG9ba2V5XTtcbn1cblxuZnVuY3Rpb24gc2V0UHJvcGVydHk8VCwgSyBleHRlbmRzIGtleW9mIFQ+KG86IFQsIGtleTogSywgdmFsdWU6IFRbS10pOiB2b2lkIHtcbiAgb1trZXldID0gdmFsdWU7XG59XG5cbmV4cG9ydCBjb25zdCBkaXYgPSBub2RlKCdkaXYnKTtcbmV4cG9ydCBjb25zdCBzcGFuID0gbm9kZSgnc3BhbicpO1xuZXhwb3J0IGNvbnN0IGEgPSBub2RlKCdhJyk7XG5leHBvcnQgY29uc3QgcCA9IG5vZGUoJ3AnKTtcbmV4cG9ydCBjb25zdCBoMSA9IG5vZGUoJ2gxJyk7XG5leHBvcnQgY29uc3QgaW5wdXQgPSBub2RlKCdpbnB1dCcpO1xuZXhwb3J0IGNvbnN0IGxhYmVsID0gbm9kZSgnbGFiZWwnKTtcbmV4cG9ydCBjb25zdCBzbG90ID0gbm9kZSgnc2xvdCcpO1xuZXhwb3J0IGNvbnN0IHN0eWxlID0gbm9kZSgnc3R5bGUnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRleHQoczogc3RyaW5nKTogVGV4dCB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVtcHR5KGU6IE5vZGUpIHtcbiAgd2hpbGUoZS5maXJzdENoaWxkKSB7XG4gICAgZS5yZW1vdmVDaGlsZChlLmZpcnN0Q2hpbGQpO1xuICB9XG59IiwiaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi9Qb2ludFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJveCB7XG4gICAgcmVhZG9ubHkgeDogbnVtYmVyO1xuICAgIHJlYWRvbmx5IHk6IG51bWJlcjtcbiAgICByZWFkb25seSB3OiBudW1iZXI7XG4gICAgcmVhZG9ubHkgaDogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYm94RXF1YWxzKGIxOiBCb3gsIGIyOiBCb3gpOiBib29sZWFuIHtcbiAgICBpZiAoYjEgPT0gYjIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBiMS54ID09PSBiMi54ICYmXG4gICAgICAgIGIxLnkgPT09IGIyLnkgJiZcbiAgICAgICAgYjEudyA9PT0gYjIudyAmJlxuICAgICAgICBiMS5oID09PSBiMi5oO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYm94Q2VudGVyKGI6IEJveCk6IFBvaW50IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiBiLnggKyBNYXRoLnJvdW5kKGIudyAvIDIpLFxuICAgICAgICB5OiBiLnkgKyBNYXRoLnJvdW5kKGIuaCAvIDIpXG4gICAgfVxufSIsImltcG9ydCB7IGRpdiwgc2xvdCwgc3R5bGUsIHRleHQgfSBmcm9tIFwiLi4vYnVpbGRlci9IdG1sQnVpbGRlclwiO1xuaW1wb3J0IHsgRGdMaW5rIH0gZnJvbSBcIi4vRGdMaW5rXCI7XG5pbXBvcnQgeyBEZ05vZGUgfSBmcm9tIFwiLi9EZ05vZGVcIjtcblxuY29uc3QgU1ZHX05TID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcblxuY29uc3QgZGlhZ1N0eWxlcyA9IGBcbiAgICAuZGctZGlhZ3JhbSB7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIH1cbiAgICAuZGctc2Nyb2xsLXBhbmUge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgfVxuICAgIC5kZy1saW5rcyB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgfVxuICAgIC5kZy1jb250ZW50LXBhbmUge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyZXk7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB9XG5gO1xuXG5leHBvcnQgY2xhc3MgRGdEaWFncmFtIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gICAgc3RhdGljIFRBRyA9IFwiZGctZGlhZ3JhbVwiXG5cbiAgICBwcml2YXRlIGxpbmtzU3ZnOiBTVkdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFNWR19OUywgJ3N2ZycpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGNvbnN0IHNoYWRvdyA9IHRoaXMuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubGlua3NTdmcuY2xhc3NMaXN0LmFkZCgnZGctbGlua3MnKTtcbiAgICAgICAgY29uc3QgbGlua3NTbG90OiBIVE1MU2xvdEVsZW1lbnQgPSBzbG90KHsgbmFtZTogXCJsaW5rc1wifSlcbiAgICAgICAgdGhpcy5saW5rc1N2Zy5hcHBlbmRDaGlsZChsaW5rc1Nsb3QpO1xuXG4gICAgICAgIGNvbnN0IHNjcm9sbFBhbmUgPSBkaXYoXG4gICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2RnLXNjcm9sbC1wYW5lJyB9LFxuICAgICAgICAgICAgc2xvdCh7fSksXG4gICAgICAgICAgICB0aGlzLmxpbmtzU3ZnLFxuICAgICAgICApO1xuXG4gICAgICAgIHNoYWRvdy5hcHBlbmRDaGlsZChzY3JvbGxQYW5lKTtcbiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKHN0eWxlKHt9LCB0ZXh0KGRpYWdTdHlsZXMpKSk7XG4gICAgfSAgICBcblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIH1cblxuICAgIGdldERnTm9kZXMoKTogUmVhZG9ubHlBcnJheTxEZ05vZGU+IHtcbiAgICAgICAgY29uc3QgcSA9IHRoaXMucXVlcnlTZWxlY3RvckFsbDxEZ05vZGU+KERnTm9kZS5UQUcpO1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShxKTtcbiAgICB9XG5cbiAgICBnZXROb2RlQnlJZChpZDogc3RyaW5nKTogRGdOb2RlIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGdOb2RlcygpLmZpbmQobiA9PiBuLmlkID09PSBpZCk7XG4gICAgfVxuXG4gICAgZ2V0RGdMaW5rcygpOiBSZWFkb25seUFycmF5PERnTGluaz4ge1xuICAgICAgICBjb25zdCBxID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsPERnTGluaz4oRGdMaW5rLlRBRyk7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHEpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyTGluayhsaW5rOiBEZ0xpbmspIHtcbiAgICAgICAgY29uc3QgbGluZSA9IGxpbmsuZHJhd0xpbmsodGhpcy5nZXROb2RlQnlJZChsaW5rLmZyb20pLCB0aGlzLmdldE5vZGVCeUlkKGxpbmsudG8pKTtcbiAgICAgICAgbGluZS5zZXRBdHRyaWJ1dGUoXCJmcm9tXCIsIGxpbmsuZnJvbSk7XG4gICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKFwidG9cIiwgbGluay50byk7XG4gICAgICAgIHRoaXMubGlua3NTdmcuYXBwZW5kQ2hpbGQobGluZSk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJOb2RlKG5vZGU6IERnTm9kZSkge1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdmVkJywgKCkgPT4ge1xuICAgICAgICAgICAgLy8gdXBkYXRlIGFsbCBsaW5rc1xuICAgICAgICAgICAgdGhpcy5saW5rc1N2Zy5xdWVyeVNlbGVjdG9yQWxsKFwibGluZVwiKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKGxpbmUgPT4gbGluZS5yZW1vdmUoKSk7XG4gICAgICAgICAgICAvLyBhZGQgbmV3XG4gICAgICAgICAgICB0aGlzLmdldERnTGlua3MoKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKGwgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5lID0gbC5kcmF3TGluayh0aGlzLmdldE5vZGVCeUlkKGwuZnJvbSksIHRoaXMuZ2V0Tm9kZUJ5SWQobC50byk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlua3NTdmcuYXBwZW5kQ2hpbGQobGluZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRGdEaWFncmFtLlRBRywgRGdEaWFncmFtKTsiLCJpbXBvcnQgeyBkaXYsIHNsb3QsIHN0eWxlLCB0ZXh0IH0gZnJvbSBcIi4uL2J1aWxkZXIvSHRtbEJ1aWxkZXJcIjtcbmltcG9ydCB7IERnTm9kZSB9IGZyb20gXCIuL0RnTm9kZVwiO1xuXG5pbnRlcmZhY2UgRHJhZ1N0YXRlIHtcbiAgICByZWFkb25seSByZWZYOiBudW1iZXI7XG4gICAgcmVhZG9ubHkgcmVmWTogbnVtYmVyO1xuICAgIHJlYWRvbmx5IGRvd25YOiBudW1iZXI7XG4gICAgcmVhZG9ubHkgZG93blk6IG51bWJlcjtcbiAgICBjdXJYOiBudW1iZXI7XG4gICAgY3VyWTogbnVtYmVyO1xufVxuXG5mdW5jdGlvbiBkZWx0YXMoZHM6RHJhZ1N0YXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGVsdGFYOiBkcy5jdXJYIC0gZHMuZG93blgsXG4gICAgICAgIGRlbHRhWTogZHMuY3VyWSAtIGRzLmRvd25ZXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGdEcmFnZ2FibGUgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cbiAgICBzdGF0aWMgVEFHID0gXCJkZy1kcmFnZ2FibGVcIjtcblxuICAgIHByaXZhdGUgZHJhZ1N0YXRlOiBEcmFnU3RhdGUgfCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBjb25zdCBtb3VzZU1vdmUgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ1N0YXRlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBjbGllbnRYLCBjbGllbnRZIH0gPSBlO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ1N0YXRlLmN1clggPSBjbGllbnRYO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ1N0YXRlLmN1clkgPSBjbGllbnRZO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGVsdGFYLCBkZWx0YVkgfSA9IGRlbHRhcyh0aGlzLmRyYWdTdGF0ZSk7IFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRlbHRhWCwgZGVsdGFZKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkZ05vZGUgPSB0aGlzLmdldERnTm9kZSgpOyAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChkZ05vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGdOb2RlLnggPSB0aGlzLmRyYWdTdGF0ZS5yZWZYICsgZGVsdGFYO1xuICAgICAgICAgICAgICAgICAgICBkZ05vZGUueSA9IHRoaXMuZHJhZ1N0YXRlLnJlZlkgKyBkZWx0YVk7ICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1vdXNlVXAgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2VNb3ZlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ1N0YXRlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgY2xpZW50WCwgY2xpZW50WSB9ID0gZTtcbiAgICAgICAgICAgIGNvbnN0IGRnTm9kZSA9IHRoaXMuZ2V0RGdOb2RlKCk7ICAgICAgXG4gICAgICAgICAgICBpZiAoZGdOb2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIGRvd25YOiBjbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICBkb3duWTogY2xpZW50WSxcbiAgICAgICAgICAgICAgICAgICAgY3VyWDogY2xpZW50WCxcbiAgICAgICAgICAgICAgICAgICAgY3VyWTogY2xpZW50WSxcbiAgICAgICAgICAgICAgICAgICAgcmVmWDogZGdOb2RlLngsXG4gICAgICAgICAgICAgICAgICAgIHJlZlk6IGRnTm9kZS55LFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJtb3VzZWRvd25cIik7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2VNb3ZlKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2VVcCk7ICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERnTm9kZShmcm9tOiBIVE1MRWxlbWVudCA9IHRoaXMpOiBEZ05vZGUgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoZnJvbS5wYXJlbnRFbGVtZW50IGluc3RhbmNlb2YgRGdOb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbS5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIGlmIChmcm9tLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERnTm9kZShmcm9tLnBhcmVudEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKERnRHJhZ2dhYmxlLlRBRywgRGdEcmFnZ2FibGUpOyIsImltcG9ydCB7IGVtcHR5LCBub2RlIH0gZnJvbSBcIi4uL2J1aWxkZXIvSHRtbEJ1aWxkZXJcIjtcbmltcG9ydCB7IGJveENlbnRlciB9IGZyb20gXCIuL0JveFwiO1xuaW1wb3J0IHsgRGdEaWFncmFtIH0gZnJvbSBcIi4vRGdEaWFncmFtXCI7XG5pbXBvcnQgeyBEZ05vZGUgfSBmcm9tIFwiLi9EZ05vZGVcIjtcblxuY29uc3QgU1ZHX05TID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcblxuZXhwb3J0IGNsYXNzIERnTGluayBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICAgIHN0YXRpYyBUQUcgPSAnZGctbGluayc7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHsgICAgICAgIFxuICAgICAgIHRoaXMuZ2V0RGdEaWFncmFtKCkucmVnaXN0ZXJMaW5rKHRoaXMpO1xuICAgIH1cblxuICAgIGRyYXdMaW5rKGZyb21Ob2RlOiBEZ05vZGUsIHRvTm9kZTogRGdOb2RlKTogU1ZHTGluZUVsZW1lbnQge1xuICAgICAgICBjb25zdCBjZW50ZXIxID0gYm94Q2VudGVyKGZyb21Ob2RlLmdldEJveCgpKTtcbiAgICAgICAgY29uc3QgY2VudGVyMiA9IGJveENlbnRlcih0b05vZGUuZ2V0Qm94KCkpO1xuICAgICAgICBjb25zdCBsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFNWR19OUywgJ2xpbmUnKTsgXG4gICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKCd4MScsIGNlbnRlcjEueC50b1N0cmluZygpKTtcbiAgICAgICAgbGluZS5zZXRBdHRyaWJ1dGUoJ3gyJywgY2VudGVyMi54LnRvU3RyaW5nKCkpO1xuICAgICAgICBsaW5lLnNldEF0dHJpYnV0ZSgneTEnLCBjZW50ZXIxLnkudG9TdHJpbmcoKSk7XG4gICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKCd5MicsIGNlbnRlcjIueS50b1N0cmluZygpKTtcbiAgICAgICAgbGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICcjRkYwMDAwJyk7XG4gICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCAnMicpO1xuICAgICAgICByZXR1cm4gbGluZTtcbiAgICB9XG5cbiAgICBnZXQgZnJvbSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2Zyb20nKTtcbiAgICB9XG5cbiAgICBnZXQgdG8oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd0bycpO1xuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIGdldERnRGlhZ3JhbShmcm9tOiBIVE1MRWxlbWVudCA9IHRoaXMpOiBEZ0RpYWdyYW0gfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoZnJvbS5wYXJlbnRFbGVtZW50IGluc3RhbmNlb2YgRGdEaWFncmFtKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbS5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIGlmIChmcm9tLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERnRGlhZ3JhbShmcm9tLnBhcmVudEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShEZ0xpbmsuVEFHLCBEZ0xpbmspIiwiaW1wb3J0IHsgZGl2LCBzbG90LCBzdHlsZSwgdGV4dCB9IGZyb20gXCIuLi9idWlsZGVyL0h0bWxCdWlsZGVyXCI7XG5pbXBvcnQgeyBzYWZlUGFyc2VJbnQgfSBmcm9tIFwiLi4vU2FmZVBhcnNlSW50XCI7XG5pbXBvcnQgeyBCb3gsIGJveEVxdWFscyB9IGZyb20gXCIuL0JveFwiO1xuaW1wb3J0IHsgRGdEaWFncmFtIH0gZnJvbSBcIi4vRGdEaWFncmFtXCI7XG5cbmNvbnN0IGNzcyA9IGBcbiAgICAuZGctbm9kZSB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgZGlzcGxheTogZmxleDsgICBcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsgICAgXG4gICAgfVxuYDtcblxuZXhwb3J0IGNsYXNzIERnTm9kZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICAgIHN0YXRpYyBUQUcgPSBcImRnLW5vZGVcIjtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgZGdOb2RlOiBIVE1MRGl2RWxlbWVudDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRnU2xvdDogSFRNTFNsb3RFbGVtZW50O1xuICAgIHByaXZhdGUgbW91c2VEb3duQm94OiBCb3ggfCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgY29uc3Qgc2hhZG93ID0gdGhpcy5hdHRhY2hTaGFkb3coe21vZGU6J29wZW4nfSk7XG4gICAgICAgIHRoaXMuZGdTbG90ID0gc2xvdCh7fSk7XG4gICAgICAgIHRoaXMuZGdOb2RlID0gZGl2KHtjbGFzc05hbWU6ICdkZy1ub2RlJ30sIHRoaXMuZGdTbG90KTtcbiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKHRoaXMuZGdOb2RlKTtcbiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKHN0eWxlKHt9LCB0ZXh0KGNzcykpKTtcbiAgICB9XG5cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHsgICAgICAgIFxuICAgICAgICBjb25zdCBzID0gdGhpcy5kZ05vZGUuc3R5bGU7XG4gICAgICAgIHMubGVmdCA9IHRoaXMueCArIFwicHhcIjtcbiAgICAgICAgcy50b3AgPSB0aGlzLnkgKyBcInB4XCI7XG4gICAgICAgIHMud2lkdGggPSB0aGlzLncgKyBcInB4XCI7XG4gICAgICAgIHMuaGVpZ2h0ID0gdGhpcy5oICsgXCJweFwiO1xuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibW91c2Vkb3duXCIsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5tb3VzZURvd25Cb3ggPSB0aGlzLmdldEJveCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJtb3VzZXVwXCIsIHRoaXMpO1xuICAgICAgICAgICAgaWYgKHRoaXMubW91c2VEb3duQm94KSB7XG4gICAgICAgICAgICAgICAgaWYgKGJveEVxdWFscyh0aGlzLmdldEJveCgpLCB0aGlzLm1vdXNlRG93bkJveCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICF0aGlzLnNlbGVjdGVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubW91c2VEb3duQm94ID0gdW5kZWZpbmVkO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5nZXREZ0RpYWdyYW0oKS5yZWdpc3Rlck5vZGUodGhpcyk7XG4gICAgfVxuXG4gICAgZ2V0Qm94KCk6IEJveCB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiB0aGlzLngsXG4gICAgICAgICAgICB5OiB0aGlzLnksXG4gICAgICAgICAgICB3OiB0aGlzLncsXG4gICAgICAgICAgICBoOiB0aGlzLmgsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICAgICAgcmV0dXJuIFsneCcsICd5JywgJ2gnLCAndyddO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmlyZU1vdmVkKCkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoXG4gICAgICAgICAgICAgICAgJ21vdmVkJyxcbiAgICAgICAgICAgICAgICB7IGRldGFpbDogdGhpcyB9XG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICB9XG5cbiAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZTogc3RyaW5nLCBvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmRnTm9kZS5zdHlsZTtcbiAgICAgICAgaWYgKG9sZFZhbHVlID09PSBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgY2FzZSAneCc6IHtcbiAgICAgICAgICAgICAgICBzLmxlZnQgPSB0aGlzLnggKyAncHgnO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZU1vdmVkKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICd5Jzoge1xuICAgICAgICAgICAgICAgIHMudG9wID0gdGhpcy55ICsgJ3B4JztcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmVNb3ZlZCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAndyc6IHtcbiAgICAgICAgICAgICAgICBzLndpZHRoID0gdGhpcy53ICsgJ3B4JztcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmVNb3ZlZCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAnaCc6IHtcbiAgICAgICAgICAgICAgICBzLmhlaWdodCA9IHRoaXMuaCArICdweCc7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlTW92ZWQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgIH1cblxuICAgIGdldCB4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ3gnKSk7XG4gICAgfVxuXG4gICAgc2V0IHgoeDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd4JywgeC50b1N0cmluZygpKTtcbiAgICAgICAgdGhpcy5kZ05vZGUuc3R5bGUubGVmdCA9IHRoaXMueCArICdweCc7XG4gICAgfVxuXG4gICAgZ2V0IHkoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNhZmVQYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgneScpKTtcbiAgICB9XG5cbiAgICBzZXQgeSh5OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3knLCB5LnRvU3RyaW5nKCkpO1xuICAgICAgICB0aGlzLmRnTm9kZS5zdHlsZS50b3AgPSB0aGlzLnkgKyAncHgnO1xuICAgIH1cblxuICAgIGdldCBoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ2gnKSk7XG4gICAgfVxuXG4gICAgZ2V0IHcoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNhZmVQYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgndycpKTtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgnc2VsZWN0ZWQnKTtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0ZWQoczogYm9vbGVhbikge1xuICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJycpOyAgICAgICAgICAgIFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXREZ0RpYWdyYW0oZnJvbTogSFRNTEVsZW1lbnQgPSB0aGlzKTogRGdEaWFncmFtIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKGZyb20ucGFyZW50RWxlbWVudCBpbnN0YW5jZW9mIERnRGlhZ3JhbSkge1xuICAgICAgICAgICAgcmV0dXJuIGZyb20ucGFyZW50RWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZnJvbS5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREZ0RpYWdyYW0oZnJvbS5wYXJlbnRFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuXG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShEZ05vZGUuVEFHLCBEZ05vZGUpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQ3VzdG9tZXJBcHAgfSBmcm9tIFwiLi9jdXN0b21lci9DdXN0b21lckFwcFwiO1xuaW1wb3J0IHsgRGdEaWFncmFtIH0gZnJvbSBcIi4vZGlhZ3JhbS9EZ0RpYWdyYW1cIjtcbmltcG9ydCB7IERnRHJhZ2dhYmxlIH0gZnJvbSBcIi4vZGlhZ3JhbS9EZ0RyYWdnYWJsZVwiO1xuaW1wb3J0IHsgRGdMaW5rIH0gZnJvbSBcIi4vZGlhZ3JhbS9EZ0xpbmtcIjtcbmltcG9ydCB7IERnTm9kZSB9IGZyb20gXCIuL2RpYWdyYW0vRGdOb2RlXCI7XG5pbXBvcnQgeyBTY3JvbGxJdGVtIH0gZnJvbSBcIi4vdmlydHVhbC1zY3JvbGxlci9TY3JvbGxJdGVtXCI7XG5pbXBvcnQgeyBWaXJ0dWFsU2Nyb2xsZXIgfSBmcm9tIFwiLi92aXJ0dWFsLXNjcm9sbGVyL1ZpcnR1YWxTY3JvbGxlclwiO1xuXG4vLyBqdXN0IGZvciBpbXBvcnRzICFcbi8vIGNvbnNvbGUubG9nKCd5YWxsYScsIEN1c3RvbWVyQXBwLlRBR19OQU1FLCBWaXJ0dWFsU2Nyb2xsZXIuVEFHX05BTUUsIFNjcm9sbEl0ZW0uVEFHX05BTUUsIERnRGlhZ3JhbS5UQUcsIERnTm9kZS5UQUcsIERnRHJhZ2dhYmxlLlRBRyk7XG5jb25zb2xlLmxvZyhEZ0RpYWdyYW0uVEFHLCBEZ05vZGUuVEFHLCBEZ0RyYWdnYWJsZS5UQUcsIERnTGluay5UQUcpO1xuXG4vLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGUgPT4ge1xuLy8gICAgIGNvbnN0IGFwcDogQ3VzdG9tZXJBcHAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykgYXMgQ3VzdG9tZXJBcHA7XG4vLyAgICAgY29uc29sZS5sb2coXCJhcHAgbG9hZGVkXCIsIGFwcCk7XG4vLyAgICAgYXBwLmluaXQoW1xuLy8gICAgICAgICB7IGZpcnN0TmFtZTogJ1RvdG8nLCBsYXN0TmFtZTogJ0JpbG91dGUnIH0sXG4vLyAgICAgICAgIHsgZmlyc3ROYW1lOiAnRnJlbmNoJywgbGFzdE5hbWU6ICdGcmllcycgfSxcbi8vICAgICAgICAgeyBmaXJzdE5hbWU6ICdGb28nLCBsYXN0TmFtZTogJ0JhcicgfSxcbi8vICAgICBdKVxuLy8gfSlcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==