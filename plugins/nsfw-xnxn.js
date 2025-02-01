import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!global.db.data.chats[m.chat].nsfw) {
    return conn.reply(m.chat, `🚩 El grupo no admite contenido *Nsfw.*\n\n> Para activarlo un *Administrador* debe usar el comando */on nsfw*`, m, rcanal);
 }
  let query = args.join(' ');
  
  try {
    let apiUrl = `https://dark-core-api.vercel.app/api/download/xnxn?key=api&url=${encodeURIComponent(query)}`;

    let response = await fetch(apiUrl);
    let data = await response.json();

    if (data.success && data.result.estado === 200) {
      let { titulo, descripcion, duracion, urlVideo, vistas } = data.result.datos;

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

handler.command = ['xnxx', 'xn'];
handler.register = true;

export default handler;
