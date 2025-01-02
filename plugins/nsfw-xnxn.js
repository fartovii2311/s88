import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args || args.length === 0) {
    return conn.reply(m.chat, `[ ✰ ] Por favor, ingresa un término de búsqueda.`, m);
  }

  let query = args.join(' '); // Obtener la consulta de búsqueda
  let apiUrl = `https://darkcore-api.onrender.com/api/xnxn?url=${encodeURIComponent(query)}`;

  try {
    let response = await fetch(apiUrl);
    let data = await response.json();

    if (data.success && data.result.estado === 200) {
      let { titulo, descripcion, duracion, imagen, urlVideo, vistas } = data.result.datos;

      // Crear el mensaje con los detalles del video
      let resultMessage = `
*Titulo:* ${titulo}
*Descripción:* ${descripcion}
*Duración:* ${duracion}
*Vistas:* ${vistas}

*Imagen:* 
${imagen}
`;

      // Enviar el texto primero
      await conn.reply(m.chat, resultMessage, m,rcanal,fake);

      // Luego enviar el video con caption debajo
      await conn.sendMessage(m.chat, {
        video: { url: urlVideo },
        caption: `*Titulo:* ${titulo}\n*Descripción:* ${descripcion}\n*Duración:* ${duracion}\n*Vistas:* ${vistas}`,
        mimetype: 'video/mp4',
        fileName: `${titulo}.mp4`
      }, { quoted: m });

    } else {
      return conn.reply(m.chat, `No se encontraron resultados o hubo un problema con la búsqueda.`, m);
    }
  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, `Hubo un error al procesar tu solicitud. Intenta de nuevo más tarde.`, m);
  }
};

handler.help = ['xnxx'].map(v => v + ' <url>');
handler.tags = ['search'];
handler.command = ['xnxxsearch', 'xnxxs'];
handler.register = true;

export default handler;
