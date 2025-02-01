import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!global.db.data.chats[m.chat].nsfw) {
    return conn.reply(m.chat, `🚩 El grupo no admite contenido *Nsfw.*\n\n> Para activarlo un *Administrador* debe usar el comando */on nsfw*`, m);
  }

  await m.react('🕓');

  let query = args.join(' ');
  
  try {
    let apiUrl = `https://dark-core-api.vercel.app/api/download/xnxn?key=api&url=${encodeURIComponent(query)}`;

    let response = await fetch(apiUrl);
    let data = await response.json();

    if (data.success && data.result.estado === 200) {
      let { titulo, descripcion, duracion, urlVideo, vistas } = data.result.datos;

      const durationMatch = /PT(\d+)H(\d+)M(\d+)S/.exec(duracion);
      const durationFormatted = durationMatch 
        ? `${durationMatch[1]}h ${durationMatch[2]}m ${durationMatch[3]}s`
        : 'Desconocida';

      await conn.sendMessage(m.chat, {
        video: { url: urlVideo },
        caption: `*Titulo:* ${titulo}\n*Descripción:* ${descripcion}\n*Duración:* ${durationFormatted}\n*Vistas:* ${vistas}`,
        mimetype: 'video/mp4',
        fileName: `${titulo}.mp4`
      }, { quoted: m });

      await m.react('✅');
    } else {
      return conn.reply(m.chat, `❌ No se encontraron resultados o hubo un problema con la búsqueda.`, m);
    }
  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, `❌ Ocurrió un error al intentar obtener el video.`, m);
  }
};

handler.command = ['xnxx', 'xn'];
handler.register = true;

export default handler;
