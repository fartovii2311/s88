import { loadDatabase, saveDatabase } from './database.js';

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

handler.help = ['agregardata'];
handler.tags = ['owner'];
handler.command = /^agregardata$/i;
handler.rowner = true;

export default handler;

