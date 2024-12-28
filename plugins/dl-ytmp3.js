// [ ❀ YTMP3 ]
import fetch from 'node-fetch'

let HS = async (m, { conn, text }) => {
if (!text) {
return m.reply("❀ Ingresa un link de youtube")
}
    
try {
let api = await fetch(https://api.giftedtech.my.id/api/download/dlmp3?apikey=gifted&url=${text})
let json = await api.json()
let { quality, title, download_url } = json.result

await conn.sendMessage(m.chat, { audio: { url: download_url }, fileName: ${title}.mp3, mimetype: 'audio/mp4' }, { quoted: m })
} catch (error) {
console.error(error)
}}

handler.command = ['ytmp3'];
handler.register = true;

export default handler;
