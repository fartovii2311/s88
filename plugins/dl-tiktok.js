import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
  let url = args[0];

  if (!url) {
    return conn.reply(m.chat, "[ ᰔᩚ ] Ingresa una URL válida de *TikTok*.", m,rcanal);
  }

  try {
    let api2 = `https://dark-core-api.vercel.app/api/download/tiktok?key=api&url=${encodeURIComponent(url)}`;
    let response = await (await fetch(api2)).json();

    if (response.success && response.result.mp4) {
      let videoData = {
        title: response.result.titulo,
        cover: response.result.thumbanail,
        author: response.result.author,
        play_url: response.result.mp4,
        source: "dark-core"
      };

      let mensaje = `✅ *Descarga de TikTok completada* \n🎥 *Título:* ${videoData.title || "Desconocido"} \n👤 *Autor:* ${videoData.author} \n📌 *Fuente:* ${videoData.source.toUpperCase()}\n`;

      await conn.sendFile(m.chat, videoData.play_url, 'video.mp4', mensaje, m);
      await m.react('✅');
    } else {
      conn.reply(m.chat, "❌ *No se pudo descargar el video.*", m);
    }
  } catch (err) {
    console.error(err);
    conn.reply(m.chat, "❌ *Hubo un error al obtener el video.*", m);
  }
};

handler.help = ['tiktok *<url>*'];
handler.tags = ['dl'];
handler.command = /^(tiktok)$/i;
handler.register = true;
handler.Monedas = 1;

export default handler;
