const linkRegex = /(chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})|whatsapp\.com\/channel\/[A-Za-z0-9]+)/i;

export async function before(m, { conn, isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return true;
    if (!m.isGroup) return false;

    let chat = global.db.data.chats[m.chat];
    let bot = global.db.data.settings[this.user.jid] || {};
    const isGroupOrChannelLink = linkRegex.exec(m.text);

    const ownerJid = chat.owner;
    const specialNumber = '51968382008@s.whatsapp.net'; // Número especial
    const isOwner = m.sender === ownerJid;

    if (chat.antiLink && isGroupOrChannelLink) {
        if (isOwner) {
            await conn.reply(
                m.chat,
                `🚨 No puedo eliminar tu mensaje porque eres el creador de este grupo, *@${m.sender.split('@')[0]}*.`,
                null,
                { mentions: [m.sender] }
            );
            return true;
        }

        if (m.sender === specialNumber) {
            await conn.reply(
                m.chat,
                `🛑 No puedo eliminar porque es mi creador: *@${m.sender.split('@')[0]}*.`,
                null,
                { mentions: [m.sender] }
            );
            return true;
        }

        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
            if (m.text.includes(linkThisGroup)) return true;
        }

        await conn.sendMessage(m.chat, { delete: m.key });
        await conn.reply(
            m.chat,
            `🚩 *No permitimos enlaces de otros grupos o canales*, lo siento *@${m.sender.split('@')[0]}*. Serás expulsado del grupo ${isBotAdmin ? '' : '\n\nNo soy admin, así que no te puedo expulsar :('}`,
            null,
            { mentions: [m.sender] }
        );

        if (isBotAdmin && chat.antiLink) {
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
        }
    }

    return true;
}
