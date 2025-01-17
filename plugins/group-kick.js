let handler = async (m, { conn, participants, usedPrefix, command, isROwner }) => {
    if (!m || !m.isGroup || !m.mentionedJid[0] && !m.quoted) {
        return m.reply(`🚩 Menciona al usuario que deseas eliminar.`, m.chat);
    }

    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
    let ownerJid = m.chat.split`-`[0] + '51968382008@s.whatsapp.net';

    // Verificar si el usuario es el propietario
    if (user === ownerJid || global.owner.includes(user)) {
        return conn.reply(m.chat, `🚩 No puedo eliminar al creador del grupo porque es mi creador.`, null, { mentions: [user] });
    }

    // Si no es el creador, proceder con la eliminación
    await conn.groupParticipantsUpdate(m.chat, [user], 'remove'); 

    // Mensaje de eliminación solo si no es el propietario
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
