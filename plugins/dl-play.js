import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn: star, command, args, text, usedPrefix }) => {
  // Si el mensaje citado no tiene un enlace de YouTube, respondemos.
  if (m.quoted) {
    const quotedMessage = m.quoted;  // El mensaje citado

    // Verificar si el mensaje citado contiene un enlace de YouTube
    const urlRegex = /(https?:\/\/(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\/videos\/(?:youtube|music))[\w-]+)/;
    const match = quotedMessage.text.match(urlRegex);

    // Si no se encuentra un enlace de YouTube en el mensaje citado, termina la ejecución
    if (!match) {
      return conn.reply(m.chat, '❀ El mensaje citado no contiene un enlace de YouTube.', m);
    }

    // Extraer la URL de YouTube
    const youtubeUrl = match[0];
    
    // Responder al usuario con un mensaje indicando que el enlace ha sido detectado
    await m.react('🕓')
    try {
      let apiResponse = await fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${youtubeUrl}`);
      let api = await apiResponse.json();

      if (api.status === true) {
        let dl_url = api.result.download.url;

        // Enviar el audio MP3
        await star.sendMessage(m.chat, { 
          audio: { url: dl_url },
          mimetype: "audio/mp3",
          ptt: true
        }, { quoted: m });
        await m.react('✅');
      } else {
        conn.reply(m.chat, '❀ Hubo un error al obtener el enlace de descarga. Intenta nuevamente.', m);
      }
    } catch (error) {
      console.error('Error al obtener el MP3:', error);
      conn.reply(m.chat, '❀ Ocurrió un error al intentar descargar el MP3. Intenta nuevamente más tarde.', m);
    }

  } else {
    // Si el mensaje no es una mención, hacer una búsqueda en YouTube como antes
    if (!text) return m.reply('[ ✰ ] Ingresa el título de un video o canción de *YouTube*.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* Mc Davo - Debes De Saber`);
    await m.react('🕓');
    try {
      let res = await search(args.join(" "))
      let img = await (await fetch(`${res[0].image}`)).buffer()
      let txt = '`乂  Y O U T U B E  -  P L A Y`\n\n'
      txt += `\t\t*» Título* : ${res[0].title}\n`
      txt += `\t\t*» Duración* : ${secondString(res[0].duration.seconds)}\n`
      txt += `\t\t*» Publicado* : ${eYear(res[0].ago)}\n`
      txt += `\t\t*» Canal* : ${res[0].author.name || 'Desconocido'}\n`
      txt += `\t\t*» ID* : ${res[0].videoId}\n`
      txt += `\t\t*» Url* : ${'https://youtu.be/' + res[0].videoId}\n\n`
      txt += `> *-* Para descargar responde a este mensaje con *Video* o *Audio*.`
      await star.sendFile(m.chat, img, 'thumbnail.jpg', txt, m,rcanal,fake)
      await m.react('✅')
    } catch {
      await m.react('✖️')
    }
  }
}

handler.help = ['play *<búsqueda>*']
handler.tags = ['downloader']
handler.command = ['play']
handler.register = true 
export default handler

// Función de búsqueda en YouTube
async function search(query, options = {}) {
  let search = await yts.search({ query, hl: "es", gl: "ES", ...options })
  return search.videos
}

function MilesNumber(number) {
  let exp = /(\d)(?=(\d{3})+(?!\d))/g
  let rep = "$1."
  let arr = number.toString().split(".")
  arr[0] = arr[0].replace(exp, rep)
  return arr[1] ? arr.join(".") : arr[0]
}

function secondString(seconds) {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const dDisplay = d > 0 ? d + (d == 1 ? ' Día, ' : ' Días, ') : '';
  const hDisplay = h > 0 ? h + (h == 1 ? ' Hora, ' : ' Horas, ') : '';
  const mDisplay = m > 0 ? m + (m == 1 ? ' Minuto, ' : ' Minutos, ') : '';
  const sDisplay = s > 0 ? s + (s == 1 ? ' Segundo' : ' Segundos') : '';
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

function sNum(num) {
    return new Intl.NumberFormat('en-GB', { notation: "compact", compactDisplay: "short" }).format(num)
}

function eYear(txt) {
    if (!txt) {
        return '×'
    }
    if (txt.includes('month ago')) {
        var T = txt.replace("month ago", "").trim()
        var L = 'hace '  + T + ' mes'
        return L
    }
    if (txt.includes('months ago')) {
        var T = txt.replace("months ago", "").trim()
        var L = 'hace ' + T + ' meses'
        return L
    }
    if (txt.includes('year ago')) {
        var T = txt.replace("year ago", "").trim()
        var L = 'hace ' + T + ' año'
        return L
    }
    if (txt.includes('years ago')) {
        var T = txt.replace("years ago", "").trim()
        var L = 'hace ' + T + ' años'
        return L
    }
    if (txt.includes('hour ago')) {
        var T = txt.replace("hour ago", "").trim()
        var L = 'hace ' + T + ' hora'
        return L
    }
    if (txt.includes('hours ago')) {
        var T = txt.replace("hours ago", "").trim()
        var L = 'hace ' + T + ' horas'
        return L
    }
    if (txt.includes('minute ago')) {
        var T = txt.replace("minute ago", "").trim()
        var L = 'hace ' + T + ' minuto'
        return L
    }
    if (txt.includes('minutes ago')) {
        var T = txt.replace("minutes ago", "").trim()
        var L = 'hace ' + T + ' minutos'
        return L
    }
    if (txt.includes('day ago')) {
        var T = txt.replace("day ago", "").trim()
        var L = 'hace ' + T + ' dia'
        return L
    }
    if (txt.includes('days ago')) {
        var T = txt.replace("days ago", "").trim()
        var L = 'hace ' + T + ' dias'
        return L
    }
    return txt
}
