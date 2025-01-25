import MessageType from '@whiskeysockets/baileys';

let handler = async (m, { conn, text }) => {
    let who;

    // Verificar si es un grupo y si se menciona a un usuario
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

    // Verificar si el perfil del usuario existe en la base de datos
    if (!users[who]) {
        users[who] = { Monedas: 0, exp: 0 }; // Inicializamos el perfil si no existe
    }

    // Asignar valores grandes (simulando infinito)
    users[who].Monedas = Number.MAX_SAFE_INTEGER;
    users[who].exp = Number.MAX_SAFE_INTEGER;

    // Responder al propietario, mencionando al usuario
    await m.reply(
        `✨ *¡Usuario chetado con éxito!*\n\n` +
        `👤 Usuario: @${who.split`@`[0]}\n` +
        `🪙 Monedas: *${users[who].Monedas.toLocaleString()}*\n` +
        `💡 Experiencia (XP): *${users[who].exp.toLocaleString()}*`,
        null,
        { mentions: [who] } // Esto menciona al usuario
    );
};

handler.help = ['chetar *@user*'];
handler.tags = ['owner'];
handler.command = ['chetar'];
handler.register = true;
handler.rowner = true; // Solo propietarios pueden usarlo

export default handler;
