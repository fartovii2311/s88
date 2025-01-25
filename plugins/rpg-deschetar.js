import MessageType from '@whiskeysockets/baileys';

let handler = async (m, { conn, text }) => {
    let who;

    // Verifica si es un grupo y se menciona a un usuario
    if (m.isGroup) {
        if (m.mentionedJid.length > 0) {
            who = m.mentionedJid[0]; // Tomamos la primera mención
        } else {
            who = m.sender; // Si no se menciona a nadie, tomamos al remitente
        }
    } else {
        who = m.sender; // Si no es un grupo, tomamos al remitente
    }

    let users = global.db.data.users;

    // Verificar si el remitente es propietario
    const isOwner = global.owner.some(([jid]) => m.sender.endsWith(jid));
    if (!isOwner) throw '🚩 Solo los propietarios pueden usar este comando.';

    // Verificar si el perfil del usuario existe
    if (!users[who]) throw '🔮 El usuario no tiene datos para deschetar.';

    // Restablecer todo (Monedas y XP) del usuario
    users[who].Monedas = 0;  // Restauramos las monedas
    users[who].exp = 0;      // Restauramos la experiencia (XP)

    // Responder al propietario, mencionando al usuario
    await m.reply(
        `🔮 *¡Usuario descheteado con éxito!*\n\n` +
        `👤 Usuario: @${who.split`@`[0]}\n` +
        `🪙 Monedas: *0*\n` +
        `💡 Experiencia (XP): *0*`,
        null,
        { mentions: [who] } // Esto menciona al usuario
    );
};

handler.help = ['deschetar *@user*'];
handler.tags = ['owner'];
handler.command = ['deschetar'];
handler.register = true;
handler.rowner = true; // Solo propietarios pueden usarlo

export default handler;
