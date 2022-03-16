import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Darbui su failais skirta klase.
 */
const file = {};

/**
 * Sugeneruojamas absoliutus kelias iki nurodyto failo.
 * @param {string} dir Reliatyvus kelias iki direktorijos kur laikomi norimi failai, e.g. `/data/users`
 * @param {string} fileName Norimo failo pavadinimas su jo pletiniu
 * @returns {string} Absoliutus kelias iki failo
 */
file.fullPath = (dir, fileName) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return path.join(__dirname, `../${dir}/${fileName}`);
}

/**
 * Sukuriamas failas, jei tokio dar nera nurodytoje direktorijoje.
 * @param {string} dir Reliatyvus kelias iki direktorijos kur laikomi norimi failai, e.g. `/data/users`
 * @param {string} fileName Norimo failo pavadinimas su jo pletiniu
 * @param {object} content Objektas (e.g. `{...}`), kuri norime irasyti i faila (konvertuojamas i JSON automatiskai)
 * @returns {Promise<boolean|string>} Sekmes atveju - `true`; Klaidos atveju - `klaidos pranesimas`
 */
file.create = async (dir, fileName, content) => {
    let fileDescriptor = null;
    try {
        const filePath = file.fullPath(dir, fileName);
        fileDescriptor = await fs.open(filePath, 'wx');
        await fs.writeFile(fileDescriptor, JSON.stringify(content));
        return true;
    } catch (error) {
        return 'Klaida kuriant faila';
    } finally {
        if (fileDescriptor) {
            await fileDescriptor.close();
        }
    }
}

/**
 * Perskaitomas failo turinys (tekstinis failas).
 * @param {string} dir Reliatyvus kelias iki direktorijos kur laikomi norimi failai, e.g. `/data/users`
 * @param {string} fileName Norimo failo pavadinimas su jo pletiniu
 * @returns {Promise<string|boolean>} Sekmes atveju - failo turinys; Klaidos atveju - `false`
 */
file.read = async (dir, fileName) => {
    try {
        const filePath = file.fullPath(dir, fileName);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return fileContent;
    } catch (error) {
        return false;
    }
}

/**
 * Perskaitomas failo turinys (binary failas, pvz.: nuotraukos).
 * @param {string} dir Reliatyvus kelias iki direktorijos kur laikomi norimi failai, e.g. `/data/users`
 * @param {string} fileName Norimo failo pavadinimas su jo pletiniu
 * @returns {Promise<string|boolean>} Sekmes atveju - failo turinys; Klaidos atveju - `false`
 */
file.readBinary = async (dir, fileName) => {
    try {
        const filePath = file.fullPath(dir, fileName);
        const fileContent = await fs.readFile(filePath);
        return fileContent;
    } catch (error) {
        return false;
    }
}

file.update = (dir, fileName, content) => {
    console.log('Updating file...');
}

file.delete = (dir, fileName) => {
    console.log('Deleting file...');
}

export { file };