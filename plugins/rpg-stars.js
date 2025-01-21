import fetch from 'node-fetch'

let handler = async (m, {conn, usedPrefix}) => {
	
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let user = global.db.data.users[who]
    let name = conn.getName(who)
    if (!(who in global.db.data.users)) return conn.reply(m.chat, '🪙 El usuario no se encuentra en mi base de Datos.', m, rcanal).then(_ => m.react('✖️'))
    let img = await (await fetch(`https://i.ibb.co/JndpnfX/LynxAI.jpg`)).buffer()
    let txt = ` –  *🪙 M O N E D A S -  U S E R*\n\n`
        txt += `✩ *Nombre* : ${user.name}\n`
        txt += `✩ *🪙 Monedas* : ${toNum(user.corazones)} ( *${user.corazones}* )\n`
        txt += `✩ *Bank* : ${toNum(user.bank)} ( *${user.bank}* )\n`
        txt += `✩ *XP* : ${toNum(user.exp)} ( *${user.exp}* )`
    let mentionedJid = [who]
        
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)
}
handler.help = ['monedas']
handler.tags = ['rpg']
handler.command = ['coins', 'wallet', 'cartera', 'monedas', 'Monedas', 'bal', 'balance']
handler.register = true 
export default handler

function toNum(number) {
    if (number >= 1000 && number < 1000000) {
        return (number / 1000).toFixed(1) + 'k'
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M'
    } else if (number <= -1000 && number > -1000000) {
        return (number / 1000).toFixed(1) + 'k'
    } else if (number <= -1000000) {
        return (number / 1000000).toFixed(1) + 'M'
    } else {
        return number.toString()
    }
}
