const linkRegex = /(chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})|whatsapp:\/\/send\?text=)([A-Za-z0-9&=]+)/i;

export async function before(m, { conn, isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe)
        return !0;
    if (!m.isGroup) return !1;

    let chat = global.db.data.chats[m.chat];
    let bot = global.db.data.settings[this.user.jid] || {};
    const isGroupLink = linkRegex.exec(m.text);

    if (chat.antiLink && isGroupLink) {
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
            if (m.text.includes(linkThisGroup)) return !0;
        }

        await conn.sendMessage(m.chat, { delete: m.key });
        await conn.reply(m.chat, `🚩 *No permitimos enlaces de otros grupos*, lo siento *@${m.sender.split('@')[0]}*. Serás expulsado del grupo ${isBotAdmin ? '' : '\n\nNo soy admin, así que no te puedo expulsar :('}`, null, { mentions: [m.sender] });

        if (isBotAdmin && chat.antiLink) {
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
        } else if (!chat.antiLink) return;
    }

    return !0;
}
