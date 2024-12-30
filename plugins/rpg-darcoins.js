import MessageType from '@whiskeysockets/baileys';

let impuesto = 0.02; // Impuesto del 2%
let handler = async (m, { conn, text }) => {
    let who;
    if (m.isGroup) who = m.mentionedJid[0]; // Obtiene el primer usuario mencionado
    else who = m.chat; // Si no es grupo, usa el chat como destinatario

    if (!who) throw '🤍 Menciona al usuario con *@user.*';

    let txt = text.replace('@' + who.split`@`[0], '').trim(); // Extrae el texto restante
    if (!txt) throw '🤍 Ingrese la cantidad de *🤍 corazones* que quiere transferir.';
    if (isNaN(txt)) throw '🚩 Sólo números son permitidos.';

    let poin = parseInt(txt); // Convierte el texto en un número
    if (poin < 1) throw '🤍 Mínimo es *1 🤍 corazones*.';

    let corazones = poin;
    let imt = Math.ceil(poin * impuesto); // Calcula el impuesto
    corazones += imt;

    let users = global.db.data.users;

    // Verifica si el remitente es un propietario
    const isOwner = global.owner.some(([jid]) => m.sender.endsWith(jid));

    if (!isOwner) {
        // Si no es propietario, verifica si tiene suficientes corazones
        if (corazones > users[m.sender].corazones) throw '🚩 No tienes suficientes *🤍 corazones* para dar.';
        users[m.sender].corazones -= corazones; // Resta corazones del remitente
    }

    // Agrega corazones al destinatario
    if (!users[who]) users[who] = { corazones: 0 }; // Asegura que el destinatario tenga un registro
    users[who].corazones += poin;

    await m.reply(
        `🤍 *Transferencia completada exitosamente.*\n\n` +
        `Enviado: *${poin}* 🤍 corazones\n` +
        `Impuesto del 2%: *${imt}* 🤍 corazones\n` +
        `${isOwner ? '*Nota: Eres propietario y tienes corazones ilimitados.*' : `Total gastado: *${corazones}* 🤍 corazones.`}`
    );

    // Notifica al destinatario sobre la recepción de los corazones
    conn.fakeReply(m.chat, `*+${poin}* 🤍 corazones recibidos.`, who, m.text);
};

handler.help = ['darstars *@user <cantidad>*'];
handler.tags = ['rpg'];
handler.command = ['darcoins', 'darstars']; 
handler.register = true;

export default handler;
