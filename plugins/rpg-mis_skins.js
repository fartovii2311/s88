import fs from 'fs';

let handler = async (m, { conn, text }) => {
    const userId = m.sender;
    const db = global.db.data.users;

    // Asegurarse de que el usuario tenga datos válidos
    if (!db[userId]) {
        db[userId] = { hearts: 0, skins: [], bank: 0 };
    }

    const user = db[userId];

    if (user.hearts === undefined) user.hearts = 0;
    if (user.bank === undefined) user.bank = 0;

    let skins = [];
    try {
        skins = JSON.parse(fs.readFileSync('./storage/databases/skins.json', 'utf-8'));
    } catch (error) {
        if (error.code === 'ENOENT') {
            skins = [
                { id: 1, name: "Skin 1", cost: 100 },
                { id: 2, name: "Skin 2", cost: 200 }
            ];
            fs.writeFileSync('./storage/databases/skins.json', JSON.stringify(skins, null, 2));
        } else {
            console.error(error);
            return conn.reply(m.chat, `🚩 Ocurrió un error al acceder a la tienda de skins.`, m);
        }
    }

    // Mostrar tienda
    if (m.text === '.tienda') {
        let shopMessage = '🛒 *Tienda de Skins*\n\n';
        for (let skin of skins) {
            shopMessage += `🆔 *ID:* ${skin.id}\n📛 *Nombre:* ${skin.name}\n🤍 *Costo:* ${skin.cost} 🤍\n\n`;
        }
        shopMessage += `💰 *Tus corazones blancos:* ${user.hearts || 0} 🤍\n`;
        shopMessage += `🏦 *Tus corazones en el banco:* ${user.bank || 0} 🤍\n\n`;
        shopMessage += `Usa: *.comprar <ID de skin>* para comprar.`;
        return conn.reply(m.chat, shopMessage, m);
    }

    // Procesar comando comprar
    if (m.text.startsWith('.comprar')) {
        let args = m.text.split(' '); // Separar el texto en partes
        let skinId = parseInt(args[1]); // Asegurarnos de que el ID sea un número

        if (!skinId) {
            return conn.reply(m.chat, `🚩 Por favor ingresa un ID válido de skin.`, m);
        }

        let selectedSkin = skins.find(skin => skin.id === skinId);

        if (!selectedSkin) {
            return conn.reply(m.chat, `🚩 No se encontró la skin con ID ${skinId}.`, m);
        }

        let totalHearts = user.hearts + user.bank; // Corazones disponibles sumando los del banco

        if (totalHearts < selectedSkin.cost) {
            return conn.reply(m.chat, `🚩 No tienes suficientes corazones. Necesitas ${selectedSkin.cost - totalHearts} más.`, m);
        }

        // Usar corazones de la cuenta principal primero, luego del banco si es necesario
        if (user.hearts >= selectedSkin.cost) {
            user.hearts -= selectedSkin.cost;
        } else {
            let remainingCost = selectedSkin.cost - user.hearts;
            user.hearts = 0;
            user.bank -= remainingCost;
        }

        if (user.skins.includes(selectedSkin.id)) {
            return conn.reply(m.chat, `🚩 Ya tienes esta skin.`, m);
        }

        user.skins.push(selectedSkin.id);
        return conn.reply(m.chat, `✅ Compraste la skin *${selectedSkin.name}*. ¡Disfrútala!`, m);
    }

    // Comando para ver las skins que tiene el usuario
    if (m.text === '.mis_skins') {
        if (user.skins.length === 0) {
            return conn.reply(m.chat, `🚩 No tienes ninguna skin aún.`, m);
        }

        let skinsList = '🎮 *Tus Skins*\n\n';
        for (let skinId of user.skins) {
            let skin = skins.find(skin => skin.id === skinId);
            skinsList += `🆔 *ID:* ${skin.id}\n📛 *Nombre:* ${skin.name}\n\n`;
        }

        return conn.reply(m.chat, skinsList, m);
    }

    // Comando no válido
    conn.reply(m.chat, `🚩 Comando no válido. Usa *.tienda* para ver la tienda y *.comprar <ID de skin>* para comprar.`, m);
};

handler.help = ['tienda'];
handler.command = ['tienda', 'comprar', 'mis_skins'];
handler.tags = ['rpg'];
handler.register = true;

export default handler;
