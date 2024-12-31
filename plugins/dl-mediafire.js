// *[ ❀ MEDIAFIRE ]*
import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa un link de mediafire`, m,rcanal)

try {
let api = await fetch(`https://restapi.apibotwa.biz.id/api/mediafire?url=${text}`)
let json = await api.json()
let { filename, type, size, uploaded, ext, mimetype, download:dl_url } = json.data.response
m.reply(`*${filename}*

- *Tipo :* ${type}
- *Tamaño :* ${size}
- *Creado :* ${uploaded}`)
await conn.sendFile(m.chat, dl_url, filename, null, m, null, { mimetype: ext, asDocument: true })

} catch (error) {
console.error(error)
}}

handler.help = ['mediafire'].map(v => v + ' *<url>*')
handler.tags = ['dl', 'premium']
handler.command = ['mediafire', 'mdfire', 'mf']
handler.premium = true 

export default handler;
