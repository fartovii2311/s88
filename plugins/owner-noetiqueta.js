let handler = async (m, { conn, usedPrefix, isOwner }) => {
await m.react('😺')
await conn.reply(m.chat, `Hola @${m.sender.split`@`[0]} si necesitas la ayuda de mi creador porfavor escribele al privado\n*- Solo asuntos importantes -*`, estilo, { mentions: [m.sender] })
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;お;;\nFN:お⁩\nORG:お⁩\nTITLE:\nitem1.TEL;waid=51968382008:51968382008\nitem1.X-ABLabel:おDanịel.xyz⁩\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:お⁩\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: 'お⁩', contacts: [{ vcard }] }}, {quoted: m})
}
handler.customPrefix = /^(@51968382008|@51917154203|@51968382008|@51968382008)$/i
handler.command = new RegExp
export default handler
