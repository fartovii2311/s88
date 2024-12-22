import moment from 'moment-timezone'
import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
let res = await fetch('https://api.github.com/repos/')
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
let img = await (await fetch(`https://th.bing.com/th/id/R.3c44682163aece471be5e9be31853c5f?rik=ffeQ00G9XjrtnA&riu=http%3a%2f%2fcdn.wallpapersafari.com%2f3%2f96%2fzCEgo6.jpg&ehk=AG0SIiF60d%2fqhZysxXu70HHHGZOSdQ5xhUnW0SeytiI%3d&risl=&pid=ImgRaw&r=0`)).buffer()

await conn.sendAi(m.chat, botname, textbot, txt, img, img, canal, m)
} catch {
await m.react('✖️')
}}
handler.help = ['script']
handler.tags = ['main']
handler.command = ['script', 'sc']
handler.register = true 
export default handler
