import { Sticker } from 'wa-sticker-formatter'

let handler = async (m, { conn }) => {
  let stiker = false
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    
    // Verificar si el mimeType es una imagen
    if (/image/g.test(mime)) {
      let img = await q.download?.()

      if (!img) return conn.reply(m.chat, `🍁 *_Por favor, intenta enviar una imagen primero._*`, m)

      try {
        // Crear el sticker usando la imagen descargada
        const sticker = new Sticker(img, {
          pack: global.packname,
          author: global.author,
          type: 'full'
        })
        stiker = await sticker.toBuffer() // Convertir a buffer de sticker
      } catch (e) {
        console.error(e)
      }
    } else {
      return m.reply(`💫 *_El archivo no es una imagen válida._*`, m)
    }
  } catch (e) {
    console.error(e)
  } finally {
    if (stiker) {
      // Enviar el sticker
      conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true)
    } else {
      return conn.reply(m.chat, `🌲 *_La conversión ha fallado, intenta enviar una imagen._*`, m)
    }
  }
}

handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = ['sticker']

export default handler
