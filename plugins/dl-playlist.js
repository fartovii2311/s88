import yts from 'yt-search';

let handler = async (m, { conn, usedPrefix, text }) => {
  if (!text) {
    return conn.reply(m.chat, 'Escribe el nombre de un video o canal de YouTube.', m);
  }

  try {
    let result = await yts(text);
    let ytres = result.videos;

    // Validar que haya resultados antes de continuar
    if (!ytres || ytres.length === 0) {
      return conn.reply(m.chat, 'No se encontraron resultados para tu búsqueda.', m);
    }

    // Inicializar listSections como un array vacío
    let listSections = [];

    // Iterar sobre los resultados y formar las opciones del carrusel
    for (let v of ytres) {
      listSections.push({
        title: `${v.title}`,
        rows: [
          {
            title: "Audio",
            description: `Duración: ${v.timestamp}\nSubido por: ${v.author.name}`,
            rowId: `${usedPrefix}ytmp3 ${v.url}`,
          },
          {
            title: "Video",
            description: `Duración: ${v.timestamp}\nSubido por: ${v.author.name}`,
            rowId: `${usedPrefix}ytmp4 ${v.url}`,
          },
          {
            title: "Audio (Documento)",
            description: `Duración: ${v.timestamp}\nSubido por: ${v.author.name}`,
            rowId: `${usedPrefix}ytmp3doc ${v.url}`,
          },
          {
            title: "Video (Documento)",
            description: `Duración: ${v.timestamp}\nSubido por: ${v.author.name}`,
            rowId: `${usedPrefix}ytmp4doc ${v.url}`,
          },
        ],
      });
    }

    // Enviar el carrusel de opciones
    await conn.sendList(
      m.chat,
      `Resultados de búsqueda`,
      `Búsqueda de: ${text}`,
      'Selecciona una opción',
      listSections,
      m
    );
  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, 'Hubo un error al realizar la búsqueda. Intenta nuevamente más tarde.', m);
  }
}

handler.help = ['playlist <nombre>']
handler.tags = ['dl']
handler.command = ['playlist', 'Playlist']
export default handler;
