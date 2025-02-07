import fs, { promises } from 'fs'
import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command }) => {
try {
let d = new Date(new Date + 3600000)
let locale = 'es'
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
let _uptime = process.uptime() * 1000
let uptime = clockString(_uptime)
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length 
let more = String.fromCharCode(8206)
let readMore = more.repeat(850)   
let taguser = conn.getName(m.sender)
let user = global.db.data.users[m.sender]
let text = '*<texto>*'
let url = '*<url>*'
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let menu = `*☆═━┈◈ ╰ ${vs} ㎇ ╯ ◈┈━═☆*
*│* *˚₊·˚₊· ͟͟͞͞➳❥* 𝗦𝗨𝗕 𝗕𝗢𝗧 ⇢ *${global.conn.user.jid.split`@`[0]}*
*│* *˚₊·˚₊· ͟͟͞͞➳❥ @${m.sender.split("@")[0]}*
*│* *˚₊·˚₊· ͟͟͞͞➳❥ *◈ ${user.registered === true ? user.name : `${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'verificar nombre.edad' : 'verify name.age'}`} ◈*
*╰ ㊂ ▸▸ _${lenguajeGB.smsMenuTotal1()}_ ◂◂*
*│* ┊
*│* ┊▸ ✦ ${usedPrefix}verificar DarkCore.18
*│* ┊▸ ✦ ${usedPrefix}Perfil
*│* ┊▸ ✦ ${usedPrefix}
*│* ┊▸ ✦ ${usedPrefix}
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙ 
*│*
*╰ ㊂ ▸▸ _${lenguajeGB.smsMenuTotal2()}_ ◂◂*
*│* ┊
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'serbot' : 'jadibot'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'bots' : 'subsbots'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'pausarsb' : 'pausesb'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'eliminarsesion' : 'delsession'}
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙  
*│*
*╰ ㊂ ▸▸ _${lenguajeGB.smsMenuTotal3()}_ ◂◂*
*│* ┊
*│* ┊▸ ✦ ${usedPrefix}tiktoksearch ${text}
*│* ┊▸ ✦ ${usedPrefix}yts ${text}
*│* ┊▸ ✦ ${usedPrefix}pinterest ${text}
*│* ┊▸ ✦ ${usedPrefix}pelisplus ${text}
*│* ┊▸ ✦ ${usedPrefix}xvideosearch ${text}
*│* ┊▸ ✦ ${usedPrefix}
*│* ┊▸ ✦ ${usedPrefix}
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙  
*│*
*╰ ㊂ ▸▸ _HERRAMIENTAS_ ◂◂*
*│* ┊
*│* ┊▸ ✦ ${usedPrefix}
*│* ┊▸ ✦ ${usedPrefix}
*│* ┊▸ ✦ ${usedPrefix}
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙  
*│*
*╰ ㊂ ▸▸ _${lenguajeGB.smsMenuTotal4()}_ ◂◂*
*│* ┊
*│* ┊▸ ✦ ${usedPrefix}play ${text}
*│* ┊▸ ✦ ${usedPrefix}play2 ${text}
*│* ┊▸ ✦ ${usedPrefix}dlplaystore ${text}
*│* ┊▸ ✦ ${usedPrefix}ytmp3 ${url}
*│* ┊▸ ✦ ${usedPrefix}ytmp4 ${url}
*│* ┊▸ ✦ ${usedPrefix}ytmp3doc ${url}
*│* ┊▸ ✦ ${usedPrefix}ytmp4doc ${url}
*│* ┊▸ ✦ ${usedPrefix}tiktok ${url}
*│* ┊▸ ✦ ${usedPrefix}spotify ${url}
*│* ┊▸ ✦ ${usedPrefix}facebook ${url}
*│* ┊▸ ✦ ${usedPrefix}instagram ${url}
*│* ┊▸ ✦ ${usedPrefix}gitclone ${text}
*│* ┊▸ ✦ ${usedPrefix}like ${url}
*│* ┊▸ ✦ ${usedPrefix}mediadire ${url}
*│* ┊▸ ✦ ${usedPrefix}terabox ${url}
*│* ┊▸ ✦ ${usedPrefix}soundclound ${text}
*│* ┊▸ ✦ ${usedPrefix}tiktokmp3 ${url}
*│* ┊▸ ✦ ${usedPrefix}twitter ${url}
*│* ┊▸ ✦ ${usedPrefix}xnxx ${url}
*│* ┊▸ ✦ ${usedPrefix}xvideo ${url}
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙ 
*│*
*╰ ㊂ ▸▸ _${lenguajeGB.smsMenuTotal5()}_ ◂◂*
*│* ┊
*│* ┊▸ ✦ ${usedPrefix}
*│* ┊▸ ✦ ${usedPrefix}
*│* ┊▸ ✦ ${usedPrefix}
*│* ┊▸ ✦ ${usedPrefix}
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙ 
*│*
*╰ ㊂ ▸▸ _${lenguajeGB.smsMenuTotal6()}_ ◂◂*
*│* ┊
*│* ┊▸ ✦ ${usedPrefix}
*│* ┊▸ ✦ ${usedPrefix}
*│* ┊▸ ✦ ${usedPrefix}
*│* ┊▸ ✦ ${usedPrefix}
*│* ┊▸ ✦ ${usedPrefix}
*│* ┊▸ ✦ ${usedPrefix}
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙ 
*│*
*╰ ㊂ ▸▸ _${lenguajeGB.smsMenuTotal7()}_ ◂◂*
*│* ┊
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'notificar *texto*' : 'hidetag'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'sacar *tag*' : 'kick *tag*'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'invitar *número*' : 'invite *number*'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'daradmin *tag*' : 'promote *tag*'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'quitaradmin *tag*' : 'demote *tag*'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'prohibir *tag*' : 'deprive *tag*'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'desprohibir *tag*' : 'undeprive *tag*'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'editarwelcome *texto*' : 'setwelcome'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'editarbye *texto*' : 'setbye'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'cambiardesc *texto*' : 'setdesc'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'cambiarnombre *texto*' : 'setname'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'cambiarpp *imagen*' : 'setppgc *image*'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'nuevoenlace' : 'resetlink'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'grupo abrir' : 'group open'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'grupo cerrar' : 'group close'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'invocar' : 'tagall'}
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙ 
*│*
*╰ ㊂ ▸▸ _${lenguajeGB.smsMenuTotal8()}_ ◂◂*
*│* ┊
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'editarbass' : 'editbass'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'editarvibra' : 'editvibra'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'editarblown' : 'editblown'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'editardeep' : 'editdeep'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'editarearrape' : 'editearrape'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'editarfast' : 'editfast'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'editarfat' : 'editfat'}_
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'editarnightcore' : 'editnightcore'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'editarrobot' : 'editrobot'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'editarslow' : 'editslow'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'editarsmooth' : 'editsmooth'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'editartupai' : 'edittupai'}
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'editaraudio8d' : 'editaudio8d'}
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙ 
*│*
*╰ ㊂ ▸▸ _${lenguajeGB.smsMenuTotal9()}_ ◂◂*
*│* ┊
*│* ┊▸ ✦ ${usedPrefix}bass
*│* ┊▸ ✦ ${usedPrefix}blown
*│* ┊▸ ✦ ${usedPrefix}deep
*│* ┊▸ ✦ ${usedPrefix}earrape
*│* ┊▸ ✦ ${usedPrefix}fast
*│* ┊▸ ✦ ${usedPrefix}fat
*│* ┊▸ ✦ ${usedPrefix}nightcore
*│* ┊▸ ✦ ${usedPrefix}reverse
*│* ┊▸ ✦ ${usedPrefix}robot
*│* ┊▸ ✦ ${usedPrefix}slow
*│* ┊▸ ✦ ${usedPrefix}smooth
*│* ┊▸ ✦ ${usedPrefix}tupai
*│* ┊▸ ✦ ${usedPrefix}audio8d
*│* ┊▸ ✦ ${usedPrefix}echo
*│* ┊▸ ✦ ${usedPrefix}distortion
*│* ┊▸ ✦ ${usedPrefix}pitch
*│* ┊▸ ✦ ${usedPrefix}reverb
*│* ┊▸ ✦ ${usedPrefix}flanger
*│* ┊▸ ✦ ${usedPrefix}apulsator
*│* ┊▸ ✦ ${usedPrefix}tremolo
*│* ┊▸ ✦ ${usedPrefix}chorus
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
*│*
*╰ ㊂ ▸▸ _${lenguajeGB.smsMenuTotal10()}_ ◂◂*
*│* ┊ 
*│* ┊▸ ✦ ${usedPrefix}
*│* ┊▸ ✦ ${usedPrefix}
*│* ┊▸ ✦ ${usedPrefix}
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
*│*
*╰ ㊂ ▸▸ _${lenguajeGB.smsMenuTotal11()}_ ◂◂*
*│* ┊ 
*│* ┊▸ ✦ ${usedPrefix}
*│* ┊▸ ✦ ${usedPrefix}
*│* ┊▸ ✦ ${usedPrefix}
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
*│*
*╰ ㊂ ▸▸ _PARA CANALES_ ◂◂*
*│* ┊
*│* ┊▸ ✦ ${usedPrefix}
*│* ┊▸ ✦ ${usedPrefix}
*│* ┊▸ ✦ ${usedPrefix}
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
*│*
*╰ ㊂ ▸▸ _${lenguajeGB.smsMenuTotal12()}_ ◂◂*
*│* ┊ 
*│* ┊▸ ✦ ${usedPrefix}${lenguajeGB.lenguaje() == 'es' ? 'respaldo' : 'backup'}
*│* ┊▸ ✦ ${usedPrefix}nuevonombrecanal
*│* ┊▸ ✦ ${usedPrefix}reaccionescanal
*│* ┊▸ ✦ ${usedPrefix}updates
*│* ┊▸ ✦ ${usedPrefix}eliminarppcanal
*│* ┊▸ ✦ ${usedPrefix}ppcanal
*│* ┊▸ ✦ ${usedPrefix}nosilenciarcanal
*│* ┊▸ ✦ ${usedPrefix}silenciarcanal
*│* ┊▸ ✦ ${usedPrefix}noseguircanal
*│* ┊▸ ✦ ${usedPrefix}seguircanal
*│* ┊▸ ✦ ${usedPrefix}inspect
*│* ╰∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙ ∙ ∙ ∙ ∙
 `.trim()
    
const vi = [
'https://i.ibb.co/Y7mhFdf/file.jpg',
'https://i.ibb.co/Y7mhFdf/file.jpg',
'https://i.ibb.co/Y7mhFdf/file.jpg'
]
try {
await conn.sendMessage(m.chat, { video: { url: vi.getRandom() }, gifPlayback: true, caption: menu, contextInfo: fakeChannel2 })
} catch (error) {
try {
await conn.sendMessage(m.chat, { image: { url: gataMenu.getRandom() }, gifPlayback: false, caption: menu, mentions: [m.sender, global.conn.user.jid] }, { quoted: fkontak }) 
} catch (error) {
try {
await conn.sendMessage(m.chat, { image: gataImg.getRandom(), gifPlayback: false, caption: menu, mentions: [m.sender, global.conn.user.jid] }, { quoted: fkontak }) 
} catch (error) {
try{
await conn.sendFile(m.chat, imagen5, 'menu.jpg', menu, rcanal, fkontak, false, { mentions: [m.sender, global.conn.user.jid] })
} catch (error) {
return 
}}}} 
} catch (e) {
await m.reply(lenguajeGB['smsMalError3']() + '\n*' + lenguajeGB.smsMensError1() + '*\n*' + usedPrefix + `${lenguajeGB.lenguaje() == 'es' ? 'reporte' : 'report'}` + '* ' + `${lenguajeGB.smsMensError2()} ` + usedPrefix + command)
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(e)}}

handler.command = /^(menu|menú|memu|memú|help|info|comandos|2help|menu1.2|ayuda|commands|commandos|menucompleto|allmenu|allm|m|\?)$/i
export default handler

function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
