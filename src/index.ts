import { CustomerApp } from "./customer/CustomerApp";
import { DgDiagram } from "./diagram/DgDiagram";
import { DgDraggable } from "./diagram/DgDraggable";
import { DgLink } from "./diagram/DgLink";
import { DgNode } from "./diagram/DgNode";
import { ScrollItem } from "./virtual-scroller/ScrollItem";
import { VirtualScroller } from "./virtual-scroller/VirtualScroller";
import {DgResizeable} from "./diagram/DgResizeable";

// just for imports !
// console.log('yalla', CustomerApp.TAG_NAME, VirtualScroller.TAG_NAME, ScrollItem.TAG_NAME, DgDiagram.TAG, DgNode.TAG, DgDraggable.TAG);
console.log(DgDiagram.TAG, DgNode.TAG, DgDraggable.TAG, DgLink.TAG, DgResizeable.TAG);

// window.addEventListener('load', e => {
//     const app: CustomerApp = document.getElementById('app') as CustomerApp;
//     console.log("app loaded", app);
//     app.init([
//         { firstName: 'Toto', lastName: 'Biloute' },
//         { firstName: 'French', lastName: 'Fries' },
//         { firstName: 'Foo', lastName: 'Bar' },
//     ])
// })
