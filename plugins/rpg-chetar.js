import MessageType from '@whiskeysockets/baileys';

let handler = async (m, { conn, text }) => {
    let who;

    if (m.isGroup) {
        if (m.mentionedJid.length > 0) {
            who = m.mentionedJid[0];
        } else {
            who = m.sender;
        }
    } else {
        who = m.sender;
    }

    let users = global.db.data.users;

    const isOwner = global.owner.some(([jid]) => m.sender.endsWith(jid));
    if (!isOwner) throw '🚩 Solo los propietarios pueden usar este comando.';

    if (text.startsWith('chetar')) {
        if (!users[who]) users[who] = { Monedas: 0, XP: 0 };

        users[who].Monedas = Number.MAX_SAFE_INTEGER;
        users[who].XP = Number.MAX_SAFE_INTEGER;

        await m.reply(
            `✨ *¡Usuario chetado con éxito!*\n\n` +
            `👤 Usuario: @${who.split`@`[0]}\n` +
            `🪙 Monedas: *${users[who].Monedas.toLocaleString()}*\n` +
            `💡 Experiencia (XP): *${users[who].XP.toLocaleString()}*`,
            null,
            { mentions: [who] }
        );
    }

    if (text.startsWith('deschetar')) {
        if (!users[who]) throw '🔮 El usuario no tiene datos para deschetar.';

        users[who].Monedas = 0;
        users[who].XP = 0;

        await m.reply(
            `🔮 *¡Usuario descheteado con éxito!*\n\n` +
            `👤 Usuario: @${who.split`@`[0]}\n` +
            `🪙 Monedas: *0*\n` +
            `💡 Experiencia (XP): *0*`,
            null,
            { mentions: [who] }
        );
    }
};

handler.help = ['chetar *@user*', 'deschetar *@user*'];
handler.tags = ['owner'];
handler.command = ['chetar', 'deschetar'];
handler.register = true;
handler.rowner = true;

export default handler;
