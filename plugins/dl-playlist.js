import yts from 'yt-search';

let handler = async (m, { conn, usedPrefix, text }) => {
  if (!text) return conn.reply(m.chat, 'Escribe el nombre de un video o canal de YouTube.', m);

  try {
    let result = await yts(text);
    let ytres = result.videos;
    let listSections = [];

    for (let v of ytres) {
      listSections.push({
        title: `Resultados`,
        rows: [
          {
            title: "Audio",
            description: `${v.title} | ${v.timestamp}`,
            id: `${usedPrefix}ytmp3 ${v.url}`,
          },
          {
            title: "Video",
            description: `${v.title} | ${v.timestamp}`,
            id: `${usedPrefix}ytmp4 ${v.url}`,
          },
          {
            title: "Audio (Documento)",
            description: `${v.title} | ${v.timestamp}`,
            id: `${usedPrefix}ytmp3doc ${v.url}`,
          },
          {
            title: "Video (Documento)",
            description: `${v.title} | ${v.timestamp}`,
            id: `${usedPrefix}ytmp4doc ${v.url}`,
          },
        ],
      });
    }

    await conn.sendList(
      m.chat,
      `Resultados`,
      `Búsqueda de: ${text}`,
      `Selecciona una opción`,
      listSections,
      m
    );
  } catch (e) {
    await conn.reply(m.chat, 'Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente.', m);
    console.log(e);
  }
};

handler.help = ['playlist'];
handler.tags = ['dl'];
handler.command = /^playlist|ytbuscar|yts(earch)?$/i;
handler.limit = 1;
handler.level = 3;

export default handler;
