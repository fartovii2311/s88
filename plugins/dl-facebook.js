 // *[ ❀ FACEBOOK DL ]*
import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa un link de facebook`, m,rcanal)

try {
let api = await fetch(`https://api.siputzx.my.id/api/d/facebook?url=${text}`)
let json = await api.json()

await conn.sendFile(m.chat, json.data.thumbnail, '.jpg', null, m)
await conn.sendFile(m.chat, json.data.video, '.mp4', null, m)

} catch (error) {
console.error(error)
}}

handler.help = ['fb *<link>*'];
handler.corazones = 2;
handler.tags = ['dl'];
handler.command = /^(fb|facebook|fbdl)$/i;
handler.register = true;

export default handler;
