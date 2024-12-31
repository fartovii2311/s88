import fetch from 'node-fetch';
let limit = 300

let handler = async (m, { conn, text, isPrems, isOwner, usedPrefix, command }) => {
if (!m.quoted) return conn.reply(m.chat, `[ ✰ ] Etiqueta el mensaje que contenga el resultado de YouTube Play.`, m, rcanal).then(_ => m.react('✖️'))
if (!m.quoted.text.includes("乂  Y O U T U B E  -  P L A Y")) return conn.reply(m.chat, `[ ✰ ] Etiqueta el mensaje que contenga el resultado de YouTube Play.`, m, rcanal).then(_ => m.react('✖️'))
let urls = m.quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
if (!urls) return conn.reply(m.chat, `Resultado no Encontrado.`, m, rcanal).then(_ => m.react('✖️'))
if (urls.length < text) return conn.reply(m.chat, `Resultado no Encontrado.`, m, rcanal).then(_ => m.react('✖️'))
let user = global.db.data.users[m.sender]

await m.react('🕓')
try {

  
if (size.split('MB')[0] >= limit) return m.reply(`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`).then(_ => m.react('✖️'))


await m.react('✅')
} catch {
await m.react('✖️')
}}
handler.help = ['Video']
handler.tags = ['downloader']
handler.customPrefix = /^(Video|video|vídeo|Vídeo)/
handler.command = new RegExp
//handler.limit = 1

export default handler
