import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const folder = {};

/**
 * Sugeneruojamas absoliutus kelias iki nurodyto failo.
 * @param {string} dir Reliatyvus kelias iki direktorijos kur laikomi norimi failai, e.g. `/data/users`
 * @returns {string} Absoliutus kelias iki direktorijos
 */
folder.fullPath = (dir) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return path.join(__dirname, `../${dir}`);
}

/**
 * Gaunamas failu sarasas nurodytoje direktorijoje. 
 * @param {string} dir Reliatyvus kelias iki direktorijos kur laikomi norimi failai, e.g. `/data/users`
 * @returns {Promise<string[]|boolean>} Sekmes atveju - `failu pavadinimu sarasas`; Klaidos atveju - `false`
 */
folder.read = async (dir) => {
    try {
        const folderPath = folder.fullPath(dir);
        const fileList = await fs.readdir(folderPath);
        return fileList;
    } catch (error) {
        return false;
    }
}

export { folder };