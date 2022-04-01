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
                display: flex;
                height: 100%;
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
}
DgNode.TAG = "dg-node";
customElements.define(DgNode.TAG, DgNode);


/***/ }),

/***/ "./src/diagram/DgSelectable.ts":
/*!*************************************!*\
  !*** ./src/diagram/DgSelectable.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DgSelectable": () => (/* binding */ DgSelectable)
/* harmony export */ });
/* harmony import */ var _builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../builder/HtmlBuilder */ "./src/builder/HtmlBuilder.ts");

class DgSelectable extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const domNode = (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.div)({ className: 'dg-selectable' }, (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.slot)({}));
        shadow.appendChild(domNode);
        shadow.appendChild((0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.style)({}, (0,_builder_HtmlBuilder__WEBPACK_IMPORTED_MODULE_0__.text)(`
                .dg-selectable {
                    cursor: pointer;
                    display: flex;
                    height: 100%;
                }
            `)));
    }
    connectedCallback() {
        this.addEventListener('click', () => {
            this.selected = !this.selected;
        });
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
}
DgSelectable.TAG = "dg-selectable";
customElements.define(DgSelectable.TAG, DgSelectable);


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
/* harmony import */ var _diagram_DgNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./diagram/DgNode */ "./src/diagram/DgNode.ts");
/* harmony import */ var _diagram_DgSelectable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./diagram/DgSelectable */ "./src/diagram/DgSelectable.ts");




