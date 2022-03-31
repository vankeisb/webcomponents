import { App } from "./App";
import { CustomerEditor } from "./widgets/CustomerEditor";
import { CustomerList } from "./widgets/CustomerList";
import { CustomerRow } from "./widgets/CustomerRow";

// just for imports !
console.log('yalla', App.TAG_NAME);

window.addEventListener('load', e => {
    const app: App = document.getElementById('app') as App;
    console.log("app loaded", app);
    app.init([
        { firstName: 'Toto', lastName: 'Biloute' },
        { firstName: 'French', lastName: 'Fries' },
        { firstName: 'Foo', lastName: 'Bar' },
    ])
})
