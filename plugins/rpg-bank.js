let handler = async (m, {conn, usedPrefix}) => {
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
    if (who == conn.user.jid) return m.react('✖️')
    if (!(who in global.db.data.users)) return conn.reply(m.chat,`*El usuario no se encuentra en mi base de datos*`,m,rcanal)
    let user = global.db.data.users[who]
    await conn.reply(m.chat,`${who == m.sender ? `Tienes *${user.bank} 🪙 Monedas* en el Banco` : `El usuario @${who.split('@')[0]} tiene *${user.bank} 🪙 Monedas* en el Banco`}`, null,m,fake,rcanal, { mentions: [who] })
 }
 
 handler.help = ['bank']
 handler.tags = ['rpg']
 handler.command = ['bank', 'banco'] 
 handler.register = true 
 export default handler 
