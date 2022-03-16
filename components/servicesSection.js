import { file } from "../lib/file.js";
import { folder } from "../lib/folder.js";
import { utils } from "../lib/utils.js";

async function servicesSection() {
    function isValid(service) {
        if (typeof service !== 'object'
            || service === null
            || Array.isArray(service)
            || Object.keys(service).length !== 4
            || typeof service.isActive !== 'boolean'
            || !service.icon
            || typeof service.icon !== 'string'
            || service.icon.length > 20
            || !service.title
            || typeof service.title !== 'string'
            || service.title.length > 40
            || !service.description
            || typeof service.description !== 'string'
            || service.description.length > 200) {
            return false;
        }
        return true;
    }

    // perskaitome kokie failai yra: /data/services folderyje
    // gauname sarasa paslaugu JSON failu
    // visus JSON failus issiparsinti, t.y. konvertuoti i normalu JS objekta
    // atfiltruoti ir pasilikti tik validzias ir aktyvias paslaugas, t.y. ju objektus
    // su ciklu sukonstruoti galutini paslaugu HTML
    // ta HTML istatyti i reikiama vieta return string'e

    let servicesHTML = '';
    const filesList = await folder.read('data/services');
    for (const fileName of filesList) {
        if (utils.fileExtension(fileName) !== 'json') {
            continue;
        }

        const fileContent = await file.read('data/services', fileName);
        const obj = utils.parseJSONtoObject(fileContent);
        if (!obj || !isValid(obj) || !obj.isActive) {
            continue;
        }

        servicesHTML += `<div class="service">
                            <i class="icon fa fa-${obj.icon}"></i>
                            <h3 class="title">${obj.title}</h3>
                            <p class="description">${obj.description}</p>
                        </div>`;
    }

    return `<section class="container bg-gradient services">
                <div class="row">
                    <h2>Services</h2>
                    <p>Each time a digital asset is purchased or sold, Sequoir donates a percentage of the fees back into the development of the asset through its charitable foundation.</p>
                </div>
                <div class="row services-list">${servicesHTML}</div>
            </section>`;
}

export { servicesSection };