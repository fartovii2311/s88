import { createHash } from 'crypto'
import fs from 'fs'
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)

  if (user.registered === true) return m.reply(`[ ✰ ] Ya estás registrado.`)

  if (command === 'verificar') {
    let name = name2.trim();
    let age = 18;

    if (!name || isNaN(age) || age < 18 || age > 100) {
      return conn.reply(m.chat,`*[ ✰ ] No se ha podido obtener un nombre o edad válidos. Usa el formato \`${usedPrefix + command} <nombre>.<edad>\` para registrarte correctamente.*`,m,rcanal);
    }

    user.name = name
    user.age = age
    user.regTime = +new Date()
    user.registered = true

    let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6)
    let img = await (await fetch(`https://i.ibb.co/JndpnfX/LynxAI.jpg`)).buffer()
    
    let now = new Date()
    let date = now.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
    let time = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

    let txt = '*`📄 R E G I S T R O 📄`*\n'
    txt += `\`━━━━━━━━━━━━━━━━━━━━\`\n`
    txt += `*\`⁘ TAG:\`* @${m.sender.split('@')[0]}\n`
    txt += `*\`⁘ NOMBRE:\`* ${name}\n`
    txt += `*\`⁘ EDAD:\`* ${age} años\n`
    txt += `*\`⁘ FECHA:\`* ${date}\n`
    txt += `*\`⁘ HORA:\`* ${time}\n`
    txt += `*\`⁘ N° SERIAL:\`* ${sn}\n`
    txt += `\`━━━━━━━━━━━━━━━━━━━━\`\n\n`
    txt += `> Escribe *${usedPrefix}profile* para ver tu perfil.`

    await conn.sendFile(m.chat, img, 'perfil.jpg', txt, m,rcanal,fake, false, { mentions: [m.sender] })
    await m.react('✅')
  } else {
    if (!Reg.test(text)) return conn.reply(m.chat,`*[ ✰ ] Por favor, ingresa tu nombre de usuario para proceder con el registro.*\n\n*🤍 Ejemplo de Uso* :\n*${usedPrefix + command} Dark.18`,m,rcanal)

    let [_, name, splitter, age] = text.match(Reg)
    if (!name) return conn.reply(m.chat, '[ ✰ ] El nombre no puede estar vacío.', m,rcanal)
    if (!age) return conn.reply(m.chat, '[ ✰ ] La edad no puede estar vacía.', m,rcanal)
    age = parseInt(age)

    user.name = name.trim()
    user.age = age
    user.regTime = +new Date()
    user.registered = true

    let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6)
    let img = await (await fetch(`https://i.ibb.co/JndpnfX/LynxAI.jpg`)).buffer()
    
    let now = new Date()
    let date = now.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
    let time = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

    let txt = '*`📄 R E G I S T R O 📄`*\n'
    txt += `\`━━━━━━━━━━━━━━━━━━━━\`\n`
    txt += `*\`⁘ TAG:\`* @${m.sender.split('@')[0]}\n`
    txt += `*\`⁘ NOMBRE:\`* ${name}\n`
    txt += `*\`⁘ EDAD:\`* ${age} años\n`
    txt += `*\`⁘ FECHA:\`* ${date}\n`
    txt += `*\`⁘ HORA:\`* ${time}\n`
    txt += `*\`⁘ N° SERIAL:\`* ${sn}\n`
    txt += `\`━━━━━━━━━━━━━━━━━━━━\`\n\n`
    txt += `> Escribe *${usedPrefix}profile* para ver tu perfil.`

    await conn.sendFile(m.chat, img, 'perfil.jpg', txt, m,rcanal,fake, false, { mentions: [m.sender] })
    await m.react('✅')
  }
}

handler.help = ['reg'].map(v => v + ' *<nombre.edad>*')
handler.tags = ['start']
handler.command = ['verify', 'reg', 'register', 'registrar', 'verificar']

export default handler
