// [ ❀ SPOTIFY PLAY ]
import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, '[ ᰔᩚ ] Ingresa el título de un video o canción de *Spotify*.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* Ozuna intimidad`, m)

  await m.react('🕓');
  
  try {
    // Realiza la búsqueda de la canción en Spotify
    let apiSearch = await fetch(`https://api.vreden.web.id/api/spotifysearch?query=${text}`)
    let jsonSearch = await apiSearch.json()

    // Verificar si la búsqueda retornó resultados
    if (!jsonSearch.result || jsonSearch.result.length === 0) {
      return conn.reply(m.chat, 'No se encontraron resultados para esa canción o video en Spotify.', m);
    }

    // Extraer la información de la búsqueda
    let { popularity, url } = jsonSearch.result[0]

    // Obtener el enlace de descarga de la canción
    let apiDL = await fetch(`https://api.vreden.web.id/api/spotify?url=${url}`)
    let jsonDL = await apiDL.json()

    // Verificar si se obtuvo el resultado de la descarga
    if (!jsonDL.result || !jsonDL.result.result) {
      return conn.reply(m.chat, 'No se pudo obtener la descarga del contenido o los datos están incompletos.', m);
    }

    // Extraer los valores de jsonDL.result.result de forma segura
    const result = jsonDL.result.result;
    if (!result) {
      return conn.reply(m.chat, 'No se encontró información de la canción. Intenta con otro término.', m);
    }

    let { title, artists, cover, music } = result;

    // Crear el mensaje con la información de la canción
    let titulo = `- Titulo : ${title}\n- Autor : ${artists}\n- Popularidad : ${popularity}\n- Link : ${url}`

    // Enviar la portada de la canción y el mensaje con la información
    await conn.sendFile(m.chat, cover, 'default.jpg', titulo, m)
    // Enviar el archivo de audio
    await conn.sendFile(m.chat, music, 'default.mp4', null, m)
    
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('❌');
    return conn.reply(m.chat, 'Hubo un error al procesar tu solicitud, por favor inténtalo de nuevo más tarde.', m);
  }
}

handler.command = /^(spotify|Spotify|SPOTIFY|sp)$/i;
handler.tags = ["dl"];
handler.register = true;
export default handler;