// just for imports !
// console.log('yalla', CustomerApp.TAG_NAME, VirtualScroller.TAG_NAME, ScrollItem.TAG_NAME, DgDiagram.TAG, DgNode.TAG, DgDraggable.TAG);
console.log(_diagram_DgDiagram__WEBPACK_IMPORTED_MODULE_0__.DgDiagram.TAG, _diagram_DgNode__WEBPACK_IMPORTED_MODULE_2__.DgNode.TAG, _diagram_DgDraggable__WEBPACK_IMPORTED_MODULE_1__.DgDraggable.TAG, _diagram_DgSelectable__WEBPACK_IMPORTED_MODULE_3__.DgSelectable.TAG);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQU8sU0FBUyxZQUFZLENBQUMsQ0FBZTtJQUN4QyxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEIsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsQ0FBQztLQUNaO0lBQ0QsT0FBTyxDQUFDLENBQUM7QUFDYixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0NNLFNBQVMsSUFBSSxDQUF3QyxHQUFNO0lBQ2hFLE9BQU8sQ0FBQyxDQUF3QyxFQUFFLEdBQUcsQ0FBUyxFQUFFLEVBQUU7UUFDaEUsTUFBTSxDQUFDLEdBQTZCLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUEwQixDQUFDO1FBQ3JELElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFELE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELFNBQVMsV0FBVyxDQUF1QixDQUFJLEVBQUUsR0FBTTtJQUNyRCxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoQixDQUFDO0FBRUQsU0FBUyxXQUFXLENBQXVCLENBQUksRUFBRSxHQUFNLEVBQUUsS0FBVztJQUNsRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFFTSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzFCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDcEIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDNUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzFCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUU1QixTQUFTLElBQUksQ0FBQyxDQUFTO0lBQzVCLE9BQU8sUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBRU0sU0FBUyxLQUFLLENBQUMsQ0FBTztJQUMzQixPQUFNLENBQUMsQ0FBQyxVQUFVLEVBQUU7UUFDbEIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDN0I7QUFDSCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDM0MrRDtBQUVoRSxNQUFNLFVBQVUsR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FpQmxCLENBQUM7QUFFSyxNQUFNLFNBQVUsU0FBUSxXQUFXO0lBSXRDO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFDUixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7UUFDakQsTUFBTSxXQUFXLEdBQUcseURBQUcsQ0FDbkIsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsRUFDaEMsMERBQUksQ0FBQyxFQUFFLENBQUMsQ0FDWCxDQUFDO1FBQ0YsTUFBTSxVQUFVLEdBQUcseURBQUcsQ0FDbEIsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsRUFDL0IsV0FBVyxDQUNkLENBQUM7UUFDRixNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxXQUFXLENBQUMsMkRBQUssQ0FBQyxFQUFFLEVBQUUsMERBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELGlCQUFpQjtJQUNqQixDQUFDOztBQWxCTSxhQUFHLEdBQUcsWUFBWTtBQXNCN0IsY0FBYyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQzdDZ0I7QUFDOUI7QUFXbEMsU0FBUyxNQUFNLENBQUMsRUFBWTtJQUN4QixPQUFPO1FBQ0gsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLEtBQUs7UUFDMUIsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLEtBQUs7S0FDN0I7QUFDTCxDQUFDO0FBRU0sTUFBTSxXQUFZLFNBQVEsV0FBVztJQU14QztRQUNJLEtBQUssRUFBRSxDQUFDO1FBRVIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sT0FBTyxHQUFHLHlEQUFHLENBQUMsRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFDLEVBQUUsMERBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVELE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUIsTUFBTSxDQUFDLFdBQVcsQ0FDZCwyREFBSyxDQUFDLEVBQUUsRUFBRSwwREFBSSxDQUFDOzs7Ozs7YUFNZCxDQUFDLENBQUMsQ0FDTixDQUFDO1FBRUYsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFhLEVBQUUsRUFBRTtZQUNoQyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2hCLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztnQkFDOUIsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDNUIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNoQyxJQUFJLE1BQU0sRUFBRTtvQkFDUixNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztvQkFDeEMsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7aUJBQzNDO2FBQ0o7UUFDTCxDQUFDO1FBRUQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFhLEVBQUUsRUFBRTtZQUM5QixRQUFRLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3JELFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDL0IsQ0FBQztRQUVELE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUU7WUFDdEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDL0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2hDLElBQUksTUFBTSxFQUFFO2dCQUNSLElBQUksQ0FBQyxTQUFTLEdBQUc7b0JBQ2IsS0FBSyxFQUFFLE9BQU87b0JBQ2QsS0FBSyxFQUFFLE9BQU87b0JBQ2QsSUFBSSxFQUFFLE9BQU87b0JBQ2IsSUFBSSxFQUFFLE9BQU87b0JBQ2IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUNkLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDakIsQ0FBQztnQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN6QixRQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUNsRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ2pEO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sU0FBUyxDQUFDLE9BQW9CLElBQUk7UUFDdEMsSUFBSSxJQUFJLENBQUMsYUFBYSxZQUFZLDJDQUFNLEVBQUU7WUFDdEMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQzdCO1FBQ0QsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3BCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDN0M7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDOztBQXBFTSxlQUFHLEdBQUcsY0FBYyxDQUFDO0FBeUVoQyxjQUFjLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUZZO0FBQ2pCO0FBRS9DLE1BQU0sR0FBRyxHQUFHOzs7Ozs7Q0FNWCxDQUFDO0FBRUssTUFBTSxNQUFPLFNBQVEsV0FBVztJQU9uQztRQUNJLEtBQUssRUFBRSxDQUFDO1FBQ1IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxNQUFNLEdBQUcsMERBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLHlEQUFHLENBQUMsRUFBQyxTQUFTLEVBQUUsU0FBUyxFQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxXQUFXLENBQUMsMkRBQUssQ0FBQyxFQUFFLEVBQUUsMERBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELGlCQUFpQjtRQUNiLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDdkIsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN0QixDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUVELE1BQU0sS0FBSyxrQkFBa0I7UUFDekIsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCx3QkFBd0IsQ0FBQyxJQUFZLEVBQUUsUUFBZ0IsRUFBRSxRQUFnQjtRQUNyRSxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUM1QixRQUFRLElBQUksRUFBRTtZQUNWLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ04sQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDdkIsTUFBTTthQUNUO1lBQ0QsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDTixDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUN0QixNQUFNO2FBQ1Q7WUFDRCxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUNOLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLE1BQU07YUFDVDtZQUNELEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ04sQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDekIsTUFBTTthQUNUO1lBQ0Q7Z0JBQ0ksTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQUVELElBQUksQ0FBQztRQUNELE9BQU8sMkRBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELElBQUksQ0FBQyxDQUFDLENBQVM7UUFDWCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDM0MsQ0FBQztJQUVELElBQUksQ0FBQztRQUNELE9BQU8sMkRBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELElBQUksQ0FBQyxDQUFDLENBQVM7UUFDWCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDMUMsQ0FBQztJQUVELElBQUksQ0FBQztRQUNELE9BQU8sMkRBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELElBQUksQ0FBQztRQUNELE9BQU8sMkRBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7QUExRU0sVUFBRyxHQUFHLFNBQVMsQ0FBQztBQThFM0IsY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDM0ZzQjtBQUl6RCxNQUFNLFlBQWEsU0FBUSxXQUFXO0lBSXpDO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFDUixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxDQUFDLENBQUM7UUFDaEQsTUFBTSxPQUFPLEdBQUcseURBQUcsQ0FDZixFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsRUFDOUIsMERBQUksQ0FBQyxFQUFFLENBQUMsQ0FDWCxDQUFDO1FBQ0YsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QixNQUFNLENBQUMsV0FBVyxDQUNkLDJEQUFLLENBQUMsRUFBRSxFQUFFLDBEQUFJLENBQUM7Ozs7OzthQU1kLENBQUMsQ0FBQyxDQUNOLENBQUM7SUFDTixDQUFDO0lBRUQsaUJBQWlCO1FBQ2IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxJQUFJLFFBQVEsQ0FBQyxDQUFVO1FBQ25CLElBQUksQ0FBQyxFQUFFO1lBQ0gsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDckM7YUFBTTtZQUNILElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDcEM7SUFDTCxDQUFDOztBQXJDTSxnQkFBRyxHQUFHLGVBQWUsQ0FBQztBQW1EakMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDOzs7Ozs7O1VDekR0RDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTGdEO0FBQ0k7QUFDVjtBQUNZO0FBSXRELHFCQUFxQjtBQUNyQix5SUFBeUk7QUFDekksT0FBTyxDQUFDLEdBQUcsQ0FBQyw2REFBYSxFQUFFLHVEQUFVLEVBQUUsaUVBQWUsRUFBRSxtRUFBZ0IsQ0FBQyxDQUFDO0FBRTFFLHlDQUF5QztBQUN6Qyw4RUFBOEU7QUFDOUUsc0NBQXNDO0FBQ3RDLGlCQUFpQjtBQUNqQixzREFBc0Q7QUFDdEQsc0RBQXNEO0FBQ3RELGlEQUFpRDtBQUNqRCxTQUFTO0FBQ1QsS0FBSyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvU2FmZVBhcnNlSW50LnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvYnVpbGRlci9IdG1sQnVpbGRlci50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2RpYWdyYW0vRGdEaWFncmFtLnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvZGlhZ3JhbS9EZ0RyYWdnYWJsZS50cyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzLy4vc3JjL2RpYWdyYW0vRGdOb2RlLnRzIiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvZGlhZ3JhbS9EZ1NlbGVjdGFibGUudHMiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJjb21wb25lbnRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2ViY29tcG9uZW50cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYmNvbXBvbmVudHMvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHNhZmVQYXJzZUludChzOnN0cmluZyB8IG51bGwpOiBudW1iZXIge1xuICAgIGNvbnN0IGkgPSBwYXJzZUludChzKTtcbiAgICBpZiAoaXNOYU4oaSkpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiBpO1xufSIsImV4cG9ydCB0eXBlIERlZXBQYXJ0aWFsPFQ+ID0gUGFydGlhbDx7IFtQIGluIGtleW9mIFRdOiBEZWVwUGFydGlhbDxUW1BdPiB9PjtcblxudHlwZSBOb2RlQnVpbGRlcjxLIGV4dGVuZHMga2V5b2YgSFRNTEVsZW1lbnRUYWdOYW1lTWFwPiA9IChcbiAgYTogRGVlcFBhcnRpYWw8SFRNTEVsZW1lbnRUYWdOYW1lTWFwW0tdPixcbiAgLi4uYzogTm9kZVtdXG4pID0+IEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5vZGU8SyBleHRlbmRzIGtleW9mIEhUTUxFbGVtZW50VGFnTmFtZU1hcD4odGFnOiBLKTogTm9kZUJ1aWxkZXI8Sz4ge1xuICByZXR1cm4gKGE6IERlZXBQYXJ0aWFsPEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXT4sIC4uLmM6IE5vZGVbXSkgPT4ge1xuICAgIGNvbnN0IG46IEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBjLmZvckVhY2goKGNoaWxkKSA9PiBuLmFwcGVuZENoaWxkKGNoaWxkKSk7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGEpIGFzIEFycmF5PGtleW9mIHR5cGVvZiBhPjtcbiAgICBrZXlzLmZvckVhY2goKGspID0+IHNldFByb3BlcnR5KG4sIGssIGdldFByb3BlcnR5KGEsIGspKSk7XG4gICAgcmV0dXJuIG47XG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldFByb3BlcnR5PFQsIEsgZXh0ZW5kcyBrZXlvZiBUPihvOiBULCBrZXk6IEspOiBUW0tdIHtcbiAgcmV0dXJuIG9ba2V5XTtcbn1cblxuZnVuY3Rpb24gc2V0UHJvcGVydHk8VCwgSyBleHRlbmRzIGtleW9mIFQ+KG86IFQsIGtleTogSywgdmFsdWU6IFRbS10pOiB2b2lkIHtcbiAgb1trZXldID0gdmFsdWU7XG59XG5cbmV4cG9ydCBjb25zdCBkaXYgPSBub2RlKCdkaXYnKTtcbmV4cG9ydCBjb25zdCBzcGFuID0gbm9kZSgnc3BhbicpO1xuZXhwb3J0IGNvbnN0IGEgPSBub2RlKCdhJyk7XG5leHBvcnQgY29uc3QgcCA9IG5vZGUoJ3AnKTtcbmV4cG9ydCBjb25zdCBoMSA9IG5vZGUoJ2gxJyk7XG5leHBvcnQgY29uc3QgaW5wdXQgPSBub2RlKCdpbnB1dCcpO1xuZXhwb3J0IGNvbnN0IGxhYmVsID0gbm9kZSgnbGFiZWwnKTtcbmV4cG9ydCBjb25zdCBzbG90ID0gbm9kZSgnc2xvdCcpO1xuZXhwb3J0IGNvbnN0IHN0eWxlID0gbm9kZSgnc3R5bGUnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRleHQoczogc3RyaW5nKTogVGV4dCB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVtcHR5KGU6IE5vZGUpIHtcbiAgd2hpbGUoZS5maXJzdENoaWxkKSB7XG4gICAgZS5yZW1vdmVDaGlsZChlLmZpcnN0Q2hpbGQpO1xuICB9XG59IiwiaW1wb3J0IHsgZGl2LCBzbG90LCBzdHlsZSwgdGV4dCB9IGZyb20gXCIuLi9idWlsZGVyL0h0bWxCdWlsZGVyXCI7XG5cbmNvbnN0IGRpYWdTdHlsZXMgPSBgXG4gICAgLmRnLWRpYWdyYW0ge1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB9XG4gICAgLmRnLXNjcm9sbC1wYW5lIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIH1cbiAgICAuZGctY29udGVudC1wYW5lIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmV5O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgfVxuYDtcblxuZXhwb3J0IGNsYXNzIERnRGlhZ3JhbSBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICAgIHN0YXRpYyBUQUcgPSBcImRnLWRpYWdyYW1cIlxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGNvbnN0IHNoYWRvdyA9IHRoaXMuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcbiAgICAgICAgY29uc3QgY29udGVudFBhbmUgPSBkaXYoXG4gICAgICAgICAgICB7IGNsYXNzTmFtZTogJ2RnLWNvbnRlbnQtcGFuZScgfSwgXG4gICAgICAgICAgICBzbG90KHt9KVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBzY3JvbGxQYW5lID0gZGl2KFxuICAgICAgICAgICAgeyBjbGFzc05hbWU6ICdkZy1zY3JvbGwtcGFuZScgfSxcbiAgICAgICAgICAgIGNvbnRlbnRQYW5lXG4gICAgICAgICk7XG4gICAgICAgIHNoYWRvdy5hcHBlbmRDaGlsZChzY3JvbGxQYW5lKTtcbiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKHN0eWxlKHt9LCB0ZXh0KGRpYWdTdHlsZXMpKSk7XG4gICAgfSAgICBcblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIH1cblxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRGdEaWFncmFtLlRBRywgRGdEaWFncmFtKTsiLCJpbXBvcnQgeyBkaXYsIHNsb3QsIHN0eWxlLCB0ZXh0IH0gZnJvbSBcIi4uL2J1aWxkZXIvSHRtbEJ1aWxkZXJcIjtcbmltcG9ydCB7IERnTm9kZSB9IGZyb20gXCIuL0RnTm9kZVwiO1xuXG5pbnRlcmZhY2UgRHJhZ1N0YXRlIHtcbiAgICByZWFkb25seSByZWZYOiBudW1iZXI7XG4gICAgcmVhZG9ubHkgcmVmWTogbnVtYmVyO1xuICAgIHJlYWRvbmx5IGRvd25YOiBudW1iZXI7XG4gICAgcmVhZG9ubHkgZG93blk6IG51bWJlcjtcbiAgICBjdXJYOiBudW1iZXI7XG4gICAgY3VyWTogbnVtYmVyO1xufVxuXG5mdW5jdGlvbiBkZWx0YXMoZHM6RHJhZ1N0YXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGVsdGFYOiBkcy5jdXJYIC0gZHMuZG93blgsXG4gICAgICAgIGRlbHRhWTogZHMuY3VyWSAtIGRzLmRvd25ZXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGdEcmFnZ2FibGUgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cbiAgICBzdGF0aWMgVEFHID0gXCJkZy1kcmFnZ2FibGVcIjtcblxuICAgIHByaXZhdGUgZHJhZ1N0YXRlOiBEcmFnU3RhdGUgfCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBjb25zdCBzaGFkb3cgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJ30pO1xuICAgICAgICBjb25zdCBkb21Ob2RlID0gZGl2KHsgY2xhc3NOYW1lOiAnZGctZHJhZ2dhYmxlJ30sIHNsb3Qoe30pKTtcbiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKGRvbU5vZGUpO1xuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICBzdHlsZSh7fSwgdGV4dChgXG4gICAgICAgICAgICAuZGctZHJhZ2dhYmxlIHtcbiAgICAgICAgICAgICAgICBjdXJzb3I6IG1vdmU7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBgKSlcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBtb3VzZU1vdmUgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ1N0YXRlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBjbGllbnRYLCBjbGllbnRZIH0gPSBlO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ1N0YXRlLmN1clggPSBjbGllbnRYO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ1N0YXRlLmN1clkgPSBjbGllbnRZO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGVsdGFYLCBkZWx0YVkgfSA9IGRlbHRhcyh0aGlzLmRyYWdTdGF0ZSk7IFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRlbHRhWCwgZGVsdGFZKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkZ05vZGUgPSB0aGlzLmdldERnTm9kZSgpOyAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChkZ05vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGdOb2RlLnggPSB0aGlzLmRyYWdTdGF0ZS5yZWZYICsgZGVsdGFYO1xuICAgICAgICAgICAgICAgICAgICBkZ05vZGUueSA9IHRoaXMuZHJhZ1N0YXRlLnJlZlkgKyBkZWx0YVk7ICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1vdXNlVXAgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2VNb3ZlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ1N0YXRlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9tTm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgY2xpZW50WCwgY2xpZW50WSB9ID0gZTtcbiAgICAgICAgICAgIGNvbnN0IGRnTm9kZSA9IHRoaXMuZ2V0RGdOb2RlKCk7ICAgICAgXG4gICAgICAgICAgICBpZiAoZGdOb2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIGRvd25YOiBjbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICBkb3duWTogY2xpZW50WSxcbiAgICAgICAgICAgICAgICAgICAgY3VyWDogY2xpZW50WCxcbiAgICAgICAgICAgICAgICAgICAgY3VyWTogY2xpZW50WSxcbiAgICAgICAgICAgICAgICAgICAgcmVmWDogZGdOb2RlLngsXG4gICAgICAgICAgICAgICAgICAgIHJlZlk6IGRnTm9kZS55LFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJtb3VzZWRvd25cIik7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2VNb3ZlKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2VVcCk7ICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERnTm9kZShmcm9tOiBIVE1MRWxlbWVudCA9IHRoaXMpOiBEZ05vZGUgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoZnJvbS5wYXJlbnRFbGVtZW50IGluc3RhbmNlb2YgRGdOb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbS5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIGlmIChmcm9tLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERnTm9kZShmcm9tLnBhcmVudEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG5cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKERnRHJhZ2dhYmxlLlRBRywgRGdEcmFnZ2FibGUpOyIsImltcG9ydCB7IGRpdiwgc2xvdCwgc3R5bGUsIHRleHQgfSBmcm9tIFwiLi4vYnVpbGRlci9IdG1sQnVpbGRlclwiO1xuaW1wb3J0IHsgc2FmZVBhcnNlSW50IH0gZnJvbSBcIi4uL1NhZmVQYXJzZUludFwiO1xuXG5jb25zdCBjc3MgPSBgXG4gICAgLmRnLW5vZGUge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7ICAgXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47ICAgIFxuICAgIH1cbmA7XG5cbmV4cG9ydCBjbGFzcyBEZ05vZGUgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cbiAgICBzdGF0aWMgVEFHID0gXCJkZy1ub2RlXCI7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IGRnTm9kZTogSFRNTERpdkVsZW1lbnQ7XG4gICAgcHJpdmF0ZSByZWFkb25seSBkZ1Nsb3Q6IEhUTUxTbG90RWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBjb25zdCBzaGFkb3cgPSB0aGlzLmF0dGFjaFNoYWRvdyh7bW9kZTonb3Blbid9KTtcbiAgICAgICAgdGhpcy5kZ1Nsb3QgPSBzbG90KHt9KTtcbiAgICAgICAgdGhpcy5kZ05vZGUgPSBkaXYoe2NsYXNzTmFtZTogJ2RnLW5vZGUnfSwgdGhpcy5kZ1Nsb3QpO1xuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQodGhpcy5kZ05vZGUpO1xuICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQoc3R5bGUoe30sIHRleHQoY3NzKSkpO1xuICAgIH1cblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkgeyAgICAgICAgXG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmRnTm9kZS5zdHlsZTtcbiAgICAgICAgcy5sZWZ0ID0gdGhpcy54ICsgXCJweFwiO1xuICAgICAgICBzLnRvcCA9IHRoaXMueSArIFwicHhcIjtcbiAgICAgICAgcy53aWR0aCA9IHRoaXMudyArIFwicHhcIjtcbiAgICAgICAgcy5oZWlnaHQgPSB0aGlzLmggKyBcInB4XCI7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIHJldHVybiBbJ3gnLCAneScsICdoJywgJ3cnXTtcbiAgICB9XG5cbiAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZTogc3RyaW5nLCBvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmRnTm9kZS5zdHlsZTtcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBjYXNlICd4Jzoge1xuICAgICAgICAgICAgICAgIHMubGVmdCA9IHRoaXMueCArICdweCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICd5Jzoge1xuICAgICAgICAgICAgICAgIHMudG9wID0gdGhpcy55ICsgJ3B4JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ3cnOiB7XG4gICAgICAgICAgICAgICAgcy53aWR0aCA9IHRoaXMudyArICdweCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdoJzoge1xuICAgICAgICAgICAgICAgIHMuaGVpZ2h0ID0gdGhpcy5oICsgJ3B4JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgeCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc2FmZVBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCd4JykpO1xuICAgIH1cblxuICAgIHNldCB4KHg6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgneCcsIHgudG9TdHJpbmcoKSk7XG4gICAgICAgIHRoaXMuZGdOb2RlLnN0eWxlLmxlZnQgPSB0aGlzLnggKyAncHgnO1xuICAgIH1cblxuICAgIGdldCB5KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ3knKSk7XG4gICAgfVxuXG4gICAgc2V0IHkoeTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd5JywgeS50b1N0cmluZygpKTtcbiAgICAgICAgdGhpcy5kZ05vZGUuc3R5bGUudG9wID0gdGhpcy55ICsgJ3B4JztcbiAgICB9XG5cbiAgICBnZXQgaCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gc2FmZVBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCdoJykpO1xuICAgIH1cblxuICAgIGdldCB3KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBzYWZlUGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ3cnKSk7XG4gICAgfVxuXG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShEZ05vZGUuVEFHLCBEZ05vZGUpOyIsImltcG9ydCB7IGRpdiwgc2xvdCwgc3R5bGUsIHRleHQgfSBmcm9tIFwiLi4vYnVpbGRlci9IdG1sQnVpbGRlclwiO1xuaW1wb3J0IHsgRGdEaWFncmFtIH0gZnJvbSBcIi4vRGdEaWFncmFtXCI7XG5pbXBvcnQgeyBEZ05vZGUgfSBmcm9tIFwiLi9EZ05vZGVcIjtcblxuZXhwb3J0IGNsYXNzIERnU2VsZWN0YWJsZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICAgIHN0YXRpYyBUQUcgPSBcImRnLXNlbGVjdGFibGVcIjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBjb25zdCBzaGFkb3cgPSB0aGlzLmF0dGFjaFNoYWRvdyh7bW9kZTonb3Blbid9KTtcbiAgICAgICAgY29uc3QgZG9tTm9kZSA9IGRpdihcbiAgICAgICAgICAgIHsgY2xhc3NOYW1lOiAnZGctc2VsZWN0YWJsZScgfSxcbiAgICAgICAgICAgIHNsb3Qoe30pXG4gICAgICAgICk7XG4gICAgICAgIHNoYWRvdy5hcHBlbmRDaGlsZChkb21Ob2RlKTtcbiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgc3R5bGUoe30sIHRleHQoYFxuICAgICAgICAgICAgICAgIC5kZy1zZWxlY3RhYmxlIHtcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYCkpXG4gICAgICAgICk7ICAgICAgICBcbiAgICB9XG5cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAhdGhpcy5zZWxlY3RlZDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0IHNlbGVjdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGVkKHM6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICcnKTsgICAgICAgICAgICBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdzZWxlY3RlZCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcHJpdmF0ZSBnZXREZ05vZGUoZnJvbTogSFRNTEVsZW1lbnQgPSB0aGlzKTogRGdOb2RlIHwgdW5kZWZpbmVkIHtcbiAgICAvLyAgICAgaWYgKGZyb20ucGFyZW50RWxlbWVudCBpbnN0YW5jZW9mIERnTm9kZSkge1xuICAgIC8vICAgICAgICAgcmV0dXJuIGZyb20ucGFyZW50RWxlbWVudDtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBpZiAoZnJvbS5wYXJlbnRFbGVtZW50KSB7XG4gICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5nZXREZ05vZGUoZnJvbS5wYXJlbnRFbGVtZW50KTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIC8vIH1cblxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRGdTZWxlY3RhYmxlLlRBRywgRGdTZWxlY3RhYmxlKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEN1c3RvbWVyQXBwIH0gZnJvbSBcIi4vY3VzdG9tZXIvQ3VzdG9tZXJBcHBcIjtcbmltcG9ydCB7IERnRGlhZ3JhbSB9IGZyb20gXCIuL2RpYWdyYW0vRGdEaWFncmFtXCI7XG5pbXBvcnQgeyBEZ0RyYWdnYWJsZSB9IGZyb20gXCIuL2RpYWdyYW0vRGdEcmFnZ2FibGVcIjtcbmltcG9ydCB7IERnTm9kZSB9IGZyb20gXCIuL2RpYWdyYW0vRGdOb2RlXCI7XG5pbXBvcnQgeyBEZ1NlbGVjdGFibGUgfSBmcm9tIFwiLi9kaWFncmFtL0RnU2VsZWN0YWJsZVwiO1xuaW1wb3J0IHsgU2Nyb2xsSXRlbSB9IGZyb20gXCIuL3ZpcnR1YWwtc2Nyb2xsZXIvU2Nyb2xsSXRlbVwiO1xuaW1wb3J0IHsgVmlydHVhbFNjcm9sbGVyIH0gZnJvbSBcIi4vdmlydHVhbC1zY3JvbGxlci9WaXJ0dWFsU2Nyb2xsZXJcIjtcblxuLy8ganVzdCBmb3IgaW1wb3J0cyAhXG4vLyBjb25zb2xlLmxvZygneWFsbGEnLCBDdXN0b21lckFwcC5UQUdfTkFNRSwgVmlydHVhbFNjcm9sbGVyLlRBR19OQU1FLCBTY3JvbGxJdGVtLlRBR19OQU1FLCBEZ0RpYWdyYW0uVEFHLCBEZ05vZGUuVEFHLCBEZ0RyYWdnYWJsZS5UQUcpO1xuY29uc29sZS5sb2coRGdEaWFncmFtLlRBRywgRGdOb2RlLlRBRywgRGdEcmFnZ2FibGUuVEFHLCBEZ1NlbGVjdGFibGUuVEFHKTtcblxuLy8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBlID0+IHtcbi8vICAgICBjb25zdCBhcHA6IEN1c3RvbWVyQXBwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpIGFzIEN1c3RvbWVyQXBwO1xuLy8gICAgIGNvbnNvbGUubG9nKFwiYXBwIGxvYWRlZFwiLCBhcHApO1xuLy8gICAgIGFwcC5pbml0KFtcbi8vICAgICAgICAgeyBmaXJzdE5hbWU6ICdUb3RvJywgbGFzdE5hbWU6ICdCaWxvdXRlJyB9LFxuLy8gICAgICAgICB7IGZpcnN0TmFtZTogJ0ZyZW5jaCcsIGxhc3ROYW1lOiAnRnJpZXMnIH0sXG4vLyAgICAgICAgIHsgZmlyc3ROYW1lOiAnRm9vJywgbGFzdE5hbWU6ICdCYXInIH0sXG4vLyAgICAgXSlcbi8vIH0pXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=