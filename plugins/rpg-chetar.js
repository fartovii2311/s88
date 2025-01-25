import MessageType from '@whiskeysockets/baileys';

let handler = async (m, { conn, text }) => {
    let who;
    if (m.isGroup) who = m.mentionedJid[0];
    else who = m.chat;

    if (!who) throw '🔮 Menciona a un usuario con *@user* para chetarlo.';

    let users = global.db.data.users;

    // Validar si el remitente es propietario
    const isOwner = global.owner.some(([jid]) => m.sender.endsWith(jid));
    if (!isOwner) throw '🚩 Solo los propietarios pueden usar este comando.';

    // Inicializar el perfil del usuario si no existe
    if (!users[who]) users[who] = { Monedas: 0, XP: 0 };

    // Asignar valores grandes (simulando infinito)
    users[who].Monedas = Number.MAX_SAFE_INTEGER; // Valor máximo seguro en JS para enteros
    users[who].XP = Number.MAX_SAFE_INTEGER;

    // Respuesta al propietario
    await m.reply(
        `✨ *¡Usuario chetado con éxito!*\n\n` +
        `👤 Usuario: @${who.split`@`[0]}\n` +
        `🪙 Monedas: *${users[who].Monedas.toLocaleString()}*\n` +
        `💡 Experiencia (XP): *${users[who].XP.toLocaleString()}*`,
        null,
        { mentions: [who] }
    );
};

handler.help = ['chetar *@user*'];
handler.tags = ['owner'];
handler.command = ['chetar'];
handler.register = true;
handler.rowner = true; // Solo propietarios pueden usarlo

export default handler;
