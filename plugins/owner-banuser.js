//

let handler = async (m, { conn, text, usedPrefix, command }) => {
   let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
    let user = global.db.data.users[who]
    if (!who) return m.reply(`🚩 Etiqueta a un usuario.`)
    let users = global.db.data.users

    if (command === 'mban') {
        users[who].banned = true
        conn.reply(m.chat, `🚩 @${who.split`@`[0]} ha sido baneado con éxito, ya no podrá volver a usar mis comandos.`, m, { mentions: [who] })
    } else if (command === 'munban') {
        if (!users[who].banned) return conn.reply(m.chat, `⚠️ El usuario @${who.split`@`[0]} no está baneado.`, m, { mentions: [who] })
        users[who].banned = false
        conn.reply(m.chat, `✅ @${who.split`@`[0]} ha sido desbaneado con éxito, ahora podrá usar mis comandos.`, m, { mentions: [who] })
    }
}
handler.help = ['mban *@user*', 'munban *@user*']
handler.tags = ['owner']
handler.command = /^(mban|munban)$/i
handler.rowner = true

export default handler
