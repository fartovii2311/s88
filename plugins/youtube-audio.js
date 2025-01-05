import core from 'NakanoTeam-Scraper'

let limit = 200 // Limite en MB

let handler = async (m, { conn, text, isPrems, isOwner, usedPrefix, command }) => {
  if (!m.quoted) {
    return conn.reply(m.chat, `[ ✰ ] Etiqueta el mensaje que contenga el resultado de YouTube Play.`, m, rcanal).then(_ => m.react('✖️'))
  }
  
  if (!m.quoted.text.includes("乂  Y O U T U B E  -  P L A Y")) {
    return conn.reply(m.chat, `[ ✰ ] Etiqueta el mensaje que contenga el resultado de YouTube Play.`, m, rcanal).then(_ => m.react('✖️'))
  }
  
  let urls = m.quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
  
  if (!urls || urls.length < text) {
    return conn.reply(m.chat, `Resultado no Encontrado.`, m, rcanal).then(_ => m.react('✖️'))
  }

  let user = global.db.data.users[m.sender]
  
  await m.react('🕓')
  
  try {
    let v = urls[0]
    let { title, size, quality, thumbnail, dl_url } = await core.ytmp3(v)
    
    // Convertir el tamaño del archivo a MB (asumiendo que el tamaño está en un formato como '10MB')
    let fileSizeMB = parseFloat(size.split('MB')[0])

    if (fileSizeMB >= limit) {
      return m.reply(`El archivo pesa más de ${limit} MB, se canceló la descarga.`).then(_ => m.react('✖️'))
    }

    await conn.sendFile(m.chat, dl_url, title + '.mp3', null, m, false, { mimetype: 'audio/mpeg', asDocument: user.useDocument })
    await m.react('✅')
  } catch (error) {
    console.error(error)
    await m.react('✖️')
  }
}

handler.help = ['Audio']
handler.tags = ['downloader']
handler.customPrefix = /^(Audio|audio)/
handler.command = new RegExp

export default handler
