/* 
- play hecho por By DarkCore
- https://whatsapp.com/channel/0029Vaxk8vvEFeXdzPKY8f3F
- Parchado por DarkCore... vip plus
*/

import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn: star, command, args, text, usedPrefix }) => {
  if (!text) {
    return star.reply(m.chat, '[ ᰔᩚ ] Ingresa el título de un video o canción de *YouTube*.', m)
  }

  await m.react('🕓')

  try {
    let res = await search(args.join(" "))
    let video = res[0]
    let videoUrl = `https://youtu.be/${video.videoId}`

    let txt = `🎬 *‌乂 Y O U T U B E  -  P L A Y 乂* 🎬\n\n`
    txt += `ﾒ *TITULO:* ${video.title}\n`
    txt += `ﾒ *DURACION:* ${secondString(video.duration.seconds)}\n`
    txt += `ﾒ *PUBLICACION:* ${eYear(video.ago)}\n`
    txt += `ﾒ *CANAL:* ${video.author.name || 'Desconocido'}\n`
    txt += `ﾒ *URL:* ${videoUrl}\n\n`
    txt += `> Elige una opción:`

    const buttons = [
      { buttonId: `.ytmp4 ${videoUrl}`, buttonText: { displayText: '🎥 Descargar MP4' }, type: 1 },
      { buttonId: `.ytmp3 ${videoUrl}`, buttonText: { displayText: '🎵 Descargar MP3' }, type: 1 }
    ]

    await star.sendMessage(m.chat, {
      text: txt,
      footer: 'Lynx Bot',
      buttons: buttons,
      headerType: 1
    }, { quoted: m })

    await m.react('✅')
  } catch (err) {
    console.error(err)
    await m.react('✖️')
    return star.reply(m.chat, '❌ Ocurrió un error al realizar la búsqueda.', m)
  }
}

handler.help = ['play *<búsqueda>*']
handler.tags = ['dl']
handler.command = ['play', 'Play', 'PLAY', 'pl']
handler.register = true 

export default handler

async function search(query, options = {}) {
  let searchResults = await yts.search({ query, hl: "es", gl: "ES", ...options })
  return searchResults.videos.filter(video => video.seconds > 0).slice(0, 5)
}

function secondString(seconds) {
  seconds = Number(seconds)
  const d = Math.floor(seconds / (3600 * 24))
  const h = Math.floor((seconds % (3600 * 24)) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  const dDisplay = d > 0 ? d + (d == 1 ? ' Día, ' : ' Días, ') : ''
  const hDisplay = h > 0 ? h + (h == 1 ? ' Hora, ' : ' Horas, ') : ''
  const mDisplay = m > 0 ? m + (m == 1 ? ' Minuto, ' : ' Minutos, ') : ''
  const sDisplay = s > 0 ? s + (s == 1 ? ' Segundo' : ' Segundos') : ''
  return dDisplay + hDisplay + mDisplay + sDisplay
}

function eYear(txt) {
  if (!txt) return '×'
  if (txt.includes('month ago')) return 'hace ' + txt.replace("month ago", "").trim() + ' mes'
  if (txt.includes('months ago')) return 'hace ' + txt.replace("months ago", "").trim() + ' meses'
  if (txt.includes('year ago')) return 'hace ' + txt.replace("year ago", "").trim() + ' año'
  if (txt.includes('years ago')) return 'hace ' + txt.replace("years ago", "").trim() + ' años'
  return txt
}
