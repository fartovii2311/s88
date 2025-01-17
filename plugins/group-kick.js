let handler = async (m, { conn, participants, usedPrefix, command, isROwner }) => {
    // Verifica si el mensaje es válido
    if (!m || !m.isGroup || !m.mentionedJid[0] && !m.quoted) {
        return m.reply(`🚩 Menciona al usuario que deseas eliminar.`, m.chat);
    }

    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
    let ownerJid = m.chat.split`-`[0] + '51968382008@s.whatsapp.net';

    // Verifica si el usuario es un creador (global.owner)
    if (global.owner.includes(user)) {
        return conn.reply(m.chat, `🚩 No puedo eliminar a un creador del bot porque es mi creador.`, null, { mentions: [user] });
    }

    // Si no es el creador, procede a eliminar al usuario.
    await conn.groupParticipantsUpdate(m.chat, [user], 'remove'); 
    await m.reply(`🚩 Usuario eliminado.`, m.chat, { mentions: [user] });
    await conn.reply(user, `Lo siento, acabas de ser eliminado del grupo.`, m.chat);
};

handler.help = ['kick *@user*'];
handler.tags = ['group'];
handler.command = ['kick', 'expulsar'];
handler.admin = true;
handler.group = true; 
handler.botAdmin = true;

export default handler;
