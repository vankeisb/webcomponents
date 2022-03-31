import { CustomerApp } from "./customer/CustomerApp";
import { ScrollItem } from "./virtual-scroller/ScrollItem";
import { VirtualScroller } from "./virtual-scroller/VirtualScroller";

// just for imports !
console.log('yalla', CustomerApp.TAG_NAME, VirtualScroller.TAG_NAME, ScrollItem.TAG_NAME);

window.addEventListener('load', e => {
    const app: CustomerApp = document.getElementById('app') as CustomerApp;
    console.log("app loaded", app);
    app.init([
        { firstName: 'Toto', lastName: 'Biloute' },
        { firstName: 'French', lastName: 'Fries' },
        { firstName: 'Foo', lastName: 'Bar' },
    ])
})
