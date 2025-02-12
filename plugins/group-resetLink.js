let handler = async(m, { conn }) => {
let revoke = await conn.groupRevokeInvite(m.chat)
await conn.reply(m.chat, `🚩 Связь с группой была успешно восстановлена.\n*-* Link Nuevo: ${'https://chat.whatsapp.com/' + revoke}`, m)}
handler.help = ['resetlink']
handler.tags = ['group']
handler.command = ['revoke', 'resetlink', 'anularlink'] 
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler