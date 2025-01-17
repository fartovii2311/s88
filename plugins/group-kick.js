let handler = async (m, { conn, participants, usedPrefix, command, isROwner }) => {
    let kickte = `🚩 Menciona al usuario que deseas eliminar.`;

    if (!m.mentionedJid[0] && !m.quoted) 
        return m.reply(kickte, m.chat, { mentions: conn.parseMention(kickte) });

    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
    let ownerJid = m.chat.split`-`[0] + '@s.whatsapp.net';

    if (user === ownerJid) {
        return conn.reply(m.chat, `🚩 No puedo eliminar al propietario del grupo porque es mi creador.`, null, { mentions: [user] });
    }

    // Eliminar al usuario
    await conn.groupParticipantsUpdate(m.chat, [user], 'remove'); 

    // Solo enviamos los mensajes de eliminación si el usuario no es el creador
    if (user !== ownerJid) {
        await m.reply(`🚩 Usuario eliminado.`, m.chat, { mentions: [user] });
        m.reply(`Lo siento, acabas de ser eliminado del grupo.`, user);
    }
};

handler.help = ['kick *@user*'];
handler.tags = ['group'];
handler.command = ['kick', 'expulsar'];
handler.admin = true;
handler.group = true; 
handler.botAdmin = true;

export default handler;
