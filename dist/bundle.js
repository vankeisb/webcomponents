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
    getDgNodes() {
        const q = this.querySelectorAll('dg-node');
        return Array.from(q);
    }
    getNodeById(id) {
        return this.getDgNodes().find(n => n.id === id);
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
    get from() {
        return this.getAttribute('from');
    }
    get to() {
        return this.getAttribute('to');
    }
    connectedCallback() {
        const dgDiagram = this.getDgDiagram();
        const fromNode = dgDiagram.getNodeById(this.from);
        const toNode = dgDiagram.getNodeById(this.to);
        if (fromNode && toNode) {
            const center1 = (0,_Box__WEBPACK_IMPORTED_MODULE_0__.boxCenter)(fromNode.getBox());
            const center2 = (0,_Box__WEBPACK_IMPORTED_MODULE_0__.boxCenter)(toNode.getBox());
            const left = Math.min(center1.x, center2.x);
            const top = Math.min(center1.y, center2.y);
            const height = center2.y - center1.y;
            const width = center2.x - center1.x;
            const heightMin = Math.max(1, height);
            const widthMin = Math.max(1, width);
            const svg = document.createElementNS(SVG_NS, 'svg');
            svg.style.position = "absolute";
            svg.style.left = center1.x + "px";
            svg.style.top = center1.y + "px";
            svg.style.width = widthMin + "px";
            svg.style.height = heightMin + "px";
            svg.setAttribute("width", widthMin.toString());
            svg.setAttribute("height", heightMin.toString());
            const line = document.createElementNS(SVG_NS, 'line');
            line.setAttribute('x1', "0");
            line.setAttribute('x2', width.toString());
            line.setAttribute('y1', "0");
            line.setAttribute('y2', height.toString());
            line.setAttribute('stroke', '#FF0000');
            line.setAttribute('stroke-width', '2');
            svg.appendChild(line);
            const shadow = this.attachShadow({ mode: 'closed' });
            shadow.appendChild(svg);
        }
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
    attributeChangedCallback(name, oldValue, newValue) {
        const s = this.dgNode.style;
        switch (name) {
            case 'x': {
                s.left = this.x + 'px';
                break;
            }
            case 'y': {
                s.top = this.y + 'px';
                break;
            }
            case 'w': {
                s.width = this.w + 'px';
                break;
            }
            case 'h': {
                s.height = this.h + 'px';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNWO0FBQ0E7QUFJMUMscUJBQXFCO0FBQ3JCLHlJQUF5STtBQUN6SSxPQUFPLENBQUMsR0FBRyxDQUFDLDZEQUFhLEVBQUUsdURBQVUsRUFBRSxpRUFBZSxFQUFFLHVEQUFVLENBQUMsQ0FBQztBQUVwRSx5Q0FBeUM7QUFDekMsOEVBQThFO0FBQzlFLHNDQUFzQztBQUN0QyxpQkFBaUI7QUFDakIsc0RBQXNEO0FBQ3RELHNEQUFzRDtBQUN0RCxpREFBaUQ7QUFDakQsU0FBUztBQUNULEtBQUsiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL1NhZmVQYXJzZUludC50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2J1aWxkZXIvSHRtbEJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy8uL3NyYy9kaWFncmFtL0JveC50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2RpYWdyYW0vRGdEaWFncmFtLnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvZGlhZ3JhbS9EZ0RyYWdnYWJsZS50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2RpYWdyYW0vRGdMaW5rLnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvZGlhZ3JhbS9EZ05vZGUudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHNhZmVQYXJzZUludChzOnN0cmluZyB8IG51bGwpOiBudW1iZXIge1xuICAgIGNvbnN0IGkgPSBwYXJzZUludChzKTtcbiAgICBpZiAoaXNOYU4oaSkpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiBpO1xufSIsImV4cG9ydCB0eXBlIERlZXBQYXJ0aWFsPFQ+ID0gUGFydGlhbDx7IFtQIGluIGtleW9mIFRdOiBEZWVwUGFydGlhbDxUW1BdPiB9PjtcblxudHlwZSBOb2RlQnVpbGRlcjxLIGV4dGVuZHMga2V5b2YgSFRNTEVsZW1lbnRUYWdOYW1lTWFwPiA9IChcbiAgYTogRGVlcFBhcnRpYWw8SFRNTEVsZW1lbnRUYWdOYW1lTWFwW0tdPixcbiAgLi4uYzogTm9kZVtdXG4pID0+IEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5vZGU8SyBleHRlbmRzIGtleW9mIEhUTUxFbGVtZW50VGFnTmFtZU1hcD4odGFnOiBLKTogTm9kZUJ1aWxkZXI8Sz4ge1xuICByZXR1cm4gKGE6IERlZXBQYXJ0aWFsPEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXT4sIC4uLmM6IE5vZGVbXSkgPT4ge1xuICAgIGNvbnN0IG46IEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBjLmZvckVhY2goKGNoaWxkKSA9PiBuLmFwcGVuZENoaWxkKGNoaWxkKSk7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGEpIGFzIEFycmF5PGtleW9mIHR5cGVvZiBhPjtcbiAgICBrZXlzLmZvckVhY2goKGspID0+IHNldFByb3BlcnR5KG4sIGssIGdldFByb3BlcnR5KGEsIGspKSk7XG4gICAgcmV0dXJuIG47XG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldFByb3BlcnR5PFQsIEsgZXh0ZW5kcyBrZXlvZiBUPihvOiBULCBrZXk6IEspOiBUW0tdIHtcbiAgcmV0dXJuIG9ba2V5XTtcbn1cblxuZnVuY3Rpb24gc2V0UHJvcGVydHk8VCwgSyBleHRlbmRzIGtleW9mIFQ+KG86IFQsIGtleTogSywgdmFsdWU6IFRbS10pOiB2b2lkIHtcbiAgb1trZXldID0gdmFsdWU7XG59XG5cbmV4cG9ydCBjb25zdCBkaXYgPSBub2RlKCdkaXYnKTtcbmV4cG9ydCBjb25zdCBzcGFuID0gbm9kZSgnc3BhbicpO1xuZXhwb3J0IGNvbnN0IGEgPSBub2RlKCdhJyk7XG5leHBvcnQgY29uc3QgcCA9IG5vZGUoJ3AnKTtcbmV4cG9ydCBjb25zdCBoMSA9IG5vZGUoJ2gxJyk7XG5leHBvcnQgY29uc3QgaW5wdXQgPSBub2RlKCdpbnB1dCcpO1xuZXhwb3J0IGNvbnN0IGxhYmVsID0gbm9kZSgnbGFiZWwnKTtcbmV4cG9ydCBjb25zdCBzbG90ID0gbm9kZSgnc2xvdCcpO1xuZXhwb3J0IGNvbnN0IHN0eWxlID0gbm9kZSgnc3R5bGUnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRleHQoczogc3RyaW5nKTogVGV4dCB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVtcHR5KGU6IE5vZGUpIHtcbiAgd2hpbGUoZS5maXJzdENoaWxkKSB7XG4gICAgZS5yZW1vdmVDaGlsZChlLmZpcnN0Q2hpbGQpO1xuICB9XG59IiwiaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi9Qb2ludFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJveCB7XG4gICAgcmVhZG9ubHkgeDogbnVtYmVyO1xuICAgIHJlYWRvbmx5IHk6IG51bWJlcjtcbiAgICByZWFkb25seSB3OiBudW1iZXI7XG4gICAgcmVhZG9ubHkgaDogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYm94RXF1YWxzKGIxOiBCb3gsIGIyOiBCb3gpOiBib29sZWFuIHtcbiAgICBpZiAoYjEgPT0gYjIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBiMS54ID09PSBiMi54ICYmXG4gICAgICAgIGIxLnkgPT09IGIyLnkgJiZcbiAgICAgICAgYjEudyA9PT0gYjIudyAmJlxuICAgICAgICBiMS5oID09PSBiMi5oO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYm94Q2VudGVyKGI6IEJveCk6IFBvaW50IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiBiLnggKyBNYXRoLnJvdW5kKGIudyAvIDIpLFxuICAgICAgICB5OiBiLnkgKyBNYXRoLnJvdW5kKGIuaCAvIDIpXG4gICAgfVxufSIsImltcG9ydCB7IGRpdiwgc2xvdCwgc3R5bGUsIHRleHQgfSBmcm9tIFwiLi4vYnVpbGRlci9IdG1sQnVpbGRlclwiO1xuaW1wb3J0IHsgRGdOb2RlIH0gZnJvbSBcIi4vRGdOb2RlXCI7XG5cbmNvbnN0IGRpYWdTdHlsZXMgPSBgXG4gICAgLmRnLWRpYWdyYW0ge1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB9XG4gICAgLmRnLXNjcm9sbC1wYW5lIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIH1cbiAgICAuZGctY29udGVudC1wYW5lIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmV5O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgfVxuYDtcblxuZXhwb3J0IGNsYXNzIERnRGlhZ3JhbSBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICAgIHN0YXRpYyBUQUcgPSBcImRnLWRpYWdyYW1cIlxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGNvbnN0IHNoYWRvdyA9IHRoaXMuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcbiAgICAgICAgY29uc3QgY29udGVudFBhbmUgPSBkaXYoXG4gICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2RnLWNvbnRlbnQtcGFuZScgfSwgXG4gICAgICAgICAgICBzbG90KHt9KVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBzY3JvbGxQYW5lID0gZGl2KFxuICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdkZy1zY3JvbGwtcGFuZScgfSxcbiAgICAgICAgICAgIGNvbnRlbnRQYW5lXG4gICAgICAgICk7XG4gICAgICAgIHNoYWRvdy5hcHBlbmRDaGlsZChzY3JvbGxQYW5lKTtcbiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKHN0eWxlKHt9LCB0ZXh0KGRpYWdTdHlsZXMpKSk7XG4gICAgfSAgICBcblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIH1cblxuICAgIGdldERnTm9kZXMoKTogUmVhZG9ubHlBcnJheTxEZ05vZGU+IHtcbiAgICAgICAgY29uc3QgcSA9IHRoaXMucXVlcnlTZWxlY3RvckFsbDxEZ05vZGU+KCdkZy1ub2RlJyk7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHEpO1xuICAgIH1cblxuICAgIGdldE5vZGVCeUlkKGlkOiBzdHJpbmcpOiBEZ05vZGUgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREZ05vZGVzKCkuZmluZChuID0+IG4uaWQgPT09IGlkKTtcbiAgICB9XG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKERnRGlhZ3JhbS5UQUcsIERnRGlhZ3JhbSk7IiwiaW1wb3J0IHsgZGl2LCBzbG90LCBzdHlsZSwgdGV4dCB9IGZyb20gXCIuLi9idWlsZGVyL0h0bWxCdWlsZGVyXCI7XG5pbXBvcnQgeyBEZ05vZGUgfSBmcm9tIFwiLi9EZ05vZGVcIjtcblxuaW50ZXJmYWNlIERyYWdTdGF0ZSB7XG4gICAgcmVhZG9ubHkgcmVmWDogbnVtYmVyO1xuICAgIHJlYWRvbmx5IHJlZlk6IG51bWJlcjtcbiAgICByZWFkb25seSBkb3duWDogbnVtYmVyO1xuICAgIHJlYWRvbmx5IGRvd25ZOiBudW1iZXI7XG4gICAgY3VyWDogbnVtYmVyO1xuICAgIGN1clk6IG51bWJlcjtcbn1cblxuZnVuY3Rpb24gZGVsdGFzKGRzOkRyYWdTdGF0ZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGRlbHRhWDogZHMuY3VyWCAtIGRzLmRvd25YLFxuICAgICAgICBkZWx0YVk6IGRzLmN1clkgLSBkcy5kb3duWVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIERnRHJhZ2dhYmxlIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gICAgc3RhdGljIFRBRyA9IFwiZGctZHJhZ2dhYmxlXCI7XG5cbiAgICBwcml2YXRlIGRyYWdTdGF0ZTogRHJhZ1N0YXRlIHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgY29uc3QgbW91c2VNb3ZlID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRyYWdTdGF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgY2xpZW50WCwgY2xpZW50WSB9ID0gZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdTdGF0ZS5jdXJYID0gY2xpZW50WDtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdTdGF0ZS5jdXJZID0gY2xpZW50WTtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRlbHRhWCwgZGVsdGFZIH0gPSBkZWx0YXModGhpcy5kcmFnU3RhdGUpOyBcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkZWx0YVgsIGRlbHRhWSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGdOb2RlID0gdGhpcy5nZXREZ05vZGUoKTsgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoZGdOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRnTm9kZS54ID0gdGhpcy5kcmFnU3RhdGUucmVmWCArIGRlbHRhWDtcbiAgICAgICAgICAgICAgICAgICAgZGdOb2RlLnkgPSB0aGlzLmRyYWdTdGF0ZS5yZWZZICsgZGVsdGFZOyAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtb3VzZVVwID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlTW92ZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2VVcCk7XG4gICAgICAgICAgICB0aGlzLmRyYWdTdGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGNsaWVudFgsIGNsaWVudFkgfSA9IGU7XG4gICAgICAgICAgICBjb25zdCBkZ05vZGUgPSB0aGlzLmdldERnTm9kZSgpOyAgICAgIFxuICAgICAgICAgICAgaWYgKGRnTm9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ1N0YXRlID0ge1xuICAgICAgICAgICAgICAgICAgICBkb3duWDogY2xpZW50WCxcbiAgICAgICAgICAgICAgICAgICAgZG93blk6IGNsaWVudFksXG4gICAgICAgICAgICAgICAgICAgIGN1clg6IGNsaWVudFgsXG4gICAgICAgICAgICAgICAgICAgIGN1clk6IGNsaWVudFksXG4gICAgICAgICAgICAgICAgICAgIHJlZlg6IGRnTm9kZS54LFxuICAgICAgICAgICAgICAgICAgICByZWZZOiBkZ05vZGUueSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibW91c2Vkb3duXCIpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlTW92ZSk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNlVXApOyAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREZ05vZGUoZnJvbTogSFRNTEVsZW1lbnQgPSB0aGlzKTogRGdOb2RlIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKGZyb20ucGFyZW50RWxlbWVudCBpbnN0YW5jZW9mIERnTm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZyb20ucGFyZW50RWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZnJvbS5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREZ05vZGUoZnJvbS5wYXJlbnRFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuXG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShEZ0RyYWdnYWJsZS5UQUcsIERnRHJhZ2dhYmxlKTsiLCJpbXBvcnQgeyBub2RlIH0gZnJvbSBcIi4uL2J1aWxkZXIvSHRtbEJ1aWxkZXJcIjtcbmltcG9ydCB7IGJveENlbnRlciB9IGZyb20gXCIuL0JveFwiO1xuaW1wb3J0IHsgRGdEaWFncmFtIH0gZnJvbSBcIi4vRGdEaWFncmFtXCI7XG5pbXBvcnQgeyBEZ05vZGUgfSBmcm9tIFwiLi9EZ05vZGVcIjtcblxuY29uc3QgU1ZHX05TID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcblxuZXhwb3J0IGNsYXNzIERnTGluayBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICAgIHN0YXRpYyBUQUcgPSAnZGctbGluayc7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBnZXQgZnJvbSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2Zyb20nKTtcbiAgICB9XG5cbiAgICBnZXQgdG8oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd0bycpO1xuICAgIH1cblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICBjb25zdCBkZ0RpYWdyYW0gPSB0aGlzLmdldERnRGlhZ3JhbSgpO1xuICAgICAgICBjb25zdCBmcm9tTm9kZSA9IGRnRGlhZ3JhbS5nZXROb2RlQnlJZCh0aGlzLmZyb20pO1xuICAgICAgICBjb25zdCB0b05vZGUgPSBkZ0RpYWdyYW0uZ2V0Tm9kZUJ5SWQodGhpcy50byk7XG4gICAgICAgIGlmIChmcm9tTm9kZSAmJiB0b05vZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNlbnRlcjEgPSBib3hDZW50ZXIoZnJvbU5vZGUuZ2V0Qm94KCkpO1xuICAgICAgICAgICAgY29uc3QgY2VudGVyMiA9IGJveENlbnRlcih0b05vZGUuZ2V0Qm94KCkpO1xuXG4gICAgICAgICAgICBjb25zdCBsZWZ0ID0gTWF0aC5taW4oY2VudGVyMS54LCBjZW50ZXIyLngpO1xuICAgICAgICAgICAgY29uc3QgdG9wID0gTWF0aC5taW4oY2VudGVyMS55LCBjZW50ZXIyLnkpO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gY2VudGVyMi55IC0gY2VudGVyMS55O1xuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBjZW50ZXIyLnggLSBjZW50ZXIxLng7XG5cbiAgICAgICAgICAgIGNvbnN0IGhlaWdodE1pbiA9IE1hdGgubWF4KDEsIGhlaWdodCk7XG4gICAgICAgICAgICBjb25zdCB3aWR0aE1pbiA9IE1hdGgubWF4KDEsIHdpZHRoKTtcblxuICAgICAgICAgICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFNWR19OUywgJ3N2ZycpO1xuICAgICAgICAgICAgc3ZnLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICAgICAgc3ZnLnN0eWxlLmxlZnQgPSBjZW50ZXIxLnggKyBcInB4XCI7XG4gICAgICAgICAgICBzdmcuc3R5bGUudG9wID0gY2VudGVyMS55ICsgXCJweFwiO1xuICAgICAgICAgICAgc3ZnLnN0eWxlLndpZHRoID0gd2lkdGhNaW4gKyBcInB4XCI7XG4gICAgICAgICAgICBzdmcuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0TWluICsgXCJweFwiO1xuICAgICAgICAgICAgc3ZnLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIHdpZHRoTWluLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgc3ZnLnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCBoZWlnaHRNaW4udG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBjb25zdCBsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFNWR19OUywgJ2xpbmUnKTsgXG4gICAgICAgICAgICBsaW5lLnNldEF0dHJpYnV0ZSgneDEnLCBcIjBcIik7XG4gICAgICAgICAgICBsaW5lLnNldEF0dHJpYnV0ZSgneDInLCB3aWR0aC50b1N0cmluZygpKTtcbiAgICAgICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKCd5MScsIFwiMFwiKTtcbiAgICAgICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKCd5MicsIGhlaWdodC50b1N0cmluZygpKTtcbiAgICAgICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKCdzdHJva2UnLCAnI0ZGMDAwMCcpO1xuICAgICAgICAgICAgbGluZS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsICcyJyk7XG4gICAgICAgICAgICBzdmcuYXBwZW5kQ2hpbGQobGluZSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHNoYWRvdyA9IHRoaXMuYXR0YWNoU2hhZG93KHttb2RlOiAnY2xvc2VkJ30pO1xuICAgICAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKHN2Zyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZ2V0RGdEaWFncmFtKGZyb206IEhUTUxFbGVtZW50ID0gdGhpcyk6IERnRGlhZ3JhbSB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmIChmcm9tLnBhcmVudEVsZW1lbnQgaW5zdGFuY2VvZiBEZ0RpYWdyYW0pIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZyb20ucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGdEaWFncmFtKGZyb20ucGFyZW50RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKERnTGluay5UQUcsIERnTGluaykiLCJpbXBvcnQgeyBkaXYsIHNsb3QsIHN0eWxlLCB0ZXh0IH0gZnJvbSBcIi4uL2J1aWxkZXIvSHRtbEJ1aWxkZXJcIjtcbmltcG9ydCB7IHNhZmVQYXJzZUludCB9IGZyb20gXCIuLi9TYWZlUGFyc2VJbnRcIjtcbmltcG9ydCB7IEJveCwgYm94RXF1YWxzIH0gZnJvbSBcIi4vQm94XCI7XG5pbXBvcnQgeyBEZ0RpYWdyYW0gfSBmcm9tIFwiLi9EZ0RpYWdyYW1cIjtcblxuY29uc3QgY3NzID0gYFxuICAgIC5kZy1ub2RlIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBkaXNwbGF5OiBmbGV4OyAgIFxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuOyAgICBcbiAgICB9XG5gO1xuXG5leHBvcnQgY2xhc3MgRGdOb2RlIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXG4gICAgc3RhdGljIFRBRyA9IFwiZGctbm9kZVwiO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBkZ05vZGU6IEhUTUxEaXZFbGVtZW50O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZGdTbG90OiBIVE1MU2xvdEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBtb3VzZURvd25Cb3g6IEJveCB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBjb25zdCBzaGFkb3cgPSB0aGlzLmF0dGFjaFNoYWRvdyh7bW9kZTonb3Blbid9KTtcbiAgICAgICAgdGhpcy5kZ1Nsb3QgPSBzbG90KHt9KTtcbiAgICAgICAgdGhpcy5kZ05vZGUgPSBkaXYoe2NsYXNzTmFtZTogJ2RnLW5vZGUnfSwgdGhpcy5kZ1Nsb3QpO1xuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQodGhpcy5kZ05vZGUpO1xuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQoc3R5bGUoe30sIHRleHQoY3NzKSkpO1xuICAgIH1cblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkgeyAgICAgICAgXG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmRnTm9kZS5zdHlsZTtcbiAgICAgICAgcy5sZWZ0ID0gdGhpcy54ICsgXCJweFwiO1xuICAgICAgICBzLnRvcCA9IHRoaXMueSArIFwicHhcIjtcbiAgICAgICAgcy53aWR0aCA9IHRoaXMudyArIFwicHhcIjtcbiAgICAgICAgcy5oZWlnaHQgPSB0aGlzLmggKyBcInB4XCI7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJtb3VzZWRvd25cIiwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLm1vdXNlRG93bkJveCA9IHRoaXMuZ2V0Qm94KCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1vdXNldXBcIiwgdGhpcyk7XG4gICAgICAgICAgICBpZiAodGhpcy5tb3VzZURvd25Cb3gpIHtcbiAgICAgICAgICAgICAgICBpZiAoYm94RXF1YWxzKHRoaXMuZ2V0Qm94KCksIHRoaXMubW91c2VEb3duQm94KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gIXRoaXMuc2VsZWN0ZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5tb3VzZURvd25Cb3ggPSB1bmRlZmluZWQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEJveCgpOiBCb3gge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogdGhpcy54LFxuICAgICAgICAgICAgeTogdGhpcy55LFxuICAgICAgICAgICAgdzogdGhpcy53LFxuICAgICAgICAgICAgaDogdGhpcy5oLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIHJldHVybiBbJ3gnLCAneScsICdoJywgJ3cnXTtcbiAgICB9XG5cbiAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZTogc3RyaW5nLCBvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmRnTm9kZS5zdHlsZTtcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBjYXNlICd4Jzoge1xuICAgICAgICAgICAgICAgIHMubGVmdCA9IHRoaXMueCArICdweCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICd5Jzoge1xuICAgICAgICAgICAgICAgIHMudG9wID0gdGhpcy55ICsgJ3B4JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ3cnOiB7XG4gICAgICAgICAgICAgICAgcy53aWR0aCA9IHRoaXMudyArICdweCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdoJzoge1xuICAgICAgICAgICAgICAgIHMuaGVpZ2h0ID0gdGhpcy5oICsgJ3B4JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgIH1cblxuICAgIGdldCB4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ3gnKSk7XG4gICAgfVxuXG4gICAgc2V0IHgoeDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd4JywgeC50b1N0cmluZygpKTtcbiAgICAgICAgdGhpcy5kZ05vZGUuc3R5bGUubGVmdCA9IHRoaXMueCArICdweCc7XG4gICAgfVxuXG4gICAgZ2V0IHkoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNhZmVQYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgneScpKTtcbiAgICB9XG5cbiAgICBzZXQgeSh5OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3knLCB5LnRvU3RyaW5nKCkpO1xuICAgICAgICB0aGlzLmRnTm9kZS5zdHlsZS50b3AgPSB0aGlzLnkgKyAncHgnO1xuICAgIH1cblxuICAgIGdldCBoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ2gnKSk7XG4gICAgfVxuXG4gICAgZ2V0IHcoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHNhZmVQYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgndycpKTtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgnc2VsZWN0ZWQnKTtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0ZWQoczogYm9vbGVhbikge1xuICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJycpOyAgICAgICAgICAgIFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXREZ0RpYWdyYW0oZnJvbTogSFRNTEVsZW1lbnQgPSB0aGlzKTogRGdEaWFncmFtIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKGZyb20ucGFyZW50RWxlbWVudCBpbnN0YW5jZW9mIERnRGlhZ3JhbSkge1xuICAgICAgICAgICAgcmV0dXJuIGZyb20ucGFyZW50RWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZnJvbS5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREZ0RpYWdyYW0oZnJvbS5wYXJlbnRFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuXG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShEZ05vZGUuVEFHLCBEZ05vZGUpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQ3VzdG9tZXJBcHAgfSBmcm9tIFwiLi9jdXN0b21lci9DdXN0b21lckFwcFwiO1xuaW1wb3J0IHsgRGdEaWFncmFtIH0gZnJvbSBcIi4vZGlhZ3JhbS9EZ0RpYWdyYW1cIjtcbmltcG9ydCB7IERnRHJhZ2dhYmxlIH0gZnJvbSBcIi4vZGlhZ3JhbS9EZ0RyYWdnYWJsZVwiO1xuaW1wb3J0IHsgRGdMaW5rIH0gZnJvbSBcIi4vZGlhZ3JhbS9EZ0xpbmtcIjtcbmltcG9ydCB7IERnTm9kZSB9IGZyb20gXCIuL2RpYWdyYW0vRGdOb2RlXCI7XG5pbXBvcnQgeyBTY3JvbGxJdGVtIH0gZnJvbSBcIi4vdmlydHVhbC1zY3JvbGxlci9TY3JvbGxJdGVtXCI7XG5pbXBvcnQgeyBWaXJ0dWFsU2Nyb2xsZXIgfSBmcm9tIFwiLi92aXJ0dWFsLXNjcm9sbGVyL1ZpcnR1YWxTY3JvbGxlclwiO1xuXG4vLyBqdXN0IGZvciBpbXBvcnRzICFcbi8vIGNvbnNvbGUubG9nKCd5YWxsYScsIEN1c3RvbWVyQXBwLlRBR19OQU1FLCBWaXJ0dWFsU2Nyb2xsZXIuVEFHX05BTUUsIFNjcm9sbEl0ZW0uVEFHX05BTUUsIERnRGlhZ3JhbS5UQUcsIERnTm9kZS5UQUcsIERnRHJhZ2dhYmxlLlRBRyk7XG5jb25zb2xlLmxvZyhEZ0RpYWdyYW0uVEFHLCBEZ05vZGUuVEFHLCBEZ0RyYWdnYWJsZS5UQUcsIERnTGluay5UQUcpO1xuXG4vLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGUgPT4ge1xuLy8gICAgIGNvbnN0IGFwcDogQ3VzdG9tZXJBcHAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykgYXMgQ3VzdG9tZXJBcHA7XG4vLyAgICAgY29uc29sZS5sb2coXCJhcHAgbG9hZGVkXCIsIGFwcCk7XG4vLyAgICAgYXBwLmluaXQoW1xuLy8gICAgICAgICB7IGZpcnN0TmFtZTogJ1RvdG8nLCBsYXN0TmFtZTogJ0JpbG91dGUnIH0sXG4vLyAgICAgICAgIHsgZmlyc3ROYW1lOiAnRnJlbmNoJywgbGFzdE5hbWU6ICdGcmllcycgfSxcbi8vICAgICAgICAgeyBmaXJzdE5hbWU6ICdGb28nLCBsYXN0TmFtZTogJ0JhcicgfSxcbi8vICAgICBdKVxuLy8gfSlcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==