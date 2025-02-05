/* 
- play hecho por By DarkCore
- https://whatsapp.com/channel/0029Vaxk8vvEFeXdzPKY8f3F
- Parchado por DarkCore... vip plus
*/

import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!text) {
    return conn.reply(m.chat, '[ ᰔᩚ ] Ingresa el título de un video o canción de *YouTube*.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* Mc Davo - Debes De Saber`, m)
  }

  await m.react('🕓')

  try {
    let res = await search(args.join(" "))

    let video = res[0]
    let txt = `🎬 *‌乂 Y O U T U B E  -  P L A Y 乂* 🎬\n\n`
    txt += `－－－－－－－－－－－－－－－－－－\n`
    txt += `ﾒ *TITULO:* ${video.title}\n`
    txt += `ﾒ *DURACION:* ${secondString(video.duration.seconds)}\n`
    txt += `ﾒ *PUBLICACION:* ${eYear(video.ago)}\n`
    txt += `ﾒ *CANAL:* ${video.author.name || 'Desconocido'}\n`
    txt += `ﾒ *ID:* ${video.videoId}\n`
    txt += `ﾒ *URL:* https://youtu.be/${video.videoId}\n`
    txt += `－－－－－－－－－－－－－－－－－－\n\n`
    txt += `> 🔽 Elige el formato de descarga:`

    await conn.sendMessage(
      m.chat,
      {
        image: { url: video.image },
        caption: txt,
        buttons: [
          {
            buttonId: `.ytmp3 ${video.url}`,
            buttonText: { displayText: '🎵 MP3 (Audio)' },
            type: 1,
          },
          {
            buttonId: `.ytmp4 ${video.url}`,
            buttonText: { displayText: '📹 MP4 (Video)' },
            type: 1,
          },
        ],
        headerType: 4,
      },
      { quoted: m }
    );

    await m.react('✅')
  } catch (err) {
    console.error(err)
    await m.react('✖️')
    return conn.reply(m.chat, '❌ Ocurrió un error al realizar la búsqueda. Intenta nuevamente.', m)
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
  if (txt.includes('hour ago')) return 'hace ' + txt.replace("hour ago", "").trim() + ' hora'
  if (txt.includes('hours ago')) return 'hace ' + txt.replace("hours ago", "").trim() + ' horas'
  if (txt.includes('minute ago')) return 'hace ' + txt.replace("minute ago", "").trim() + ' minuto'
  if (txt.includes('minutes ago')) return 'hace ' + txt.replace("minutes ago", "").trim() + ' minutos'
  if (txt.includes('day ago')) return 'hace ' + txt.replace("day ago", "").trim() + ' día'
  if (txt.includes('days ago')) return 'hace ' + txt.replace("days ago", "").trim() + ' días'
  return txt
}
