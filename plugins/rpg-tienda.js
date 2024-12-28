import fs from 'fs';

let handler = async (m, { conn, text }) => {
    const userId = m.sender;
    const db = global.db.data.users; // Base de datos de usuarios

    // Verificar si el usuario existe en la base de datos
    if (!db[userId]) db[userId] = { hearts: 0, skins: [] };

    const user = db[userId];
    const skins = JSON.parse(fs.readFileSync('../storage/database/skins.json', 'utf-8'));

    // Mostrar la tienda si no se especifica texto
    if (!text) {
        let shopMessage = '🛒 *Tienda de Skins*\n\n';
        for (let skin of skins) {
            shopMessage += `🆔 *ID:* ${skin.id}\n📛 *Nombre:* ${skin.name}\n❤️ *Costo:* ${skin.cost} corazones\n\n`;
        }
        shopMessage += `💰 *Tus corazones blancos:* ${user.hearts}\n\n`;
        shopMessage += `Usa: *.comprar <ID de skin>* para comprar.`;
        return conn.reply(m.chat, shopMessage, m);
    }

    // Proceso de compra
    let args = text.split(' ');
    if (args[0] === 'comprar') {
        let skinId = parseInt(args[1]);
        let selectedSkin = skins.find(skin => skin.id === skinId);

        if (!selectedSkin) {
            return conn.reply(m.chat, `🚩 No se encontró la skin con ID ${skinId}.`, m);
        }

        if (user.hearts < selectedSkin.cost) {
            return conn.reply(m.chat, `🚩 No tienes suficientes corazones blancos. Necesitas ${selectedSkin.cost - user.hearts} más.`, m);
        }

        if (user.skins.includes(selectedSkin.id)) {
            return conn.reply(m.chat, `🚩 Ya tienes esta skin.`, m);
        }

        // Deduce corazones y agrega la skin al usuario
        user.hearts -= selectedSkin.cost;
        user.skins.push(selectedSkin.id);
        return conn.reply(m.chat, `✅ Compraste la skin *${selectedSkin.name}*. ¡Disfrútala!`, m);
    }

    conn.reply(m.chat, `🚩 Comando no válido. Usa *.shop* para ver la tienda.`, m);
};

handler.command = ['tienda', 'comprar'];

export default handler;
