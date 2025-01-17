let handler = async (m, { conn, participants, usedPrefix, command, isROwner }) => {
    let kickte = `🚩 Menciona al usuario que deseas eliminar.`;

    if (!m.mentionedJid[0] && !m.quoted) 
        return m.reply(kickte, m.chat, { mentions: conn.parseMention(kickte) });

    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
    
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
