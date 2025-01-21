import MessageType from '@whiskeysockets/baileys';

let impuesto = 0.02; // Impuesto del 2%
let handler = async (m, { conn, text }) => {
    let who;
    if (m.isGroup) who = m.mentionedJid[0];
    else who = m.chat; 

    if (!who) throw '🪙 Monedas al usuario con *@user.*';

    let txt = text.replace('@' + who.split`@`[0], '').trim();
    if (!txt) throw '🪙 Ingrese la cantidad de *🪙 Monedas* que quiere transferir.';
    if (isNaN(txt)) throw '🚩 Sólo números son permitidos.';

    let poin = parseInt(txt); // Convierte el texto en un número
    if (poin < 1) throw '🪙 Mínimo es *1 🪙 Moneda*.';

    let corazones = poin;
    let imt = Math.ceil(poin * impuesto);
    corazones += imt;

    let users = global.db.data.users;

    // Verifica si el remitente es un propietario
    const isOwner = global.owner.some(([jid]) => m.sender.endsWith(jid));

    if (!isOwner) {
        if (corazones > users[m.sender].corazones) throw '🚩 No tienes suficientes *🪙 Monedas* para dar.';
        users[m.sender].corazones -= corazones; 
    }

    if (!users[who]) users[who] = { corazones: 0 };
    users[who].corazones += poin;

    await m.reply(
        `🪙 *Transferencia completada exitosamente.*\n\n` +
        `Enviado: *${poin}* 🪙 Moneda\n` +
        `Impuesto del 2%: *${imt}* 🪙 Moneda\n` +
        `${isOwner ? '*Nota: Eres propietario y tienes corazones ilimitados.*' : `Total gastado: *${corazones}* 🪙 Moneda.`}`
    );

    conn.fakeReply(m.chat, `*+${poin}* 🪙 Moneda recibidos.`, who, m.text);
};

handler.help = ['darstars *@user <cantidad>*'];
handler.tags = ['rpg'];
handler.command = ['darcoins', 'darstars']; 
handler.register = true;

export default handler;
