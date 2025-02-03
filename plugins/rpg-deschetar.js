import MessageType from '@whiskeysockets/baileys';

let handler = async (m, { conn, text }) => {
    let who;

    if (m.isGroup) {
        if (m.mentionedJid.length > 0) {
            who = m.mentionedJid[0];
        } else if (text) {
            who = text.trim();
            if (!who.endsWith('@s.whatsapp.net')) {
                who = `${who}@s.whatsapp.net`;
            }
        } else {
            who = m.sender;
        }
    } else {
        if (text) {
            who = text.trim();
            if (!who.endsWith('@s.whatsapp.net')) {
                who = `${who}@s.whatsapp.net`;
            }
        } else {
            who = m.sender;
        }
    }

    if (!global.db) global.db = {};
    if (!global.db.data) global.db.data = {};
    if (!global.db.data.users) global.db.data.users = {};

    let users = global.db.data.users;

    const isOwner = global.owner.some(([jid]) => m.sender.endsWith(jid));
    if (!isOwner) throw '🚩 Solo los propietarios pueden usar este comando.';

    if (!users[who]) throw '🔮 El usuario no tiene datos para deschetar.';

    users[who].Monedas = 0;
    users[who].exp = 0;
    users[who].level = 0;

    await global.db.write(); // 🔥 Guardar cambios en el bot principal

    // 🔥 **Enviar el comando a todos los sub-bots para que eliminen los datos**
    for (let subbot of global.conns) {
        try {
            if (subbot.user) {
                await subbot.sendMessage(m.chat, { text: `/deschetar ${who.split`@`[0]}` });
            }
        } catch (error) {
            console.log(`❌ Error al enviar deschetar a sub-bot: ${error.message}`);
        }
    }

    await m.reply(
        `🔮 *¡Usuario descheteado en todos los sub-bots!*\n\n` +
        `👤 Usuario: @${who.split`@`[0]}\n` +
        `🪙 Monedas: *0*\n` +
        `💡 Experiencia (XP): *0*\n` +
        `📈 Nivel: *0*`,
        null,
        { mentions: [who] }
    );
};

handler.help = ['deschetar *@user*', 'deschetar *numero*'];
handler.tags = ['owner'];
handler.command = ['deschetar'];
handler.register = true;
handler.owner = true;

export default handler;
