import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args || args.length === 0) {
    return conn.reply(m.chat, `[ ✰ ] Por favor, ingresa un término de búsqueda.`, m,rcanal);
  }

  let query = args.join(' ');
  let apiUrl = `https://darkcore-api.onrender.com/api/xnxn?url=${encodeURIComponent(query)}`;

  try {
    let response = await fetch(apiUrl);
    let data = await response.json();

    if (data.success && data.result.estado === 200) {
      let { titulo, descripcion, duracion, imagen, urlVideo, vistas } = data.result.datos;
      
      // Luego enviar el video con caption debajo
      await conn.sendMessage(m.chat, {
        video: { url: urlVideo },
        caption: `*Titulo:* ${titulo}\n*Descripción:* ${descripcion}\n*Duración:* ${duracion}\n*Vistas:* ${vistas}`,
        mimetype: 'video/mp4',
        fileName: `${titulo}.mp4`
      }, { quoted: m });

    } else {
      return conn.reply(m.chat, `No se encontraron resultados o hubo un problema con la búsqueda.`, m,rcanal);
    }
  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, `Hubo un error al procesar tu solicitud. Intenta de nuevo más tarde.`, m,rcanal);
  }
};

handler.help = ['xnxx'].map(v => v + ' <url>');
handler.tags = ['dl'];
handler.command = ['xnxx', 'xnxn'];
handler.register = true;

export default handler;
