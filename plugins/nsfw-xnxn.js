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
      let { titulo, descripcion, duracion, urlVideo, vistas } = data.result.datos;

      // Luego enviar el video con caption debajo
      await conn.sendMessage(m.chat, {
        video: { url: urlVideo },
        caption: `*Titulo:* ${titulo}\n*Descripción:* ${descripcion}\n*Duración:* ${duracion}\n*Vistas:* ${vistas}`,
        mimetype: 'video/mp4',
        fileName: `${titulo}.mp4`
      }, { quoted: m });

      await m.react('✅')
      
    } else {
      return conn.reply(m.chat, `No se encontraron resultados o hubo un problema con la búsqueda.`, m,rcanal);
    }
  } catch (error) {
    console.error(error);
  }
};

handler.help = ['xnxx'].map(v => v + ' <url>');
handler.tags = ['dl'];
handler.command = ['xnxx', 'xn'];
handler.register = true;

export default handler;
