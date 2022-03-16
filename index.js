import { server } from './lib/server.js';
import { database } from './lib/database.js';

const app = {};


app.init = () => {
    // pasiruosti pradinius folder'ius:

    // pasiruosti pradinius failus

    // prisijungimas prie DB (duomenu baze)
    database.init().catch(err => console.error(err));
    // uzkurti pati serveri (musu programa)
    server.init();

    // reguliariu procesu paleidimas:
    // - istrinti senus/nebereikalingus failus
    // - atsinaujinti informacija per/is API (valiutu kursai)
}

app.init();

export { app };