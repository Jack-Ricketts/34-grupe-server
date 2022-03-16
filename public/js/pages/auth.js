import { IsValid } from "../components/IsValid.js";

const formDOM = document.querySelector('.form');
const errorsDOM = formDOM.querySelector('.form-errors');
const allInputsDOM = formDOM.querySelectorAll('input');
const submitDOM = formDOM.querySelector('button');

submitDOM.addEventListener('click', (e) => {
    e.preventDefault();
    // formos validacija - pirmine reiksmiu patikra
    const errors = [];
    const passwordValues = [];
    const formData = {}
    for (const inputDOM of allInputsDOM) {
        const { id, value, dataset } = inputDOM;
        formData[id] = value;

        const validationRule = dataset.validation;
        if (!validationRule) {
            console.error('ERROR: input turi tureti "data-validation" attribute');
            continue;
        }

        const validationFunction = IsValid[validationRule];
        if (typeof validationFunction !== 'function') {
            console.error('ERROR: nenumatyta validavimo funkcija', validationRule);
            continue;
        }

        // tikriname konkrecios formos reiksmes teisinguma
        const valueState = validationFunction(value); // true | 'Error message'

        if (valueState !== true && !errors.includes(valueState)) {
            errors.push(valueState);
        }

        if (validationRule === 'password') {
            passwordValues.push(value);
        }
    }

    // jei formoje yra daugiau nei 1 password'as, tai patikrinti, jog visi vienodi
    if (passwordValues.length > 1) {
        const initialPassword = passwordValues[0];
        for (let i = 1; i < passwordValues.length; i++) {
            if (initialPassword !== passwordValues[i]) {
                errors.push('Slaptazodziai nesutampa');
                break;
            }
        }
    }

    // jei rado klaidu, jas atvaizduoja
    if (errors.length) {
        errorsDOM.innerText = errors.map(s => s + '.').join('\n');
    } else {
        errorsDOM.innerText = '';

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                try {
                    const obj = JSON.parse(this.responseText);
                    errorsDOM.innerText = obj.msg;

                    if (obj.action) {
                        const { name, param } = obj.action;
                        if (name === 'redirect') {
                            location.href = param;
                        }
                    }
                } catch (error) {
                    errorsDOM.innerText = 'Is serverio atejo blogai suformatuota zinute';
                }
            }
        };
        xhttp.open('POST', formDOM.action, true);
        xhttp.send(JSON.stringify(formData));
    }

    // siusti duomenis

})