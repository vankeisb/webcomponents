import { CustomerApp } from "./customer/CustomerApp";

// just for imports !
console.log('yalla', CustomerApp.TAG_NAME);

window.addEventListener('load', e => {
    const app: CustomerApp = document.getElementById('app') as CustomerApp;
    console.log("app loaded", app);
    app.init([
        { firstName: 'Toto', lastName: 'Biloute' },
        { firstName: 'French', lastName: 'Fries' },
        { firstName: 'Foo', lastName: 'Bar' },
    ])
})
