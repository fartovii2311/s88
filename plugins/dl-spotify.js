import fetch from 'node-fetch';

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) {
    return conn.reply(
      m.chat,
      `[ ᰔᩚ ] Ingresa el nombre o palabra clave para buscar en *Spotify*.\n\n` +
        `Ejemplo:\n> *${usedPrefix + command}* Ozuna`,
      m
    );
  }

  await m.react('🕓');

  try {
    // Búsqueda de canciones en Spotify
    let apiSearch = await fetch(`https://api.vreden.web.id/api/spotifysearch?query=${encodeURIComponent(text)}`);
    let jsonSearch = await apiSearch.json();

    if (!jsonSearch.result || jsonSearch.result.length === 0) {
      await m.react('❌');
      return conn.reply(m.chat, '[ ᰔᩚ ] No se encontraron resultados para tu búsqueda.', m);
    }

    // Mostrar resultados de la búsqueda
    let results = jsonSearch.result
      .map(
        (track, i) =>
          `${i + 1}. *${track.title}*\n   Popularidad: ${track.popularity}\n   [Enlace a Spotify](${track.url})`
      )
      .join('\n\n');

    let message = `❀ *SPOTIFY PLAY*\n\n` +
      `Resultados para: *${text}*\n\n` +
      `${results}\n\n` +
      `Responde con el número de la canción para descargarla.`;

    await conn.reply(m.chat, message, m);
    await m.react('✅');

    // Esperar la respuesta del usuario
    conn.on('chat-update', async (chat) => {
      if (!chat.messages) return;
      let response = chat.messages.all()[0];
      let selected = parseInt(response.message) - 1;

      // Validar la selección del usuario
      if (isNaN(selected) || selected < 0 || selected >= jsonSearch.result.length) {
        return conn.reply(m.chat, '[ ᰔᩚ ] Selección no válida. Por favor, elige un número de la lista.', m);
      }

      let selectedTrack = jsonSearch.result[selected];
      await m.react('🕓');

      // Descargar la canción seleccionada
      let apiDL = await fetch(`https://api.vreden.web.id/api/spotify?url=${encodeURIComponent(selectedTrack.url)}`);
      let jsonDL = await apiDL.json();

      let { title, artists, cover, music } = jsonDL.result;

      let titulo = `- Titulo: ${title}\n- Autor: ${artists}\n- Enlace: ${selectedTrack.url}`;

      // Enviar carátula y canción al usuario
      await conn.sendFile(m.chat, cover, 'cover.jpg', titulo, m);
      await conn.sendFile(m.chat, music, 'music.mp3', null, m);

      await m.react('✅');
    });
  } catch (error) {
    console.error(error);
    await m.react('❌');
    await conn.reply(m.chat, '[ ᰔᩚ ] Hubo un error al procesar tu solicitud. Intenta nuevamente.', m);
  }
};

handler.command = /^(spotifysearch|spotify|sp)$/i;
handler.tags = ["search", "download"];
handler.register = true;

export default handler;
