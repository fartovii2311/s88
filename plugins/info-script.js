import moment from 'moment-timezone'
import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
let res = await fetch('https://api.github.com/repos/Manuel12yt/dark-ai')
let json = await res.json()
try {
let txt = `*乂  S C R I P T  -  M A I N*\n\n`
    txt += `	✩   *Nombre* : ${json.name}\n`
    txt += `	✩   *Visitas* : ${json.watchers_count}\n`
    txt += `	✩   *Peso* : ${(json.size / 1024).toFixed(2)} MB\n`
    txt += `	✩   *Actualizado* : ${moment(json.updated_at).format('DD/MM/YY - HH:mm:ss')}\n`
    txt += `	✩   *Url* : ${json.html_url}\n`
    txt += `	✩   *Forks* : ${json.forks_count}\n`
    txt += `	✩   *Stars* : ${json.stargazers_count}\n\n`
    txt += `> 🤍 *${textbot}*`
let img = await (await fetch(`https://i.ibb.co/JndpnfX/LynxAI.jpg`)).buffer()

await conn.sendAi(m.chat, botname, textbot, txt, img, img, canal, m)
} catch {
await m.react('✖️')
}}
handler.help = ['script']
handler.tags = ['main']
handler.command = ['script', 'sc']
handler.register = true 
export default handler
