import { uploadPomf } from '../lib/uploadImage.js'; 
import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let [atas, bawah] = text.split`|`
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''

    if (!mime) {
        throw m.reply(`✧ Responde a una *Imagen* con el comando\n\n${usedPrefix + command} <Texto Arriba>|<Texto Bajo>`)
    }
    if (!/image\/(jpe?g|png)/.test(mime)) {
        throw `_*Mime ${mime} no soportado!*_`
    }

    atas = atas ? atas : 'Texto Arriba'
    bawah = bawah ? bawah : 'Texto Bajo'

    let img = await q.download()
    let url = await uploadPomf(img)

    let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${url}`

    let stiker = await sticker(false, meme, global.stickpack, global.wm)
    
    if (stiker) {
        await conn.sendFile(m.chat, stiker, '', m, '', { asSticker: 1 })
    } else {
        throw 'Error al crear el sticker. Intenta de nuevo.'
    }
}

handler.help = ['smeme <txt>|<txt>']
handler.tags = ['sticker']
handler.command = /^(smeme)$/i

handler.register = true

export default handler
