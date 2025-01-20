import fs from 'fs';
import path from 'path';

const databasePath = path.resolve('./storage/databases/database.json');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let db = loadDatabase();

    function addUserToDatabase(userId, userData) {
        db.users = db.users || {};
        db.users[userId] = userData;
        saveDatabase(db);
    }

    function getUserFromDatabase(userId) {
        return db.users ? db.users[userId] : null;
    }

    let replyText = '';

    if (command === 'agregardata') {
        const [name, age] = text.split(',');
        const userId = m.sender.split('@')[0];
        const userData = { name, age: parseInt(age) };

        addUserToDatabase(userId, userData);

        replyText = `Usuario agregado: ${name}, Edad: ${age}`;
    }

    if (command === 'getuser') {
        const userId = m.sender.split('@')[0];
        const userData = getUserFromDatabase(userId);

        if (userData) {
            replyText = `Datos de usuario: Nombre: ${userData.name}, Edad: ${userData.age}`;
        } else {
            replyText = 'Usuario no encontrado en la base de datos';
        }
    }

    await conn.reply(m.chat, replyText, m);
};

function loadDatabase() {
    if (fs.existsSync(databasePath)) {
        return JSON.parse(fs.readFileSync(databasePath, 'utf8'));
    } else {
        return {};
    }
}

function saveDatabase(db) {
    fs.writeFileSync(databasePath, JSON.stringify(db, null, 2), 'utf8');
}

handler.help = ['agregardata'];
handler.tags = ['owner'];
handler.command = /^agregardata$/i;
handler.rowner = true;

export default handler;
