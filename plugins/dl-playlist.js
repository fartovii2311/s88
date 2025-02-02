import yts from 'yt-search';

let handler = async (m, { conn, usedPrefix, text }) => {
  if (!text) {
    return conn.reply(m.chat, '[ ᰔᩚ ] Ingresa el Nonbre de autor de *Youtube*.', m, rcanal);
  }

  try {
    let result = await yts(text);
    let ytres = result.videos;

    if (!ytres || ytres.length === 0) {
      return conn.reply(m.chat, 'No se encontraron resultados para tu búsqueda.', m, rcanal);
    }

    let txt = `Resultados de búsqueda para: *${text}*\n\n`;

    ytres.forEach((v, i) => {
      txt += `*${i + 1}.*\n`;
      txt += `• Título: ${v.title}\n`;
      txt += `• Duración: ${v.timestamp}\n`;
      txt += `• Subido por: ${v.author.name}\n`;
      txt += `• Enlace: ${v.url}\n\n`;
    });

    await conn.reply(m.chat, txt.trim(), m);
  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, 'Hubo un error al realizar la búsqueda. Intenta nuevamente más tarde.', m);
  }
}

handler.help = ['playlist <nombre>']
handler.tags = ['dl']
handler.command = ['playlist', 'Playlist']
export default handler;
