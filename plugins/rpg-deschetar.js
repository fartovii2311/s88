import MessageType from '@whiskeysockets/baileys';

let handler = async (m, { conn, text }) => {
    let who;

    // Si es un grupo y hay una mención, se usa la mención
    if (m.isGroup) {
        if (m.mentionedJid.length > 0) {
            who = m.mentionedJid[0]; // Primera mención
        } else if (text) {
            who = text.trim();
            if (!who.endsWith('@s.whatsapp.net')) {
                who = `${who}@s.whatsapp.net`; // Si es solo el número, lo convertimos al formato correcto
            }
        } else {
            who = m.sender; // Si no hay mención, usamos al remitente
        }
    } else {
        // Si no es un grupo, usamos el número proporcionado o el remitente
        if (text) {
            who = text.trim();
            if (!who.endsWith('@s.whatsapp.net')) {
                who = `${who}@s.whatsapp.net`;
            }
        } else {
            who = m.sender;
        }
    }

    let users = global.db.data.users;

    // Verificamos si el remitente es el propietario del bot
    const isOwner = global.owner.some(([jid]) => m.sender.endsWith(jid));
    if (!isOwner) throw '🚩 Solo los propietarios pueden usar este comando.';

    if (!users[who]) {
        users[who] = { Monedas: 0, exp: 0 };
    }

    users[who].Monedas = 0;
    users[who].exp = 0;

    await m.reply(
        `🔮 *¡Usuario descheteado con éxito!*\n\n` +
        `👤 Usuario: @${who.split`@`[0]}\n` +
        `🪙 Monedas: *0*\n` +
        `💡 Experiencia (XP): *0*`,
        null,
        { mentions: [who] }
    );
};

handler.help = ['deschetar *@user*', 'deschetar *numero*'];
handler.tags = ['owner'];
handler.command = ['deschetar'];
handler.register = true;
handler.rowner = true;

export default handler;
