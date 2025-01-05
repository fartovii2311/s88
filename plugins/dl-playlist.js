import yts from 'yt-search';

let handler = async (m, { conn, usedPrefix, text }) => {
  if (!text) {
    return conn.reply(m.chat, 'Escribe el nombre de un video o canal de YouTube.', m);
  }

  try {
    let result = await yts(text);
    let ytres = result.videos;
    let listSections = [];

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

    if (listSections.length === 0) {
      return conn.reply(m.chat, 'No se encontraron resultados para tu búsqueda.', m);
    }

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
    await conn.reply(m.chat, 'Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente más tarde.', m);
  }
};

handler.help = ['playlist'];
handler.tags = ['dl'];
handler.command = /^playlist|ytbuscar|yts(earch)?$/i;
handler.limit = 1;
handler.level = 3;

export default handler;
